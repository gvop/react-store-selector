let store = {};

/**
 * Return the full store object
 * @return {object}
 */

export function getStore() {
  return store;
}

/**
 * Create Initial store
 * @param {object} initialStore
 */

export function createStore(initialStore) {
  store = initialStore;
}
