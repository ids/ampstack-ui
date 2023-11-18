import $ from 'jquery';
import Backbone from 'backbone';
import _ from 'underscore';

import './WorkspacePage.css';
import HTML_TEMPLATE from './WorkspacePage.html?raw';

export const WorkspacePageView = Backbone.View.extend({

  template: _.template(HTML_TEMPLATE),

  initialize: function() {
      console.log("init footer");
      console.log(this.$el);
  },

  render: function() {
    console.log("workspace page render");
    console.log(this.$el.attr('id'));
    this.$el.html(this.template({}));
  }
});