import $ from 'jquery';
import Backbone from 'backbone';
import _ from 'underscore';
import { Hub } from 'aws-amplify/utils';
import { get, post, del } from "aws-amplify/api";
import { UserController } from '../controllers/User.mjs';

import './Header.css';
import HTML_TEMPLATE from './Header.html?raw';

export const HeaderView = Backbone.View.extend({

  template: _.template(HTML_TEMPLATE),
  user: undefined,
  userController: new UserController(get, post, del),
  
  events: {
    "click #signInButton":          "signInButtonHandler",
    "click #profileLink":           "profileLinkHandler",
    "click #signOutLink":           "signOutLinkHandler",

  },

  signInCallback: undefined,
  signOutCallback: undefined,

  profileLinkHandler: function() {
    alert("not yet implemented");
  },

  signOutLinkHandler: function() {
    if(this.signOutCallback) {
      this.signOutCallback();
    }
  },

  signInButtonHandler: function() {
    if(this.signInCallback) {
      this.signInCallback();
    }
  },

  initialize: function() {
      console.info("init header");
  },

  render: function() {
    console.info("header render");

    this.$el.html(this.template({
      currentUser: this.user,
      providerTag: this.user ? this.userController.getProviderTag(this.user) : undefined
    }));
  }
});