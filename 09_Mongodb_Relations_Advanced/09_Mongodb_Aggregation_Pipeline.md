### What is the Aggregation Pipeline?

The **Aggregation Pipeline** in MongoDB is a framework used to process and transform data in stages. You can think of it as a series of steps (stages) that data goes through, where each stage performs an operation on the data.

A pipeline consists of multiple stages, and each stage transforms the data in some way. It's like a production line: each stage does its job, and the output of one stage becomes the input for the next.

### Key Concepts to Understand:

1. **Stage**: Each operation in the pipeline is called a stage. Examples: `$match`, `$group`, `$sort`, etc.
2. **Operator**: These are commands inside the stages that define what you want to do with the data (e.g., `$sum`, `$avg`, `$push`, etc.).
3. **Document**: This is the data that MongoDB stores (basically a record or row in traditional databases).

---

### Example Dataset: `sample_analytics`

Let's imagine we have a collection called **`sales`** with the following sample documents:

```json
{
  "_id": 1,
  "product": "A",
  "quantity": 5,
  "price": 10,
  "date": "2025-01-01"
},
{
  "_id": 2,
  "product": "B",
  "quantity": 3,
  "price": 20,
  "date": "2025-01-02"
},
{
  "_id": 3,
  "product": "A",
  "quantity": 2,
  "price": 10,
  "date": "2025-01-03"
},
{
  "_id": 4,
  "product": "C",
  "quantity": 7,
  "price": 30,
  "date": "2025-01-01"
}
```

---

### 1. **\$match** - Filtering the Data

The **\$match** stage is used to filter documents based on certain conditions.

#### Example: Find sales of **product A**.

```js
db.sales.aggregate([
  { $match: { product: "A" } }
])
```

This will give us documents where the **product** is `"A"`.

---

### 2. **\$group** - Grouping and Aggregating Data

The **\$group** stage is used to group data by a specific field and apply aggregation operators like sum, average, etc.

#### Example: Find the **total sales quantity** of each product.

```js
db.sales.aggregate([
  { $group: { _id: "$product", totalQuantity: { $sum: "$quantity" } } }
])
```

* **\$sum**: This operator calculates the sum of a field. In this case, it calculates the total quantity sold for each product.

Output:

```json
[
  { "_id": "A", "totalQuantity": 7 },
  { "_id": "B", "totalQuantity": 3 },
  { "_id": "C", "totalQuantity": 7 }
]
```

---

### 3. **\$project** - Modifying the Output

The **\$project** stage is used to include, exclude, or modify fields in the output.

#### Example: Show only the **total quantity** and **product name**, but hide the **\_id** field.

```js
db.sales.aggregate([
  { $group: { _id: "$product", totalQuantity: { $sum: "$quantity" } } },
  { $project: { _id: 0, product: "$_id", totalQuantity: 1 } }
])
```

* **\_id: 0**: This excludes the **\_id** field from the output.
* **product: "$\_id"**: This renames the field `_id` to `product`.

Output:

```json
[
  { "product": "A", "totalQuantity": 7 },
  { "product": "B", "totalQuantity": 3 },
  { "product": "C", "totalQuantity": 7 }
]
```

---

### 4. **\$sort** - Sorting the Data

The **\$sort** stage is used to sort documents in ascending or descending order.

#### Example: Sort products by **total quantity** in descending order.

```js
db.sales.aggregate([
  { $group: { _id: "$product", totalQuantity: { $sum: "$quantity" } } },
  { $sort: { totalQuantity: -1 } }
])
```

* **-1**: Sort in descending order.
* **1**: Sort in ascending order.

Output:

```json
[
  { "_id": "A", "totalQuantity": 7 },
  { "_id": "C", "totalQuantity": 7 },
  { "_id": "B", "totalQuantity": 3 }
]
```

---

### 5. **\$limit** - Limiting the Number of Results

The **\$limit** stage is used to limit the number of documents that come out of the pipeline.

#### Example: Show only the **top 2 products** with the highest quantity.

```js
db.sales.aggregate([
  { $group: { _id: "$product", totalQuantity: { $sum: "$quantity" } } },
  { $sort: { totalQuantity: -1 } },
  { $limit: 2 }
])
```

This will show only the top two products based on **total quantity**.

---

### 6. **\$addFields** - Adding New Fields

The **\$addFields** stage is used to add new fields to the documents.

#### Example: Add a **total price** field (`quantity * price`) to each sale.

```js
db.sales.aggregate([
  { $addFields: { totalPrice: { $multiply: ["$quantity", "$price"] } } }
])
```

* **\$multiply**: This multiplies the value of **quantity** and **price**.

Output:

```json
[
  { "_id": 1, "product": "A", "quantity": 5, "price": 10, "date": "2025-01-01", "totalPrice": 50 },
  { "_id": 2, "product": "B", "quantity": 3, "price": 20, "date": "2025-01-02", "totalPrice": 60 },
  { "_id": 3, "product": "A", "quantity": 2, "price": 10, "date": "2025-01-03", "totalPrice": 20 },
  { "_id": 4, "product": "C", "quantity": 7, "price": 30, "date": "2025-01-01", "totalPrice": 210 }
]
```

---

### 7. **\$lookup** - Performing Joins (Left Join)

The **\$lookup** stage allows you to perform a join between collections (like SQL joins).

#### Example: Suppose we have a `products` collection, and we want to join `sales` with `products` to get product details.

```js
db.sales.aggregate([
  { 
    $lookup: {
      from: "products", // the collection to join
      localField: "product", // the field in the `sales` collection
      foreignField: "name", // the field in the `products` collection
      as: "product_details" // the name of the new array field
    }
  }
])
```

This will add a new field **`product_details`** to each document, which will contain matching product information from the **products** collection.

---

### Summary

* **\$match**: Filters the data (like a WHERE clause).
* **\$group**: Aggregates data (like GROUP BY).
* **\$project**: Modifies the output (like SELECT).
* **\$sort**: Sorts the results.
* **\$limit**: Limits the number of results.
* **\$addFields**: Adds or modifies fields.
* **\$lookup**: Joins data from another collection.

---

### Putting It All Together

You can chain multiple stages together to perform complex transformations:

```js
db.sales.aggregate([
  { $match: { product: "A" } },
  { $group: { _id: "$product", totalQuantity: { $sum: "$quantity" } } },
  { $project: { _id: 0, product: "$_id", totalQuantity: 1 } },
  { $sort: { totalQuantity: -1 } },
  { $limit: 1 }
])
```

This will:

1. Filter for product `"A"`.
2. Group by product and calculate the total quantity.
3. Remove the `_id` field and rename it as `product`.
4. Sort the results by quantity in descending order.
5. Limit the results to 1.
