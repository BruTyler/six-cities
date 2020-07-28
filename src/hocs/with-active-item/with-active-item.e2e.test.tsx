import * as React from 'react';
import {mount} from 'enzyme';
import withActiveItem from './with-active-item';
import {WithId} from '../../types';

interface Props {
  elements: Array<WithId<number>>;
  activeItem: WithId<number>;
  onItemSelect: (ObjWithId: WithId<number>) => void;
}

const MockComponent: React.FunctionComponent<Props> = (props: Props) => {
  const {activeItem, onItemSelect, elements} = props;
  return (
    <div>
      <div className="title">{activeItem.id}</div>
      {elements.map((element) =>
        <div key={element.id} className="element" onClick={() => onItemSelect(element)}>
          {element.id}
        </div>
      )}
    </div>
  );
};

const MockComponentWrapped = withActiveItem(MockComponent);

describe(`withActiveItem e2e suit`, () => {
  it(`withActiveItem switch active element correctly`, () => {
    const elementsMock = [{id: 1}, {id: 2}];

    const component = mount(
        <MockComponentWrapped
          elements={elementsMock}
          activeItem={elementsMock[1]}
        />
    );

    const titleElement = component.find(`.title`);
    expect(Number(titleElement.text())).toBe(elementsMock[1].id);

    const elements = component.find(`.element`);
    elements.at(0).simulate(`click`);
    expect(Number(titleElement.text())).toBe(elementsMock[0].id);

    expect(component.state().activeItem).toEqual(elementsMock[0]);
  });
});
