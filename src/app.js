import $ from 'jquery';
import Backbone from 'backbone';
import _ from 'underscore';
import { signIn, fetchAuthSession,  fetchUserAttributes, signInWithRedirect, signOut, getCurrentUser } from 'aws-amplify/auth';
import { get, post, del } from "aws-amplify/api";
import { Hub } from 'aws-amplify/utils';

import { HeaderView } from './views/Header';
import { FooterView } from './views/Footer';

import { WelcomePageView } from './views/WelcomePage';
import { AboutPageView } from './views/AboutPage';
import { WorkspacePageView } from './views/WorkspacePage';
import { LoginPageView } from './views/LoginPage';

import { UserController } from './controllers/User.mjs';

import APP_HTML_TEMPLATE from './app.html?raw'

const unsubscribe = Hub.listen('auth', ({ payload }) => {
  switch (payload.event) {
    case 'signInWithRedirect':
      console.warn("signin with redirect completed");
      break;
    case 'signInWithRedirect_failure':
      console.error('An error has ocurred during the Oauth flow.');
      break;
  }
});

export const App = Backbone.View.extend({

  tagName: "app",
  className: "app",
  template: _.template(APP_HTML_TEMPLATE),
  currentView: undefined,
  currentUser: undefined,
  userController: new UserController(get, post, fetchAuthSession),

  initialize: function() {
  },

  showLoginPage: function() {
    if(this.currentView) { $(this.currentView.el).hide(); }

    this.loginView = new LoginPageView({ el: "#app-login"});
    this.loginView.signInCompleteCallback = (user) => {
      console.debug("sign in is complete");
      this.onSignInComplete(user);
    } 
    this.loginView.signInWithGoogleCallback = (user) => {
      console.debug("sign in with google");
      signInWithRedirect({ provider: 'Google' }).then((resp) => {
        console.debug("Google OAuth response:");
        console.log(resp);
      }).catch((ex) => {
        console.error("ERROR: Google OAuth:");
        console.error(ex);
      });
    } 
    this.loginView.signInWithAmazonCallback = (user) => {
      console.log("sign in with amazon");
      signInWithRedirect({ provider: 'Amazon' }).then((resp) => {
        console.debug("Amazon OAuth response:");
        console.log(resp);
      }).catch((ex) => {
        console.error("ERROR: Amazon OAuth:");
        console.error(ex);
      });
    } 
    this.loginView.render();
    this.currentView = this.loginView;
    $(this.currentView.el).show();
  },

  onSignInComplete: function(user) {
    console.debug("sign in complete, we got a AmpStack user from the custom login page");
    this.currentUser = user;
    console.log(this.currentUser);
    this.clearLoginPage();
    this.renderChildViews();

    this.router.navigate("/");
  },

  clearLoginPage: function() {
    $("#app-login").html("");
  },

  setCurrentView: function(view) {
    if(this.currentView) { $(this.currentView.el).hide(); }
    this.currentView = view;
    $(this.currentView.el).show();
  },

  showWelcomePage: function() {
    this.setCurrentView(this.welcomeView);
  },

  showAboutPage: function() {
    this.setCurrentView(this.aboutView);
  },

  showWorkspace: function() {
    this.setCurrentView(this.workspaceView);
  },

  renderChildViews: function() {
    this.headerView = new HeaderView({ el: "#app-header"});
    this.headerView.signInCallback = () => {
      this.showLoginPage();
    }; 
    this.headerView.signOutCallback = () => {
      var that = this;

      signOut().then((resp) => {
        console.info("signout response:");
        console.info(resp);
      }).catch((ex) => {
        console.error("error signing out");
        console.error(ex);
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
    if(this.currentUser) {
      this.workspaceView.loadQuotes();
    }
    
    this.aboutView.render();
    this.footerView.render();
  },

  render: function() {
    var that = this;

    console.debug("app render");    
    this.$el.html(this.template({}));

    setTimeout(() => {
      getCurrentUser().then((authUser) => {
        
        fetchUserAttributes().then((attributes) => {
          that.currentUser = authUser;
          that.currentUser.attributes = attributes;
  
          console.info("Cognito User:")
          console.info(that.currentUser);
  
          that.userController.logIdToken();
  
          that.renderChildViews();
        }).catch((ex) => {
          console.warn("Error getting current user attributes:");
          console.error(ex);  
        });
  

      }).catch((ex) => {
        if(ex.toString().indexOf("UserUnAuthenticatedException") > -1) {
          console.info("The user has not yet authenticated");
        } else {
          console.warn("ERROR getting current user:");
          console.error(ex);  
        };
      });
    });

    this.renderChildViews();
  }
});

