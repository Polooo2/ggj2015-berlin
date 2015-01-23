define(['mygame/data'], function(data) {

  return function(world) {
    world.data = data;
    world.level = 1;
    world.character = '';
  };

});
