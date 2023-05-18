class GameScene extends Phaser.Scene {
    constructor() {
        super('Game');
    }
    create() {
        this.createBackground();
        this.cursors = this.input.keyboard.createCursorKeys();
        this.dragon = new Dragon(this, 150, config.height / 2, 'dragon', 'dragon1');
        this.enemy = new Enemy(this, config.width - 150, config.height / 2, 'enemy', 'enemy1');
    }

    update() {
        this.dragon.move();
        this.enemy.move();
        this.bg.tilePositionX += 0.5;
    }

    createBackground() {
        this.bg = this.add.tileSprite(0, 0, config.width, config.height, 'bg').setOrigin(0);
    }
}