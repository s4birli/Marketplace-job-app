import { combineReducers, createStore,applyMiddleware, compose  } from "redux";
import createSagaMiddleware from "redux-saga";

import LoginUser from '../Screens/auth/login/reducers'
// import recommendedRoots from '../Screens/home/reducers/recommended'
// import latestRoots from '../Screens/home/reducers/latest'
// import topRoots from '../Screens/home/reducers/top'
// import recentRoots from '../Screens/home/reducers/recent'
// import popularRoots from '../Screens/home/reducers/popular'
import getRoots from '../Screens/home/reducers/getRoots';
import categoriesRequest from '../Screens/home/reducers/getCategories'
// import recentViewRoots from '../Screens/home/reducers/recentView'
import userProfile from '../Screens/profile/reducers'
import addRoot from '../Screens/root/reducers'
import rootReviews from '../Screens/rootPage/reducers'
import rootSaga from '../sagas'
// import getRegex from '../Screens/home/reducers/getRegex'
const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers({
    LoginUser,
    getRoots,
    userProfile,
    addRoot,
    rootReviews,
    categoriesRequest,
    // getRegex
});
export const store = createStore(rootReducer,compose(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(rootSaga);
