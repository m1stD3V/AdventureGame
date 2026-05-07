class Ballroom extends AdventureScene {
    constructor() { super('ballroom'); }

    preload() {
        this.load.image('ballroom_bg', 'assets/visuals/ballroom.png');
        preloadUI(this);
    }

    create() {
        this.add.image(0, 0, 'ballroom_bg').setOrigin(0, 0).setDisplaySize(this.game.config.width, this.game.config.height);
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

        this.addInteractable(this.w * 0.52, this.h * 0.15, 'phonograph', () => this.showMessage(this.getInteractableText('phonograph', 'click')));
        this.addInteractable(this.w * 0.2, this.h * 0.3, 'mirror', () => this.showMessage(this.getInteractableText('mirror', 'click')));
        
        // I trigger a roll to investigate the floorboards.
        this.addRollTrigger(this.w * 0.6, this.h * 0.45, this.getInteractableText('floorboards', 'label'), 14, () => {
            this.showMessage(this.getInteractableText('floorboards', 'success'));
            this.gainItem('tarnished ring');
        });

        this.addInteractable(this.w * 0.1, this.h * 0.5, 'violin', () => this.showMessage(this.getInteractableText('violin', 'click')));
    }
}
