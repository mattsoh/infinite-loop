/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: The Infinite Loop
@author: 
@tags: [jam]
@addedOn: 2024-00-00
*/

const player = "p";
const wall = "w";
const goal = "g";

setLegend(
  [ player, bitmap`
................
................
.......000......
.......0.0......
......0..0......
......0...0.0...
....0003.30.0...
....0.0...000...
....0.05550.....
......0...0.....
.....0....0.....
.....0...0......
......000.......
......0.0.......
.....00.00......
................` ],
  [ wall, bitmap`
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111` ],
  [ goal, bitmap`
................
....4444444444..
...444444444444.
..44444444444444
..44444444444444
.444444444444444
.444444444444444
.444444444444444
.444444444444444
.444444444444444
.444444444444444
..44444444444444
..4444444444444.
...444444444444.
....4444444444..
................` ]
);

setSolids([wall, player]);

let level = 0;
const levels = [
  map`
p.......
.w.w....
.w.w....
.w.w..g.`,
  map`
p..w....
...w....
.w..w...
.w..g..w`,
  map`
p.w.....
.w.w..g.
.w......
...wwwww`
];

// Load the current level
function loadLevel() {
  setMap(levels[level]);
}

// Set player movement
onInput("w", () => {
  getFirst(player).y -= 1;
});

onInput("a", () => {
  getFirst(player).x -= 1;
});

onInput("s", () => {
  getFirst(player).y += 1;
});

onInput("d", () => {
  getFirst(player).x += 1;
});

// Check for level completion and progression
afterInput(() => {
  const playerPos = getFirst(player);
  const goalPos = getFirst(goal);

  if (playerPos.x === goalPos.x && playerPos.y === goalPos.y) {
    level += 1;
    if (level < levels.length) {
      loadLevel();
    } else {
      addText("You Win!", { y: 4, color: color`4` });
    }
  }
});

// Start the game with the first level
loadLevel();
