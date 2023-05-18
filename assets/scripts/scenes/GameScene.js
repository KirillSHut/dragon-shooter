class GameScene extends Phaser.Scene {
    constructor() {
        super('Game');
    }
    create() {
        this.createBackground();
        this.cursors = this.input.keyboard.createCursorKeys();
        this.dragon = new Dragon(this);
    }

    update() {
        this.dragon.move();
    }

    createBackground() {
        this.add.sprite(0, 0, 'bg').setOrigin(0);
    }
}