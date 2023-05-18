class StartScene extends Phaser.Scene {
    constructor() {
        super('Start');
    }

    create() {
        this.createBackground();
    }

    createBackground() {
        this.add.sprite(0, 0, 'bg').setOrigin(0);
    }
}