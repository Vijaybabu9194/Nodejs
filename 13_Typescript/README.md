# 🐳 Docker

## 📚 Table of Contents

1. [What is Docker?](#-what-is-docker)
2. [Installing Docker Desktop](#-installing-docker-desktop)
3. [Running Your First Docker Container: Hello World](#-running-your-first-docker-container-hello-world)
4. [Understanding the Dockerfile](#-understanding-the-dockerfile)
    * [Single-Stage Build](#-single-stage-build)
    * [Multi-Stage Build](#-multi-stage-build)
5. [Creating and Running a Docker Image](#-creating-and-running-your-docker-image)
6. [Recap](#-recap)

---

## 💡 What is Docker?

Docker is a platform used to **develop, ship, and run applications** in lightweight, portable containers. A **container
** packages your code along with all its dependencies, ensuring it works on any machine that runs Docker.

### Key Terms

* **Image**: A snapshot of an application and its environment.
* **Container**: A running instance of an image.
* **Dockerfile**: A script that defines how to build a Docker image.

---

## 🖥️ Installing Docker Desktop

### For Windows, Linux and macOS:

1. Visit the official Docker site:
   🔗 [https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop)

2. Download Docker Desktop for your operating system.

3. Run the installer and follow the on-screen instructions.

4. After installation, launch Docker Desktop and wait for the Docker daemon to start.

5. To verify Docker is installed, open a terminal (or Command Prompt/PowerShell) and type:

   ```bash
   docker --version
   ```

You should see something like:

```
Docker version x.y.z, build abcdef1234
```

---

## 🚀 Running Your First Docker Container: Hello World

1. Open a terminal or command prompt.

2. Run the following command:

   ```bash
   docker run hello-world
   ```

3. Docker will:

    * Pull the `hello-world` image if it’s not already downloaded.
    * Start a container that prints a confirmation message.

4. You should see output similar to:

   ```
   Hello from Docker!
   This message shows that your installation appears to be working correctly.
   ```

🎉 Congratulations! You’ve run your first Docker container.

---

## 🧱 Understanding the Dockerfile

Here are two approaches to building a Docker image for a TypeScript Node.js application:

---

### 🔹 Single-Stage Build

If you're working on a simple project or want a more straightforward build (at the cost of a larger image), you can use
a **single-stage Dockerfile** like this:

```Dockerfile
FROM node:20

WORKDIR /app
COPY . .

RUN npm install
RUN npm run build
RUN npm install --omit=dev

CMD ["npm", "run", "start"]
```

#### How It Works:

* **Single stage**: Everything happens in one image, so it's easier to understand.
* **Larger image size**: Dev dependencies and build artifacts are included unless explicitly removed.
* **Faster builds for local testing or small apps**.

📝 **Tip**: This is great for beginners or CI systems where image size isn't critical.

---

### 🏗️ Multi-Stage Build

```Dockerfile
FROM node:20 AS builder

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
RUN npm install --omit=dev

FROM node:20-slim
WORKDIR /app
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/package.json /app/package.json
CMD ["npm", "run", "start"]
```

### What This Dockerfile Does:

#### Stage 1: `builder`

* **`FROM node:20 AS builder`**
  Uses the official Node.js 20 image to set up a build environment.

* **`WORKDIR /app`**
  Sets the working directory to `/app`.

* **`COPY . .`**
  Copies the entire project into the container.

* **`RUN npm install`**
  Installs all dependencies (including dev dependencies).

* **`RUN npm run build`**
  Builds the project (e.g., transpiles TypeScript to JavaScript).

* **`RUN npm install --omit=dev`**
  Reinstalls only the production dependencies.

#### Stage 2: Final Image

* **`FROM node:20-slim`**
  Uses a smaller Node.js image to reduce size.

* **`WORKDIR /app`**
  Sets working directory again.

* **`COPY --from=builder`**
  Copies only the necessary build output and dependencies from the builder stage.

* **`CMD ["npm", "run", "start"]`**
  Starts the application.

---

## 🔨 Creating and Running Your Docker Image

### Step 1: Create a Dockerfile

Make sure your project folder contains:

* `Dockerfile` (as shown above)
* TypeScript source code
* `package.json`, `package-lock.json`
* Build script in `package.json` (`"build"` and `"start"` scripts defined)

### Step 2: Build the Image

In your terminal, navigate to the project directory and run:

```bash
docker build -t bootcamp_typescript .
```

* `-t bootcamp_typescript` gives the image a name.
* `.` tells Docker to use the current directory as context.

### Step 3: Run the Container

```bash
docker run -p 3000:3000 bootcamp_typescript
```

* `-p 3000:3000` maps port 3000 on your machine to port 3000 in the container.
* Replace `3000` with whatever port your app uses.

### Step 4: Test the App

Open a browser and go to:

```
http://localhost:3000
```

You should see your application running.

---

## 🧼 Clean Up

To remove the container:

```bash
docker ps -a       # Find container ID
docker rm <container_id>
```

To remove the image:

```bash
docker rmi bootcamp_typescript
```

---

## 🎯 Recap

You've just:

* Installed Docker
* Run your first container
* Understood a real-world Dockerfile
* Built and ran a Node.js TypeScript app in a Docker container

By mastering these steps, you're now equipped to containerize and ship any Node.js or TypeScript project. 🛳️

