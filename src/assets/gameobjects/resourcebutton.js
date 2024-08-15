import eventsManager from '../../common/eventsmanager.js';

import {
    HUD_ASSET_KEYS,
} from '../../assets/assetkeys.js';

export class ResourceButton extends Phaser.GameObjects.Container {
    constructor(scene, x, y, image, resource, amount) {
        super(scene);

        const button = this.scene.add.image(x, y, image)
            .setInteractive()
            .setOrigin(0);

        const displaybubble = this.scene.add.image(x-49, y-84, HUD_ASSET_KEYS.RESOURCEBUBBLE)
            .setOrigin(0)
            .setVisible(false); 

        const resourcetext = this.scene.add.text(x, y, resource, { 
            fontFamily: 'Helvetica',
            fontSize: '20px',
            color: '#ffffff',
        })
            .setOrigin(0)
            .setVisible(false); 

        const resourceamounttext = this.scene.add.text(x, y, amount, { 
            fontFamily: 'Helvetica',
            fontSize: '20px',
            color: '#ffffff',
        })
            .setOrigin(0)
            .setVisible(false);

        Phaser.Display.Align.In.Center(resourcetext, displaybubble, 0, -20);
        Phaser.Display.Align.In.Center(resourceamounttext, displaybubble);

        button.on('pointerover', () => {
            resourcetext.visible = !resourcetext.visible;
            resourceamounttext.visible = !resourceamounttext.visible;
            displaybubble.visible = !displaybubble.visible;
        });    
        button.on('pointerout', () => {
            resourcetext.visible = !resourcetext.visible;
            resourceamounttext.visible = !resourceamounttext.visible;
            displaybubble.visible = !displaybubble.visible;
        });  

        eventsManager.on('disable-buttons', function(bool) {
            if (bool) {
                button.disableInteractive();
            } else {
                button.setInteractive();
            }
        })

        this.add([button, displaybubble, resourcetext, resourceamounttext]);
        this.scene.add.existing(this);
    }
}