import './sass/main.scss';
import countryCard from './templates/country-card.hbs';
import countryList from './templates/country-list.hbs';
import { debounce } from 'lodash';
import { alert, error } from '../node_modules/@pnotify/core/dist/PNotify.js';
  

const refs = {
    countryContainer: document.querySelector('.js-card-container'),
    searchForm: document.querySelector('.js-input-form'),
};

refs.searchForm.addEventListener('input', debounce(onSearchInput, 500));
refs.searchForm.addEventListener('keyup', debounce(onErrorSearch, 300));

function onErrorSearch () {
  this.value = this.value.replace(((/[\d]/g) && (/[^a-zA-Z\s]+$/)),'');
}

// if (onErrorSearch) {
//   alert ({
//     text: 'Please enter your search in English!'
// }) 
// }

function onSearchInput (e) {
  refs.countryContainer.innerHTML = ' ';

 let SearchQuery = refs.searchForm.value;

fetchCountries(SearchQuery)
.then(renderCountries)
.catch(err => console.log(err));
}

function fetchCountries(name) {
 return  fetch(`https://restcountries.eu/rest/v2/name/${name}`)

.then(response => {
if(response.ok) {
 return response.json()
}
alert ({
  text: 'Please enter your search in English!'
}) 
}  );
}

function listMarkup (country) {
    const listMarkup = countryList(country);
    refs.countryContainer.innerHTML = listMarkup;
}

function markup (country) {
   const markup = countryCard(country);
   refs.countryContainer.innerHTML = markup;   
}

function renderCountries(country) {
    
    if(country.length > 10) {
      return error({
        text: 'Too many matches found. Please enter a more specific query!'
    }) 
    }

    if(country.length >= 2 && country.length <= 10){
      return listMarkup(country);  
    }

    if(country.length === 1) {
        return markup(country)
    }    
}
