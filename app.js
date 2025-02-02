const Day = document.getElementById('day');
const Month = document.getElementById('month');
const Year = document.getElementById('year');

let dateValues = {day: [0, false], month: [0, false], year: [0, false]};

/* VALIDATION */

function Validate(el, type) {
    /* el == input */
    let isValid = 0;
    switch (type) {
        case 'day':
            const month = dateValues['month'][0];
            const year = dateValues['year'][0];

            // Liczba dni w poszczególnych miesiącach
            const daysInMonth = {
                1: 31, 2: 28, 3: 31, 4: 30, 5: 31, 6: 30,
                7: 31, 8: 31, 9: 30, 10: 31, 11: 30, 12: 31
            };

            // Sprawdzamy rok przestępny
            if ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)) {
                daysInMonth[2] = 29;
            }

            isValid = el > 0 && el <= daysInMonth[month];
            console.log(daysInMonth[month]);
            if (!isValid) {
                Day.classList.add('error');
                Day.querySelector('p').innerText = 'Must be a valid Day';
            }
            else {
                Day.classList.remove('error');
            }
            return isValid;
        case 'month':
            Validate(dateValues['day'][0], 'day');
            isValid = (el > 0 && el <= 12);
            if (!isValid) {
                Month.classList.add('error');
                Month.querySelector('p').innerText = 'Must be a valid Month';
            }
            else {
                Month.classList.remove('error');
            }
            return isValid;
        case 'year':
            Validate(dateValues['month'][0], 'month');
            isValid = (el > 0 && el <= 2025);
            if (!isValid) {
                Year.classList.add('error');
                Year.querySelector('p').innerText = 'Must be a valid Year';
            }
            else {
                Year.classList.remove('error');
            }
            return isValid;
    }
}

/* CALCULATOR */
const years = document.getElementById('years');
const months = document.getElementById('months');
const days = document.getElementById('days');

/* USER INPUT */
const forms = document.querySelectorAll('form');

forms.forEach(form => {
    const input = form.querySelector('input');
    input.addEventListener('input', event => {

        event.preventDefault();

        let user_input = event.target.value;
        let id = form.id;

        if (user_input) {
            dateValues[id][0] = user_input;
            dateValues[id][1] = Validate(user_input, id);
        }
        else {
            dateValues[id][0] = 0;
        }
        
    })
    form.addEventListener('submit', event => {
        event.preventDefault();
    })
});

/* AGE */
function calculateAge(bYear, bMonth, bDay) {
    /* Aktualna data */
    const today = new Date();
    const cYear = today.getFullYear();
    const cMonth = today.getMonth() + 1; // Miesiące w JS są liczone od 0
    const cDay = today.getDate();

    let yearDiff = cYear - bYear;
    let monthDiff = cMonth - bMonth;
    let dayDiff = cDay - bDay;

    // Jeśli dzień urodzenia jest później w miesiącu niż dzisiejszy dzień
    if (dayDiff < 0) {
        monthDiff--; // Odejmujemy jeden miesiąc
        const previousMonth = new Date(cYear, cMonth - 1, 0); // Ostatni dzień poprzedniego miesiąca
        dayDiff = previousMonth.getDate() + dayDiff;
    }

    // Jeśli miesiąc urodzenia jest później w roku niż dzisiejszy miesiąc
    if (monthDiff < 0) {
        yearDiff--; // Odejmujemy rok
        monthDiff += 12;
    }

    return [yearDiff, monthDiff, dayDiff];
}

/* SUBMIT BUTTON */
const submitButton = document.querySelector('svg');
submitButton.addEventListener('click', () => {
    if (dateValues['day'][1] === true && dateValues['month'][1] === true && dateValues['year'][1] === true) {   
        let result = calculateAge(dateValues['year'][0], dateValues['month'][0], dateValues['day'][0]);
        years.innerText = result[0];
        months.innerText = result[1];
        days.innerText = result[2];
    }
});