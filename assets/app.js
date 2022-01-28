document.addEventListener('DOMContentLoaded', () => {
  // console.log('Hello');
  const fruitInput = document.getElementById('fruitInput');
  const addButton = document.getElementById('addButton');
  const getFruits = document.getElementById('getFruits');
  const fruitList = document.getElementById('fruitList');
  const dbFruits = document.getElementById('dbFruits');

  addButton.addEventListener('click', addFruitFunc);
  getFruits.addEventListener('click', getFruitsFunc);

  function addFruitFunc() {
    const clickConfirm = document.createElement('p');
    clickConfirm.innerText = fruitInput.value;
    fruitList.appendChild(clickConfirm);
  }

  async function getFruitsFunc() {
    const response = await fetch('/getFruits', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json());
    console.log(response.fruits);
    let fruitArr = response.fruits;
    fruitArr.forEach((el) => {
      console.log('from fetch: ', el.fruits);
      const fruit = document.createElement('p');
      fruit.innerText = el.fruits;
      dbFruits.appendChild(fruit);
    });
  }
});
