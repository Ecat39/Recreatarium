import Phaser from '../lib/phaser.js';
import { SCENE_KEYS } from './scenekeys.js';

import {
    GAME_ASSET_KEYS,
    HUD_ASSET_KEYS,
  } from '../assets/assetkeys.js';

export class TutorialScene extends Phaser.Scene {
    constructor() {
        super({
            key: SCENE_KEYS.TUTORIAL_SCENE,
        });
    }

    preload() {
        this.load.svg(GAME_ASSET_KEYS.GAMEBACKGROUND, 'assets/UI/GameScene/habitatbg.svg');
        this.load.audio(GAME_ASSET_KEYS.THEMESONG, 'assets/Sound/songtheme.wav')
    }

    create() {
        this.add.image(-585,-330,GAME_ASSET_KEYS.GAMEBACKGROUND)
            .setOrigin(0);
        this.gameMusic = this.sound.add(GAME_ASSET_KEYS.THEMESONG, {
            volume: 1.0,
            loop: true
        }).play();
    }
}