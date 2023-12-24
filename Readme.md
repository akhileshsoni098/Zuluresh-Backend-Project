
---

# Admin Module APIs

## Authentication
Authentication for admin access remains a prerequisite for utilizing these APIs.

---

## Admin Banner

### Create Banner

#### Route
```
POST baseUrl/admin/banner/createBanner
```

#### Request Format (multipart/form-data)
| Key          | Value                    |
|--------------|--------------------------|
| bannerImg    | [banner(1).png, banner(2).png] |

#### Response
```json
{
    "status": true,
    "message": "Banner created successfully",
    "data": {
        "bannerImg": {
            "public_Id": "cv2bwc5gnj8gt9xnmweo",
            "url": "https://res.cloudinary.com/dscgsptzy/image/upload/v1703370668/cv2bwc5gnj8gt9xnmweo.png"
        },
        "_id": "65875fac1ad6f1eb5a0e2d2f",
        "createdAt": "2023-12-23T22:31:08.063Z",
        "updatedAt": "2023-12-23T22:31:08.063Z",
        "__v": 0
    }
}
```

---

### Get All Banners

#### Route
```
GET baseUrl/public/getAllBanner
```

#### Response
```json
{
    "status": true,
    "data": [
        {
            "bannerImg": {
                "public_Id": "uuyihesdr7odrolhypzy",
                "url": "https://res.cloudinary.com/dscgsptzy/image/upload/v1703370653/uuyihesdr7odrolhypzy.png"
            },
            "_id": "65875f9c1ad6f1eb5a0e2d2b",
            "createdAt": "2023-12-23T22:30:52.976Z",
            "updatedAt": "2023-12-23T22:30:52.976Z",
            "__v": 0
        },
        {
            "bannerImg": {
                "public_Id": "oremndgodhqyzlpqguyz",
                "url": "https://res.cloudinary.com/dscgsptzy/image/upload/v1703370664/oremndgodhqyzlpqguyz.png"
            },
            "_id": "65875fa71ad6f1eb5a0e2d2d",
            "createdAt": "2023-12-23T22:31:03.857Z",
            "updatedAt": "2023-12-23T22:31:03.857Z",
            "__v": 0
        }
    ],
    "count": 2
}
```

---

### Delete Particular Banner

#### Route
```
DELETE baseUrl/admin/banner/deleteSingleBanner/:bannerId
```

#### Response
```json
{
    "status": true,
    "message": "Banner deleted successfully"
}
```

#################################################################################################################################


---

# Admin Module APIs - Pincode Operations

## Add Pincode

### Route
```
POST baseUrl/admin/pincodeLocation/createPincode
```
#### req.body 
```json
{
    "pincode":"1403901"
}
```

#### Response
```json
{
    "status": true,
    "data": {
        "pincode": "271312",
        "_id": "6587624a1ad6f1eb5a0e2d38",
        "createdAt": "2023-12-23T22:42:18.884Z",
        "updatedAt": "2023-12-23T22:42:18.884Z",
        "__v": 0
    }
}
```

---

## Get All Pincodes

### Route
```
GET baseUrl/admin/pincodeLocation/getAllPincode
```

#### Response
```json
{
    "status": true,
    "data": [
        {
            "_id": "6587624a1ad6f1eb5a0e2d38",
            "pincode": "271312",
            "createdAt": "2023-12-23T22:42:18.884Z",
            "updatedAt": "2023-12-23T22:42:18.884Z",
            "__v": 0
        },
        {
            "_id": "658762fd1ad6f1eb5a0e2d3c",
            "pincode": "271316",
            "createdAt": "2023-12-23T22:45:17.316Z",
            "updatedAt": "2023-12-23T22:45:17.316Z",
            "__v": 0
        }
    ]
}
```

---

## Delete Pincode

### Route
```
DELETE baseUrl/admin/pincodeLocation/deletePincode/:id
```

#### Response
```json
{
    "status": true,
    "message": "Pincode deleted successfully"
}
```

---
#########################################################################################


---

# Admin Module APIs - Category and Subcategory Operations

## Category Operations

### Add Category

#### Route
```
POST baseUrl/admin/categoryAndSubCategory/addCategory
```

#### Request Body (multipart/form-data)
| Key               | Value              |
|-------------------|--------------------|
| categoryName      | chicken            |
| categoryImg (file)| chicken.png        |

#### Response
```json
{
    "status": true,
    "message": "Category created successfully",
    "data": {
        "categoryName": "chicken",
        "categoryImg": {
            "public_Id": "categories/fpstrpfqkkgyva8ollf6",
            "url": "https://res.cloudinary.com/dscgsptzy/image/upload/v1703417390/categories/fpstrpfqkkgyva8ollf6.png"
        },
        "_id": "6588162d7c377c7057b247fc",
        "__v": 0
    }
}
```

---

### Update Category

#### Route
```
PUT baseUrl/admin/categoryAndSubCategory/updateCategory/:catId
```

#### Request Body (multipart/form-data)
| Key               | Value              |
|-------------------|--------------------|
| categoryName      | chicken            |
| categoryImg (file)| chicken.png        |

#### Response
```json
{
    "status": true,
    "message": "Category updated successfully",
    "data": {
        "categoryImg": {
            "public_Id": "categories/xemyxiwkcxnsogkvv7ci",
            "url": "https://res.cloudinary.com/dscgsptzy/image/upload/v1703418220/categories/xemyxiwkcxnsogkvv7ci.png"
        },
        "_id": "6588162d7c377c7057b247fc",
        "categoryName": "chicken",
        "__v": 0
    }
}
```

---

### Get All Categories

#### Route
```
GET baseUrl/admin/categoryAndSubCategory/getAllCategory
```

#### Response
```json
{
    "status": true,
    "data": [
        {
            "categoryImg": {
                "public_Id": "categories/xemyxiwkcxnsogkvv7ci",
                "url": "https://res.cloudinary.com/dscgsptzy/image/upload/v1703418220/categories/xemyxiwkcxnsogkvv7ci.png"
            },
            "_id": "6588162d7c377c7057b247fc",
            "categoryName": "chicken",
            "__v": 0
        }
    ]
}
```

---

### Get Single Category

#### Route
```
GET baseUrl/admin/categoryAndSubCategory/getSingleCategory/:catId
```

#### Response
```json
{
    "status": true,
    "data": {
        "categoryImg": {
            "public_Id": "categories/xemyxiwkcxnsogkvv7ci",
            "url": "https://res.cloudinary.com/dscgsptzy/image/upload/v1703418220/categories/xemyxiwkcxnsogkvv7ci.png"
        },
        "_id": "6588162d7c377c7057b247fc",
        "categoryName": "chicken",
        "__v": 0
    }
}
```

---

### Delete Category

#### Route
```
DELETE baseUrl/admin/categoryAndSubCategory/deleteSingleCategory/:catId
```

#### Response
```json
{
    "status": true,
    "message": "Category deleted successfully",
    "data": {
        "categoryImg": {
            "public_Id": "categories/xemyxiwkcxnsogkvv7ci",
            "url": "https://res.cloudinary.com/dscgsptzy/image/upload/v1703418220/categories/xemyxiwkcxnsogkvv7ci.png"
        },
        "_id": "6588162d7c377c7057b247fc",
        "categoryName": "chicken",
        "__v": 0
    }
}
```

---



## Subcategory Operations

### Add Subcategory

#### Route
```
POST baseUrl/admin/categoryAndSubCategory/addSubCategory/:catId
```

#### Request Body (multipart/form-data)
| Key               | Value              |
|-------------------|--------------------|
| subCategoryName   | Chicken Leg        |
| subCategoryImg    | chickenLeg.png     |

#### Response
```json
{
    "status": true,
    "message": "Subcategory created successfully",
    "data": {
        "categoryId": "6588228d7c377c7057b24807",
        "subCategoryName": "Chicken Leg",
        "subCategoryImg": {
            "public_Id": "subCategories/ezgrm3i39tqyszbztxul",
            "url": "https://res.cloudinary.com/dscgsptzy/image/upload/v1703420991/subCategories/ezgrm3i39tqyszbztxul.png"
        },
        "_id": "6588243d7c377c7057b24809",
        "__v": 0
    }
}
```

---

### Get All Subcategories

#### Route
```
GET baseUrl/admin/categoryAndSubCategory/getAllSubCategory/:catId
```

#### Response
```json
{
    "data": [
        {
            "subCategoryImg": {
                "public_Id": "subCategories/ezgrm3i39tqyszbztxul",
                "url": "https://res.cloudinary.com/dscgsptzy/image/upload/v1703420991/subCategories/ezgrm3i39tqyszbztxul.png"
            },
            "_id": "6588243d7c377c7057b24809",
            "categoryId": "6588228d7c377c7057b24807",
            "subCategoryName": "Chicken Leg",
            "__v": 0
        }
    ]
}
```

---

### Update Subcategory

#### Route
```
PUT baseUrl/admin/categoryAndSubCategory/updateSubCategory/:catId/:subCatId
```

#### Request Body (multipart/form-data)
| Key               | Value              |
|-------------------|--------------------|
| subCategoryName   | Chicken Leg        |
| subCategoryImg    | chickenLeg.png     |

#### Response
```json
{
    "status": true,
    "message": "Subcategory updated successfully",
    "data": {
        "subCategoryImg": {
            "public_Id": "subCategories/ezgrm3i39tqyszbztxul",
            "url": "https://res.cloudinary.com/dscgsptzy/image/upload/v1703420991/subCategories/ezgrm3i39tqyszbztxul.png"
        },
        "_id": "6588243d7c377c7057b24809",
        "categoryId": "6588228d7c377c7057b24807",
        "subCategoryName": "Chicken Leg",
        "__v": 0
    }
}
```

---

### Get Single Subcategory

#### Route
```
GET baseUrl/admin/categoryAndSubCategory/getSingleSubCategory/:subCatId
```

#### Response
```json
{
    "status": true,
    "data": {
        "subCategoryImg": {
            "public_Id": "subCategories/ezgrm3i39tqyszbztxul",
            "url": "https://res.cloudinary.com/dscgsptzy/image/upload/v1703420991/subCategories/ezgrm3i39tqyszbztxul.png"
        },
        "_id": "6588243d7c377c7057b24809",
        "categoryId": "6588228d7c377c7057b24807",
        "subCategoryName": "Chicken Leg",
        "__v": 0
    }
}
```

---

### Delete All Subcategories of a Category

#### Route
```
DELETE baseUrl/admin/categoryAndSubCategory/deleteAllSubCategory/:catId
```

#### Response
```json
{
    "status": true,
    "message": "All subcategories of the category deleted successfully"
}
```

---

### Delete Single Subcategory

#### Route
```
DELETE baseUrl/admin/categoryAndSubCategory/deleteSingleSubCategory/:subCatId
```

#### Response
```json
{
    "status": true,
    "message": "Subcategory deleted successfully",
    "data": {
        "subCategoryImg": {
            "public_Id": "subCategories/ezgrm3i39tqyszbztxul",
            "url": "https://res.cloudinary.com/dscgsptzy/image/upload/v1703420991/subCategories/ezgrm3i39tqyszbztxul.png"
        },
        "_id": "6588243d7c377c7057b24809",
        "categoryId": "6588228d7c377c7057b24807",
        "subCategoryName": "Chicken Leg",
        "__v": 0
    }
}
```

###########################################################################


---

## Time Slot Operations

### Add Time Slot

#### Route

```
POST baseUrl/admin/timeSlot/addTimeSlot
```

#### Request Body

```json
{
  "day": "Sunday (24 Dec)",
  "timeRange": "04:23PM to 7:40PM"
}
```

#### Response

```json
{
    "message": "Time slot added successfully",
    "timeSlot": {
        "day": "Sunday (24 Dec)",
        "startTime": "04:23PM",
        "endTime": "7:40PM",
        "_id": "658854f8e068838253240e7f",
        "__v": 0
    }
}
```

---

### Get All Time Slots

#### Route

```
GET baseUrl/admin/timeSlot/allSlots
```

#### Response

```json
{
    "status": true,
    "timeSlots": [
        {
            "_id": "658854cee068838253240e7d",
            "day": "Thursday (27 Jul)",
            "startTime": "04:23PM",
            "endTime": "7:40PM",
            "__v": 0
        },
        {
            "_id": "658854f8e068838253240e7f",
            "day": "Sunday (24 Dec)",
            "startTime": "04:23PM",
            "endTime": "7:40PM",
            "__v": 0
        }
    ]
}
```

---

### Update Time Slot

#### Route

```
PUT baseUrl/admin/timeslot/updateTimeSlot/:slotId
```

#### Request Body

```json
{
  "day": "Sunday (24 Dec)",
  "timeRange": "06:00AM to 8:00AM"
}
```

#### Response

```json
{
    "message": "Time slot updated successfully",
    "timeSlot": {
        "_id": "658854f8e068838253240e7f",
        "day": "Sunday (24 Dec)",
        "startTime": "06:00AM",
        "endTime": "8:00AM",
        "__v": 0
    }
}
```

---

### Delete Specific Time Slot

#### Route

```
DELETE baseUrl/admin/timeslot/deleteTimeSlot/:slotId
```

#### Response

```json
{
    "status": true,
    "message": "Time slot deleted successfully"
}
```

---

### Delete All Time Slots

#### Route

```
DELETE baseUrl/admin/timeslot/deleteAllTimeSlots
```

#### Response

```json
{
    "status": true,
    "message": "All time slots deleted successfully"
}
```

---
#####################################################################


---

## Shipping Operations

### Add Shipping Charges

#### Route

```
POST baseUrl/admin/shipping/shippingCharge
```

#### Request Body

```json
{
    "shippingCharge": 70,
    "freeShipingLimit": 500
}
```

#### Response

```json
{
    "status": true,
    "data": {
        "freeShipingLimit": 500,
        "shippingCharge": 70,
        "_id": "658858d8722df0de95654e18",
        "createdAt": "2023-12-24T16:14:16.466Z",
        "updatedAt": "2023-12-24T16:14:16.466Z",
        "__v": 0
    }
}
```

---

### Get Shipping Details

#### Route

```
GET baseUrl/admin/shipping/getShipping
```

#### Response

```json
{
    "status": true,
    "message": [
        {
            "_id": "658858d8722df0de95654e18",
            "freeShipingLimit": 500,
            "shippingCharge": 70,
            "createdAt": "2023-12-24T16:14:16.466Z",
            "updatedAt": "2023-12-24T16:14:16.466Z",
            "__v": 0
        }
    ]
}
```

---

### Delete Shipping Charges

#### Route

```
DELETE baseUrl/admin/shipping/deleteShipping/:shippingId
```

#### Response

```json
{
    "status": true,
    "message": "Shipping amount and limit are successfully deleted"
}
```

---
##################################################################################


---

## Promo Code Operations

### Add Promo Code

#### Route

```
POST baseUrl/admin/coupon/addPromo
```

#### Request Body

```json
{
  "promoCode": "SUMMER28",
  "discount": 35,
  "expiry": "2023-12-28"
}
```

#### Response

```json
{
    "status": true,
    "data": {
        "promoCode": "SUMMER28",
        "expiry": "2023-12-28T00:00:00.000Z",
        "discount": 35,
        "_id": "65885cd5f78a6baa55a7b0ea",
        "__v": 0
    }
}
```

---

### Get All Promo Codes

#### Route

```
GET baseUrl/admin/coupon/getAllPromo
```

#### Response

```json
{
    "status": true,
    "data": [
        {
            "_id": "65885cd5f78a6baa55a7b0ea",
            "promoCode": "SUMMER28",
            "expiry": "2023-12-31T00:00:00.000Z",
            "discount": 35,
            "__v": 0
        }
    ]
}
```

---

### Get a Particular Promo Code

#### Route

```
GET baseUrl/admin/coupon/getPromo/:id
```

#### Response

```json
{
    "status": true,
    "data": {
        "_id": "65885cd5f78a6baa55a7b0ea",
        "promoCode": "SUMMER28",
        "expiry": "2023-12-31T00:00:00.000Z",
        "discount": 35,
        "__v": 0
    }
}
```

---

### Update Promo Code

#### Route

```
PUT baseUrl/admin/coupon/updatePromo/:id
```

#### Request Body

```json
{
  "name": "SUMMER25",
  "discount": 35,
  "expiry": "2023-12-31"
}
```

#### Response

```json
{
    "status": true,
    "data": {
        "_id": "65885cd5f78a6baa55a7b0ea",
        "promoCode": "SUMMER28",
        "expiry": "2023-12-31T00:00:00.000Z",
        "discount": 35,
        "__v": 0
    }
}
```

---

### Delete a Specific Promo Code

#### Route

```
DELETE baseUrl/admin/coupon/deletePromo/:id
```

#### Response

```json
{
    "status": true,
    "message": "Promo deleted Successfully",
    "data": {
        "_id": "65885cd5f78a6baa55a7b0ea",
        "promoCode": "SUMMER28",
        "expiry": "2023-12-31T00:00:00.000Z",
        "discount": 35,
        "__v": 0
    }
}
```

---
########################################################################


---

## Admin Product Listing

### Add Product

#### Route

```
POST baseUrl/admin/product/addProduct
```

#### Request Body

```json
{
    "title": "Best delicious Item for sale",
    "description": "This is a delicious item, buy this fresh item for you",
    "weightperKg": 250,
    "MRP": 550,
    "price": 300,
    "discount": "46%",
    "productImg": "chickenLeg.png",
    "category": "Chicken",
    "sub_category": "Chicken Leg",
    "Stock": 1,
    "setAs": "Combos"
}
```

#### Response

```json
{
    "status": true,
    "data": {
        "title": "Best delicious Item for sale ",
        "description": "This is for you delicious item buy this fresh item for you ",
        "weightperKg": 250,
        "MRP": 550,
        "price": 300,
        "discount": "46%",
        "productImg": [
            {
                "public_id": "products/dscag0gva4nwtjs3itwm",
                "url": "https://res.cloudinary.com/dscgsptzy/image/upload/v1703436536/products/dscag0gva4nwtjs3itwm.png",
                "_id": "658860f7d2f02c69ec72b39a"
            }
        ],
        "category": "Chicken",
        "sub_category": "Chicken Leg",
        "Stock": 1,
        "setAs": "Combos",
        "_id": "658860f7d2f02c69ec72b399",
        "createdAt": "2023-12-24T16:48:55.083Z",
        "updatedAt": "2023-12-24T16:48:55.083Z",
        "__v": 0
    }
}
```

---

### Get All Products

#### Route

```
GET baseUrl/admin/product/getAllproduct
```

#### Response

```json
{
    "status": true,
    "data": [
        {
            "_id": "658860f7d2f02c69ec72b399",
            "title": "Best delicious Item for sale ",
            "description": "This is for you delicious item buy this fresh item for you ",
            "weightperKg": 250,
            "MRP": 550,
            "price": 300,
            "discount": "46%",
            "productImg": [
                {
                    "public_id": "products/dscag0gva4nwtjs3itwm",
                    "url": "https://res.cloudinary.com/dscgsptzy/image/upload/v1703436536/products/dscag0gva4nwtjs3itwm.png",
                    "_id": "658860f7d2f02c69ec72b39a"
                }
            ],
            "category": "Chicken",
            "sub_category": "Chicken Leg",
            "Stock": 1,
            "setAs": "Combos",
            "createdAt": "2023-12-24T16:48:55.083Z",
            "updatedAt": "2023-12-24T16:48:55.083Z",
            "__v": 0
        }
    ]
}
```

---

### Get a Particular Product

#### Route

```
GET baseUrl/admin/product/getProduct/:Id
```

#### Response

```json
{
    "status": true,
    "data": {
        "title": "Best delicious Item for sale ",
        "description": "This is for you delicious item buy this fresh item for you ",
        "weightperKg": 250,
        "MRP": 550,
        "price": 300,
        "discount": "46%",
        "productImg": [
            {
                "public_id": "products/dscag0gva4nwtjs3itwm",
                "url": "https://res.cloudinary.com/dscgsptzy/image/upload/v1703436536/products/dscag0gva4nwtjs3itwm.png",
                "_id": "658860f7d2f02c69ec72b39a"
            }
        ],
        "category": "Chicken",
        "sub_category": "Chicken Leg",
        "Stock": 1,
        "setAs": "Combos",
        "_id": "658860f7d2f02c69ec72b399",
        "createdAt": "2023-12-24T16:48:55.083Z",
        "updatedAt": "2023-12-24T16:48:55.083Z",
        "__v": 0
    }
}
```

---

### Update a Particular Product

#### Route

```
PUT baseUrl/admin/product/updateProduct/:Id
```

#### Request Body

```json
{
    "title": "Best delicious Item for sale",
    "description": "This is a delicious item, buy this fresh item for you",
    "weightperKg": 250,
    "MRP": 550,
    "price": 300,
    "discount": "46%",
    "productImg": "chickenLeg.png",
    "category": "Chicken",
    "sub_category": "Chicken Leg",
    "Stock": 1,
    "setAs": "Combos"
}
```

#### Response

```json
{
    "status": true,
    "message": "Product updated Successfully",


    "data": {
        "title": "Best delicious Item for sale ",
        "description": "This is for you delicious item buy this fresh item for you ",
        "weightperKg": 250,
        "MRP": 550,
        "price": 300,
        "discount": "46%",
        "productImg": [
            {
                "public_id": "products/dscag0gva4nwtjs3itwm",
                "url": "https://res.cloudinary.com/dscgsptzy/image/upload/v1703436536/products/dscag0gva4nwtjs3itwm.png",
                "_id": "658860f7d2f02c69ec72b39a"
            }
        ],
        "category": "Chicken",
        "sub_category": "Chicken Leg",
        "Stock": 1,
        "setAs": "Combos",
        "_id": "658860f7d2f02c69ec72b399",
        "createdAt": "2023-12-24T16:48:55.083Z",
        "updatedAt": "2023-12-24T16:48:55.083Z",
        "__v": 0
    }
}
```


### Delete a Particular Product

#### Route

```
DELETE baseUrl/admin/product/deleteProduct/:Id
```

#### Response

```json
{
    "status": true,
    "message": "deleted Successfully"
}
```



/////////
Order , payment , AbandonedCart , userDetails Remains 

/////////