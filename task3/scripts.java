function appendToDisplay(value) {
    const display = document.getElementById('result');
    display.value += value;
}

function clearDisplay() {
    const display = document.getElementById('result');
    display.value = '';
}

function deleteLast() {
    const display = document.getElementById('result');
    display.value = display.value.slice(0, -1);
}

function calculateResult() {
    const display = document.getElementById('result');
    try {
        // Use Function constructor for safer evaluation than eval()
        const calculate = new Function('return ' + display.value);
        const result = calculate();
        if (Number.isFinite(result)) {
            display.value = result;
        } else {
            display.value = 'Error';
        }
    } catch (error) {
        display.value = 'Error';
    }
}