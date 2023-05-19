class GameScene extends Phaser.Scene {
    constructor() {
        super('Game');
    }
    create() {
        this.createBackground();
        this.cursors = this.input.keyboard.createCursorKeys();
        this.player = new Player(this);
        this.enemies = new Enemies(this);
        this.enemies.createTimer();
    }

    update() {
        this.player.move();
        this.bg.tilePositionX += 0.5;
    }

    createBackground() {
        this.bg = this.add.tileSprite(0, 0, config.width, config.height, 'bg').setOrigin(0);
    }
}