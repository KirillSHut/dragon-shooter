class Enemies extends Phaser.Physics.Arcade.Group {
    constructor(scene) {
        super(scene.physics.world, scene);
        this.scene = scene;
        this.counterMax = 2;
        this.counterCurrent = 0;
        this.counterKilled = 0;
        this.fires = new Fires(scene);
    }

    checkKilled() {
        ++this.counterKilled;

        if (this.counterKilled >= this.counterMax) {
            console.log('enemies-killed');
            this.scene.events.emit('enemies-killed');
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
            delay: 1000,
            callback: this.onTimerTick,
            callbackScope: this,
            loop: true
        })
    }

    onTimerTick() {
        if (this.counterCurrent >= this.counterMax) {
            this.timer.paused = true;
        } else {
            this.createEnemy();
        }
    }
}