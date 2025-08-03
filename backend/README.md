## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Docker Deployment

This section provides instructions for running the backend application using Docker containers with PostgreSQL database.

### Prerequisites

- Docker installed on your system
- Docker daemon running

### Step 1: Create Docker Network

Create a custom Docker network to enable communication between containers:

```bash
$ docker network create aj-network
```

### Step 2: Run PostgreSQL Container

Start a PostgreSQL container with the required environment variables:

```bash
$ docker run --name postgres --network aj-network -e POSTGRES_PASSWORD=postgres -e POSTGRES_USER=postgres -e POSTGRES_DB=posts -p 5432:5432 -d postgres
```

**Command breakdown:**

- `--name postgres`: Names the container "postgres"
- `--network aj-network`: Connects container to our custom network
- `-e POSTGRES_*`: Sets environment variables for database configuration
- `-p 5432:5432`: Maps host port 5432 to container port 5432
- `-d`: Runs container in detached mode
- `postgres`: Uses the official PostgreSQL Docker image

### Step 3: Build Backend Image

Build the Docker image for the backend application:

```bash
$ docker build -t backend .
```

### Step 4: Run Backend Container

Start the backend container with database connection configuration:

```bash
$ docker run --network aj-network --name backend -e DB_HOST=postgres -p 3000:3000 -d backend
```

**Command breakdown:**

- `--network aj-network`: Connects to the same network as PostgreSQL
- `--name backend`: Names the container "backend"
- `-e DB_HOST=postgres`: Sets database host to PostgreSQL container name
- `-p 3000:3000`: Maps host port 3000 to container port 3000
- `-d`: Runs container in detached mode
- `backend`: Uses our built backend image

### Optional: Connect Existing Containers to Network

If you already have running containers, you can connect them to the network:

```bash
# Connect backend container to the network
$ docker network connect aj-network backend

# Connect postgres container to the network
$ docker network connect aj-network postgres
```

### Verify Deployment

- Backend API: http://localhost:3000
- Health Check: http://localhost:3000/health
- Posts API: http://localhost:3000/posts

### Useful Docker Commands

```bash
# View running containers
$ docker ps

# View container logs
$ docker logs backend
$ docker logs postgres

# Stop containers
$ docker stop backend postgres

# Remove containers
$ docker rm backend postgres

# Remove network
$ docker network rm aj-network
```
