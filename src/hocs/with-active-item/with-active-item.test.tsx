import * as React from 'react';
import * as renderer from 'react-test-renderer';
import PropTypes from 'prop-types';
import withActiveItem from './with-active-item';

const MockComponent = (props) => {
  const {activeItem, onItemSelect} = props;

  return (
    <div onClick={() => onItemSelect(activeItem)}>
      {activeItem.id}
    </div>
  );
};

MockComponent.propTypes = {
  activeItem: PropTypes.shape({
    id: PropTypes.number.isRequired
  }).isRequired,
  onItemSelect: PropTypes.func.isRequired,
};

const MockComponentWrapped = withActiveItem(MockComponent);

describe(`withActiveItem render suit`, () => {
  it(`withActiveItem is rendered correctly`, () => {
    const tree = renderer.create(
        <MockComponentWrapped
          activeItem={{id: 1}}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
