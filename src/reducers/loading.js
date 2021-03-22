import { createReducer } from '@reduxjs/toolkit'
import { updateLoading } from '../actions/index'

export const loading = createReducer(false, {
  [updateLoading]: (state, action) => action.payload
})
