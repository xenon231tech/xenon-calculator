// State Management
let display = document.getElementById('display');
let historyList = document.getElementById('historyList');
let currentMode = 'basic';
let currentBase = 10;
let memory = 0;
let history = JSON.parse(localStorage.getItem('calcHistory')) || [];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateHistory();
    document.addEventListener('keydown', handleKeyboard);
});

// Theme Toggle
function toggleTheme() {
    document.documentElement.classList.toggle('light-mode');
    localStorage.setItem('theme', document.documentElement.classList.contains('light-mode'));
}

// Load theme preference
if (localStorage.getItem('theme') === 'true') {
    document.documentElement.classList.add('light-mode');
}

// Mode Switching
function switchMode(mode) {
    currentMode = mode;
    
    // Update button states
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Show/hide containers
    document.querySelectorAll('.buttons-container').forEach(container => {
        container.classList.remove('active-mode');
    });
    document.querySelector(`.${mode}-mode`).classList.add('active-mode');
    
    clearDisplay();
}

// Base Switching (Programmer Mode)
function switchBase(base) {
    currentBase = base;
    
    document.querySelectorAll('.base-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
}

// Number Input
function appendNumber(num) {
    if (currentMode === 'programmer' && currentBase !== 10) {
        // Validate input for current base
        const validChars = {
            2: '01',
            8: '01234567',
            16: '0123456789ABCDEFabcdef'
        };
        
        if (!validChars[currentBase].includes(num.toString())) {
            return;
        }
    }
    
    if (display.value === '0' && num !== '.') {
        display.value = num;
    } else if (num === '.' && display.value.includes('.')) {
        return;
    } else {
        display.value += num;
    }
    
    document.getElementById('history').textContent = '';
}

// Operator Input
function appendOperator(op) {
    const lastChar = display.value[display.value.length - 1];
    
    if (lastChar && !['+', '−', '×', '÷', '%', '&', '|'].includes(lastChar)) {
        display.value += op;
        document.getElementById('history').textContent = display.value;
    }
}

// Delete Last Character
function deleteLast() {
    display.value = display.value.slice(0, -1);
}

// Clear Display
function clearDisplay() {
    display.value = '0';
    document.getElementById('history').textContent = '';
}

// Toggle Sign
function toggleSign() {
    const value = parseFloat(display.value);
    display.value = (value * -1).toString();
}

// Scientific Functions
function scientificFunc(func) {
    const value = parseFloat(display.value);
    let result;
    
    try {
        switch(func) {
            case 'sin':
                result = Math.sin(value * Math.PI / 180);
                break;
            case 'cos':
                result = Math.cos(value * Math.PI / 180);
                break;
            case 'tan':
                result = Math.tan(value * Math.PI / 180);
                break;
            case 'sqrt':
                result = Math.sqrt(value);
                break;
            case 'log':
                result = Math.log10(value);
                break;
            case 'ln':
                result = Math.log(value);
                break;
            case 'exp':
                result = Math.exp(value);
                break;
            case 'pow':
                display.value += '^';
                return;
            case 'fact':
                result = factorial(Math.floor(value));
                break;
            case 'pi':
                display.value = Math.PI.toString();
                return;
            case 'e':
                display.value = Math.E.toString();
                return;
            case '1/x':
                result = 1 / value;
                break;
            case 'lshift':
                display.value += '<<';
                return;
            case 'rshift':
                display.value += '>>';
                return;
        }
        
        display.value = result.toString();
    } catch (error) {
        display.value = 'Error';
    }
}

// Factorial
function factorial(n) {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

// Calculate
function calculate() {
    try {
        let expr = display.value;
        
        // Replace operators
        expr = expr.replace(/×/g, '*')
                   .replace(/÷/g, '/')
                   .replace(/−/g, '-')
                   .replace(/\^/g, '**');
        
        // Handle bitwise operators in programmer mode
        if (currentMode === 'programmer') {
            // Convert from current base to decimal
            if (currentBase !== 10) {
                const parts = expr.split(/[+\-*\/&|]/);
                const operators = expr.match(/[+\-*\/&|]/g) || [];
                
                let result = parseInt(parts[0], currentBase);
                for (let i = 0; i < operators.length; i++) {
                    const operand = parseInt(parts[i + 1], currentBase);
                    switch(operators[i]) {
                        case '&': result = result & operand; break;
                        case '|': result = result | operand; break;
                        case '+': result = result + operand; break;
                        case '-': result = result - operand; break;
                        case '*': result = result * operand; break;
                        case '/': result = Math.floor(result / operand); break;
                    }
                }
                
                // Convert back to current base
                display.value = convertToBase(result, currentBase);
            } else {
                display.value = eval(expr);
            }
        } else {
            display.value = eval(expr);
        }
        
        // Add to history
        addToHistory(expr, display.value);
        
    } catch (error) {
        display.value = 'Error';
    }
}

// Convert to Base
function convertToBase(num, base) {
    if (base === 10) return num.toString();
    if (base === 2) return num.toString(2);
    if (base === 8) return num.toString(8);
    if (base === 16) return num.toString(16).toUpperCase();
}

// Memory Functions
function memoryAdd() {
    memory += parseFloat(display.value) || 0;
    showMemoryIndicator();
}

function memorySubtract() {
    memory -= parseFloat(display.value) || 0;
    showMemoryIndicator();
}

function memoryClear() {
    memory = 0;
    showMemoryIndicator();
}

function memoryRecall() {
    display.value = memory.toString();
}

function showMemoryIndicator() {
    console.log('Memory: ' + memory);
}

// History Management
function addToHistory(expression, result) {
    history.unshift({
        expression: expression,
        result: result,
        timestamp: new Date().toLocaleTimeString()
    });
    
    if (history.length > 50) {
        history.pop();
    }
    
    localStorage.setItem('calcHistory', JSON.stringify(history));
    updateHistory();
}

function updateHistory() {
    historyList.innerHTML = history.map((item, index) => `
        <div class="history-item" onclick="recallFromHistory(${index})">
            <div class="history-expression">${item.expression}</div>
            <div class="history-result">= ${parseFloat(item.result).toFixed(6)}</div>
        </div>
    `).join('');
}

function recallFromHistory(index) {
    display.value = history[index].result;
}

function clearHistory() {
    if (confirm('Clear all history?')) {
        history = [];
        localStorage.removeItem('calcHistory');
        updateHistory();
    }
}

// Keyboard Support
function handleKeyboard(event) {
    const key = event.key;
    
    if (key >= '0' && key <= '9') {
        appendNumber(key);
    } else if (key === '.') {
        appendNumber('.');
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        const op = key === '*' ? '×' : key === '/' ? '÷' : key === '-' ? '−' : '+';
        appendOperator(op);
    } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculate();
    } else if (key === 'Backspace') {
        event.preventDefault();
        deleteLast();
    } else if (key === 'Escape') {
        event.preventDefault();
        clearDisplay();
    }
}

// Initialize display
clearDisplay();
