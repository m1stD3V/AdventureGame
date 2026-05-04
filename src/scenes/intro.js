// I manage the intro scene where I load assets and start the background music.
class Intro extends Phaser.Scene {
    constructor() { super('intro'); }

    init(data) {
        this.inventory = data?.inventory || [];
    }

    preload() {
        this.load.image('intro_bg', 'assets/visuals/intro.png');
        this.load.audio('bg_music', 'assets/sfx/bg.mp3');
        this.load.audio('click', 'assets/sfx/click.mp3');

        let loadingText = this.add.text(this.game.config.width / 2, this.game.config.height / 2, 'Loading...', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);
        this.load.on('progress', (value) => {
            loadingText.setText('Loading: ' + Math.floor(value * 100) + '%');
        });
        this.load.on('complete', () => {
            loadingText.destroy();
        });
    }

    create() {
        console.log("Intro scene create. Audio context state:", this.sound.context.state);
        console.log("Audio keys loaded:", this.cache.audio.getKeys());

        if (!this.sound.get('bg_music')) {
            const bgMusic = this.sound.add('bg_music', { volume: 0.1, loop: true });
            
            bgMusic.play();
            console.log("Background music added and play() called.");
        }

        const w = this.game.config.width;
        const h = this.game.config.height;
        const s = w * 0.01;

        this.add.image(0, 0, 'intro_bg').setOrigin(0, 0).setDisplaySize(w, h);

        this.cameras.main.setBackgroundColor('#111');
        this.cameras.main.fadeIn(1500, 0, 0, 0);

        this.input.on('pointerdown', () => {
            if (this.sound.context.state === 'suspended') {
                this.sound.context.resume().then(() => {
                    console.log("Audio context resumed.");
                    if (!this.sound.get('bg_music').isPlaying) {
                        this.sound.get('bg_music').play();
                    }
                });
            }
            this.sound.play('click', { volume: 0.5 });
            this.cameras.main.fade(1000, 0, 0, 0);
            this.time.delayedCall(1000, () => this.scene.start('foyer', { inventory: this.inventory }));
        });
    }
}
