// console.log('import module');
// export default 123;



// $().ready(//等HTML的DOM树加载完再执行代码，避免出现一些获取不到元素的BUG。
//     function(){

//     }
//   )
// window.onload = function(){//更彻底，甚至等页面中的css,image都加载完毕再执行

// }

  
//   var singleBoy = (function(){

// })();


// var singleGirl = (function(){

// })();

// //函数自执行模块，一般首字母大写
// //写法1
// var AutoFunction = (function(){
//     //在这里写需要的代码
// })
// //写法2
// var AutoFunction2 = !function(){
//     //在这里写需要的代码
// }()

// var Display = (function(){/*专门操纵显示部分的代码}*/})()
// var Saver = (function(){/*专门操纵数据的代码}*/})()

// //综合性功能模块儿，用来对上述两个模块进行整合
// var Controller = (function(dis,sav){

// })(Display,Saver)


// var test = (function(){
//     //私有变量，外面不可见
//     var obj = {word:"Rule the world"};
//     //私有方法
//     function say(word){console.log(word)}
    
//     return{
//       //类似于JAVA的get方法，取得字符串
//       getWord:function(){return obj.word},
//        //初始化方法
//       init:function(){
//         //this是指这个return的对象也就是test
//         //调用test内部的getWord方法
//         say(this.getWord());
//       }
//     }
//   })()
  
//   test.init();//输出Rule the world

//   //添加点击事件
//   ele.onclick = function(){/*事件相关的代码*/}
//   ele.addEventListener('click',function(e){alert('I love you all')})
//   ele.addEventListener('click',function(e){alert('I love you all')})
//   ele.addEventListener('click',function(e){alert('I love you all')})
//   ele.addEventListener('click',function(e){alert('I love you all')})

//   var ele = document.querySelector(ele);//选中一个普通的DOM元素
//       ele = $(ele);//转换成jQuery对象，就像钢铁侠变身一样

//       //新建一个空对象
//       var man = {};

//       man.name = 'Arthur';//名字'亚瑟'

//       man.height = '180cm';//身高'180cm'

//       man.sex = 'male';//性别'男'

//       man.weapon = 'golden sword';//武器'黄金剑'

//       man.attack = function(){//定义'攻击'这个方法
//         console.log(man.name+' attacks the dragon with a '+man.weapon+'.')
//       }
      
//       man.attack()//调用攻击这个方法

//       //新建对象，用{}包裹
//       var man = {
//         //添加属性，属性（除了最后一个）间用逗号分隔
//         name:'Arthur',

//         height:'180cm',

//         sex:'male',

//         weapon:'golden sword',

//         attack: function(){
//           console.log(man.name+' attacks the dragon with a '+man.weapon+'.')
//         }
//       };

//       man.attack();

      
//       for(var key in man){
//         console.log(man[key]);
//       }



