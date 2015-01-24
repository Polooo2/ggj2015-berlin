(function(scene) {
  
  var Lyria = scene.modules.Lyria;
  var path = '';
  var final = false;
  var $conversationArea;
  // TODO
  var dialogData = scene.parent.parent.world.data.P;
  scene.on('active', function() {
    if (!$conversationArea) {
      $conversationArea = $('[data-name*="conversation"]', scene.$element)
    }
    // reset vars
    path = '';
    final = false;
    $('[data-name*="text-character"]', $conversationArea).text(dialogData['-1']);
    $('[data-name*="answers"]', $conversationArea).removeClass('hidden');
    setText();
  });

  /**
   * click listener for answers
   */
  scene.bindEvents({
    '[data-behavior*="answer"]': {
      'click': function(event) {
        // get type
        var type = $(this).attr('data-type');
        path += type;
        $('[data-name*="text-character"]', $conversationArea).text(dialogData[path]);
        setText();
        return false;
      }
    },
    '[data-name*="conversation"]': {
      'click': function(event) {
        if (final) {
          // in case we reached the last answer
          scene.parent.show('game');
        }
      }
    }
  });

  /**
   *
   */
  function setText() {
    var text = dialogData[path + '0'];
    console.log($conversationArea)
    // check for las answer
    if (!text) {
      text = dialogData[path + 'F'] || dialogData[path + 'S'];
      scene.parent.parent.world.character.hearts += dialogData[path + 'F'] ? 1 : 0;
      final = true;
      $('[data-name*="answers"]', $conversationArea).addClass('hidden');
    }
    $('[data-name*="text-npc"]', $conversationArea).text(text);
    console.log($('[data-name*="text"]', $conversationArea))
  }

  scene.expose();


})(this);
