class Unit extends Phaser.GameObjects.Sprite {
    constructor(scene, hero, unit) {
        super(scene, hero.x + hero.width / 2, hero.y, unit);
        this.scene = scene;
        this.init();
    }

    init() {
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.enable = true;
    }

    move() {
        this.body.setVelocityX(700);
    }
}