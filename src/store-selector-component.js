import React from 'react';
import { getStore } from './store';
import types from './utils/store-types';

export default function storeSelector(WrappedComponent, propsArray = [], functions = {}) {
  return class HOC extends React.Component {
    constructor() {
      super();
      this.state = {
        store: getStore(),
        selectedProps: {},
      };
    }

    componentWillMount() {
      this.getSelectedProps();
    }

    setStoreValue(key, value) {
      const validType = Object.prototype.hasOwnProperty.call(types, typeof value);
      if (validType) {
        const data = {};
        data[key] = value;
        this.setState({
          store: Object.assign(this.state.store, data),
        });
      } else {
        console.warn(`Type of ${typeof value} can not be added to the store. `);
      }
    }

    getStoreValue(key) {
      return this.state.selectedProps[key];
    }

    getSelectedProps() {
      const selectedProps = {};
      propsArray.forEach((element) => {
        if (Object.keys(this.state.store).includes(element)) {
          selectedProps[element] = this.state.store[element];
        }
      });
      this.setState({
        selectedProps,
      });
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          {...functions}
          store={this.state.selectedProps}
          setStoreValue={(key, value) => this.setStoreValue.bind(this)(key, value)}
          getStoreValue={key => this.getStoreValue.bind(this)(key)}
        />);
    }
  };
}
