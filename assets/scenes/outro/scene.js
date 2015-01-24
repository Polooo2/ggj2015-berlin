(function(scene) {
  
  scene.bindEvent('[data-behavior~=back]', function() {
    scene.parent.show('character');
  });

})(this);
