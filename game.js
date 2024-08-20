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
const slide = "s";
const powerup = {}

setLegend(
  [player, bitmap`
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
................`],
  [wall, bitmap`
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
1111111111111111`],
  [fakewall, bitmap`
1111111111111CC1
111111111111CC11
11111111111CC111
1111111111CC1111
1111111CCCC11111
1111111CCC111111
111111CCC1111111
111111CCCCCCC111
11111CCCC11C1111
1111CCCCCCCC1111
111111111C111111
1111111CC1111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111`],
  [goal, bitmap`
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
................`],
  [slide, bitmap`
1111111111111111
1111111111111111
1111111111111111
1111111111111111
11111FFFFF111111
1111111111FF1111
11111111F1FF1111
111111FFFFF11111
11111FFF1F111111
11111FFFF1111111
1111F11F11111111
111F1FF111111111
11F1F11111111111
1F1F111111111111
1FF1111111111111
1111111111111111`]
);

setSolids([wall, player]);

let level = -1;
const tutorialLevels = [map`
pw.......w
.w.w.w.w.w
.w...w...w
...wwwww..
wwww....w.
.ffsw.w...
wwwww...w.
g.....w...`,
                        map`
p.........
..........
..........
..........
..........
..........
..........
..........`];
const levels = [
  map`
pw.w.w..wg
.w.w.f.wwf
.w.w.w.fff
.w.w.w.www
.w.f.w.www
.w.w.w.www
.f.w.w.www
.w.w...www`,
  map`
pwfwwwwgff
fwfffffwwf
fwfwfwffwf
fffwfwfwff
fwfwfwfwfw
fwfwffwwff
fwfwwffwwf
fwfffwffff`
];

let pressed = false;

function showTutorial(tut) {
  setMap(tutorialLevels[tut]);
  console.log("showing tutorial");
  addText("The Tutorial", { y: 0, color: color`7` });
  addText("Use WASD to move", { y: 5, color: color`0` });
  addText("L to skip", { y: 7, color: color`0` });
  addText("Reach the goal", { y: 9, color: color`0` });
  //   // addText(levels[0]);
}

function clear() {
  clearText();
  addText("Level " + (level+1));
}

function loadLevel() {
  // addText(level,{y:1,color:color`F`});
  console.log(level)
  if (level === -1) {
    // console.log("showing tutorial");
    // addText("showing tutorial",{y:2,color:color`F`});
    showTutorial(0);
  } else {
    clear()
    setMap(levels[level]);
  }
}
loadLevel();
onInput("w", () => {
  getFirst(player).y -= 1;77
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

onInput("l", () => {
  const playerPos = getFirst(player);
  const goalPos = getFirst(goal);
  playerPos.x = goalPos.x;
  playerPos.y = goalPos.y;
});

onInput("j", () => {
  let x = getFirst(player).x;
  let y = getFirst(player).y;
  for (const [i, j] of [[-1,-1],[-1,1],[1,-1],[1,1]]) {
    let nx = x + i;
    let ny = y + j;
    // console.log(getTile(nx,ny)[0].type, slide);
    if (getTile(nx,ny)[0].type === slide){
      x = nx;
      y = ny;
      getFirst(player).x = nx;
      getFirst(player).y = ny;
      console.log("jumping")
    }
  }
});
    
afterInput(() => {
  const playerPos = getFirst(player);
  const goalPos = getFirst(goal);

  if (playerPos.x === goalPos.x && playerPos.y === goalPos.y) {
    if (level === -1) {
      level = 0;
      loadLevel();
      addText("Congratulations,", { y: 5, color: color`F` });
      addText("Tutorial complete!", { y: 7, color: color`F` });
      setTimeout(function() {
        clear();
      }, 2000);
    } else {
      level++;
      level %= 2;
      if (level > levels.length) {
        addText("You Win!", { y: 4, color: color`4` });
      } else {
        loadLevel();
      }
    }
  }
});
