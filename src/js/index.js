import Search from './models/Search';
import * as searchView from './views/searchView';
import {elements,renderLoader,removeLoader} from './views/base';

/**Global state of the app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Linked recipes
 */
const state = {};

const controlSearch = async ()=>{
    //1.Get query from the view
    const query = searchView.getInput();
    
    if(query){
        //2.New search object and add to state
            //create a new Search module to get the recipe data
        state.search = new Search(query);

        //3.Preparing UI for results
            //clear input to empty string
        searchView.clearInput();
            //clear result list to empty
        searchView.clearResults();
            //render loader
        renderLoader(elements.searchRes);            
        //4. Search for recipes
        await state.search.getResult();

        //5. Render result on UI
        searchView.renderResult(state.search.result);
        removeLoader();
    }
}

elements.searchForm.addEventListener('click',e=>{
    e.preventDefault();
    controlSearch();
});

elements.searchResPages.addEventListener('click',e=>{
    const btn = e.target.closest('.btn-inline');
    if(btn){
        const goToPage = parseInt(btn.dataset.goto,10);
        searchView.clearResults();
        searchView.renderResult(state.search.result,goToPage);
        console.log(goToPage);
    }
})


//hahahahah








// import str from './models/Search';

// import {add as a,multiply,ID}from './views/searchView';

// console.log(`Using imported function ${a(ID,2)} and ${multiply(3,5)},${str}`);

























// const $ = require('jquery');
// // Global app controller
// import x from './test';

// const b = 23;
// console.log(`I have imported ${x} from another module test.js and the es6 new variable is ${b}`);


// // //给父元素添加点击事件
// // $('ul').on('click',function(event){
    
// //     //锁定触发事件的子元素
// //     var ele = event.target;
// //     //用传统JS设置CSS属性
// //        ele.style.color = 'red';
// //     //或者转成jQuery对象设置CSS属性
// //        ele = $(ele);
// //        ele.css('color','red');
// // })



// // //给父元素添加点击事件
// // $('ul').on('click',function(event){
// //     //锁定触发事件的子元素
// //     var ele = event.target;
// //     //如果点击的元素不是整个ul就添加类cool
// //     if(ele.nodeName!=="UL"){
// //         ele.classList.toggle('cool');
// //     }
// //   })



// //     $.ajax({
// //        url:url,//请求的地址
// //        type:"get",//或者post 请求的类型
// //        data:data,//发送的数据
// //        success:function(data){
// //          a(data);
// //          b(data);
// //        },
// //        error:function(error){
// //         //数据传输失败的回调函数
// //        }
// //    });

// //    function a (data){}//某个功能
// //    function b (data){}//另一个功能