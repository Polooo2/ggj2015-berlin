(function(scene) {
  var world = scene.parent.parent.world;
  
  scene.bindEvent('[data-behavior~=back]', function() {
    scene.parent.show('intro');
  });
})(this);
