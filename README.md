# Ashwood Manor: A Gothic Mystery
I created this simple adventure game as an exploration of atmospheric storytelling using a customized adventure engine.

## Code Requirements
- **4+ scenes based on `AdventureScene`**: I implemented five main locations that extend the core `AdventureScene` class:
    - `Foyer` (in `src/scenes/foyer.js`)
    - `Library` (in `src/scenes/library.js`)
    - `Cellar` (in `src/scenes/cellar.js`)
    - `Ballroom` (in `src/scenes/ballroom.js`)
    - `Study` (in `src/scenes/study.js`)
- **2+ scenes *not* based on `AdventureScene`**: I built the introductory and concluding experiences directly on `Phaser.Scene`:
    - `Intro` (in `src/scenes/intro.js`): Handles asset loading, audio context initialization, and the title screen.
    - `Outro` (in `src/scenes/outro.js`): Provides the game's resolution and restart logic.
- **2+ methods or other enhancement added to the adventure game engine**:
    - `addRollTrigger(x, y, label, dc, onSuccess, onFail)`: I added this method to `AdventureScene` (in `src/adventure.js`) to allow for skill-check based interactions. It includes a shaking animation for the button and handles success/failure callbacks based on a random d20 roll.
    - `setDescription(text)`: I enhanced the engine with this method to manage persistent scene descriptions. It includes a smooth fade-in tween to ensure transitions between room descriptions feel polished.

## Experience Requirements
- **4+ locations in the game world**: I designed five distinct areas for the player to explore: the `Foyer`, `Library`, `Cellar`, `Ballroom`, and `Study`.
- **2+ interactive objects in most scenes**: I populated each room with multiple points of interest. For example:
    - In the **Library**, players can interact with the `bookshelf` or use a roll to `Investigate dusty corner`.
    - In the **Cellar**, players can check the `wine rack`, pry open a `wooden crate`, or `Examine loose stone`.
- **Many objects have `pointerover` messages**: I used the `showMessage` system to provide feedback when players hover over objects. Examples include:
    - "A rusted chandelier." in the Foyer.
    - "Hundreds of volumes." in the Library.
    - "It plays a waltz." for the phonograph in the Ballroom.
- **Many objects have `pointerdown` effects**: I implemented various outcomes for clicking objects:
    - **Item Gain**: Clicking the crate in the Cellar with a crowbar grants the `manor key`.
    - **Scene Navigation**: Clicking room icons in the Foyer transitions the player to new locations.
    - **Dice Rolls**: Clicking the `Search the desk` button in the Study triggers a chance-based search.
- **Some objects are themselves animated**: I used tweens to make the interface and objects feel reactive:
    - The **Roll Buttons** (created via `addRollTrigger`) perform a shaking rotation animation when clicked.
    - **Inventory Items** slide and fade into view when gained, and slide away when lost.
    - **UI Elements** like the message box and description box use alpha tweens to fade in and out.

## Asset Sources
- **Visuals**: All background images (e.g., `foyer.png`, `library.png`) were generated using AI-assisted digital painting tools (Midjourney) and edited in Photoshop to ensure consistent lighting and scale. The UI icons like `question.png` and room icons were custom-made to fit the gothic aesthetic.
- **Audio**:
    - `bg.mp3`: A loopable ambient track sourced from public domain horror soundscapes and edited for duration.
    - `click.mp3`: A custom-recorded UI sound effect of a physical switch.

## Code Sources
- `adventure.js` and `index.html` were originally provided by [Adam Smith](https://github.com/rndmcnlly) and significantly extended by me with new interaction methods and UI refinements.
- `game.js` was rewritten by me to configure the specific scenes and scale settings for Ashwood Manor.
- All scene files in `src/scenes/` were authored by me to implement the specific logic and layout of the game.
