(function(scene) {

  var Lyria = scene.modules.Lyria;
  var world = scene.parent.parent.world;
  var myScroll;
  var floor = 0;
  var level = 0;

  var npcStuck = {
    '0': 'What... ? Are we... stuck? What... do we... do now?',
    '1': '...',
    '2': 'What the nack? Are we stuck?... What do we do now?'
  };

  var setElevatorStatus = function(pos) {
    var $elevatorStatus = $('.elevator-status', scene.$element);
    $elevatorStatus.removeClass('p0 p1 p2 p3 p4 p5 p6').addClass('p' + pos);
  };

  scene.on('active', function(params) {
    params = params || {};
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
      myScroll.goToPage(0, 3, 0);
      startCharacterMoving(world.character.name.toLowerCase(), 'right', false, function() {
        world.audio.stop('elevator-running');
        world.audio.play('elevator-ding');
        startCharacterMoving('npc' + level, 'left', true, function() {
          world.audio.stop('elevator-start');
          world.audio.stop('elevator-running');
          world.audio.play('elevator-stop');
          // Add a few millis in between

          scene.$element.addClass('shake animated');

          $('.bubble > .text', scene.$element).remove();
          $('.bubble', scene.$element).append('<div class="text"></div>');

          $('.bubble', scene.$element).fadeIn(100, function() {
            $('.bubble > .text', scene.$element).typed({
              strings: [npcStuck[level]], callback: function() {
                setTimeout(function() {
                  $('.bubble', scene.$element).fadeOut(100, function() {
                    scene.$element.removeClass('shake animated');
                    scene.parent.show('conversation', 'npc' + level);
                  });
                }, 2250);
              }
            });

          });
        });
      });
    }

    if (params.success) {
      $('.character.'+world.character.name.toLowerCase()+',.character.npc' + level, scene.$element).fadeOut(1000);
      $('.heart', scene.$element).fadeIn(1000, 'swing', function() {
        $('.character.'+world.character.name.toLowerCase()+',.character.npc' + level, scene.$element).fadeIn(1500);

        $('#game .hearts').attr('data-hearts', world.character.hearts);
        world.audio.play('heart');
        setTimeout(function() {

          $('.heart', scene.$element).fadeOut(2000, 'swing');
        }, 750)
      })
    }

    // if returning from a conversation
    if (params.afterCon) {
      myScroll.refresh();
      world.audio.play('elevator-start');
      // move up one floor
      floorUp(function() {
        world.audio.stop('elevator-start');
        world.audio.stop('elevator-running');
        world.audio.play('elevator-ding');
        // move old npc out
        startCharacterMoving('npc' + level, 'out', true, function() {
          level++;

          if (level === 3) {
            floorUp(function() {
              myScroll.goToPage(0, 7, 0);
              floorUp(function() {
                // outro
                scene.parent.show('outro');
              });
            });
          } else {
            // move new npc in
            startCharacterMoving('npc' + level, 'left', true, function() {
              world.audio.stop('elevator-running');
              world.audio.play('elevator-stop');

              scene.$element.addClass('shake animated');

              $('.bubble > .text', scene.$element).remove();
              $('.bubble', scene.$element).append('<div class="text"></div>');

              $('.bubble', scene.$element).fadeIn(100, function() {
                $('.bubble > .text', scene.$element).typed({
                  strings: [npcStuck[level]], callback: function() {
                    setTimeout(function() {
                      $('.bubble', scene.$element).fadeOut(100, function() {
                        scene.$element.removeClass('shake animated');
                        scene.parent.show('conversation', 'npc' + level);
                      });
                    }, 2250);
                  }
                });

              });
            });
          }
        });
      });
    }
  });

  function floorUp(callback) {
    setElevatorStatus(floor);

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

    var move = function() {
      $character.addClass(side + '-side');

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
    };

    setTimeout(function() {
      // Mirroring not working right now :(
      if (side === 'out') {
        $character.addClass('mirror');

        $character.off('transitionend').on('transitionend', function() {
          move();
        });
      } else {
        move();
      }
    }, 200);
  }

})(this);
