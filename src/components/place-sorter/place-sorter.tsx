import * as React from 'react';
import {connect} from 'react-redux';

import {SortType} from '../../const';
import withActiveItem from '../../hocs/with-active-item/with-active-item';
import {ActionCreator} from '../../reducer/application/application';
import {getSortType} from '../../reducer/application/selectors';

interface Props {
  activeItem: boolean;
  onItemSelect: (isSorterOpen: boolean) => void;
  selectedSortValue: SortType;
  handleSorterItemClick: (newSortType: SortType) => void;
}

const PlaceSorter: React.FunctionComponent<Props> = (props: Props) => {
  const {selectedSortValue, handleSorterItemClick,
    activeItem: isSorterOpen, onItemSelect: toggleSorter
  } = props;

  return <form className="places__sorting" action="#" method="get">
    <span className="places__sorting-caption">Sort by</span>
    <span
      className="places__sorting-type"
      onClick={() => toggleSorter(!isSorterOpen)}
    >
      {selectedSortValue}
      <svg className="places__sorting-arrow" width="7" height="4">
        <use xlinkHref="#icon-arrow-select"></use>
      </svg>
    </span>
    <ul className={`places__options places__options--custom${isSorterOpen ? ` places__options--opened` : ``}`}>
      {Object.keys(SortType).map((sortKey) =>
        <li
          key={sortKey}
          className="places__option"
          onClick={() => {
            handleSorterItemClick(SortType[sortKey]);
            toggleSorter(!isSorterOpen);
          }}
        >
          {SortType[sortKey]}
        </li>
      )}
    </ul>
  </form>;
};

const mapStateToProps = (state) => {
  return {
    selectedSortValue: getSortType(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  handleSorterItemClick(newSortType) {
    dispatch(ActionCreator.changeSortType(newSortType));
  },
});

export {PlaceSorter};
export default connect(mapStateToProps, mapDispatchToProps)(withActiveItem(PlaceSorter));
