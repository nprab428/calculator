// Global state variables
let currentDisplay; // string of current display
let isNewNumber = true; // bool to determine if digits should append to current display or not
let arg1; // value saved off to be used as first arg in arith. expression
let operation; // saved off operation

// Logic for key presses
window.addEventListener("keydown", function(e) {
  if ((0 <= e.key && e.key <= 9) || e.key == ".") {
    numHelper(e.key);
  } else if (e.key == "%") {
    percentHelper();
  } else if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") {
    operatorHelper(e.key);
  } else if (e.key === "Enter" || e.key === "=") {
    equalsHelper();
  } else if (e.key === "c") {
    clearHelper();
  }
  updateCurrentDisplay();
});

// Logic for front-end clicks
$(function() {
  $(".button").click(function() {
    if ($(this).hasClass("number")) {
      numHelper($(this).text());
    } else if ($(this).hasClass("percent")) {
      percentHelper();
    } else if ($(this).hasClass("plus-minus")) {
      plusMinusHelper();
    } else if ($(this).hasClass("operator")) {
      operatorHelper($(this).text());
    } else if ($(this).hasClass("equals")) {
      equalsHelper();
    } else if ($(this).hasClass("clear")) {
      clearHelper();
    }
    updateCurrentDisplay();
  });
});

function updateCurrentDisplay() {
  $("#display-text").text(currentDisplay);
}

function numHelper(num) {
  $(".clear").text("C");
  currentDisplay = isNewNumber ? num : currentDisplay + num;
  isNewNumber = false;
}

function percentHelper() {
  currentDisplay = 0.01 * currentDisplay;
  isNewNumber = true;
}

function plusMinusHelper() {
  currentDisplay = -1 * currentDisplay;
}

function operatorHelper(opSelected) {
  // if previous operation already saved off, perform it and update display
  tryPerformOperation();

  if (!isNewNumber) {
    arg1 = parseInt(currentDisplay);
  }
  operation = opSelected;
  isNewNumber = true;

  // Reassign active operator
  $(".active-operator").removeClass("active-operator");
  let buttonClass =
    opSelected === "+"
      ? "plus"
      : opSelected === "-"
        ? "minus"
        : opSelected === "X" || opSelected === "*"
          ? "multiply"
          : "divide";
  $(`.${buttonClass}`).addClass("active-operator");
}

function tryPerformOperation() {
  if (operation && arg1 && !isNewNumber) {
    arg2 = parseInt(currentDisplay);
    currentDisplay =
      operation === "+"
        ? arg1 + arg2
        : operation === "-"
          ? arg1 - arg2
          : operation === "X" || operation === "*"
            ? arg1 * arg2
            : arg1 / arg2;
  }
}

function equalsHelper() {
  tryPerformOperation();

  $(".active-operator").removeClass("active-operator");
  arg1 = null;
  operation = null;
  isNewNumber = true;
}

function clearHelper() {
  if ($(".clear").text() === "AC") {
    arg1 = null;
    operation = null;
  }

  currentDisplay = 0;
  $(".clear").text("AC");
  isNewNumber = true;
}
