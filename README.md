# SpaceX Dashboard

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

## Features

### Absolute Import

This application support importing modules using absolute paths.\
To import a module located at src/components/Button.js, you can import the module like so:

```js
import Button from "components/Button";
```

## Components

### DateFilter

Date filter component takes in default Ranges , selected filter value, and a function to set the selected value as props

```js
import DateFilter from "components/DateFilter";

<DateFilter
  selected={selectedDate}
  setSelected={onSelectDateFilter}
  defaultRanges={defaultRanges}
/>;
```

### DateFilter

Date filter component takes in options to select from , selected filter value, and a function to set the selected value as props

```js
import FilterComponent from "components/FilterComponent";

<FilterComponent
  options={filterOptions}
  selected={selectedFilter}
  setSelected={onSelectFilter}
/>;
```

### LoadingComponent

```js
import LoadingComponent from "components/LoadingComponent";

<LoadingComponent />;
```

### LoadingComponent

```js
import PaginationComponent from "components/PaginationComponent";

<PaginationComponent
  activePage={activePage}
  countPerPage={12}
  totalCount={totalCount}
  onChange={onPageChange}
/>;
```

### TableComponent

```js
import TableComponent from "components/TableComponent";

<TableComponent tableData={tableData} loading={tableLoading} />;
```
