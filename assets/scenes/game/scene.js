(function(scene) {
  
  var Lyria = scene.modules.Lyria;
  var myScroll;
  var floor = 0;

  scene.on('active', function(moveUp) {
    if (!myScroll) {
      var wrapper = document.getElementById('wrapper');
      myScroll = new IScroll(wrapper, {
        'startY': -2304
      });
      startCharacterMoving('hero1', 'right', false, function() {
        startCharacterMoving('npc0', 'left', true, function() {
          // Add a few millis in between
          setTimeout(function() {
            scene.parent.show('conversation');
          }, 350);
        });
      });
    }

    // if returning from a conversation
    if (moveUp) {
      floorUp();
    }
  });

  scene.expose({
  });

  function floorUp() {
    floor++;
    myScroll.scrollBy(0, 768, 2000);
    if (myScroll.y > -768) {
      // jump four tiles down
      myScroll.scrollBy(0, -768 * 4);
    }

  }

  function startCharacterMoving(name, side, inbetween, callback) {
    var $character = $('.character.' + name, scene.$element);
    $character.removeClass('hidden');

    setTimeout(function() {
      $character.addClass(side + '-side');

      // This should be rather onTransitionEnd, but I'm not sure about its iOS support
      $character.on('transitionend', function() {
        floorUp();

        $('#scroller', scene.$element).on('transitionend', function() {

          if (inbetween) {
            if (callback) {
              callback();
            }
          } else {
            setTimeout(function() {
              floorUp();

              $('#scroller', scene.$element).on('transitionend', function() {
                if (callback) {
                  callback();
                }
              });
            }, 350);
          }

        });

      });
    }, 200);
  }

})(this);
