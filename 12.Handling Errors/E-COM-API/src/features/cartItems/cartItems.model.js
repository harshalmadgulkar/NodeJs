// productID, userID, quantity
export default class CartItemModel {
  constructor(productID, userID, quantity) {
    this.productID = productID;
    this.userID = userID;
    this.quantity = quantity;
  }

  static delete(cartItemID, userID) {
    const cartItemIndex = cartItems.findIndex(
      (i) => i.id == cartItemID && i.userID == userID
    );
    if (cartItemIndex == -1) {
      return "Item not found";
    } else {
      cartItems.splice(cartItemIndex, 1);
    }
  }
}