import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import { PropTypes } from "prop-types";
import GridHandler from "./GridHandler";

function AgGrid(props) {
  const rowRecord = props.t("No Result Found");
  const agColumnCheck = [];
  const { uniqueKey } = props;
  const { columnDefs, filterIcon, parentStyle } = props.data;

  const getFilterRow = () => {
    return filterRowCount;
  };

  const updateRowCount = (params) => {
    const filterRow = getFilterRow();
    if (!!filterRow && filterRow[uniqueKey]) {
      filterRow[uniqueKey].innerText =
        !!gridApi[uniqueKey] &&
        !!gridApi[uniqueKey].gridOptionsWrapper.gridOptions.floatingFilter
          ? `Showing ${params.api.rowModel.rowsToDisplay.length} of ${params.api.rowModel.rootNode.allLeafChildren.length} Records`
          : `${params.api.rowModel.rootNode.allLeafChildren.length} Records`;
    }
  };

  const resetColumn = async () => {
    if (!!gride[uniqueKey]) {
      const columnApi = gride[uniqueKey].columnApi.getColumnState();
      const updatedApi = columnApi.map((val, index) => {
        const column = val;
        column.hide = !!columnDefs[index].hide;
        agColumnCheck[index].checked = !columnDefs[index].hide;
        return column;
      });
      await gride[uniqueKey].columnApi.setColumnState(updatedApi);
      const allColumnIds = [];
      gride[uniqueKey].columnApi.getAllColumns().forEach((column) => {
        allColumnIds.push(column.colId);
      });
      gride[uniqueKey].columnApi.autoSizeColumns(allColumnIds);
      gridApi[uniqueKey].sizeColumnsToFit();
    }
  };

  const onGridReady = (params) => {
    gride[uniqueKey] = params;
    gridApi[uniqueKey] = params.api;
    if (!!gridApi[uniqueKey]) {
      gridApi[uniqueKey].sizeColumnsToFit();
      gridApi[uniqueKey].resetRowHeights();
      updateRowCount(gride[uniqueKey]);
      if (!!props.gridObj) {
        props.gridObj(gride[uniqueKey]);
      }
    }
  };

  const onRowChange = (params) => {
    updateRowCount(params);
  };

  const toggleColumn = (e) => {
    e.stopPropagation();
    const columnApi = gride[uniqueKey].columnApi.getColumnState();
    columnApi[
      columnApi.findIndex((val) => val.colId === e.target.value)
    ].hide = !e.target.checked;
    gride[uniqueKey].columnApi.setColumnState(columnApi);
    gridApi[uniqueKey].sizeColumnsToFit();
  };

  const thisObject = () => {
    return gride[uniqueKey];
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
            {column.name}
          </label>
        </div>
      );
    });
    return columnList;
  };

  const getDisplayRows = () => {
    return (
      <span
        ref={(val) => {
          filterRowCount[uniqueKey] = val;
        }}
      >
        0 Records
      </span>
    );
  };

  return (
    <div>
      <div
        className="ag-menu-icons"
        style={!filterIcon ? {} : filterIcon.style}
      >
        <div className="row-details">{getDisplayRows()}</div>
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
      </div>
      <div style={parentStyle} className="ag-theme-material">
        <AgGridReact
          gridOptions={GridHandler(props.data, rowRecord, updateRowCount)}
          onGridReady={onGridReady}
          onRowDataChanged={onRowChange}
          rowSelection={
            !!props.data.rowSelection ? props.data.rowSelection : "single"
          }
        />
      </div>
    </div>
  );
}

AgGrid.defaultProps = {
  data: {},
  gridObj: null,
  uniqueKey: "grid",
};

AgGrid.propTypes = {
  data: PropTypes.object,
  gridObj: PropTypes.func,
  uniqueKey: PropTypes.string,
};

export default AgGrid;
