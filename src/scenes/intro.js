class Intro extends Phaser.Scene {
    constructor() { super('intro'); }

    preload() {
        this.load.image('intro_bg', 'assets/visuals/intro.png');
    }

    create() {
        const w = this.game.config.width;
        const h = this.game.config.height;
        const s = w * 0.01;

        this.add.image(0, 0, 'intro_bg').setOrigin(0, 0).setDisplaySize(w, h);

        this.cameras.main.setBackgroundColor('#111');
        this.cameras.main.fadeIn(1500, 0, 0, 0);

        this.input.on('pointerdown', () => {
            this.cameras.main.fade(1000, 0, 0, 0);
            this.time.delayedCall(1000, () => this.scene.start('foyer'));
        });
    }
}
