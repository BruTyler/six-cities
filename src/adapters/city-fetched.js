export const createCity = (fetchedData) => {
  const {city} = fetchedData;
  return {
    id: city.name,
    location: [
      city.location.latitude,
      city.location.longitude],
    defaultZoom: city.location.zoom,
  };
};
