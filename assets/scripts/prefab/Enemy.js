class Enemy extends Hero {
    constructor(scene, x, y, sprite, atlas) {
        super(scene, x, y, sprite, atlas);
        this.scene = scene;
        this.init();
    }

    static generate(scene) {
        const x = config.width + 200;
        const y = Phaser.Math.Between(100, config.height - 100);
        const id = Phaser.Math.Between(1, 4);

        return new Enemy(scene, x, y, 'enemy', `enemy${id}`);
    }



    init() {
        super.init();
        this.velocity = -250;
    }

    move() {
        this.body.setVelocityX(this.velocity);
    }
}