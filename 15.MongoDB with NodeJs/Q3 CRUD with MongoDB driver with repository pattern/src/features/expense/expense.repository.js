import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";

class ExpenseRepository {
  constructor() {
    this.collectionName = "expenses"; // name of the collection in mongodb
  }

  // Create a new expense
  async addExpense(expense) {
    const db = getDB();
    const collection = db.collection(this.collectionName);
    return await collection.insertOne(expense);
  }

  // Get one expnese by its ID
  async getOne(id) {
    const db = getDB();
    const collection = db.collection(this.collectionName);
    const expense = await collection.findOne({ _id: new ObjectId(id) });
    return expense;
  }

  // Get all expenses
  async getAllExpenses() {
    const db = getDB();
    const collection = db.collection(this.collectionName);
    return await collection.find().toArray();
  }

  // Add tag to an expense
  async addTagToExpense(id, tag) {
    const db = getDB();
    const collection = db.collection(this.collectionName);

    const filter = { _id: new ObjectId(id) };
    const update = { $push: { tags: tag } };
    const result = await collection.updateOne(filter, update);
    return await collection.findOne(filter);
  }

  // Filter expenses based on date, amount, and isRecurring field
  async filterExpenses(criteria) {
    const db = getDB();
    const collection = db.collection(this.collectionName);
    const query = {};
    if (criteria.minAmount || criteria.maxAmount) {
      query.amount = {};

      if (criteria.minAmount) {
        query.amount.$gte = parseFloat(criteria.minAmount);
      }

      if (criteria.maxAmount) {
        query.amount.$lte = parseFloat(criteria.maxAmount);
      }
    }

    if (criteria.isRecurring !== undefined) {
      query.isRecurring = criteria.isRecurring === "true";
    }

    const expenses = await db
      .collection(this.collectionName)
      .find(query)
      .toArray();
    return expenses;
  }
}

export default ExpenseRepository;
