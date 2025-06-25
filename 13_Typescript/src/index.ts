import express from 'express';

const port: string = `${process.env.PORT || 3001}`;

const app = express();

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the API",
    status: "success"
  })
})

app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});
