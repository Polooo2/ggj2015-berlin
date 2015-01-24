(function(scene) {

  var Lyria = scene.modules.Lyria;
  var world = scene.parent.parent.world;
  var myScroll;
  var floor = 0;
  var level = 0;

  scene.on('active', function(afterConversation) {
    if (!myScroll) {
      world.audio.stop('character-sel');
      world.audio.play('elevator', -1);
      var wrapper = document.getElementById('wrapper');
      myScroll = new IScroll(wrapper, {
        'startY': -2304,
        disableMouse: true,
        disablePointer: true,
        disableTouch: true,
        snap: 'li'
      });
      myScroll.goToPage(0, 5, 0);
      startCharacterMoving('hero1', 'right', false, function() {
        world.audio.stop('elevator-running');
        world.audio.play('elevator-ding');
        startCharacterMoving('npc' + level, 'left', true, function() {
          world.audio.stop('elevator-running');
          world.audio.play('elevator-stop');
          // Add a few millis in between

          scene.$element.addClass('shake animated');
          setTimeout(function() {
            scene.$element.removeClass('shake animated');
            scene.parent.show('conversation', 'npc' + level);
          }, 1850);
        });
      });
    }
    // if returning from a conversation
    if (afterConversation) {
      myScroll.refresh();
      world.audio.play('elevator-start');
      // move up one floor
      floorUp(function() {
        world.audio.stop('elevator-running');
        world.audio.play('elevator-ding');
        // move old npc out
        startCharacterMoving('npc' + level, 'out', true, function() {
          level++;
          if (level === 2) {
            // outro
            scene.parent.show('outro');
          } else {
            // move new npc in
            startCharacterMoving('npc' + level, 'left', true, function() {
              scene.$element.addClass('shake animated');

              world.audio.stop('elevator-running');
              world.audio.play('elevator-stop');

              // Add a few millis in between
              setTimeout(function() {
                scene.$element.removeClass('shake animated');
                scene.parent.show('conversation', 'npc' + level);
              }, 1850);
            });
          }
        });
      });
    }
  });

  function floorUp(callback) {
    var cbFn = function() {
      myScroll.off('scrollEnd', cbFn);
      if (callback) {
        callback();
      }

      if (myScroll.currentPage.pageY === 0) {
        // jump four tiles down
        myScroll.goToPage(0, 4, 0);
      }
    };
    floor++;

    myScroll.on('scrollEnd', cbFn);

    setTimeout(function() {
      myScroll.prev();
    }, 350);
  }

  /**
   *
   * @param name
   * @param side
   * @param inbetween
   * @param callback
   */
  function startCharacterMoving(name, side, inbetween, callback) {
    var $character = $('.character.' + name, scene.$element);
    $character.removeClass('hidden');

    setTimeout(function() {
      $character.addClass(side + '-side');

      // This should be rather onTransitionEnd, but I'm not sure about its iOS support
      $character.off('transitionend').on('transitionend', function() {
        if (side === 'out') {
          if (callback) {
            callback();
          }
        } else {
          world.audio.play('elevator-running', -1);
          floorUp(function() {
            if (inbetween) {
              if (callback) {
                callback();
              }
            } else {
              floorUp(callback);
            }

          });
        }
      });
    }, 200);
  }

})(this);
