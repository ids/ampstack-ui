import $ from 'jquery';
import Backbone from 'backbone';
import _ from 'underscore';
import { signIn, signInWithRedirect, signOut, getCurrentUser } from 'aws-amplify/auth';

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
  currentUser: undefined,

  initialize: function() {

    getCurrentUser().then((authUser) => {
      this.user = authUser;
    }).catch((ex) => {
      if(ex.toString().indexOf("UserUnAuthenticatedException") > -1) {
        console.info("The user has not yet authenticated");
      } else {
        console.warn("Error getting current user:");
        console.error(ex);  
      };
    });
  },

  showLoginPage: function() {
    if(this.currentView) { $(this.currentView.el).hide(); }

    this.loginView = new LoginPageView({ el: "#app-login"});
    this.loginView.signInCompleteCallback = (user) => {
      console.log("sign in is complete");
      this.onSignInComplete(user);
    } 

    this.loginView.signInWithGoogleCallback = (user) => {
      console.log("sign in with google");

    } 
    this.loginView.signInWithAmazonCallback = (user) => {
      console.log("sign in with amazon");
    } 

    this.loginView.render();
    this.currentView = this.loginView;
    $(this.currentView.el).show();
  },

  onSignInComplete: function(user) {
    console.debug("sign in complete, we got a user from the login page");
    this.currentUser = user;
    console.log(this.currentUser);
    this.render();
    this.showWelcomePage();
    $("#app-login").html("");
  },

  clearLoginPage: function() {
    $("#app-login").html("");
  },

  onSignOutComplete: function() {
    console.debug("sign out complete");
    this.currentUser = undefined;
    this.render();

    this.showWelcomePage();
    this.clearLoginPage();
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
    this.headerView.signInCallback = () => {
      this.showLoginPage();
    }; 

    this.headerView.signOutCallback = () => {
      var that = this;

      signOut().then((resp) => {
        console.info("signout response:");
        console.info(resp);

        that.onSignOutComplete();
      }).catch((ex) => {
        console.error("error signing out");
        console.error(ex);

        that.onSignOutComplete();
      });
    }; 

    this.footerView = new FooterView({ el: "#app-footer"});

    this.welcomeView = new WelcomePageView({ el: "#app-welcome"});
    this.aboutView = new AboutPageView({ el: "#app-about"});
    this.workspaceView = new WorkspacePageView({ el: "#app-workspace"});

    this.headerView.user = this.currentUser;
    this.headerView.render();

    this.welcomeView.user = this.currentUser;
    this.welcomeView.render();

    this.workspaceView.user = this.currentUser;
    this.workspaceView.render();
    
    this.aboutView.render();
    this.footerView.render();
  }
});

