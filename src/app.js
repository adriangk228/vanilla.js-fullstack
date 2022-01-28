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
      fruit.setAttribute('id', response.fruit.id);

      const button = document.createElement('button');
      button.classList.add('deleteButton');
      button.innerHTML = `Delete`;
      button.addEventListener('click', () =>
        deleteFruitsFunc(response.fruit.id)
      );

      dbFruits.appendChild(fruit);
      fruit.appendChild(button);

      fruitInput.value = '';
    } else {
      window.alert('please make a new fruit');
    }
  }

  // this should work, but I haven't tested it yet (delete working with postman)
  async function deleteFruitsFunc(id) {
    const response = await fetch(`/deleteFruit/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      // body: JSON.stringify({ id }),
    }).then((res) => res.json());
    console.log('RES: ', response);
    const el = document.getElementById(id);
    el.remove();
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
        button.addEventListener('click', () => deleteFruitsFunc(el.id));

        dbFruits.appendChild(fruit);
        fruit.appendChild(button);
      }
    });
  }

  // testing id's on the buttons when I click them
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

  addButton.addEventListener('click', addFruitFunc);
  getFruits.addEventListener('click', getFruitsFunc);
});
