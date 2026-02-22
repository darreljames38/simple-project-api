const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let products = require("./data");

app.use(express.static("public"));

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find(p => p.id == req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(product);
});

app.post("/api/products", (req, res) => {
  const newProduct = {
    id: products.length + 1,
    name: req.body.name,
    price: req.body.price
  };

  products.push(newProduct);
  res.json(newProduct);
});

app.put("/api/products/:id", (req, res) => {
  const product = products.find(p => p.id == req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  product.name = req.body.name;
  product.price = req.body.price;

  res.json(product);
});

app.delete("/api/products/:id", (req, res) => {
  products = products.filter(p => p.id != req.params.id);

  res.json({ message: "Product deleted successfully" });
});

app.listen(5000, () => {
  console.log("Server running at http://localhost:5000");
});
