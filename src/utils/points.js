export const getOffersPoint = (point, offersList) => {
  return offersList.filter((el) => point.offers.includes(el.id));
};

export const sortPointsByDate = (points) => {
  return points.sort((a, b) => a.dateFrom.unix() - b.dateFrom.unix());
};
