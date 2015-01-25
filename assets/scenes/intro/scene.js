(function(scene) {
  var world = scene.parent.parent.world;
  
  scene.bindEvent('[data-behavior~=start]', function() {
    scene.parent.show('character');
  });

  scene.bindEvent('[data-behavior~=credits]', function() {
    scene.parent.show('credits');
  });
  scene.on('active', function() {
    world.audio.play('intro', -1);
  });
})(this);
