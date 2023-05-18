class Enemy extends Hero {
    constructor(scene, x, y, sprite, atlas) {
        super(scene, x, y, sprite, atlas);
        this.scene = scene;
        this.init();
    }

    init() {
        super.init();
        this.velocity = -250;
    }

    move() {
        this.body.setVelocityX(this.velocity);
    }
}