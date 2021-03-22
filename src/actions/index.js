import {
  DATA_REQUESTED,
  UPDATE_SELECTED_MENU_ITEM,
  UPDATE_LOADING,
  UPDATE_GAME
} from '../constants/action-types'

import {
  createAction
} from '@reduxjs/toolkit'

export const updateLoading = createAction(UPDATE_LOADING)

export const updateSelectedMenuItem = createAction(UPDATE_SELECTED_MENU_ITEM)

export const updateGame = createAction(UPDATE_GAME)

export const getDummyData = createAction(DATA_REQUESTED, (url) => ({
  payload: {
    url
  }
}))
