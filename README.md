# Three-Tier Contact Book Application

## Project Overview
This is a Dockerized Three-Tier Contact Book Application developed using React, Flask, and MySQL.

## Architecture

Frontend (React + Nginx)
        |
        v
Backend (Flask REST API)
        |
        v
Database (MySQL)

## Technologies Used

- React.js
- Flask
- MySQL 8
- Docker
- Docker Compose
- Nginx
- AWS EC2 (Ubuntu 24.04)

## Project Structure

```
three-tier-contact-book/
│
├── frontend/
├── backend/
├── database/
├── docker-compose.yml
└── README.md
```

## Features

- Add Contact
- View Contacts
- Update Contact
- Delete Contact

## Run the Project

```bash
docker-compose up -d --build
```

Frontend

```
http://<EC2-Public-IP>
```

Backend API

```
http://<EC2-Public-IP>:5000
```

## Author

Subashree
