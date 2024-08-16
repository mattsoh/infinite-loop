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
11111111C1111111
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

let level = -1;
const tutorialLevel = map`
pw..w..g
.ww...wg
..w.w.wg
w...w..g`;
const levels = [
  map`
pw...w.g
.w.w.w.w
.w.w.w.w
.w.w.w.w
.w.w.w.w
...w...w`,
  map`
pw...w.g
.f.w.f.w
.w.w.w.w
.w.w.w.w
.w.w.w.w
.w.w...w`,
  map`
pwfwwffg
.wfffwfw
.wfwfwff
.ffwffwf
.wfwfwwf
.wwwffff`
];
function showTutorial() {
  setMap(tutorialLevel);
  console.log("showing tutorial");
  addText("Use WASD to move", { y: 5, color: color`F` });
  addText("Reach the goal", { y:7, color: color`F` });
//   // addText(levels[0]);
}
function clear(){
  clearText();
  addText("Level "+level);
}
function loadLevel() {
  // addText(level,{y:1,color:color`F`});
  console.log(level)
  if (level === -1){
    // console.log("showing tutorial");
    // addText("showing tutorial",{y:2,color:color`F`});
    showTutorial();
  }else{
  addText("Level "+level);
  setMap(levels[level-1]);
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

afterInput(() => {
  const playerPos = getFirst(player);
  const goalPos = getFirst(goal);

  if (playerPos.x === goalPos.x && playerPos.y === goalPos.y) {
    if (level === -1){
      clearText();
      addText("Congratulations,", {y: 5, color: color`F` });
      addText("Tutorial complete!", {y: 7, color: color`F` });
      level = 1;
      loadLevel();
      setTimeout(function(){
        clear();
      }, 2000);
    }else{
        level++;
       if (level > levels.length) {
          addText("You Win!", { y: 4, color: color`4` });
       }else{
         loadLevel();
       }
    }
  }
});
