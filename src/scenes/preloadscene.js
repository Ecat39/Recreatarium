import Phaser from '../lib/phaser.js';
import { SCENE_KEYS } from './scenekeys.js';

import {
    LOGIN_ASSET_KEYS,
    PRELOAD_ASSET_KEYS,
    GAME_ASSET_KEYS,
    HUD_ASSET_KEYS,
    SHOP_ASSET_KEYS,
    ITEMBAG_ASSET_KEYS,
} from '../assets/assetkeys.js';

export class PreloadScene extends Phaser.Scene {
    constructor() {
        super({
            key: SCENE_KEYS.PRELOAD_SCENE,
        });
    }

    preload() {
        // Setup Loading Bar
        this.add.image(0, 0, LOGIN_ASSET_KEYS.LOGINBACKGROUND)
            .setOrigin(0);
        this.add.image(90, 20, LOGIN_ASSET_KEYS.TITLE)
            .setOrigin(0);

        this.add.image(540, 640, PRELOAD_ASSET_KEYS.LOADINGBARCONTAINER)
            .setOrigin(0);

        this.add.image(555, 640+7, PRELOAD_ASSET_KEYS.LOADINGBARLEFT)
            .setOrigin(0);
        var middle = this.add.image(555+44, 640+7, PRELOAD_ASSET_KEYS.LOADINGBARMIDDLE)
            .setOrigin(0)
            .setVisible(false);
        var rightCap = this.add.image(555+44, 640+7, PRELOAD_ASSET_KEYS.LOADINGBARRIGHT)
            .setOrigin(0);

        this.add.image(540+33, 640+16, PRELOAD_ASSET_KEYS.LOADINGBARCIRCLE)
            .setOrigin(0); 

        var progressText = this.add.text(540+85, 640+20, 'Loading... 0%', { 
            fontFamily: 'Housearama-Kingpin',
            fontSize: 36,
            color: '#FFFFFF',
        })
            .setOrigin(0, 0)
            .setStroke('#084700', 11);

        // remove after use
        this.load.svg(HUD_ASSET_KEYS.TESTING, 'assets/testing.svg');

        // GameScene Assets
        this.load.svg(GAME_ASSET_KEYS.GAMEBACKGROUND, 'assets/UI/GameScene/habitatbg.svg', {scale : 1.5});
        this.load.audio(GAME_ASSET_KEYS.THEMESONG, 'assets/Sound/songtheme.wav');
        this.load.tilemapTiledJSON(GAME_ASSET_KEYS.MAP1, 'assets/Data/seedlinggrove.json');
        this.load.image('terraintiles', 'assets/Tilesheets/terraintilesheet.png');
        this.load.image('resourcetiles', 'assets/Tilesheets/resourcetilesheet.png');

        // HUDScene Assets
        this.load.image(HUD_ASSET_KEYS.HUDBACKGROUND, 'assets/UI/HUDScene/hudbg.png');
        this.load.svg(HUD_ASSET_KEYS.WOODBUTTON, 'assets/UI/HUDScene/woodbutton.svg', {scale : 1.5});
        this.load.svg(HUD_ASSET_KEYS.MUDBUTTON, 'assets/UI/HUDScene/mudbutton.svg', {scale : 1.5});
        this.load.svg(HUD_ASSET_KEYS.STONEBUTTON, 'assets/UI/HUDScene/stonebutton.svg', {scale : 1.5});
        this.load.svg(HUD_ASSET_KEYS.POLLENBUTTON, 'assets/UI/HUDScene/pollenbutton.svg', {scale : 1.5});
        this.load.svg(HUD_ASSET_KEYS.WATERBUTTON, 'assets/UI/HUDScene/waterbutton.svg', {scale : 1.5});
        this.load.svg(HUD_ASSET_KEYS.GRASSBUTTON, 'assets/UI/HUDScene/grassbutton.svg', {scale : 1.5});
        this.load.svg(HUD_ASSET_KEYS.GEMBUTTON, 'assets/UI/HUDScene/gembutton.svg', {scale : 1.5});
        this.load.svg(HUD_ASSET_KEYS.RESOURCEBUBBLE, 'assets/UI/HUDScene/resourcebubble.svg', {scale : 1.5});
        this.load.svg(HUD_ASSET_KEYS.SHOPBUTTON, 'assets/UI/HUDScene/shopbutton.svg', {scale : 1.5});
        this.load.svg(HUD_ASSET_KEYS.ITEMBAGBUTTON, 'assets/UI/HUDScene/itembagbutton.svg', {scale : 1.5});
        this.load.svg(HUD_ASSET_KEYS.ZOOMINBUTTON, 'assets/UI/HUDScene/zoominbutton.svg', {width:44, height:46});
        this.load.svg(HUD_ASSET_KEYS.ZOOMOUTBUTTON, 'assets/UI/HUDScene/zoomoutbutton.svg', {width:44, height:46});
        this.load.svg(HUD_ASSET_KEYS.MUSICBUTTON, 'assets/UI/HUDScene/musicbutton.svg', {width:44, height:46});
        this.load.svg(HUD_ASSET_KEYS.NOMUSICBUTTON, 'assets/UI/HUDScene/nomusicbutton.svg', {width:44, height:46});
        this.load.svg(HUD_ASSET_KEYS.SOUNDBUTTON, 'assets/UI/HUDScene/soundbutton.svg', {width:44, height:46});
        this.load.svg(HUD_ASSET_KEYS.NOSOUNDBUTTON, 'assets/UI/HUDScene/nosoundbutton.svg', {width:44, height:46});
        this.load.svg(HUD_ASSET_KEYS.ABOUTBUTTON, 'assets/UI/HUDScene/aboutbutton.svg', {width:44, height:46});
        this.load.svg(HUD_ASSET_KEYS.SCREENSHOTBUTTON, 'assets/UI/HUDScene/screenshotbutton.svg', {width:44, height:46});
        this.load.svg(HUD_ASSET_KEYS.SETTINGSBUTTON, 'assets/UI/HUDScene/settingsbutton.svg', {width:44, height:46});
        this.load.svg(HUD_ASSET_KEYS.SIDEBUTTONHIGHLIGHT, 'assets/UI/HUDScene/sidebuttonhighlight.svg', {width:44, height:46});
        this.load.svg(HUD_ASSET_KEYS.SHOPBUTTONHIGHLIGHT, 'assets/UI/HUDScene/shopbuttonhighlight.svg', {scale : 1.5});
        this.load.svg(HUD_ASSET_KEYS.ITEMBAGBUTTONHIGHLIGHT, 'assets/UI/HUDScene/itembagbuttonhighlight.svg', {scale : 1.5});

        // ShopScene Assets
        this.load.image(SHOP_ASSET_KEYS.SHOPBACKGROUND, 'assets/UI/ShopScene/shopbackground.png');
        this.load.svg(SHOP_ASSET_KEYS.SHOPCLOSEBUTTON, 'assets/UI/ShopScene/shopclosebutton.svg', {scale : 1.5});
        this.load.svg(SHOP_ASSET_KEYS.SHOPCLOSEBUTTONOVER, 'assets/UI/ShopScene/shopclosebuttonover.svg', {scale : 1.5});
        this.load.svg(SHOP_ASSET_KEYS.SHOPCLOSEBUTTONDOWN, 'assets/UI/ShopScene/shopclosebuttondown.svg', {scale : 1.5});
        this.load.svg(SHOP_ASSET_KEYS.SHOPTAB, 'assets/UI/ShopScene/shoptab.svg', {scale : 1.5});
        this.load.svg(SHOP_ASSET_KEYS.BUILDINGSBUTTON, 'assets/UI/ShopScene/buildingsbutton.svg', {scale : 1.5});
        this.load.svg(SHOP_ASSET_KEYS.BUILDINGSBUTTONOVER, 'assets/UI/ShopScene/buildingsbuttonover.svg', {scale : 1.5});
        this.load.svg(SHOP_ASSET_KEYS.BUILDINGSBUTTONDOWN, 'assets/UI/ShopScene/buildingsbuttondown.svg', {scale : 1.5});
        this.load.svg(SHOP_ASSET_KEYS.SUPPLIESBUTTON, 'assets/UI/ShopScene/suppliesbutton.svg', {scale : 1.5});
        this.load.svg(SHOP_ASSET_KEYS.SUPPLIESBUTTONOVER, 'assets/UI/ShopScene/suppliesbuttonover.svg', {scale : 1.5});
        this.load.svg(SHOP_ASSET_KEYS.SUPPLIESBUTTONDOWN, 'assets/UI/ShopScene/suppliesbuttondown.svg', {scale : 1.5});
        this.load.svg(SHOP_ASSET_KEYS.INKBUTTON, 'assets/UI/ShopScene/inkbutton.svg', {scale : 1.5});
        this.load.svg(SHOP_ASSET_KEYS.INKBUTTONOVER, 'assets/UI/ShopScene/inkbuttonover.svg', {scale : 1.5});
        this.load.svg(SHOP_ASSET_KEYS.INKBUTTONDOWN, 'assets/UI/ShopScene/inkbuttondown.svg', {scale : 1.5});
        this.load.svg(SHOP_ASSET_KEYS.DECORATIONSBUTTON, 'assets/UI/ShopScene/decorationsbutton.svg', {scale : 1.5});
        this.load.svg(SHOP_ASSET_KEYS.DECORATIONSBUTTONOVER, 'assets/UI/ShopScene/decorationsbuttonover.svg', {scale : 1.5});
        this.load.svg(SHOP_ASSET_KEYS.DECORATIONSBUTTONDOWN, 'assets/UI/ShopScene/decorationsbuttondown.svg', {scale : 1.5});
        this.load.svg(SHOP_ASSET_KEYS.RESOURCEPANELBACKGROUND, 'assets/UI/ShopScene/resourcepanelbackground.svg', {scale : 1.5});
        this.load.svg(SHOP_ASSET_KEYS.RESOURCEPANELOPENBUTTON, 'assets/UI/ShopScene/resourcepanelopenbutton.svg', {scale : 1.5});
        this.load.svg(SHOP_ASSET_KEYS.RESOURCEPANELOPENBUTTONOVER, 'assets/UI/ShopScene/resourcepanelopenbuttonover.svg', {scale : 1.5});
        this.load.svg(SHOP_ASSET_KEYS.RESOURCEPANELCLOSEBUTTON, 'assets/UI/ShopScene/resourcepanelclosebutton.svg', {scale : 1.5});
        this.load.svg(SHOP_ASSET_KEYS.RESOURCEPANELCLOSEBUTTONOVER, 'assets/UI/ShopScene/resourcepanelclosebuttonover.svg', {scale : 1.5});
        this.load.svg(SHOP_ASSET_KEYS.RESOURCEPANELBUTTONMASK, 'assets/UI/ShopScene/resourcepanelbuttonmask.svg', {scale : 1.5});
        
        // ItemBagScene Assets
        this.load.svg(ITEMBAG_ASSET_KEYS.ITEMBAGBACKGROUND, 'assets/UI/ItembagScene/itembagbackground.svg', {scale : 1.5});
        this.load.svg(ITEMBAG_ASSET_KEYS.ITEMBAGSCREEN, 'assets/UI/ItembagScene/itembagscreen.svg', {scale : 1.5});
        this.load.svg(ITEMBAG_ASSET_KEYS.ITEMBAGTAB, 'assets/UI/ItembagScene/itembagtab.svg', {scale : 1.5});
        this.load.svg(ITEMBAG_ASSET_KEYS.BUILDINGSBUTTON, 'assets/UI/ItembagScene/buildingsbutton.svg', {scale : 1.5});
        this.load.svg(ITEMBAG_ASSET_KEYS.BUILDINGSBUTTONOVER, 'assets/UI/ItembagScene/buildingsbuttonover.svg', {scale : 1.5});
        this.load.svg(ITEMBAG_ASSET_KEYS.BUILDINGSBUTTONDOWN, 'assets/UI/ItembagScene/buildingsbuttondown.svg', {scale : 1.5});
        this.load.svg(ITEMBAG_ASSET_KEYS.BUILDINGSBUTTONSELECTED, 'assets/UI/ItembagScene/buildingsbuttonselected.svg', {scale : 1.5});
        this.load.svg(ITEMBAG_ASSET_KEYS.SUPPLIESBUTTON, 'assets/UI/ItembagScene/suppliesbutton.svg', {scale : 1.5});
        this.load.svg(ITEMBAG_ASSET_KEYS.SUPPLIESBUTTONOVER, 'assets/UI/ItembagScene/suppliesbuttonover.svg', {scale : 1.5});
        this.load.svg(ITEMBAG_ASSET_KEYS.SUPPLIESBUTTONDOWN, 'assets/UI/ItembagScene/suppliesbuttondown.svg', {scale : 1.5});
        this.load.svg(ITEMBAG_ASSET_KEYS.SUPPLIESBUTTONSELECTED, 'assets/UI/ItembagScene/suppliesbuttonselected.svg', {scale : 1.5});
        this.load.svg(ITEMBAG_ASSET_KEYS.DECORATIONSBUTTON, 'assets/UI/ItembagScene/decorationsbutton.svg', {scale : 1.5});
        this.load.svg(ITEMBAG_ASSET_KEYS.DECORATIONSBUTTONOVER, 'assets/UI/ItembagScene/decorationsbuttonover.svg', {scale : 1.5});
        this.load.svg(ITEMBAG_ASSET_KEYS.DECORATIONSBUTTONDOWN, 'assets/UI/ItembagScene/decorationsbuttondown.svg', {scale : 1.5});
        this.load.svg(ITEMBAG_ASSET_KEYS.DECORATIONSBUTTONSELECTED, 'assets/UI/ItembagScene/decorationsbuttonselected.svg', {scale : 1.5});
        this.load.svg(ITEMBAG_ASSET_KEYS.EGGSBUTTON, 'assets/UI/ItembagScene/eggsbutton.svg', {scale : 1.5});
        this.load.svg(ITEMBAG_ASSET_KEYS.EGGSBUTTONOVER, 'assets/UI/ItembagScene/eggsbuttonover.svg', {scale : 1.5});
        this.load.svg(ITEMBAG_ASSET_KEYS.EGGSBUTTONDOWN, 'assets/UI/ItembagScene/eggsbuttondown.svg', {scale : 1.5});
        this.load.svg(ITEMBAG_ASSET_KEYS.EGGSBUTTONSELECTED, 'assets/UI/ItembagScene/eggsbuttonselected.svg', {scale : 1.5});
        this.load.svg(ITEMBAG_ASSET_KEYS.INKBUTTON, 'assets/UI/ItembagScene/inkbutton.svg', {scale : 1.5});
        this.load.svg(ITEMBAG_ASSET_KEYS.INKBUTTONOVER, 'assets/UI/ItembagScene/inkbuttonover.svg', {scale : 1.5});
        this.load.svg(ITEMBAG_ASSET_KEYS.INKBUTTONDOWN, 'assets/UI/ItembagScene/inkbuttondown.svg', {scale : 1.5});
        this.load.svg(ITEMBAG_ASSET_KEYS.INKBUTTONSELECTED, 'assets/UI/ItembagScene/inkbuttonselected.svg', {scale : 1.5});

        // P3 Animation Assets
        this.load.spritesheet(GAME_ASSET_KEYS.PINCHITWALKRIGHT, 'assets/Animations/Pinchit/walkspritesheet.svg', { frameWidth: 120, frameHeight: 120 });

        // TutorialScene Assets

        // Update Loading Bar
        this.load.on('progress', function (progress) {
            middle.setVisible(true);
            middle.displayWidth = Phaser.Math.FloorTo(progress * 100, 0) * 4;
            rightCap.setPosition(middle.x + middle.displayWidth, 640+7);
            progressText.setText('Loading... ' + Phaser.Math.FloorTo(progress * 100, 0) + '%');
        }, this); 
    }

    create() {
        this.timedEvent = this.time.addEvent({ 
            delay: 600, callback: onEvent, callbackScope: this
        });

        function onEvent() {
            this.time.delayedCall(600, this.scene.stop(SCENE_KEYS.PRELOAD_SCENE).launch(SCENE_KEYS.GAME_SCENE), [], this);
        }
    }
}