import { createReducer } from '@reduxjs/toolkit'
import { updateSelectedMenuItem } from '../actions/index'

export const selectedMenuItem = createReducer(0, {
  [updateSelectedMenuItem]: (state, action) => action.payload
})
