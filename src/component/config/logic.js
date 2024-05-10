export const isPresentInFavorites = (favorites, realEstate) => {
  for (let item of favorites) {
    if (realEstate.id === item.id) {
      return true;
    }
  }
  return false;
};
