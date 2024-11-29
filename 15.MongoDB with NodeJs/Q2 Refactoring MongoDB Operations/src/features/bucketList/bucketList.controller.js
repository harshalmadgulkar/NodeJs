import BucketListModel from "./bucketList.model.js";
import BucketListRepository from "./bucketList.repository.js";

export default class BucketListController {
  constructor() {
    this.bucketListRepository = new BucketListRepository();
  }

  add = async (req, res) => {
    const { title, description, dateAdded, targetDate, isCompleted } = req.body;
    // Refactor to use the repository method
    const bucketListItem = new BucketListModel(
      title,
      description,
      dateAdded,
      targetDate,
      isCompleted
    );
    const item = await this.bucketListRepository.addBucketListItem(
      bucketListItem
    );
    res.status(201).send(bucketListItem);
  };

  get = async (req, res) => {
    const { title } = req.query;
    // Refactor to use the repository method
    const item = await this.bucketListRepository.findOneBucketListItem(title);

    if (!item) {
      res.status(200).send("Item not found.");
    } else {
      res.status(200).send(item);
    }
  };
}
