import $ from 'jquery';
import Backbone from 'backbone';
import _ from 'underscore';
import * as bootstrap from 'bootstrap'
//import { Hub } from 'aws-amplify/utils';
//import { signInWithRedirect, signOut, getCurrentUser } from 'aws-amplify/auth';
import awsConfig from './awsConfig.js'

import './main.scss'

awsConfig();

import './main.scss'

import { App } from './app';

const AppRouter = Backbone.Router.extend({
	routes: {
		"": "showWelcomePage",
		"about": "showAboutPage",
    "workspace": "showWorkspace"
	},
	showWelcomePage: function () {
		app.showWelcomePage();
	},
	showAboutPage: function () {
    app.showAboutPage();
	},
	showWorkspace: function () {
    app.showWorkspace();
	}
});

const app = new App({ el: "#app"});

$(() => {
  app.render();
  app.router = new AppRouter();
  Backbone.history.start();
});