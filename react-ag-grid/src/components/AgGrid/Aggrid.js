import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import { PropTypes } from "prop-types";
import GridMenu from "./components/GridMenu";
import "./AgGrid.scss";

const gridApi = {};
function AgGrid(props) {
  const agColumnCheck = [];
  const {
    gridOptions,
    filterIcon,
    parentStyle,
    rowSelection,
    uniqueKey = "grid",
  } = props.gridData;
  const { columnDefs } = gridOptions;
  const thisObject = () => {
    return gridApi[uniqueKey];
  };
  const onGridReady = (params) => {
    gridApi[uniqueKey] = params;
    gridApi[uniqueKey].api.sizeColumnsToFit();
  };
  const getColumnList = () => {
    const columnList = columnDefs.map((column, index) => {
      return (
        <div
          className={
            !!column.disabled
              ? "dropdown-item grid-dropdown-option columnDisabled"
              : "dropdown-item grid-dropdown-option"
          }
          key={`${uniqueKey}${index.toString()}`}
        >
          <input
            type="checkbox"
            name={column.field}
            ref={(input) => {
              agColumnCheck.push(input);
            }}
            className="ag-column-check grid-dropdown-option"
            value={column.field}
            id={column.field}
            defaultChecked={!column.hide}
            onChange={toggleColumn}
            disabled={!!column.disabled}
          />
          <label
            className="grid-dropdown-option"
            htmlFor={column.field}
            disabled={!!column.disabled}
          >
            {column.headerName}
          </label>
        </div>
      );
    });
    return columnList;
  };
  const toggleColumn = (e) => {
    const columnApi = gridApi[uniqueKey].columnApi.getColumnState();
    columnApi[
      columnApi.findIndex((val) => val.colId === e.target.value)
    ].hide = !e.target.checked;
    gridApi[uniqueKey].columnApi.setColumnState(columnApi);
    gridApi[uniqueKey].api.sizeColumnsToFit();
  };

  const resetColumn = async () => {
    if (!!gridApi[uniqueKey]) {
      const allColumnIds = [];
      const columnApi = gridApi[uniqueKey].columnApi.getColumnState();
      const updatedApi = columnApi.map((val, index) => {
        const column = val;
        column.hide = !!columnDefs[index].hide;
        agColumnCheck[index].checked = !columnDefs[index].hide;
        return column;
      });
      await gridApi[uniqueKey].columnApi.setColumnState(updatedApi);
      gridApi[uniqueKey].columnApi.getAllColumns().forEach((column) => {
        allColumnIds.push(column.colId);
      });
      gridApi[uniqueKey].columnApi.autoSizeColumns(allColumnIds);
      gridApi[uniqueKey].api.sizeColumnsToFit();
    }
  };
  return (
    <div>
      <div style={parentStyle} className="ag-theme-material">
        {!!filterIcon ? (
          <GridMenu
            config={filterIcon}
            thisObject={thisObject}
            resetColumn={resetColumn}
            getColumnList={getColumnList}
          />
        ) : (
          ""
        )}
        <AgGridReact
          gridOptions={gridOptions}
          onGridReady={onGridReady}
          pagination={true}
          rowSelection={!!rowSelection ? rowSelection : "single"}
        />
      </div>
    </div>
  );
}

AgGrid.defaultProps = {
  gridData: {},
};

AgGrid.propTypes = {
  gridData: PropTypes.object,
};

export default AgGrid;
