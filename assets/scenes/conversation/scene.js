(function(scene) {

  var Lyria = scene.modules.Lyria;
  var path = '';
  var final = false;
  var $conversationArea;
  // TODO
  var dialogData;
  var world = scene.parent.parent.world;

  var resetCharText = function() {
    $('[data-name*="text-character"] > .text', scene.$elements).remove();
    $('[data-name*="text-character"]', scene.$elements).append('<div class="text"></div>');
  };

  var resetNPCText = function() {
    $('[data-name*="text-npc"] > .text', scene.$elements).remove();
    $('[data-name*="text-npc"]', scene.$elements).append('<div class="text"></div>');
  };

  scene.on('active', function(npcNumber) {
    var npcName;
    switch (npcNumber) {
      case 'npc0':
        dialogData = world.data.D[world.character.name];
        npcName = 'Demolitos';
        break;
      case 'npc1':
        dialogData = world.data.T[world.character.name];
        npcName = 'Table';
        break;
      case 'npc2':
        dialogData = world.data.P[world.character.name];
        npcName = 'Phostnack';
        break;
    }

    // set character data
    $('[data-name*="text-character"] > .name', scene.$elements).text(world.character.name);
    $('[data-name*="text-character"] > [data-name*="text-icon"]', scene.$elements).attr('data-name', world.character.name.toLowerCase());

    // set npc data
    $('[data-name*="text-npc"] > .name', scene.$elements).text(npcName);
    $('.portrait', scene.$elements).attr('data-name', npcName.toLowerCase());

    if (!$conversationArea) {
      $conversationArea = $('[data-name*="conversation"]', scene.$element)
    }
    // reset vars
    path = '';
    final = false;

    resetCharText();

    $('[data-name*="text-character"] > .text', $conversationArea).typed({
      strings: [dialogData['-1']],
      callback: function() {
        $('[data-name~=text-npc]').fadeIn(250, function() {
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
      'click': function(event) {
        var self = this;

        $('[data-name~=text-npc]').fadeOut(100, function() {
          $('[data-name~=text-npc] > .text').empty();
          resetCharText();

          // get type
          var type = $(self).attr('data-type');
          path += type;
          $().typed('reset');
          $('[data-name*="text-character"] > .text', $conversationArea).typed({
            strings: [dialogData[path]],
            callback: function() {
              $('[data-name~=text-npc]').fadeIn(250, function() {
                setText();
              });
            }
          });
        });

        return false;
      }
    },
    '[data-name*="conversation"]': {
      'click': function(event) {
        if (final) {
          console.log(scene.parent.parent.world.character.hearts);

          // in case we reached the last answer
          scene.parent.show('game', true);

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
      // add a heart if this was a successful dialog
      if (dialogData[path + 'S']) {
        scene.parent.parent.world.character.hearts += 1;
        world.audio.play('heart')
      }

      final = true;
      $('[data-name*="answers"]', $conversationArea).addClass('hidden');
    }
    $('[data-name*="text-npc"] > .text', $conversationArea).typed({strings: [text]});
  }

  scene.expose();


})(this);
