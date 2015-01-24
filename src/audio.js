define(['require'], function(require) {

  var LyriaAudioManager = require('lyria/audio/manager');
  var audio;

  /**
   *
   * @param identifier
   */
  function play(identifier) {
    if (audio) {
      audio.play(identifier, -1);
    }
  }
  return {
    init: function() {
      audio = new LyriaAudioManager();
      // init all background sounds
      audio.add({
        id: 'elevator',
        paths: ['assets/audio/Main_Theme_128.mp3'],
        volume: 0.8
      });
      audio.add({
        id: 'character-sel',
        paths: ['assets/audio/Bassline_Character Select_128.mp3'],
        volume: 0.8
      });

    },
    play: play,
    stop: function(id) {
      if (audio) {
        audio.stop(id);
      }
    }
  };


});
