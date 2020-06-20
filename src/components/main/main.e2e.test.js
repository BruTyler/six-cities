import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Main from './main.jsx';

Enzyme.configure({
  adapter: new Adapter(),
});

describe(`Main e2e suite`, () => {
  it(`Apartment title is pressed`, () => {
    const onApartmentTitleHandler = jest.fn();
    const apartmentList = [`test-apartment1`, `test-apartment2`];

    const mainWrapper = mount(
        <Main
          apartmentList={apartmentList}
          onApartmentTitleClick={onApartmentTitleHandler}
        />
    );

    const apartmentButtons = mainWrapper.find(`a.apartment__title`);
    apartmentButtons.at(0).simulate(`click`, {preventDefault() {}});

    expect(apartmentButtons.length).toBe(2);
    expect(onApartmentTitleHandler.mock.calls.length).toBe(1);
  });
});
