import React, { Component } from "react";
import Button from "@material-ui/core/Button";
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
						{value: 'Cash', displayValue: 'Cash'},
						{value: 'GPay', displayValue: 'GPay'},
						{value: 'Debit Card', displayValue: 'Debit Card'},
						{value: 'Credit Card', displayValue: 'Credit Card'}
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
				value: '',
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

	componentDidMount() {
		this.setState({
			open: store.getState()["uiState"]["openEditDialog"],
			expense: store.getState()["uiState"]["expenseToEdit"],
		});

		store.subscribe(() => {
			this.getCurrentState(store.getState()["uiState"]["expenseToEdit"])
		});
	}

	handleClose = () => {
		store.dispatch({
			type: CLOSE_EDIT_FORM
		});
	};

	checkValidity = (value, rules, inputIndentifier) => {
		let valid = true;
		if(rules.required) {
				valid = value.trim() !== '' && valid;
		}
		return valid;
	}
	
	updateExpenseHandler = (event) => {
		event.preventDefault();
		
		const formData = {};
		for( let formElementKey in this.state.expenseForm ) {
			formData[formElementKey] = this.state.expenseForm[formElementKey].value;
		}
		store.dispatch({
			type: UPDATE_EXPENSE,
			payload: {
				id: formData.id,
				title: formData.title,
				amount: formData.amount,
				category: formData.category,
				paymentMode: formData.paymentMode,
				date: formData.date
			}
		});
		
		store.dispatch({
			type: CLOSE_EDIT_FORM
		});
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
	
	getFormattedDate = (date) => {
		date = new Date(date);  
		let d = date.getDate();
		let m = date.getMonth() + 1;
		let y = date.getFullYear();

		let dateString = (d <= 9 ? '0' + d : d) + '-' + (m <= 9 ? '0' + m : m) + '-' + y;
		let newDate = dateString.split('-');
		return `${newDate[2]}-${newDate[1]}-${newDate[0]}`;
	}

	getCurrentState = (editFromData) => {
		const updatedExpenseForm = {
			...this.state.expenseForm
		};

		let updatedFormElement = {};
		for (let key in editFromData) {
			updatedFormElement = {
			...updatedExpenseForm[key]
			}
			
			updatedFormElement.value = key === 'date' ? this.getFormattedDate(editFromData[key]):editFromData[key];
			updatedFormElement.valid = true;
			updatedExpenseForm[key] = updatedFormElement;
		}
		
		this.setState({ 
			...this.state,
			open: store.getState()["uiState"]["openEditDialog"],
			expenseForm: updatedExpenseForm,
			formIsValid: true
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
							value={formElement.config.value}
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
					<DialogTitle id="form-dialog-title">Update Expense</DialogTitle>
					<DialogContent>
						{form}
					</DialogContent>
					<DialogActions>
						<Button onClick={this.handleClose} color="primary">
							Cancel
						</Button>
						<Button disabled={!this.state.formIsValid} onClick={this.updateExpenseHandler} color="primary">
							Save
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}

export default EditDialog;
