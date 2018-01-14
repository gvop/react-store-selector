# Simple React Store Solution 

Simple Redux inspired store solution for React and React Native project

# Getting Started
```
npm i @gvop/react-store-selector --save
```

# Example 

### Setting initial store
At app start-up you can set the initial store, this can be done by calling the `createStore` method. 

```
import { createStore } from '@gvop/react-store-selector';

const initialStore = {
    city: 'London'
}

componentDidMount(){
    createStore(initialStore)
}
```

note:
You don't have to set an initial store. If no initial store is being set, the store will be an empty object

### Subscribing to store values

```
import { storeSelector } from '@gvop/react-store-selector';

const Component = props => (
  <div>
    <p> Currenlty we are in `${props.store.city}`!
    <p>
        You are subscribed to the 'input' props. If that prop get set or changes, it will be displayed here 
        { props.store.input ? props.store.input : 'no input value' }
    </p>
  </div>
);

export default storeSelector(Component, ['input', 'city']);
```

### Adding values to the store 

To add values to the store, you can use the `props.setStoreValue` method that is avalble on the component that is exported with the `storeSelector`

```
import { storeSelector } from '@gvop/react-store-selector';

const Form = props => {
  let input;
  const setInput = (event, value) => {
    input = value;
  };

  const submitHandler = () => {
    props.setStoreValue('input', input);
  };

  return (
    </div>
        <input onChange={setInput} />
        <button onClick={submitHandler}>Submit</button>
    </div>
  );
};

export default storeSelector(Form);
```

# Testing

npm test 

# License

This project is licensed under the MIT License