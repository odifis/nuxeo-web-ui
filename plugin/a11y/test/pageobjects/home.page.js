const Page = require('./page.js');

class HomePage extends Page {
  open() {
    return browser.url('#!/home');
  }

  get el() {
    $('nuxeo-app').waitForDisplayed();
    return $('nuxeo-app').shadow$('nuxeo-home');
  }

  recentlyEdited() {
    this.el.waitForDisplayed();
    return this.el.shadow$('nuxeo-card[icon="nuxeo:edit"]');
  }
}

module.exports = new HomePage();
