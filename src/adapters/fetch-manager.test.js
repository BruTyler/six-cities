import fetchedHotels from './../mocks/hotels-raw.json';
import {transformToCities, transformToApartments} from './fetch-manager';

describe(`Fetch-Manager unit- suit`, () => {
  it(`Should transform fetched hotels to six cities`, () => {
    const expectedCityList = [`Paris`, `Dusseldorf`, `Brussels`, `Hamburg`, `Amsterdam`, `Cologne`];

    expect(fetchedHotels.length).toBeGreaterThan(expectedCityList.length);
    const citiesNameList = fetchedHotels.map((it) => it.city.name);
    expect(citiesNameList.length).toBeGreaterThan(expectedCityList.length);

    const cityListTransformed = transformToCities(fetchedHotels);
    expect(cityListTransformed.length).toEqual(expectedCityList.length);

    const cityNamesTransformed = cityListTransformed.map((it) => it.id);
    expect(cityNamesTransformed).toEqual(expect.arrayContaining(expectedCityList));
  });

  it(`Should transform fetched hotels to apartment list`, () => {
    const apartmentListTransformed = transformToApartments(fetchedHotels);
    expect(apartmentListTransformed.length).toEqual(fetchedHotels.length);

    const randomIndex = Math.floor(Math.random() * Math.floor(apartmentListTransformed.length));
    const apartment = apartmentListTransformed[randomIndex];
    expect(apartment).toHaveProperty(`id`);
    expect(apartment).toHaveProperty(`description`);
    expect(apartment).toHaveProperty(`host`);
    expect(apartment).toHaveProperty(`price`);
    expect(apartment).toHaveProperty(`rating`);
    expect(apartment).toHaveProperty(`type`);
  });
});
