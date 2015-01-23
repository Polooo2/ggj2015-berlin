(function(scene) {

  var Lyria = scene.modules.Lyria;
  var world = scene.parent.parent.world;

  var characters = ['Armoise', 'Character 2', 'Character 3'];

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
        $('.character', scene.$element).removeClass('active');
        $target.addClass('active');

        var $speechContainer = $('.speech-bubble-container', scene.$element);
        $speechContainer.removeClass('hidden');
        // This looks weird and it is
        $speechContainer.css('left', $target.position().left + 'px');
      });
    })(i);
  }

  scene.bindEvent('[data-behavior~=continue]', function() {
    world.character = selectedCharacter;
    scene.parent.show('game');
  });

  /*scene.on('active', function() {
    console.log('active: ' + scene.name);
  });

  scene.on('active', function() {
    Lyria.PrefabManager.append({
      name: 'button',
      parent: scene.$element
    });

    // It's funny when buttons appear out of thin air
    for (var i = 1, j = 3; i <= j; i++) {
      (function(index, time) {
        scene.trigger({
          name: 'more-buttons',
          delay: time
        }, i);
      })(i, i * 1500);
    }
  });

  scene.on('more-buttons', function(index) {
    Lyria.PrefabManager.append({
      name: 'button',
      parent: scene.$element
    }, {
      title: 'Button ' + index
    });
  });

  scene.expose({
    test: 'Hallo'
  });*/

})(this);
