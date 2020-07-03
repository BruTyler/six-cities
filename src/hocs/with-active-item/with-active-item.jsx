import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';


const withActiveItem = (Component) => {
  class WithActiveItem extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeItem: props.activeItem,
      };

      this.handleItemSelect = this.handleItemSelect.bind(this);
    }

    handleItemSelect(selectedItem) {
      const {onItemSelect} = this.props;

      this.setState({
        activeItem: selectedItem
      });

      if (onItemSelect) {
        onItemSelect(selectedItem);
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
    activeItem: PropTypes.shape(),
  };

  return WithActiveItem;
};

export default withActiveItem;
