class Enemies extends Phaser.Physics.Arcade.Group {
    constructor(scene) {
        super();
        this.scene = scene;
        this.counter = 10;
    }

    createEnemy() {
        const enemy = Enemy.generate(this.scene);

        this.add(enemy);
        enemy.move();
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
        if (this.getLength() >= 10) {
            this.timer.paused = true;
        } else {
            this.createEnemy();
        }
    }
}