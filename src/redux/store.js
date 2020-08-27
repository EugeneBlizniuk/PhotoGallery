import rootReducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

export default createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));