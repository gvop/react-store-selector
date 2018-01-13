import { createStore, returnStore } from '../src/store-selector';

describe('Store Selector HOC', () => {
  it('Should return an empty store at the before createStore is being called', () => {
    const initialStore = returnStore();
    expect(initialStore).toEqual({});
  });

  it('Should set the initial state with the object createStore is being called with', () => {
    const data = {
      test: 'test data',
      data: {},
    };
    createStore(data);
    const initialStore = returnStore();
    expect(initialStore).toEqual(data);
  });
});

