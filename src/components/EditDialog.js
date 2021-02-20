import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Input from '../components/UI/Input'
import DialogTitle from "@material-ui/core/DialogTitle";
import store from "../store/index";
import { CLOSE_EDIT_FORM } from "../constants/action-types";
import { UPDATE_EXPENSE } from "../constants/action-types";
window.store = store;

class EditDialog extends Component{
  
  state = {
    expenseForm: {
        title: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                autoFocus: true,
                placeholder: 'Enter Expense Title'
            },
            value: '',
            validation: {
              required: true
          },
          valid: false
        },
        amount: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Enter Expense Amount'
            },
            value: '',
            validation: {
              required: true
          },
          valid: false
        },
        category: {
            elementType: 'select',
            elementConfig: {
                options: [
                    {value: 'C1', displayValue: 'Cat1'},
                    {value: 'C2', displayValue: 'Cat2'}
                ]
            },
            value: '',
            validation: {
              required: true
          },
          valid: false
        },
        paymentMode: {
            elementType: 'select',
            elementConfig: {
                options: [
                    {value: '1', displayValue: 'Cash'},
                    {value: '2', displayValue: 'GPay'},
                    {value: '3', displayValue: 'Debit Card'},
                    {value: '4', displayValue: 'Ceredit Card'}
                ]
            },
            value: '',
            validation: {
              required: true
          },
          valid: false
        },
        date: {
          elementType: 'date',
          elementConfig: {
              id: 'date',
              type: 'date'
          },
          value: new Date().toLocaleDateString(),
          validation: {
              required: true
          },
          valid: false
      },
    },
    open: false,
    formIsValid: false,
    expense: {
      id: 0,
      title: "",
      amount: 0,
      date: ""
    }
  }

  handleClose = () => {
    store.dispatch({
      type: CLOSE_EDIT_FORM
    });
  };

  handleSave = () => {
    store.dispatch({
      type: UPDATE_EXPENSE,
      payload: {
        id: this.state.expense.id,
        name: this.state.newTitle,
        amount: this.state.price,
        date: this.state.expense.date
      }
    });

    store.dispatch({
      type: CLOSE_EDIT_FORM
    });
  };

  checkValidity = (value, rules, inputIndentifier) => {
    let valid = true;
    if(rules.required) {
        valid = value.trim() !== '' && valid;
    }
    console.log(inputIndentifier);
    if(rules.required && inputIndentifier === 'price') {
        valid = value.trim() !== '' && !isNaN(value) && valid;
    }
    return valid;
  } 
  
  inputChangedHandler = (event, inputIndentifier) => {
    const updatedExpenseForm = {
        ...this.state.expenseForm
    };

    const updatedFormElement = {
        ...updatedExpenseForm[inputIndentifier]
    };

    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation, inputIndentifier);
    updatedExpenseForm[inputIndentifier] = updatedFormElement;
    let formIsValid = true;
    for(let inputIndentifier in updatedExpenseForm) {
        formIsValid = updatedExpenseForm[inputIndentifier].valid && formIsValid;
    }
    
    this.setState({ expenseForm: updatedExpenseForm, formIsValid: formIsValid });
  }

  componentDidMount() {
    this.setState({
      open: store.getState()["uiState"]["openEditDialog"],
      expense: store.getState()["uiState"]["expenseToEdit"],
    });

    store.subscribe(() => {
      this.setState({
        open: store.getState()["uiState"]["openEditDialog"],
        expenseForm: this.getCurre,
      });
    });
  }

  render() {
    const formElementsArray = [];
        for (let key in this.state.expenseForm) {
            formElementsArray.push({
                id: key,
                config: this.state.expenseForm[key]
            });
        }

        let form = (
            <form>
                {formElementsArray.map(formElement => (
                  <Input 
                    key={formElement.id}
                    elementType={formElement.config.elementType} 
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value }
                    changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
                ))}
            </form>
        );
    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Update Expense</DialogTitle>
          <DialogContent>
            {form}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSave} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default EditDialog;
