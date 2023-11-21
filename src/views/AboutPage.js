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
      console.info("init footer");
  },

  render: function() {
    console.info("about page render");

    marked.use({
      pedantic: false,
      gfm: true,
    });

    this.$el.html(this.template({
      markdownHTML: DOMPurify.sanitize(marked.parse(ABOUT_MARKDOWN))
    }));
  }
});