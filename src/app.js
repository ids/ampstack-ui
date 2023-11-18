import $ from 'jquery';
import Backbone from 'backbone';
import _ from 'underscore';

import { HeaderView } from './views/Header';
import { FooterView } from './views/Footer';

import { WelcomePageView } from './views/WelcomePage';
import { AboutPageView } from './views/AboutPage';
import { WorkspacePageView } from './views/WorkspacePage';
import { LoginPageView } from './views/LoginPage';

import APP_HTML_TEMPLATE from './app.html?raw'

export const App = Backbone.View.extend({

  tagName: "app",
  className: "app",
  template: _.template(APP_HTML_TEMPLATE),
  currentView: undefined,
  user: undefined,

  /*
  events: {
    "click .icon":          "open",
    "click .button.edit":   "openEditDialog",
    "click .button.delete": "destroy"
  },
  */

  initialize: function() {

  },

  onSignInHandler: function() {
    if(this.currentView) { $(this.currentView.el).hide(); }
    this.currentView = this.loginView;
    $(this.currentView.el).show();
  },

  showWelcomePage: function() {
    if(this.currentView) { $(this.currentView.el).hide(); }
    this.currentView = this.welcomeView;
    $(this.currentView.el).show();
  },

  showAboutPage: function() {
    if(this.currentView) { $(this.currentView.el).hide(); }
    this.currentView = this.aboutView;
    $(this.currentView.el).show();
  },

  showWorkspace: function() {
    if(this.currentView) { $(this.currentView.el).hide(); }
    this.currentView = this.workspaceView;
    $(this.currentView.el).show();
  },

  render: function() {
    console.debug("app render");
    
    this.$el.html(this.template({}));

    console.debug("rendering app sub views...");
    this.headerView = new HeaderView({ el: "#app-header"});
    this.footerView = new FooterView({ el: "#app-footer"});

    this.welcomeView = new WelcomePageView({ el: "#app-welcome"});
    this.aboutView = new AboutPageView({ el: "#app-about"});
    this.workspaceView = new WorkspacePageView({ el: "#app-workspace"});

    this.loginView = new LoginPageView({ el: "#app-login"});

    this.headerView.signInCallback = this.onSignInHandler;

    this.headerView.user = this.user;
    this.headerView.render();

    this.welcomeView.user = this.user;
    this.welcomeView.render();

    this.workspaceView.user = this.user;
    this.workspaceView.render();
    
    this.aboutView.render();
    this.footerView.render();
  }
});

