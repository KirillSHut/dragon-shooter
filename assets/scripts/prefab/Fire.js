class Fire extends Unit {
    constructor(scene, hero) {
        super(scene, hero, 'fire');
    }

    static generate(scene, hero) {
        return new Fire(scene, hero);
    }
}
