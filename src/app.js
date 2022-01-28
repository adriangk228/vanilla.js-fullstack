document.addEventListener('DOMContentLoaded', () => {
  // console.log('Hello');
  const fruitInput = document.getElementById('fruitInput');
  const addButton = document.getElementById('addButton');
  const getFruits = document.getElementById('getFruits');
  const dbFruits = document.getElementById('dbFruits');

  addButton.addEventListener('click', addFruitFunc);
  getFruits.addEventListener('click', getFruitsFunc);

  const idCache = {};

  async function addFruitFunc() {
    // const clickConfirm = document.createElement('p');
    // clickConfirm.innerText = fruitInput.value;
    // fruitList.appendChild(clickConfirm);

    const newFruit = fruitInput.value;
    if (newFruit) {
      const response = await fetch('/postFruits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fruit: newFruit }),
      }).then((res) => res.json());
      console.log('new fruit added!');
      const fruit = document.createElement('li');
      fruit.innerText = newFruit;
      const newDelButton = document.createElement('button');
      newDelButton.innerHTML = '<button id>Delete Fruit</button>';
      dbFruits.appendChild(fruit);
    } else {
      window.alert('please make a new fruit');
    }
  }

  async function getFruitsFunc() {
    const response = await fetch('/getFruits', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json());
    let fruitArr = response.fruits;
    fruitArr.forEach((el) => {
      idCache[el.id] = el.fruit;
      console.log('idCache: ', idCache);

      const fruit = document.createElement('li');
      fruit.innerText = el.fruit;

      const button = document.createElement('button');
      button.setAttribute = ('id', idCache[el.id]);
      button.innerHTML = `Delete`;

      dbFruits.appendChild(fruit);
      fruit.appendChild(button);
    });
  }
});
