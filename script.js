const calcHistory = document.querySelector(".history");
const calCurrent = document.querySelector(".current");
const numberBtns = document.querySelectorAll("[data-number]");
const clearBtn = document.querySelector("#clearBtn");
const deleteBtn = document.querySelector("#delBtn");
const operators = document.querySelectorAll("[data-operator]");
const equalsBtn = document.querySelector("#equalsBtn");
const pointBtn = document.querySelector("#pointBtn");

const listOfOperators = new Set();

numberBtns.forEach((numberBtn) => {
  numberBtn.addEventListener("click", appendNumber);
});

clearBtn.addEventListener("click", clear);

deleteBtn.addEventListener("click", deleteNumber);

equalsBtn.addEventListener("click", handleEqualsBtn);

pointBtn.addEventListener("click", handleApendPoint);

function handleApendPoint() {
  if (calCurrent.textContent === "") {
    calCurrent.textContent = "0.";
    return;
  }
  if (checkIfPointExist(calCurrent.textContent)) {
    if (calCurrent.textContent.match(/^\d+.\d[÷+%−x]\d+$/)) {
      calCurrent.textContent += ".";
    }
    return;
  }
  calCurrent.textContent += ".";
}

function checkIfPointExist(word) {
  for (let w of word) {
    if (w === ".") {
      return true;
    }
  }
  return false;
}

operators.forEach((op) => {
  listOfOperators.add(op.dataset.operator);
  op.addEventListener("click", appendOperator);
});

function appendNumber() {
  calCurrent.textContent += this.innerHTML;
}

function deleteNumber() {
  calCurrent.textContent = calCurrent.textContent.substring(
    0,
    calCurrent.textContent.length - 1
  );
}

function handleEqualsBtn() {
  let operator = checkForOperator(calCurrent.textContent);
  if (calCurrent.textContent === "") return;
  if (
    operator &&
    calCurrent.textContent.substring(calCurrent.textContent.length - 1) !==
      operator
  ) {
    let result = evaluate(operator);
    calCurrent.textContent = result;
  }
  return;
}

function appendOperator() {
  let operator = checkForOperator(calCurrent.textContent);
  if (
    calCurrent.textContent === "" ||
    operator ===
      calCurrent.textContent.substring(calCurrent.textContent.length - 1)
  )
    return;
  if (operator) {
    let result = evaluate(operator);
    calCurrent.textContent = result;
  }
  calCurrent.textContent += this.dataset.operator;
}
function evaluate(op) {
  let text = calCurrent.textContent;
  let arr = text.split(op);
  result = operate(arr[0], op, arr[1]);
  updateHistory(arr[0], op, arr[1]);
  return result;
}

function updateHistory(a, b, c) {
  calcHistory.textContent = a + b + c;
}

function checkForOperator(word) {
  for (let i of word) {
    if (listOfOperators.has(i)) return i;
  }
}

function operate(num1, op, num2) {
  num1 = Number(num1);
  num2 = Number(num2);
  switch (op) {
    case "+":
      return add(num1, num2);

    case "−":
      return sub(num1, num2);

    case "÷":
      return divide(num1, num2);

    case "x":
      return multiply(num1, num2);

    case "%":
      return modulus(num1, num2);
    default:
      break;
  }
}

function add(num1, num2) {
  return num1 + num2;
}

function sub(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  if (num2 === 0) return "Math Error";
  return num1 / num2;
}

function modulus(num1, num2) {
  return num1 % num2;
}

function clear() {
  calCurrent.innerHTML = "";
  calcHistory.innerHTML = "";
}
