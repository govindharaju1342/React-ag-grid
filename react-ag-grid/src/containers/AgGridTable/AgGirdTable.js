import React, { Component } from "react";
import AgGrid from "../../components/AgGrid";
import { gridData, defaultColDef } from "../../constants";

class AgGirdTable extends Component {
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
        rowData: gridData,
      },
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

  render() {
    return (
      <div>
        <AgGrid gridData={this.getGridInformation()}></AgGrid>
      </div>
    );
  }
}

export default AgGirdTable;
