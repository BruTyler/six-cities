import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {ReviewForm} from './review-form';

describe(`<ReviewForm /> render suit`, () => {
  it(`<ReviewForm /> render list of reviews`, () => {
    const generatedTree = renderer.create(
        <ReviewForm
          activeItem={true}
          onItemSelect={() => {}}
          onFormSubmit={() => {}}
          apartmentId={1}
        />, {
          createNodeMock: () => {
            return {};
          }
        }).toJSON();

    expect(generatedTree).toMatchSnapshot();
  });
});
