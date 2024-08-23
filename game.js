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
const fake = "f";
const slide = "s";
const coin = "c";
const coinShow = "x";

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
  [fake, bitmap`
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
1111111111111111`],
  [coin, bitmap`
1111111111111111
1111111111111111
1111111111111111
1111166661111111
1111661116661111
1111611111111111
1116111111111111
1116111111111111
1161111111111111
1161111111111111
1161111111111111
1161111111111111
1166111111111111
1116661666111111
1111166111111111
1111111111111111`],
  [coinShow, bitmap`
1111111111111111
1111111111111111
1111111666111111
1111666666661111
1116611111166111
1116111111116111
1161111661116611
1166116611111611
1116116111116111
1111666161116111
1111666661166111
1111116666661111
1111111111111111
1111111111111111
1111111111111111
1111111111111111`]
);

setSolids([wall, player, slide]);
let level = -1;
let collected = false;
const tutorialLevels = [map`
pw.......w
.w.w.w.w.w
.w...w...w
...wwwww..
wwww....w.
cfffs.w...
wwwww...w.
g.....w...`];
const altLevels = [map`
pw...c....
.f.w.w.wwg
.w.f.w.fff
.w.w.w.wcw
.w.w.f.wwc
.w.w.w.scc
.w.w.w.wws
...w...wcf`]
const levels = [
  map`
pw...w....
.c.w.w.wwg
.w.w.w.fff
.f.w.f.www
.w.f.w.wcc
.w.w.w.wcc
.w.w.w.wcc
...w...scc`,
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
    showTutorial(0);
  } else {
    clear()
    if (level === 0 && pressed){
      setMap(altLevels[0]);
    } else { 
      setMap(levels[level]);
    }
  }
}

loadLevel();

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

onInput("l", () => {
  if (level === -1) {
    
    const playerPos = getFirst(player);
    const goalPos = getFirst(goal);
    playerPos.x = goalPos.x;
    playerPos.y = goalPos.y;
  }
});

onInput("j", () => {
  const playerPos = getFirst(player);
  let x = playerPos.x;
  let y = playerPos.y;
  for (const [i, j] of [[-1,0],[1,0],[0,-1],[0,1]]) {
    let nx = x + i;
    let ny = y + j;
    // console.log(getTile(nx,ny)[0].type, slide);
    // console.log(getTile(nx,ny)[0]);
    if (getTile(nx,ny).length > 0 && getTile(nx,ny)[0].type === slide){
      [playerPos.x,playerPos.y] = [nx+i,ny+j];
      console.log(getFirst(player).x, getFirst(player).y);
      // setSolids();
      console.log(getFirst(player),getFirst(player).x, getFirst(player).y, nx, ny, nx+i,ny+j);
      console.log("jumping")
      break;
    }
  }
});

onInput("k", () => {
  const playerPos = getFirst(player);
  const coins = getAll(coin,coinShow);
  console.log(playerPos,coins, getTile(playerPos.x, playerPos.y));
  coins.forEach(coinPos => {
    // console.log(coinPos);
    // console.log(playerPos.x, playerPos.y, coinPos.x, coinPos.y)
    if (playerPos.x === coinPos.x && playerPos.y === coinPos.y) {
      coinPos.type = fake;
      console.log("collected");
    }
  })
});

afterInput(() => {
  const playerPos = getFirst(player);
  const goalPos = getFirst(goal);
  const coins = getAll(coin, coinShow);
  coins.forEach(coinPos => {
    // console.log(coinPos);
    // console.log(playerPos.x, playerPos.y, coinPos.x)
    if (playerPos.x === coinPos.x && playerPos.y === coinPos.y) {
      coinPos.type = coinShow;
      console.log("hovering")
      console.log(getTile(playerPos.x, playerPos.y));
    }
  })

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
      if (level === 1){
        pressed = true;
        level = 0;
      } else{
        level++;
      }
      if (level > levels.length) {
        addText("You Win!", { y: 4, color: color`4` });
      } else {
        loadLevel();
      }
    }
  }
});

let time = 0;

const timer = setInterval(() => {
  time += 10; 
  // console.log("Time: " + time);
}, 10);
