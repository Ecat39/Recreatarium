import Phaser from '../lib/phaser.js';
import { SCENE_KEYS } from './scenekeys.js';
import { HUDScene } from './hudscene.js';
import { DATA_MANAGER_STORE_KEYS, dataManager } from '../common/datamanager.js';
import eventsManager from '../common/eventsmanager.js';

import {
    GAME_ASSET_KEYS,
} from '../assets/assetkeys.js';

export class GameScene extends Phaser.Scene {
    constructor() {
        super({
            key: SCENE_KEYS.GAME_SCENE,
        });
    }

    init() {
        this.scene.launch(SCENE_KEYS.HUD_SCENE, HUDScene);
    }

    create() {
        this.gameBg = this.add.image(-700,-495,GAME_ASSET_KEYS.GAMEBACKGROUND)
            .setOrigin(0);
        this.gameMusic = this.sound.add(GAME_ASSET_KEYS.THEMESONG, {
            volume: 1.0,
            loop: true
        })
        if (!dataManager.store.get(DATA_MANAGER_STORE_KEYS.OPTIONS_MUSICSTATE)) {
            this.gameMusic.stop();
        } else {
            this.gameMusic.play();
        }

        this.map1 = this.add.tilemap(GAME_ASSET_KEYS.MAP1);

        const tileSet1 = this.map1.addTilesetImage('terraintilesheet', 'terraintiles');
        const tileSet2 = this.map1.addTilesetImage('resourcetilesheet', 'resourcetiles');

        this.terrainLayer = this.map1.createLayer('Terrain', [ tileSet1 ], 620, -100).setOrigin(0, 0);
        this.terrainLayer.setPipeline('TextureTintPipeline');
        this.terrainLayer.setCollisionByProperty({ collides: true });
        this.resourceLayer = this.map1.createLayer('Resources', [ tileSet2 ], 620+50, -100-280).setOrigin(0, 0);
        this.resourceLayer.setPipeline('TextureTintPipeline');
        //this.resourceLayer = this.map1.createLayer('Resources', [ tileSet2 ], 340+50, -50-285);
        this.resourceLayer.setCollisionByProperty({ collides: true });
        
        this.terrainLayer.setCullPadding(8, 8)

        const pinchitSpritesheet = {
            key: 'walkright',
            frames: this.anims.generateFrameNumbers(GAME_ASSET_KEYS.PINCHITWALKRIGHT, { start: 0, end: 7}),
            frameRate: 20,
            repeat: -1
        };

        this.anims.create(pinchitSpritesheet);

        // Initial tile coordinates
        this.tileX = 1;
        this.tileY = 2;

        this.updatePinchitPosition();

        this.bgCamera = this.cameras.add(0, 0, 1600, 900).setZoom(dataManager.store.get(DATA_MANAGER_STORE_KEYS.OPTIONS_ZOOMSTATE));
        this.bgCamera.ignore([ this.terrainLayer, this.resourceLayer, this.pinchit]);
        this.gameCamera = this.cameras.add(0, 0, 1600, 900).setZoom(0.5);
        this.gameCamera.ignore([this.gameBg]);
        this.cameras.main.ignore([ this.terrainLayer, this.resourceLayer, this.pinchit, this.gameBg]);
        //gameCamera.setPostPipeline(PixelArtShader);

        let cameradragstartx;
        let cameradragstarty;

        // delete at game launch
        this.input.on('pointerdown', (pointer) => {
            console.log(pointer.x + '/' + pointer.y);
        });

        this.input.on('pointerdown', () => {
            cameradragstartx = this.gameCamera.scrollX;
            cameradragstarty = this.gameCamera.scrollY;
        });

        this.input.on('pointermove', (pointer) => {
            if (pointer.isDown) {
                if (this.gameCamera.zoom >= 1) {
                    this.boundX = 800 * this.gameCamera.zoom;
                    this.boundY = 350 * this.gameCamera.zoom;
                } else {
                    this.boundX = 800 / this.gameCamera.zoom;
                    this.boundY = 350 / this.gameCamera.zoom;
                }
                this.gameCamera.scrollX = Phaser.Math.Clamp(cameradragstartx + (pointer.downX - pointer.x) / this.gameCamera.zoom, -this.boundX, this.boundX);
                this.gameCamera.scrollY = Phaser.Math.Clamp(cameradragstarty + (pointer.downY - pointer.y) / this.gameCamera.zoom, -this.boundY, this.boundY);
            }
            //console.log(cameradragstartx, pointer.downX, pointer.x, this.gameCamera.zoom);
        });

        this.input.on('wheel', (pointer, gameObjects, deltaX, deltaY, deltaZ) => {
            // Get the current world point under pointer.
            const worldpoint = this.gameCamera.getWorldPoint(pointer.x, pointer.y);
            const newzoom = Phaser.Math.RoundTo(this.gameCamera.zoom - this.gameCamera.zoom * 0.001 * deltaY, -3);
            this.gameCamera.zoom = Phaser.Math.Clamp(newzoom, 0.3, 2);
            console.log(this.gameCamera.zoom);

            // Update camera matrix, so getWorldPoint returns zoom-adjusted coordinates.
            this.gameCamera.shakeEffect.preRender();
            const newWorldPoint = this.gameCamera.getWorldPoint(pointer.x, pointer.y);
            // Scroll the camera to keep the pointer under the same world point.
            this.gameCamera.scrollX -= newWorldPoint.x - worldpoint.x;
            this.gameCamera.scrollY -= newWorldPoint.y - worldpoint.y;
        });

        eventsManager.on('zoom-in', zoomIn, this);
        eventsManager.on('zoom-out', zoomOut, this);

        function zoomIn() {
            var currentzoom = dataManager.store.get(DATA_MANAGER_STORE_KEYS.OPTIONS_ZOOMSTATE);
            currentzoom += 0.07;
            if (currentzoom >= 1.56) {
                currentzoom = 1.56;
            }
            this.bgCamera.zoom = currentzoom;
            dataManager.store.set(DATA_MANAGER_STORE_KEYS.OPTIONS_ZOOMSTATE, currentzoom);
        }

        function zoomOut() {
            var currentzoom = dataManager.store.get(DATA_MANAGER_STORE_KEYS.OPTIONS_ZOOMSTATE);
            currentzoom -= 0.07;
            if (currentzoom <= 0.65) {
                currentzoom = 0.65;
            }
            this.bgCamera.zoom = currentzoom;
            dataManager.store.set(DATA_MANAGER_STORE_KEYS.OPTIONS_ZOOMSTATE, currentzoom);
        }

        eventsManager.on('music-change', changeMusic, this);
        eventsManager.on('sound-change', changeSound, this);

        function changeMusic() {
            if (!dataManager.store.get(DATA_MANAGER_STORE_KEYS.OPTIONS_MUSICSTATE)) {
                this.gameMusic.pause();
            } else {
                this.gameMusic.resume();
            }
        }

        function changeSound() {
            if (!dataManager.store.get(DATA_MANAGER_STORE_KEYS.OPTIONS_SOUNDSTATE)) {
                console.log('no sound');
            } else {
                console.log('sound on');
            }
        }
    }

    updatePinchitPosition() {
        if (this.pinchit) {
            this.pinchit.setPosition(this.map1.tileToWorldXY(0,1,).x, this.map1.tileToWorldXY(0,1).y).setOrigin(0.5,0.5);
        } else {
            this.pinchit = this.add.sprite(this.map1.tileToWorldXY(0,1).x, this.map1.tileToWorldXY(0,1).y, GAME_ASSET_KEYS.PINCHITWALKRIGHT).play('walkright').setOrigin(0.5,0.5);
        }
        console.log(this.map1.tileToWorldXY(0,1).x, this.map1.tileToWorldXY(0,1).y, this.map1.tileWidth, this.map1.tileHeight);
    }

    update () {
        var currentdate = new Date(); 
        var datetime = "Last Sync: " + currentdate.getDate() + "/"
                        + (currentdate.getMonth()+1)  + "/" 
                        + currentdate.getFullYear() + " @ "  
                        + currentdate.getHours() + ":"  
                        + currentdate.getMinutes() + ":" 
                        + currentdate.getSeconds();
        //console.log(datetime);
    }
}
