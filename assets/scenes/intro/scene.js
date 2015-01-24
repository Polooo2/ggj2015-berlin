(function(scene) {
  
  scene.bindEvent('[data-behavior~=start]', function() {
    scene.parent.show('character');
  });

  scene.bindEvent('[data-behavior~=credits]', function() {
    scene.parent.show('credits');
  });

})(this);
