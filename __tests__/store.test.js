import { createStore, getStore } from '../src/store';

describe('Store functions', () => {
  it('Should return an empty store at the before createStore is being called', () => {
    const initialStore = getStore();
    expect(initialStore).toEqual({});
  });

  it('Should set the initial state with the object createStore is being called with', () => {
    const data = {
      test: 'test data',
      data: {},
    };
    createStore(data);
    const initialStore = getStore();
    expect(initialStore).toEqual(data);
  });
});

