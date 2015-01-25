define(['require'], function(require) {'use strict';

  // Loading all necessary modules
  var Game = require('lyria/game');
  var LocalizationGroup = require('lyria/localization/group');
  var achievements = require('mygame/achievements');
  var sceneList = require('mygame/scenelist');
  var prefabList = require('mygame/prefablist');
  var assetList = require('mygame/assetlist');
  var i18n = require('mygame/i18n');
  var world = require('mygame/world');
  var PrefabManager = require('lyria/prefab/manager');
  var Fastclick = require('fastclick');

  Fastclick.attach(document.body);

  // Create a new game object
  var myGame = new Game();

  myGame.localization = new LocalizationGroup(i18n);

  // Set up achievements
  achievements(myGame.viewport, myGame.localization.achievements);

  world(myGame.world);

  // Set generated scene files
  myGame.director.scenes = sceneList();

  // Set generated prefab files
  PrefabManager.prefabs = prefabList();
  
  // myGame allows to add scenes directly, which internally uses the scene director
  myGame
    .addScene('character')
    .addScene('conversation')
    .addScene('outro')
    .addScene('intro')
    .addScene('credits')
    .addScene('game');

  $('body').append('<div class="loading"><div class="text">Loading, please wait...</div><div class="percentage">0 %</div></div>')


  myGame.preloader.on('progress', function(percent) {
    if (percent === 100) {
      percent = 1;
    }

    $('.loading > .percentage').html(~~(percent * 100) + ' %');
  });

  // If preloader is complete, everything in this function happens
  myGame.preloader.on('complete', function() {
    $('.loading').remove();
    myGame.showScene('intro');
  });

  // Set asset list for preloader
  myGame.preloader.assets = assetList;

  // Spin up the preloader
  myGame.preloader.start();

  return myGame;
}); 
