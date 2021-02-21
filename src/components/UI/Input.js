import React from 'react';
import TextField from "@material-ui/core/TextField";
import Select from '@material-ui/core/Select';

const input = ( props ) => {
	let inputElement = null;
	let invalidErr = props.inValid && props.shouldValidate ? true : false;
	/**
	 * Reusable components
	 */
	switch(props.elementType) {
		case('input') :
			inputElement = <TextField error={invalidErr} {...props.elementConfig} value={props.value} 
			onChange={props.changed} />;
			break;
		case('date') :
			inputElement = <TextField error={invalidErr} type="date" {...props.elementConfig} defaultValue={props.value} 
			onChange={props.changed} />;
			break;
		case('select') :
			inputElement = 
				<Select
					native
					onChange={props.changed}
					value={props.value}>
						{props.elementConfig.options.map(option => (
							<option key={option.value} selected={props.value === option.displayValue} value={option.value}>
								{option.displayValue}
							</option>
						))}
				</Select>;
				break;
		default:
			return true;
	}

	return (
		<div>
			{inputElement}
		</div>
	)
}
export default input;