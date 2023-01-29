const startStopBtn = document.getElementById("startStopBtn");
const resetBtn = document.getElementById("resetBtn");
const lap = document.getElementById("lap");

var lapTimes = [];

let seconds = 0;
let minutes = 0;
let hours = 0;

let leadingSeconds = 0;
let leadingMinutes = 0;
let leadingHours = 0;

let timerStatus = "stopped";
let timerInterval = null;

function stopWatch() {
    seconds++;
    if (seconds === 60) {
        seconds = 0;
        minutes++;
        if (minutes === 60) {
            minutes = 0;
            hours++;
        }
    }
    if (seconds < 10) {
        leadingSeconds = "0" + seconds.toString();
    } else {
        leadingSeconds = seconds;
    }
    if (minutes < 10) {
        leadingMinutes = "0" + minutes.toString();
    } else {
        leadingMinutes = minutes;
    }
    if (hours < 10) {
        leadingHours = "0" + hours.toString();
    } else {
        leadingHours = hours;
    }
    let timeDisplayer = (document.getElementById("timer").innerText =
        leadingHours + ":" + leadingMinutes + ":" + leadingSeconds);
}

startStopBtn.addEventListener("click", function () {
    if (timerStatus === "stopped") {
        timerInterval = window.setInterval(stopWatch, 10);
        document.getElementById("startStopBtn").innerHTML =
            '<i class="fa-solid fa-pause" id="pause"></i>';
        timerStatus = "started";
    } else {
        window.clearInterval(timerInterval);
        document.getElementById("startStopBtn").innerHTML =
            '<i class="fa-solid fa-play" id="play"></i>';
        timerStatus = "stopped";
    }
});
resetBtn.addEventListener("click", reset);
function reset() {
    window.clearInterval(timerInterval);
    document.getElementById("timer").innerHTML = "00:00:00";
    seconds = 0;
    minutes = 0;
    hours = 0;
    document.getElementById("startStopBtn").innerHTML =
        '<i class="fa-solid fa-play" id="play"></i>';
    timerStatus = "stopped";
    lapTimes = [];
    var lapList = document.getElementById("lap-list");
    lapList.innerHTML = "";
    lap.style.backgroundColor = "darkblue";
}
lap.addEventListener("click", lapFunction);

function lapFunction() {
    if (timerStatus != "stopped") {
        if (lapTimes.length < 5) {
            lapTimes.push(hours + ":" + minutes + ":" + seconds);
            var lapList = document.getElementById("lap-list");
            var newLap = document.createElement("li");
            newLap.innerHTML =
                "Lap " +
                lapTimes.length +
                ": " +
                leadingHours +
                ":" +
                leadingMinutes +
                ":" +
                leadingSeconds;
            lapList.appendChild(newLap);
        } else {
            lap.style.backgroundColor = "gray";
        }
    }
}
