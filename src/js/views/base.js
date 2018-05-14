export const elements = {
    searchInput:document.querySelector('.search__field'),
    searchForm:document.querySelector('.search'),
    searchResList:document.querySelector('.results__list'),
    searchRes:document.querySelector('.results'),
};

const DOMString = {
    loader:'loader'
}

export const renderLoader = parent =>{
    const loader = `
        <div class="${DOMString.loader}">
            <svg>
                <use href="./img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;
    parent.insertAdjacentHTML('afterbegin',loader);
}

export const removeLoader = () =>{
    const loader = document.querySelector(`.${DOMString.loader}`);
    loader.parentElement.removeChild(loader);
}
//test