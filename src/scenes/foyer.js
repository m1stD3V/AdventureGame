class Foyer extends AdventureScene {
    constructor() { super('foyer', 'The Foyer'); }

    preload() {
        this.load.image('foyer_bg', 'assets/visuals/foyer.png');
        preloadUI(this);
    }

    create() {
        this.add.image(0, 0, 'foyer_bg').setOrigin(0, 0).setDisplaySize(this.game.config.width, this.game.config.height);
        super.create();
    }

    onEnter() {
        this.setDescription('A grand entrance hall.');

        // I use this helper to place icons perfectly next to text.
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

        createInteractable(this.w * 0.35, this.h * 0.08, '🕯️ chandelier', 'A rusted chandelier.', () => this.showMessage('It sways.'));
        
        // I handle the exit logic for the main gate.
        createInteractable(this.w * 0.55, this.h * 0.35, '🚪 main gate', 'The way out. It is locked tight.', () => {
            if (this.hasItem('manor key')) {
                this.showMessage('The key turns smoothly in the lock...');
                this.gotoScene('outro');
            } else {
                this.showMessage('I need a key to unlock this gate.');
            }
        });

        // I set up the navigation buttons for other rooms.
        const passages = [
            { key: 'lib', label: 'Library', scene: 'library', x: 0.1, y: 0.65 },
            { key: 'cel', label: 'Cellar', scene: 'cellar', x: 0.3, y: 0.65 },
            { key: 'ball', label: 'Ballroom', scene: 'ballroom', x: 0.1, y: 0.82 },
            { key: 'stud', label: 'Study', scene: 'study', x: 0.3, y: 0.82 }
        ];

        passages.forEach(p => {
            const img = this.add.image(this.w * p.x, this.h * p.y, p.key)
                .setScale(0.4)
                .setOrigin(0.5, 0.5)
                .setInteractive({ useHandCursor: true })
                .on('pointerdown', () => this.gotoScene(p.scene));
            
            this.add.text(this.w * p.x, this.h * p.y + 60, p.label)
                .setFontSize(this.s * 1.5)
                .setOrigin(0.5, 0);
        });
    }
}
