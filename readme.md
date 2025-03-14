# Easy-ticketing 🚀

## Table of Contents
1. [Introduction](#introduction)
2. [Technologies Used](#technologies-used)
3. [Getting Started](#getting-started)
4. [Features](#features)
5. [Authentication and Access Control](#authentication-and-access-control)
6. [Development Actions](#development-actions)
7. [API Documentation](#api-documentation)

## Introduction 
Easy-ticketing provides a powerful backend for managing customer support tickets, offering a seamless experience for users and support agents alike. Built with Node.js, TypeScript, and Express.js, this API enables efficient creation, updating, and tracking of support tickets, ensuring effective issue resolution and improved customer satisfaction.

## Technologies Used
- Node.js
- TypeScript
- Express.js
- MongoDB (Database)
- JWT (JSON Web Tokens)
- POSTMAN (Testing)
- Swagger (for API documentation)

## Getting Started
To run the Ticketing System REST API locally on your system:
1. Clone the repository.
2. Install dependencies by running `npm install`.
3. Start the development server with `npm run dev`.

## Features

#### Ticket Management:
- Create, retrieve, and update ticket details.
- Filter and sort tickets based on status, category, or priority.

#### Ticket Assignment:
- Support agents can claim unassigned tickets.
- Tickets are assigned atomically to prevent concurrency issues.
- Support agents can reassign tickets to other agents if needed.

#### Ticket Communication:
- Users and agents can communicate by adding ticket comments.

#### Ticket Updates:
- Ticket logs are updated and can be retrieved to track changes.

#### Ticket Notifications:
- Email notifications are sent to users on various ticket updates using nodemailer and Gmail service transporter.

## Authentication and Access Control
The API implements RBAC (Role-Based Access Control) with JWT (JSON Web Tokens) for authentication. 
Different roles, such as admin, support agent, and customer, have access permissions based on their roles.

## Implementation Details
- Effective Error Handling: Implemented error handling mechanisms to provide informative error messages to users.
- Validated and sanitized user input to prevent security vulnerabilities, such as encrypted passwords on the client-side using bcrypt.
- MVCS Architecture: Built on the Model-View-Controller-Services architecture to organize code effectively.
- Testing: Thoroughly tested the application using integration tests from routes->services on POSTMAN

- Documentation: Used Swagger to create interactive documentation in Swagger UI. The documentation can be accessed by going to `{{baseUrl}}/api-docs`.

## API Documentation
To explore the API endpoints and their usage, access the Swagger UI documentation at `{{baseUrl}}/api-docs`.

---
