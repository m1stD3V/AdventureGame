class Library extends AdventureScene {
    constructor() { super('library'); }

    preload() {
        this.load.image('library_bg', 'assets/visuals/library.png');
        preloadUI(this);
    }

    create() {
        this.add.image(0, 0, 'library_bg').setOrigin(0, 0).setDisplaySize(this.game.config.width, this.game.config.height);
        super.create();
    }

    onEnter() {
        this.setDescription(this.sceneData.description);
        
        this.add.image(this.w * 0.05, this.h * 0.88, 'return')
            .setScale(0.4)
            .setOrigin(0, 0)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.gotoScene('foyer'));

        this.add.text(this.w * 0.05 + 140, this.h * 0.88 + 15, this.getCommonText('return'))
            .setFontSize(this.s * 1.5);

        this.addInteractable(this.w * 0.08, this.h * 0.15, 'bookshelf', () => this.showMessage(this.getInteractableText('bookshelf', 'click')));
        
        // I handle the crowbar logic with a roll.
        this.addRollTrigger(this.w * 0.45, this.h * 0.25, this.getInteractableText('dustyCorner', 'label'), 10, () => {
            if (this.hasItem('crowbar')) {
                this.showMessage(this.getInteractableText('dustyCorner', 'alreadyFound'));
            } else {
                this.gainItem('crowbar');
                this.showMessage(this.getInteractableText('dustyCorner', 'success'));
            }
        });

        // I add some extra interactable content to the library.
        this.addInteractable(this.w * 0.1, this.h * 0.4, 'ladder', () => this.showMessage(this.getInteractableText('ladder', 'click')));
    }
}
