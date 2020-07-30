import * as React from 'react';
import {Subtract} from 'utility-types';

interface Props {
  activeItem?: object | boolean;
}

interface State {
  activeItem: object | boolean;
}

interface InjectedProps {
  onItemSelect: (activeItem: object | boolean) => void;
  activeItem: object | boolean;
}

const withActiveItem = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Props & Subtract<P, InjectedProps>;

  class WithActiveItem extends React.PureComponent<T, State> {
    constructor(props: Props) {
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

  return WithActiveItem;
};

export default withActiveItem;
