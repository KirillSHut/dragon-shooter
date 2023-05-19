class Enemy extends Hero {
    constructor(scene, x, y, sprite, atlas) {
        super(scene, x, y, sprite, atlas);
        this.scene = scene;
        this.init();
    }

    static getPositionData() {
        const x = config.width + 200;
        const y = Phaser.Math.Between(100, config.height - 100);
        const id = Phaser.Math.Between(1, 4);

        return { x, y, id }
    }

    static generate(scene) {
        const { x, y, id } = Enemy.getPositionData();

        return new Enemy(scene, x, y, 'enemy', `enemy${id}`);
    }

    reset() {
        const { x, y, id } = Enemy.getPositionData();

        this.x = x;
        this.y = y;
        this.setFrame(`enemy${id}`);
        this.setAlive(true)
    }

    init() {
        super.init();
        this.velocity = -1000;
        this.scene.events.on('update', this.checkPosition, this);
    }

    checkPosition() {
        if (this.active && this.x < -this.width) {
            this.setAlive(false)
        }
    }

    setAlive(status) {
        this.body.enable = status;
        this.setVisible(status);
        this.setActive(status);
    }

    move() {
        this.body.setVelocityX(this.velocity);
    }
}