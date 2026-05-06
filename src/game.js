// I configure and start my adventure game.
const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    parent: "root",
    scene: [Intro, Foyer, Library, Cellar, Ballroom, Study, Outro],
    title: 'Ashwood Manor',
    backgroundColor: '#111'
});
