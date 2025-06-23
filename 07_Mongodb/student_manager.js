require('dotenv').config();
const {MongoClient} = require('mongodb');

(async () => {
    const connection = await MongoClient.connect(process.env.MONGODB_URI)
    /**
     * Select Database student_manager
     */
    const db = connection.db('student_manager');
    /**
     * Select collection students
     */
    const students = db.collection('students');
    /**
     * Inset Many Students
     */
    const insertMany = await students.insertMany([
        {name: "Alice", age: 20, grade: "A"},
        {name: "Bob", age: 22, grade: "B"},
        {name: "Charlie", age: 23, grade: "C"},
        {name: "David", age: 21, grade: "B"}
    ])
    console.log("insertMany ->");
    console.log(insertMany)
    console.log("<-");
    /**
     * Inset One
     */
    const insertOne = await students.insertOne({
        name: "Eve", age: 20, grade: "A"
    })
    console.log("insertOne ->");
    console.log(insertOne)
    console.log("<-");
    /**
     * Find all documents within the collection
     */
    const findAll = await students.find()
    console.log("findAll ->");
    console.log(await findAll.toArray());
    console.log("<-");
    /**
     * We can also pass queries to our find function, example:
     * 1. { grade: 'B' }
     * 2. { grade: 'B', age: 21 }
     */
    const findByQuery = await students.find({
        grade: 'B'
    })
    console.log("findByQuery ->");
    console.log(await findByQuery.toArray());
    console.log("<-");

    /**
     * Update One Matching Document
     */
    const updateOne = await students.updateOne(
        {
            name: "Eve"
        },
        {
            $set: {
                grade: "B",
                distinction: true,
            },
            $inc: {
                age: 1
            }
        },
    )
    console.log("updateOne ->");
    console.log(updateOne);
    console.log((await students.findOne({name: "Eve"})));
    console.log("<-");

    /**
     * Query and filter data
     * Operators:
     * $eq, $ne, $gt, $lt, $gte, $lte, $in, $nin,
     * $and, $or, $not, $nor // logical
     */
    const eqAndNeOperators = await students.find({
        grade: {
            $eq: "B",
        },
        age: {
            $ne: 22
        }
    })
    console.log("eqAndNeOperators ->");
    console.log(await eqAndNeOperators.toArray());
    console.log("<-");

    /**
     * Find greater than 20 and less than 25 but should not be 22
     */
    const gtAndLtOperators = await students.find({
        age: {
            $ne: 22,
            $gt: 20,
            $lt: 25
        }
    })
    console.log("gtAndLtOperators ->");
    console.log(await gtAndLtOperators.toArray());
    console.log("<-");

    const gteAndLteOperators = await students.find({
        age: {
            $gte: 20,
            $lte: 25
        }
    })
    console.log("gteAndLteOperators ->");
    console.log(await gteAndLteOperators.toArray());
    console.log("<-");

    const inAndNinOperators = await students.find({
        grade: {
            // $in: ["A", "B"],
            $nin: ["A", "B"],
        }
    })
    console.log("inAndNinOperators ->");
    console.log(await inAndNinOperators.toArray());
    console.log("<-");

    /**
     * Delete by query, this will delete all the documents which will match
     */
    const deleteByQuery = await students.deleteMany({
        grade: "C"
    })
    console.log("deleteByQuery ->");
    console.log(deleteByQuery);
    console.log("<-");
    /**
     * Delete All
     */
    const deleteAll = await students.deleteMany()
    console.log("deleteAll ->");
    console.log(deleteAll);
    console.log("<-");
    /**
     * once we're done, close the database connection
     */
    await connection.close()
})()
