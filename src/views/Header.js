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
    "click #signOutLink":           "signOutLinkHandler",
  },

  signInCallback: undefined,
  signOutCallback: undefined,

  signOutLinkHandler: function() {
    this.signOutCallback?.();
  },

  signInButtonHandler: function() {
    this.signInCallback?.();
  },

  initialize: function() {
    console.info("init header");
  },

  render: function() {
    var that = this;
    console.info("header render");

    this.$el.html(this.template({
      currentUser: this.user,
      providerTag: this.user ? this.userController.getProviderTag(this.user) : undefined
    }));

    if(this.user) {
      setTimeout(() => {
        console.info(`Fetching registered user data for ${that.user.username}`);
        this.userController.getRegisteredUser(this.user.username).then((registeredUser) => {
          that.userProfileModalView = new UserProfileModalView({ el: "#userProfileModalContainer"});
          that.userProfileModalView.user = that.user;
          that.userProfileModalView.userProfile = registeredUser;
          that.userProfileModalView.render();    
        }).catch((ex) => {
          console.error("ERROR getting registered user:");
          console.error(ex);
        });  
      }, 500);
    }
  }
});