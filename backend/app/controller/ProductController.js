const Product = require("../models/product");
const mongoose = require("mongoose");
const cloudinary = require("../config/cloudinary");

class ProductController {
  async addView(req, res) {
    res.render("product/add");
  }

  // async createProduct(req, res) {
  //   console.log("BODY:", req.body);
  //   console.log("FILE:", req.file);
  //   try {
  //     const { name, price, stock, category, description } = req.body;

  //     if (!name || !price || !stock || !category || !description) {
  //       return res.status(400).json({
  //         message: "All fields are required",
  //       });
  //     }

  //     // Check duplicate product
  //     const existingProduct = await Product.findOne({
  //       name: name.trim(),
  //     });

  //     if (existingProduct) {
  //       return res.status(400).json({
  //         status: false,
  //         message: "Product already exists",
  //       });
  //     }

  //     const product = new Product({
  //       name,
  //       price,
  //       stock,
  //       category,
  //       description,
  //       image: req.file ? req.file.filename : "",
  //     });

  //     await product.save();

  //     return res.status(201).json({
  //       status: true,
  //       message: "Product created successfully",
  //       product,
  //     });
  //   } catch (error) {
  //     console.log(error);

  //     if (error.code === 11000) {
  //       return res.status(400).json({
  //         status: false,
  //         message: "Product already exists",
  //       });
  //     }

  //     return res.status(500).json({
  //       status: false,
  //       message: "Internal server error",
  //     });
  //   }
  // }

  async createProduct(req, res) {
  console.log("BODY:", req.body);
  console.log("FILE:", req.file);

  try {
    const { name, price, brand, stock, category, description } = req.body;

    // Trim input safely
    const trimmedName = name?.trim();

    if (!trimmedName || !price || !brand || !stock || !category || !description) {
      return res.status(400).json({
        status: false,
        message: "All fields are required",
      });
    }

    // Check duplicate product (case-insensitive recommended)
    const existingProduct = await Product.findOne({
      name: trimmedName,
    });

    if (existingProduct) {
      return res.status(400).json({
        status: false,
        message: "Product already exists",
      });
    }

    const product = new Product({
      name: trimmedName,
      price,
      brand,
      stock,
      category,
      description,

      // Cloudinary fields
      image: req.file ? req.file.path : "",
      public_id: req.file ? req.file.filename : "",
    });

    await product.save();

    return res.status(201).json({
      status: true,
      message: "Product created successfully",
      product,
    });

  } catch (error) {
    console.log(error);

    if (error.code === 11000) {
      return res.status(400).json({
        status: false,
        message: "Product already exists",
      });
    }

    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
}

  // View all products
  async getAllProducts(req, res) {
    try {
      const fetchedProducts = await Product.find({
        isDeleted: false,
      });

      return res.status(200).json({
        status: true,
        message: "All product fetched!",
        data: fetchedProducts,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: false, message: "Internal server error" });
    }
  }

  //edit view
  async editView(req, res) {
    try {
      const id = req.params.id;

      const product = await Product.findById(id);

      if (!product) {
        return res.status(404).send("Product not found");
      }

      res.render("product/editView", {
        data: product,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  }

  //update product
  async updateProduct(req, res) {
    try {
      const id = req.params.id;
      const product = await Product.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(201).json({
        status: true,
        message: "Product updated successfully",
      });
    } catch (error) {
      console.log(error);
    }
  }

  //delete
  async softDeleteProduct(req, res) {
    try {
      const id = req.params.id;
      await Product.findByIdAndUpdate(id, {
        isDeleted: true,
      });
      return res.status(200).json({
        status: true,
        message: "Product deleted temporarily!",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: false,
        message: "Product deletion failed!",
      });
    }
  }

//hard delete
async hardDeleteProduct(req, res) {
  try {
    const id = req.params.id;

    // 1. Find product first
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        status: false,
        message: "Product not found",
      });
    }

    // 2. Delete image from Cloudinary
    if (product.public_id) {
      await cloudinary.uploader.destroy(product.public_id);
    }

    // 3. Delete product from MongoDB
    await Product.findByIdAndDelete(id);

    return res.status(200).json({
      status: true,
      message: "Product deleted permanently!",
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      status: false,
      message: "Product deletion failed!",
    });
  }
}

  //trash product
  async trashProducts(req, res) {
    try {
      const products = await Product.find({
        isDeleted: true,
      });
      return res.status(200).json({
        status: true,
        message: "Trash products fetched successful!",
        data: products
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: false,
        message: "Trash product fetching failed!",
      });
    }
  }

  //restore
   async restoreProduct(req, res) {
    try {
      const id = req.params.id;
      await Product.findByIdAndUpdate(id, {
        isDeleted: false,
      });
      return res.status(200).json({
        status: true,
        message: "Product deleted temporarily!",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: false,
        message: "Product deletion failed!",
      });
    }
  }

  //search product
  async searchProducts(req, res) {
    try {
      const { name = "" } = req.query;
      const products = await Product.find({
        name: { $regex: name, $options: "i" },
        isDeleted: false,
      });

      return res.status(200).json({
        status: true,
        message: "Product search successful!",
        data: products,
      });
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        status: false,
        message: "Product search failed!",
      });
    }
  }
}

module.exports = new ProductController();
