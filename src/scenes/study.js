class Study extends AdventureScene {
    constructor() { super('study', 'The Study'); }

    preload() {
        this.load.image('study_bg', 'assets/visuals/study.png');
        preloadUI(this);
    }

    create() {
        this.add.image(0, 0, 'study_bg').setOrigin(0, 0).setDisplaySize(this.game.config.width, this.game.config.height);
        super.create();
    }

    onEnter() {
        this.setDescription('A cluttered study filled with half finished letters.');

        this.add.image(this.w * 0.05, this.h * 0.88, 'return')
            .setScale(0.4)
            .setOrigin(0, 0)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.gotoScene('foyer'));

        this.add.text(this.w * 0.05 + 140, this.h * 0.88 + 15, '⬅️ Return')
            .setFontSize(this.s * 1.5);

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

        // I handle the desk logic with a roll.
        this.addRollTrigger(this.w * 0.28, this.h * 0.2, 'Search the desk', 12, () => {
            if (this.hasItem('letter')) {
                this.showMessage('You have the letter.');
            } else {
                this.gainItem('letter');
                this.showMessage('You find a cryptic letter hidden in a secret compartment!');
            }
        });

        createInteractable(this.w * 0.1, this.h * 0.45, '🕯️ candle', 'Nearly spent.', () => this.showMessage('The flame is blue.'));
        
        // I add some extra interactable content to the study.
        createInteractable(this.w * 0.5, this.h * 0.5, '🗝️ small chest', 'It is locked.', () => this.showMessage('A tiny keyhole stares back.'));
    }
}
