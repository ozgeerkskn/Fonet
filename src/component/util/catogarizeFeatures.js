export const categorizeFeatures = (features) => {
  return features.reduce((acc, feature) => {
    const { category } = feature;
    if (!acc[category.name]) {
      acc[category.name] = [];
    }
    acc[category.name].push(feature);
    return acc;
  }, {});
};
