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

const payOS = new PayOS(PAYOS_CLIENT_ID, PAYOS_API_KEY, PAYOS_CHECKSUM_KEY);
export const createPayosPayment = handleAsync(async (req, res, next) => {
  const orderCode = Number(String(Date.now()).slice(-6));
  const newOrder = await Order.create({
    ...req.body,
    orderCode,
    paymenMethods: "ONLINE",
  });
  const bodyPayos = {
    orderCode: orderCode,
    amount: newOrder.totalPrice,
    description: "Thanh toan don hang",
    items: newOrder.products,
    cancelUrl: "http://localhost:5173/orderfailed",
    returnUrl: "http://localhost:5173/ordersuccess",
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
export const confirmWebhook = async (url) => {
  try {
    await payOS.confirmWebhook(url);
  } catch (error) {
    console.log(error);
  }
};

export const handlPayOsWebhook = handleAsync(async (req, res) => {
  const payOsOrderCodeTest = 123;
  console.log(req.body);
  const body = req.body;
  if (body?.data.orderCode !== payOsOrderCodeTest) {
    const webhookData = payOS.verifyPaymentWebhookData(body);
    console.log(webhookData);
    if (webhookData.code === "00" && webhookData.desc === "success") {
      const foundOrder = await Order.findOne({
        orderCode: webhookData.orderCode,
        isPaid: false,
      });
      if (!foundOrder) {
        throw createError(400, "Khong tim thay don hang");
      }
      foundOrder.isPaid = true;
      await foundOrder.save();
      return res.status(200).json(null);
    }
  }
  return res.status(200).json(null);
});

export const cancelBackStockProduct = handleAsync(async (req, res) => {});
