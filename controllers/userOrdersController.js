const Order = require("../models/orderModel");
const addressInfo = require("../models/addressInfo");
const Product = require("../models/productModel");
const cartModel = require("../models/cartModel");
const Shipping = require("../models/delivereyChargeModel");
const Coupon = require("../models/couponModel");
/////////////////////////////////// create order //////////////////////////////////////////


///////////////////////////// All Ok Create Order   //////////////

exports.createOrder = async (req, res) => {
  try {
    const addressId = req.params.addressId;
    const userId = req.user._id;
    const data = req.body;
    let {
      shippingInfo,
      paymentInfo,
      id,
      status,
      shippingPrice,
      userID,
      deliverySlot,
    } = data;

    const addressData = await addressInfo.findById(addressId).select({
      _id: 0,
      __v: 0,
      createdAt: 0,
      updatedAt: 0,
    });

    if (!addressData) {
      return res
        .status(404)
        .json({ status: false, message: "Address not found" });
    }

    ////////////////////// deliveryslot  //////////////////
    if (
      !deliverySlot ||
      !deliverySlot.day ||
      !deliverySlot.startTime ||
      !deliverySlot.endTime
    ) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid delivery slot data" });
    }
    //////////////////////////////////////////////////////

    const name = addressData.name;

    shippingInfo = {
      name: name,
      phoneNo: addressData.phoneNo,
      houseFlatNo: addressData.houseFlatNo,
      blockName: addressData.blockName || "",
      street: addressData.street,
      landMark: addressData.landMark || "",
      pinCode: addressData.pinCode,
      locality: addressData.locality,
      saveAddressAs: addressData.saveAddressAs,
      deliverySlot: {
        day: deliverySlot.day,
        startTime: deliverySlot.startTime,
        endTime: deliverySlot.endTime,
      },
    };

    const cartProduct = await cartModel.findOne({ userId: userId });

    if (cartProduct.items.length === 0) {
      return res.status(400).json({
        status: false,
        message:
          "Can't place an order with an empty cart. Add your products to the cart.",
      });
    }

    const items = cartProduct.items.map((cartItem) => ({
      productId: cartItem.productId,
      quantity: cartItem.quantity,
    }));

    data.shippingInfo = shippingInfo;
    data.items = items;

 //////////  Apply coupon code if provided for that  //////////////

let totalPrice = parseFloat(cartProduct.totalPrice)

 if (req.body.promoCode) {
  const coupon = await Coupon.findOne({ promoCode: req.body.promoCode });

  if (!coupon) {
    return res
      .status(404)
      .json({ status: false, message: "Invalid coupon code" });
  }

  if (coupon.expiry < Date.now()) {
    return res
      .status(400)
      .json({ status: false, message: "Coupon code has expired" });
  }

  const discountPercentage = parseFloat(coupon.discount);
  const discountAmount =  parseFloat(( parseFloat(cartProduct.totalPrice) * discountPercentage) / 100);
  totalPrice -= discountAmount;
  console.log("totalPicePromo", totalPrice);
}
console.log("totalPicePromo", totalPrice);

data.totalPrice = totalPrice;

/////////////// Shipping Charge /////////////////////

    let shipping = 0;

    const shipCharge = await Shipping.find();

    if (
      parseFloat(cartProduct.totalPrice) >=
      parseFloat(shipCharge[0].freeShipingLimit)
    ) {
      shipping = 0
      shippingPrice = data.shippingPrice = 0;
    } else {
      shipping = parseFloat(cartProduct.totalPrice);
      if (!isNaN(parseFloat(shipCharge[0].shippingCharge))) {
        shipping = parseFloat(shipCharge[0].shippingCharge);
        shippingPrice = data.shippingPrice = Number(
          shipCharge[0].shippingCharge
        );
      }
    }

    const totalItems = cartProduct.totalItems;

    data.totalItems = totalItems;
   
    data.totalPrice = parseFloat(totalPrice + shipping)

    // Set paidAt timestamp
    
    if (data.paymentMethod.online === true) {
      const timestamp = Date.now();
      const dateObj = new Date(timestamp);
      data.paidAt = dateObj.toLocaleString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
    }

    // Validate payment information for online payment
    if (data.paymentMethod.online === true) {
      if (!(data.paymentInfo.id && data.paymentInfo.status)) {
        return res
          .status(400)
          .json({
            status: false,
            message:
              "Please provide Payment id and status if you are paying online",
          });
      }
    }

    const orderData = await Order.find();
    const orderId = (data.orderId = `ORD000${orderData.length + 1}`);
    data.userID = req.user.userId;
    data.userId = req.user._id;

    const savedOrder = await Order.create(data);

    await cartModel.findOneAndUpdate(
      { userId: userId },
      { $set: { items: [], totalPrice: 0, totalItems: 0 } },
      { new: true }
    );

    res.status(201).json({
      status: true,
      message: "Order created successfully",
      data: savedOrder,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Failed to create order",
      error: error.message,
    });
  }
};

////////////////////////////// get Single order Details user /////////////////////////////////////////////

exports.getOrderDetails = async (req, res) => {
  try {
    let orderId = req.params.orderId;
    let userId = req.user._id;

    const orderData = await Order.findById(orderId).populate({
      path: "items.productId",
      select: "title category MRP price productImg weightperKg pieces",
      model: Product,
    });
    console.log(orderData);
    let totalMRP = 0;
    for (let i = 0; i < orderData.items.length; i++) {
      let sum = orderData.items[i].productId.MRP * orderData.items[i].quantity;
      totalMRP += sum;
    }

    totalDiscount = totalMRP - orderData.totalPrice;

    let allProducts = [];

    for (let i = 0; i < orderData.items.length; i++) {
      let prod = {
        Product_id:orderData.items[i].productId._id,
        Product_title: orderData.items[i].productId.title,
        Product_category: orderData.items[i].productId.category,
        ProductImg: orderData.items[i].productId.productImg[0].url,
        Product_MRP:orderData.items[i].productId.MRP,
        Product_price: orderData.items[i].productId.price,
        Product_quantity: orderData.items[i].quantity,
      };


      if (orderData.items[i].productId.weightperKg) {
        prod.weight = orderData.items[i].productId.weightperKg;
      } else if (orderData.items[i].productId.pieces) {
        prod.Pieces = orderData.items[i].productId.pieces;
      }

      allProducts.push(prod);
    }
    const OrderDetails = {
      address: {
        name: orderData.shippingInfo.name,
        phone: orderData.shippingInfo.phoneNo,
        houseNo: orderData.shippingInfo.houseFlatNo,
        block: orderData.shippingInfo.blockName,
        street: orderData.shippingInfo.street,
        Landmark: orderData.shippingInfo.landMark,
        pincode: orderData.shippingInfo.pinCode,
        locality: orderData.shippingInfo.locality,
        AddressAs: orderData.shippingInfo.saveAddressAs,
        deliverySlot: `${orderData.shippingInfo.deliverySlot.day},${orderData.shippingInfo.deliverySlot.startTime} - ${orderData.shippingInfo.deliverySlot.endTime}`,
      },
      ProductDetails: [...allProducts],
      totalPrice: orderData.totalPrice,
      Discount: totalDiscount,
      orderId: orderData.orderId,
      PaymentInfo: orderData.paymentInfo,
      PaymentMethod:orderData.paymentMethod,
      Order_Status: orderData.orderStatus,
    };


    // if (orderData.paymentMethod.cod == true) {
    //   OrderDetails.Payment_Method = "Cash ON Delivery";
    // } else if (orderData.paymentMethod.online == true) {
    //   OrderDetails.Payment_Method = "Online";
    // }



    if (orderData.paidAt) {
      OrderDetails.PaidAt = orderData.paidAt;
    }

    if (orderData.shippingPrice == 0) {
      OrderDetails.Shipping = 0;
    } else {
      OrderDetails.Shipping = orderData.shippingPrice;
    }
    res.status(200).json({ status: true, orderData: OrderDetails });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

////////////////////////////////   get All orders Histroy user  //////////////////////////////////////////

exports.getAllOrders = async (req, res) => {
  try {
    let userId = req.user._id;
    const orderData = await Order.find({ userId: userId });

    if (orderData.length == 0) {
      return res
        .status(404)
        .json({ status: false, message: "no order found " });
    }

    res.status(200).send({ status: true, message: "success", data: orderData });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};



