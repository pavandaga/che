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
 * @name workspaces.recipe.controller:WorkspacesRecipeCtrl
 * @description This class is handling the controller for the workspace recipe widget
 * @author Oleksii Orel
 */
export class WorkspaceRecipeCtrl {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor($timeout) {
    this.$timeout = $timeout;
    this.recipeUrl = null;

    //set default selection
    this.selectSourceOption = 'upload-custom-stack';

    this.setDefaultData();

    this.editorOptions = {
      lineWrapping: true,
      lineNumbers: true,
      matchBrackets: true,
      mode: 'text/x-yaml',
      onLoad: (editor) => {
        this.setEditor(editor);
      }
    };
  }

  setDefaultData() {
    this.recipeUrl = null;
    this.recipeScript = '';
    this.recipeFormat = 'text/x-yaml';
  }

  onFormatChanged(format) {
    this.editorOptions.mode = format;
    this.recipeFormat = format;
    this.formatEditor(this.editor);
  }

  setEditor(editor) {
    this.editor = editor;
    editor.on('paste', () => {
      this.formatEditor(editor);
    });
  }

  formatEditor(editor) {
    if (this.editorOptions.mode === 'text/x-yaml') {
      return;
    }

    this.$timeout(() => {
      for(var i = 0; i <= editor.lineCount(); i++){
        editor.indentLine(i);
      }
    }, 100);
  }
}
