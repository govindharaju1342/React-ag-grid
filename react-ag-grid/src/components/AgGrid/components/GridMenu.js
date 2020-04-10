import React from "react";
import { PropTypes } from "prop-types";
const exportParams = {
  skipHeader: false,
  columnGroups: false,
  skipFooters: true,
  skipGroups: false,
  skipPinnedTop: true,
  skipPinnedBottom: true,
  allColumns: false,
  onlySelected: false,
  suppressQuotes: false,
  fileName: "",
  columnSeparator: ",",
};

const GridMenu = (props) => {
  const menuRef = [];
  const hideMenu = (e) => {
    let input = e.target.classList;
    if (
      !input.contains("show-lists") &&
      !input.contains("grid-dropdown-option")
    ) {
      menuRef.forEach((val) =>
        !!val ? val.classList.remove("show-lists") : null
      );
    }
  };
  document.addEventListener("mousedown", hideMenu);
  const showColumnMenu = (e) => {
    e.stopPropagation();
    let input = e.target.classList;
    if (input.contains("show-lists")) {
      e.currentTarget.classList.remove("show-lists");
    } else {
      e.currentTarget.classList.add("show-lists");
    }
  };
  const exportGridData = (e) => {
    e.stopPropagation();
    e.target.parentNode.parentNode.classList.remove("show-lists");
    exportParams.skipHeader = e.target.getAttribute("data-header") === "true";
    exportParams.fileName =
      props.config.reportName + e.target.getAttribute("data-filename");
    props.thisObject().api.exportDataAsCsv(exportParams);
  };
  const showFilters = () => {
    const thisObject = props.thisObject();
    thisObject.api.gridOptionsWrapper.gridOptions.floatingFilter = !thisObject
      .api.gridOptionsWrapper.gridOptions.floatingFilter;
    thisObject.api.refreshHeader();
    thisObject.api.sizeColumnsToFit();
    thisObject.api.setFilterModel(null);
  };
  const refresh = () => {
    const thisObject = props.thisObject();
    thisObject.api.showLoadingOverlay();
    thisObject.api.gridOptionsWrapper.gridOptions.floatingFilter = false;
    thisObject.api.refreshHeader();
    if (!!thisObject) {
      props.config.refresh();
    }
  };
  return (
    <div className="gird-menu">
      <div
        title={"Refresh"}
        style={{ width: "20px", margin: "0 0 12px 0", color: "#007db8" }}
        onClick={refresh}
        role="button"
        tabIndex="0"
        onKeyDown={() => {}}
      >
        <img src="/refresh.png" />
      </div>
      <div
        className="ag-dropdown icon-two"
        onClick={showColumnMenu}
        title={"Show/Hide Table Columns"}
        role="button"
      >
        <img src="/column.png" />
        <div className="ag-icon-column-dropdown show-lists">
          <button
            type="button"
            className="btn secondary btn-block grid-dropdown-option"
            onClick={props.resetColumn}
          >
            {"Reset Columns"}
          </button>
          {props.getColumnList()}
        </div>
      </div>
      <div
        className="ag-dropdown icon-one"
        onClick={showColumnMenu}
        role="button"
        ref={(input) => {
          menuRef.push(input);
        }}
        title={"Export CSV"}
      >
        <img src="/download.png" />
        <div className="ag-icon-export-dropdown">
          <button
            type="button"
            className="btn secondary btn-block grid-dropdown-option"
            data-header="true"
            data-filename="_WithoutHeaders"
            onClick={exportGridData}
          >
            {"Export CSV Without Headers"}
          </button>
          <button
            type="button"
            className="btn secondary btn-block grid-dropdown-option"
            data-header="false"
            data-filename="_WithHeaders"
            onClick={exportGridData}
          >
            {"Export CSV With Headers"}
          </button>
        </div>
      </div>
      <div
        title={"Filters"}
        onClick={showFilters}
        role="button"
        tabIndex="0"
        className="filterCon"
      >
        <img src="/filter.png" />
      </div>
      <div className="row-details-border" />
    </div>
  );
};

GridMenu.propTypes = {
  thisObject: PropTypes.func,
  resetColumn: PropTypes.func,
  getColumnList: PropTypes.func,
};
GridMenu.defaultProps = {
  thisObject: {},
  resetColumn: {},
  getColumnList: {},
};
export default GridMenu;
