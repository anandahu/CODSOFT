document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('result');
    const buttonsContainer = document.querySelector('.buttons');

    buttonsContainer.addEventListener('click', (event) => {
        const target = event.target;

        // Ignore clicks that are not on a button
        if (!target.matches('button')) {
            return;
        }

        const value = target.dataset.value;
        const action = target.dataset.action;

        if (value) {
            appendToDisplay(value);
        }

        if (action === 'clear') {
            clearDisplay();
        }

        if (action === 'delete') {
            deleteLast();
        }

        if (action === 'calculate') {
            calculateResult();
        }
    });

    function appendToDisplay(value) {
        const lastChar = display.value[display.value.length - 1];
        const operators = ['+', '-', '*', '/', '%'];

        // Prevent multiple operators, but allow replacing the last one
        if (operators.includes(lastChar) && operators.includes(value)) {
            display.value = display.value.slice(0, -1) + value;
            return;
        }

        // Prevent multiple decimal points in one number segment
        const currentNumberSegment = display.value.split(/[\+\-\*\/%]/).pop();
        if (value === '.' && currentNumberSegment.includes('.')) {
            return;
        }

        display.value += value;
    }

    function clearDisplay() {
        display.value = '';
    }

    function deleteLast() {
        display.value = display.value.slice(0, -1);
    }

    function calculateResult() {
        try {
            // Using Function constructor is safer than eval() for evaluating the expression.
            let expression = display.value.replace(/%/g, '/100');
            const result = new Function('return ' + expression)();
            display.value = parseFloat(result.toPrecision(15));
        } catch (error) {
            display.value = 'Error';
        }
    }
});