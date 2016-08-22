/*
 * Copyright (c) 2015-2016 Codenvy, S.A.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *   Codenvy, S.A. - initial API and implementation
 */
'use strict';

/**
 * @ngdoc controller
 * @name workspaces.list.controller:WorkspaceItemCtrl
 * @description This class is handling the controller for item of workspace list
 * @author Ann Shumilova
 */
export class WorkspaceItemCtrl {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor($location, lodash, cheWorkspace) {
    this.$location = $location;
    this.lodash = lodash;
    this.cheWorkspace = cheWorkspace;
  }

  redirectToWorkspaceDetails() {
    this.$location.path('/workspace/' + this.workspace.namespace +'/' + this.workspace.config.name);
  }

  getDefaultEnvironment(workspace) {
    let environments = workspace.config.environments;
    let envName = workspace.config.defaultEnv;
    let defaultEnvironment = this.lodash.find(environments, (environment) => {
        return environment.name === envName;
    });
    return defaultEnvironment;
  }

  getProjectsSize() {
    let projects = this.workspace.config.projects.length;

    return projects.length;
  }

  /**
   * Returns current status of workspace
   * @returns {String}
   */
  getWorkspaceStatus() {
    let workspace = this.cheWorkspace.getWorkspaceById(this.workspace.id);
    return workspace ? workspace.status : 'unknown';
  }
}
