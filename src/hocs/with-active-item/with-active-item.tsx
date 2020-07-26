import * as React from 'react';
import PropTypes from 'prop-types';

const withActiveItem = (Component) => {
  class WithActiveItem extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeItem: props.activeItem,
      };

      this.handleItemSelect = this.handleItemSelect.bind(this);
    }

    handleItemSelect(selectedItem) {
      this.setState({
        activeItem: selectedItem
      });

      if (this.props.onItemSelect) {
        this.props.onItemSelect(selectedItem);
      }
    }

    render() {
      const {activeItem} = this.state;

      return <Component
        {...this.props}
        onItemSelect={this.handleItemSelect}
        activeItem={activeItem}
      />;
    }
  }

  WithActiveItem.propTypes = {
    onItemSelect: PropTypes.func,
    activeItem: PropTypes.oneOfType([PropTypes.shape(), PropTypes.bool]),
  };

  return WithActiveItem;
};

export default withActiveItem;