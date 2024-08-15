import Phaser from '../lib/phaser.js';
import { SCENE_KEYS } from './scenekeys.js';
import { DATA_MANAGER_STORE_KEYS, dataManager } from '../common/datamanager.js';

import {
    SHOP_ASSET_KEYS,
  } from '../assets/assetkeys.js';

export class ShopScene extends Phaser.Scene {
    constructor() {
        super({
            key: SCENE_KEYS.SHOP_SCENE,
        });
    }

    create() {                
        this.add.image(0, 0, SHOP_ASSET_KEYS.SHOPBACKGROUND)
            .setOrigin(0)
            .setInteractive();

        this.add.text(380, 110, 'SHOP', { 
            fontFamily: 'Housearama-Kingpin',
            fontSize: '42px',
            color: '#f9feff',
            resolution: Phaser.Math.RoundTo(window.devicePixelRatio, 0) 
        })
        .setStroke('#6E9912', 16)
        .setShadow(0, 6, '#000000', 8);

        const resourceheadingstyle = {
            fontFamily: 'Helvetica',
            fontSize: '20px',
            color: '#373E27',
            textAlign: 'center',
            userSelect: 'none',
            webkitUserSelect: 'none',
            mozUserSelect: 'none',
            msUserSelect: 'none'
        }

        const resourceamountstyle = {
            fontFamily: 'Helvetica',
            fontSize: '16px',
            color: '#373E27',
            textAlign: 'center',
            userSelect: 'none',
            webkitUserSelect: 'none',
            mozUserSelect: 'none',
            msUserSelect: 'none'
        }

        const resourcePanel = this.add.container(1188, 200);
        const resourcepanelBackground = this.add.image(0, 0, SHOP_ASSET_KEYS.RESOURCEPANELBACKGROUND)
            .setOrigin(0);

        const resourceButtonTextGroup = {
            resourceBalance: this.add.text(20, 20, 'Resources', { 
                fontFamily: 'Helvetica',
                fontSize: '30px',
                color: '#373E27',
            })
            .setOrigin(0),

            woodResource: this.add.text(60, 70, dataManager.store.get(DATA_MANAGER_STORE_KEYS.WOOD), { 
                fontFamily: 'Helvetica',
                fontSize: '21px',
                color: '#373E27',
            })
            .setOrigin(0),
        
            mudResource: this.add.text(60, 102, dataManager.store.get(DATA_MANAGER_STORE_KEYS.MUD), { 
                fontFamily: 'Helvetica',
                fontSize: '21px',
                color: '#373E27',
            })
            .setOrigin(0),

            stoneResource: this.add.text(60, 136, dataManager.store.get(DATA_MANAGER_STORE_KEYS.STONE), { 
                fontFamily: 'Helvetica',
                fontSize: '21px',
                color: '#373E27',
            })
            .setOrigin(0),
        
            pollenResource: this.add.text(60, 182, dataManager.store.get(DATA_MANAGER_STORE_KEYS.POLLEN), { 
                fontFamily: 'Helvetica',
                fontSize: '21px',
                color: '#373E27',
            })
            .setOrigin(0),
        
            waterResource: this.add.text(60, 216, dataManager.store.get(DATA_MANAGER_STORE_KEYS.WATER), { 
                fontFamily: 'Helvetica',
                fontSize: '21px',
                color: '#373E27',
            })
            .setOrigin(0),
        
            grassResource: this.add.text(60, 248, dataManager.store.get(DATA_MANAGER_STORE_KEYS.GRASS), { 
                fontFamily: 'Helvetica',
                fontSize: '21px',
                color: '#373E27',
            })
            .setOrigin(0),

            gemBalance: this.add.text(20, 304, 'Gem Balance', { 
                fontFamily: 'Helvetica',
                fontSize: '30px',
                color: '#373E27',
            })
            .setOrigin(0),

            gemResource: this.add.text(60, 354, dataManager.store.get(DATA_MANAGER_STORE_KEYS.GEM), { 
                fontFamily: 'Helvetica',
                fontSize: '21px',
                color: '#373E27',
            })
            .setOrigin(0)
        };

        resourcePanel.add([resourcepanelBackground, ...Object.values(resourceButtonTextGroup)]);
        
        const resourcePanelMask = this.add.image(1188, 200, SHOP_ASSET_KEYS.RESOURCEPANELBACKGROUND)
            .setOrigin(0)
            .setVisible(false)
            .createBitmapMask();
        resourcePanel.setMask(resourcePanelMask);

        const resourcepanelButton = this.add.image(1393, 373, SHOP_ASSET_KEYS.RESOURCEPANELCLOSEBUTTON)
            .setOrigin(0)
            .setInteractive({ cursor: 'pointer' });
        var ispressed = true;
        resourcepanelButton.on('pointerover', () => {
            if (!ispressed) {
                resourcepanelButton.setTexture(SHOP_ASSET_KEYS.RESOURCEPANELOPENBUTTONOVER)
            } else {
                resourcepanelButton.setTexture(SHOP_ASSET_KEYS.RESOURCEPANELCLOSEBUTTONOVER)
            }
        });
        resourcepanelButton.on('pointerdown', () => {
            if (!ispressed) {
                var tween1 =this.tweens.add({
                    targets: resourcePanel,
                    x: 1188,
                    duration: 600,
                    repeat: 0,
                    ease: 'Quad.easeInOut'
                });
                this.tweens.add({
                    targets: resourcepanelButton,
                    x: 1393,
                    duration: 600,
                    repeat: 0,
                    ease: 'Quad.easeInOut'
                });
                tween1.on('complete', function(){
                    resourcepanelButton.setTexture(SHOP_ASSET_KEYS.RESOURCEPANELCLOSEBUTTON);
                }, this);
                ispressed = !ispressed;
            } else {
                var tween2 = this.tweens.add({
                    targets: resourcePanel,
                    x: 949,
                    duration: 600,
                    repeat: 0,
                    ease: 'Quad.easeInOut'
                });
                this.tweens.add({
                    targets: resourcepanelButton,
                    x: 1158,
                    duration: 600,
                    repeat: 0,
                    ease: 'Quad.easeInOut'
                });
                tween2.on('complete', function(){
                    resourcepanelButton.setTexture(SHOP_ASSET_KEYS.RESOURCEPANELOPENBUTTON);
                }, this);
                ispressed = !ispressed;
            }
        }); 

        this.add.image(1182, 373, SHOP_ASSET_KEYS.RESOURCEPANELBUTTONMASK)
            .setOrigin(0)

        const shopcloseButton = this.add.image(1150, 124, SHOP_ASSET_KEYS.SHOPCLOSEBUTTON)
            .setOrigin(0)
            .setInteractive({ cursor: 'pointer' });
        shopcloseButton.on('pointerover', () => {
            shopcloseButton.setTexture(SHOP_ASSET_KEYS.SHOPCLOSEBUTTONOVER).setPosition(1142, 116);
        });    
        shopcloseButton.on('pointerout', () => {
            shopcloseButton.setTexture(SHOP_ASSET_KEYS.SHOPCLOSEBUTTON).setPosition(1150, 124);
        });  
        shopcloseButton.on('pointerdown', () => {
            shopcloseButton.setTexture(SHOP_ASSET_KEYS.SHOPCLOSEBUTTONDOWN).setPosition(1150, 124);
        });  
        shopcloseButton.on('pointerup', () => {
            this.scene.stop(SCENE_KEYS.SHOP_SCENE);
        }); 

        this.buildingsIcon = this.add.image(213, 197, SHOP_ASSET_KEYS.BUILDINGSBUTTONDOWN)
            .setOrigin(0);
        this.buildingsButton = this.add.image(213, 197, SHOP_ASSET_KEYS.SHOPTAB)
            .setOrigin(0)
            .setInteractive({ cursor: 'pointer' });
        this.buildingsButton.disableInteractive();
        const buildingsButtonText = this.add.text(240, 255,'Buildings', { 
            fontFamily: 'Helvetica',
            fontSize: '21px',
            color: '#373E27',
        })
            .setOrigin(0)
            .setDepth(1);
        this.buildingsButton.on('pointerover', () => {
            this.buildingsIcon.setTexture(SHOP_ASSET_KEYS.BUILDINGSBUTTONOVER);
        });    
        this.buildingsButton.on('pointerout', () => {
            this.buildingsIcon.setTexture(SHOP_ASSET_KEYS.BUILDINGSBUTTON);
        });  
        this.buildingsButton.on('pointerdown', () => {
            this.buildingsIcon.setTexture(SHOP_ASSET_KEYS.BUILDINGSBUTTONDOWN);
            this.buildingsButton.disableInteractive();
            this.suppliesIcon.setTexture(SHOP_ASSET_KEYS.SUPPLIESBUTTON);
            this.suppliesButton.setInteractive();
            this.inkIcon.setTexture(SHOP_ASSET_KEYS.INKBUTTON);
            this.inkButton.setInteractive();
            this.decorationsIcon.setTexture(SHOP_ASSET_KEYS.DECORATIONSBUTTON);
            this.decorationsButton.setInteractive();
            this.input.setDefaultCursor('default');
        });  

        this.suppliesIcon = this.add.image(213, 280, SHOP_ASSET_KEYS.SUPPLIESBUTTON)
            .setOrigin(0);
        this.suppliesButton = this.add.image(213, 280, SHOP_ASSET_KEYS.SHOPTAB)
            .setOrigin(0)  
            .setInteractive({ cursor: 'pointer' });
        const suppliesButtonText = this.add.text(242, 340,'Supplies', { 
            fontFamily: 'Helvetica',
            fontSize: '21px',
            color: '#373E27',
        })
            .setOrigin(0)
            .setDepth(1);
        this.suppliesButton.on('pointerover', () => {
            this.suppliesIcon.setTexture(SHOP_ASSET_KEYS.SUPPLIESBUTTONOVER);
        });    
        this.suppliesButton.on('pointerout', () => {
            this.suppliesIcon.setTexture(SHOP_ASSET_KEYS.SUPPLIESBUTTON);
        });  
        this.suppliesButton.on('pointerdown', () => {
            this.suppliesIcon.setTexture(SHOP_ASSET_KEYS.SUPPLIESBUTTONDOWN);
            this.suppliesButton.disableInteractive();
            this.buildingsIcon.setTexture(SHOP_ASSET_KEYS.BUILDINGSBUTTON);
            this.buildingsButton.setInteractive();
            this.inkIcon.setTexture(SHOP_ASSET_KEYS.INKBUTTON);
            this.inkButton.setInteractive();
            this.decorationsIcon.setTexture(SHOP_ASSET_KEYS.DECORATIONSBUTTON);
            this.decorationsButton.setInteractive();
            this.input.setDefaultCursor('default');
        });  

        this.inkIcon = this.add.image(212, 367, SHOP_ASSET_KEYS.INKBUTTON)
            .setOrigin(0);
        this.inkButton = this.add.image(212, 367, SHOP_ASSET_KEYS.SHOPTAB)
            .setOrigin(0)
            .setInteractive({ cursor: 'pointer' });
        const inkButtonText = this.add.text(264, 425,'Ink', { 
            fontFamily: 'Helvetica',
            fontSize: '21px',
            color: '#373E27',
        })
            .setOrigin(0)
            .setDepth(1);
        this.inkButton.on('pointerover', () => {
            this.inkIcon.setTexture(SHOP_ASSET_KEYS.INKBUTTONOVER);
        });    
        this.inkButton.on('pointerout', () => {
            this.inkIcon.setTexture(SHOP_ASSET_KEYS.INKBUTTON);
        });  
        this.inkButton.on('pointerdown', () => {
            this.inkIcon.setTexture(SHOP_ASSET_KEYS.INKBUTTONDOWN);
            this.inkButton.disableInteractive();
            this.buildingsIcon.setTexture(SHOP_ASSET_KEYS.BUILDINGSBUTTON);
            this.buildingsButton.setInteractive();
            this.suppliesIcon.setTexture(SHOP_ASSET_KEYS.SUPPLIESBUTTON);
            this.suppliesButton.setInteractive();
            this.decorationsIcon.setTexture(SHOP_ASSET_KEYS.DECORATIONSBUTTON);
            this.decorationsButton.setInteractive();
            this.input.setDefaultCursor('default');
        });  

        this.decorationsIcon = this.add.image(212, 451, SHOP_ASSET_KEYS.DECORATIONSBUTTON)
            .setOrigin(0);
        this.decorationsButton = this.add.image(212, 451, SHOP_ASSET_KEYS.SHOPTAB)
            .setOrigin(0)
            .setInteractive({ cursor: 'pointer' });
        const decorationsButtonText = this.add.text(228, 510,'Decorations', { 
            fontFamily: 'Helvetica',
            fontSize: '21px',
            color: '#373E27',
        })
            .setOrigin(0)
            .setDepth(1);
        this.decorationsButton.on('pointerover', () => {
            this.decorationsIcon.setTexture(SHOP_ASSET_KEYS.DECORATIONSBUTTONOVER);
        });    
        this.decorationsButton.on('pointerout', () => {
            this.decorationsIcon.setTexture(SHOP_ASSET_KEYS.DECORATIONSBUTTON);
        });  
        this.decorationsButton.on('pointerdown', () => {
            this.decorationsIcon.setTexture(SHOP_ASSET_KEYS.DECORATIONSBUTTONDOWN);
            this.decorationsButton.disableInteractive();
            this.buildingsIcon.setTexture(SHOP_ASSET_KEYS.BUILDINGSBUTTON);
            this.buildingsButton.setInteractive();
            this.suppliesIcon.setTexture(SHOP_ASSET_KEYS.SUPPLIESBUTTON);
            this.suppliesButton.setInteractive();
            this.inkIcon.setTexture(SHOP_ASSET_KEYS.INKBUTTON);
            this.inkButton.setInteractive();
            this.input.setDefaultCursor('default');
        }); 
    }
}