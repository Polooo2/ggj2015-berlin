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

        $speechContainer.css('left', $target.offset().left - $('.viewport').offset().left + ($target.width() / 4) + 'px');
        $speechContainer.css('top', ($target.offset().top - $('.viewport').offset().top - 100) + 'px');
      });
    })(i);
  }

  scene.bindEvent('[data-behavior~=unselect]', function() {
    $('.background', scene.$element).attr('data-active', 'none');
    selectedCharacter = '';
    $('.continue', scene.$element).addClass('disabled');
    $('.speech-bubble-container', scene.$element).addClass('hidden');
  });

  scene.bindEvent('[data-behavior~=continue]', function() {
    // TODO: This should be data-disabled or similar
    if ($(this).hasClass('disabled')) {
      return;
    }

    world.character = selectedCharacter;
    scene.parent.show('game');
  });

  scene.on('active', function() {
    world.audio.play('character-sel', -1);
  });

})(this);
