import { ADD_EXPENSE} from "../constants/action-types";
import { UPDATE_EXPENSE } from "../constants/action-types";
import { DELETE_EXPENSE} from "../constants/action-types";
import { OPEN_FORM } from "../constants/action-types";
import { CLOSE_FORM } from "../constants/action-types";
import { OPEN_EDIT_FORM } from "../constants/action-types";
import { CLOSE_EDIT_FORM } from "../constants/action-types";

const initialState = {
  expenses: [
    {
      id: 0,
      title: "Notebook",
      amount: 50,
      category: "School",
      paymentMode: "GPay",
      date: "July 20, 2014"
    },
    {
      id: 1,
      title: "Pen",
      amount: 90,
      category: "School",
      paymentMode: "Credit Card",
      date: "Jan 7, 2014"
    }
  ],
  uiState: {
    //Create
    openFormDialog: false,
    //Update
    openEditDialog: false,
    expenseToEdit: {},
    //Delete
    checked: []
  }
};
const rootReducer = (state = initialState, action) => {
  /**
   * Update state in reducer using action type
   */
  switch (action.type) {
    /**
     * Create Expense
     */
    case ADD_EXPENSE:
      return {
        ...state,
        expenses: [...state.expenses, action.payload]
      };

    case OPEN_FORM:
      return {
        ...state,
        uiState: {
          ...state.uiState,
          openFormDialog: true
        }
      };

    case CLOSE_FORM:
      return {
        ...state,
        uiState: {
          ...state.uiState,
          openFormDialog: false
        }
      };

    /**
     * Update Expense
     */
    case UPDATE_EXPENSE:

      return {
        ...state,
        expenses: state.expenses.map(expense => {
          if (expense.id !== action.payload.id) {
            return expense;
          } else {
            return { 
              ...expense, 
              title: action.payload.title,
              amount: action.payload.amount,
              category: action.payload.category,
              paymentMode: action.payload.paymentMode,
              date: action.payload.date
            };
          }
        })
      };

    case OPEN_EDIT_FORM:
      return {
        ...state,
        uiState: {
          ...state.uiState,
          openEditDialog: true,
          expenseToEdit: action.payload
        }
      };

    case CLOSE_EDIT_FORM:
      return {
        ...state,
        uiState: {
          ...state.uiState,
          openEditDialog: false
        }
      };
    /**
     * Delete Expense
     */
    case DELETE_EXPENSE:
      const selectedItem = state.expenses.find((item) => item.id === action.payload);
      state.expenses.splice(selectedItem.id, 1);
      return state;

    default:
      return state;
  }
};
export default rootReducer;
