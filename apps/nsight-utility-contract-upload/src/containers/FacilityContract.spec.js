import React from 'react';
import { NotificationManager } from 'react-notifications';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import faker from 'faker';
import { FORM_ERROR } from 'final-form';
import _ from 'lodash';
import moment from 'moment';
import sinon from 'sinon';

import { utils as nsightUtils } from '@ndustrial/nsight-common';
import { contxtSdk } from '@ndustrial/nsight-common/utils';
import { fixtures } from '@ndustrial/nsight-test-utils';

import EmsModule from '../services/EmsModule';
import { FacilityContractContainer } from './FacilityContract';

describe('nsight-utility-contract-upload/containers/FacilityContractContainer', function() {
  let appRoot;
  let baseProps;
  let wrapper;

  before(function() {
    contxtSdk.mountDynamicModule('ems', {
      clientId: contxtSdk.config.audiences.ems.clientId,
      host: contxtSdk.config.audiences.ems.host,
      module: EmsModule
    });
  });

  beforeEach(function() {
    this.sandbox = sinon.createSandbox();

    appRoot = 'utility-contract-upload';

    baseProps = {
      history: {
        location: {
          search: `?organization=${faker.lorem.word()}&facility=${faker.lorem.word()}`
        },
        push: this.sandbox.stub()
      },
      match: {
        params: {
          contractId: fixtures.build('contract').id.toString()
        }
      },
      selectedFacility: fixtures.build('facility'),
      selectedOrganization: fixtures.build('organization'),
      contractMode: 'view'
    };

    wrapper = shallow(<FacilityContractContainer {...baseProps} />, {
      disableLifecycleMethods: true
    });
  });

  afterEach(function() {
    this.sandbox.restore();
  });

  after(function() {
    contxtSdk.unmountDynamicModule('ems');
  });

  describe('constructor', function() {
    it('sets up an initial state', function() {
      const {
        contracts,
        contractsGroupedByStatus,
        filteredContracts,
        filteredUsers,
        hasWriteScope,
        isLoadingContracts,
        isLoadingContractDetails,
        reminderChanged,
        reminders,
        selectedContract,
        users
      } = wrapper.state();
      expect(contracts).to.deep.equal([]);
      expect(contractsGroupedByStatus).to.deep.equal({});
      expect(filteredContracts).to.deep.equal([]);
      expect(filteredUsers).to.deep.equal([]);
      expect(hasWriteScope).to.equal(false);
      expect(isLoadingContracts).to.equal(false);
      expect(isLoadingContractDetails).to.equal(false);
      expect(reminderChanged).to.equal(false);
      expect(reminders).to.deep.equal([]);
      expect(selectedContract).to.deep.equal({});
      expect(users).to.deep.equal([]);
    });
  });

  describe('componentDidMount', function() {
    let loadFacilityWithDefaultContractSelectedStub;

    beforeEach(function() {
      loadFacilityWithDefaultContractSelectedStub = this.sandbox
        .stub(
          FacilityContractContainer.prototype,
          'loadFacilityWithDefaultContractSelected'
        )
        .resolves();

      wrapper.instance().componentDidMount(baseProps);
    });

    it('calls the load function with correct parameters', function() {
      expect(
        loadFacilityWithDefaultContractSelectedStub.calledWith(
          baseProps.selectedOrganization,
          baseProps.selectedFacility,
          baseProps.match.params.contractId
        )
      ).to.be.true();
    });
  });

  describe('componentDidUpdate', function() {
    let initializeSelectedContractStub;
    let loadFacilityWithDefaultContractSelectedStub;

    beforeEach(function() {
      initializeSelectedContractStub = this.sandbox
        .stub(wrapper.instance(), 'initializeSelectedContract')
        .resolves();

      loadFacilityWithDefaultContractSelectedStub = this.sandbox
        .stub(
          FacilityContractContainer.prototype,
          'loadFacilityWithDefaultContractSelected'
        )
        .resolves();
    });

    context('when the selected facility changes', function() {
      let propUpdate;

      beforeEach(function() {
        propUpdate = {
          match: {
            ...baseProps.match
          },
          selectedOrganization: {
            ...baseProps.selectedOrganization
          },
          selectedFacility: {
            slug: faker.random.word(),
            id: faker.random.number({
              min: baseProps.selectedFacility.id + 1
            })
          }
        };

        wrapper.setProps(propUpdate);
        wrapper.instance().componentDidUpdate(baseProps);
      });

      it('should call a function to load the faclity with default contract selected', function() {
        expect(
          loadFacilityWithDefaultContractSelectedStub.calledWith(
            propUpdate.selectedOrganization,
            propUpdate.selectedFacility,
            propUpdate.match.params.contractId
          )
        ).to.be.true();
      });
    });

    context('when a random prop changes', function() {
      beforeEach(function() {
        const propUpdate = {
          [faker.hacker.adjective()]: faker.hacker.phrase()
        };

        wrapper.setProps(propUpdate);

        wrapper.instance().componentDidUpdate(baseProps);
      });

      it('does not re-load facility with default contract selected', function() {
        expect(loadFacilityWithDefaultContractSelectedStub).to.not.be.called();
      });

      it('does not re-load selected contract', function() {
        expect(initializeSelectedContractStub).to.not.be.called();
      });
    });

    context('when the selected contract changes', function() {
      it('should make a call to initialize the selected contract', function() {
        const propUpdate = {
          match: {
            ...baseProps.match,
            params: {
              ...baseProps.match.params,
              contractId: null
            }
          }
        };

        wrapper.setProps(propUpdate);
        wrapper.instance().componentDidUpdate(baseProps);

        expect(
          initializeSelectedContractStub.calledWith(
            propUpdate.match.params.contractId
          )
        ).to.be.true();
      });
    });
  });

  describe('addReminder', function() {
    let remindersInputRef;
    let filteredUsers;
    let newReminder;
    let users;

    beforeEach(function() {
      wrapper.setState({ reminders: [] });
    });

    context('sets state when new contract is added', function() {
      beforeEach(function() {
        users = fixtures.buildList(
          'user',
          faker.random.number({ min: 1, max: 10 })
        );

        filteredUsers = {
          id: users[0].id,
          label:
            users[0].lastName +
            ', ' +
            users[0].firstName +
            ' (' +
            users[0].email +
            ')',
          icon: 'icon-cancel',
          name: users[0].lastName + ', ' + users[0].firstName,
          email: users[0].email
        };

        newReminder = fixtures.build('reminder');

        remindersInputRef = {
          current: {
            value: 'stuff'
          }
        };

        wrapper.instance().refs = remindersInputRef;
        wrapper.setState({ filteredUsers: filteredUsers });
        wrapper.instance().addReminder(newReminder, remindersInputRef);
      });

      it('will add new reminder when callback is invoked', function() {
        expect(wrapper.state('reminders')).to.have.lengthOf(1);
        expect(wrapper.state('reminders')).to.include(newReminder);
      });

      it('resets filtered users when callback is invoked', function() {
        expect(wrapper.state('filteredUsers')).to.deep.equal([]);
      });

      it('clears search input when callback is invoked', function() {
        expect(remindersInputRef.current.value).to.equal('');
      });
    });
  });

  describe('clearPreviewFile', function() {
    let droppedFileFixture;
    let URL;
    let revokeObjectURL;

    beforeEach(function() {
      droppedFileFixture = fixtures.build('browserFile', {
        preview: `blob:${faker.internet.url()}`
      });

      revokeObjectURL = this.sandbox.stub();

      URL = global.URL;

      global.URL = {
        revokeObjectURL
      };

      wrapper.setState({ droppedFile: droppedFileFixture });

      wrapper.instance().clearPreviewFile();
    });

    afterEach(function() {
      global.URL = URL;
    });

    it('will set state to null', function() {
      const { droppedFile } = wrapper.state();
      expect(droppedFile).to.deep.equal(null);
    });

    it('will call revokeObjectUrl', function() {
      expect(revokeObjectURL).to.be.called();

      expect(revokeObjectURL).to.be.calledWith(droppedFileFixture.preview);
    });
  });

  describe('clearSelectedContractFile', function() {
    beforeEach(function() {
      wrapper.setState({
        selectedContract: {
          file: faker.hacker.noun()
        }
      });
      wrapper.instance().clearSelectedContractFile();
    });

    it('will set the selected contract file to null', function() {
      const { selectedContract } = wrapper.state();
      expect(selectedContract.file).to.deep.equal(null);
    });
  });

  describe('createContract', function() {
    let contractFixture;
    let createContract;
    let droppedFileFixture;
    let facilityFixture;
    let notificationSuccess;
    let organizationFixture;
    let promise;
    let saveContractFile;

    beforeEach(function() {
      organizationFixture = fixtures.build('organization', {
        id: baseProps.selectedOrganization.id
      });

      facilityFixture = fixtures.build('facility', {
        id: baseProps.selectedFacility.id,
        organizationId: organizationFixture.id
      });

      contractFixture = fixtures.build('contract', {
        facilityId: facilityFixture.id
      });

      droppedFileFixture = fixtures.build('browserFile', {
        preview: `blob:${faker.internet.url()}`
      });
    });

    context('on successful create', function() {
      beforeEach(function() {
        createContract = this.sandbox
          .stub(contxtSdk.ems, 'createContract')
          .resolves(contractFixture);
        notificationSuccess = this.sandbox.stub(NotificationManager, 'success');
        saveContractFile = this.sandbox
          .stub(wrapper.instance(), 'saveContractFile')
          .resolves(contractFixture.fileId);

        wrapper.setState({ droppedFile: droppedFileFixture });

        promise = wrapper.instance().createContract(contractFixture);
      });

      it('will call createContract', function() {
        expect(createContract).to.be.calledWith(contractFixture);
      });

      it('saves the contract file', function() {
        return promise.then(() => {
          expect(saveContractFile).to.be.calledWith(contractFixture.id);
        });
      });

      it('notifies the user things have processed succesfully', function() {
        return promise.then(() => {
          expect(notificationSuccess).to.be.calledWith(
            'This utility contract has been created successfully',
            'Utility Contract Creation Success'
          );
        });
      });

      it("navigates to the new contract's URL", function() {
        return promise.then(() => {
          expect(baseProps.history.push).to.be.calledWith(
            `/${appRoot}/contract/${contractFixture.id}${baseProps.history.location.search}`
          );
        });
      });

      it('sets the new contract to selected', function() {
        return promise.then(() => {
          const selectedContract = _.find(
            wrapper.state('contracts'),
            (x) => x.id === contractFixture.id
          );
          expect(selectedContract.isSelected).to.equal(true);
        });
      });

      it('returns a fulfilled promise', function() {
        return expect(promise).to.be.fulfilled();
      });

      it('adds the newly created contract to the state', function() {
        return promise.then(() => {
          const newContract = _.find(
            wrapper.state('contracts'),
            (contract) => contract.id === contractFixture.id
          );
          expect(newContract).to.include(contractFixture);
        });
      });
    });

    context('on failed create', function() {
      let notificationError;

      beforeEach(function() {
        createContract = this.sandbox
          .stub(contxtSdk.ems, 'createContract')
          .rejects();

        notificationError = this.sandbox.stub(NotificationManager, 'error');

        promise = wrapper.instance().createContract(createContract);
      });

      it('calls notification error once', function() {
        return promise.then(() => {
          expect(notificationError).to.be.calledOnce();
        });
      });

      it('shows an error notification', function() {
        return promise.then(() => {
          expect(notificationError).to.be.calledWith(
            'There was an error creating this utility contract. Please try again.',
            'Utility Contract Creation Error'
          );
        });
      });
    });
  });

  describe('decorateContracts', function() {
    let contractFixtures;
    let decorateContractStub;

    beforeEach(function() {
      contractFixtures = fixtures.buildList(
        'contract',
        faker.random.number({ min: 1, max: 10 })
      );

      decorateContractStub = this.sandbox.stub(
        wrapper.instance(),
        'decorateContract'
      );
    });

    it('should call decorateContract for each contract', function() {
      wrapper.instance().decorateContracts(contractFixtures);
      contractFixtures.forEach((contract) => {
        expect(decorateContractStub.calledWith(contract)).to.equal(true);
      });
    });
  });

  describe('deleteContract', function() {
    let contract;
    let selectedFacility;
    let promise;

    context("When the user doesn't confirm the deletion", function() {
      beforeEach(function() {
        this.sandbox
          .stub(FacilityContractContainer.prototype, 'confirmDelete')
          .returns(false);

        contract = { id: faker.random.number() };
        promise = wrapper.instance().deleteContract(contract.id);
      });

      it('returns undefined', function() {
        expect(promise).to.be.fulfilled.and.to.eventually.be.undefined();
      });
    });

    context("When the request doesn't contain a facility ID", function() {
      let noFacilityProps;
      beforeEach(function() {
        this.sandbox
          .stub(FacilityContractContainer.prototype, 'confirmDelete')
          .returns(true);

        noFacilityProps = {
          ...baseProps,
          selectedFacility: null
        };

        wrapper = shallow(<FacilityContractContainer {...noFacilityProps} />, {
          disableLifecycleMethods: true
        });

        contract = { id: faker.random.number() };
        promise = wrapper.instance().deleteContract(contract);
      });

      it('returns undefined', function() {
        expect(promise).to.eventually.be.rejectedWith('No Facility ID');
      });
    });

    context('a successful deletion of a facility attribute', function() {
      let deletedContract;
      let notificationSuccess;
      let sdkDeleteContract;

      beforeEach(function() {
        deletedContract = { id: baseProps.match.params.contractId };
        selectedFacility = baseProps.selectedFacility;

        sdkDeleteContract = this.sandbox
          .stub(contxtSdk.ems, 'deleteContract')
          .resolves();

        this.sandbox
          .stub(FacilityContractContainer.prototype, 'confirmDelete')
          .returns(true);

        notificationSuccess = this.sandbox.stub(NotificationManager, 'success');

        promise = wrapper.instance().deleteContract(deletedContract);
      });

      it('deletes the utility contract', function() {
        expect(sdkDeleteContract).to.be.calledWith(
          selectedFacility.id,
          deletedContract.id
        );
      });

      it('calls notification success once', function() {
        return promise.then(() => {
          expect(notificationSuccess).to.be.calledOnce();
        });
      });

      it('shows a success notification', function() {
        return promise.then(() => {
          expect(notificationSuccess).to.be.calledWith(
            'The utility contract has been successfully deleted.',
            'Utility Contract Deletion Success'
          );
        });
      });

      it('removes the contract from the list of contracts in the component state', function() {
        return promise.then(() => {
          const removedContract = _.find(
            wrapper.state('contracts'),
            (contract) => `${contract.id}` === deletedContract.id
          );
          expect(removedContract).to.equal(undefined);
        });
      });
    });

    context('a failed deletion of a utility contract', function() {
      let promise;
      let notificationError;

      beforeEach(function() {
        this.sandbox.stub(contxtSdk.ems, 'deleteContract').rejects();

        this.sandbox
          .stub(FacilityContractContainer.prototype, 'confirmDelete')
          .returns(true);

        notificationError = this.sandbox.stub(NotificationManager, 'error');

        promise = wrapper
          .instance()
          .deleteContract({ id: faker.random.number() });
      });

      it('returns a fulfilled promise', function() {
        return expect(promise).to.be.fulfilled();
      });

      it('calls notification error once', function() {
        return promise.then(() => {
          expect(notificationError).to.be.calledOnce();
        });
      });

      it('returns with an error message in the notification manager', function() {
        return promise.then(() => {
          expect(notificationError).to.be.calledWith(
            'There was an error deleting this utility contract. Please try again.',
            'Utility Contract Deletion Error'
          );
        });
      });
    });
  });

  describe('deleteContractFile', function() {
    context('when successful', function() {
      let contractFixture;
      let deleteFile;
      let facilityFixture;
      let notificationSuccess;
      let promise;
      let props;
      let storedFileFixture;
      let updateContract;

      beforeEach(function() {
        facilityFixture = fixtures.build('facility', {
          id: baseProps.selectedFacility.id
        });
        contractFixture = fixtures.build('contract', {
          facilityId: facilityFixture.id
        });
        storedFileFixture = fixtures.build('file');

        props = {
          ...baseProps,
          match: {
            params: {
              contractId: `${contractFixture.id}`
            }
          },
          selectedFacility: {
            id: facilityFixture.id,
            slug: facilityFixture.slug
          }
        };

        notificationSuccess = this.sandbox.stub(NotificationManager, 'success');

        deleteFile = this.sandbox.stub(contxtSdk.files, 'delete').resolves();

        updateContract = this.sandbox
          .stub(contxtSdk.ems, 'updateContract')
          .resolves();

        wrapper = shallow(<FacilityContractContainer {...props} />, {
          disableLifecycleMethods: true
        });

        promise = wrapper.instance().deleteContractFile(storedFileFixture.id);
      });

      it('will call deleteFile to delete from files API', function() {
        return promise.then(() => {
          expect(deleteFile).to.be.calledWith(storedFileFixture.id);

          expect(deleteFile).to.be.calledOnce();
        });
      });

      it('will call sdk to update utility contract', function() {
        return promise.then(() => {
          expect(updateContract).to.be.calledWith(
            props.selectedFacility.id,
            props.match.params.contractId,
            {
              endDate: moment().format('YYYY-MM-DD'),
              fileId: null,
              startDate: moment().format('YYYY-MM-DD'),
              utilityContractReminders: []
            }
          );

          expect(updateContract).to.be.calledOnce();
        });
      });

      it('shows a success notification', function() {
        return promise.then(() => {
          expect(notificationSuccess).to.be.calledWith(
            'This utility contract has been updated successfully',
            'Utility Contract Update Success'
          );
        });
      });
    });

    context('when deleting to the sdk fails', function() {
      let facilityFixture;
      let storedFileFixture;
      let props;
      let notificationError;
      let updateContract;
      let promise;

      beforeEach(function() {
        facilityFixture = fixtures.build('facility');
        storedFileFixture = fixtures.build('browserFile');

        notificationError = this.sandbox.stub(NotificationManager, 'error');

        props = {
          ...baseProps,
          selectedFacility: {
            id: facilityFixture.id
          }
        };

        this.sandbox.stub(contxtSdk.files, 'delete').rejects();

        updateContract = this.sandbox.stub(contxtSdk.ems, 'updateContract');

        wrapper = shallow(<FacilityContractContainer {...props} />, {
          disableLifecycleMethods: true
        });

        promise = wrapper.instance().deleteContractFile(storedFileFixture.id);
      });

      it('shows an error notification', function() {
        return promise.then(() => {
          expect(notificationError).to.be.calledOnce();
          expect(notificationError).to.be.calledWith(
            'There was an error deleting the file from a Utility Contract. Please try again.',
            'Utility Contract Error'
          );
        });
      });

      it('will not try to update contract on the sdk api', function() {
        return promise.then(() => {
          expect(updateContract).to.not.be.called();
        });
      });
    });

    context('when updating utility contract to sdk fails', function() {
      let facilityFixture;
      let contractFixture;
      let storedFileFixture;
      let props;
      let notificationError;
      let deleteFile;
      let promise;

      beforeEach(function() {
        facilityFixture = fixtures.build('facility', {
          id: baseProps.selectedFacility.id
        });
        contractFixture = fixtures.build('contract', {
          facilityId: facilityFixture.id
        });
        storedFileFixture = fixtures.build('file');

        props = {
          ...baseProps,
          match: {
            params: {
              contractId: `${contractFixture.id}`
            }
          },
          selectedFacility: {
            id: facilityFixture.id
          }
        };

        notificationError = this.sandbox.stub(NotificationManager, 'error');

        deleteFile = this.sandbox.stub(contxtSdk.files, 'delete').resolves();

        this.sandbox.stub(contxtSdk.ems, 'updateContract').rejects();

        wrapper = shallow(<FacilityContractContainer {...props} />, {
          disableLifecycleMethods: true
        });

        promise = wrapper.instance().deleteContractFile(storedFileFixture.id);
      });

      it('shows an error notification', function() {
        return promise.then(() => {
          expect(notificationError).to.be.calledOnce();

          expect(notificationError).to.be.calledWith(
            'There was an error updating the Utility Contract. Please try again.',
            'Utility Contract Update Failure'
          );
        });
      });

      it('will call createAndUploadFiles to create and upload to API', function() {
        return promise.then(() => {
          expect(deleteFile).to.be.calledWith(storedFileFixture.id);

          expect(deleteFile).to.be.calledOnce();
        });
      });
    });
  });

  describe('filterUsers', function() {
    let clock;
    let debounceDelay;
    let expectedUsers;
    let users;

    beforeEach(function() {
      clock = sinon.useFakeTimers();
      debounceDelay = 500; // filter function delay in ms

      users = fixtures.buildList(
        'user',
        faker.random.number({ min: 1, max: 10 })
      );
      expectedUsers = [
        {
          userId: users[0].userId,
          label:
            users[0].lastName +
            ', ' +
            users[0].firstName +
            ' (' +
            users[0].email +
            ')',
          icon: 'icon-cancel',
          name: users[0].lastName + ', ' + users[0].firstName,
          email: users[0].email
        }
      ];
      wrapper.setState({ users: users });
    });

    afterEach(function() {
      clock.restore();
    });

    it('should correctly filter users by email address', function() {
      wrapper.instance().filterUsers([users[0].email]);
      clock.tick(debounceDelay);
      expect(wrapper.state('filteredUsers')).to.deep.equal(expectedUsers);
    });

    it('should correctly filter users by first name', function() {
      wrapper.instance().filterUsers([users[0].firstName]);
      clock.tick(debounceDelay);
      expect(wrapper.state('filteredUsers')).to.have.lengthOf.at.least(1);
      wrapper.state('filteredUsers').forEach((filteredUser) => {
        expect(filteredUser.name).to.contain(users[0].firstName);
      });
    });

    it('should correctly filter by user last name', function() {
      wrapper.instance().filterUsers([users[0].lastName]);
      clock.tick(debounceDelay);
      expect(wrapper.state('filteredUsers')).to.have.lengthOf.at.least(1);
      wrapper.state('filteredUsers').forEach((filteredUser) => {
        expect(filteredUser.name).to.contain(users[0].lastName);
      });
    });

    it('should correctly filter by user first name and last name', function() {
      wrapper.instance().filterUsers([users[0].firstName, users[0].lastName]);
      clock.tick(debounceDelay);
      expect(wrapper.state('filteredUsers')).to.deep.equal(expectedUsers);
    });

    it('should correctly filter by user last name and first name', function() {
      wrapper.instance().filterUsers([users[0].lastName, users[0].firstName]);
      clock.tick(debounceDelay);
      expect(wrapper.state('filteredUsers')).to.deep.equal(expectedUsers);
    });
  });

  describe('loadUsersForOrganization', function() {
    let expectedUsers;
    let formatUsersStub;
    let getUsers;
    let orgFixture;
    let promise;

    context('successfully returns organization users', function() {
      beforeEach(function() {
        orgFixture = fixtures.build('organization');

        expectedUsers = fixtures.buildList(
          'user',
          faker.random.number({ min: 1, max: 10 })
        );

        getUsers = this.sandbox
          .stub(contxtSdk.coordinator.users, 'getByOrganizationId')
          .resolves(expectedUsers);

        formatUsersStub = this.sandbox
          .stub(FacilityContractContainer.prototype, 'formatUsers')
          .resolves(expectedUsers);

        promise = wrapper.instance().loadUsersForOrganization(orgFixture);
      });

      it('calls the SDK function with the correct parameters', function() {
        return promise.then(() => {
          expect(getUsers.calledWith(orgFixture.id)).to.be.true();
        });
      });

      it('should call the formatUsers function with the SDK response', function() {
        return promise.then(() => {
          expect(formatUsersStub.calledWith(expectedUsers)).to.be.true();
        });
      });

      it('returns the list of users', function() {
        return promise.then((users) => {
          expect(users).to.deep.equal(expectedUsers);
        });
      });
    });

    context('when an org id is not passed', function() {
      let promise;

      beforeEach(function() {
        getUsers = this.sandbox.stub(
          contxtSdk.coordinator.users,
          'getByOrganizationId'
        );

        promise = wrapper.instance().loadUsersForOrganization();
      });

      it('does not call contxt getByOrganizationId', function() {
        return promise.then(() => {
          expect(getUsers).to.not.be.called();
        });
      });
    });

    context('when getting organization users fails', function() {
      let notificationError;
      let orgFixture;
      let promise;

      beforeEach(function() {
        orgFixture = fixtures.build('organization');

        this.sandbox
          .stub(contxtSdk.coordinator.users, 'getByOrganizationId')
          .rejects();

        notificationError = this.sandbox.stub(NotificationManager, 'error');

        promise = wrapper.instance().loadUsersForOrganization(orgFixture);
      });

      it('shows an error notification', function() {
        return promise.then(() => {
          expect(notificationError).to.be.calledWith(
            'There was an error retrieving a list of users for this organization.',
            'Utility Contract Error'
          );
        });
      });
    });
  });

  describe('getFile', function() {
    context(
      'when a file id is passed and there is a valid file in the API',
      function() {
        let fileFixture;
        let getFileInfo;
        let props;
        let promise;

        beforeEach(function() {
          fileFixture = fixtures.build('file');

          props = {
            ...baseProps
          };

          getFileInfo = this.sandbox
            .stub(contxtSdk.files, 'download')
            .resolves(fileFixture);

          wrapper = shallow(<FacilityContractContainer {...props} />, {
            disableLifecycleMethods: true
          });

          promise = wrapper.instance().getFile(fileFixture.id);
        });

        it('will call contxtSdk.files.download() to retrieve file info', function() {
          return promise.then((fileInfo) => {
            expect(fileInfo).to.be.equal(fileFixture.downloadInfo);

            expect(getFileInfo).to.be.calledWith(fileFixture.id);

            expect(getFileInfo).to.be.calledOnce();
          });
        });
      }
    );

    context('when there is no file id', function() {
      let props;
      let promise;

      beforeEach(function() {
        props = {
          ...baseProps
        };

        wrapper = shallow(<FacilityContractContainer {...props} />, {
          disableLifecycleMethods: true
        });

        promise = wrapper.instance().getFile();
      });

      it('returns a fulfilled promise', function() {
        return expect(promise).to.be.fulfilled();
      });
    });

    context(
      'when the file id matches the file id we already have in state',
      function() {
        let fileFixture;
        let getFileInfo;
        let props;
        let promise;

        beforeEach(function() {
          fileFixture = fixtures.build('file');

          props = {
            ...baseProps
          };

          getFileInfo = this.sandbox
            .stub(contxtSdk.files, 'download')
            .resolves(fileFixture);

          wrapper = shallow(<FacilityContractContainer {...props} />, {
            disableLifecycleMethods: true
          });

          wrapper.setState({
            selectedContract: {
              fileId: fileFixture.id,
              file: fileFixture.downloadInfo
            }
          });

          promise = wrapper.instance().getFile(fileFixture.id);
        });

        it('returns the file info we already have without making a new network request', function() {
          return promise.then((fileInfo) => {
            expect(fileInfo).to.be.equal(fileFixture.downloadInfo);

            expect(getFileInfo).to.not.have.been.called();
          });
        });
      }
    );

    context(
      'when a file id is passed and there is no valid file in the API',
      function() {
        let fileFixture;
        let props;
        let promise;

        beforeEach(function() {
          fileFixture = fixtures.build('file');

          props = {
            ...baseProps
          };

          this.sandbox.stub(contxtSdk.files, 'download').resolves(null);

          wrapper = shallow(<FacilityContractContainer {...props} />, {
            disableLifecycleMethods: true
          });

          promise = wrapper.instance().getFile(fileFixture.id);
        });

        it('will return empty object', function() {
          return promise.then((res) => {
            expect(res).to.be.empty();
          });
        });
      }
    );

    context(
      'when a file id is passed and there is an error retrieving a file from the API',
      function() {
        let fileFixture;
        let props;
        let promise;

        beforeEach(function() {
          fileFixture = fixtures.build('file');

          props = {
            ...baseProps
          };

          this.sandbox.stub(contxtSdk.files, 'download').rejects();

          wrapper = shallow(<FacilityContractContainer {...props} />, {
            disableLifecycleMethods: true
          });

          promise = wrapper.instance().getFile(fileFixture.id);
        });

        it('will return an error', function() {
          return promise.catch((err) => {
            expect(err).to.include(Error('Error Retrieving File Url'));
          });
        });
      }
    );
  });

  describe('getUserInfo', function() {
    context(
      'when a fileCreatorId is passed and there is a valid user in the API',
      function() {
        let userFixture;
        let getUserInfo;
        let props;
        let promise;

        beforeEach(function() {
          userFixture = fixtures.build('user');

          props = {
            ...baseProps
          };

          getUserInfo = this.sandbox
            .stub(contxtSdk.coordinator.users, 'get')
            .resolves(userFixture);

          wrapper = shallow(<FacilityContractContainer {...props} />, {
            disableLifecycleMethods: true
          });

          promise = wrapper.instance().getUserInfo(userFixture.id);
        });

        it('will call contxtSdk.coordinator.getUser() to retrieve userInfo', function() {
          return promise.then((userInfo) => {
            expect(userInfo).to.deep.equal({
              email: userFixture.email,
              fullName: `${userFixture.firstName} ${userFixture.lastName}`
            });

            expect(getUserInfo).to.be.calledWith(userFixture.id);

            expect(getUserInfo).to.be.calledOnce();
          });
        });
      }
    );

    context('when there is no fileCreatorId', function() {
      let props;
      let promise;

      beforeEach(function() {
        props = {
          ...baseProps
        };

        wrapper = shallow(<FacilityContractContainer {...props} />, {
          disableLifecycleMethods: true
        });

        promise = wrapper.instance().getUserInfo();
      });

      it('returns a fulfilled promise', function() {
        return expect(promise).to.be.fulfilled();
      });
    });

    context(
      'when a fileCreatorId is passed and there is no valid userInfo in the API',
      function() {
        let userFixture;
        let props;
        let promise;

        beforeEach(function() {
          userFixture = fixtures.build('user');

          props = {
            ...baseProps
          };

          this.sandbox.stub(contxtSdk.coordinator.users, 'get').resolves(null);

          wrapper = shallow(<FacilityContractContainer {...props} />, {
            disableLifecycleMethods: true
          });

          promise = wrapper.instance().getUserInfo(userFixture.id);
        });

        it('will return {}', function() {
          return promise.then((res) => {
            expect(res).to.deep.equal({});
          });
        });
      }
    );

    context(
      'when a fileCreatorId is passed and there is an error retrieving userInfo from the API',
      function() {
        let userFixture;
        let props;
        let promise;

        beforeEach(function() {
          userFixture = fixtures.build('user');

          props = {
            ...baseProps
          };

          this.sandbox.stub(contxtSdk.coordinator.users, 'get').rejects();

          wrapper = shallow(<FacilityContractContainer {...props} />, {
            disableLifecycleMethods: true
          });

          promise = wrapper.instance().getUserInfo(userFixture.id);
        });

        it('will return an error', function() {
          return promise.catch((err) => {
            expect(err).to.include(Error('Error Retrieving User Info'));
          });
        });
      }
    );
  });

  describe('loadWriteScopeForCurrentUser', function() {
    let checkForUserScope;
    let expectedScopeBoolean;
    let promise;

    beforeEach(function() {
      expectedScopeBoolean = faker.random.boolean();

      checkForUserScope = this.sandbox
        .stub(nsightUtils, 'checkForUserScope')
        .resolves(expectedScopeBoolean);

      wrapper = shallow(<FacilityContractContainer {...baseProps} />, {
        disableLifecycleMethods: true
      });

      promise = wrapper.instance().loadWriteScopeForCurrentUser();
    });

    it('checks if the user has the ability to write to utility contracts', function() {
      expect(checkForUserScope).to.be.calledWith(
        'ems',
        'write:utility_contracts'
      );
    });

    it("returns information on the users's write ability for contracts", function() {
      return promise.then((response) => {
        expect(response).to.be[expectedScopeBoolean]();
      });
    });
  });

  describe('loadContractDetails', function() {
    context('when there is a file and user in contxt API', function() {
      let contractFixture;
      let decoratedContracts;
      let expectedSelectedContract;
      let expectedSelectedContractStatus;
      let fileFixture;
      let userFixture;
      let getFileInfo;
      let getUserInfo;
      let props;
      let promise;

      beforeEach(function() {
        contractFixture = fixtures.buildList(
          'contract',
          faker.random.number({ min: 1, max: 10 })
        );

        fileFixture = fixtures.build('file', {
          id: contractFixture[0].fileId
        });
        userFixture = fixtures.build('user', {
          id: contractFixture[0].createdBy
        });

        switch (true) {
          case contractFixture[0].status === 'inactive':
            expectedSelectedContractStatus = {
              group: 'inactive',
              icon: 'contracts-list__status contracts-list__status--inactive'
            };
            break;
          case moment().diff(contractFixture[0].endDate, 'days') <= -90:
            expectedSelectedContractStatus = {
              group: 'active',
              subText: `Expires ${moment(contractFixture[0].endDate).format(
                'l'
              )}`,
              icon: 'contracts-list__status contracts-list__status--active'
            };
            break;
          case moment().diff(contractFixture[0].endDate, 'days') <= 0:
            let daysUntilExpire = moment().diff(
              contractFixture[0].endDate,
              'days'
            );
            expectedSelectedContractStatus = {
              group: 'expiringSoon',
              subText: `Expires ${moment(contractFixture[0].endDate).format(
                'l'
              )} (${(daysUntilExpire *= -1)} days to go)`,
              icon:
                'contracts-list__status contracts-list__status--expiring-soon'
            };
            break;
          default:
            expectedSelectedContractStatus = {
              group: 'expired',
              subText: `Expired ${moment(contractFixture[0].endDate).format(
                'l'
              )}`,
              icon: 'contracts-list__status contracts-list__status--expired'
            };
            break;
        }

        expectedSelectedContract = {
          ...contractFixture[0],
          createdByUser: {
            email: userFixture.email,
            fullName: `${userFixture.firstName} ${userFixture.lastName}`
          },
          isSelected: true,
          file: fileFixture.downloadInfo,
          icon: expectedSelectedContractStatus.icon,
          label: contractFixture[0].name,
          group: expectedSelectedContractStatus.group,
          subText: expectedSelectedContractStatus.subText,
          url: `/${appRoot}/contract/${contractFixture[0].id}`,
          endDate: moment(contractFixture[0].endDate, 'YYYY-MM-DD'),
          startDate: moment(contractFixture[0].startDate, 'YYYY-MM-DD')
        };

        props = {
          ...baseProps,
          match: {
            params: {
              contractId: `${contractFixture[0].id}`
            }
          }
        };

        getFileInfo = this.sandbox
          .stub(contxtSdk.files, 'download')
          .resolves(fileFixture);

        getUserInfo = this.sandbox
          .stub(contxtSdk.coordinator.users, 'get')
          .resolves(userFixture);

        wrapper = shallow(<FacilityContractContainer {...props} />, {
          disableLifecycleMethods: true
        });

        decoratedContracts = wrapper
          .instance()
          .decorateContracts(
            _.sortBy(contractFixture, 'endDate').reverse(),
            `${contractFixture[0].id}`
          );

        wrapper.setState({
          contracts: decoratedContracts,
          contractsGroupedByStatus: _.groupBy(decoratedContracts, 'group')
        });

        promise = wrapper
          .instance()
          .loadContractDetails(`${contractFixture[0].id}`);
      });

      it('will call getFileInfo to retrieve file info', function() {
        return promise.then(() => {
          expect(getFileInfo).to.be.calledWith(contractFixture[0].fileId);

          expect(getFileInfo).to.be.calledOnce();
        });
      });

      it('will call getUserInfo to retrieve user info', function() {
        return promise.then(() => {
          expect(getUserInfo).to.be.calledWith(contractFixture[0].createdBy);

          expect(getUserInfo).to.be.calledOnce();
        });
      });

      it('sets contracts and selectedContract state', function() {
        return promise.then(() => {
          const { contracts, selectedContract } = wrapper.state();

          expect(contracts).to.deep.equal(decoratedContracts);
          expect(selectedContract).to.deep.equal(expectedSelectedContract);
        });
      });
    });

    context('when there is a file but no user in contxt API', function() {
      let contractFixture;
      let decoratedContracts;
      let expectedSelectedContract;
      let expectedSelectedContractStatus;
      let fileFixture;
      let getFileInfo;
      let getUserInfo;
      let props;
      let promise;

      beforeEach(function() {
        contractFixture = fixtures.buildList(
          'contract',
          faker.random.number({ min: 1, max: 10 })
        );

        fileFixture = fixtures.build('file', {
          id: contractFixture[0].fileId
        });

        switch (true) {
          case contractFixture[0].status === 'inactive':
            expectedSelectedContractStatus = {
              group: 'inactive',
              icon: 'contracts-list__status contracts-list__status--inactive'
            };
            break;
          case moment().diff(contractFixture[0].endDate, 'days') <= -90:
            expectedSelectedContractStatus = {
              group: 'active',
              subText: `Expires ${moment(contractFixture[0].endDate).format(
                'l'
              )}`,
              icon: 'contracts-list__status contracts-list__status--active'
            };
            break;
          case moment().diff(contractFixture[0].endDate, 'days') <= 0:
            let daysUntilExpire = moment().diff(
              contractFixture[0].endDate,
              'days'
            );
            expectedSelectedContractStatus = {
              group: 'expiringSoon',
              subText: `Expires ${moment(contractFixture[0].endDate).format(
                'l'
              )} (${(daysUntilExpire *= -1)} days to go)`,
              icon:
                'contracts-list__status contracts-list__status--expiring-soon'
            };
            break;
          default:
            expectedSelectedContractStatus = {
              group: 'expired',
              subText: `Expired ${moment(contractFixture[0].endDate).format(
                'l'
              )}`,
              icon: 'contracts-list__status contracts-list__status--expired'
            };
            break;
        }

        expectedSelectedContract = {
          ...contractFixture[0],
          label: contractFixture[0].name,
          file: fileFixture.downloadInfo,
          createdByUser: {},
          isSelected: true,
          group: expectedSelectedContractStatus.group,
          subText: expectedSelectedContractStatus.subText,
          url: `/${appRoot}/contract/${contractFixture[0].id}`,
          icon: expectedSelectedContractStatus.icon,
          endDate: moment(contractFixture[0].endDate, 'YYYY-MM-DD'),
          startDate: moment(contractFixture[0].startDate, 'YYYY-MM-DD')
        };

        props = {
          ...baseProps,
          match: {
            params: {
              contractId: `${contractFixture[0].id}`
            }
          }
        };

        decoratedContracts = wrapper
          .instance()
          .decorateContracts(
            _.sortBy(contractFixture, 'endDate').reverse(),
            `${contractFixture[0].id}`
          );

        getFileInfo = this.sandbox
          .stub(contxtSdk.files, 'download')
          .resolves(fileFixture);

        getUserInfo = this.sandbox
          .stub(contxtSdk.coordinator.users, 'get')
          .resolves(null);

        wrapper = shallow(<FacilityContractContainer {...props} />, {
          disableLifecycleMethods: true
        });

        wrapper.setState({ contracts: decoratedContracts });

        promise = wrapper.instance().loadContractDetails(contractFixture[0].id);
      });

      it('will call getFileInfo to retrieve file info', function() {
        return promise.then(() => {
          expect(getFileInfo).to.be.calledWith(contractFixture[0].fileId);

          expect(getFileInfo).to.be.calledOnce();
        });
      });

      it('will call getUserInfo to retrieve user info', function() {
        return promise.then(() => {
          expect(getUserInfo).to.be.calledWith(contractFixture[0].createdBy);

          expect(getUserInfo).to.be.calledOnce();
        });
      });

      it('sets selectedContract in the state', function() {
        return promise.then(() => {
          const { selectedContract } = wrapper.state();
          expect(selectedContract).to.deep.equal(expectedSelectedContract);
        });
      });
    });

    context('when there is a user but no file in contxt API', function() {
      let contractFixture;
      let decoratedContracts;
      let expectedSelectedContract;
      let expectedSelectedContractStatus;
      let getFileInfo;
      let getUserInfo;
      let props;
      let promise;
      let userFixture;

      beforeEach(function() {
        contractFixture = fixtures.buildList(
          'contract',
          faker.random.number({ min: 1, max: 10 })
        );

        userFixture = fixtures.build('user', {
          id: contractFixture[0].createdBy
        });

        switch (true) {
          case contractFixture[0].status === 'inactive':
            expectedSelectedContractStatus = {
              group: 'inactive',
              icon: 'contracts-list__status contracts-list__status--inactive'
            };
            break;
          case moment().diff(contractFixture[0].endDate, 'days') <= -90:
            expectedSelectedContractStatus = {
              group: 'active',
              subText: `Expires ${moment(contractFixture[0].endDate).format(
                'l'
              )}`,
              icon: 'contracts-list__status contracts-list__status--active'
            };
            break;
          case moment().diff(contractFixture[0].endDate, 'days') <= 0:
            let daysUntilExpire = moment().diff(
              contractFixture[0].endDate,
              'days'
            );
            expectedSelectedContractStatus = {
              group: 'expiringSoon',
              subText: `Expires ${moment(contractFixture[0].endDate).format(
                'l'
              )} (${(daysUntilExpire *= -1)} days to go)`,
              icon:
                'contracts-list__status contracts-list__status--expiring-soon'
            };
            break;
          default:
            expectedSelectedContractStatus = {
              group: 'expired',
              subText: `Expired ${moment(contractFixture[0].endDate).format(
                'l'
              )}`,
              icon: 'contracts-list__status contracts-list__status--expired'
            };
            break;
        }

        expectedSelectedContract = {
          ...contractFixture[0],
          label: contractFixture[0].name,
          file: {},
          createdByUser: {
            email: userFixture.email,
            fullName: `${userFixture.firstName} ${userFixture.lastName}`
          },
          isSelected: true,
          group: expectedSelectedContractStatus.group,
          subText: expectedSelectedContractStatus.subText,
          url: `/${appRoot}/contract/${contractFixture[0].id}`,
          icon: expectedSelectedContractStatus.icon,
          endDate: moment(contractFixture[0].endDate, 'YYYY-MM-DD'),
          startDate: moment(contractFixture[0].startDate, 'YYYY-MM-DD')
        };

        props = {
          ...baseProps,
          match: {
            params: {
              contractId: `${contractFixture[0].id}`
            }
          }
        };

        getFileInfo = this.sandbox
          .stub(contxtSdk.files, 'download')
          .resolves(null);

        getUserInfo = this.sandbox
          .stub(contxtSdk.coordinator.users, 'get')
          .resolves(userFixture);

        wrapper = shallow(<FacilityContractContainer {...props} />, {
          disableLifecycleMethods: true
        });

        decoratedContracts = wrapper
          .instance()
          .decorateContracts(
            _.sortBy(contractFixture, 'endDate').reverse(),
            `${contractFixture[0].id}`
          );

        wrapper.setState({ contracts: decoratedContracts });
        promise = wrapper.instance().loadContractDetails(contractFixture[0].id);
      });

      it('will call getFileInfo to retrieve file info', function() {
        return promise.then(() => {
          expect(getFileInfo).to.be.calledWith(contractFixture[0].fileId);

          expect(getFileInfo).to.be.calledOnce();
        });
      });

      it('will call getUserInfo to retrieve user info', function() {
        return promise.then(() => {
          expect(getUserInfo).to.be.calledWith(contractFixture[0].createdBy);

          expect(getUserInfo).to.be.calledOnce();
        });
      });

      it('sets contracts and selectedContract state', function() {
        return promise.then(() => {
          const { contracts, selectedContract } = wrapper.state();

          expect(contracts).to.deep.equal(decoratedContracts);
          expect(selectedContract).to.deep.equal(expectedSelectedContract);
        });
      });
    });

    context(
      'when there is an error trying to retrieve file from contxt API',
      function() {
        let contractFixture;
        let decoratedContracts;
        let notificationError;
        let props;
        let promise;

        beforeEach(function() {
          contractFixture = fixtures.buildList(
            'contract',
            faker.random.number({ min: 1, max: 10 })
          );

          props = {
            ...baseProps,
            match: {
              params: {
                contractId: `${contractFixture[0].id}`
              }
            }
          };

          notificationError = this.sandbox.stub(NotificationManager, 'error');

          this.sandbox
            .stub(contxtSdk.ems, 'getContractsByFacility')
            .resolves(contractFixture);

          this.sandbox.stub(contxtSdk.files, 'download').rejects();

          this.sandbox.stub(contxtSdk.coordinator.users, 'get').resolves();

          wrapper = shallow(<FacilityContractContainer {...props} />, {
            disableLifecycleMethods: true
          });

          decoratedContracts = wrapper
            .instance()
            .decorateContracts(
              _.sortBy(contractFixture, 'endDate').reverse(),
              `${contractFixture[0].id}`
            );

          wrapper.setState({ contracts: decoratedContracts });
          promise = wrapper
            .instance()
            .loadContractDetails(contractFixture[0].id);
        });

        it('calls notification error once', function() {
          return promise.then(() => {
            expect(notificationError).to.be.calledOnce();
          });
        });

        it('shows an error notification', function() {
          return promise.then(() => {
            expect(notificationError).to.be.calledWith(
              'There was an error loading this contract details. Please refresh the page and try again.',
              'Utility Contract Load Error'
            );
          });
        });
      }
    );

    context(
      'when there is an error trying to retrieve user from contxt API',
      function() {
        let contractFixture;
        let decoratedContracts;
        let notificationError;
        let props;
        let promise;

        beforeEach(function() {
          contractFixture = fixtures.buildList(
            'contract',
            faker.random.number({ min: 1, max: 10 })
          );

          props = {
            ...baseProps,
            match: {
              params: {
                contractId: `${contractFixture[0].id}`
              }
            }
          };

          notificationError = this.sandbox.stub(NotificationManager, 'error');

          this.sandbox
            .stub(contxtSdk.ems, 'getContractsByFacility')
            .resolves(contractFixture);

          this.sandbox.stub(contxtSdk.files, 'download').resolves();

          this.sandbox.stub(contxtSdk.coordinator.users, 'get').rejects();

          wrapper = shallow(<FacilityContractContainer {...props} />, {
            disableLifecycleMethods: true
          });

          decoratedContracts = wrapper
            .instance()
            .decorateContracts(
              _.sortBy(contractFixture, 'endDate').reverse(),
              `${contractFixture[0].id}`
            );

          wrapper.setState({ contracts: decoratedContracts });
          promise = wrapper
            .instance()
            .loadContractDetails(contractFixture[0].id);
        });

        it('calls notification error once', function() {
          return promise.then(() => {
            expect(notificationError).to.be.calledOnce();
          });
        });

        it('shows an error notification', function() {
          return promise.then(() => {
            expect(notificationError).to.be.calledWith(
              'There was an error loading this contract details. Please refresh the page and try again.',
              'Utility Contract Load Error'
            );
          });
        });
      }
    );
  });

  describe('onFileDrop', function() {
    let droppedFileFixture;
    let expectedFilesFixture;
    let createObjectURL;
    let URL;

    beforeEach(function() {
      droppedFileFixture = fixtures.build('browserFile', { preview: null });

      expectedFilesFixture = [
        {
          ...droppedFileFixture,
          preview: `blob:${faker.internet.url()}`
        }
      ];

      createObjectURL = this.sandbox
        .stub()
        .returns(expectedFilesFixture[0].preview);

      URL = global.URL;

      global.URL = {
        createObjectURL
      };

      wrapper.instance().onFileDrop([droppedFileFixture]);
    });

    afterEach(function() {
      global.URL = URL;
    });

    it('will add preview key to file object', function() {
      const { droppedFile } = wrapper.state();
      expect(droppedFile).to.deep.equal(expectedFilesFixture[0]);
    });
  });

  describe('onFilterUsers', function() {
    let filteredUsersStub;
    let newValue;
    let users;

    beforeEach(function() {
      users = fixtures.buildList(
        'user',
        faker.random.number({ min: 1, max: 10 })
      );

      newValue = { target: { value: users[0].lastName } };
      wrapper.setState({ users: users });

      filteredUsersStub = this.sandbox
        .stub(wrapper.instance(), 'filterUsers')
        .resolves();
    });

    it('makes the call to filter the list of users with correct parameters', function() {
      wrapper.instance().onFilterUsers(newValue);
      expect(filteredUsersStub.calledWith([users[0].lastName])).to.equal(true);
    });

    it('does not filter a list of users when there is no value in the event object', function() {
      newValue = { target: { value: '' } };
      wrapper.instance().onFilterUsers(newValue);
      expect(wrapper.state('filteredUsers')).to.deep.equal([]);
    });

    it('does not filter a list of users when there is no event object', function() {
      newValue = null;
      wrapper.instance().onFilterUsers(newValue);
      expect(wrapper.state('filteredUsers')).to.deep.equal([]);
    });
  });

  describe('removeReminder', function() {
    let reminderFixture;

    beforeEach(function() {
      reminderFixture = fixtures.buildList(
        'reminder',
        faker.random.number({ min: 1, max: 10 })
      );

      wrapper.setState({ reminders: reminderFixture });
    });

    context('sets state when reminder is removed', function() {
      it('will remove a reminder when callback is invoked', function() {
        wrapper.instance().removeReminder(reminderFixture[0]);
        expect(wrapper.state('reminders')).to.not.include(reminderFixture[0]);
        expect(wrapper.state('reminders')).to.have.lengthOf(
          reminderFixture.length - 1
        );
      });
    });
  });

  describe('saveContractFile', function() {
    context('when successful', function() {
      let facilityFixture;
      let contractFixture;
      let droppedFileFixture;
      let expectedFileFixture;
      let props;
      let createAndUploadFileFixture;
      let createAndUploadFile;
      let updateContractFileId;
      let URL;
      let revokeObjectURL;
      let promise;

      beforeEach(function() {
        facilityFixture = fixtures.build('facility', {
          id: baseProps.selectedFacility.id
        });
        contractFixture = fixtures.build('contract', {
          facilityId: facilityFixture.id
        });
        droppedFileFixture = fixtures.build('browserFile');

        expectedFileFixture = fixtures.build('file');

        createAndUploadFileFixture = {
          data: droppedFileFixture,
          metadata: {
            contentType: droppedFileFixture.type,
            description: droppedFileFixture.name,
            filename: droppedFileFixture.name,
            organizationId: baseProps.selectedOrganization.id
          }
        };

        props = {
          ...baseProps,
          match: {
            params: {
              contractId: `${contractFixture.id}`
            }
          }
        };

        createAndUploadFile = this.sandbox
          .stub(contxtSdk.files, 'createAndUpload')
          .resolves(expectedFileFixture);

        updateContractFileId = this.sandbox.stub(
          contxtSdk.ems,
          'updateContract'
        );

        URL = global.URL;

        global.URL = {
          revokeObjectURL
        };

        wrapper = shallow(<FacilityContractContainer {...props} />, {
          disableLifecycleMethods: true
        });
        wrapper.setState({ droppedFile: droppedFileFixture });

        promise = wrapper.instance().saveContractFile(contractFixture.id);
      });

      afterEach(function() {
        global.URL = URL;
      });

      it('will call createAndUploadFiles to create and upload to API', function() {
        return promise.then(() => {
          expect(createAndUploadFile).to.be.calledWith(
            createAndUploadFileFixture
          );

          expect(createAndUploadFile).to.be.calledOnce();
        });
      });

      it('will call updateContractFileId', function() {
        return promise.then(() => {
          expect(updateContractFileId).to.be.calledOnce();
        });
      });
    });

    context('when creating and uploading to the sdk fails', function() {
      let contractFixture;
      let droppedFileFixture;
      let props;
      let notificationError;
      let updateContract;
      let promise;

      beforeEach(function() {
        contractFixture = fixtures.build('contract', {
          facilityId: baseProps.selectedFacility.id
        });

        droppedFileFixture = fixtures.build('browserFile');

        notificationError = this.sandbox.stub(NotificationManager, 'error');

        props = {
          ...baseProps
        };

        this.sandbox.stub(contxtSdk.files, 'createAndUpload').rejects();

        updateContract = this.sandbox
          .stub(contxtSdk.ems, 'updateContract')
          .resolves();

        wrapper = shallow(<FacilityContractContainer {...props} />, {
          disableLifecycleMethods: true
        });

        wrapper.setState({ droppedFile: droppedFileFixture });

        promise = wrapper.instance().saveContractFile(contractFixture.id);
      });

      it('calls notification error once', function() {
        return promise.then(() => {
          expect(notificationError).to.be.calledOnce();
        });
      });

      it('shows an error notification', function() {
        return promise.then(() => {
          expect(notificationError).to.be.calledWith(
            'There was an error saving the file to the Utility Contract. Please try again.',
            'Utility Contract Error'
          );
        });
      });

      it('will not call updateContractFileId', function() {
        return promise.then(() => {
          expect(updateContract).to.not.be.called();
        });
      });
    });

    context('when creating and uploading return empty', function() {
      let facilityFixture;
      let contractFixture;
      let droppedFileFixture;
      let props;
      let promise;

      beforeEach(function() {
        facilityFixture = fixtures.build('facility');
        contractFixture = fixtures.build('contract', {
          facilityId: facilityFixture.id
        });
        droppedFileFixture = fixtures.build('browserFile');

        props = {
          ...baseProps
        };

        this.sandbox.stub(contxtSdk.files, 'createAndUpload').resolves(null);

        wrapper = shallow(<FacilityContractContainer {...props} />, {
          disableLifecycleMethods: true
        });

        wrapper.setState({ droppedFile: droppedFileFixture });

        promise = wrapper.instance().saveContractFile(contractFixture.id);
      });

      it('returns undefined', function() {
        expect(promise).to.be.fulfilled.and.to.eventually.be.undefined();
      });
    });

    context('when updating utility contract to sdk fails', function() {
      let contractFixture;
      let facilityFixture;
      let droppedFileFixture;
      let expectedFileFixture;
      let createAndUploadFileFixture;
      let props;
      let createAndUploadFile;
      let promise;

      beforeEach(function() {
        facilityFixture = fixtures.build('facility');

        contractFixture = fixtures.build('contract', {
          facilityId: facilityFixture.id
        });
        droppedFileFixture = fixtures.build('browserFile');

        expectedFileFixture = fixtures.build('file');

        createAndUploadFileFixture = {
          data: droppedFileFixture,
          metadata: {
            contentType: droppedFileFixture.type,
            description: droppedFileFixture.name,
            filename: droppedFileFixture.name,
            organizationId: baseProps.selectedOrganization.id
          }
        };

        props = {
          ...baseProps
        };

        createAndUploadFile = this.sandbox
          .stub(contxtSdk.files, 'createAndUpload')
          .resolves(expectedFileFixture);

        this.sandbox.stub(contxtSdk.ems, 'updateContract').rejects();

        wrapper = shallow(<FacilityContractContainer {...props} />, {
          disableLifecycleMethods: true
        });

        wrapper.setState({ droppedFile: droppedFileFixture });

        promise = wrapper.instance().saveContractFile(contractFixture.id);
      });

      it('displays an error', function() {
        return promise.catch(() => {
          expect(promise).to.eventually.deep.equal({
            [FORM_ERROR]:
              'There was an error updating this utility contract. Please try again.'
          });
        });
      });

      it('will call createAndUploadFiles to create and upload to API', function() {
        return promise.then(() => {
          expect(createAndUploadFile).to.be.calledWith(
            createAndUploadFileFixture
          );

          expect(createAndUploadFile).to.be.calledOnce();
        });
      });
    });
  });

  describe('updateContractFileId', function() {
    context('when successful', function() {
      let facilityFixture;
      let contractFixture;
      let droppedFileFixture;
      let expectedFileFixture;
      let promise;
      let props;
      let updateContract;

      beforeEach(function() {
        facilityFixture = fixtures.build('facility', {
          id: baseProps.selectedFacility.id
        });
        contractFixture = fixtures.build('contract', {
          facilityId: facilityFixture.id
        });
        droppedFileFixture = fixtures.build('browserFile');

        expectedFileFixture = fixtures.build('file');

        props = {
          ...baseProps,
          match: {
            params: {
              contractId: `${contractFixture.id}`
            }
          }
        };

        updateContract = this.sandbox
          .stub(contxtSdk.ems, 'updateContract')
          .resolves();

        wrapper = shallow(<FacilityContractContainer {...props} />, {
          disableLifecycleMethods: true
        });

        wrapper.setState({ droppedFile: droppedFileFixture });

        promise = wrapper
          .instance()
          .updateContractFileId(
            expectedFileFixture.id,
            baseProps.match.params.contractId
          );
      });

      afterEach(function() {
        global.URL = URL;
      });

      it('will call sdk updateContract', function() {
        return promise.then(() => {
          expect(updateContract).to.be.calledWith(
            baseProps.selectedFacility.id,
            baseProps.match.params.contractId,
            { fileId: expectedFileFixture.id, utilityContractReminders: [] }
          );
        });
      });
    });

    context('when creating and uploading to the sdk fails', function() {
      let fileFixture;
      let droppedFileFixture;
      let props;
      let notificationError;
      let promise;

      beforeEach(function() {
        droppedFileFixture = fixtures.build('browserFile');
        fileFixture = fixtures.build('file');
        notificationError = this.sandbox.stub(NotificationManager, 'error');

        props = {
          ...baseProps
        };

        this.sandbox.stub(contxtSdk.ems, 'updateContract').rejects();

        wrapper = shallow(<FacilityContractContainer {...props} />, {
          disableLifecycleMethods: true
        });

        wrapper.setState({ droppedFile: droppedFileFixture });

        promise = wrapper
          .instance()
          .updateContractFileId(
            fileFixture.id,
            baseProps.match.params.contractId
          );
      });

      it('calls notification error once', function() {
        return promise.then(() => {
          expect(notificationError).to.be.calledOnce();
        });
      });

      it('shows an error notification', function() {
        return promise.then(() => {
          expect(notificationError).to.be.calledWith(
            'There was an error saving the file from this Utility Contract. Please try again.',
            'Utility Contract Update Failure'
          );
        });
      });
    });
  });

  describe('updateContract', function() {
    let contractFixture;
    let droppedFileFixture;
    let notificationSuccess;
    let promise;
    let saveContractFile;
    let updateContract;

    beforeEach(function() {
      contractFixture = fixtures.build('contract', {
        id: baseProps.match.params.contractId,
        facility_id: baseProps.selectedFacility.id
      });

      droppedFileFixture = fixtures.build('browserFile', {
        preview: `blob:${faker.internet.url()}`
      });

      notificationSuccess = this.sandbox.stub(NotificationManager, 'success');

      saveContractFile = this.sandbox
        .stub(wrapper.instance(), 'saveContractFile')
        .resolves();
    });

    context(
      'on successful contract update and droppedFile is not null',
      function() {
        beforeEach(function() {
          updateContract = this.sandbox
            .stub(contxtSdk.ems, 'updateContract')
            .resolves();

          wrapper.setState({ droppedFile: droppedFileFixture });

          promise = wrapper.instance().updateContract(contractFixture);
        });

        it('will call sdk updateContract', function() {
          expect(updateContract).to.be.calledWith(
            baseProps.selectedFacility.id,
            baseProps.match.params.contractId,
            contractFixture
          );
        });

        it('will call saveContractFile if there is a droppedFile', function() {
          return promise.then(() => {
            expect(saveContractFile).to.be.calledWith(
              baseProps.match.params.contractId
            );
          });
        });

        it('calls notification success once', function() {
          return promise.then(() => {
            expect(notificationSuccess).to.be.calledOnce();
          });
        });

        it('shows an success notification', function() {
          return promise.then(() => {
            expect(notificationSuccess).to.be.calledWith(
              'This utility contract has been updated successfully',
              'Utility Contract Update Success'
            );
          });
        });

        it("navigates to the contract's URL in view mode", function() {
          return promise.then(() => {
            expect(baseProps.history.push).to.be.calledWith(
              `/${appRoot}/contract/${baseProps.match.params.contractId}${baseProps.history.location.search}`
            );
          });
        });
      }
    );

    context(
      'on successful contract update and droppedFile is null',
      function() {
        beforeEach(function() {
          updateContract = this.sandbox
            .stub(contxtSdk.ems, 'updateContract')
            .resolves();

          wrapper.setState({
            droppedFile: null,
            contracts: [contractFixture],
            selectedContract: contractFixture
          });

          promise = wrapper.instance().updateContract(contractFixture);
        });

        it('will call sdk updateContract', function() {
          expect(updateContract).to.be.calledWith(
            baseProps.selectedFacility.id,
            baseProps.match.params.contractId,
            contractFixture
          );
        });

        it('will not call saveContractFile', function() {
          return promise.then(() => {
            expect(saveContractFile).to.not.be.called();
          });
        });

        it('will preserve the fileId on the contract', function() {
          return promise.then(() => {
            expect(wrapper.state('contracts').length).to.equal(1);
            expect(wrapper.state('contracts')[0].fileId).to.equal(
              contractFixture.fileId
            );
          });
        });

        it('calls notification success once', function() {
          return promise.then(() => {
            expect(notificationSuccess).to.be.calledOnce();
          });
        });

        it('shows an success notification', function() {
          return promise.then(() => {
            expect(notificationSuccess).to.be.calledWith(
              'This utility contract has been updated successfully',
              'Utility Contract Update Success'
            );
          });
        });

        it("navigates to the contract's URL in view mode", function() {
          return promise.then(() => {
            expect(baseProps.history.push).to.be.calledWith(
              `/${appRoot}/contract/${baseProps.match.params.contractId}${baseProps.history.location.search}`
            );
          });
        });
      }
    );

    context('on unsuccessful update', function() {
      let notificationError;

      beforeEach(function() {
        updateContract = this.sandbox
          .stub(contxtSdk.ems, 'updateContract')
          .rejects();

        notificationError = this.sandbox.stub(NotificationManager, 'error');

        promise = wrapper.instance().updateContract(contractFixture);
      });

      it('calls notification error once', function() {
        return promise.then(() => {
          expect(notificationError).to.be.calledOnce();
        });
      });

      it('shows an error notification', function() {
        return promise.then(() => {
          expect(notificationError).to.be.calledWith(
            'There was an error updating the Utility Contract. Please try again.',
            'Utility Contract Update Failure'
          );
        });
      });
    });
  });

  describe('validateContract', function() {
    context('isRequired', function() {
      let newValue;
      let valueToEdit;

      beforeEach(function() {
        valueToEdit = {
          dataType: faker.random.arrayElement([
            'boolean',
            'date',
            'number',
            'string'
          ]),
          isRequired: true
        };

        newValue = {
          startDate: faker.date.recent().toISOString(),
          endDate: faker.date.future().toISOString(),
          name: faker.random.word(),
          status: faker.random.word(),
          rateNarrative: faker.random.word(),
          value: {
            boolean: `${faker.random.boolean()}`,
            date: faker.date.recent().toISOString(),
            number: `${faker.random.number()}`,
            string: faker.hacker.phrase()
          }[valueToEdit.dataType]
        };
      });

      it('returns an error message when there is no rate narrative', function() {
        delete newValue.rateNarrative;
        const validationErrors = wrapper.instance().validateContract(newValue);
        expect(validationErrors).to.deep.equal({
          rateNarrative:
            'A Rate Narrative is required to create a utility contract'
        });
      });

      it('returns an error message when there is no start date', function() {
        delete newValue.startDate;
        const validationErrors = wrapper.instance().validateContract(newValue);
        expect(validationErrors).to.deep.equal({
          startDate: 'A Start Date is required to create a utility contract'
        });
      });

      it('returns an error message when there is no end date', function() {
        delete newValue.endDate;
        const validationErrors = wrapper.instance().validateContract(newValue);
        expect(validationErrors).to.deep.equal({
          endDate: 'A End Date is required to create a utility contract'
        });
      });

      it('returns an error message when there is no name', function() {
        delete newValue.name;
        const validationErrors = wrapper.instance().validateContract(newValue);
        expect(validationErrors).to.deep.equal({
          name: 'A Name is required to create a utility contract'
        });
      });

      it('returns an error message when there is no status', function() {
        delete newValue.status;
        const validationErrors = wrapper.instance().validateContract(newValue);
        expect(validationErrors).to.deep.equal({
          status: 'A Status is required to create a utility contract'
        });
      });
    });
  });
});
