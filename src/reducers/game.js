import { createReducer } from '@reduxjs/toolkit'
import { updateGame } from '../actions/index'

export const game = createReducer({}, {
  [updateGame]: (state, action) => action.payload
})
