document.addEventListener('DOMContentLoaded', () => {
  console.log('Hello');

  // const confirmSpace = document.createElement('div');
  const testButton = document.querySelector('#button');
  const clickList = document.getElementById('click-list');

  testButton.addEventListener('click', function () {
    const clickConfirm = document.createElement('p');
    clickConfirm.innerText = 'Button was clicked';
    clickList.appendChild(clickConfirm);
  });
});

// console.log('hello');

// document.addEventListener('DOMContentLoaded', (e) => {
//   console.log('hello again');

//   const testButton = document.querySelector('#button');

//   testButton.addEventListener('click', buttonClicked);

//   function buttonClicked() {
//     window.alert('Button was clicked!');
//   }
// });
