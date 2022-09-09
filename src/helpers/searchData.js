const searchData = (searched, data) => {
  return data.filter((el) => el.itemName.match(searched));
};
export default searchData;
