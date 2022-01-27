document.addEventListener('DOMContentloaded', (e) => {
  const testButton = document.querySelector('button');
  const confirmSpace = document.createElement('div');

  testButton.addEventListener('click', function () {
    const clickConfirm = document.createElement('p');
    clickConfirm.innerText = 'Button was clicked';
    confirmSpace.appendChild(clickConfirm);
  });
});
