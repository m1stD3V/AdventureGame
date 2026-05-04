// I provide a framework for my adventure games.
// I manage an inventory, a message box, transitions, and the UI layout.
class AdventureScene extends Phaser.Scene {

    // I initialize the scene and handle the inventory data.
    init(data) {
        this.inventory = data?.inventory || [];
    }

    // I set the unique scene key and the name shown in the UI.
    constructor(key, name) {
        super(key);
        this.name = name;
    }

    // I create the UI and call my onEnter method.
    create() {
        // I set the duration for scene transitions.
        this.transitionDuration = 1000;

        // I define the dimensions and spacing units for the game.
        this.w = this.game.config.width;
        this.h = this.game.config.height;
        this.s = this.game.config.width * 0.01;

        this.cameras.main.setBackgroundColor('#444');
        this.cameras.main.fadeIn(this.transitionDuration, 0, 0, 0);

        this.add.rectangle(this.w * 0.75, 0, this.w * 0.25, this.h).setOrigin(0, 0).setFillStyle(0);
        this.add.text(this.w * 0.75 + this.s, this.s)
            .setText(this.name)
            .setStyle({ fontSize: `${3 * this.s}px` })
            .setWordWrapWidth(this.w * 0.25 - 2 * this.s);

        // I create a box for persistent scene descriptions.
        this.descriptionBox = this.add.text(this.w * 0.75 + this.s, this.h * 0.12)
            .setStyle({ fontSize: `${1.75 * this.s}px`, color: '#aaa' })
            .setWordWrapWidth(this.w * 0.25 - 2 * this.s);

        this.messageBox = this.add.text(this.w * 0.75 + this.s, this.h * 0.33)
            .setStyle({ fontSize: `${2 * this.s}px`, color: '#eea' })
            .setWordWrapWidth(this.w * 0.25 - 2 * this.s);

        this.inventoryBanner = this.add.text(this.w * 0.75 + this.s, this.h * 0.66)
            .setStyle({ fontSize: `${2 * this.s}px` })
            .setText("Inventory")
            .setAlpha(0);

        this.inventoryTexts = [];
        this.updateInventory();

        this.add.text(this.w-3*this.s, this.h-3*this.s, "📺")
            .setStyle({ fontSize: `${2 * this.s}px` })
            .setInteractive({useHandCursor: true})
            .on('pointerover', () => this.showMessage('Fullscreen?'))
            .on('pointerdown', () => {
                if (this.scale.isFullscreen) {
                    this.scale.stopFullscreen();
                } else {
                    this.scale.startFullscreen();
                }
            });

        this.onEnter();

    }

    // I play a sound when I click on something.
    playClick() {
        this.sound.play('click', { volume: 0.5 });
    }

    // I show a temporary message in the UI.
    showMessage(message) {
        this.messageBox.setText(message);
        this.tweens.add({
            targets: this.messageBox,
            alpha: { from: 1, to: 0 },
            easing: 'Quintic.in',
            duration: 4 * this.transitionDuration
        });
    }

    // I set the persistent description text for the scene.
    setDescription(text) {
        this.descriptionBox.setText(text);
        this.tweens.add({
            targets: this.descriptionBox,
            alpha: { from: 0, to: 1 },
            ease: 'Cubic.out',
            duration: this.transitionDuration
        });
    }

    // I add a button that triggers a dice roll for an action.
    addRollTrigger(x, y, label, dc, onSuccess, onFail) {
        const defaultFail = (roll) => {
            this.showMessage(`🎲 Rolled ${roll} — not enough. (DC ${dc})`);
        };
        const failCallback = onFail || defaultFail;

        const btn = this.add.text(x, y, `🎲 ${label} (DC ${dc})`)
            .setFontSize(this.s * 2)
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => {
                btn.setStyle({ color: '#ffe' });
                this.showMessage(`Roll a d20 to ${label}. Need ${dc}+.`);
            })
            .on('pointerout', () => {
                btn.setStyle({ color: '#fff' });
            })
            .on('pointerdown', () => {
                this.playClick();
                const roll = Phaser.Math.Between(1, 20);

                this.tweens.add({
                    targets: btn,
                    angle: { from: -4, to: 4 },
                    repeat: 3,
                    yoyo: true,
                    ease: 'Sine.inOut',
                    duration: 60,
                    onComplete: () => btn.setAngle(0)
                });

                if (roll >= dc) {
                    this.showMessage(`🎲 Rolled ${roll} — success! (DC ${dc})`);
                    onSuccess(roll);
                } else {
                    failCallback(roll);
                }
            });

        return btn;
    }

    // I update the inventory display on the screen.
    updateInventory() {
        if (this.inventory.length > 0) {
            this.tweens.add({
                targets: this.inventoryBanner,
                alpha: 1,
                duration: this.transitionDuration
            });
        } else {
            this.tweens.add({
                targets: this.inventoryBanner,
                alpha: 0,
                duration: this.transitionDuration
            });
        }
        if (this.inventoryTexts) {
            this.inventoryTexts.forEach((t) => t.destroy());
        }
        this.inventoryTexts = [];
        let h = this.h * 0.66 + 3 * this.s;
        this.inventory.forEach((e, i) => {
            let text = this.add.text(this.w * 0.75 + 2 * this.s, h, e)
                .setStyle({ fontSize: `${1.5 * this.s}px` })
                .setWordWrapWidth(this.w * 0.75 + 4 * this.s);
            h += text.height + this.s;
            this.inventoryTexts.push(text);
        });
    }

    // I check if I am carrying a specific item.
    hasItem(item) {
        return this.inventory.includes(item);
    }

    // I add an item to my inventory and animate the display.
    gainItem(item) {
        if (this.inventory.includes(item)) {
            console.warn('gaining item already held:', item);
            return;
        }
        this.playClick();
        this.inventory.push(item);
        this.updateInventory();
        for (let text of this.inventoryTexts) {
            if (text.text == item) {
                this.tweens.add({
                    targets: text,
                    x: { from: text.x - 20, to: text.x },
                    alpha: { from: 0, to: 1 },
                    ease: 'Cubic.out',
                    duration: this.transitionDuration
                });
            }
        }
    }

    // I remove an item from my inventory and animate the display.
    loseItem(item) {
        if (!this.inventory.includes(item)) {
            console.warn('losing item not held:', item);
            return;
        }
        this.playClick();
        for (let text of this.inventoryTexts) {
            if (text.text == item) {
                this.tweens.add({
                    targets: text,
                    x: { from: text.x, to: text.x + 20 },
                    alpha: { from: 1, to: 0 },
                    ease: 'Cubic.in',
                    duration: this.transitionDuration
                });
            }
        }
        this.time.delayedCall(500, () => {
            this.inventory = this.inventory.filter((e) => e != item);
            this.updateInventory();
        });
    }

    // I transition to a new scene while carrying my inventory.
    gotoScene(key) {
        this.playClick();
        this.cameras.main.fade(this.transitionDuration, 0, 0, 0);
        this.time.delayedCall(this.transitionDuration, () => {
            this.scene.start(key, { inventory: this.inventory });
        });
    }

    // I use this method to add interactive objects in my scenes.
    onEnter() {
        console.warn('This AdventureScene did not implement onEnter():', this.constructor.name);
    }
}
