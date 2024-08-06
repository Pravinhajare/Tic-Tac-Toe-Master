var turn = Math.random() < 0.5,
  boardvals = new Array(9),
  doit = true,
  atall = true;

function setSquares() {
  for (var i = 0; i < 9; i++) {
    let cell = document.getElementById(String(i));
    cell.classList.remove("flicker"); // Remove flicker class on reset
    switch (boardvals[i]) {
      case true:
        cell.innerHTML = "O";
        cell.style.color = "#00cb00"; // Color for O
        break;
      case undefined:
        cell.innerHTML = "";
        cell.style.color = ""; // No color
        break;
      default:
        cell.innerHTML = "X";
        cell.style.color = "#ff9933"; // Color for X
    }
  }
  document.getElementById("turn").innerHTML = turn ? "O" : "X";
}

function reset() {
  turn = Math.random() < 0.5;
  boardvals = new Array(9);
  setSquares();
  document.getElementById("win").style.display = "none";
  document.getElementById("mes").style.display = "block";
  document.getElementById("turn").innerHTML = turn ? "O" : "X";
  atall = true;
}

function CBV(arr) {
  return (boardvals[arr[0]] === boardvals[arr[1]]) && (boardvals[arr[1]] === boardvals[arr[2]]) && (boardvals[arr[0]] != undefined);
}

function checkForWin() {
  if (CBV([0, 1, 2]) || CBV([3, 4, 5]) || CBV([6, 7, 8]) || CBV([0, 3, 6]) || CBV([1, 4, 7]) || CBV([2, 5, 8]) || CBV([0, 4, 8]) || CBV([2, 4, 6])) {
    document.getElementById("tada").play();
    document.getElementById("win").style.display = "block";
    document.getElementById("mes").style.display = "none";
    document.getElementById("winner").innerHTML = turn ? "X" : "O";
    atall = false;
    applyFlickerEffect(); // Apply flicker effect
    setTimeout(() => {
      reset();
    }, 3000); // Reset after 3 seconds
    return;
  }
  var f = true;
  for (var i = 0; i < 9; i++) {
    if (boardvals[i] == undefined) {
      f = false;
    }
  }
  if (f) {
    document.getElementById("win").style.display = "block";
    document.getElementById("mes").style.display = "none";
    document.getElementById("winner").innerHTML = "No one";
    atall = false;
    applyFlickerEffect(); // Apply flicker effect
    setTimeout(() => {
      reset();
    }, 2000); // Reset after 2 seconds
  }
}

function move(cin) {
  doit = true;
  if (boardvals[cin] !== undefined) {
    // Prevent changing the value once it's set
    doit = false;
  } else {
    boardvals[cin] = turn;
  }
  if (doit && atall) {
    document.getElementById("pop").play();
    turn = !turn;
    setSquares();
    checkForWin();
  }
}

function applyFlickerEffect() {
  for (var i = 0; i < 9; i++) {
    document.getElementById(String(i)).classList.add("flicker");
  }
}
