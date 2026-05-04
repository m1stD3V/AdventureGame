// ─────────────────────────────────────────────────────────────────────────────
// NON-ADVENTURE SCENES
// ─────────────────────────────────────────────────────────────────────────────

class Intro extends Phaser.Scene {
    constructor() { super('intro'); }

    create() {
        const w = this.game.config.width;
        const h = this.game.config.height;
        const s = w * 0.01;

        this.cameras.main.setBackgroundColor('#111');
        this.cameras.main.fadeIn(1500, 0, 0, 0);

        // Manor title
        this.add.text(w * 0.5, h * 0.28, '🕯️  Ashwood Manor  🕯️')
            .setFontSize(s * 5)
            .setOrigin(0.5)
            .setColor('#c8a96e');

        // Subtitle
        this.add.text(w * 0.5, h * 0.42, 'Something stirs within the old walls.')
            .setFontSize(s * 2.2)
            .setOrigin(0.5)
            .setColor('#888');

        // Decorative divider
        this.add.text(w * 0.5, h * 0.54, '— ✦ —')
            .setFontSize(s * 2)
            .setOrigin(0.5)
            .setColor('#444');

        // Prompt
        const prompt = this.add.text(w * 0.5, h * 0.68, 'Click anywhere to enter.')
            .setFontSize(s * 2)
            .setOrigin(0.5)
            .setColor('#666');

        // Pulse the prompt
        this.tweens.add({
            targets: prompt,
            alpha: { from: 1, to: 0.2 },
            yoyo: true,
            repeat: -1,
            duration: 1200,
            ease: 'Sine.inOut'
        });

        this.input.on('pointerdown', () => {
            this.cameras.main.fade(1000, 0, 0, 0);
            this.time.delayedCall(1000, () => this.scene.start('foyer'));
        });
    }
}

class Outro extends Phaser.Scene {
    constructor() { super('outro'); }

    create() {
        const w = this.game.config.width;
        const h = this.game.config.height;
        const s = w * 0.01;

        this.cameras.main.setBackgroundColor('#111');
        this.cameras.main.fadeIn(1500, 0, 0, 0);

        this.add.text(w * 0.5, h * 0.3, '🕯️')
            .setFontSize(s * 8)
            .setOrigin(0.5);

        this.add.text(w * 0.5, h * 0.5, 'You leave Ashwood Manor behind.')
            .setFontSize(s * 3)
            .setOrigin(0.5)
            .setColor('#c8a96e');

        this.add.text(w * 0.5, h * 0.62, 'But something follows you out.')
            .setFontSize(s * 2)
            .setOrigin(0.5)
            .setColor('#666');

        this.add.text(w * 0.5, h * 0.76, 'Click to return to the beginning.')
            .setFontSize(s * 1.8)
            .setOrigin(0.5)
            .setColor('#555');

        this.input.on('pointerdown', () => {
            this.cameras.main.fade(1000, 0, 0, 0);
            this.time.delayedCall(1000, () => this.scene.start('intro'));
        });
    }
}


// ─────────────────────────────────────────────────────────────────────────────
// ADVENTURE SCENES  (hub-and-spoke: Foyer connects to all four rooms)
// ─────────────────────────────────────────────────────────────────────────────

// ── FOYER ────────────────────────────────────────────────────────────────────
class Foyer extends AdventureScene {
    constructor() { super('foyer', 'The Foyer'); }

    onEnter() {
        this.setDescription(
            'A grand entrance hall choked with dust. Four passages lead deeper into the manor. The front door behind you is locked — as if it never intended to let you leave.'
        );

        // ── Object: chandelier (centre, high up) ──────────────────────────
        // ASSET PLACEHOLDER: replace with this.add.image() when sprite is ready
        this.add.text(this.w * 0.35, this.h * 0.08, '🕯️ chandelier')
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => this.showMessage('A rusted chandelier. Half its candles are spent.'))
            .on('pointerdown', () => this.showMessage('It sways, though there is no breeze.'));

        // ── Object: cracked mirror ─────────────────────────────────────────
        // ASSET PLACEHOLDER: replace with this.add.image() when sprite is ready
        const mirror = this.add.text(this.w * 0.12, this.h * 0.35, '🪞 cracked mirror')
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => this.showMessage('Shards of your reflection stare back.'))
            .on('pointerdown', () => {
                this.showMessage('Something moves in it that isn\'t you.');
                this.tweens.add({
                    targets: mirror,
                    angle: { from: -3, to: 3 },
                    yoyo: true,
                    repeat: 2,
                    duration: 80,
                    ease: 'Sine.inOut',
                    onComplete: () => mirror.setAngle(0)
                });
            });

        // ── Object: locked front door ──────────────────────────────────────
        // ASSET PLACEHOLDER: replace with this.add.image() when sprite is ready
        this.add.text(this.w * 0.05, this.h * 0.55, '🚪 front door')
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => this.showMessage('The way out. Locked from this side too.'))
            .on('pointerdown', () => {
                if (this.hasItem('front door key')) {
                    this.loseItem('front door key');
                    this.showMessage('The lock clicks. Cold night air rushes in.');
                    this.time.delayedCall(1500, () => this.gotoScene('outro'));
                } else {
                    this.showMessage('Sealed shut. You\'ll need a key.');
                }
            });

        // ── Object: umbrella stand ─────────────────────────────────────────
        // ASSET PLACEHOLDER: replace with this.add.image() when sprite is ready
        this.add.text(this.w * 0.55, this.h * 0.58, '🌂 umbrella stand')
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => this.showMessage('An old stand. Something metallic gleams inside.'))
            .on('pointerdown', () => {
                if (!this.hasItem('iron key')) {
                    this.showMessage('You fish out a tarnished iron key.');
                    this.gainItem('iron key');
                } else {
                    this.showMessage('Just umbrellas now. Bone dry.');
                }
            });

        // ── Passage doors ──────────────────────────────────────────────────

        // ASSET PLACEHOLDER: replace with this.add.image() when sprite is ready
        this.add.text(this.w * 0.22, this.h * 0.72, '📖 → Library')
            .setFontSize(this.s * 2.2)
            .setColor('#c8a96e')
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => this.showMessage('A heavy oak door. The scent of old paper seeps through.'))
            .on('pointerdown', () => this.gotoScene('library'));

        // ASSET PLACEHOLDER: replace with this.add.image() when sprite is ready
        this.add.text(this.w * 0.38, this.h * 0.72, '🪓 → Cellar')
            .setFontSize(this.s * 2.2)
            .setColor('#c8a96e')
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => this.showMessage('A trap door in the floor. Cold air rises from below.'))
            .on('pointerdown', () => this.gotoScene('cellar'));

        // ASSET PLACEHOLDER: replace with this.add.image() when sprite is ready
        this.add.text(this.w * 0.22, this.h * 0.84, '🎻 → Ballroom')
            .setFontSize(this.s * 2.2)
            .setColor('#c8a96e')
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => this.showMessage('Wide double doors. Faint music, then silence.'))
            .on('pointerdown', () => this.gotoScene('ballroom'));

        // ASSET PLACEHOLDER: replace with this.add.image() when sprite is ready
        this.add.text(this.w * 0.38, this.h * 0.84, '🖋️ → Study')
            .setFontSize(this.s * 2.2)
            .setColor('#c8a96e')
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => this.showMessage('A narrow door, slightly ajar. Candlelight flickers beyond.'))
            .on('pointerdown', () => this.gotoScene('study'));
    }
}


// ── LIBRARY ───────────────────────────────────────────────────────────────────
class Library extends AdventureScene {
    constructor() { super('library', 'The Library'); }

    onEnter() {
        this.setDescription(
            'Floor-to-ceiling shelves, their books rotting in place. A reading chair faces an empty hearth. The smell of mildew and something burnt.'
        );

        // ── Object: bookshelf ──────────────────────────────────────────────
        // ASSET PLACEHOLDER: replace with this.add.image() when sprite is ready
        const shelf = this.add.text(this.w * 0.08, this.h * 0.15, '📚 bookshelf')
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => this.showMessage('Hundreds of volumes, most too damp to open.'))
            .on('pointerdown', () => {
                this.showMessage('One book falls open: "BENEATH THE FLAGSTONE."');
                this.tweens.add({
                    targets: shelf,
                    x: '+=' + this.s * 0.5,
                    yoyo: true,
                    repeat: 1,
                    duration: 80
                });
            });

        // ── Object: candelabra ─────────────────────────────────────────────
        // ASSET PLACEHOLDER: replace with this.add.image() when sprite is ready
        this.add.text(this.w * 0.48, this.h * 0.12, '🕯️ candelabra')
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => this.showMessage('Three candles, still warm.'))
            .on('pointerdown', () => {
                if (!this.hasItem('lit candle')) {
                    this.showMessage('You take one. The flame holds.');
                    this.gainItem('lit candle');
                } else {
                    this.showMessage('You already carry a flame.');
                }
            });

        // ── Object: reading chair ──────────────────────────────────────────
        // ASSET PLACEHOLDER: replace with this.add.image() when sprite is ready
        this.add.text(this.w * 0.28, this.h * 0.45, '🪑 reading chair')
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => this.showMessage('The leather is cracked and sunken — well-used.'))
            .on('pointerdown', () => this.showMessage('The cushion still holds a faint impression.'));

        // ── Object: cold hearth ────────────────────────────────────────────
        // ASSET PLACEHOLDER: replace with this.add.image() when sprite is ready
        this.add.text(this.w * 0.52, this.h * 0.45, '🔥 cold hearth')
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                if (this.hasItem('lit candle')) {
                    this.showMessage('You could light this with your candle.');
                } else {
                    this.showMessage('Dead ash. No heat in it.');
                }
            })
            .on('pointerdown', () => {
                if (this.hasItem('lit candle')) {
                    this.loseItem('lit candle');
                    this.showMessage('The fire catches. Something shifts in the chimney above.');
                } else {
                    this.showMessage('You\'d need a flame to start it.');
                }
            });

        // ── Roll trigger: decipher inscription ────────────────────────────
        this.addRollTrigger(
            this.w * 0.08, this.h * 0.62,
            'decipher faded inscription', 14,
            () => this.showMessage('It reads: "The key turns where the clock stopped."'),
            () => this.showMessage('The ink is too faded. You make out nothing useful.')
        );

        // ── Passage: back to foyer ─────────────────────────────────────────
        // ASSET PLACEHOLDER: replace with this.add.image() when sprite is ready
        this.add.text(this.w * 0.05, this.h * 0.88, '← Back to Foyer')
            .setFontSize(this.s * 2)
            .setColor('#888')
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => this.showMessage('Return to the entrance hall.'))
            .on('pointerdown', () => this.gotoScene('foyer'));
    }
}


// ── CELLAR ────────────────────────────────────────────────────────────────────
class Cellar extends AdventureScene {
    constructor() { super('cellar', 'The Cellar'); }

    onEnter() {
        this.setDescription(
            'Low ceiling, bare stone. Wine racks line the walls, most bottles shattered. Water drips somewhere in the dark. The flagstone near the far corner is slightly raised.'
        );

        // ── Object: wine rack ──────────────────────────────────────────────
        // ASSET PLACEHOLDER: replace with this.add.image() when sprite is ready
        this.add.text(this.w * 0.08, this.h * 0.2, '🍷 wine rack')
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => this.showMessage('Rows of bottles. Most are broken. One survives.'))
            .on('pointerdown', () => {
                if (!this.hasItem('old wine')) {
                    this.showMessage('You pocket the intact bottle. Heavy and cold.');
                    this.gainItem('old wine');
                } else {
                    this.showMessage('Nothing else worth taking.');
                }
            });

        // ── Object: raised flagstone ───────────────────────────────────────
        // ASSET PLACEHOLDER: replace with this.add.image() when sprite is ready
        const stone = this.add.text(this.w * 0.45, this.h * 0.38, '🪨 raised flagstone')
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                if (this.hasItem('iron key')) {
                    this.showMessage('The keyhole on its edge matches your iron key.');
                } else {
                    this.showMessage('It won\'t budge. There\'s a keyhole on the edge.');
                }
            })
            .on('pointerdown', () => {
                if (this.hasItem('iron key')) {
                    this.loseItem('iron key');
                    this.showMessage('The stone grinds aside. Something glints below.');
                    stone.setText('🪨 open flagstone');
                    this.time.delayedCall(1000, () => {
                        if (!this.hasItem('front door key')) {
                            this.showMessage('A brass key on a ribbon — the front door key.');
                            this.gainItem('front door key');
                        }
                    });
                } else {
                    this.showMessage('It won\'t move without the right key.');
                }
            });

        // ── Object: old barrel ────────────────────────────────────────────
        // ASSET PLACEHOLDER: replace with this.add.image() when sprite is ready
        this.add.text(this.w * 0.22, this.h * 0.52, '🛢️ old barrel')
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => this.showMessage('Staves swollen with damp. Something rattles inside.'))
            .on('pointerdown', () => this.showMessage('Empty. Just the rattle of a loose stave.'));

        // ── Object: dripping pipe ─────────────────────────────────────────
        // ASSET PLACEHOLDER: replace with this.add.image() when sprite is ready
        this.add.text(this.w * 0.55, this.h * 0.2, '💧 dripping pipe')
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => this.showMessage('Ice cold water. It never stops.'))
            .on('pointerdown', () => this.showMessage('You let it run over your hand. It chills you to the bone.'));

        // ── Roll trigger: search the shadows ──────────────────────────────
        this.addRollTrigger(
            this.w * 0.08, this.h * 0.68,
            'search the shadows', 10,
            () => this.showMessage('Scratch marks on the floor — something was dragged here.'),
            () => this.showMessage('Too dark. You find nothing.')
        );

        // ── Passage: back to foyer ─────────────────────────────────────────
        // ASSET PLACEHOLDER: replace with this.add.image() when sprite is ready
        this.add.text(this.w * 0.05, this.h * 0.88, '← Back to Foyer')
            .setFontSize(this.s * 2)
            .setColor('#888')
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => this.showMessage('Climb back up to the entrance hall.'))
            .on('pointerdown', () => this.gotoScene('foyer'));
    }
}


// ── BALLROOM ──────────────────────────────────────────────────────────────────
class Ballroom extends AdventureScene {
    constructor() { super('ballroom', 'The Ballroom'); }

    onEnter() {
        this.setDescription(
            'An enormous room, its floor warped and buckled. Dust-sheeted figures line the walls — mannequins, you tell yourself. A phonograph sits in the corner. It plays, though no one wound it.'
        );

        // ── Object: phonograph ────────────────────────────────────────────
        // ASSET PLACEHOLDER: replace with this.add.image() when sprite is ready
        const phono = this.add.text(this.w * 0.52, this.h * 0.15, '🎵 phonograph')
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => this.showMessage('It plays a waltz. The record is cracked in three places.'))
            .on('pointerdown', () => {
                this.showMessage('You lift the needle. The room feels worse in silence.');
                this.tweens.add({
                    targets: phono,
                    angle: 360,
                    duration: 800,
                    ease: 'Cubic.out'
                });
            });

        // ── Object: shrouded figures ───────────────────────────────────────
        // ASSET PLACEHOLDER: replace with this.add.image() when sprite is ready
        this.add.text(this.w * 0.08, this.h * 0.28, '👻 shrouded figures')
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => this.showMessage('Dust sheets. They are very still. Mostly.'))
            .on('pointerdown', () => this.showMessage('One seems closer than it was before.'));

        // ── Object: dance floor ────────────────────────────────────────────
        // ASSET PLACEHOLDER: replace with this.add.image() when sprite is ready
        this.add.text(this.w * 0.28, this.h * 0.42, '🕺 dance floor')
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => this.showMessage('Warped parquet. Footprints in the dust — fresh ones.'))
            .on('pointerdown', () => this.showMessage('The footprints end in the middle of the floor.'));

        // ── Object: fallen candelabrum ─────────────────────────────────────
        // ASSET PLACEHOLDER: replace with this.add.image() when sprite is ready
        this.add.text(this.w * 0.48, this.h * 0.55, '🕯️ fallen candelabrum')
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => this.showMessage('Toppled and cold. Wax pooled on the floor.'))
            .on('pointerdown', () => this.showMessage('Too heavy to lift alone.'));

        // ── Roll trigger: watch the figures ───────────────────────────────
        this.addRollTrigger(
            this.w * 0.08, this.h * 0.68,
            'watch the figures', 12,
            () => this.showMessage('One turns its head. Then goes still. You saw it. You did.'),
            () => this.showMessage('Nothing moves. Maybe you imagined it.')
        );

        // ── Passage: back to foyer ─────────────────────────────────────────
        // ASSET PLACEHOLDER: replace with this.add.image() when sprite is ready
        this.add.text(this.w * 0.05, this.h * 0.88, '← Back to Foyer')
            .setFontSize(this.s * 2)
            .setColor('#888')
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => this.showMessage('Step back into the entrance hall.'))
            .on('pointerdown', () => this.gotoScene('foyer'));
    }
}


// ── STUDY ─────────────────────────────────────────────────────────────────────
class Study extends AdventureScene {
    constructor() { super('study', 'The Study'); }

    onEnter() {
        this.setDescription(
            'A small, cluttered room. Papers everywhere, most scorched at the edges. A grandfather clock stands against the far wall. Its pendulum is frozen mid-swing.'
        );

        // ── Object: writing desk ───────────────────────────────────────────
        // ASSET PLACEHOLDER: replace with this.add.image() when sprite is ready
        this.add.text(this.w * 0.28, this.h * 0.2, '🖋️ writing desk')
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => this.showMessage('Scattered papers and a dry inkwell.'))
            .on('pointerdown', () => {
                if (!this.hasItem('letter')) {
                    this.showMessage('Beneath the papers: a sealed letter addressed to no one.');
                    this.gainItem('letter');
                } else {
                    this.showMessage('Nothing else hidden here.');
                }
            });

        // ── Object: grandfather clock ──────────────────────────────────────
        // ASSET PLACEHOLDER: replace with this.add.image() when sprite is ready
        const clock = this.add.text(this.w * 0.52, this.h * 0.12, '🕰️ grandfather clock')
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                if (this.hasItem('iron key')) {
                    this.showMessage('The winding hole matches your iron key.');
                } else {
                    this.showMessage('Stopped at 3:17. The pendulum won\'t move.');
                }
            })
            .on('pointerdown', () => {
                if (this.hasItem('iron key')) {
                    this.loseItem('iron key');
                    this.showMessage('The clock chimes once. A hidden drawer springs open.');
                    clock.setText('🕰️ ticking clock');
                    this.tweens.add({
                        targets: clock,
                        x: '+=' + this.s * 0.8,
                        yoyo: true,
                        repeat: 5,
                        duration: 120,
                        ease: 'Sine.inOut'
                    });
                    this.time.delayedCall(1200, () => {
                        if (!this.hasItem('skeleton key')) {
                            this.showMessage('Inside the drawer: a skeleton key on black velvet.');
                            this.gainItem('skeleton key');
                        }
                    });
                } else {
                    this.showMessage('The pendulum is frozen. Something winds it from inside.');
                }
            });

        // ── Object: scorched papers ────────────────────────────────────────
        // ASSET PLACEHOLDER: replace with this.add.image() when sprite is ready
        this.add.text(this.w * 0.08, this.h * 0.42, '📄 scorched papers')
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => this.showMessage('Someone tried to burn them. Didn\'t finish.'))
            .on('pointerdown', () => this.showMessage('"...the thing in the cellar knows my name..."'));

        // ── Object: oil lamp ───────────────────────────────────────────────
        // ASSET PLACEHOLDER: replace with this.add.image() when sprite is ready
        this.add.text(this.w * 0.44, this.h * 0.42, '🪔 oil lamp')
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => this.showMessage('Still has oil. It casts a warm, unsteady light.'))
            .on('pointerdown', () => {
                if (!this.hasItem('oil lamp')) {
                    this.showMessage('You take the lamp. It lights your way.');
                    this.gainItem('oil lamp');
                } else {
                    this.showMessage('You\'re already carrying it.');
                }
            });

        // ── Roll trigger: read the damaged diary ──────────────────────────
        this.addRollTrigger(
            this.w * 0.08, this.h * 0.62,
            'read the damaged diary', 11,
            () => this.showMessage('You piece together a name: Lord Ashwood. He sealed something below.'),
            () => this.showMessage('Too damaged. The words crumble as you read them.')
        );

        // ── Passage: back to foyer ─────────────────────────────────────────
        // ASSET PLACEHOLDER: replace with this.add.image() when sprite is ready
        this.add.text(this.w * 0.05, this.h * 0.88, '← Back to Foyer')
            .setFontSize(this.s * 2)
            .setColor('#888')
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => this.showMessage('Back to the entrance hall.'))
            .on('pointerdown', () => this.gotoScene('foyer'));
    }
}


// ─────────────────────────────────────────────────────────────────────────────
// PHASER GAME CONFIG
// ─────────────────────────────────────────────────────────────────────────────

const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    scene: [Intro, Foyer, Library, Cellar, Ballroom, Study, Outro],
    title: 'Ashwood Manor',
    backgroundColor: '#111'
});
