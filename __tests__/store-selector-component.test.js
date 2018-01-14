import sinon from 'sinon';
import React from 'react';
import { shallow } from 'enzyme';
import storeSelector from '../src/store-selector-component';
import { createStore } from '../src/store';

const sandbox = sinon.sandbox.create();

const mockFunction = () => {};

const Component = () => (
  <div>
    <p />
  </div>
);

describe('Store selector', () => {
  let wrapper;
  let instance;
  const props = {
    custom: 'custom',
    isFocused: true,
    currentScreen: 'DetailContent',
  };

  function renderContainer(rewriteProps) {
    const inputProps = {
      ...props,
      ...rewriteProps,
    };

    const HOC = storeSelector(Component, ['test', 'newValue'], { mockFunction });
    wrapper = shallow(<HOC {...inputProps} />);
    instance = wrapper.instance();
  }

  beforeEach(() => {
    sandbox.resetHistory();
  });

  it('Should return the wrapped compnent that is being provided as first argument', () => {
    renderContainer();
    expect(wrapper.find(Component)).toHaveLength(1);
  });

  it('Should add the subscripted values to the props', () => {
    const initialStore = {
      test: 'test value',
    };
    createStore(initialStore);
    renderContainer();
    expect(wrapper.props().store.test).toEqual('test value');
  });

  it('Should add setStoreValue and getStoreValue as props to the Component', () => {
    renderContainer();
    expect(wrapper.props().setStoreValue).toBeDefined();
    expect(wrapper.props().getStoreValue).toBeDefined();
  });

  it('Should add the object of function provided as props to the Component', () => {
    renderContainer();
    expect(wrapper.props().mockFunction).toBeDefined();
  });

  it('Should add the value of a props that is subscribed to the Component', () => {
    renderContainer();
    instance.setStoreValue('newValue', 'new value');
    instance.componentWillMount();
    wrapper.update();
    expect(wrapper.props().store.newValue).toEqual('new value');
  });

  it('Should not add the value of a props if it is a type of function', () => {
    renderContainer();
    instance.setStoreValue('function', () => {});
    instance.componentWillMount();
    wrapper.update();
    expect(wrapper.props().store.function).toBeUndefined();
  });
});

