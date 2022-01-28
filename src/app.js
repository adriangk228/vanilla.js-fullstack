document.addEventListener('DOMContentLoaded', () => {
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
      idCache[response.fruit.id] = response.fruit.fruit;

      const fruit = document.createElement('li');
      fruit.innerText = newFruit;

      const button = document.createElement('button');
      button.classList.add('deleteButton');
      button.setAttribute('id', response.fruit.id);
      button.innerHTML = `Delete`;

      dbFruits.appendChild(fruit);
      fruit.appendChild(button);
    } else {
      window.alert('please make a new fruit');
    }
  }

  // this should work, but I haven't tested it yet (delete working with postman)
  async function deleteFruitsFunc() {
    const response = await fetch('/deleteFruit', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fruit: 'miamia' }), // <-- CHANGE TO ACTUAL VALUE
    }).then((res) => res.json());
    console.log('RES: ', res);
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
      if (!idCache[el.id]) {
        idCache[el.id] = el.fruit;

        const fruit = document.createElement('li');
        fruit.innerText = el.fruit;
        fruit.setAttribute('id', el.id);

        const button = document.createElement('button');
        button.className = 'deleteButton';
        button.innerHTML = `Delete`;
        button.addEventListener('click', () => {
          logFruitFunc(el.id);
        });

        dbFruits.appendChild(fruit);
        fruit.appendChild(button);
      }
    });
  }

  // testing id's on the buttons when I click them
  // will hook up to delete function later
  function logFruitFunc(id) {
    console.log('logFruitFunk clicked: ', id);

    if (idCache[id]) {
      window.alert(`you just clicked ${idCache[id]}`);
    }

    const el = document.getElementById(id);
    el.remove();
  }

  const fruitInput = document.getElementById('fruitInput');
  const addButton = document.getElementById('addButton');
  const getFruits = document.getElementById('getFruits');
  const dbFruits = document.getElementById('dbFruits');
  // const allDelButton = document.getElementsByClassName('deleteButton');

  addButton.addEventListener('click', addFruitFunc);
  getFruits.addEventListener('click', getFruitsFunc);

  // console.log('line 89: ', allDelButton);

  // allDelButton.map((el) => {
  //   console.log(el);
  // });

  // const testSam = document.querySelectorAll('.deleteButton');
  // console.log('SAM ', testSam);

  // document.querySelectorAll('.deleteButton').forEach((el) => {
  //   el.addEventListener('click', logFruitFunc());
  // });
});
