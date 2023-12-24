

const Order = require("../models/orderModel");

const Product = require("../models/productModel");



//======================================= ~ admin Order section ~ =====================================

//////////////////////////////////////// get all orders  ADMIN ///////////////////////////////////////////

exports.getAllOrdersAdmin = async (req, res) => {
    try{
    let allOrder = await Order.find();
  
    res.status(200).json({ status: true, data: allOrder });
    }catch(err){
      res.status(500).json({status:false , messsage:err.message})
    }
  };
  
  /////////////////////////////////////////// get particular order by Admin ////////////////////////////////////////
  
  exports.getparticularOrderData = async (req, res) => {
    try {
      let orderId = req.params.orderId;
      const orderData = await Order.findById(orderId).populate({
        path: "items.productId",
        select: "title category MRP price weightperKg pieces",
        model: Product,
      });
  
      let totalMRP = 0;
      for (let i = 0; i < orderData.items.length; i++) {
        let sum = orderData.items[i].productId.MRP * orderData.items[i].quantity;
        totalMRP += sum;
      }
  
      totalDiscount = totalMRP - orderData.totalPrice;
  
      let allProducts = [];
  
      for (let i = 0; i < orderData.items.length; i++) {
        let prod = {
          Product_title: orderData.items[i].productId.title,
          Product_category: orderData.items[i].productId.category,
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
  
        Order_Status: orderData.orderStatus,
        _id: orderData._id,
      };
      if (orderData.paymentMethod.cod == true) {
        OrderDetails.Payment_Method = "COD";
      } else if (orderData.paymentMethod.online == true) {
        OrderDetails.Payment_Method = "Online";
      }
      if (orderData.paidAt) {
        OrderDetails.PaidAt = orderData.paidAt;
      }
      if (orderData.shippingPrice == 0) {
        OrderDetails.Shipping = "free";
      } else {
        OrderDetails.Shipping = orderData.shippingPrice;
      }
      if (orderData.deliveredAt) {
        OrderDetails.Deliverd_Date_And_Time = orderData.deliveredAt;
      }
      res.status(200).json({ status: true, orderData: OrderDetails });
    } catch (error) {
      res.status(500).send({ status: false, message: error.message });
    }
  };
  
  /////////////////////////////////////////// update order by Admin ////
  
  exports.updateOrderAdmin = async (req, res) => {
    let orderId = req.params.orderId;
    let data = req.body;
  
    if (data.orderStatus == "Delivered") {
      const dateObj = new Date();
      data.deliveredAt = dateObj.toLocaleString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
    }
  
    const updatedData = await Order.findOneAndUpdate(
      { _id: orderId },
      { ...data },
      { new: true }
    );
  
    res
      .status(200)
      .json({ status: true, message: "updated order", data: updatedData });
  };
  
  /// pdf formet ....
  
  const pdfmake = require("pdfmake");
  const { createReadStream } = require("fs");
  const { promisify } = require("util");
  
  exports.generateInvoicePDF = async (req, res) => {
    try {
      const orderId = req.params.orderId;
      const orderData = await Order.findById(orderId).populate({
        path: "items.productId",
        select: "title category MRP price weightperKg pieces",
        model: Product,
      });
  
      let totalMRP = 0;
      for (let i = 0; i < orderData.items.length; i++) {
        let sum = orderData.items[i].productId.MRP * orderData.items[i].quantity;
        totalMRP += sum;
      }
  
      const totalDiscount = totalMRP - orderData.totalPrice;
  
      let allProducts = [];
  
      for (let i = 0; i < orderData.items.length; i++) {
        let prod = {
          Product_title: orderData.items[i].productId.title,
          Product_category: orderData.items[i].productId.category,
          Product_MRP: orderData.items[i].productId.MRP,
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
  
      const address = {
        name: orderData.shippingInfo.name,
        phone: orderData.shippingInfo.phoneNo,
        houseNo: orderData.shippingInfo.houseFlatNo,
        block: orderData.shippingInfo.blockName,
        street: orderData.shippingInfo.street,
        Landmark: orderData.shippingInfo.landMark,
        pincode: orderData.shippingInfo.pinCode,
        locality: orderData.shippingInfo.locality,
        AddressAs: orderData.shippingInfo.saveAddressAs,
        deliverySlot: `${orderData.shippingInfo.deliverySlot.day}, ${orderData.shippingInfo.deliverySlot.startTime} - ${orderData.shippingInfo.deliverySlot.endTime}`,
      };
  
      const paymentInfo = {
        id: orderData.paymentInfo.id,
        status: orderData.paymentInfo.status,
      };
  
      const fonts = {
        Roboto: {
          normal:
            "C:/Users/lenovo/OneDrive/Desktop/ApnaProduct/publicStore/roboto/Roboto-Regular.ttf",
          bold: "C:/Users/lenovo/OneDrive/Desktop/ApnaProduct/publicStore/roboto/Roboto-Bold.ttf",
          italics:
            "C:/Users/lenovo/OneDrive/Desktop/ApnaProduct/publicStore/roboto/Roboto-CondensedItalic.ttf",
          bolditalics:
            "C:/Users/lenovo/OneDrive/Desktop/ApnaProduct/publicStore/roboto/Roboto-BoldCondensedItalic.ttf",
        },
      };
  
      const invoiceContent = {
        content: [
          { text: "Invoice", style: "header" },
          { text: "Order Details", style: "subheader" },
          {
            columns: [
              { text: `Order ID: ${orderData.orderId}` },
              { text: `Status: ${orderData.orderStatus}` },
            ],
          },
          { text: "Address", style: "subheader" },
          {
            ul: [
              `Name: ${address.name}`,
              `Phone: ${address.phone}`,
              `House No: ${address.houseNo}`,
              `Block: ${address.block}`,
              `Street: ${address.street}`,
              `Landmark: ${address.Landmark}`,
              `Pincode: ${address.pincode}`,
              `Locality: ${address.locality}`,
              `Address As: ${address.AddressAs}`,
              `Delivery Slot: ${address.deliverySlot}`,
            ],
          },
          { text: "Product Details", style: "subheader" },
          {
            table: {
              headerRows: 1,
              widths: ["*", "*", "*", "*", "*"],
              body: [
                ["Title", "Category", "MRP", "Price", "Quantity"],
                ...allProducts.map((product) => [
                  product.Product_title,
                  product.Product_category,
                  product.Product_MRP,
                  product.Product_price,
                  product.Product_quantity,
                ]),
              ],
            },
          },
          { text: "Order Summary", style: "subheader" },
          {
            ul: [
              `Total Price: ${orderData.totalPrice}`,
              `Discount: ${totalDiscount}`,
              `Payment Method: ${orderData.paymentMethod.cod ? "COD" : "Online"}`,
              `Shipping: ${
                orderData.shippingPrice === 0 ? "Free" : orderData.shippingPrice
              }`,
            ],
          },
        ],
        styles: {
          header: {
            fontSize: 18,
            bold: true,
            margin: [0, 0, 0, 10],
          },
          subheader: {
            fontSize: 14,
            bold: true,
            margin: [0, 10, 0, 5],
          },
        },
        defaultStyle: {
          font: "Roboto",
          fontSize: 12,
        },
        fonts: fonts,
      };
  
      const printer = new pdfmake(fonts);
      const pdfDoc = printer.createPdfKitDocument(invoiceContent);
  
      const chunks = [];
      pdfDoc.on("data", (chunk) => {
        chunks.push(chunk);
      });
      pdfDoc.on("end", () => {
        const result = Buffer.concat(chunks);
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "attachment; filename=invoice.pdf");
        res.send(result);
      });
  
      pdfDoc.end();
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  };
  
  // const pdfmake = require('pdfmake');
  // const { createReadStream } = require('fs');
  // const { promisify } = require('util');
  
  // exports.generateInvoicePDF = async (req, res) => {
  //   try {
  //     const orderId = req.params.orderId;
  //     const orderData = await Order.findById(orderId).populate({
  //       path: 'items.productId',
  //       select: 'title category MRP price weightperKg pieces',
  //       model: Product,
  //     });
  
  //     let totalMRP = 0;
  //     for (let i = 0; i < orderData.items.length; i++) {
  //       let sum = orderData.items[i].productId.MRP * orderData.items[i].quantity;
  //       totalMRP += sum;
  //     }
  
  //     const allProducts = orderData.items.map((item) => {
  //       return {
  //         Title: item.productId.title,
  //         Category: item.productId.category,
  //         MRP: item.productId.MRP,
  //         Price: item.productId.price,
  //         Quantity: item.productId.pieces || item.productId.weightperKg,
  //       };
  //     });
  
  //     const address = {
  //       name: orderData.shippingInfo.name,
  //       phone: orderData.shippingInfo.phoneNo,
  //       houseNo: orderData.shippingInfo.houseFlatNo,
  //       block: orderData.shippingInfo.blockName,
  //       street: orderData.shippingInfo.street,
  //       Landmark: orderData.shippingInfo.landMark,
  //       pincode: orderData.shippingInfo.pinCode,
  //       locality: orderData.shippingInfo.locality,
  //       AddressAs: orderData.shippingInfo.saveAddressAs,
  //       deliverySlot: `${orderData.shippingInfo.deliverySlot.day}, ${orderData.shippingInfo.deliverySlot.startTime} - ${orderData.shippingInfo.deliverySlot.endTime}`,
  //     };
  
  //     const fonts = {
  //       Roboto: {
  //         normal: 'C:/Users/lenovo/OneDrive/Desktop/ApnaProduct/publicStore/roboto/Roboto-Regular.ttf',
  //         bold: 'C:/Users/lenovo/OneDrive/Desktop/ApnaProduct/publicStore/roboto/Roboto-Bold.ttf',
  //         italics: 'C:/Users/lenovo/OneDrive/Desktop/ApnaProduct/publicStore/roboto/Roboto-CondensedItalic.ttf',
  //         bolditalics: 'C:/Users/lenovo/OneDrive/Desktop/ApnaProduct/publicStore/roboto/Roboto-BoldCondensedItalic.ttf',
  //       },
  //     };
  //     const invoiceContent = {
  //       header: {
  //         text: 'Invoice',
  //         style: 'header',
  //         alignment: 'center',
  //         margin: [0, 20, 0, 10],
  //       },
  //       content: [
  //         {
  //           columns: [
  //             {
  //               text: 'Billing To:',
  //               bold: true,
  //             },
  //             {
  //               text: 'Shipping To:',
  //               bold: true,
  //               marginLeft: 200,
  //             },
  //           ],
  //         },
  //         {
  //           columns: [
  //             {
  //               text: `Name: ${address.name}\nPhone: ${address.phone}\nAddress: ${address.houseNo}, ${address.block}, ${address.street}, ${address.Landmark}, ${address.pincode}, ${address.locality}`,
  //               width: '50%',
  //             },
  //             {
  //               text: `Name: ${address.name}\nPhone: ${address.phone}\nAddress: ${address.houseNo}, ${address.block}, ${address.street}, ${address.Landmark}, ${address.pincode}, ${address.locality}`,
  //               width: '50%',
  //               marginLeft: 200,
  //             },
  //           ],
  //         },
  //         {
  //           text: `Order ID: ${orderData.orderId}\nOrder Date: ${orderData.createdAt.toDateString()}`,
  //         },
  //         {
  //           text: `Total MRP: ${totalMRP}`,
  //         },
  //         {
  //           text: `Total Price: ${orderData.totalPrice}`,
  //         },
  //         {
  //           text: `Discount: ${totalMRP - orderData.totalPrice}`,
  //         },
  //         {
  //           text: 'Items',
  //           style: 'subheader',
  //         },
  //         {
  //           style: 'tableExample',
  //           table: {
  //             headerRows: 1,
  //             widths: ['*', 'auto', 'auto', 'auto', 'auto'],
  //             body: [
  //               ['Title', 'Category', 'MRP', 'Price', 'Quantity'],
  //               ...allProducts.map((product) => [
  //                 product.Title,
  //                 product.Category,
  //                 product.MRP,
  //                 product.Price,
  //                 product.Quantity,
  //               ]),
  //             ],
  //           },
  //         },
  //       ],
  //       styles: {
  //         header: {
  //           fontSize: 16,
  //           bold: true,
  //           margin: [0, 0, 0, 10],
  //         },
  //         subheader: {
  //           fontSize: 14,
  //           bold: true,
  //           margin: [0, 10, 0, 5],
  //         },
  //         tableExample: {
  //           margin: [0, 5, 0, 15],
  //         },
  //       },
  //     };
  
  //     const printer = new pdfmake(fonts);
  //     const pdfDoc = printer.createPdfKitDocument(invoiceContent);
  //     pdfDoc.pipe(res);
  //     pdfDoc.end();
  //   } catch (error) {
  //     console.log(error);
  //     res.status(500).json({ message: 'Failed to generate invoice PDF' });
  //   }
  // };
  