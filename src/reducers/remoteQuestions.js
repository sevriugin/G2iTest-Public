import { createReducer } from '@reduxjs/toolkit'
import { DATA_LOADED } from '../constants/action-types'

export const remoteQuestions = createReducer([], {
  [DATA_LOADED]: (state, action) => state.concat(action.payload.results)
})
