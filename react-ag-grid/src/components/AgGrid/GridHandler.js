import moment from 'moment-timezone';
import { defaultColDef } from 'constants/AgGrid';
import { digitalMeasurements } from 'helpers/utilities';
import InputGridColumn from './components/InputGridColumn';
import DropdownGridColumn from './components/DropdownGridColumn';
import CheckBoxGridColumn from './components/CheckBoxGridColumn';
import DateFilterComponent from './components/DateFilterComponent';
import NetAppGridColumn from './components/NetAppGridColumn';

let compareOperator;
let dateTimeFilterValue;
const cellRendererFramework = {
  inputGridColumn: InputGridColumn,
  dropdownGridColumn: DropdownGridColumn,
  checkBoxGridColumn: CheckBoxGridColumn,
  netAppGridColumn: NetAppGridColumn
};

const filterChanged = (updateRowCount, e) => {
  if (e.api.rowModel.rowsToDisplay.length === 0) {
    e.api.showNoRowsOverlay();
  } else {
    e.api.hideOverlay();
  }
  updateRowCount(e);
};

const cellRenderer = {
  alertType: params => {
    switch (params.value.toUpperCase()) {
      case 'WARNING':
        return '<svg stroke="currentColor" fill="#f0ae1d" stroke-width="0" viewBox="0 0 24 24" class="defaultIconClass defaultIconClass" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style="color: rgb(0, 118, 206);"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"></path></svg>';
      case 'ERROR':
        return '<svg stroke="currentColor" fill="#ce1126" stroke-width="0" viewBox="0 0 24 24" class="defaultIconClass defaultIconClass" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style="color: rgb(0, 118, 206);"><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"></path></svg>';
      case 'INFO':
        return '<svg stroke="currentColor" fill="#0076ce" stroke-width="0" viewBox="0 0 24 24" class="defaultIconClass defaultIconClass" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style="color: rgb(0, 118, 206);"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"></path></svg>';
      default:
        return '<svg stroke="currentColor" fill="#0076ce" stroke-width="0" viewBox="0 0 24 24" class="defaultIconClass defaultIconClass" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style="color: rgb(0, 118, 206);"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"></path></svg>';
    }
  },
  scheduleEnabledIcon: params => {
    if (params.value === 'Enable') {
      return '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" class="green" pointer-events="bounding-box" height="0.6em" width="0.6em" xmlns="http://www.w3.org/2000/svg"><path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path></svg>';
    }
    return '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" class="gray" pointer-events="bounding-box" height="0.6em" width="0.6em" xmlns="http://www.w3.org/2000/svg"><path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path></svg>';
  },
  totalBytesToUnitMeasurement: params => {
    let bytes = digitalMeasurements(params.value);
    return bytes;
  },
  currentUsagePercentage: params => {
    let currUsage = `${params.value} %`;
    return currUsage;
  }
};

const getComparator = e => {
  compareOperator = e;
};

const getDateTimeFilterValue = e => {
  dateTimeFilterValue = e;
};

const filterParams = {
  dateComparator: (inputDate, cellValue) => {
    let inputDateUnix = !!dateTimeFilterValue
      ? moment(dateTimeFilterValue).valueOf()
      : moment(inputDate).valueOf();
    let cellValueUnix = moment(cellValue).valueOf();
    if (compareOperator === 'greaterThan') {
      return cellValueUnix > inputDateUnix ? 0 : 1;
    }
    if (compareOperator === 'lessThan') {
      return cellValueUnix < inputDateUnix ? 0 : 1;
    }
    if (compareOperator === 'equals') {
      return inputDateUnix === cellValueUnix ? 0 : 1;
    }
    return null;
  },
  getComparator,
  getDateTimeFilterValue
};

const columnDefs = columns => {
  return columns.map(data => {
    let column = {
      ...data,
      headerName: data.name,
      field: data.field,
      cellStyle: { textAlign: 'left' },
      filter: !!data.dateFilter ? 'agDateColumnFilter' : 'agTextColumnFilter',
      floatingFilterComponentParams: { suppressFilterButton: true },
      customFunction: !!data.customFunction ? data.customFunction : null
    };
    if (!!data.width) {
      column.width = data.width;
    }
    if (!!data.dateFilter) {
      column.filterParams = {
        comparator: filterParams.dateComparator,
        getComparator: filterParams.getComparator,
        getDateTimeFilterValue: filterParams.getDateTimeFilterValue
      };
    }
    if (!!data.cellRenderer) {
      column.cellRenderer = cellRenderer[data.cellRenderer];
      if (data.cellRenderer === 'alertType') {
        column.cellStyle = { textAlign: 'left', justifyContent: 'center' };
      }
    }
    if (!!data.cellRendererFramework) {
      column.cellRendererFramework =
        cellRendererFramework[data.cellRendererFramework.name];
    }
    if (!!data.onChange) {
      column.onChange = data.onChange;
    }
    return column;
  });
};

const GridHandler = (data, rowRecord, updateRowCount) => {
  return {
    defaultColDef,
    columnDefs: columnDefs(data.columnDefs),
    rowClassRules: !!data.rowClassRules ? data.rowClassRules : {},
    rowData: data.rowData,
    frameworkComponents: { agDateInput: DateFilterComponent },
    onRowSelected: !!data.onRowSelected ? data.onRowSelected : null,
    onSelectionChanged: !!data.onSelectionChanged
      ? data.onSelectionChanged
      : null,
    onFilterChanged: filterChanged.bind(this, updateRowCount),
    overlayLoadingTemplate: '<span class="spinner">&nbsp;</span>',
    overlayNoRowsTemplate: `<span style="margin-top:100px; padding: 10px; border: 2px solid #0076ce; background: #fff;">${rowRecord}</span>`,
    customFunction: !!data.customFunction
      ? data.customFunction.bind(this)
      : null,
    accentedSort: true
  };
};
export default GridHandler;
