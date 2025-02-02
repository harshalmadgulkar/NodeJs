// productID, userID, quantity
export default class CartItemModel {
  constructor(productID, userID, quantity) {
    this.productID = productID;
    this.userID = userID;
    this.quantity = quantity;
  }
}
