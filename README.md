# React Deadline Scheduler with Spring Boot Backend

## Overview

React Deadline Scheduler with Spring Boot Backend is a web application designed to help users manage deadlines effectively. The front end is built using React, while the backend is powered by Spring Boot, providing a seamless user experience and robust server-side functionality.

## Features

- **Deadline Management**: Users can easily create, update, and delete deadlines, keeping track of their tasks efficiently.

- **Categorization based on Time Left**: Deadlines are automatically categorized based on the time left until their due dates, allowing users to focus on urgent tasks and plan ahead for future ones.

## Getting Started

1. **Clone the Repository**: Clone this repository to your local machine.

   ```bash
   git clone https://github.com/yourusername/react-deadline-scheduler.git
   ```

2. **Frontend Setup**: Navigate to the `frontend` directory and install dependencies.

   ```bash
   cd frontend
   npm install
   ```

3. **Backend Setup**: Navigate to the `backend` directory and install dependencies.

   ```bash
   cd backend
   mvn install
   ```

4. **Set Up Database**: Configure your database settings in the `application.properties` file located in the `backend/src/main/resources` directory.

5. **Run the Application**: Start the backend server first, then start the frontend server.

   ```bash
   # In the backend directory
   mvn spring-boot:run
   
   # In the frontend directory
   npm start
   ```

6. **Access the Application**: Open your browser and navigate to `http://localhost:3000` to access the application.

## Contributing

Contributions are welcome! If you have any ideas for improvements or new features, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- Built with [React](https://reactjs.org/) and [Spring Boot](https://spring.io/projects/spring-boot/)