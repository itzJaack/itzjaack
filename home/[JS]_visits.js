const VISIT_COUNTER_KEY = "solsrng_visit_counter";
const VISIT_SESSION_KEY = "solsrng_visit_session";
const UPDATE_INTERVAL = 10000;

function formatVisits(visits) {
    if (visits >= 1e9) {
        return (visits / 1e9).toFixed(1) + 'B';
    } else if (visits >= 1e6) {
        return (visits / 1e6).toFixed(1) + 'M';
    } else if (visits >= 1e3) {
        return (visits / 1e3).toFixed(1) + 'K';
    } else {
        return visits.toString();
    }
}

function updateVisitCounter() {
    const visitCounter = document.getElementById("visit-counter");
    let visits = localStorage.getItem(VISIT_COUNTER_KEY);
    const sessionVisit = sessionStorage.getItem(VISIT_SESSION_KEY);

    if (!visits) {
        visits = 0;
    }

    if (!sessionVisit) {
        visits = parseInt(visits) + 1;
        localStorage.setItem(VISIT_COUNTER_KEY, visits);
        sessionStorage.setItem(VISIT_SESSION_KEY, true);
    }

    visitCounter.innerText = `Total Visits: ${formatVisits(visits)}`;
}

function updateTooltip(element, newText) {
    element.setAttribute("data-tooltip", newText);
    element.classList.remove("tooltip-active");
    void element.offsetWidth; // Force reflow
    element.classList.add("tooltip-active");
}

function startCountdown() {
    const visitCounter = document.getElementById("visit-counter");
    let timeLeft = UPDATE_INTERVAL / 1000;

    const countdownInterval = setInterval(() => {
        const visits = localStorage.getItem(VISIT_COUNTER_KEY);
        updateTooltip(visitCounter, `Exact Visits: ${visits} - Update in: ${timeLeft}s`);
        timeLeft--;

        if (timeLeft < 0) {
            clearInterval(countdownInterval);
            startCountdown();
        }
    }, 1000);
}

document.addEventListener("DOMContentLoaded", () => {
    updateVisitCounter();
    setInterval(() => {
        updateVisitCounter();
        startCountdown();
    }, UPDATE_INTERVAL);
    startCountdown();
});
