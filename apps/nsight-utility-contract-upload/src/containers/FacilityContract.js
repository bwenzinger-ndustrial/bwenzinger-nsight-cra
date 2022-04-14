import React, { Component, Fragment } from 'react';
import {
  NotificationContainer,
  NotificationManager
} from 'react-notifications';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import PropTypes from 'prop-types';

import { utils as nsightUtils } from '@ndustrial/nsight-common';
import { MissingSelection } from '@ndustrial/nsight-common/components';
import {
  createCompletionStatusSelector,
  getSelectedFacility,
  getSelectedFacilitySlug,
  getSelectedOrganization,
  getSelectedOrganizationSlug
} from '@ndustrial/nsight-common/selectors';
import { contxtSdk } from '@ndustrial/nsight-common/utils';
import facilitiesActionTypes from '@ndustrial/nsight-dashboard/src/redux/facilities/actionTypes';
import orgActionTypes from '@ndustrial/nsight-dashboard/src/redux/organizations/actionTypes';

import 'react-notifications/lib/notifications.css';

import FacilityContract from '../components/FacilityContract';

const appRoot = 'utility-contract-upload';

const getFacilitiesCompletionStatus = createCompletionStatusSelector(
  'dashboard',
  [orgActionTypes.LOAD_ORGANIZATIONS, facilitiesActionTypes.LOAD_FACILITIES]
);

export class FacilityContractContainer extends Component {
  static propTypes = {
    contractMode: PropTypes.string,
    hasCompletedFacilities: PropTypes.bool,
    hasSelectedFacility: PropTypes.bool,
    history: PropTypes.shape({
      location: PropTypes.shape({
        search: PropTypes.string
      }).isRequired,
      push: PropTypes.func.isRequired
    }),
    match: PropTypes.shape({
      params: PropTypes.shape({
        contractId: PropTypes.string
      }).isRequired
    }).isRequired,
    selectedFacility: PropTypes.shape({
      id: PropTypes.number,
      slug: PropTypes.string
    }),
    selectedOrganization: PropTypes.shape({
      id: PropTypes.string,
      slug: PropTypes.string
    })
  };

  constructor() {
    super();

    this.state = {
      contracts: [],
      contractsGroupedByStatus: {},
      droppedFile: null,
      filteredContracts: [],
      filteredUsers: [],
      hasWriteScope: false,
      isLoadingContracts: false,
      isLoadingContractDetails: false,
      reminderChanged: false,
      reminders: [],
      selectedContract: {},
      selectedFacility: { id: null },
      users: []
    };
  }

  componentDidMount() {
    return this.loadFacilityWithDefaultContractSelected(
      this.props.selectedOrganization,
      this.props.selectedFacility,
      this.props.match.params.contractId
    );
  }

  componentDidUpdate(prevProps) {
    // The selected Facility has changed
    if (prevProps.selectedFacility !== this.props.selectedFacility) {
      return this.loadFacilityWithDefaultContractSelected(
        this.props.selectedOrganization,
        this.props.selectedFacility,
        this.props.match.params.contractId
      );
    }

    // The selected Contract has changed
    if (
      prevProps.match.params.contractId !== this.props.match.params.contractId
    ) {
      this.initializeSelectedContract(this.props.match.params.contractId);
    }
  }

  addReminder = (reminder, remindersInputRef) => {
    this.setState((state) => ({
      ...state,
      reminders: [...state.reminders, reminder],
      reminderChanged: true,
      filteredUsers: []
    }));

    remindersInputRef.current.value = '';
  };

  clearPreviewFile = () => {
    if (this.state.droppedFile !== null) {
      URL.revokeObjectURL(this.state.droppedFile.preview);

      this.setState(() => {
        return {
          droppedFile: null
        };
      });
    }
  };

  clearSelectedContractFile = () => {
    return this.setState(({ selectedContract }) => {
      return {
        selectedContract: {
          ...selectedContract,
          file: null
        }
      };
    });
  };

  confirmDelete(checkValue) {
    return window.confirm(
      `Are you sure you want to delete "${checkValue}"? This cannot be undone.`
    );
  }

  createContract = (values) => {
    const allValues = {
      ...values,
      endDate: moment(values.endDate).format('YYYY-MM-DD'),
      facilityId: this.props.selectedFacility.id,
      startDate: moment(values.startDate).format('YYYY-MM-DD'),
      utilityContractReminders: this.formatSaveReminders()
    };

    return contxtSdk.ems
      .createContract(allValues)
      .then((contract) => {
        if (!this.state.droppedFile) {
          return [contract];
        }

        return Promise.all([contract, this.saveContractFile(contract.id)]);
      })
      .then(([contract, fileId]) => {
        NotificationManager.success(
          'This utility contract has been created successfully',
          'Utility Contract Creation Success'
        );

        const decoratedContract = this.decorateContract({
          ...contract,
          fileId
        });

        decoratedContract.isSelected = true;

        this.setState(
          ({ contracts }) => {
            const updatedContracts = _.sortBy(
              [...contracts, decoratedContract],
              'endDate'
            ).reverse();
            const grouped = _.groupBy(updatedContracts, 'group');

            return {
              contracts: updatedContracts,
              contractsGroupedByStatus: grouped
            };
          },
          () => {
            this.props.history.push(
              `/${appRoot}/contract/${contract.id}${this.props.history.location.search}`
            );
          }
        );
      })
      .then(() => {
        this.clearPreviewFile();
        this.initializeSelectedContract(this.props.match.params.contractId);
      })
      .catch(() => {
        NotificationManager.error(
          'There was an error creating this utility contract. Please try again.',
          'Utility Contract Creation Error'
        );
      });
  };

  decorateContract = (contract) => {
    let contractStatus;
    const daysUntilExpire = moment().diff(contract.endDate, 'days');
    const expiresAt = moment(contract.endDate).format('l');

    if (contract.status === 'inactive') {
      contractStatus = {
        group: 'inactive',
        icon: 'contracts-list__status contracts-list__status--inactive'
      };
    } else if (daysUntilExpire <= -90) {
      contractStatus = {
        group: 'active',
        subText: `Expires ${expiresAt}`,
        icon: 'contracts-list__status contracts-list__status--active'
      };
    } else if (daysUntilExpire <= 0) {
      contractStatus = {
        group: 'expiringSoon',
        subText: `Expires ${expiresAt} (${daysUntilExpire * -1} days to go)`,
        icon: 'contracts-list__status contracts-list__status--expiring-soon'
      };
    } else {
      contractStatus = {
        group: 'expired',
        subText: `Expired ${expiresAt}`,
        icon: 'contracts-list__status contracts-list__status--expired'
      };
    }

    return {
      ...contract,
      group: contractStatus.group,
      icon: contractStatus.icon,
      isSelected: this.props.match.params.contractId === `${contract.id}`,
      label: contract.name,
      subText: contractStatus.subText,
      url: `/${appRoot}/contract/${contract.id}`
    };
  };

  decorateContracts = function(contracts) {
    return contracts.map((contract) => {
      return this.decorateContract(contract);
    });
  };

  decorateReminders = function(reminders = [], users = []) {
    return reminders.map((reminder) => {
      let remindersLabel;
      const foundUser = users.find((i) => i.userId === reminder.userId);
      if (foundUser) {
        remindersLabel =
          foundUser.lastName +
          ', ' +
          foundUser.firstName +
          ' (' +
          foundUser.email +
          ')';
      } else {
        remindersLabel = reminder.userId;
      }
      return {
        ...reminder,
        label: remindersLabel
      };
    });
  };

  deleteContract = (toDelete) => {
    const selectedFacility = this.props.selectedFacility;

    if (!this.confirmDelete(toDelete.name)) {
      return Promise.resolve();
    }

    if (!selectedFacility) {
      return Promise.reject(new Error('No Facility ID'));
    }

    return contxtSdk.ems
      .deleteContract(selectedFacility.id, toDelete.id)
      .then(() => {
        NotificationManager.success(
          'The utility contract has been successfully deleted.',
          'Utility Contract Deletion Success'
        );

        this.setState(({ contracts }) => {
          const updatedContracts = contracts.filter(
            (contract) => contract.id !== toDelete.id
          );
          const grouped = _.groupBy(updatedContracts, 'group');

          return {
            contracts: updatedContracts,
            contractsGroupedByStatus: grouped
          };
        });

        this.props.history.push(
          `/${appRoot}${this.props.history.location.search}`
        );
      })
      .catch(() => {
        NotificationManager.error(
          'There was an error deleting this utility contract. Please try again.',
          'Utility Contract Deletion Error'
        );
      });
  };

  deleteContractFile = (storedFileId) => {
    return contxtSdk.files
      .delete(storedFileId)
      .then(() => {
        this.clearSelectedContractFile();
        return this.updateContract({ fileId: null });
      })
      .catch(() => {
        NotificationManager.error(
          'There was an error deleting the file from a Utility Contract. Please try again.',
          'Utility Contract Error'
        );
      });
  };

  filterContracts = (event) => {
    if (!event || !event.target.value.length) {
      return this.setState({ filteredContracts: [] });
    }

    const eventTargetValue = event.target.value;

    this.setState(({ contracts = [] }) => ({
      filteredContracts: contracts
        .map((contract) => {
          return {
            id: contract.id,
            group: contract.group,
            icon: contract.icon,
            isSelected: contract.isSelected,
            label: contract.label,
            subText: contract.subText,
            url: contract.url
          };
        })
        .filter(
          (contract) =>
            contract.label
              .toLowerCase()
              .indexOf(eventTargetValue.toLowerCase()) > -1
        )
    }));
  };

  /**
   * Filter users by searching against an array of search terms.
   * When multiple search terms are provided, the user must match each search
   * term that is provided in order to be returned.
   */
  filterUsers = _.debounce(
    (searchTerms = []) => {
      return this.setState((state) => {
        const filteredUsers = searchTerms
          .reduce((usersMemo, searchTerm) => {
            if (!searchTerm) {
              return usersMemo;
            }

            return usersMemo.filter((user) => {
              return (
                user.firstName.toLowerCase().indexOf(searchTerm.toLowerCase()) >
                  -1 ||
                user.lastName.toLowerCase().indexOf(searchTerm.toLowerCase()) >
                  -1 ||
                user.email.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
              );
            });
          }, state.users)
          .map((user) => {
            return {
              userId: user.userId,
              name: `${user.lastName}, ${user.firstName}`,
              email: user.email,
              icon: 'icon-cancel',
              label:
                user.lastName + ', ' + user.firstName + ' (' + user.email + ')'
            };
          })
          .sort((userA, userB) => {
            if (userA.lastName > userB.lastName) return 1;
            if (userA.lastName < userB.lastName) return -1;
            return 0;
          });

        return {
          filteredUsers
        };
      });
    },
    300,
    { trailing: true }
  );

  formatSaveReminders() {
    return this.state.reminders.map((user) => {
      return user.userId;
    });
  }

  formatUser(user) {
    return {
      ...user,
      email: user.email,
      label: user.name + ' (' + user.email + ')'
    };
  }

  formatUsers(orgUsers) {
    return orgUsers.map((user) => {
      return {
        userId: user.id,
        lastName: user.lastName,
        firstName: user.firstName,
        email: user.email,
        label: user.lastName + ', ' + user.firstName + ' (' + user.email + ')'
      };
    });
  }

  getFile(fileId) {
    if (!fileId) {
      return Promise.resolve();
    } else if (fileId === this.state.selectedContract.fileId) {
      return Promise.resolve(this.state.selectedContract.file);
    }

    return contxtSdk.files
      .download(fileId)
      .then((file) => {
        if (!file) {
          return {};
        }

        return file.downloadInfo;
      })
      .catch(() => {
        throw new Error('Error Retrieving File Url');
      });
  }

  getUserInfo(fileCreatorId) {
    if (!fileCreatorId) {
      return Promise.resolve();
    }

    return contxtSdk.coordinator.users
      .get(fileCreatorId)
      .then((user) => {
        if (!user) {
          return {};
        }

        const userInfo = {
          email: user.email,
          fullName: `${user.firstName} ${user.lastName}`
        };
        return userInfo;
      })
      .catch(() => {
        throw new Error('Error Retrieving User Info');
      });
  }

  loadUsersForOrganization(organization = {}) {
    if (!organization.id) {
      return Promise.resolve();
    }

    return contxtSdk.coordinator.users
      .getByOrganizationId(organization.id)
      .then(this.formatUsers)
      .catch(() => {
        NotificationManager.error(
          'There was an error retrieving a list of users for this organization.',
          'Utility Contract Error'
        );
      });
  }

  initializeFacility(organization = {}, facility = {}) {
    this.setState({ isLoadingContracts: true });

    return Promise.all([
      this.loadContractsForFacility(facility),
      this.loadUsersForOrganization(organization),
      this.loadWriteScopeForCurrentUser()
    ])
      .then(([contracts, users, hasWriteScope]) => {
        return this.setState({
          contracts,
          contractsGroupedByStatus: _.groupBy(contracts, 'group'),
          filteredUsers: [],
          hasWriteScope,
          isLoadingContracts: false,
          reminders: [],
          selectedContract: {},
          users
        });
      })
      .catch(() => {
        NotificationManager.error(
          'There was an error loading. Please refresh the page and try again.',
          'Utility Contract Load Error'
        );
      });
  }

  loadContractsForFacility(facility = {}) {
    if (!facility.id) {
      return Promise.resolve([]);
    }

    return contxtSdk.ems
      .getContractsByFacility(facility.id)
      .then((contracts) => {
        return this.decorateContracts(_.sortBy(contracts, 'endDate').reverse());
      });
  }

  loadContractDetails = (contractId = '') => {
    if (!contractId) {
      return this.setState({
        isLoadingContractDetails: false,
        selectedContract: {},
        reminders: [],
        droppedFile: null
      });
    }

    const selectedContract = _.find(
      this.state.contracts,
      (contract) => `${contract.id}` === `${contractId}`
    );

    if (!selectedContract) {
      return Promise.resolve();
    }

    this.setState({ isLoadingContractDetails: true });

    selectedContract.isSelected = true;

    return Promise.all([
      this.getFile(selectedContract.fileId),
      this.getUserInfo(selectedContract.createdBy)
    ])
      .then(([file, createdByUser]) => {
        const selectedContractWithFile = {
          ...selectedContract,
          file,
          createdByUser
        };
        return selectedContractWithFile;
      })
      .then((selectedContract) => {
        const reminders = this.decorateReminders(
          selectedContract.utilityContractReminders,
          this.state.users
        );

        return this.setState({
          isLoadingContractDetails: false,
          selectedContract: {
            ...selectedContract,
            endDate: moment(selectedContract.endDate, 'YYYY-MM-DD'),
            startDate: moment(selectedContract.startDate, 'YYYY-MM-DD')
          },
          reminders,
          previewFile: null
        });
      })
      .catch(() => {
        NotificationManager.error(
          'There was an error loading this contract details. Please refresh the page and try again.',
          'Utility Contract Load Error'
        );

        return this.setState({ isLoadingContractDetails: false });
      });
  };

  /**
   * Loads the Facility and its associated Utility Contracts.
   * If a selectedContractId is provided, and that ID also belongs to the Facility,
   * the contract will be loaded and displayed.
   * If no contract is provided, but the Facility has some contracts,
   * display the contract which will expires the farthest in the future.
   * If no contract is provided, and the Facility has no contracts,
   * display the new Contract Form so the user can enter details.
   *
   * @param {Object} selectedOrganization The selected Organization
   * @param {Object} selectedFacility The selected Facility
   * @param {string} selectedContractId The selected Utility Contract ID
   */
  loadFacilityWithDefaultContractSelected(
    selectedOrganization = {},
    selectedFacility = {},
    selectedContractId = ''
  ) {
    return this.initializeFacility(selectedOrganization, selectedFacility).then(
      () => {
        const contracts = this.state.contracts;
        const contractBelongsToFacility = !!contracts.find(
          (x) => x.id === selectedContractId
        );

        if (selectedContractId && contractBelongsToFacility) {
          // If there is a Contract ID in the URL, and it belongs to the Facility, load it
          return this.initializeSelectedContract(selectedContractId);
        } else if (contracts.length) {
          // If there is No Contract ID in URL, but Facility has contracts,
          // load the one at the top of the left-hand navigation.
          this.props.history.push(
            `/${appRoot}/contract/${contracts[0].id}${this.props.history.location.search}`
          );
        } else {
          // Otherwise, load the New Contract Form
          this.props.history.push(
            `/${appRoot}/contract/new${this.props.history.location.search}`
          );
        }
      }
    );
  }

  loadWriteScopeForCurrentUser() {
    return nsightUtils.checkForUserScope('ems', 'write:utility_contracts');
  }

  onFileDrop = (droppedFiles) => {
    const [file] = droppedFiles;

    if (!file) {
      NotificationManager.error(
        'Only PDF, PNG, JPEG, JPG file types are accepted',
        'File Error'
      );

      return;
    }

    this.setState({
      droppedFile: Object.assign(file, {
        preview: URL.createObjectURL(file)
      })
    });
  };

  onFilterUsers = (event) => {
    if (!event || !event.target.value.length) {
      return this.setState({ filteredUsers: [] });
    }

    // Split the search input box into multiple terms based on spaces in the text box
    const searchTerms = (event.target.value || '').split(' ');
    return this.filterUsers(searchTerms);
  };

  removeReminder = (reminder) => {
    this.setState((prevState) => ({
      reminderChanged: true,
      reminders: prevState.reminders.filter(function(reminderItem) {
        return reminderItem.userId !== reminder.userId;
      })
    }));
  };

  resetForm = (reset) => {
    reset();
    this.setState({ filteredUsers: [], reminderChanged: false });
    this.clearPreviewFile();
    this.initializeSelectedContract(this.props.match.params.contractId);
  };

  saveContractFile = (contractId) => {
    if (!this.state.droppedFile.preview) {
      return Promise.resolve();
    }

    return contxtSdk.files
      .createAndUpload({
        data: this.state.droppedFile,
        metadata: {
          contentType: this.state.droppedFile.type,
          description: this.state.droppedFile.name,
          filename: this.state.droppedFile.name,
          organizationId: this.props.selectedOrganization.id
        }
      })
      .then((file) => {
        if (!file) {
          return Promise.resolve();
        }

        return this.updateContractFileId(file.id, contractId);
      })
      .catch(() => {
        NotificationManager.error(
          'There was an error saving the file to the Utility Contract. Please try again.',
          'Utility Contract Error'
        );
      });
  };

  updateContract = (values) => {
    const { contractId } = this.props.match.params;
    const selectedFacility = this.props.selectedFacility;

    this.setState({ filteredUsers: [] });

    const updatedContract = {
      ...values,
      startDate: moment(values.startDate).format('YYYY-MM-DD'),
      endDate: moment(values.endDate).format('YYYY-MM-DD'),
      utilityContractReminders: this.state.reminders
    };
    const contractUpdate = {
      ...updatedContract,
      utilityContractReminders: this.formatSaveReminders()
    };

    return contxtSdk.ems
      .updateContract(selectedFacility.id, contractId, contractUpdate)
      .then(() => {
        if (!this.state.droppedFile) {
          return this.state.selectedContract.fileId;
        }

        return this.saveContractFile(contractId);
      })
      .then((fileId) => {
        this.setState(({ contracts }) => {
          const updatedContracts = [...contracts];

          const updatedContractIndex = _.findIndex(
            updatedContracts,
            (contract) => contract.id === updatedContract.id
          );

          updatedContracts[updatedContractIndex] = this.decorateContract({
            ...updatedContract,
            fileId
          });

          const grouped = _.groupBy(updatedContracts, 'group');

          return {
            contracts: updatedContracts,
            contractsGroupedByStatus: grouped
          };
        });

        NotificationManager.success(
          'This utility contract has been updated successfully',
          'Utility Contract Update Success'
        );

        this.props.history.push(
          `/${appRoot}/contract/${contractId}${this.props.history.location.search}`
        );
      })
      .then(() => {
        this.clearPreviewFile();
        this.initializeSelectedContract(contractId);
      })
      .catch(() => {
        NotificationManager.error(
          'There was an error updating the Utility Contract. Please try again.',
          'Utility Contract Update Failure'
        );
      });
  };

  updateContractFileId = (fileId, contractId) => {
    const selectedFacility = this.props.selectedFacility;

    const contractBody = {
      fileId: fileId,
      utilityContractReminders: this.formatSaveReminders()
    };

    if (!fileId || !contractId) {
      const errType = !fileId ? 'file ' : 'contract ID';
      return Promise.reject(new Error('No ' + errType + ' specifed'));
    }

    return contxtSdk.ems
      .updateContract(selectedFacility.id, contractId, contractBody)
      .then(() => {
        return fileId;
      })
      .catch(() => {
        NotificationManager.error(
          'There was an error saving the file from this Utility Contract. Please try again.',
          'Utility Contract Update Failure'
        );
      });
  };

  initializeSelectedContract = (selectedContractId = '') => {
    this.setState(({ contracts }) => {
      const updatedContracts = [...contracts];

      updatedContracts.forEach((contract) => {
        contract.isSelected = `${contract.id}` === selectedContractId;
      });

      return {
        contracts: updatedContracts,
        contractsGroupedByStatus: _.groupBy(updatedContracts, 'group'),
        filteredUsers: []
      };
    });

    return this.loadContractDetails(selectedContractId);
  };

  validateContract = (values) => {
    const errors = [
      'endDate',
      'name',
      'rateNarrative',
      'startDate',
      'status'
    ].reduce((memo, key) => {
      if (!values[key]) {
        memo[key] = `A ${_.startCase(
          key
        )} is required to create a utility contract`;
      }

      return memo;
    }, {});

    if (values.startDate && moment(values.startDate).isAfter(values.endDate)) {
      errors.startDate = 'A start date cannot be before an end date';
    }

    return errors;
  };

  render() {
    return !this.props.hasSelectedFacility ? (
      <MissingSelection requiredType="facility" />
    ) : (
      <Fragment>
        <NotificationContainer />
        <FacilityContract
          addReminder={this.addReminder}
          contractMode={this.props.contractMode}
          contractsGroupedByStatus={this.state.contractsGroupedByStatus}
          createContract={this.createContract}
          deleteContract={this.deleteContract}
          deleteContractFile={this.deleteContractFile}
          filterContracts={this.filterContracts}
          filteredContracts={this.state.filteredContracts}
          filteredUsers={this.state.filteredUsers}
          filterUsers={this.onFilterUsers}
          handleFileDrop={this.onFileDrop}
          handleQueuedFileClear={this.clearPreviewFile}
          hasWriteScope={this.state.hasWriteScope}
          isLoadingContractDetails={this.state.isLoadingContractDetails}
          isLoadingContracts={
            !this.props.hasCompletedFacilities || this.state.isLoadingContracts
          }
          queuedFile={this.state.droppedFile}
          reminderChanged={this.state.reminderChanged}
          reminders={this.state.reminders}
          removeReminder={this.removeReminder}
          resetForm={this.resetForm}
          selectedContract={this.state.selectedContract}
          updateContract={this.updateContract}
          users={this.state.users}
          validateContract={this.validateContract}
        />
      </Fragment>
    );
  }
}
function mapStateToProps(state) {
  const hasCompletedFacilities = getFacilitiesCompletionStatus(state);
  const selectedFacility = getSelectedFacility(state);
  const selectedFacilitySlug = getSelectedFacilitySlug(state);
  const selectedOrganization = getSelectedOrganization(state);
  const selectedOrganizationSlug = getSelectedOrganizationSlug(state);

  const hasSelectedFacility =
    !!(
      selectedOrganizationSlug &&
      selectedFacilitySlug &&
      !hasCompletedFacilities
    ) || !!(selectedOrganization && selectedFacility);

  return {
    hasCompletedFacilities,
    selectedFacility,
    selectedFacilitySlug,
    selectedOrganization,
    selectedOrganizationSlug,
    hasSelectedFacility
  };
}
export default connect(mapStateToProps)(FacilityContractContainer);
