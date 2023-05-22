class Boom extends Phaser.GameObjects.Sprite {

    static generate(scene, x, y) {
        return new Boom({ scene, x, y })
    }

    constructor(data) {
        super(data.scene, data.x, data.y, 'boom', 'boom1')


        const frames = this.scene.anims.generateFrameNames('boom', {
            prefix: 'boom',
            start: 1,
            end: 4
        })

        this.scene.anims.create({
            key: 'boom',
            frames,
            frameRate: 10
        })

        this.play('boom');
        this.once('animationcomplete', () => {
            this.destroy();
        });
    }
}
