## 📦 Node.js ES Module

---

## 📂 1. Creating a Simple Express App with ES Module Syntax



### 📁 Project Structure

```
my-app/
├── index.js
├── routes/
│   └── userRoutes.js
├── controllers/
│   └── userController.js
└── package.json
```
---
### 📄 `package.json`

```json
{
  "name": "project_name",
  "type": "module", // Enable ES module syntax
  ...
}

```

---

### 📄 `index.js`

```js
import express from 'express';
import userRoutes from './routes/userRoutes.js';
const app = express();

app.use(express.json());
app.use('/users', userRoutes);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

---

### 📄 `routes/userRoutes.js`

```js
import {Router} from 'express';
import { getUsers, createUser } from '../controllers/userController.js';
const router = Router();

router.get('/', getUsers);
router.post('/', createUser);

export default router;
```

---

### 📄 `controllers/userController.js`

```js
function getUsers(req, res) {
  res.json({ message: 'List of users' });
}

function createUser(req, res) {
  const { name } = req.body;
  res.json({ message: `User ${name} created` });
}

export {
  getUsers,
  createUser,
};
```

---

## 🔁 2. Practice Task

Create your own small app using the es module syntax:

> **📝 Task:** Build a simple "Product API" with:

* `/products` route (GET and POST)
* `productController.js` for logic
* Use `import` and `export` properly instead of `require` and `module.exports`
