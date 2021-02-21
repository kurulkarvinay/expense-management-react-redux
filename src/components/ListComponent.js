import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import store from "../store/index";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/Delete";
import CommentIcon from "@material-ui/icons/Edit";
import { OPEN_EDIT_FORM, DELETE_EXPENSE } from "../constants/action-types";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
window.store = store;

const styles = theme => ({
	root: {
		width: "100%",
		height: 360,
		backgroundColor: theme.palette.background.paper
	},

	table: {
		minWidth: 650,
	},
});

class ListComponent extends Component {
	state = {
		checked: [],
		items: []
	};
	
	componentDidMount() {
		this.setState({
			items: store.getState()["expenses"]
		});

		store.subscribe(() => {
			this.setState({
				items: store.getState()["expenses"]
			});
		});
	}

	openEditDialog = value => {
		store.dispatch({
			type: OPEN_EDIT_FORM,
			payload: value
		});
	};

	handleDelete = (value) => {
		store.dispatch({
			type: DELETE_EXPENSE,
			payload: value
		});
	};

	getFormattedDate = (strDate) => {
		const date = new Date(strDate);
		return date.toDateString();
	}

	renderMetadata = (data) => {
		const metaData = (data.map(value => (
			<TableRow key={value.id}>
				<TableCell component="th" scope="row">
					<IconButton onClick={() => this.handleDelete(value.id)} color="inherit" style={{
						left: 40
					}}>
					<AccountCircle />
					</IconButton>
				</TableCell>
				<TableCell align="right">
					{(this.getFormattedDate(value.date))}
				</TableCell>
				<TableCell align="right">{value.title}</TableCell>
				<TableCell align="right">{value.category}</TableCell>
				<TableCell align="right">${value.amount}</TableCell>
				<TableCell align="right">{value.paymentMode}</TableCell>
				<TableCell>
					<IconButton
						aria-label="Comments"
						onClick={() => this.openEditDialog(value)}
					>
						<CommentIcon />
					</IconButton>
				</TableCell>
			</TableRow>
			)))

		return metaData;
	}

	render() {
		const { classes } = this.props;
		return (
			<div className={classes.root}>
				<Table className={classes.table} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>Delete Action</TableCell>
							<TableCell>Date</TableCell>
							<TableCell align="right">Bill Reference</TableCell>
							<TableCell align="right">Expense Category</TableCell>
							<TableCell align="right">Amount</TableCell>
							<TableCell align="right">Payment Mode</TableCell>
							<TableCell align="right">Edit Action</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{this.renderMetadata(this.state.items)}
					</TableBody>
				</Table>
			</div>
		);
	}
}

ListComponent.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ListComponent);
