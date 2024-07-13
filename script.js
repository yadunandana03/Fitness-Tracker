document.addEventListener('DOMContentLoaded', () => {
    const workoutForm = document.getElementById('workoutForm');
    const logList = document.getElementById('logList');
    const goalForm = document.getElementById('goalForm');
    const goalsUl = document.getElementById('goalsUl');
    const progressChartCtx = document.getElementById('progressChart').getContext('2d');
    const navLinks = document.querySelectorAll('.nav-list a');

    navLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();

            const targetId = link.getAttribute('href').substring(1); // Get target id from href attribute
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                const offsetTop = targetSection.offsetTop;

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    let workouts = [];
    let goals = [];
    let progressChart;

    // Initialize the chart with empty data
    function initializeChart() {
        progressChart = new Chart(progressChartCtx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'Calories Burned',
                    data: [],
                    backgroundColor: 'rgba(78, 99, 142, 0.5)',
                    borderColor: 'rgba(43, 69, 112, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    x: {
                        beginAtZero: true
                    },
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    initializeChart();

    workoutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const workoutType = document.getElementById('workoutType').value;
        const duration = document.getElementById('duration').value;
        const calories = document.getElementById('calories').value;

        const workout = {
            workoutType,
            duration: parseInt(duration),
            calories: parseInt(calories),
            date: new Date()
        };

        workouts.push(workout);
        renderWorkouts();
        updateProgressChart();
    });

    goalForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const goalType = document.getElementById('goalType').value;
        const goalValue = document.getElementById('goalValue').value;

        const goal = {
            goalType,
            goalValue: parseInt(goalValue),
        };

        goals.push(goal);
        renderGoals();
    });

    function renderWorkouts() {
        logList.innerHTML = '';
        workouts.forEach(workout => {
            const li = document.createElement('li');
            li.innerHTML = `${workout.date.toLocaleString()}: ${workout.workoutType} for ${workout.duration} minutes, ${workout.calories} calories burned.`;
            logList.appendChild(li);
        });
    }

    function renderGoals() {
        goalsUl.innerHTML = '';
        goals.forEach(goal => {
            const li = document.createElement('li');
            li.innerHTML = `Goal: ${goal.goalType} - ${goal.goalValue}`;
            goalsUl.appendChild(li);
        });
    }

    function updateProgressChart() {
        const dateTimes = workouts.map(workout => workout.date.toLocaleString());
        const calories = workouts.map(workout => workout.calories);

        progressChart.data.labels = dateTimes;
        progressChart.data.datasets[0].data = calories;
        progressChart.update();
    }
});
