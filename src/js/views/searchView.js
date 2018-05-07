import {elements} from './base';

//get input value from user
export const getInput = () => elements.searchInput.value;
//clear leftover search input
export const clearInput = () => {
    elements.searchInput.value = '';
};
//clear the orginal result
export const clearResults = ()=>{
    elements.searchResList.innerHTML = '';
}
//limit the length for each title of recipe, the exceeding words will be shorten as '...'
const limitRecipeTitle = (title,limit = 17)=>{
    const newTitle = [];
    if(title.length>limit){
        title.split(' ').reduce((acc,current)=>{
            if(acc+current.length<=limit){
                newTitle.push(current);
            }

            return acc+current.length;
        },0)

        return `${newTitle.join(' ')}...`
    }

    return title;
}

//concat HTML with received data from the API
const renderRecipe = recipe =>{
    const markup = `
    <li>
        <a class="results__link" href="#${recipe.recipe_id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="${recipe.title}">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>
    `;
    //inject HTML template into the website
    elements.searchResList.insertAdjacentHTML('beforeend',markup);
}

//deal with the result of an array,
//which the ideal way to loop through it is to use forEach method
export const renderResult = recipes => {
    recipes.forEach(el => renderRecipe(el));
};