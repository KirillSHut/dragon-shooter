class Enemies extends Phaser.Physics.Arcade.Group {
    constructor(scene) {
        super(scene.physics.world, scene);
        this.scene = scene;
        this.waveMax = 5;
        this.currentWave = 1;
        this.waves = {
            '1': {
                enemies: 2,
                delay: 2000
            },
            '2': {
                enemies: 3,
                delay: 1500
            },
            '3': {
                enemies: 16,
                delay: 1500
            },
            '4': {
                enemies: 17,
                delay: 1500
            },
            '5': {
                enemies: 18,
                delay: 1500
            },
        }
        this.counterMax = this.getTotalEnemies();
        this.counterKilled = 0;
        this.counterCurrent = 0;
        this.fires = new Fires(scene);
    }

    getTotalEnemies() {
        let counterMax = 0;
        for (let wave in this.waves) {
            counterMax += this.waves[wave].enemies;
        }

        return counterMax;
    }

    checkKilled() {
        ++this.counterKilled;

        if (this.currentWave === 5) {
            if (this.counterKilled >= this.waves['5'].enemies) {
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
        ++this.counterCurrent;
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
            console.log('newWave');
            this.timer.remove();
            this.nextWave();
        } else {
            this.createEnemy();
        }
    }

    nextWave() {
        this.counterCurrent = 0;
        ++this.currentWave;
        this.scene.waveText.setText(`Wave: ${this.currentWave}`);
        this.createTimer();
    }
}