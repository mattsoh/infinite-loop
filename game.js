/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: The Infinite Loop
@author: Matthew Soh
@tags: [jam]
@addedOn: 2024-00-00
*/

const soundtrack = tune`
500: D4-500,
15500`

const player = "p";
const wall = "w";
const goal = "g";
const fakewall = "f";
// let passed = false;

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
  [ fakewall, bitmap`
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
pw...w.g
.f.w.w.w
.w.w.w.w
.w.w.w.w
.w.w.w.w
...w...w`
//   map`
// pw...w.g
// .f.w.w.w
// .w.w.w.w
// .w.w.w.w
// .w.w.w.w
// ...w...w`,
//   map`
// p..w....
// ...w....
// .w..w...
// .w..g..w`,
//   map`
// p.w.....
// .w.w..g.
// .w......
// ...wwwww`
];

const tutorialLevel = map`
p...w....
....w..g
........
........`;

function showTutorial() {
  // addText("Use WASD to move", { y: 1, color: color`4` });
  // addText("Reach the goal (g)", { y: 3, color: color`4` });
  addText(levels[0]);
}

levels.unshift(tutorialLevel);

function loadLevel() {
  if (level === 0) {
    showTutorial();
  }
  addText(levels[0]);
  setMap(map`
pw...w.g
.w.w.w.w
.w.w.w.w
.w.w.w.w
.w.w.w.w
...w...w`);
  addText(levels[0]);
  setMap(levels[0]);
}

// Start the game with the tutorial level
loadLevel();

// onInput("w", () => {
//   getFirst(player).y -= 1;
// });

// onInput("a", () => {
//   getFirst(player).x -= 1;
// });

// onInput("s", () => {
//   getFirst(player).y += 1;
// });

// onInput("d", () => {
//   getFirst(player).x += 1;
// });

// afterInput(() => {
//   const playerPos = getFirst(player);
//   const goalPos = getFirst(goal);

//   if (playerPos.x === goalPos.x && playerPos.y === goalPos.y) {
//     level += 1;
//     if (level < levels.length) {
//       loadLevel();
//     } else {
//       addText("You Win!", { y: 4, color: color`4` });
//     }
//   }
// });
