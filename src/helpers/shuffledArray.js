function shuffleArray(arr) {
  let arrLength = arr.length;
  let shuffledArr;
  let randomizeIndex;
  while (arrLength) {
    randomizeIndex = Math.floor(Math.random() * arrLength--);
    shuffledArr = arr[arrLength];
    arr[arrLength] = arr[randomizeIndex];
    arr[randomizeIndex] = shuffledArr;
  }
  return arr;
}

export default shuffleArray;
