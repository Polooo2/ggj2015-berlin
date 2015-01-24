(function (scene) {

  var Lyria = scene.modules.Lyria;
  var path = '';
  var final = false;
  var $conversationArea;
  // TODO
  var dialogData = scene.parent.parent.world.data.P;

  var resetCharText = function() {
    $('[data-name*="text-character"] > .text').remove();
    $('[data-name*="text-character"]').append('<div class="text"></div>');
  };

  var resetNPCText = function() {
    $('[data-name*="text-npc"] > .text').remove();
    $('[data-name*="text-npc"]').append('<div class="text"></div>');
  };

  scene.on('active', function () {
    if (!$conversationArea) {
      $conversationArea = $('[data-name*="conversation"]', scene.$element)
    }
    // reset vars
    path = '';
    final = false;

    resetCharText();

    $('[data-name*="text-character"] > .text', $conversationArea).typed({
      strings: [dialogData['-1']],
      callback: function () {
        $('[data-name~=text-npc]').fadeIn(250, function () {
          $('[data-name*="answers"]', $conversationArea).removeClass('hidden');
          setText();
        });
      }
    });
  });

  /**
   * click listener for answers
   */
  scene.bindEvents({
    '[data-behavior*="answer"]': {
      'click': function (event) {
        var self = this;

        $('[data-name~=text-npc]').fadeOut(100, function () {
          $('[data-name~=text-npc] > .text').empty();
          resetCharText();

          // get type
          var type = $(self).attr('data-type');
          path += type;
          $().typed('reset');
          $('[data-name*="text-character"] > .text', $conversationArea).typed({
            strings: [dialogData[path]],
            callback: function () {
              $('[data-name~=text-npc]').fadeIn(250, function () {
                setText();
              });
            }
          });
        });

        return false;
      }
    },
    '[data-name*="conversation"]': {
      'click': function (event) {
        if (final) {
          console.log(scene.parent.parent.world.character.hearts);

          // TODO max hearts
          if (scene.parent.parent.world.character.hearts === 1) {
            scene.parent.show('outro');
          } else {
            // in case we reached the last answer
            scene.parent.show('game', true);
          }
        }
      }
    }
  });

  /**
   *
   */
  function setText() {
    resetNPCText();

    var text = dialogData[path + '0'];
    // check for las answer
    if (!text) {
      text = dialogData[path + 'F'] || dialogData[path + 'S'];
      scene.parent.parent.world.character.hearts += dialogData[path + 'F'] ? 1 : 0;
      final = true;
      $('[data-name*="answers"]', $conversationArea).addClass('hidden');
    }
    $('[data-name*="text-npc"] > .text', $conversationArea).typed({strings: [text]});
  }

  scene.expose();


})(this);
