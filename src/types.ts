import {PlaceType} from './const';

export interface WithId<K=string | number> {
  id: K,
}

interface WithLocation {
  location: [number, number]
};

interface DifferentOptions {
  [key: string]: boolean | string | number
};

interface Host {
  avatar: string,
  name: string,
  isSuper: boolean,
}

interface SingleApartmentCard {
  cityId: string,
  type: PlaceType,
  description: string,
  rating: number,
  price: number,
  isPremium: boolean,
  isFavourite: boolean,
  photo: string,
  fullDescription: string,
  photoSet: string[],
  bedrooms: number,
  adultsMax: number,
  goods?: string[],
  host: Host,
}

export type SingleApartment = WithId<number> & WithLocation & SingleApartmentCard;

export type City = WithId<string> & WithLocation & { 
  defaultZoom: number 
};

export type AuthInfo = WithId<number> & DifferentOptions & {
  email: string,
};

export interface AuthData {
  login: string,
  password: string,
};

export type Review = WithId<number> & {
  authorName: string,
  authorAvatar: string,
  rating: number,
  opinion: string,
  publishDate: string,
}

export interface ReviewFormData {
  comment: string, 
  rating: number, 
  apartmentId: number,
}

  
