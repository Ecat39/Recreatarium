export class LoginButton extends Phaser.GameObjects.Container {
    constructor(scene, x, y, image, text, fontsize, fontcolor, strokecolor, strokewidth, originx, originy, targetscene) {
        super(scene);
  
        const button = this.scene.add.image(x, y, image)
            .setInteractive();
        const buttonText = this.scene.add.text(x, y, text, { 
            fontFamily: 'Housearama-Kingpin',
            fontSize: fontsize,
            color: fontcolor 
        })
        .setOrigin(originx, originy);

        buttonText.setStroke(strokecolor, strokewidth);
        
        this.add(button);
        this.add(buttonText);

        button.on('pointerover', () => {
            button.setTint(0xF2F2F2);
        });    
        button.on('pointerout', () => {
            button.setTint(0xffffff);
        });   
        button.on('pointerdown', () => {
            button.setTint(0xBFBFBF);
        });    
        button.on('pointerup', () => {
            button.setTint(0xffffff);
            if (targetscene != 0) {
                setTimeout(() => {
                  this.scene.scene.launch(targetscene).stop(scene);
                }, 300);
              }
        });
        this.scene.add.existing(this);
    }
}