const PRODUCTS = [
  {
    id: 1,
    sku: "op10",
    name: "Oneplus 10",
    price: 849.99,
    priceRuleId: null,
  },
  {
    id: 2,
    sku: "op11",
    name: "Oneplus 11",
    price: 949.99,
    priceRuleId: 2,
  },
  {
    id: 3,
    sku: "buds",
    name: "Earbuds",
    price: 129.99,
    priceRuleId: 1,
  },
  {
    id: 4,
    sku: "wtch",
    name: "Smart Watch",
    price: 229.99,
    priceRuleId: null,
  },
];

const PRICE_RULE = [
  {
    id: 1,
    label: "X for Y", //Buy X pay for Y
    thresholdQuantity: 3,
    discountAmount: null,
    payForQuantity: 2,
  },
  {
    id: 2,
    label: "Price drop for each item",
    thresholdQuantity: 5,
    discountAmount: 50,
    payForQuantity: null,
  },
];

const VALID_PRODUCT_IDS = [1,2,3,4];

module.exports = {
  PRODUCTS,
  PRICE_RULE,
  VALID_PRODUCT_IDS
};
