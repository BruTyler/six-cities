import {BuisnessRequirements} from "../const";

export const createApartment = (fetchedData) => {
  const hotel = fetchedData;
  const fixedType = hotel.type === `room`
    ? `Private ${hotel.type}`
    : hotel.type.substring(0, 1).toUpperCase() + hotel.type.substring(1);

  const fixedImages = hotel.images.slice(0, BuisnessRequirements.MAX_PHOTOS_PER_APARTMENT);

  return {
    id: hotel.id,
    cityId: hotel.city.name,
    type: fixedType,
    description: hotel.title,
    fullDescription: hotel.description,
    rating: hotel.rating,
    price: hotel.price,
    isPremium: hotel.is_premium,
    isFavourite: hotel.is_favorite,
    photo: hotel.preview_image,
    photoSet: fixedImages,
    bedrooms: hotel.bedrooms,
    adultsMax: hotel.max_adults,
    goods: hotel.goods,
    host: {
      id: hotel.host.id,
      avatar: hotel.host.avatar_url,
      name: hotel.host.name,
      isSuper: hotel.host.is_pro,
    },
    location: [
      hotel.location.latitude,
      hotel.location.longitude,
    ],
  };
};
