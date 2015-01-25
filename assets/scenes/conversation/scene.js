(function(scene) {

  var Lyria = scene.modules.Lyria;
  var path = '';
  var final = false;
  var $conversationArea;
  // TODO
  var dialogData;
  var success = false;
  var world = scene.parent.parent.world;

  var btnTexts = {
    btn0: 'Inquire',
    btn1: 'Propose',
    btn2: 'Compliment'
  };
  var $npcPortrait;

  var resetCharText = function() {
    $npcPortrait.removeClass('aroused repulsed confident');
    $('[data-name*="text-character"] > .text', scene.$elements).remove();
    $('[data-name*="text-character"]', scene.$elements).append('<div class="text"></div>');
  };

  var resetNPCText = function() {
    $('[data-name*="text-npc"] > .text', scene.$elements).remove();
    $('[data-name*="text-npc"]', scene.$elements).append('<div class="text"></div>');
  };

  scene.on('active', function(npcNumber) {
    $('[data-name*="text-npc"]', scene.$elements).hide();

    btnTexts = {
      btn0: 'Inquire',
      btn1: 'Propose',
      btn2: 'Compliment'
    };
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

    if (dialogData.B) {
      var buttons = dialogData.B.split(';');
      btnTexts = {
        btn0: buttons[0],
        btn1: buttons[1],
        btn2: buttons[2]
      };
      setButtons(dialogData.B);
    }

    // set character data
    $('[data-name*="text-character"] > .name', scene.$elements).text(world.character.name);
    $('[data-name*="text-character"] > .icon', scene.$elements).attr('data-name', world.character.name.toLowerCase());

    // set npc data
    $('[data-name*="text-npc"] > .name', scene.$elements).text(npcName);
    if (!$npcPortrait) {
      $npcPortrait = $('.portrait', scene.$elements);
    }
    $npcPortrait.attr('data-name', npcName.toLowerCase());

    if (!$conversationArea) {
      $conversationArea = $('[data-name*="conversation"]', scene.$element)
    }
    // reset vars
    path = '';
    final = false;
    success = false;

    resetCharText();
    (function(path){
      $('[data-name*="text-character"] > .text', $conversationArea).typed({
        strings: [dialogData['-1'] || '  '],
        callback: function() {
          $('[data-name~=text-npc]').fadeIn(250, function() {
            $('[data-name*="answers"]', $conversationArea).removeClass('hidden');
            setText(path);
          });
        }
      });
    })(path);
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
          (function(path){
            $('[data-name*="text-character"] > .text', $conversationArea).typed({
              strings: [dialogData[path] || '  '],
              callback: function() {
                $('[data-name~=text-npc]').fadeIn(250, function() {
                  setText(path);
                });
              }
            });
          })(path);
        });

        return false;
      }
    },
    '[data-name*="conversation"]': {
      'click': function(event) {
        if (final) {
          console.log(scene.parent.parent.world.character.hearts);

          // in case we reached the last answer
          scene.parent.show('game', {
            afterCon: true,
            success: success
          });

        }
      }
    }
  });

  /**
   *
   */
  function setText(path) {
    resetNPCText();

    var text = dialogData[path + '0'];
    // check for las answer
    if (!text) {
      text = dialogData[path + 'F'] || dialogData[path + 'S'];
      // add a heart if this was a successful dialog
      if (dialogData[path + 'S']) {
        world.character.hearts += 1;
        success = true;
      }
      $('[data-name*="text-character"] > .text', $conversationArea).append('<span><br><i>Tap to continue ...</i></span>')
      final = true;
      $('[data-name*="answers"]', $conversationArea).addClass('hidden');
    } else {
      if (dialogData[path + '0B']) {
        setButtons(dialogData[path + '0B']);
      } else {
        setButtons('');
      }
    }
    // check for emotions
    if (text && typeof text !== 'string') {
      $npcPortrait.addClass(text.emotion);
      text = text.text;
    }
    $('[data-name*="text-npc"] > .text', $conversationArea).typed({strings: [text || '  ']});
  }

  function setButtons(btns) {
    btns = btns.split(';');
    $('[data-behavior*="answer"][data-type="1"]', scene.$element).text(btns[0] || btnTexts.btn0);
    $('[data-behavior*="answer"][data-type="2"]', scene.$element).text(btns[1] || btnTexts.btn1);
    $('[data-behavior*="answer"][data-type="3"]', scene.$element).text(btns[2] || btnTexts.btn2);
  }


})(this);
