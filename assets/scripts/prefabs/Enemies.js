class Enemies extends Phaser.Physics.Arcade.Group {
    constructor(scene) {
        super();
        this.scene = scene;
        this.counterMax = 10;
        this.counterCurrent = 0;
        this.fires = new Fires(scene);
    }

    createEnemy() {
        let enemy = this.getFirstDead();

        if (!enemy) {
            enemy = Enemy.generate(this.scene, this.fires);
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