const clockText = document.querySelector('.clockTimer');
const clockDiv = document.querySelector('.clock');
const increment = document.querySelectorAll('.increment');
const sessionNum = document.querySelector('#sessionNum');
const breakNum = document.querySelector('#breakNum');
const clockType = document.querySelector('.clockType');

let breakTime = 5;
let sessionTime = 25;
let seconds = 60;
let clockRunning = false;
let currentClock = 'clock';

function clock() {
    if (!clockRunning) {
        return
    }
    if (seconds > 0) {
        seconds--;
    } else {
        seconds = 60;
        if (sessionTime === 1) {
            breakClock();
            currentClock = 'break';
            sessionTime = parseInt(sessionNum.innerHTML);
            return;
        } else {
            sessionTime--;
        }
    }
    clockText.innerHTML = `${sessionTime - 1}:${seconds < 10 ? `${'0'+seconds}` : `${seconds}`}`;
    clockType.innerHTML = 'Work!';
    setTimeout(clock, 1000);
}


function breakClock() {
    if (!clockRunning) {
        return
    }
    if (seconds > 0) {
        seconds--;
    } else {
        seconds = 60;
        if (breakTime === 1) {
            clock();
            currentClock = 'clock';
            breakTime = parseInt(breakNum.innerHTML);
            return;
        } else {
            breakTime--;
        }
    }
    clockText.innerHTML = `${breakTime - 1}:${seconds < 10 ? `${'0'+seconds}` : `${seconds}`}`;
    clockType.innerHTML = 'Break!';
    setTimeout(breakClock, 1000);
}


clockDiv.addEventListener('click', function() {
    if (clockRunning){
        clockRunning = false;
    } else {
        clockRunning = true;
        if (currentClock === 'clock') {
            clock();
        } else {
            breakClock();
        }
    }
})


for (let i = 0; i < increment.length; i++) {
    increment[i].addEventListener('click', function() {
        if (this.classList.contains('session')) {
            if (this.classList.contains('add')) {
                sessionTime++;
                sessionNum.innerHTML = sessionTime;
            } else {
                if (sessionTime > 1) {
                    sessionTime--;
                }
                sessionNum.innerHTML = sessionTime;
            }
        } else if (this.classList.contains('break')) {
            if (this.classList.contains('add')) {
                breakTime++;
                breakNum.innerHTML = breakTime;
            } else {
                if (breakTime > 1) {
                    breakTime--;
                }
                breakNum.innerHTML = breakTime;
            }
        }
        resetClock();
    });
}


function resetClock() {
    clockText.innerHTML = `${sessionTime}:00`;
    seconds = 60;
    clockType.innerHTML = '';
}