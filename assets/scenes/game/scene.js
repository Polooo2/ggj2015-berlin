(function(scene) {
  
  var Lyria = scene.modules.Lyria;
  var myScroll;
  var floor = 0;

  scene.on('active', function() {
    if (!myScroll) {
      var wrapper = document.getElementById('wrapper');
      myScroll = new IScroll(wrapper, {
        'startY': -2304
      });
    }
  });

  scene.on('achievement', function() {
  });

  scene.expose({
  });

  function floorUp() {
    floor++;
    myScroll.scrollBy(0, 768, 2000);
    if (myScroll.y > -768) {
      // jump four tiles down
      myScroll.scrollBy(0, -768 * 4);
    }

  }

})(this);
