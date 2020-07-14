import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {SortType} from '../../const.js';
import withActiveItem from '../../hocs/with-active-item/with-active-item.jsx';
import {ActionCreator} from '../../reducer.js';

const PlaceSorter = (props) => {
  const {selectedSortValue, handleSorterItemClick,
    activeItem: isSorterOpen, onItemSelect: toggleSorter
  } = props;

  return <form className="places__sorting" action="#" method="get">
    <span className="places__sorting-caption">Sort by</span>
    <span
      className="places__sorting-type"
      tabIndex="0"
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
          tabIndex="0"
          onClick={() => {
            handleSorterItemClick(sortKey);
            toggleSorter(!isSorterOpen);
          }}
        >
          {SortType[sortKey]}
        </li>
      )}
    </ul>
  </form>;
};

PlaceSorter.propTypes = {
  activeItem: PropTypes.bool.isRequired,
  onItemSelect: PropTypes.func.isRequired,
  selectedSortValue: PropTypes.oneOf(Object.values(SortType)).isRequired,
  handleSorterItemClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    selectedSortValue: state.sortType,
  };
};

const mapDispatchToProps = (dispatch) => ({
  handleSorterItemClick(selectedSortKey) {
    dispatch(ActionCreator.changeSortType(SortType[selectedSortKey]));
  },
});

export {PlaceSorter};
export default connect(mapStateToProps, mapDispatchToProps)(withActiveItem(PlaceSorter));
