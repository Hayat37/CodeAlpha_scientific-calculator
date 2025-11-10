// Get the display input
const display = document.getElementById("display");

/* ===== Functions for Buttons ===== */

// Append a value or function to the display
function append(value) {
  display.value += value; // Add the clicked button value to the end of display
}

// Clear the entire display
function clearDisplay() {
  display.value = ""; // Reset display to empty
}

// Delete the last character
function deleteLast() {
  display.value = display.value.slice(0, -1); // Remove last character
}

// Calculate the expression
function calculate() {
  try {
    let expression = display.value;

    // Auto-close any open parentheses
    let openParens = (expression.match(/\(/g) || []).length;
    let closeParens = (expression.match(/\)/g) || []).length;
    expression += ")".repeat(openParens - closeParens);

    // Replace visual operators with JS operators if needed
    expression = expression.replace(/÷/g, "/").replace(/×/g, "*");

    // Evaluate the expression
    let result = eval(expression);

    // Display the result
    display.value = result;
  } catch (error) {
    display.value = "Error"; // Show error if invalid input
  }
}

function toggleSign() {
    let currentValue = document.getElementById("display").value;
  
    if (currentValue === "") return; // Do nothing if empty
  
    // If it already starts with "-", remove it (make positive)
    if (currentValue.startsWith("-")) {
      document.getElementById("display").value = currentValue.substring(1);
    } 
    else {
      // Otherwise, add "-" at the beginning (make negative)
      document.getElementById("display").value = "-" + currentValue;
    }
  }

/* ===== Keyboard Support ===== */
document.addEventListener("keydown", (event) => {
  const key = event.key;

  // Numbers and basic operators
  if (!isNaN(key) || "+-*/.%".includes(key)) {
    append(key);
  }
  // Enter → calculate
  else if (key === "Enter") {
    event.preventDefault();
    calculate();
  }
  // Backspace → delete last
  else if (key === "Backspace") {
    deleteLast();
  }
  // Escape → clear display
  else if (key === "Escape") {
    clearDisplay();
  }
});