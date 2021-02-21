import React from 'react';
import TextField from "@material-ui/core/TextField";
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

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
				<FormControl>
					<InputLabel id="demo-simple-select-label">{props.name}</InputLabel>
					<Select
						native
          	id="demo-simple-select"
						onChange={props.changed}
						value={props.value}>
							<option value="none">
							</option>
							{props.elementConfig.options.map(option => (
								<option key={option.value} defaultValue={props.value === option.displayValue} value={option.value}>
									{option.displayValue}
								</option>
							))}
					</Select>
				</FormControl>;
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