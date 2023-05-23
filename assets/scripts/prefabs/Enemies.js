class Enemies extends Phaser.Physics.Arcade.Group {
    constructor(scene) {
        super(scene.physics.world, scene);
        this.scene = scene;
        this.waveMax = 5;
        this.currentWave = 1;
        this.waves = {
            '1': {
                enemies: 1,
                delay: 2000
            },
            '2': {
                enemies: 2,
                delay: 1500
            },
            '3': {
                enemies: 2,
                delay: 1500
            },
            '4': {
                enemies: 2,
                delay: 1500
            },
            '5': {
                enemies: 2,
                delay: 1500
            },
        }
        this.counterKilled = 0;
        this.counterCreated = 0;
        this.fires = new Fires(scene);
    }

    checkKilled() {
        ++this.counterKilled;

        if (this.currentWave === 5) {
            if (this.counterKilled >= this.waves[this.waveMax].enemies) {
                console.log('enemies-killed');
                this.scene.events.emit('enemies-killed');
            }
        }
    }

    createEnemy() {
        let enemy = this.getFirstDead();

        if (!enemy) {
            enemy = Enemy.generate(this.scene, this.fires);
            enemy.on('killed', this.checkKilled, this);
            this.add(enemy);
        } else {
            enemy.reset();
        }

        enemy.move();
        ++this.counterCreated;
    }

    createTimer() {
        this.timer = this.scene.time.addEvent({
            delay: this.waves[this.currentWave].delay,
            callback: this.onTimerTick,
            callbackScope: this,
            loop: true
        })
    }

    onTimerTick() {
        if (this.counterKilled >= this.waves[this.currentWave].enemies) {
            this.timer.remove();
            this.nextWave();
        } else {
            if (this.counterCreated === this.waves[this.currentWave].enemies) {
                return false
            } else {
                this.createEnemy();
            }
        }
    }

    nextWave() {
        console.log('next wave');
        this.counterKilled = 0;
        this.counterCreated = 0;
        ++this.currentWave;
        this.scene.waveText.setText(`Wave: ${this.currentWave}`);
        this.createTimer();
    }
}