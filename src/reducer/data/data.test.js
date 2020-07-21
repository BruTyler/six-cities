import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../api.js';
import {reducer, ActionType, Operation, ActionCreator} from './data.js';
import ApartmentsMock from '../../mocks/offers.js';
import CitiesMock from '../../mocks/cities.js';
import ReviewsMock from '../../mocks/reviews.js';
import {transformToReviews} from '../../adapters/fetch-manager.js';

const api = createAPI(() => {}, () => {});

describe(`Data reducer unit-test`, () => {
  it(`Data reducer should return initial state`, () => {
    expect(reducer(void 0, {})).toEqual({
      cityList: [],
      apartmentList: [],
      reviewList: [],
      apiError: null,
      neighboorApartmentList: [],
      favoriteCities: [],
      favoriteApartments: [],
    });
  });

  it(`Data reducer should load reviews`, () => {
    expect(reducer({
      reviewList: [],
    }, {
      type: ActionType.LOAD_REVIEWS,
      payload: ReviewsMock,
    })).toEqual({
      reviewList: ReviewsMock,
    });
  });

  it(`Data reducer should load hotels`, () => {
    expect(reducer({
      cityList: [],
      apartmentList: [],
    }, {
      type: ActionType.LOAD_HOTELS,
      payload: {
        cities: CitiesMock,
        apartments: ApartmentsMock},
    })).toEqual({
      cityList: CitiesMock,
      apartmentList: ApartmentsMock,
    });
  });

  it(`Data reducer should load favorite`, () => {
    expect(reducer({
      favoriteCities: [],
      favoriteApartments: [],
    }, ActionCreator.loadFavorite(
        CitiesMock,
        ApartmentsMock,
    )
    )).toEqual({
      favoriteCities: CitiesMock,
      favoriteApartments: ApartmentsMock,
    });
  });

  it(`Data reducer should remove favorite one`, () => {
    expect(reducer({
      favoriteApartments: [
        {id: 1, description: `room1`},
        {id: 2, description: `room2`},
        {id: 3, description: `room3`},
      ],
    }, ActionCreator.removeFavorite(
        {id: 2, description: `room2`}
    )
    )).toEqual({
      favoriteApartments: [
        {id: 1, description: `room1`},
        {id: 3, description: `room3`},
      ],
    });
  });

  it(`Data reducer should set correct Error message`, () => {
    expect(reducer({
      apiError: null,
    }, {
      type: ActionType.SET_API_ERROR,
      payload: `404`,
    })).toEqual({
      apiError: `404`,
    });
  });

  it(`Data reducer should erase Error message`, () => {
    expect(reducer({
      apiError: `401`,
    }, ActionCreator.setApiError()
    )).toEqual({
      apiError: null,
    });
  });

  it(`Data reducer should substitute old hotel to new one`, () => {
    expect(reducer({
      apartmentList: [
        {id: 1, isFavorite: true},
        {id: 2, isFavorite: true},
        {id: 3, isFavorite: true},
      ],
    }, ActionCreator.replaceHotel({id: 2, isFavorite: false})
    )).toEqual({
      apartmentList: [
        {id: 1, isFavorite: true},
        {id: 2, isFavorite: false},
        {id: 3, isFavorite: true},
      ],
    });
  });

  it(`Data reducer should load nearby hotels`, () => {
    const neighboorApartments = ApartmentsMock.slice(0, 3);

    expect(reducer({
      neighboorApartmentList: [],
    }, ActionCreator.loadNeighboorHotels(neighboorApartments)
    )).toEqual({
      neighboorApartmentList: neighboorApartments,
    });
  });

  it(`Data reducer should make a correct API call to /hotels`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const hotelLoader = Operation.loadCitiesWithApartments();

    apiMock
      .onGet(`/hotels`)
      .reply(200, []);

    return hotelLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
      });
  });

  it(`Data reducer should post a review to /comments/:hotelId and load reviews from response`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const commentPost = {
      apartmentId: 1,
      comment: `good hotel`,
      rating: 4
    };
    const reviewSender = Operation.sendReview(commentPost);

    const fakeResponseReviews = [
      {
        "id": 1,
        "user": {"id": 13, "is_pro": false, "name": `Zak`, "avatar_url": `avatar_url`},
        "rating": commentPost.rating,
        "comment": commentPost.comment,
        "date": `2020-07-17T08:50:12.875Z`
      },
    ];

    apiMock
      .onPost(`/comments/${commentPost.apartmentId}`)
      .reply(200, fakeResponseReviews);

    return reviewSender(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_REVIEWS,
          payload: transformToReviews(fakeResponseReviews),
        });
      });
  });
});
