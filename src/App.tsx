import React from "react";
import { Provider } from "react-redux";

import store from "./store";
import MainApp from "./MainApp/MainApp";
import sagas from "./sagas";
import sagaMiddleware from "./saga-middleware";

sagaMiddleware.run(sagas);

const App = () => (
  <Provider store={store}>
    <MainApp />
  </Provider>
);

export default App