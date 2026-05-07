class Foyer extends AdventureScene {
    constructor() { super('foyer'); }

    preload() {
        this.load.image('foyer_bg', 'assets/visuals/foyer.png');
        preloadUI(this);
    }

    create() {
        this.add.image(0, 0, 'foyer_bg').setOrigin(0, 0).setDisplaySize(this.game.config.width, this.game.config.height);
        super.create();
    }

    onEnter() {
        this.setDescription(this.sceneData.description);

        this.addInteractable(this.w * 0.35, this.h * 0.08, 'chandelier', () => this.showMessage(this.getInteractableText('chandelier', 'click')));
        
        // I handle the exit logic for the main gate.
        this.addInteractable(this.w * 0.55, this.h * 0.35, 'gate', () => {
            if (this.hasItem('manor key')) {
                this.showMessage(this.getInteractableText('gate', 'success'));
                this.gotoScene('outro');
            } else {
                this.showMessage(this.getInteractableText('gate', 'fail'));
            }
        });

        // I set up the navigation buttons for other rooms.
        const passages = [
            { key: 'lib', scene: 'library', x: 0.1, y: 0.65 },
            { key: 'cel', scene: 'cellar', x: 0.3, y: 0.65 },
            { key: 'ball', scene: 'ballroom', x: 0.1, y: 0.82 },
            { key: 'stud', scene: 'study', x: 0.3, y: 0.82 }
        ];

        passages.forEach(p => {
            const label = this.sceneData.passages[p.scene];
            const img = this.add.image(this.w * p.x, this.h * p.y, p.key)
                .setScale(0.4)
                .setOrigin(0.5, 0.5)
                .setInteractive({ useHandCursor: true })
                .on('pointerdown', () => this.gotoScene(p.scene));
            
            this.add.text(this.w * p.x, this.h * p.y + 60, `➜ ${label}`)
                .setFontSize(this.s * 1.5)
                .setOrigin(0.5, 0);
        });
    }
}
