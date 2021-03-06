(function(scene) {
  var world = scene.parent.parent.world;
  var director = scene.parent.parent.director;
  scene.bindEvent('[data-behavior~=back]', function() {
    director.add('game');
    world.audio.stop('winning');
    world.audio.stop('elevator-running');
    world.character.hearts = 0;
    scene.parent.show('intro');
  });
  scene.on('active', function() {
    if ($('.background').hasClass('success')) {
      $('.background').removeClass('success');
    }

    world.audio.stop('elevator');
    world.audio.stop('elevator-running');
    world.audio.play('winning', -1);
    // check if the player has enough hearths for the win situation
    if (world.character.hearts === 3) {
      $('.background', scene.$element).addClass('success');
    }
  });
})(this);
