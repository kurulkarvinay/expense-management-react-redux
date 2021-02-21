import React, { Component } from "react";
import SimpleAppBar from "./components/SimpleAppBar";
import ListComponent from "./components/ListComponent";
import AddExpense from "./components/AddExpense";
import EditDialog from "./components/EditDialog";
import store from "./store/index";
window.store = store;

class AppComponent extends Component {

  render() {
    return (
      <div>
        <SimpleAppBar />
        <ListComponent />
        <AddExpense />
        <EditDialog />
      </div>
    );
  }
}

export default AppComponent;
