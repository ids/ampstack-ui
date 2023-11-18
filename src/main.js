import $ from 'jquery';
import Backbone from 'backbone';
import _ from 'underscore';
import * as bootstrap from 'bootstrap'
import { Amplify } from 'aws-amplify';
//import { Hub } from 'aws-amplify/utils';
//import { signInWithRedirect, signOut, getCurrentUser } from 'aws-amplify/auth';
import config from './amplifyconfiguration.json';
import './main.scss'

import { App } from './app';

Amplify.configure(config);

const app = new App({ el: "#app"});

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

// @ts-ignore
$(document).ready(function() {
  app.render();
  var appRouter = new AppRouter();
  Backbone.history.start();
});
