# gustara_assignment

## Prerequisites

- Node.js (v14 or later)
- MongoDB

## Installation

1. Clone the repository
2. Install dependencies
3. Set up the environment variables:

Create a `.env` file in the project root folder and add the following variables:

`MONGODB_URL`
`AWS_BUCKET_NAME`
`ACCESS_KEY_ID`
`SECRET_ACCESS_KEY`
`REGION`

4. Start the server: `npm run dev`
5. The server will start running on `http://localhost:3000`.

## API Endpoints
### Categories
- `POST /categories`: Create a new category
- `GET /categories`: Get all categories
- `GET /categories/:id`: Get a category by ID
- `PUT /categories/:id`: Update a category by ID

### SubCategories
- `POST /subcategories/:categoryId`: Create a new subcategory under a category
- `GET /subcategories`: Get all subcategories
- `GET /subcategories/:id`: Get a subcategory by ID
- `PUT /subcategories/:id`: Update a subcategory by ID

### Items
- `POST /items/subcategory/:subcategoryId`: Create a new item under a subcategory
- `POST /items/category/:categoryId`: Create a new item under a category
- `GET /items`: Get all items
- `GET /items/category/:categoryId`: Get an item under category
- `GET /items/subcategory/:subcategoryId`: Get an item under subcategory
- `GET /items/getItemById/:id`: Get an item by ID
- `PUT /items/:id`: Update an item by ID
- `GET /items/search?name=<query>`: Search for items by name

## Short Answers

### Which database you have chosen and why?

I have chosen MongoDB as the database for this application. MongoDB is a popular NoSQL database that offers flexibility, scalability, and ease of use. It's particularly well-suited for applications that require storing and retrieving data in a schema-less or flexible manner, which is often the case with menu management systems like guestara where the data structure can be complex and evolving.

### 3 things that you learned from this assignment?

Gained experience in designing and implementing a RESTful API for managing hierarchical data structures like categories, subcategories, and items.
Learned how to handle nested data relationships using MongoDB's embedded document model and referencing.

### What was the most difficult part of the assignment?

The most difficult part of the assignment was implementing the search functionality for items by name. Handling regular expressions and case-insensitive searches required some research and understanding of MongoDB's query syntax. Additionally, ensuring proper error handling and input validation for the search endpoint was challenging.

### What you would have done differently given more time?

Given more time, I would have:

Added more comprehensive input validation and error handling for all API endpoints.
Implemented authentication and authorization mechanisms to secure the API routes.
Introduced caching mechanisms to improve performance for frequently accessed data.
Implemented pagination and sorting for endpoints that return large amounts of data.
