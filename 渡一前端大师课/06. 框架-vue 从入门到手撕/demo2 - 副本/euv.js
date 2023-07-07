/**
 * 观察某个对象的所有属性
 * @param {Object} obj
 */
// function observe(obj) {
//   for (const key in obj) {
//     let internalValue = obj[key];
//     let funcs = [];
//     Object.defineProperty(obj, key, {
//       get: function () {
//         //  依赖收集，记录：是哪个函数在用我
//         if (window.__func && !funcs.includes(window.__func)) {
//           funcs.push(window.__func);
//         }
//         return internalValue;
//       },
//       set: function (val) {
//         internalValue = val;
//         // 派发更新，运行：执行用我的函数
//         for (var i = 0; i < funcs.length; i++) {
//           funcs[i]();
//         }
//       },
//     });
//   }
// }

class observe{
  constructor(obj){
    for (const key in obj) {
          let internalValue = obj[key];
          let funcs = [];
          Object.defineProperty(obj, key, {
            get: function () {
              //  依赖收集，记录：是哪个函数在用我
              if (window.__func && !funcs.includes(window.__func)) {
                funcs.push(window.__func);
              }
              return internalValue;
            },
            set: function (val) {
              internalValue = val;
              // 派发更新，运行：执行用我的函数
              for (var i = 0; i < funcs.length; i++) {
                funcs[i]();
              }
            },
          });
        }
  }
  // 显示姓氏
   showFirstName() {
    document.querySelector('#firstName').textContent = '姓：' + user.name[0];
  }

  // 显示名字
   showLastName() {
    document.querySelector('#lastName').textContent = '名：' + user.name.slice(1);
  }

  // // 显示年龄
  //  showAge() {
  //   var birthday = new Date(user.birth);
  //   var today = new Date();
  //   today.setHours(0), today.setMinutes(0), today.setMilliseconds(0);
  //   thisYearBirthday = new Date(
  //     today.getFullYear(),
  //     birthday.getMonth(),
  //     birthday.getDate()
  //   );
  //   var age = today.getFullYear() - birthday.getFullYear();
  //   if (today.getTime() < thisYearBirthday.getTime()) {
  //     age--;
  //   }
  //   document.querySelector('#age').textContent = '年龄：' + age;
  // }
}


function autorun(fn) {
  window.__func = fn;
  fn();
  window.__func = null;
}