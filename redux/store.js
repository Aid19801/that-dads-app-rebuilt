import { applyMiddleware, createStore } from 'redux';

import Reactotron from '../ReactotronConfig';

import rootSaga from './sagas';
import rootReducer from './reducers';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();

let store;

if (process.env.NODE_ENV === 'development') {
    store = Reactotron.createStore(rootReducer, applyMiddleware(sagaMiddleware));
} else {
    store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
}


sagaMiddleware.run(rootSaga);

export default store;