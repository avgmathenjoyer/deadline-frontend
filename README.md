# Frontend Client for Deadline Scheduler

This project is a frontend client for a deadline scheduler built using React with Vite. It provides a user-friendly interface for managing deadlines, including functionalities such as adding, editing, deleting, and reading deadlines from a REST API.

## Features

- **Add Deadlines**: Users can easily add new deadlines by providing relevant information such as title, description, due date, etc.
- **Edit Deadlines**: Existing deadlines can be modified, allowing users to update details like title, description, and due date.
- **Delete Deadlines**: Users have the ability to remove deadlines that are no longer needed.
- **View Deadlines**: The client allows users to view a list of deadlines retrieved from the REST API.

## Technologies Used

- **React**: The frontend is built using React.
- **Vite**: Vite is used as the build tool for this project, providing fast and efficient development and building processes.
- **REST API**: The client communicates with a RESTful API to perform CRUD operations on deadlines.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/avgmathenjoyer/deadline-frontend.git
   ```
2. Navigate to the project directory:
   ```bash
   cd deadline-frontend
   ```
3. Install dependencies:
   ```bash
      npm install
   ```

## Usage

1. Setup the .env.local file:
   ```init
      VITE_DATA_URL= # url to your api endpoint. It needs to end with /.
   ```
2. Start the development server:
   ```bash
      npm run dev
   ```

3. Interact with the frontend client to add, edit, delete, and view deadlines as needed.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.