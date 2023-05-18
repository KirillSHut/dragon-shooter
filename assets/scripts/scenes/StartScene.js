class StartScene extends Phaser.Scene {
    constructor() {
        super('Start');
    }

    create() {
        this.createBackground();
        this.createStartText();
        this.onStart();
    }

    createBackground() {
        this.add.sprite(0, 0, 'bg').setOrigin(0);
    }

    createStartText() {
        this.add.text(this.sys.game.config.width / 2, 500, "Tap to start", {
            font: '40px CurseCasual',
        }).setOrigin(0.5);
    }

    onStart() {
        this.input.on('pointerdown', () => {
            this.scene.start('Game');
        })
    }
}