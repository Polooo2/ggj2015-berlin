(function(scene) {

  var Lyria = scene.modules.Lyria;
  var world = scene.parent.parent.world;

  var characters = ['Meryl', 'Armoise', 'Bark'];

  scene.expose({
    character: characters
  });

  var selectedCharacter = '';

  for (var i = 0, j = characters.length; i < j; i++) {
    (function(i) {
      scene.bindEvent('[data-behavior~=select-character' + i + ']', function(e) {
        selectedCharacter = characters[i];
        world.audio.play(selectedCharacter.toLowerCase());
        $('.continue', scene.$element).removeClass('disabled');

        $('.background', scene.$element).addClass('overlay');

        $('.character', scene.$element).removeClass('active');
        $(this).addClass('active');
      });
    })(i);
  }

  scene.bindEvent('[data-behavior~=unselect]', function() {
    $('.background', scene.$element).removeClass('overlay');
    selectedCharacter = '';
    $('.continue', scene.$element).addClass('disabled');
    $('.character', scene.$element).removeClass('active');
  });

  scene.bindEvent('[data-behavior~=continue]', function() {
    // TODO: This should be data-disabled or similar
    if ($(this).hasClass('disabled')) {
      return;
    }

    world.character.name = selectedCharacter;
    scene.parent.show('game');
  });

  scene.on('active', function() {
    world.audio.play('character-sel', -1);
  });

})(this);
