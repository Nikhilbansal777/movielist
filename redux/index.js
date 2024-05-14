const redux = require("redux");
const createStore = redux.createStore;
const combineReducers = redux.combineReducers;

function buyCake() {
  return {
    type: "BUY_CAKE",
  };
}

function buyIceCream() {
  return {
    type: "BUY_ICECREAM",
  };
}

const initialCakeState = {
  numberOfCake: 10,
};

const initialIcecreamState = {
  numberOfIcecream: 20,
};

const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case "BUY_CAKE":
      return {
        ...state,
        numberOfCake: state.numberOfCake - 1,
      };

    default:
      state;
  }
};

const iceCreamReducer = (state = initialIcecreamState, action) => {
  switch (action.type) {
    case "BUY_ICECREAM":
      return {
        ...state,
        numberOfIcecream: state.numberOfIcecream - 1,
      };
    default:
      state;
  }
};

const rootReducer = combineReducers({
  cake: cakeReducer,
  //   iceCream: iceCreamReducer,
});

const store = createStore(cakeReducer);
const unsubscribe = store.subscribe(() => {
  console.log("updated state", store.getState());
});

store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());

store.dispatch(buyIceCream());
store.dispatch(buyIceCream());
store.dispatch(buyIceCream());
store.dispatch(buyIceCream());
unsubscribe();
