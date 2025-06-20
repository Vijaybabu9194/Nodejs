### **Scenario: E-commerce Sales Analysis**

We have two collections:

1. **orders**: Contains transaction data.
2. **products**: Contains product information.

#### **Sample Data**

##### **orders**

```json
[
  { "_id": 1, "customerId": "C001", "productId": "P001", "amount": 100, "status": "completed", "date": "2025-01-01" },
  { "_id": 2, "customerId": "C002", "productId": "P002", "amount": 200, "status": "completed", "date": "2025-01-02" },
  { "_id": 3, "customerId": "C003", "productId": "P003", "amount": 150, "status": "completed", "date": "2025-01-03" },
  { "_id": 4, "customerId": "C001", "productId": "P001", "amount": 50, "status": "pending", "date": "2025-01-04" },
  { "_id": 5, "customerId": "C002", "productId": "P001", "amount": 75, "status": "completed", "date": "2025-01-05" }
]
```

##### **products**

```json
[
  { "_id": "P001", "name": "Product A", "category": "Electronics" },
  { "_id": "P002", "name": "Product B", "category": "Clothing" },
  { "_id": "P003", "name": "Product C", "category": "Electronics" }
]
```

---

### **Objective**

We will build a MongoDB aggregation pipeline that:

1. Filters completed orders.
2. Joins the `orders` collection with the `products` collection using `$lookup`.
3. Groups the data by `customerId` and calculates the total amount spent by each customer.
4. Projects the result to display `customerId`, `productName`, and `totalSpent`.
5. Sorts the customers by their `totalSpent` in descending order.

---

### **Aggregation Pipeline**

```javascript
db.orders.aggregate([
    // Step 1: Match only completed orders
    { $match: { status: "completed" } },

    // Step 2: Lookup to join orders with products
    { $lookup: {
        from: "products",
        localField: "productId",
        foreignField: "_id",
        as: "productDetails"
    }},

    // Step 3: Unwind the productDetails array to extract product info
    { $unwind: "$productDetails" },

    // Step 4: Group by customerId and calculate the total amount spent
    { $group: {
        _id: "$customerId",
        totalSpent: { $sum: "$amount" },
        products: { $push: "$productDetails.name" }
    }},

    // Step 5: Project the final output
    { $project: {
        customerId: "$_id",
        totalSpent: 1,
        products: 1,
        _id: 0
    }},

    // Step 6: Sort by totalSpent in descending order
    { $sort: { totalSpent: -1 } }
])
```

---

### **Explanation of Pipeline Stages**

1. **\$match**: Filters the orders to include only those with `status` set to "completed".
2. **\$lookup**: Joins the `orders` collection with the `products` collection based on `productId`.
3. **\$unwind**: Deconstructs the `productDetails` array into separate documents, ensuring we can access the product's name.
4. **\$group**: Groups the documents by `customerId` and calculates the `totalSpent` using `$sum`. It also aggregates the list of products purchased by each customer using `$push`.
5. **\$project**: Projects the final fields we want: `customerId`, `totalSpent`, and `products`.
6. **\$sort**: Sorts the customers by `totalSpent` in descending order.

---

### **Mermaid Diagram of the Pipeline**

```mermaid
graph TD;
    A[Start] --> B[$match: { status: "completed" }];
    B --> C[$lookup: Join with products];
    C --> D[$unwind: Product Details];
    D --> E[$group: Group by customerId];
    E --> F[$project: Customer details and totalSpent];
    F --> G[$sort: Sort by totalSpent];
    G --> H[End];
```

---

### **Sample Output**

After running the aggregation pipeline, you should get an output similar to this:

```json
[
  { "customerId": "C002", "totalSpent": 275, "products": ["Product B", "Product A"] },
  { "customerId": "C003", "totalSpent": 150, "products": ["Product C"] },
  { "customerId": "C001", "totalSpent": 150, "products": ["Product A"] }
]
```

### **Explanation of Output**

* **C002** spent the most money: **275**. They bought "Product B" and "Product A".
* **C003** spent **150** on "Product C".
* **C001** spent **150** on "Product A".

---

### **Additional Complex Example: Date Range Analysis**

Let’s extend the example to filter transactions within a specific date range and calculate the average amount spent per customer.

```javascript
db.orders.aggregate([
    { $match: { 
        status: "completed", 
        date: { $gte: new Date("2025-01-01"), $lt: new Date("2025-01-10") }
    }},
    { $lookup: {
        from: "products",
        localField: "productId",
        foreignField: "_id",
        as: "productDetails"
    }},
    { $unwind: "$productDetails" },
    { $group: {
        _id: "$customerId",
        totalSpent: { $sum: "$amount" },
        averageSpent: { $avg: "$amount" },
        products: { $push: "$productDetails.name" }
    }},
    { $project: {
        customerId: "$_id",
        totalSpent: 1,
        averageSpent: 1,
        products: 1,
        _id: 0
    }},
    { $sort: { totalSpent: -1 } }
])
```

#### **Sample Output with Average Spend**

```json
[
  { "customerId": "C002", "totalSpent": 275, "averageSpent": 137.5, "products": ["Product B", "Product A"] },
  { "customerId": "C003", "totalSpent": 150, "averageSpent": 150, "products": ["Product C"] },
  { "customerId": "C001", "totalSpent": 150, "averageSpent": 150, "products": ["Product A"] }
]
```

This updated pipeline includes an **average spending** calculation (`$avg`) for each customer during a specific time range.

---

### **Summary**

In this detailed example:

* We filtered the data for completed transactions.
* Used `$lookup` to join the `orders` with the `products` collection.
* Grouped the data by `customerId` to calculate total and average spending.
* Projected the final output and sorted the customers by their spending.
