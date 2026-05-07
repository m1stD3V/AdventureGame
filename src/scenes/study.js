class Study extends AdventureScene {
    constructor() { super('study'); }

    preload() {
        this.load.image('study_bg', 'assets/visuals/study.png');
        preloadUI(this);
    }

    create() {
        this.add.image(0, 0, 'study_bg').setOrigin(0, 0).setDisplaySize(this.game.config.width, this.game.config.height);
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

        // I handle the desk logic with a roll.
        this.addRollTrigger(this.w * 0.28, this.h * 0.2, this.getInteractableText('desk', 'label'), 12, () => {
            if (this.hasItem('letter')) {
                this.showMessage(this.getInteractableText('desk', 'alreadyFound'));
            } else {
                this.gainItem('letter');
                this.showMessage(this.getInteractableText('desk', 'success'));
            }
        });

        this.addInteractable(this.w * 0.1, this.h * 0.45, 'candle', () => this.showMessage(this.getInteractableText('candle', 'click')));
        
        // I add some extra interactable content to the study.
        this.addInteractable(this.w * 0.5, this.h * 0.5, 'chest', () => this.showMessage(this.getInteractableText('chest', 'click')));
    }
}
