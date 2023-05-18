class PreloadScene extends Phaser.Scene {
    constructor() {
        super('Preload');
    }
    preload() {
        console.log('Preload.preload');
    }
    create() {
        console.log('Preload.create');
        this.scene.start('Start')
    }

}