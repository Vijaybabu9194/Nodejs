Here are some advanced questions related to MongoDB aggregation pipeline that you can solve for practice. These questions cover a range of topics from basic aggregation to complex transformations, joining data from multiple collections, and working with arrays.

---

### **1. Simple Filtering and Aggregation**

#### **Question 1: Total Sales by Product Category**

* You are given an `orders` collection where each document contains a `productId` and `amount`.
* You are also given a `products` collection, which contains a `category` field for each product.
* Write an aggregation pipeline to calculate the **total sales amount** for each product category.

#### **Example Data**:

`orders`:

```json
[
  { "productId": "P001", "amount": 100 },
  { "productId": "P002", "amount": 200 },
  { "productId": "P003", "amount": 150 },
  { "productId": "P001", "amount": 50 }
]
```

`products`:

```json
[
  { "_id": "P001", "category": "Electronics" },
  { "_id": "P002", "category": "Clothing" },
  { "_id": "P003", "category": "Electronics" }
]
```

---

### **2. Grouping and Sorting**

#### **Question 2: Top 3 Customers by Total Spending**

* You are given an `orders` collection with fields like `customerId`, `amount`, and `status`.
* Write an aggregation pipeline to find the **top 3 customers** who spent the most money, **only considering completed orders**.

#### **Example Data**:

```json
[
  { "customerId": "C001", "amount": 100, "status": "completed" },
  { "customerId": "C002", "amount": 200, "status": "completed" },
  { "customerId": "C003", "amount": 150, "status": "pending" },
  { "customerId": "C001", "amount": 50, "status": "completed" }
]
```

---

### **3. Complex Aggregation with Multiple Stages**

#### **Question 3: Product Sales with Date Filtering**

* You have an `orders` collection with fields such as `productId`, `amount`, and `date`.
* You want to calculate the **total amount spent** on each product within a specific date range (e.g., from `2025-01-01` to `2025-01-31`).
* You are also given a `products` collection, which contains product details.
* Write an aggregation pipeline that groups orders by product, calculates the total sales for each product within the specified date range, and projects the product name along with the total sales.

#### **Example Data**:

`orders`:

```json
[
  { "productId": "P001", "amount": 100, "date": "2025-01-01" },
  { "productId": "P001", "amount": 50, "date": "2025-01-02" },
  { "productId": "P002", "amount": 200, "date": "2025-01-05" },
  { "productId": "P001", "amount": 75, "date": "2025-02-01" }
]
```

`products`:

```json
[
  { "_id": "P001", "name": "Product A" },
  { "_id": "P002", "name": "Product B" }
]
```

---

### **4. Handling Arrays and Unwinding**

#### **Question 4: Calculate Total Spending by Each Customer**

* The `orders` collection contains an array `items`, where each item has a `productId` and `quantity`.
* You are given a `products` collection with product information.
* Write an aggregation pipeline to calculate the **total spending** by each customer, considering all items in the `items` array for each order.
* Include the product name and calculate the total cost per item by multiplying `quantity` with the `product price`.

#### **Example Data**:

`orders`:

```json
[
  { "customerId": "C001", "items": [{ "productId": "P001", "quantity": 1 }, { "productId": "P002", "quantity": 2 }] },
  { "customerId": "C002", "items": [{ "productId": "P001", "quantity": 3 }] }
]
```

`products`:

```json
[
  { "_id": "P001", "name": "Product A", "price": 100 },
  { "_id": "P002", "name": "Product B", "price": 50 }
]
```

---

### **5. Lookup and Joins**

#### **Question 5: Order Details with Product Information**

* You have an `orders` collection with fields like `orderId`, `productId`, and `quantity`.
* You also have a `products` collection with fields like `name`, `category`, and `price`.
* Write an aggregation pipeline that performs a join (`$lookup`) to bring product information into the `orders` collection, and then calculate the total cost (`quantity * price`) for each order.

#### **Example Data**:

`orders`:

```json
[
  { "orderId": 1, "productId": "P001", "quantity": 3 },
  { "orderId": 2, "productId": "P002", "quantity": 2 }
]
```

`products`:

```json
[
  { "_id": "P001", "name": "Product A", "category": "Electronics", "price": 100 },
  { "_id": "P002", "name": "Product B", "category": "Clothing", "price": 50 }
]
```

---

### **6. Complex Aggregation with Arrays and Conditional Logic**

#### **Question 6: Average Spending by Customer with Discounts**

* The `orders` collection has fields like `customerId`, `amount`, and `status`. If the `amount` is greater than 100, a 10% discount applies to the order.
* Write an aggregation pipeline to calculate the **average spending** by each customer after applying the discount for orders with `amount > 100`.

#### **Example Data**:

```json
[
  { "customerId": "C001", "amount": 120, "status": "completed" },
  { "customerId": "C002", "amount": 90, "status": "completed" },
  { "customerId": "C001", "amount": 50, "status": "completed" }
]
```

---

### **7. Grouping by Date and Calculating Time Series Metrics**

#### **Question 7: Daily Sales Aggregation**

* You have an `orders` collection with fields like `amount` and `date`.
* Write an aggregation pipeline that groups the sales by day and calculates the **total amount** and **average amount** for each day.

#### **Example Data**:

```json
[
  { "amount": 100, "date": "2025-01-01" },
  { "amount": 200, "date": "2025-01-01" },
  { "amount": 150, "date": "2025-01-02" },
  { "amount": 50, "date": "2025-01-03" }
]
```

---

### **8. Using \$facet for Multiple Aggregations**

#### **Question 8: Sales and Customer Statistics**

* You want to compute two things simultaneously for each customer:

    1. **Total spending** per customer.
    2. **Total number of orders** per customer.
* Use the `$facet` operator to create both aggregations in a single pipeline.

#### **Example Data**:

```json
[
  { "customerId": "C001", "amount": 100, "status": "completed" },
  { "customerId": "C001", "amount": 150, "status": "completed" },
  { "customerId": "C002", "amount": 200, "status": "completed" }
]
```

---

### **9. Complex Aggregation with Nested Documents**

#### **Question 9: Filter and Aggregate by Nested Fields**

* You have an `orders` collection with nested `items` arrays containing `productId`, `quantity`, and `price`. You also have a `products` collection with product details.
* Write an aggregation pipeline that:

    1. Unwinds the `items` array.
    2. Looks up product details from the `products` collection.
    3. Filters the orders to only include those that have purchased products in the "Electronics" category.
    4. Calculates the **total cost** for each order.

---

### **10. Handling Complex Conditional Logic**

#### **Question 10: Conditional Grouping Based on Order Status**

* You have an `orders` collection with fields like `customerId`, `amount`, and `status`.
* Write an aggregation pipeline that:

    1. Groups orders by `customerId`.
    2. Sums the `amount` for **completed** and **pending** orders separately.

#### **Example Data**:

```json
[
  { "customerId": "C001", "amount": 100, "status": "completed" },
  { "customerId": "C001", "amount": 50, "status": "pending" },
  { "customerId": "C002", "amount": 200, "status": "completed" }
]
```

---

### **Final Notes**

These questions will help you dive deeper into the advanced features of MongoDB's aggregation pipeline, including filtering, joining collections, working with arrays, and performing complex calculations. Try solving these questions using the pipeline and feel free to experiment with additional operators for greater complexity!
