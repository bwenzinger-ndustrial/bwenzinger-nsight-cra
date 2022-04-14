class ProjectsModule {
  constructor(sdk, request) {
    this._baseUrl = `${sdk.config.audiences.nsightProjects.host}/v1`;
    this._request = request;
    this._sdk = sdk;

    this.createProject = this.createProject.bind(this);
    this.updateProject = this.updateProject.bind(this);
  }

  getProjectsByOrg(organizationSlug) {
    if (!organizationSlug) {
      return Promise.error('No organization supplied');
    }

    return this._request.get(`${this._baseUrl}/${organizationSlug}/projects`);
  }

  createProject(organizationSlug, project) {
    if (!organizationSlug) {
      return Promise.error('No organization supplied');
    }

    return this._request.post(
      `${this._baseUrl}/${organizationSlug}/projects`,
      project
    );
  }

  updateProject(organizationSlug, project) {
    if (!organizationSlug) {
      return Promise.error('No organization supplied');
    }

    return this._request.put(
      `${this._baseUrl}/${organizationSlug}/projects/${project.slug}`,
      project
    );
  }

  // getOrgUsers(organizationId) {
  //   if (!organizationId) {
  //     return Promise.resolve();
  //   }

  //   return contxtSdk.coordinator.users
  //     .getByOrganizationId(organizationId)
  //     .then((users) => {
  //       return users.map((user) => {
  //         return {
  //           id: user.id,
  //           lastName: user.lastName,
  //           firstName: user.firstName,
  //           email: user.email
  //         };
  //       });
  //     })
  //     .catch(() => {
  //       NotificationManager.error(
  //         'There was an error retrieving a list of users for this organization.',
  //         'Contact List error'
  //       );
  //     });
  // }
}

export default ProjectsModule;
