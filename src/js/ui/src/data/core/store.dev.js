import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import taskMiddleware from '../middlewares/taskMiddleware'
import reducer from './reducer'

const createDevStoreWithMiddleware = applyMiddleware(
  taskMiddleware,
  thunk
)(createStore);

const configureStore = () => createDevStoreWithMiddleware(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default configureStore;
