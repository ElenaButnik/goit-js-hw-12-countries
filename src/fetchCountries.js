import './sass/main.scss';
import countryCard from './templates/country-card.hbs';


const refs = {
    countryContainer: document.querySelector('.js-card-container'),
    searchForm: document.querySelector('.js-input-form'),
};

refs.searchForm.addEventListener('input', onSearchInput);
//let SearchQuery = " ";


function onSearchInput (e) {
    //e.preventDefault();

    //const form = e.currentTarget;
   // console.log(form.elements);
  // let SearchQuery = form.elements.query.value;
  // const input = e.currentTarget;
 
 let  SearchQuery = refs.searchForm.value;

fetchCountries(SearchQuery)
.then(renderCountries)
.catch(err => console.log(err));
}

function fetchCountries(name) {
 return  fetch(`https://restcountries.eu/rest/v2/name/${name}`)

.then(response => {
    return response.json();
} 
);
}

function renderCountries(country) {
    const markup = countryCard(country);
    refs.countryContainer.innerHTML = markup;
}


