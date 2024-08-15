import Phaser from '../lib/phaser.js';
import PixelArtShader from '../assets/pipelines/pixelartshader.js';
import { SCENE_KEYS } from './scenekeys.js';
import { DATA_MANAGER_STORE_KEYS, dataManager } from '../common/datamanager.js';

import {
    SHOP_ASSET_KEYS,
    ITEMBAG_ASSET_KEYS,
  } from '../assets/assetkeys.js';
import eventsManager from '../common/eventsmanager.js';

export class ItembagScene extends Phaser.Scene {
    constructor() {
        super({
            key: SCENE_KEYS.ITEMBAG_SCENE,
        });
    }

    init() {
        eventsManager.emit('disable-buttons', true);
    }

    create() {
        this.add.image(96, 32, ITEMBAG_ASSET_KEYS.ITEMBAGBACKGROUND).setOrigin(0);

        this.inkbuttonGroup = this.add.container(0, 0);

        this.buildingsIcon = this.add.image(105, 110, ITEMBAG_ASSET_KEYS.BUILDINGSBUTTONDOWN)
            .setOrigin(0);
        this.buildingsButton = this.add.image(105, 110, ITEMBAG_ASSET_KEYS.ITEMBAGTAB)
            .setOrigin(0)
            .setInteractive({ cursor: 'pointer' });
        this.buildingsButton.disableInteractive();
        this.buildingsButton.on('pointerover', () => {
            this.buildingsIcon.setTexture(ITEMBAG_ASSET_KEYS.BUILDINGSBUTTONOVER);
        });
        this.buildingsButton.on('pointerout', () => {
            this.buildingsIcon.setTexture(ITEMBAG_ASSET_KEYS.BUILDINGSBUTTON);
        });
        this.buildingsButton.on('pointerdown', () => {
            this.buildingsIcon.setTexture(ITEMBAG_ASSET_KEYS.BUILDINGSBUTTONDOWN);
        });
        this.buildingsButton.on('pointerup', () => {
            this.updateIconsDepth(this.buildingsIcon, this.buildingsButton, ITEMBAG_ASSET_KEYS.BUILDINGSBUTTONSELECTED);
        });

        this.suppliesIcon = this.add.image(105, 162, ITEMBAG_ASSET_KEYS.SUPPLIESBUTTON)
            .setOrigin(0);
        this.suppliesButton = this.add.image(105, 162, ITEMBAG_ASSET_KEYS.ITEMBAGTAB)
            .setOrigin(0)
            .setInteractive({ cursor: 'pointer' });
        this.suppliesButton.on('pointerover', () => {
            this.suppliesIcon.setTexture(ITEMBAG_ASSET_KEYS.SUPPLIESBUTTONOVER);
        });
        this.suppliesButton.on('pointerout', () => {
            this.suppliesIcon.setTexture(ITEMBAG_ASSET_KEYS.SUPPLIESBUTTON);
        });
        this.suppliesButton.on('pointerdown', () => {
            this.suppliesIcon.setTexture(ITEMBAG_ASSET_KEYS.SUPPLIESBUTTONDOWN);
        });
        this.suppliesButton.on('pointerup', () => {
            this.updateIconsDepth(this.suppliesIcon, this.suppliesButton, ITEMBAG_ASSET_KEYS.SUPPLIESBUTTONSELECTED);
        });

        this.decorationsIcon = this.add.image(105, 214, ITEMBAG_ASSET_KEYS.DECORATIONSBUTTON)
            .setOrigin(0);
        this.decorationsButton = this.add.image(105, 214, ITEMBAG_ASSET_KEYS.ITEMBAGTAB)
            .setOrigin(0)
            .setInteractive({ cursor: 'pointer' });
        this.decorationsButton.on('pointerover', () => {
            this.decorationsIcon.setTexture(ITEMBAG_ASSET_KEYS.DECORATIONSBUTTONOVER);
        });
        this.decorationsButton.on('pointerout', () => {
            this.decorationsIcon.setTexture(ITEMBAG_ASSET_KEYS.DECORATIONSBUTTON);
        });
        this.decorationsButton.on('pointerdown', () => {
            this.decorationsIcon.setTexture(ITEMBAG_ASSET_KEYS.DECORATIONSBUTTONDOWN);
        });
        this.decorationsButton.on('pointerup', () => {
            this.updateIconsDepth(this.decorationsIcon, this.decorationsButton, ITEMBAG_ASSET_KEYS.DECORATIONSBUTTONSELECTED);
        });

        this.eggsIcon = this.add.image(105, 266, ITEMBAG_ASSET_KEYS.EGGSBUTTON)
            .setOrigin(0);
        this.eggsButton = this.add.image(105, 266, ITEMBAG_ASSET_KEYS.ITEMBAGTAB)
            .setOrigin(0)
            .setInteractive({ cursor: 'pointer' });
        this.eggsButton.on('pointerover', () => {
            this.eggsIcon.setTexture(ITEMBAG_ASSET_KEYS.EGGSBUTTONOVER);
        });
        this.eggsButton.on('pointerout', () => {
            this.eggsIcon.setTexture(ITEMBAG_ASSET_KEYS.EGGSBUTTON);
        });
        this.eggsButton.on('pointerdown', () => {
            this.eggsIcon.setTexture(ITEMBAG_ASSET_KEYS.EGGSBUTTONDOWN);
        });
        this.eggsButton.on('pointerup', () => {
            this.updateIconsDepth(this.eggsIcon, this.eggsButton, ITEMBAG_ASSET_KEYS.EGGSBUTTONSELECTED);
        });

        this.inkIcon = this.add.image(105, 318, ITEMBAG_ASSET_KEYS.INKBUTTON)
            .setOrigin(0);
        this.inkButton = this.add.image(105, 318, ITEMBAG_ASSET_KEYS.ITEMBAGTAB)
            .setOrigin(0)
            .setInteractive({ cursor: 'pointer' });
        this.inkButton.on('pointerover', () => {
            this.inkIcon.setTexture(ITEMBAG_ASSET_KEYS.INKBUTTONOVER);
        });
        this.inkButton.on('pointerout', () => {
            this.inkIcon.setTexture(ITEMBAG_ASSET_KEYS.INKBUTTON);
        });
        this.inkButton.on('pointerdown', () => {
            this.inkIcon.setTexture(ITEMBAG_ASSET_KEYS.INKBUTTONDOWN);
        });
        this.inkButton.on('pointerup', () => {
            this.updateIconsDepth(this.inkIcon, this.inkButton, ITEMBAG_ASSET_KEYS.INKBUTTONSELECTED);
        });

        this.inkbuttonGroup.add([this.buildingsIcon, this.suppliesIcon, this.decorationsIcon, this.eggsIcon, this.inkIcon]);
        this.inkbuttonGroup.setDepth(2);

        this.add.image(190, 62, ITEMBAG_ASSET_KEYS.ITEMBAGSCREEN)
            .setOrigin(0)
            .setDepth(3);

        this.add.text(250, 30, 'ITEM BAG', {
            fontFamily: 'Housearama-Kingpin',
            fontSize: '32px',
            color: '#f6ffde',
        })
            .setStroke('#6E9912', 11)
            .setShadow(0, 4, '#000000', 6)
            .setDepth(3);

        const itembagcloseButton = this.add.image(468, 32, SHOP_ASSET_KEYS.SHOPCLOSEBUTTON)
            .setOrigin(0)
            .setInteractive({ cursor: 'pointer' })
            .setDepth(3);
        itembagcloseButton.on('pointerover', () => {
            itembagcloseButton.setTexture(SHOP_ASSET_KEYS.SHOPCLOSEBUTTONOVER).setPosition(460, 24);
        });
        itembagcloseButton.on('pointerout', () => {
            itembagcloseButton.setTexture(SHOP_ASSET_KEYS.SHOPCLOSEBUTTON).setPosition(468, 32);
        });
        itembagcloseButton.on('pointerdown', () => {
            itembagcloseButton.setTexture(SHOP_ASSET_KEYS.SHOPCLOSEBUTTONDOWN).setPosition(468, 32);
        });
        itembagcloseButton.on('pointerup', () => {
            eventsManager.emit('disable-buttons', false);
            this.scene.stop(SCENE_KEYS.ITEMBAG_SCENE);
        });
    }

    updateIconsDepth(selectedIcon, selectedButton, selectedTexture) {
        const icons = [this.buildingsIcon, this.suppliesIcon, this.decorationsIcon, this.eggsIcon, this.inkIcon];
        const buttons = [this.buildingsButton, this.suppliesButton, this.decorationsButton, this.eggsButton, this.inkButton];
        
        // Remove all icons from the container
        icons.forEach(icon => this.inkbuttonGroup.remove(icon));

        // Set all icons to the same base depth
        icons.forEach(icon => icon.setDepth(0));
        this.buildingsIcon.setTexture(ITEMBAG_ASSET_KEYS.BUILDINGSBUTTON);
        this.suppliesIcon.setTexture(ITEMBAG_ASSET_KEYS.SUPPLIESBUTTON);
        this.decorationsIcon.setTexture(ITEMBAG_ASSET_KEYS.DECORATIONSBUTTON);
        this.eggsIcon.setTexture(ITEMBAG_ASSET_KEYS.EGGSBUTTON);
        this.inkIcon.setTexture(ITEMBAG_ASSET_KEYS.INKBUTTON);
        buttons.forEach(button => button.setInteractive());

        // Set the selected icon to a higher depth
        selectedIcon.setDepth(100);
        selectedIcon.setTexture(selectedTexture);
        selectedButton.disableInteractive();

        // Re-add icons to the container in the new order
        this.inkbuttonGroup.add(icons.sort((a, b) => a.depth - b.depth));

        this.input.setDefaultCursor('default');
    }
}