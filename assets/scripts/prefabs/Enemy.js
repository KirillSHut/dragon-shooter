class Enemy extends MovableObject {
    static generateAttributes() {
        const x = config.width + 200;
        const y = Phaser.Math.Between(100, config.height - 100);
        const id = Phaser.Math.Between(1, 4);
        let lives = 1;
        switch (id) {
            case 1: break
            case 2: lives = 2; break
            case 3: lives = 3; break
            case 4: lives = 3; break
        }
        return { x, y, frame: `enemy${id}`, lives };
    }
    static generate(scene, fires) {
        const data = Enemy.generateAttributes();
        return new Enemy({
            scene,
            x: data.x,
            y: data.y,
            texture: 'enemy',
            frame: data.frame,
            fires,
            lives: data.lives,
            velocity: -250,
            bullet: {
                delay: 1000,
                texture: 'bullet',
                velocity: -500,
            },
            origin: { x: 0, y: 0.5 }
        });
    }

    init(data) {
        super.init(data);
        this.setOrigin(data.origin.x, data.origin.y);
        this.bullet = data.bullet;
        this.fires = this.fires || new Fires(this.scene);
        this.timer = this.scene.time.addEvent({
            delay: this.bullet.delay,
            loop: true,
            callback: this.fire,
            callbackScope: this
        });
    }

    fire() {
        this.fires.createFire(this);
    }

    reset() {
        const data = Enemy.generateAttributes();
        super.reset(data.x, data.y, data.lives);
        this.setFrame(data.frame);
    }
    isDead() {
        return this.x < -this.width;
    }
}