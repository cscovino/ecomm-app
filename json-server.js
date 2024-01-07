const { fakerES } = require("@faker-js/faker");
const { customAlphabet } = require("nanoid");
const alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const nanoid = customAlphabet(alphabet, 8);

fakerES.seed(123);

module.exports = () => {
  const data = { products: [], orders: [] };
  // Create 1000 users
  for (let i = 1; i <= 10; i++) {
    data.products.push({
      id: i,
      reference: nanoid(),
      name: fakerES.commerce.productName(),
      description: fakerES.commerce.productDescription(),
      price: fakerES.commerce.price(),
      tax: fakerES.number.int({ min: 1, max: 15 }),
      quantity: fakerES.number.int({ min: 0, max: 50 }),
    });
  }
  const firstProductQuantity = 2;
  const secondProductQuantity = 4;
  const orderPrice =
    parseInt(data.products[0].price) * firstProductQuantity +
    parseInt(data.products[1].price) * secondProductQuantity;
  const totalOrderPrice =
    parseInt(data.products[0].price) *
    (1 + data.products[0].tax / 100) *
    firstProductQuantity +
    parseInt(data.products[1].price) *
    (1 + data.products[1].tax / 100) *
    secondProductQuantity;
  data.orders.push(
    {
      id: 1,
      orderId: nanoid(),
      products: [
        {
          ...data.products[0],
          orderQuantity: firstProductQuantity,
        },
        {
          ...data.products[1],
          orderQuantity: secondProductQuantity,
        },
      ],
      price: orderPrice,
      totalPrice: totalOrderPrice,
    },
    {
      id: 2,
      orderId: nanoid(),
      products: [
        {
          ...data.products[0],
          orderQuantity: firstProductQuantity,
        },
        {
          ...data.products[1],
          orderQuantity: secondProductQuantity,
        },
      ],
      price: orderPrice,
      totalPrice: totalOrderPrice,
    },
    {
      id: 3,
      orderId: nanoid(),
      products: [
        {
          ...data.products[0],
          orderQuantity: firstProductQuantity,
        },
        {
          ...data.products[1],
          orderQuantity: secondProductQuantity,
        },
      ],
      price: orderPrice,
      totalPrice: totalOrderPrice,
    }
  );
  return data;
};
