let display = document.getElementById('display');

function appendNumber(num) {
    display.value += num;
}

function appendOperator(op) {
    if (display.value && !isOperator(display.value[display.value.length - 1])) {
        display.value += op;
    }
}

function isOperator(char) {
    return ['+', '-', '×', '/', '%'].includes(char);
}

function calculate() {
    try {
        let expr = display.value.replace(/×/g, '*').replace(/−/g, '-');
        display.value = eval(expr);
    } catch {
        display.value = 'Error';
    }
}

function clearDisplay() {
    display.value = '';
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}