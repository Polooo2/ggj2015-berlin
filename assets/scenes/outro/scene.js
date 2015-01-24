(function(scene) {
  var world = scene.parent.parent.world;
  var director = scene.parent.parent.director;
  scene.bindEvent('[data-behavior~=back]', function() {
    director.add('game');
    world.audio.stop('winning')
    scene.parent.show('intro');
  });
  scene.on('active', function() {
    world.audio.play('winning', -1);
    // check if the player has enough hearths for the win situation
    if (world.character.hearts === 3) {
      $('.background', event.$element).addClass('success');
    }
  });
})(this);
