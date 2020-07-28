import * as React from 'react';
import * as renderer from 'react-test-renderer';
import withActiveItem from './with-active-item';
import {WithId} from '../../types';

interface Props {
  activeItem: WithId<number>;
  onItemSelect: (ObjWithId: WithId<number>) => void;
}

const MockComponent: React.FunctionComponent<Props> = (props: Props) => {
  const {activeItem, onItemSelect} = props;

  return (
    <div onClick={() => onItemSelect(activeItem)}>
      {activeItem.id}
    </div>
  );
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
