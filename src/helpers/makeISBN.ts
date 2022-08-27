function getRandomInt(min:number, max:number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function fakeISBN() {
  let fisrtNumber = getRandomInt(0, 100);
  var val1 = getRandomInt(10, 1000);
  var val2 = getRandomInt(10, 1000);
  1;
  let lastNumber = getRandomInt(0, 1000);

  return `${fisrtNumber}-${val1}-${val2}-${lastNumber}`;
}
