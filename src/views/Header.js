import $ from 'jquery';
import Backbone from 'backbone';
import _ from 'underscore';
import { UserController } from '../controllers/User.mjs';
import { UserProfileModalView } from './UserProfileModal';

import './Header.css';
import HTML_TEMPLATE from './Header.html?raw';

export const HeaderView = Backbone.View.extend({

  template: _.template(HTML_TEMPLATE),
  user: undefined,
  userProfileModalView: undefined,
  userController: new UserController(),
  
  events: {
    "click #signInButton":          "signInButtonHandler",
    "click #signOutLink":           "signOutLinkHandler"
  },

  signInCallback: undefined,
  signOutCallback: undefined,

  signOutLinkHandler: function() {
    this.signOutCallback?.();
  },

  signInButtonHandler: function() {
    this.signInCallback?.();
  },

  setActiveTab(tabName) {
    $(`#${tabName}Tab`).addClass('active');
  },

  render: function() {
    this.$el.html(this.template({
      currentUser: this.user,
      providerTag: this.user ? this.userController.getProviderTag(this.user) : undefined
    }));

    $("#aboutLink").on("click", (event) => {
      $("#workspaceTab").removeClass('active');
      $("#aboutTab").addClass('active');
    });

    $("#workspaceLink").on("click", (event) => {
      $("#aboutTab").removeClass('active');
      $("#workspaceTab").addClass('active');
    });

    console.log(location.href);
    if(location.href.indexOf("#about") > -1) {
      $("#aboutTab").addClass('active');
    } else if (location.href.indexOf("#workspace") > -1) {
      $("#workspaceTab").addClass('active');
    } else {
      $("#aboutTab").removeClass('active');
      $("#workspaceTab").removeClass('active');
    }

    if(this.user) {
      setTimeout(async () => {
        try {
          // fetching the latest user registration in DynamoDB for the profile modal
          console.info(`Fetching registered user data for ${this.user.username}`);
          const registeredUser = await this.userController.getRegisteredUser(this.user.username);
          
          this.userProfileModalView = new UserProfileModalView({ el: "#userProfileModalContainer"});
          this.userProfileModalView.user = this.user;
          this.userProfileModalView.userProfile = registeredUser;
          this.userProfileModalView.render();    

        } catch(ex) {
          console.error("ERROR getting registered user:", ex);
        }
      }, 500);
    }
  }
});