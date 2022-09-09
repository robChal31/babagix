function sortArr(obj) {
  let temp = [];
  for (const key in obj) {
    temp.push(key);
  }
  return temp.length;
}
export default sortArr;
