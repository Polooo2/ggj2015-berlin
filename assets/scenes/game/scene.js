(function(scene) {

  var Lyria = scene.modules.Lyria;
  var world = scene.parent.parent.world;
  var myScroll;
  var floor = 0;

  scene.on('active', function(moveUp) {
    world.audio.stop('character-sel');
    world.audio.play('elevator');
    if (!myScroll) {
      var wrapper = document.getElementById('wrapper');
      myScroll = new IScroll(wrapper, {
        'startY': -2304,
        disableMouse: true,
        disablePointer: true,
        disableTouch: true,
        snap: 'li'
      });
      myScroll.goToPage(0, 3, 0);
      startCharacterMoving('hero1', 'right', false, function() {
        startCharacterMoving('npc0', 'left', true, function() {
          // Add a few millis in between
          setTimeout(function() {
            scene.parent.show('conversation');
          }, 850);
        });
      });
    }

    // if returning from a conversation
    if (moveUp) {
      floorUp();
    }
  });

  scene.expose({});

  function floorUp(callback) {
    floor++;
    console.log('moving to page ' + myScroll.currentPage.pageY)
    myScroll.prev();
    if (myScroll.currentPage.pageY === 0) {
      // jump four tiles down
      myScroll.goToPage(0, 4, 0);
      console.log('jumping')
      if (callback) {
        myScroll.on('scrollEnd', function() {
          callback();
        });
      }
    } else {
      if (callback) {
        myScroll.on('scrollEnd', function() {
          callback();
        });
      }
    }

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
      $character.on('transitionend', function() {
        setTimeout(function() {
          floorUp(function() {

            if (inbetween) {
              if (callback) {
                callback();
              }
            } else {
              setTimeout(function() {
                floorUp(callback);
              }, 350);
            }

          });
        }, 550);
      });
    }, 200);
  }

})(this);
