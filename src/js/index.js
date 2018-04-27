
const $ = require('jquery');
// Global app controller
import x from './test';

const b = 23;
console.log(`I have imported ${x} from another module test.js and the es6 new variable is ${b}`);


// //给父元素添加点击事件
// $('ul').on('click',function(event){
    
//     //锁定触发事件的子元素
//     var ele = event.target;
//     //用传统JS设置CSS属性
//        ele.style.color = 'red';
//     //或者转成jQuery对象设置CSS属性
//        ele = $(ele);
//        ele.css('color','red');
// })



// //给父元素添加点击事件
// $('ul').on('click',function(event){
//     //锁定触发事件的子元素
//     var ele = event.target;
//     //如果点击的元素不是整个ul就添加类cool
//     if(ele.nodeName!=="UL"){
//         ele.classList.toggle('cool');
//     }
//   })



//     $.ajax({
//        url:url,//请求的地址
//        type:"get",//或者post 请求的类型
//        data:data,//发送的数据
//        success:function(data){
//          a(data);
//          b(data);
//        },
//        error:function(error){
//         //数据传输失败的回调函数
//        }
//    });

//    function a (data){}//某个功能
//    function b (data){}//另一个功能