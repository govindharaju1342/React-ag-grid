import React, { Component } from "react";
import AgGrid from "../../components/AgGrid";
import data from "../../mockdata/data.json";
import Modal from "../../components/Modal"
import { defaultColDef } from "../../constants"; 

class AgGirdTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: {
        show: false,
        content: '' 
      }
    }
  }
  
  hideShowModal = (data) => {  
    this.setState( { 
        modal: {
          show: !!data,
          content: !!data ? JSON.stringify(data) : null
        }
    })
  };

  refreshFunction = () => {
    console.log("refresh");
  };

  getGridInformation = () => {
    return {
      gridOptions: {
        defaultColDef,
        columnDefs: [
          {
            field: "empId",
            headerName: "Emp Id",
          },
          {
            field: "employee_name",
            headerName: "Name",
          },
          {
            field: "gender",
            headerName: "Gender",
            cellRenderer: (params) => {
              switch (params.value.toUpperCase()) {
                case "MALE":
                  return "<img alt='img' src= './male.png' title=Male />";
                default:
                  return "<img alt='img' src= './female.png' title=Female />";
              }
            },
          },
          {
            field: "employee_salary",
            headerName: "Salary",
          },
          {
            field: "employee_age",
            headerName: "Age",
          },
          {
            field: "email",
            headerName: "Email",
          },
          {
            field: "pno",
            headerName: "Phone Number",
          },
        ],
        paginationPageSize: 10,
        rowData: data       
      },
      onRowSelect: this.getRowSelect,       
      filterIcon: {
        show: true,
        refresh: this.refreshFunction,
        reportName: "EmployeeList",
      },
      parentStyle: {
        width: "100%",
        height: "calc(100vh - 180px)",
        minHeight: "200px",
      },
    };
  };

  getRowSelect = event => { 
    if (event.node.selected) {
      this.hideShowModal(event.node.data) 
    }
    
  };

  render() {  
    const { modal} = this.state;
    console.log(modal)
    return (
      <div>
        <Modal modalData={modal} closeFunction = { this.hideShowModal} />
        <AgGrid gridData={this.getGridInformation()}></AgGrid>
      </div>
    );
  }
}

export default AgGirdTable;
