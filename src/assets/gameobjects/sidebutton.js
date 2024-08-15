import eventsManager from '../../common/eventsmanager.js';

import {
    HUD_ASSET_KEYS,
} from '../../assets/assetkeys.js';

export class SideButton extends Phaser.GameObjects.Container {
    constructor(scene, x, y, image, text) {
        super(scene);

        const button = this.scene.add.image(x, y, image)
            .setInteractive()
            .setOrigin(0);

        const sidebuttontext = this.scene.add.text(x, y, text, { 
            fontFamily: 'Helvetica',
            fontSize: '24px',
            color: '#002700',
        })
            .setOrigin(0)
            .setVisible(false); 

        button.on('pointerover', () => {
            sidebuttontext.visible = !sidebuttontext.visible;
        });    
        button.on('pointerout', () => {
            sidebuttontext.visible = !sidebuttontext.visible;
        });  

        eventsManager.on('disable-buttons', function(bool) {
            if (bool) {
                button.disableInteractive();
            } else {
                button.setInteractive();
            }
        })

        this.add([button, sidebuttontext]);
        this.scene.add.existing(this);
    }
}