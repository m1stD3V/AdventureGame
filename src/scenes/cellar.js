class Cellar extends AdventureScene {
    constructor() { super('cellar', 'The Cellar'); }

    preload() {
        this.load.image('cellar_bg', 'assets/visuals/cellar.png');
        preloadUI(this);
    }

    create() {
        this.add.image(0, 0, 'cellar_bg').setOrigin(0, 0).setDisplaySize(this.game.config.width, this.game.config.height);
        super.create();
    }

    onEnter() {
        this.setDescription('Cold, damp stone and the smell of ancient dust.');
        
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

        createInteractable(this.w * 0.08, this.h * 0.2, '🍷 wine rack', 'Rows of bottles.', () => this.gainItem('old wine'));
        
        // I handle the logic for finding the key in the crate.
        createInteractable(this.w * 0.4, this.h * 0.4, '📦 wooden crate', 'It is nailed shut.', () => {
            if (this.hasItem('manor key')) {
                this.showMessage('The crate is empty.');
            } else if (this.hasItem('crowbar')) {
                this.gainItem('manor key');
                this.showMessage('You pry it open and find the manor key!');
            } else {
                this.showMessage('It is nailed shut. I need a tool to pry it open.');
            }
        });

        // I trigger a roll to examine the loose stone for secrets.
        this.addRollTrigger(this.w * 0.1, this.h * 0.6, 'Examine loose stone', 15, () => {
            this.showMessage('You find a hidden compartment containing a silver coin!');
            this.gainItem('silver coin');
        });

        createInteractable(this.w * 0.5, this.h * 0.7, '🕸️ thick webs', 'Something is behind them.', () => this.showMessage('It looks like a small door.'));
    }
}
