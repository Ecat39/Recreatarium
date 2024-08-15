import { GAME_ASSET_KEYS } from "../assetkeys";

class Pinchit extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.body.setCollideWorldBounds(true);

        this.directions = ['up', 'down', 'left', 'right'];
        this.currentDirection = null;
        this.moveEvent = this.scene.time.addEvent({
            delay: 1000,
            callback: this.changeDirection,
            callbackScope: this,
            loop: true
        });

        this.initAnimations();
    }

    initAnimations() {
        this.scene.anims.create({
            key: 'walk_up',
            frames: this.scene.anims.generateFrameNumbers(GAME_ASSET_KEYS.PINCHITWALKRIGHT, { start: 8, end: 15 }),
            frameRate: 10,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'walk_down',
            frames: this.scene.anims.generateFrameNumbers(GAME_ASSET_KEYS.PINCHITWALKRIGHT, { start: 8, end: 15 }),
            frameRate: 10,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'walk_left',
            frames: this.scene.anims.generateFrameNumbers(GAME_ASSET_KEYS.PINCHITWALKRIGHT, { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'walk_right',
            frames: this.scene.anims.generateFrameNumbers(GAME_ASSET_KEYS.PINCHITWALKRIGHT, { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1
        });
    }

    changeDirection() {
        const newDirection = Phaser.Math.RND.pick(this.directions);
        if (this.currentDirection !== newDirection) {
            this.currentDirection = newDirection;
            this.play(`walk_${newDirection}`);
        }
    }

    update(time, delta) {
        switch (this.currentDirection) {
            case 'up':
                this.body.setVelocity(0, -50);
                break;
            case 'down':
                this.body.setVelocity(0, 50);
                break;
            case 'left':
                this.body.setVelocity(-50, 0);
                break;
            case 'right':
                this.body.setVelocity(50, 0);
                break;
            default:
                this.body.setVelocity(0, 0);
                break;
        }
    }
}
