import React from 'react';

let store = {};

/**
 * Return the full store object
 * @return {object}
 */

function returnStore() {
  return store;
}

/**
 * Create Initial store
 * @param {object} initialStore
 */

function createStore(initialStore) {
  store = initialStore;
}

/**
 * HOC to select and set props
 * @param {component} WrappedComponent
 * @param {array} propsArray
 * @param {object} functions
 * @return {component}
 */

function storeSelector(WrappedComponent, propsArray = [], functions = {}) {
  return class HOC extends React.Component {
    constructor() {
      super();
      this.state = {
        store,
        selectedProps: {},
      };
    }

    componentWillMount() {
      this.getSelectedProps();
    }

    setStoreValue(key, value) {
      if (typeof value !== 'function') {
        const data = this.state.store;
        const newData = {};
        newData[key] = value;
        this.setState({
          selectedProps: Object.assign(data, newData),
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
      return (<WrappedComponent
        {...this.props}
        {...functions}
        store={this.state.selectedProps}
        setStoreValue={this.setStoreValue}
        getStoreValue={this.getStoreValue}
      />);
    }
  };
}

module.exports = {
  returnStore,
  createStore,
  storeSelector,
};
