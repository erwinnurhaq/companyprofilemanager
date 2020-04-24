# Introduction

This App is made for test purposes only. This was created using the React Redux Starter Kit by davezuko with certainly modified in such a way as to be the app that is needed.

This App is called Company Profile Information Manager. The main goal is to create an app that will list company data and its office. There is a form that can add company data and display the list of results in the form of cards. There is also a form that can add office data which, if successfully added, will redirect to its company data page and its office list.

## Table of Contents
1. [Requirements](#requirements)
1. [Installation](#installation)
1. [Running the Project](#running-the-project)
1. [Project Structure](#project-structure)
1. [About](#about)
    * [Styling](#styling)
    * [Home Page](#home-page)
    * [Detail Company Page](#detail-company-page)
1. [Thank You](#thank-you)

## Requirements
* node `^5.0.0`
* yarn `^0.23.0` or npm `^3.0.0`

## Installation

After confirming that your environment meets the above [requirements](#requirements), you can install the project app:

```bash
$ git clone https://github.com/erwinnurhaq/companyprofilemanager.git <folder-name>
$ cd <folder-name>
$ npm install
```

## Running the Project

After completing the [installation](#installation) step, you can start the development server:

```bash
$ npm start
```

## Project Structure

The project structure mengikuti bawaan React Redux Starter Kit by davezuko dengan sedikit perubahan.

```
.
├── build                            # All build-related code
├── public                           # Static public assets (not imported anywhere in source code)
├── server                           # Express application that provides webpack middleware
│   ├── main.js                      # Server application entry point
│   ├── routes.js                    # Route for api end point
│   ├── controller.js                # Controller api that include function to read & write database json
│   └── data.json                    # Database json that will store company and office lists.
├── src                              # Application source code
│   ├── index.html                   # Main HTML page container for app
│   ├── main.js                      # Application bootstrap and rendering
│   ├── normalize.js                 # Browser normalization and polyfills
│   ├── components                   # Global Reusable Components
│   │   ├── SVG                      # Contain SVG that need in app
│   │   ├── App.js                   # Component app that include provider and router
│   │   ├── ButtonFluid.js           # Component button stylized that will have 100% width
│   │   ├── Card.js                  # Component card template
│   │   ├── FormContainer.js         # Component form template
│   │   ├── Input.js                 # Component input stylized
│   │   └── Modal.js                 # Component modal template
│   ├── layouts                      # Components that dictate major page structure
│   │   ├── PageLayout               # Layout that will include in every page
│   │   ├── Modules                  # Module that will be needed in layout
│   │   │   ├── CompanyCards.js      # For showing company lists
│   │   │   ├── OfficeCards.js       # For showing office lists
│   │   │   ├── FormCreateCompany.js # For showing form to create new company
│   │   │   └── FormCreateOffices.js # For showing form to create new office
│   │   ├── Helper                   # Contain helper
│   │   │   ├── Formatter.js         # Currency formatter
│   │   │   └── Validation.js        # Form validator
│   │   ├── DetailCompany.js         # Layout for detail company page and its office list
│   │   └── Home.js                  # Layout for home page including form and company list
│   ├── routes                       # Main route definitions and async split points
│   │   ├── index.js                 # Bootstrap main application routes with store
│   │   ├── HomeView.js              # Route for home page
│   │   └── DetailCompanyView.js     # Route for detail company page
│   ├── store                        # Redux-specific pieces
│   │   ├── createStore.js           # Create and instrument redux store
│   │   ├── reducers.js              # Reducer registry
│   │   ├── location.js              # Location history reducer
│   │   ├── phoneCode.js             # Storing phone code list
│   │   ├── company.js               # Storing company list
│   │   └── office.js                # Storing office list
│   └── styles                       # Application-wide styles folder
        └── main.scss                # Main app styles
```

## About

### Styling

This app uses Bootstrap classes for styling.

### Home Page

On this home page, it is divided into 3 main parts, the form for creating new company, the form for creating new office, and the list card that displays the companies that have been created.

On initial, home page will fetch company list from server and phone code from external api that will be used on form. Both of phone code and company list will be stored on redux so it can be accessed globally.

```js
useEffect(() => {
    props.phoneCodeFetch()
    props.companyFetch()
}, [])
```

* Creating new company and office

State for the form will be the object that has the label property of each input and contains the value (for value input), isValid (boolean which states the input is valid or not), and message (displays invalid message).

```js
const initialState = {
    inputname: { value: '', isValid: null, message: '' },
}
const [state, setState] = useState(initialState)
```

Then form will have the button to submit with the function. It will check if there is an empty form. If there are blanks, it will setState for either company or office with isValid false along with invalid message. Then it will also check whether the input type and character length are appropriate. If something is not appropriate, it will setState for either company or office with isValid false along with invalid message.

New company or new office will not be created until both have a pass value = true.

```js
//example function submit new company
const createCompanyHandler = e => {
    e.preventDefault()

    //checkBlank and checkValid function return an object pass (boolean) and data (including invalid message)
    let isNotBlank = checkBlank(company)
    if (isNotBlank.pass === false) setCompany(isNotBlank.data)
    let isValidCompany = checkValidCompany(company)
    if (isValidCompany.pass === false) setCompany(isValidCompany.data)

    //do create company if all pass, set input to blank, and show modal alert
    if (isNotBlank.pass && isValidCompany.pass) {
        props.createCompany({
            name: company.name.value,
            address: company.address.value,
            revenue: company.revenue.value,
            phoneCode: company.phoneCode.value,
            phoneNumber: company.phoneNumber.value
        })
        setCompany(initialCompany)
        setModalCreateCompany(true)
    }
}
```

On successfully creating new company or office, both of createCompany and createOffice actions on redux will dispatch companyFetch or officeFetch so the list of companies or offices will always be updated.

On successfully creating new company, a modal will show and on click ok it will close the modal. But on successfully creating new office, a modal will show and on click ok it will redirect to company detail page by providing company id on router, then will display all the list offices that the selected company has.

* Company cards

Company cards will render all company list into card component when company list length (which is an array) on redux is not empty. Company list will be provided to company cards props (although it is also possible to get directly from redux) and card components will receive each company data as props.

```js
<CompanyCards
    data={props.companies}          //list of companies
    formatter={formatter}           //formatting currency on revenue
    onDelete={deleteConfirmation}   //will show confirmation modal on card delete click
    onCardClick={onCardClick}       //will redirect to company detail page showing its offices
/>
```
```js
//map through list of companies if it's not empty
const renderCards = () => props.data.list.length > 0 ? props.data.list.map(company => (
    <Card
        key={company.id}
        title={company.name}
        onDelete={() => props.onDelete(company.id)}
        onCardClick={() => props.onCardClick(company.id)}
    >
        //--rest of data on children here--
    </Card>
)) : (
  //else show no company exist
)
```

### Detail Company Page

On this detail company page, it is divided into 2 main parts, the detail of the selected company and the list card that displays the offices that the company has.

On initial, company detail page will fetch office list by company id from server. The company id is obtained through provided query. Company detail page also will fetch list of companies if haven't fetched before. Then setState for company data by selected company.

Office list will be stored on redux so it can be accessed globally.

```js
useEffect(() => {
    if (props.companies.list.length === 0) props.companyFetch()
    props.officeFetch(id)
}, [])
```

* Selected company detail

The selected company detail data is provided by filtering the list of companies on redux by selected company id and then setState company.

```js
const [company, setCompany] = useState(null)

useEffect(() => {
    setCompany(props.companies.list.filter(i => i.id === parseInt(id))[0])
}, [props.companies.list])
```

* Office cards

Office cards will render all office list into card component when office list length (which is an array) on redux is not empty. Office list will be provided to office cards props (although it is also possible to get directly from redux) and card components will receive each office data as props.

```js
<OfficeCards
    data={props.offices}            //list of offices that the selected company has
    onDelete={deleteConfirmation}   //will show confirmation modal on card delete click
/>
```
```js
//map through list of offices if it's not empty
const renderCards = () => props.data.list.length > 0 ? props.data.list.map(office => (
    <Card
        key={office.id}
        title={office.name}
        onDelete={() => props.onDelete(office.id)}
        onCardClick={() => console.log(office.id)}
    >
        //--rest of data on children here--
    </Card>
)) : (
  //else show no office exist
)
```

## Thank you