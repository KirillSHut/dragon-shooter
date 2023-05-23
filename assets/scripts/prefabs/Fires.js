class Fires extends Phaser.Physics.Arcade.Group {
    constructor(scene) {
        super(scene.physics.world, scene);
        this.scene = scene;
    }

    createFire(hero) {
        let fire = this.getFirstDead();

        if (!fire) {
            fire = Fire.generate(this.scene, hero);
            this.add(fire);
        } else {
            fire.reset(hero.x, hero.y);
        }

        fire.move();
    }
}