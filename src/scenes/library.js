class Library extends AdventureScene {
    constructor() { super('library', 'The Library'); }

    preload() {
        this.load.image('library_bg', 'assets/visuals/library.png');
        preloadUI(this);
    }

    create() {
        this.add.image(0, 0, 'library_bg').setOrigin(0, 0).setDisplaySize(this.game.config.width, this.game.config.height);
        super.create();
    }

    onEnter() {
        this.setDescription('Floor-to-ceiling shelves filled with forgotten knowledge.');
        
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

        createInteractable(this.w * 0.08, this.h * 0.15, '📚 bookshelf', 'Hundreds of volumes.', () => this.showMessage('One book falls open to a page about "Manor Secrets".'));
        
        // CROWBAR LOGIC with Roll
        this.addRollTrigger(this.w * 0.45, this.h * 0.25, 'Investigate dusty corner', 10, () => {
            if (this.hasItem('crowbar')) {
                this.showMessage('You already found everything here.');
            } else {
                this.gainItem('crowbar');
                this.showMessage('Success! You uncover a heavy crowbar under the floorboards.');
            }
        });

        // Extra content
        createInteractable(this.w * 0.1, this.h * 0.4, '🪜 ladder', 'An old sliding ladder.', () => this.showMessage('It creaks ominously.'));
    }
}
