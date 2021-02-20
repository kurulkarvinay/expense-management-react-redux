import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import store from "../store/index";
import { OPEN_FORM, DELETE_EXPENSE } from "../constants/action-types";
import Button from "@material-ui/core/Button";

class SimpleAppBar extends Component {
	state = {
		checked: []
	};

	openDialog = () => {
		store.dispatch({
			type: OPEN_FORM
		});
	};

	handleDelete = () => {
		store.dispatch({
			type: DELETE_EXPENSE
		});
	};

	componentDidMount() {
		this.setState({
			checked: store.getState()["uiState"]["checked"]
		});

		store.subscribe(() => {
			this.setState({
				checked: store.getState()["uiState"]["checked"]
			});
		});
	}

	render() {

		return (
			<AppBar position="static" color="default">
				<Toolbar>
					<Typography variant="title">
						Expense Management
					</Typography>
					<Button
						style={{
							left: 950,
							fontWeight: "bold"
						}}
						onClick={this.openDialog}
						color="secondary"
					> Add Expense
					</Button>
				</Toolbar>
			</AppBar>
		);
	}
}

export default SimpleAppBar;
