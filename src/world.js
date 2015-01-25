define(['require'], function(require) {
  var data = require('mygame/data');
  var audio = require('mygame/audio');
  //audio.init();
  return function(world) {
    world.data = data;
    world.level = 1;
    world.character = {
      hearts: 0,
      name: ''
    };
    world.audio = audio;
  };

});
