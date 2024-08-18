# Dr. Harding Appointment Scheduler

This project is a Dockerized React application for scheduling annual physical appointments with Dr. Harding. The application displays available dates for selected months and serves the build using Nginx.

## Prerequisites

- [Docker](https://www.docker.com/get-started) must be installed on your machine.

## How to Run the Application

Follow these steps to build and run the Docker container for this application:

### 1. Clone the Repository

Clone this repository to your local machine:

git clone https://github.com/raneritika/appointment-calendar.git

cd appointment-calendar


### 2. Build the Docker Image

Build the Docker image using the provided Dockerfile:

docker build -t dr-harding-scheduler:latest .

### 3. Run the Docker Container

Run the Docker container to serve the application:

docker run -p 80:80 dr-harding-scheduler:latest

### 4. Access the Application

Open your web browser and go to:

http://localhost

## You should see the Dr. Harding Appointment Scheduler application.



