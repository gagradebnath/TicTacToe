let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset");
let info = document.querySelector("#info");
let finished = false;
let winArray = [];
let ok = document.querySelector("#ok");
let filled = 0;
let input = document.querySelectorAll(".input");

let pX = "Player 2";
let pO = "Player 1";
ok.addEventListener("click", () => {
    if (document.querySelector("#x").value != "" && document.querySelector("#o").value != "") {
        pX = document.querySelector("#x").value;
        pO = document.querySelector("#o").value;
    }
    ok.style.backgroundColor = "green";
    setTimeout(() => {
        ok.style.backgroundColor = "rgb(147, 216, 51)";
    }, 250);
    info.textContent = `${pO}'s Turn`;
})
// let pX = prompt("Enter Name(X)");
// let pO = prompt("Enter Name(O)");

info.textContent = `${pO}'s Turn`;
boxes.forEach((box) => {
    box.textContent = "";
    box.onmouseover = () => {
        box.style.backgroundColor = "rgb(206, 215, 222)";
    }
    box.onmouseout = () => {
        if (finished == true) {
            if (box == boxes[winArray[0]] || box == boxes[winArray[1]] || box == boxes[winArray[2]]) {
                box.style.backgroundColor = "lightgreen";
            } else {
                box.style.backgroundColor = "white";
            }
        } else box.style.backgroundColor = "white";
    }
})
let turn_X = false;

let winPattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
function check(symbol) {
    for (let arr of winPattern) {
        let count = 0;
        for (let pos of arr) {
            if (boxes[pos].textContent == symbol) count++;
        }
        if (count == 3) {
            playWin();
            winArray = arr;

            let blinkCount = 0;
            let intervalId = setInterval(() => {
                for (let pos of arr) {
                    boxes[pos].style.backgroundColor = (blinkCount % 2 === 0) ? "lightgreen" : "white";
                }
                blinkCount++;
                if (blinkCount === 6) {
                    clearInterval(intervalId);
                    for (let pos of arr) {
                        boxes[pos].style.backgroundColor = "lightgreen";
                        boxes[pos].style.fontWeight = "bold";
                        boxes[pos].style.border = "2px solid darkgreen";
                    }
                }
            }, 400);

            if (symbol == "X") {
                info.textContent = `${pX} wins the game!!!`;
                //createMessage(`${pX} wins the game!!!`);
            } else {
                info.textContent = `${pO} wins the game!!!`;
                //createMessage(`${pO} wins the game!!!`)
            }
            finished = true;
            filled = 0;
            return true;
        }
    }
    if (filled == 9) {
        txt = document.createElement("p");
        info.innerText = "The match is tie";
        Draw();
        finished = true;
        return true;
    }
    return false;
}


function playBox() {
    document.getElementById("boxPressed").play();
}
function playWin() {
    document.getElementById("win").play();
}
function playDraw() {
    document.getElementById("draw").play();
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (!finished) {
            playBox();
            if (box.textContent != "") {
                alert("Invalid Move!");
                return;
            }
            if (turn_X == true) {
                box.textContent = "X";
                filled++;
                if (check("X")) return;
                info.textContent = `${pO}'s Turn`;
                turn_X = false;
            }
            else {
                box.textContent = "O";
                filled++;
                if (check("O")) return;
                info.textContent = `${pX}'s Turn`;
                turn_X = true;
            }
        }
    })
})


reset.addEventListener("click", () => {
    reset.style.backgroundColor = "green";
    setTimeout(() => {
        reset.style.backgroundColor = "rgb(147, 216, 51)";
    }, 250);
    boxes.forEach((box) => {
        box.textContent = "";
        box.style.backgroundColor = "white";
        box.style.color = "rgb(165, 42, 42)";
        box.onmouseout = () => {
            box.style.backgroundColor = "white";
        }
    })
    info.textContent = `${pO}'s Turn`;
    winArray = [];
    filled = 0;
    finished = false;
    turn_X = false;
    message.display = "none";
    input.display = "block";
})
reset.onmouseover = () => {
    reset.style.backgroundColor = "rgb(118, 249, 111)";
}
reset.onmouseout = () => {
    reset.style.backgroundColor = "rgb(147, 216, 51)";
}

function Draw() {
    playDraw();
    let blinkCount = 0;
    let intervalId = setInterval(() => {
        boxes.forEach((box) => {
            box.style.backgroundColor = (blinkCount % 2 === 0) ? "rgb(255, 65, 58)" : "white";
        })
        blinkCount++;
        if (blinkCount === 6) {
            clearInterval(intervalId);
            boxes.forEach((box) => {
                box.style.backgroundColor = "rgb(255, 65, 58)";
            })
        }
    }, 400);
    filled = 0;
    finished = false;
    turn_X = false;
}

