# 📦 Resource Service

The **resource-service** is a protected NestJS microservice that manages educational resources like **courses** and **companies**. It uses **MongoDB** for persistence and integrates with **Keycloak** for authentication and authorization.

---

## Features

- Role-based access via Keycloak JWTs (`user`, `admin`)
- Manage `courses` and `companies`
- Protected endpoints with access token validation
- MongoDB integration with Mongoose
- Swagger API documentation
- Docker-compatible

---

## Tech Stack

- **NestJS**
- **MongoDB (via Mongoose)**
- **Keycloak** (OAuth 2.0 / OpenID Connect)
- **Swagger**
- **Docker** (optional)

---

## Environment Variables

Create a `.env` file in the root: (Find attached in the email)
