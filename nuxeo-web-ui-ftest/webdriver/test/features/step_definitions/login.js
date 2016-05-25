'use strict';

import LoginPage from '../../pages/login';
import UI from '../../pages/ui';
import NavButtons from '../../pages/ui/nav_buttons';

var Nuxeo = require('nuxeo');

const USERS = {
  Administrator: 'Administrator',
};

module.exports = function () {
  this.Given('I am "$username"', (username) => this.username = username);

  this.When('I login as "$username"', (username) => {
    const login = LoginPage.get();
    login.username = username;
    login.password = USERS[username];
    login.submit();
    this.client = new Nuxeo({
      auth: {
        method: 'basic',
        username: username,
        password: USERS[username]
      }
    });
    this.ui = UI.get();
  });

  this.When(/^I visit (.*)$/, (url) => driver.url(url));

  this.When('I logout', () => driver.url('/logout'));

  this.Then('I am logged in as "$username"', (username) => {
    driver.isExisting(`//nuxeo-task-widget[@username="${username}"]`).should.be.true;
  });

  this.Then('I am logged out', () => driver.isVisible('#username').should.be.true);
};
