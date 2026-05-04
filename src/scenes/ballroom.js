class Ballroom extends AdventureScene {
    constructor() { super('ballroom', 'The Ballroom'); }

    preload() {
        this.load.image('ballroom_bg', 'assets/visuals/ballroom.png');
        preloadUI(this);
    }

    create() {
        this.add.image(0, 0, 'ballroom_bg').setOrigin(0, 0).setDisplaySize(this.game.config.width, this.game.config.height);
        super.create();
    }

    onEnter() {
        this.setDescription('A warped, dusty ballroom. You can almost hear the echoes of music.');

        this.add.image(this.w * 0.05, this.h * 0.88, 'return')
            .setScale(0.4)
            .setOrigin(0, 0)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.gotoScene('foyer'));

        const createInteractable = (x, y, text, msg, onDown) => {
            const t = this.add.text(x, y, text).setFontSize(this.s * 2);
            const b = t.getBounds();
            this.add.image(b.right + 20, b.centerY, 'question')
                .setScale(0.2)
                .setOrigin(0, 0.5)
                .setInteractive({ useHandCursor: true })
                .on('pointerover', () => this.showMessage(msg))
                .on('pointerdown', onDown);
        };

        createInteractable(this.w * 0.52, this.h * 0.15, '🎵 phonograph', 'It plays a waltz.', () => this.showMessage('Silence.'));
        createInteractable(this.w * 0.2, this.h * 0.3, '🪞 cracked mirror', 'You look tired.', () => this.showMessage('The reflection flickers.'));
        
        // INVESTIGATION ROLL
        this.addRollTrigger(this.w * 0.6, this.h * 0.45, 'Check floorboards', 14, () => {
            this.showMessage('You find a tarnished ring wedged between the boards!');
            this.gainItem('tarnished ring');
        });

        createInteractable(this.w * 0.1, this.h * 0.5, '🎻 broken violin', 'Its strings are snapped.', () => this.showMessage('A sad sight.'));
    }
}
