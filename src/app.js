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
    const newFruit = fruitInput.value;
    if (newFruit) {
      const response = await fetch('/postFruits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fruit: newFruit }),
      }).then((res) => res.json());
      console.log('RESPONSE: ', response);

      idCache[response.fruit.id] = response.fruit.fruit;

      const fruit = document.createElement('li');
      fruit.innerText = newFruit;

      const button = document.createElement('button');
      button.setAttribute = ('id', response.id);
      button.innerHTML = `Delete`;

      dbFruits.appendChild(fruit);
      fruit.appendChild(button);
    } else {
      window.alert('please make a new fruit');
    }
    console.log('CACHE POST: ', idCache);
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
