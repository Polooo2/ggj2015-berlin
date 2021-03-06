define(['require'], function(require) {

  var LyriaAudioManager = require('lyria/audio/manager');
  var audio;

  /**
   *
   * @param identifier
   */
  function play(id, loop) {
    if (audio) {
      audio.play(id, loop);
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
        volume: 1
      });
      audio.add({
        id: 'winning',
        paths: ['assets/audio/Winning Theme.mp3'],
        volume: 0.8
      });
      audio.add({
        id: 'intro',
        paths: ['assets/audio/intro.mp3'],
        volume: 0.8
      });

      audio.add({
        id: 'elevator-running',
        paths: ['assets/audio/sfx/Elevator_running.mp3'],
        volume: 1
      });
      audio.add({
        id: 'elevator-start',
        paths: ['assets/audio/sfx/Elevator_starts.mp3'],
        volume: 1
      });
      audio.add({
        id: 'elevator-stop',
        paths: ['assets/audio/sfx/Elevator_stops.mp3'],
        volume: 1
      });
      audio.add({
        id: 'elevator-ding',
        paths: ['assets/audio/sfx/Elevator_Ding.mp3'],
        volume: 0.7
      });
      audio.add({
        id: 'heart',
        paths: ['assets/audio/sfx/heart-conquer.mp3'],
        volume: 0.8
      });
      audio.add({
        id: 'bark',
        paths: ['assets/audio/char/bark.mp3'],
        volume: 0.8
      });
      audio.add({
        id: 'armoise',
        paths: ['assets/audio/char/armoise.mp3'],
        volume: 0.8
      });
      audio.add({
        id: 'meryl',
        paths: ['assets/audio/char/meryl.mp3'],
        volume: 0.8
      });

      audio.on('ended', function(id) {
        if (id === 'elevator-start') {
          play('elevator-running', -1);
        }
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
