class GameScene extends Phaser.Scene {
    constructor() {
        super('Game');
    }

    init() {
        this.cursors = this.input.keyboard.createCursorKeys();
        this.score = 0;
    }

    create() {
        this.createBackground();
        if (!this.sounds) {
            this.createSounds();
        }
        this.player = new Player(this);
        this.enemies = new Enemies(this);
        this.enemies.createTimer();
        this.createCompleteEvents();
        this.addOverlap();
        this.createScoreText();
        this.createWaveText();
    }

    createSounds() {
        this.sounds = {
            boom: this.sound.add('boom', { volume: 0.1 }),
            theme: this.sound.add('theme', { volume: 0.2, loop: true }),
        }

        this.sounds.theme.play();
    }

    createCompleteEvents() {
        this.player.once('killed', this.onComplete, this);
        this.events.on('enemies-killed', this.onComplete, this);
    }

    createWaveText() {
        this.waveText = this.add.text(10, config.height - 50, "Wave: 1", {
            font: '40px CurseCasual',
            color: '#fff'
        });
    }

    createScoreText() {
        this.scoreText = this.add.text(10, 10, "Score: 0", {
            font: '40px CurseCasual',
            color: '#fff'
        });
    }

    onComplete() {
        this.scene.start('Start', {
            score: this.score,
            isCompleted: this.player.active
        })
    }

    addOverlap() {
        this.physics.add.overlap(this.player.fires, this.enemies, this.onOverlap, undefined, this);
        this.physics.add.overlap(this.enemies.fires, this.player, this.onOverlap, undefined, this);
        this.physics.add.overlap(this.player, this.enemies, this.onOverlap, undefined, this);
    }


    onOverlap(source, target) {
        if (source !== this.player && target !== this.player) {
            ++this.score;
            this.scoreText.setText(`Score: ${this.score}`);
        }

        if (target.texture.key === 'enemy') {
            this.sounds.boom.play();
            Boom.generate(this, target.x, target.y);
        }

        source.setAlive(false);
        target.setAlive(false);
    }

    update() {
        this.player.move();
        this.bg.tilePositionX += 0.5;
    }

    createBackground() {
        this.bg = this.add.tileSprite(0, 0, config.width, config.height, 'bg').setOrigin(0);
    }
}