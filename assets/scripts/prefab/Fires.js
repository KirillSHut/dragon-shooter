class Fires extends Phaser.Physics.Arcade.Group {
    constructor(scene) {
        super();
        this.scene = scene;
    }

    createFire(hero) {
        let fire = Fire.generate(this.scene, hero);
        this.add(fire);
        fire.move();
    }
}