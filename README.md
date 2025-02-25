# Movie Search App

## Overview
This is a React-based movie search application that fetches data from the OMDb API. Users can search for movies, view details in a modal, and navigate through paginated results.

## Features
- **User Authentication**: Users must log in to access the movie search.
- **Movie Search**: Fetches movies from the OMDb API dynamically as the user types.
- **Pagination**: Users can navigate through multiple pages of results.
- **Error Handling**: Displays appropriate messages for errors like no results found.
- **Loading Indicator**: Shows a loading state while fetching data.
- **Modal View**: Clicking a movie card opens a modal with full details.
- **Logout Functionality**: Allows users to log out securely.

## Installation
### Prerequisites
Ensure you have **Node.js** and **npm** installed.

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/movie-search-app.git
   cd movie-search-app
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the application:
   ```sh
   npm start
   ```

## Login Procedure
1. Launch the app (`npm start`).
2. Enter the pre-stored username and password:
   - **Username**: `admin`
   - **Password**: `1234`
3. Click the **Login** button.
4. On successful login, you will be redirected to the movie search page.

## Dependencies
- React
- React Router DOM
- Bootstrap
- OMDb API

## API Configuration
This project uses **Context API** to manage API credentials. Ensure you provide the API key in `ApiContext.js`:
```js
export const API_KEY = "your_api_key_here";
export const API_URL = "https://www.omdbapi.com/";
```

## Usage
1. **Search for movies** by typing in the search bar.
2. **Click on a movie** to view full details in a modal.
3. **Use pagination** to navigate through multiple pages.
4. **Click logout** to return to the login page.
