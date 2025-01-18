export default {
  name: "order",
  type: "document",
  title: "Order",
  fields: [
    { name: "customerName", type: "string", title: "Customer Name" },
    {
      name: "products",
      type: "array",
      of: [{ type: "reference", to: [{ type: "product" }] }],
      title: "Products",
    },
    { name: "total", type: "number", title: "Total Price" },
    { name: "status", type: "string", title: "Order Status" },
    { name: "createdAt", type: "datetime", title: "Order Date" },
  ],
};