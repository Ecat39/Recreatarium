import Phaser from './lib/phaser.js';
import { SCENE_KEYS } from './scenes/scenekeys.js';
import { LoginScene } from './scenes/loginscene.js';
import { PreloadScene } from './scenes/preloadscene.js';
import { TutorialScene } from './scenes/tutorialscene.js';
import { GameScene } from './scenes/gamescene.js';
import { HUDScene } from './scenes/hudscene.js';
import { ShopScene } from './scenes/shopscene.js';
import { ItembagScene } from './scenes/itembagscene.js';

const game = new Phaser.Game({
    type: Phaser.WEBGL,
    pixelArt: false,
    scale: {
        width: 1600,
        height: 900,
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    zoom: 1 / devicePixelRatio, 
    parent: 'game-container',
    backgroundColor: '#FFFFFF',
});

game.scene.add(SCENE_KEYS.LOGIN_SCENE, LoginScene);
game.scene.add(SCENE_KEYS.PRELOAD_SCENE, PreloadScene);
game.scene.add(SCENE_KEYS.TUTORIAL_SCENE, TutorialScene);
game.scene.add(SCENE_KEYS.GAME_SCENE, GameScene);
game.scene.add(SCENE_KEYS.HUD_SCENE, HUDScene);
game.scene.add(SCENE_KEYS.SHOP_SCENE, ShopScene);
game.scene.add(SCENE_KEYS.ITEMBAG_SCENE, ItembagScene);

//game.scene.start(SCENE_KEYS.PRELOAD_SCENE, PreloadScene);
game.scene.start(SCENE_KEYS.LOGIN_SCENE, LoginScene);
