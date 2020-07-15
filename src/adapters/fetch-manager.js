import {createApartment} from './apartment-fetched.js';
import {createCity} from './city-fetched.js';
import {createReview} from './city-fetched.js';

export const transformToCities = (fetchedData) => {
  const cities = [];

  fetchedData.map((hotel) => {
    const newCity = createCity(hotel);
    const isCityUnknown = cities.findIndex((it) => it.id === newCity.id) === -1;
    if (isCityUnknown) {
      cities.push(newCity);
    }
  });

  return cities;
};

export const transformToApartments = (fetchedData) => {
  const apartments = [];
  fetchedData.map((hotel) => {
    apartments.push(createApartment(hotel));
  });
  return apartments;
};

export const transformToReviews = (fetchedData) => {
  const reviews = [];
  fetchedData.map((comment) => {
    reviews.push(createReview(comment));
  });
  return reviews;
};
