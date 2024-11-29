import { getDB } from "../../config/mongodb.js";

class BucketListRepository {
  async addBucketListItem(bucketListItem) {
    // Write your code here
    const db = getDB();
    const collection = db.collection("bucketListItems");
    return await collection.insertOne(bucketListItem);
  }

  async findOneBucketListItem(title) {
    // Write your code here
    const db = getDB();
    const item = await db.collection("bucketListItems");
    return await item.findOne({ title });
  }
}

export default BucketListRepository;
