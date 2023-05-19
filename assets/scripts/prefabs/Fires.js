class Fires extends Phaser.Physics.Arcade.Group {
    constructor(scene) {
        super();
        this.scene = scene;
    }

    createFire(hero) {
        let fire = this.getFirstDead();

        if (!fire) {
            console.log('created');
            fire = Fire.generate(this.scene, hero);
            this.add(fire);
        } else {
            console.log('recreated');
            fire.reset(hero.x, hero.y);
        }

        fire.move();
    }
}