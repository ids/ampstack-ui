import $ from 'jquery';
import Backbone from 'backbone';
import _ from 'underscore';
import moment from 'moment';

import './UserProfileModal.css';
import HTML_TEMPLATE from './UserProfileModal.html?raw';

export const UserProfileModalView = Backbone.View.extend({

  template: _.template(HTML_TEMPLATE),

  render: function() {
    this.$el.html(this.template({
      user: this.user,
      userProfile: this.userProfile,
      moment: moment
    }));
  }
});