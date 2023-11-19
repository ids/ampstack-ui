import $ from 'jquery';
import Backbone from 'backbone';
import _ from 'underscore';
import { signIn, signUp, confirmSignUp } from 'aws-amplify/auth';

import './LoginPage.css';
import HTML_TEMPLATE from './LoginPage.html?raw';


async function _signIn({ username, password, callback, errorHandler }) {
  try {
    const { isSignedIn, nextStep } = await signIn({ username, password });
    callback?.(isSignedIn, nextStep);
  } catch (error) {
    console.error('error signing in', error);
    errorHandler?.(error);
  }
}

async function _signUp({ username, password, email, callback, errorHandler }) {
  try {
    const { isSignUpComplete, userId, nextStep } = await signUp({
      username,
      password,
      options: {
        userAttributes: {
          email
        },
        // optional
        autoSignIn: true // or SignInOptions e.g { authFlowType: "USER_SRP_AUTH" }
      }
    });

    console.log(`NEW USER ID ${userId}`);
    callback?.(isSignUpComplete, userId, nextStep);
  } catch (error) {
    console.log('error signing up:', error);
    errorHandler?.(error);
  }
}

async function _confirmSignUp({ username, confirmationCode, callback, errorHandler }) {
  try {
    const { isSignUpComplete, nextStep } = await confirmSignUp({
      username,
      confirmationCode
    });
    callback?.(isSignUpComplete, nextStep);
  } catch (error) {
    console.log('error confirming sign up', error);
    errorHandler?.(error);
  }
}

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
    const that = this;

    console.debug("sign in button clicked");

    $("#signInAlert").hide();
    const resp = _signIn({
      username: $("#signInEmailTextField").val(),
      password: $("#signInPasswordTextField").val(),
      callback: (isSignedIn, nextStep) => {
        console.log(`isSignedIn: ${isSignedIn}`);
        if(isSignedIn) {
          this.signInCompleteCallback?.();
        }
        that.activeUsername = $("#signInEmailTextField").val();
        that.calculateNextStep(nextStep.signInStep, "signInPanel")
      },
      errorHandler: (error) => {
        console.error(error);
        $("#signInAlert").html(error.message);
        $("#signInAlert").fadeIn();
      }
    });
  },

  signUpButtonClickHandler: function(event) {
    const that = this;

    $("#signUpAlert").hide();
    const resp = _signUp({
      username: $("#signUpEmailTextField").val(),
      password: $("#signUpPasswordTextField").val(),
      email: $("#signUpEmailTextField").val(),
      callback: (isSignUpComplete, userId, nextStep) => {
        console.log(`isSignUpComplete: ${isSignUpComplete}`);
        console.log(`userId: ${userId}`);

        if(isSignUpComplete) {
          this.signInCompleteCallback?.(userId);
        }
        that.activeUsername = $("#signUpEmailTextField").val();
        that.calculateNextStep(nextStep, "signUpPanel")
      },
      errorHandler: (error) => {
        console.error(error);
        $("#signUpAlert").html(error.message);
        $("#signUpAlert").fadeIn();
      }
    });

    //$("#createAccountPanel").hide();
    //$("#verifiedCodePanel").fadeIn();
  },

  confirmSignUpButtonClickHandler: function(event) {
    const that = this;

    $("#verifiedCodeAlert").hide();
    const resp = _confirmSignUp({
      username: that.activeUsername,
      confirmationCode: $("#verifiedCodeTextField").val(),
      callback: (isSignUpComplete, nextStep) => {
        console.log(`isSignUpComplete: ${isSignUpComplete}`);

        if(isSignUpComplete) {
          this.signInCompleteCallback?.();
        }
        that.calculateNextStep(nextStep)
      },
      errorHandler: (error) => {
        console.error(error);
        $("#verifiedCodeAlert").html(error.message);
        $("#verifiedCodeAlert").fadeIn();
      }
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