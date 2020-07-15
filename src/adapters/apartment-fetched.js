export const createApartment = (fetchedData) => {
  const hotel = fetchedData;
  return {
    id: hotel.id,
    cityId: hotel.city.name,
    type: hotel.type.substring(0, 1).toUpperCase() + hotel.type.substring(1),
    description: hotel.title,
    fullDescription: hotel.description,
    rating: hotel.rating,
    price: hotel.price,
    isPremium: hotel.is_premium,
    isFavourite: hotel.is_favorite,
    photo: hotel.preview_image,
    photoSet: hotel.images,
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
      hotel.host.latitude,
      hotel.host.longitude,
    ],
  };
};
