import React, { Component } from "react";

class Aggird extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backLog: null,
    };
    this.gridObj = {};
  }

  componentDidMount() {
    //this.getBackupLog();
    //this.gridObj.api.setRowData([])
  }

  getGridObj = (obj) => {
    this.gridObj = obj;
  };

  getGridInformation = () => {
    const { backLog } = this.state;
    return {
      columnDefs: [
        {
          name: this.props.t("Log"),
          field: "Log",
        },
      ],
      rowData: backLog,
      filterIcon: {
        show: true,
        refresh: this.getBackupLog,
        reportName: "BackupLog",
        helpurl: "",
      },
      parentStyle: {
        width: "100%",
        height: "calc(100vh - 230px)",
        minHeight: "200px",
      },
    };
  };

  render() {
    const { backLog } = this.state;

    return (
      <>
        <div className="pr-4 pl-4">ag grid fff</div>
      </>
    );
  }
}

export default Aggird;
