global.jQuery = require('jquery');
global.$ = jQuery.noConflict();
require('jquery-modal');

(function() {
  const before = require('./init/before.js');
  const common = require('./init/common.js');
  const after = require('./init/after.js');
  const queue = document.getElementsByTagName('body')[0].className.split(' ');

  // Actions and document body classes are 1:1
  // Eg: HTML doc with body class of 'home' will execute the function associated with the 'home' key
  const actions = {
    'home': require('./init/home.js')
  };

  before();
  common();

  queue.map(action => {
    if (actions[action] !== undefined) {
      actions[action].call();
    }
  });

  return after();
})();
