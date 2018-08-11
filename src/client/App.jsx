import React from "react";
import RateQuote from "./containers/RateQuote/RateQuote.jsx";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";

const sagaMiddleware = createSagaMiddleware();

// Normally thest would be imported in a top level file combining many
// but since we only have one container this works
import reducers from "./containers/RateQuote/RateQuoteReducer.js";
import sagas from "./containers/RateQuote/RateQuoteSaga.js";

const store = createStore(reducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(sagas);

const App = () => {
  return (
    <Provider store={store}>
      <RateQuote />
    </Provider>
  );
};

export default App;
