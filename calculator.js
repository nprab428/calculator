// Global state variables
let currentDisplay = "0"; // string of current display, defaults to 0
let arg1 = Number(currentDisplay); // value saved off to be used as first arg in arith. expression
let isNewNumber = true; // bool to determine if digits should append to current display or not
let operation; // saved off operation

$(function() {
  // Logic for key presses
  $(document).on("keydown", function(e) {
    if (0 <= e.key && e.key <= 9) {
      $(`#number${e.key}`).addClass("pressed");
      numHelper(e.key);
    } else if (e.key == ".") {
      $("#numberdot").addClass("pressed");
      numHelper(e.key);
    } else if (e.key == "%") {
      $("#percent").addClass("pressed");
      percentHelper();
    } else if (
      e.key === "+" ||
      e.key === "-" ||
      e.key === "*" ||
      e.key === "/"
    ) {
      $(`#operator\\${e.key}`).addClass("pressed");
      operatorHelper(e.key);
    } else if (e.key === "Enter" || e.key === "=") {
      $("#equals").addClass("pressed");
      equalsHelper();
    } else if (e.key === "c") {
      $("#clear").addClass("pressed");
      clearHelper();
    }
    updateCurrentDisplay();
  });

  // Logic for front-end clicks
  $(".button").click(function() {
    $(this).addClass("pressed");
    if ($(this).is('[id^="number"]')) {
      numHelper($(this).text());
    } else if ($(this).is("#percent")) {
      percentHelper();
    } else if ($(this).is("#plus-minus")) {
      plusMinusHelper();
    } else if ($(this).is('[id^="operator"]')) {
      operatorHelper($(this).text());
    } else if ($(this).is("#equals")) {
      equalsHelper();
    } else if ($(this).is("#clear")) {
      clearHelper();
    }
    updateCurrentDisplay();
  });

  // Remove class for all buttons after pressed transition
  $(".button").each(function() {
    $(this).on("transitionend", function() {
      $(this).removeClass("pressed");
    });
  });
});

function updateCurrentDisplay() {
  $("#display-text").text(currentDisplay);
}

function numHelper(num) {
  $("#clear").text("C");
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

  // covers case when additional operator is used after an arg2
  if (!isNewNumber) {
    arg1 = Number(currentDisplay);
  }
  operation = opSelected;
  isNewNumber = true;

  // Reassign active operator
  $(".active-operator").removeClass("active-operator");
  let buttonId =
    opSelected === "+"
      ? "operator\\+"
      : opSelected === "-"
      ? "operator\\-"
      : opSelected === "X" || opSelected === "*"
      ? "operator\\*"
      : "operator\\/";
  $(`#${buttonId}`).addClass("active-operator");
}

function tryPerformOperation() {
  if (operation && !isNewNumber) {
    arg2 = Number(currentDisplay);
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
  arg1 = Number(currentDisplay);
  operation = null;
  isNewNumber = true;
}

function clearHelper() {
  if ($("#clear").text() === "AC") {
    arg1 = null;
    operation = null;
  }

  currentDisplay = 0;
  $("#clear").text("AC");
  isNewNumber = true;
}
