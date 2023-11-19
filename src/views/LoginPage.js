import $ from 'jquery';
import Backbone from 'backbone';
import _ from 'underscore';
import { signIn, signUp, confirmSignUp } from 'aws-amplify/auth';

import './LoginPage.css';
import HTML_TEMPLATE from './LoginPage.html?raw';

export const LoginPageView = Backbone.View.extend({

  template: _.template(HTML_TEMPLATE),
  signInCompleteCallback: undefined,
  signInWithGoogleCallback: undefined,
  signInWithAmazonCallback: undefined,

  events: {
    "click #signInButton":                    "signInButtonClickHandler",
    "click #signUpButton":                    "signUpButtonClickHandler",
    "click #verifyCodeButton":                "confirmSignUpButtonClickHandler",
    "click #signInWithGoogleButton":          "signInWithGoogleButtonClickHandler",
    "click #signInWithAmazonButton":          "signInWithAmazonButtonClickHandler",
  },

  initialize: function() {
    console.info("init login page");
  },

  /**
    CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED - The user was created with a temporary password and must set a new one. Complete the process with confirmSignIn.
    CONFIRM_SIGN_IN_WITH_CUSTOM_CHALLENGE - The sign-in must be confirmed with a custom challenge response. Complete the process with confirmSignIn.
    CONFIRM_SIGN_IN_WITH_TOTP_CODE - The sign-in must be confirmed with a TOTP code from the user. Complete the process with confirmSignIn.
    CONTINUE_SIGN_IN_WITH_TOTP_SETUP - The TOTP setup process must be continued. Complete the process with confirmSignIn.
    CONFIRM_SIGN_IN_WITH_SMS_CODE - The sign-in must be confirmed with a SMS code from the user. Complete the process with confirmSignIn.
    CONTINUE_SIGN_IN_WITH_MFA_SELECTION - The user must select their mode of MFA verification before signing in. Complete the process with confirmSignIn.
    RESET_PASSWORD - The user must reset their password via resetPassword.
    CONFIRM_SIGN_UP - The user hasn't completed the sign-up flow fully and must be confirmed via confirmSignUp.
    DONE - The sign in process has been completed. 
  **/
  calculateNextStep: function(nextStep, host) {
    console.info("Cognito Auth Next Step:");
    console.info(nextStep);

    switch(nextStep) {
      case "CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED":
        break;
      case "CONFIRM_SIGN_IN_WITH_CUSTOM_CHALLENGE":
        break;
      case "CONFIRM_SIGN_IN_WITH_TOTP_CODE":
        break;
      case "CONTINUE_SIGN_IN_WITH_TOTP_SETUP":
        break;
      case "CONFIRM_SIGN_IN_WITH_SMS_CODE":
        break;
      case "CONTINUE_SIGN_IN_WITH_MFA_SELECTION":
        break;
      case "RESET_PASSWORD":
        break;
      case "CONFIRM_SIGN_UP":
        this.showConfirmCodePanel(host);
        break;
      case "DONE":
        break;
    }
  },

  showConfirmCodePanel: function(host) {
    document.getElementById(host).parentNode.appendChild(document.getElementById('verifiedCodePanel'));
    $(`#${host}`).hide();
    $("#verifiedCodePanel").fadeIn();
  },

  signInButtonClickHandler: function(event) {
    console.debug("sign in button clicked");

    $("#signInAlert").hide();
    signIn({
      username: $("#signInEmailTextField").val(),
      password: $("#signInPasswordTextField").val()
    }).then((response) => {
      console.log(`isSignedIn: ${response.isSignedIn}`);
      if(response.isSignedIn) {
        this.signInCompleteCallback?.();
      }
      this.activeUsername = $("#signInEmailTextField").val();
      this.calculateNextStep(response.nextStep.signInStep, "signInPanel")
    }).catch((ex) => {
      console.error(ex);
      $("#signInAlert").html(ex.message);
      $("#signInAlert").fadeIn();
    })
  },

  signUpButtonClickHandler: function(event) {
    $("#signUpAlert").hide();
    signUp({
      username: $("#signUpEmailTextField").val(),
      password: $("#signUpPasswordTextField").val(),
      email: $("#signUpEmailTextField").val()
    }).then((response) => {
      console.log(`isSignUpComplete: ${response.isSignUpComplete}`);
      console.log(`userId: ${response.userId}`);

      if(response.isSignUpComplete) {
        this.signInCompleteCallback?.(response.userId);
      }
      this.activeUsername = $("#signUpEmailTextField").val();
      this.calculateNextStep(response.nextStep, "signUpPanel")
    }).catch((ex) => {
      console.error(error);
      $("#signUpAlert").html(error.message);
      $("#signUpAlert").fadeIn();
    });
  },

  confirmSignUpButtonClickHandler: function(event) {
    $("#verifiedCodeAlert").hide();
    confirmSignUp({
      username: that.activeUsername,
      confirmationCode: $("#verifiedCodeTextField").val()
    }).then((response) => {
      console.log(`isSignUpComplete: ${response.isSignUpComplete}`);

      if(response.isSignUpComplete) {
        this.signInCompleteCallback?.();
      }
      this.calculateNextStep(response.nextStep)
    }).catch((ex) => {
      console.error(ex);
      $("#verifiedCodeAlert").html(ex.message);
      $("#verifiedCodeAlert").fadeIn();
    });
  },  

  signInWithGoogleButtonClickHandler: function(event) {
    this.signInWithGoogleCallback?.();
  },

  signInWithAmazonButtonClickHandler: function(event) {
    this.signInWithAmazonCallback?.();
  },

  render: function() {
    console.info("login page render");
    this.$el.html(this.template({}));
  }
});