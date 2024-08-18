# Dr. Harding Appointment Scheduler

This project is a Dockerized React application for scheduling annual physical appointments with Dr. Harding. The application displays available dates for selected months and serves the build using Nginx.

## Prerequisites

- [Docker](https://www.docker.com/get-started) must be installed on your machine.

## How to Run the Application

Follow these steps to build and run the Docker container for this application:

### 1. Clone the Repository

Clone this repository to your local machine:

```bash
git clone https://github.com/raneritika/appointment-calendar.git
cd appointment-calendar

### 2. Build the Docker Image
Build the Docker image using the provided Dockerfile:

bash
docker build -t dr-harding-scheduler:latest .

### 3. Run the Docker Container
Run the Docker container to serve the application:

bash
docker run -p 80:80 dr-harding-scheduler:latest

### 4. Access the Application
Open your web browser and go to:

http://localhost

You should see the Dr. Harding Appointment Scheduler application.

**Screenshots**
Here are some screenshots of the application:
<img width="1438" alt="Appointment-calendar-homepage" src="https://github.com/user-attachments/assets/90c10df2-63c6-4504-b9e5-b4507249ee34">

<img width="1433" alt="Appointment-calendar-august" src="https://github.com/user-attachments/assets/accdf988-9b54-4c51-98e2-462862066525">



