const output = document.querySelector('.output');
const hint = document.querySelector('.hint');
const clearBtn = document.querySelector('#clear');
const btn = document.querySelectorAll('.btn');

let equation = '';


for (let i = 0; i < btn.length; i++) {
    btn[i].addEventListener('click', function() {
        const btn = this.innerHTML;
        if (btn === 'CLEAR') {
            equation = '';
        } else if (btn === 'DEL') {
            equation = equation.slice(0, -1);
        } else if (btn === '=') {
            // solve
            const result = solve(equation);
            if (!result) {
                alert('Bad Equation');
            } else {
                equation = result;
            }
        } else {
            if (equation.length <= 14) {
                equation += btn;
            }
        }
        updateCalc();
    });
}


function updateCalc() {
    output.innerHTML = equation;
    const hintAns = solve(equation)
    if (!hintAns) {
        hint.innerHTML = '';
    } else {
        hint.innerHTML = hintAns;
    }
}

function solve(eq) {
    const parsedEq = eq.replace('x', '*').replace('÷', '/');
    console.log(parsedEq);
    try {
        return parseFloat(eval(parsedEq).toFixed(8)).toString();
    } catch (err) {
        return false;
    }
    
}