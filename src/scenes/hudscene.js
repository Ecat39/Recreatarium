import Phaser from '../lib/phaser.js';
import { SCENE_KEYS } from './scenekeys.js';
import { ResourceButton } from '../assets/gameobjects/resourcebutton.js';
import eventsManager from '../common/eventsmanager.js';
import { DATA_MANAGER_STORE_KEYS, dataManager } from '../common/datamanager.js';

import {
    HUD_ASSET_KEYS,
  } from '../assets/assetkeys.js';

export class HUDScene extends Phaser.Scene {
    constructor() {
        super({
            key: SCENE_KEYS.HUD_SCENE,
        });
    }

    create() {
        this.add.image(0, 654, HUD_ASSET_KEYS.HUDBACKGROUND)
            .setOrigin(0);

        const resourceButtonGroup = {
            woodButton: new ResourceButton(this, 984, 738, HUD_ASSET_KEYS.WOODBUTTON, 'Wood', dataManager.store.get(DATA_MANAGER_STORE_KEYS.WOOD)),
            mudButton: new ResourceButton(this, 1054, 738, HUD_ASSET_KEYS.MUDBUTTON, 'Mud', dataManager.store.get(DATA_MANAGER_STORE_KEYS.MUD)),
            stoneButton: new ResourceButton(this, 1122, 738, HUD_ASSET_KEYS.STONEBUTTON, 'Stone', dataManager.store.get(DATA_MANAGER_STORE_KEYS.STONE)),
            pollenButton: new ResourceButton(this, 1219, 738, HUD_ASSET_KEYS.POLLENBUTTON, 'Pollen', dataManager.store.get(DATA_MANAGER_STORE_KEYS.POLLEN)),
            waterButton: new ResourceButton(this, 1289, 738, HUD_ASSET_KEYS.WATERBUTTON, 'Water', dataManager.store.get(DATA_MANAGER_STORE_KEYS.WATER)),
            grassButton: new ResourceButton(this, 1357, 738, HUD_ASSET_KEYS.GRASSBUTTON, 'Grass', dataManager.store.get(DATA_MANAGER_STORE_KEYS.GRASS)), 
            gemButton: new ResourceButton(this, 1457, 738, HUD_ASSET_KEYS.GEMBUTTON, 'Gem', dataManager.store.get(DATA_MANAGER_STORE_KEYS.GEM)) 
        }

        const shopButton = this.add.image(405, 687, HUD_ASSET_KEYS.SHOPBUTTON)
            .setOrigin(0)
            .setInteractive({ cursor: 'pointer' });
        shopButton.on('pointerover', () => {
            highlightshopButton.setPosition(shopButton.x, shopButton.y);
            highlightshopButton.visible = !highlightshopButton.visible;
        });
        shopButton.on('pointerout', () => {
            highlightshopButton.visible = !highlightshopButton.visible;
        });
        shopButton.on('pointerdown', () => {
            this.scene.launch(SCENE_KEYS.SHOP_SCENE);
            this.input.setDefaultCursor('default');
        });

        const itembagButton = this.add.image(260, 687, HUD_ASSET_KEYS.ITEMBAGBUTTON)
            .setOrigin(0)
            .setInteractive({ cursor: 'pointer' });
        itembagButton.on('pointerover', () => {
            highlightitembagButton.setPosition(itembagButton.x, itembagButton.y);
            highlightitembagButton.visible = !highlightitembagButton.visible;
        });
        itembagButton.on('pointerout', () => {
            highlightitembagButton.visible = !highlightitembagButton.visible;
        });
        itembagButton.on('pointerdown', () => {
            this.scene.launch(SCENE_KEYS.ITEMBAG_SCENE);
            this.input.setDefaultCursor('default');
        });
        
        const zoominButton = this.add.image(1533, 20, HUD_ASSET_KEYS.ZOOMINBUTTON)
            .setOrigin(0)
            .setInteractive({ cursor: 'pointer' });
        zoominButton.on('pointerover', () => {
            highlightsideButton.setPosition(zoominButton.x, zoominButton.y);
            highlightsideButton.visible = !highlightsideButton.visible;
            displaySideButtonTextContainer(zoominButton.x, zoominButton.y, 'Zoom In', true);
        });
        zoominButton.on('pointerout', () => {
            highlightsideButton.visible = !highlightsideButton.visible;
            displaySideButtonTextContainer(zoominButton.x, zoominButton.y, 'Zoom In', false);
        });   
        zoominButton.on('pointerdown', () => {
            eventsManager.emit('zoom-in');
        });    

        const zoomoutButton = this.add.image(1532, 70, HUD_ASSET_KEYS.ZOOMOUTBUTTON)
            .setOrigin(0)
            .setInteractive({ cursor: 'pointer' });
        zoomoutButton.on('pointerover', () => {
            highlightsideButton.setPosition(zoomoutButton.x, zoomoutButton.y);
            highlightsideButton.visible = !highlightsideButton.visible;
            displaySideButtonTextContainer(zoomoutButton.x, zoomoutButton.y, 'Zoom Out', true);
        });        
        zoomoutButton.on('pointerout', () => {
            highlightsideButton.visible = !highlightsideButton.visible;
            displaySideButtonTextContainer(zoomoutButton.x, zoomoutButton.y, 'Zoom Out', false);
        });  
        zoomoutButton.on('pointerdown', () => {
            eventsManager.emit('zoom-out');
        });  

        const musicButton = this.add.image(1532, 120, HUD_ASSET_KEYS.MUSICBUTTON)
            .setOrigin(0)
            .setInteractive({ cursor: 'pointer' });
        musicButton.on('pointerover', () => {
            highlightsideButton.setPosition(musicButton.x, musicButton.y);
            highlightsideButton.visible = !highlightsideButton.visible;
            displaySideButtonTextContainer(musicButton.x, musicButton.y, 'Music', true);
        });    
        musicButton.on('pointerout', () => {
            highlightsideButton.visible = !highlightsideButton.visible; 
            displaySideButtonTextContainer(musicButton.x, musicButton.y, 'Music', false);
        });  
        musicButton.on('pointerdown', () => {
            var music = dataManager.store.get(DATA_MANAGER_STORE_KEYS.OPTIONS_MUSICSTATE);
            music = !music;
            dataManager.store.set(DATA_MANAGER_STORE_KEYS.OPTIONS_MUSICSTATE, music);
            eventsManager.emit('music-change');
            if (!music) {
                musicButton.setTexture(HUD_ASSET_KEYS.NOMUSICBUTTON);
            } else {
                musicButton.setTexture(HUD_ASSET_KEYS.MUSICBUTTON);
            }
        });  

        const soundButton = this.add.image(1532, 170, HUD_ASSET_KEYS.SOUNDBUTTON)
            .setOrigin(0)
            .setInteractive({ cursor: 'pointer' });
        soundButton.on('pointerover', () => {
            highlightsideButton.setPosition(soundButton.x, soundButton.y);
            highlightsideButton.visible = !highlightsideButton.visible;
            displaySideButtonTextContainer(soundButton.x, soundButton.y, 'Sound', true);
        });    
        soundButton.on('pointerout', () => {
            highlightsideButton.visible = !highlightsideButton.visible; 
            displaySideButtonTextContainer(soundButton.x, soundButton.y, 'Sound', false);
        });  
        soundButton.on('pointerdown', () => {
            var sound = dataManager.store.get(DATA_MANAGER_STORE_KEYS.OPTIONS_SOUNDSTATE);
            sound = !sound;
            eventsManager.emit('sound-change');
            dataManager.store.set(DATA_MANAGER_STORE_KEYS.OPTIONS_SOUNDSTATE, sound);
            if (!sound) {
                soundButton.setTexture(HUD_ASSET_KEYS.NOSOUNDBUTTON);
            } else {
                soundButton.setTexture(HUD_ASSET_KEYS.SOUNDBUTTON);
            }
        });  

        const aboutButton = this.add.image(1532, 220, HUD_ASSET_KEYS.ABOUTBUTTON)
            .setOrigin(0)
            .setInteractive({ cursor: '' });
        aboutButton.on('pointerover', () => {
            highlightsideButton.setPosition(aboutButton.x, aboutButton.y);
            highlightsideButton.visible = !highlightsideButton.visible;  
            displaySideButtonTextContainer(aboutButton.x, aboutButton.y, 'About', true);
        });    
        aboutButton.on('pointerout', () => {
            highlightsideButton.visible = !highlightsideButton.visible; 
            displaySideButtonTextContainer(aboutButton.x, aboutButton.y, 'About', false);
        });  
        aboutButton.on('pointerdown', () => {
            
        }); 

        const screenshotButton = this.add.image(1532,270,HUD_ASSET_KEYS.SCREENSHOTBUTTON)
            .setOrigin(0)
            .setInteractive({ cursor: 'pointer' });
        screenshotButton.on('pointerover', () => {
            highlightsideButton.setPosition(screenshotButton.x, screenshotButton.y);
            highlightsideButton.visible = !highlightsideButton.visible;
            displaySideButtonTextContainer(screenshotButton.x, screenshotButton.y, 'Screenshot', true);
        });    
        screenshotButton.on('pointerout', () => {
            highlightsideButton.visible = !highlightsideButton.visible;
            displaySideButtonTextContainer(screenshotButton.x, screenshotButton.y, 'Screenshot', false);
        });  
        screenshotButton.on('pointerdown', () => {
            
        }); 

        const settingsButton = this.add.image(1532,320,HUD_ASSET_KEYS.SETTINGSBUTTON)
            .setOrigin(0)
            .setInteractive({ cursor: 'pointer' });
        settingsButton.on('pointerover', () => {
            highlightsideButton.setPosition(settingsButton.x, settingsButton.y);
            highlightsideButton.visible = !highlightsideButton.visible;
            displaySideButtonTextContainer(settingsButton.x, settingsButton.y, 'Settings', true);
        });    
        settingsButton.on('pointerout', () => {
            highlightsideButton.visible = !highlightsideButton.visible; 
            displaySideButtonTextContainer(settingsButton.x, settingsButton.y, 'Settings', false); 
        });  
        settingsButton.on('pointerdown', () => {
            
        }); 

        const sideButtonText = this.add.text(0, 0,'', { 
            fontFamily: 'Helvetica',
            fontSize: '24px',
            color: '#002700',
        })
            .setOrigin(1)
            .setVisible(false); 
        const sideButtonBox = this.add.graphics();

        const highlightsideButton = this.add.image(0, 0, HUD_ASSET_KEYS.SIDEBUTTONHIGHLIGHT)
            .setOrigin(0)
            .setVisible(false);
        const highlightshopButton = this.add.image(0, 0, HUD_ASSET_KEYS.SHOPBUTTONHIGHLIGHT)
            .setOrigin(0)
            .setVisible(false);
        const highlightitembagButton = this.add.image(0, 0, HUD_ASSET_KEYS.ITEMBAGBUTTONHIGHLIGHT)
            .setOrigin(0)
            .setVisible(false);

        function displaySideButtonTextContainer(x, y, text, visible) {
            sideButtonText
                .setText(text)
                .setPosition(x+30, y+85)
                .setDepth(1)
                .setVisible(visible);
            sideButtonBox
                .clear()
                .fillStyle(0xBCFB20, 1)
                .fillRect(sideButtonText.getBounds().x-10, sideButtonText.getBounds().y-2, sideButtonText.getBounds().width+20, sideButtonText.getBounds().height+4)
                .lineStyle(2, 0x002700, 1)
                .strokeRect(sideButtonText.getBounds().x-10, sideButtonText.getBounds().y-2, sideButtonText.getBounds().width+20, sideButtonText.getBounds().height+4)
                .setVisible(visible);
            console.log(sideButtonText.text, sideButtonText.x, sideButtonText.y, sideButtonText.visible);
        };

        eventsManager.on('disable-buttons', function(bool) {
            if (bool) {
                for (let i = 0; i < resourceButtonGroup.length; i++) {
                    resourceButtonGroup[i].disableInteractive();
                }
                zoominButton.disableInteractive();
                zoomoutButton.disableInteractive();
                musicButton.disableInteractive();
                soundButton.disableInteractive();
                aboutButton.disableInteractive();
                screenshotButton.disableInteractive();
                settingsButton.disableInteractive();
                shopButton.disableInteractive();
            } else {
                for (let i = 0; i < resourceButtonGroup.length; i++) {
                    resourceButtonGroup[i].setInteractive();
                }
                zoominButton.setInteractive();
                zoomoutButton.setInteractive();
                musicButton.setInteractive();
                soundButton.setInteractive();
                aboutButton.setInteractive();
                screenshotButton.setInteractive();
                settingsButton.setInteractive();
                shopButton.setInteractive();
            }
        }, this)
    }
}