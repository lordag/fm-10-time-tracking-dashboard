let filter_buttons = document.querySelectorAll('.change_filter');

const fetchData = (filter, label) => {
    console.log(label)
    fetch('./data.json').then((response) => {
        if(!response.ok){
            console.log('Something went wrong!')
        }
        return response.json();
    }).then((data) => {
        for (let elem of data){
            let key = elem.title.toLowerCase().replace(' ', '__');
            populate(key,label, elem.timeframes[filter].current, elem.timeframes[filter].previous)
        }
    })
}

const populate = ( id, label, current, previous) => {
    document.querySelector(`#${id} .current`).innerHTML = `${current}hrs`;
    document.querySelector(`#${id} .previous`).innerHTML = `Last ${label} - ${previous}hrs`;        
}

const load = (filter, label) => {
    fetchData(filter, label);
}

const resetButtonsState = () => {
    filter_buttons.forEach(button => {
        button.classList.remove('active')
    });
}

filter_buttons.forEach(button => {
    button.addEventListener('click', function (event) {
        let filter = event.target.dataset.value;
        let label = event.target.dataset.label;
        console.log(label)
        resetButtonsState();
        event.target.classList.add('active')
        load(filter, label);
    });
});

load('daily', 'Day');
