class Cellar extends AdventureScene {
    constructor() { super('cellar'); }

    preload() {
        this.load.image('cellar_bg', 'assets/visuals/cellar.png');
        preloadUI(this);
    }

    create() {
        this.add.image(0, 0, 'cellar_bg').setOrigin(0, 0).setDisplaySize(this.game.config.width, this.game.config.height);
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

        this.addInteractable(this.w * 0.08, this.h * 0.2, 'wineRack', () => this.gainItem('old wine'));
        
        // I handle the logic for finding the key in the crate.
        this.addInteractable(this.w * 0.4, this.h * 0.4, 'crate', () => {
            if (this.hasItem('manor key')) {
                this.showMessage(this.getInteractableText('crate', 'empty'));
            } else if (this.hasItem('crowbar')) {
                this.gainItem('manor key');
                this.showMessage(this.getInteractableText('crate', 'success'));
            } else {
                this.showMessage(this.getInteractableText('crate', 'fail'));
            }
        });

        // I trigger a roll to examine the loose stone for secrets.
        this.addRollTrigger(this.w * 0.1, this.h * 0.6, this.getInteractableText('looseStone', 'label'), 15, () => {
            this.showMessage(this.getInteractableText('looseStone', 'success'));
            this.gainItem('silver coin');
        });

        this.addInteractable(this.w * 0.5, this.h * 0.7, 'webs', () => this.showMessage(this.getInteractableText('webs', 'click')));
    }
}
