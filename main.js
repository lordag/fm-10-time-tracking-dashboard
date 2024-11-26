let filter_buttons = document.querySelectorAll('.change_filter');

const fetchData = (filter, label) => {
    
    fetch('./data.json').then((response) => {
        return response.json();
    }).then((data) => {
        for (let elem of data){
            const key = elem.title.toLowerCase().replace(' ', '-');
            populate(key,label, elem.timeframes[filter].current, elem.timeframes[filter].previous)
        }
    }).catch((error) => {
        console.log('Something went wrong!', error)
    });
}

// Add current and previous hours text
const populate = ( id, label, current, previous) => {
    document.querySelector(`.activity__${id} .activity__container__hrs__current`).innerText = `${current}hrs`;
    document.querySelector(`.activity__${id} .activity__container__hrs__previous`).innerText = `Last ${label} - ${previous}hrs`;        
}

// Load data by filter
const load = (filter, label) => {
    fetchData(filter, label);
}

const resetButtonsState = () => {
    filter_buttons.forEach(button => {
        button.classList.remove('userbox__list--active')
    });
}

filter_buttons.forEach(button => {
    button.addEventListener('click', function (event) {    
        const {target} = event
        const { dataset: {value, label} } = target;
        
        resetButtonsState();
        event.target.classList.add('userbox__list--active')
        load(value, label);
    });
});

load('daily', 'Day');
