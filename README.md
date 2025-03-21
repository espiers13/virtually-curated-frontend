# Virtually Curated - Frontend

A web application that allows users to discover artworks from the V&A and Chicago Institute of Art by searching and filtering results. Users can also add artworks to their own collections to review at their own pleasure. These can be updated by deleting or adding more artwork.
This application uses a React.js frontend, and a PSQL backend database storing user information. It also accesses databases from both V&A API and Chicago Institute of Art API.

## Features

- Dynamic Page Layouts: Pages and layouts built with React components. Using Tailwind and MUI libraries.
- All data (users, collections) is fetched from the backend using Axios.
- Tailwind CSS: Used for styling the components.
- Filtering and searching results with a mix of frontend and backend code to support this.

## Tech Stack

Frontend:

- React
- Tailwind CSS
- Axios for API requests
- MUI

Backend:

- Database:
- PostgreSQL (integrated via the backend)
- V&A and Chicago Institute of Art APIs

## Installation

Ensure you have the following installed:

Node.js (v14.x or later)
npm (v6.x or later)

1. Clone the repository:
   `https://github.com/espiers13/virtually-curated-frontend.git`

2. Navigate to the project directory:
   `cd virtually-curated-frontend`

3. Install dependencies:
   `npm install`

4. To run the app in development mode:
   `npm run dev`
   The application will be available at http://localhost:5174.

5. To build and run the app in production:
   `npm run build`
   `npm run start`

## Exploring the Application - User Journey

A test user has been setup to explore the database, but you are welcome to create a new user too.

Test User:
Username - test
Password - test123

- Users can search either the V&A or Chicago Institute of Art collections, or can access both collections together through All Collections.

- Clicking through an item card will take you to that item page, where a user can add the item to their own collection.
  NB. You must be logged in to do this.

- Users can view personal collections by clicking My Collections from the menu. Here they can also set up a new collection, or view collections already existing. Users can delete their collections, or individual items from them.
