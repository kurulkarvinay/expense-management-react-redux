import { ADD_EXPENSE } from "../constants/action-types";
import { OPEN_FORM } from "../constants/action-types";

export const addExpense = expense => ({
  type: ADD_EXPENSE,
  payload: expense
});

export const openForm = showForm => ({
  type: OPEN_FORM,
  payload: showForm
});
