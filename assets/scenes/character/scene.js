(function(scene) {

  var Lyria = scene.modules.Lyria;
  var world = scene.parent.parent.world;

  var characters = ['Character 1', 'Armoise', 'Character 3', 'Character 4'];

  // TODO: Add actual character names here
  scene.expose({
    character: characters
  });

  var selectedCharacter = '';

  for (var i = 0, j = characters.length; i < j; i++) {
    (function(i) {
      scene.bindEvent('[data-behavior~=select-character' + i + ']', function(e) {
        selectedCharacter = characters[i];
        $('.continue', scene.$element).removeClass('disabled');
        var $target = $(e.currentTarget);

        $('.background', scene.$element).attr('data-active', 'char' + i);

        var $speechContainer = $('.speech-bubble-container', scene.$element);
        $speechContainer.removeClass('hidden');
        // This looks weird and it is
        $speechContainer.css('left', $target.position().left + ($target.width() / 4) + 'px');
        $speechContainer.css('top', ($target.position().top - 100) + 'px');
      });
    })(i);
  }

  scene.bindEvent('[data-behavior~=continue]', function() {
    world.character = selectedCharacter;
    scene.parent.show('game');
  });

})(this);
