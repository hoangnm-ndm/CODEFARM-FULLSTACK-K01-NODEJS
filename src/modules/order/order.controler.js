import PayOS from "@payos/node";
import handleAsync from "../../common/utils/handleAsync.js";
import {
  PAYOS_API_KEY,
  PAYOS_CHECKSUM_KEY,
  PAYOS_CLIENT_ID,
} from "../../common/configs/environments.js";
import createResponse from "../../common/utils/response.js";
import Order from "./order.model.js";
import createError from "../../common/utils/error.js";
const fakeData = {
  userId: "1",
  address: "Ha Noi",
  phoneNumber: "0383144530",
  note: "day la ghi chu",
  products: [
    {
      name: "Quan 1",
      price: 20000,
      quantity: 1,
    },
  ],
  totalPrice: 20000,
  isPaid: false,
  status: "pending",
};
const payOS = new PayOS(PAYOS_CLIENT_ID, PAYOS_API_KEY, PAYOS_CHECKSUM_KEY);
export const createPayosPayment = handleAsync(async (req, res, next) => {
  const orderCode = Number(String(Date.now()).slice(-6));
  const newOrder = await Order.create({
    orderCode,
    ...fakeData,
    paymenMethods: "ONLINE",
  });
  const bodyPayos = {
    orderCode: orderCode,
    amount: newOrder.totalPrice,
    description: "Thanh toan don hang",
    items: newOrder.products,
    cancelUrl: "http://localhost:3000/cancel.html",
    returnUrl: "http://localhost:8000/api/orders/return",
  };
  const createPaymentLink = await payOS.createPaymentLink(bodyPayos);
  return res
    .status(200)
    .json(
      createResponse(
        true,
        200,
        "TAO link thanh toan thanh cong",
        createPaymentLink
      )
    );
});

export const returnConfirmPayment = handleAsync(async (req, res, next) => {
  const query = req.query;
  if (query.code === "00" && query.status === "PAID") {
    const foundOrder = await Order.findOne({
      orderCode: query.orderCode,
      isPaid: false,
    });
    if (!foundOrder) {
      return res.redirect(`http://localhost:3000/checkout/error`);
    }
    foundOrder.isPaid = true;
    await foundOrder.save();
    return res.redirect(`http://localhost:3000/checkout/success`);
  } else {
    return res.redirect("http://localhost:3000/checkout/error");
  }
});
