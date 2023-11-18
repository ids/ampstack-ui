import $ from 'jquery';
import Backbone from 'backbone';
import _ from 'underscore';
import DOMPurify from 'dompurify';
import { marked } from 'marked';

import './AboutPage.css';
import HTML_TEMPLATE from './AboutPage.html?raw';
import ABOUT_MARKDOWN from './AboutPage.md?raw';

export const AboutPageView = Backbone.View.extend({

  template: _.template(HTML_TEMPLATE),

  initialize: function() {
      console.log("init footer");
      console.log(this.$el);
  },

  render: function() {
    console.log("about page render");
    console.log(this.$el.attr('id'));

    this.$el.html(this.template({
      markdownHTML: DOMPurify.sanitize(marked.parse(ABOUT_MARKDOWN))
    }));
  }
});