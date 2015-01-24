(function(scene) {
  var world = scene.parent.parent.world;
  
  scene.bindEvent('[data-behavior~=back]', function() {
    scene.parent.show('intro');
  });
  scene.on('active', function() {
    // check if the player has enough hearths for the win situation
    if (world.character.hearts === 3) {
      $('.background', event.$element).addClass('success');
    }
  });
})(this);
