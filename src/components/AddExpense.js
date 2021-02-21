import React, { Component } from 'react';
import Input from '../components/UI/Input'
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import store from "../store/index";
import { CLOSE_FORM } from "../constants/action-types";
import { ADD_EXPENSE } from "../constants/action-types";
window.store = store;

class AddExpense extends Component {
	state = {
		expenseForm: {
			name: {
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
			price: {
				elementType: 'input',
				elementConfig: {
					type: 'number',
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
						{value: 'Travel', displayValue: 'Travel'},
						{value: 'Hotel', displayValue: 'Hotel'},
						{value: 'Grocery', displayValue: 'Grocery'},
						{value: 'School', displayValue: 'School'}
					],
					 placeholder: 'Enter Expense Amount'
				},
				value: '',
				validation: {
					required: false
				},
				valid: true
				
			},
			paymentMode: {
				elementType: 'select',
				elementConfig: {
					options: [
						{value: 'Cash', displayValue: 'Cash'},
						{value: 'GPay', displayValue: 'GPay'},
						{value: 'Debit Card', displayValue: 'Debit Card'},
						{value: 'Credit Card', displayValue: 'Credit Card'}
					]
				},
				value: '',
				validation: {
					required: false
				},
				valid: true
			},
			date: {
				elementType: 'date',
				elementConfig: {
					id: 'date',
					type: 'date'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false
			},
		},
		open: false,
		formIsValid: false,
		newForm: ""
	}

	createExpenseHandler = (event) => {
		event.preventDefault();
		const formData = {};
		let generateId = 0;
		for( let formElementKey in this.state.expenseForm ) {
			formData[formElementKey] = this.state.expenseForm[formElementKey].value;
		}
		if(store.getState()["expenses"].length) {
			let allExpenses = store.getState()["expenses"];
			allExpenses.forEach(expense => {
				if (expense.id > generateId) {
					generateId = expense.id;
				}
			});
			generateId = generateId + 1;
		}

		store.dispatch({
			type: ADD_EXPENSE,
			payload: {
				id: generateId,
				title: formData.name,
				amount: formData.price,
				category: formData.category,
				paymentMode: formData.paymentMode,
				date: formData.date
			}
		});

		this.setState({
			...this.state,
			formIsValid: false
		})
		
		store.dispatch({
			type: CLOSE_FORM
		});
	}

	checkValidity = (value, rules, inputIndentifier) => {
		let valid = true;
		if(rules.required) {
			valid = value.trim() !== '' && valid;
		}

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

	handleClose = () => {
		this.setState({
			...this.state,
			formIsValid: false
		});
		store.dispatch({
			type: CLOSE_FORM,
			payload: {
				openFormDialog: false,
			}
		});
	};

	componentDidMount() {
		this.setState({
			open: store.getState()["uiState"]["openFormDialog"]
		});
	
		store.subscribe(() => {
			this.setState({
				open: store.getState()["uiState"]["openFormDialog"],
			});
		});
	}

	render () {
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
						inValid={!formElement.config.valid}
						shouldValidate={formElement.config.validation}
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
					<DialogTitle id="form-dialog-title">Add Expense</DialogTitle>
					<DialogContent>
						{form}
					</DialogContent>
					<DialogActions>
						<Button onClick={this.handleClose} color="primary">
						Cancel
						</Button>
						<Button disabled={!this.state.formIsValid} onClick={this.createExpenseHandler} color="primary">
						Save
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}

export default AddExpense;