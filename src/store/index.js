import forbiddenValuesMiddleware from '../middleware/index'
import createSagaMiddleware from 'redux-saga'
import apiSaga from '../sagas/api-saga'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { reducer } from '../reducers/index'
import { DATA_LOADED } from '../constants/action-types'
import { getFirebase, actionTypes as rrfActionTypes } from 'react-redux-firebase'
import { constants as rfConstants } from 'redux-firestore'

const initialiseSagaMiddleware = createSagaMiddleware()

const extraArgument = {
  getFirebase
}

const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: {
      // Ignore these action types
      ignoredActions: [DATA_LOADED,
        // just ignore every redux-firebase and react-redux-firebase action type
        ...Object.keys(rfConstants.actionTypes).map(
          type => `${rfConstants.actionsPrefix}/${type}`
        ),
        ...Object.keys(rrfActionTypes).map(
          type => `@@reactReduxFirebase/${type}`
        )
      ],
      // Ignore these field paths in all actions
      ignoredActionPaths: ['payload.timestamp'],
      // Ignore these paths in the state
      ignoredPaths: ['firebase', 'firestore', 'game.timestamp']
    },
    thunk: {
      extraArgument
    }
  }),
  forbiddenValuesMiddleware,
  initialiseSagaMiddleware
];

const store = configureStore({
  reducer,
  middleware,
});

console.log(store.getState());

initialiseSagaMiddleware.run(apiSaga)

export default store;
