import Phaser from '../lib/phaser.js';
import { SCENE_KEYS } from './scenekeys.js';
import { LoginButton } from '../assets/gameobjects/loginbutton.js';
import * as WebFontLoader from '../lib/webfontloader.js';

import {
    LOGIN_ASSET_KEYS,
    PRELOAD_ASSET_KEYS
  } from '../assets/assetkeys.js';

export class LoginScene extends Phaser.Scene {
    constructor() {
        super({
            key: SCENE_KEYS.LOGIN_SCENE,
        });
    }

    preload() {
        this.load.image(LOGIN_ASSET_KEYS.LOGINBACKGROUND, 'assets/UI/LoginScene/loginbg.png');
        this.load.image(LOGIN_ASSET_KEYS.TITLE, 'assets/UI/LoginScene/title.png');
        this.load.svg(LOGIN_ASSET_KEYS.BUTTONBG, 'assets/UI/LoginScene/buttonbg.svg', { scale: 1.5 });

        this.load.svg(PRELOAD_ASSET_KEYS.LOADINGBARCONTAINER, 'assets/UI/PreloadScene/loadingbarcontainer.svg', { scale: 1.5 });
        this.load.svg(PRELOAD_ASSET_KEYS.LOADINGBARFILLMASK, 'assets/UI/PreloadScene/loadingbarfillmask.svg', { scale: 1.5 });
        this.load.svg(PRELOAD_ASSET_KEYS.LOADINGBARCIRCLE, 'assets/UI/PreloadScene/loadingbarcircle.svg', { scale: 1.5 });
        this.load.svg(PRELOAD_ASSET_KEYS.LOADINGBARLEFT, 'assets/UI/PreloadScene/loadingbarleft.svg', { scale: 1.5 });
        this.load.svg(PRELOAD_ASSET_KEYS.LOADINGBARMIDDLE, 'assets/UI/PreloadScene/loadingbarmiddle.svg', { scale: 1.5 });
        this.load.svg(PRELOAD_ASSET_KEYS.LOADINGBARRIGHT, 'assets/UI/PreloadScene/loadingbarright.svg', { scale: 1.5 });

        WebFontLoader.default.load({
            custom: {
              families: ['Housearama-Kingpin', 'Helvetica'],
            },
        });
    }

    create() {
        this.add.image(0, 0, LOGIN_ASSET_KEYS.LOGINBACKGROUND)
            .setOrigin(0);
        this.add.image(90, 20, LOGIN_ASSET_KEYS.TITLE)
            .setOrigin(0);

        const playButton = new LoginButton(this, 450, 740, LOGIN_ASSET_KEYS.BUTTONBG, 'PLAY', '36px', '#FFFFFF', '#084700', 11, 0.5, 0.5, SCENE_KEYS.PRELOAD_SCENE);    
        const loadButton = new LoginButton(this, 800, 740, LOGIN_ASSET_KEYS.BUTTONBG, 'LOAD', '36px', '#FFFFFF', '#084700', 11, 0.5, 0.5, 0);
        const aboutButton = new LoginButton(this, 1150, 740, LOGIN_ASSET_KEYS.BUTTONBG, 'ABOUT', '36px', '#FFFFFF', '#084700', 11, 0.5, 0.5, 0);
    }
}