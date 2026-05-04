class Outro extends Phaser.Scene {
    constructor() { super('outro'); }

    preload() {
        this.load.image('outro_bg', 'assets/visuals/gate.png');
        this.load.audio('click', 'assets/sfx/click.mp3');
    }

    create() {
        const w = this.game.config.width;
        const h = this.game.config.height;
        const s = w * 0.01;

        this.add.image(0, 0, 'outro_bg').setOrigin(0, 0).setDisplaySize(w, h);

        this.cameras.main.setBackgroundColor('#111');
        this.cameras.main.fadeIn(1500, 0, 0, 0);

        this.add.text(w * 0.5, h * 0.3, '🕯️')
            .setFontSize(s * 8)
            .setOrigin(0.5);

        this.add.text(w * 0.5, h * 0.5, 'You leave Ashwood Manor behind.')
            .setFontSize(s * 3)
            .setOrigin(0.5)
            .setColor('#c8a96e')
            .setStroke('#000', 6);

        this.add.text(w * 0.5, h * 0.62, 'But something follows you out.')
            .setFontSize(s * 2)
            .setOrigin(0.5)
            .setColor('#fff')
            .setStroke('#000', 4);

        this.add.text(w * 0.5, h * 0.76, 'Click to return to the beginning.')
            .setFontSize(s * 1.8)
            .setOrigin(0.5)
            .setColor('#fff')
            .setStroke('#000', 4);

        this.input.on('pointerdown', () => {
            this.sound.play('click', { volume: 0.5 });
            this.cameras.main.fade(1000, 0, 0, 0);
            this.time.delayedCall(1000, () => this.scene.start('intro'));
        });
    }
}
