import './sass/main.scss';
import countryCard from './templates/country-card.hbs';


const refs = {
    countryContainer: document.querySelector('.js-input-form'),
}

fetch('https://restcountries.eu/rest/v2/alpha/col')
.then(response => console.log(response.json()))
.then(country => {
    const markup = countryCard(country);
    console.log(markup);
    refs.countryContainer.innerHTML = markup;
})
.catch(err => console.log(err))
