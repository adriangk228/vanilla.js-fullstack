document.addEventListener('DOMContentLoaded', () => {
  // console.log('Hello');
  const fruitInput = document.getElementById('fruitInput');
  const testButton = document.getElementById('addButton');
  const fruitList = document.getElementById('fruitList');

  testButton.addEventListener('click', function () {
    const clickConfirm = document.createElement('p');
    clickConfirm.innerText = fruitInput.value;
    fruitList.appendChild(clickConfirm);
  });
});
