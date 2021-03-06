import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import * as contactsActions from './contacts-actions';
import {
  getAllContacts,
  addContacts,
  deleteContacts,
} from './contacts-operations';
const { search_contact } = contactsActions;
const items = createReducer([], {
  [getAllContacts.fulfilled]: (_, { payload }) => payload,
  [addContacts.fulfilled]: (state, { payload }) => {
    return [...state, payload];
  },
  [deleteContacts.fulfilled]: (state, { payload }) =>
    state.filter(({ id }) => id !== payload),
});
const filter = createReducer('', {
  [search_contact]: (_, { payload }) => payload,
});
const isLoading = createReducer(false, {
  [getAllContacts.pending]: () => true,
  [getAllContacts.fulfilled]: () => false,
  [getAllContacts.rejected]: () => false,
  [addContacts.pending]: () => true,
  [addContacts.fulfilled]: () => false,
  [addContacts.rejected]: () => false,
  [deleteContacts.pending]: () => true,
  [deleteContacts.fulfilled]: () => false,
  [deleteContacts.rejected]: () => false,
});
export default combineReducers({
  items,
  filter,
  isLoading,
});
