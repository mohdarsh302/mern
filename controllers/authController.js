import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";

import { comparePassword, hashPassword, generateVerifyToken } from "./../helpers/authHelper.js";
import JWT from "jsonwebtoken";
import UserAddress from "../models/UserAddress.js";
import userEvents from '../events/userEvents.js';
import sendEmail from '../utils/mailer.js';


export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;
    //validations
    if (!name) {
      return res.send({ error: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }
    if (!phone) {
      return res.send({ message: "Phone no is Required" });
    }
    if (!address) {
      return res.send({ message: "Address is Required" });
    }
    if (!answer) {
      return res.send({ message: "Answer is Required" });
    }
    //check user
    const exisitingUser = await userModel.findOne({ email });
    //exisiting user
    if (exisitingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Register please login",
      });
    }
    //register user
    const hashedPassword = await hashPassword(password);
    const verificationToken = await generateVerifyToken();
    console.log("verifyToken===> ", verificationToken);
    //save
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      answer,
      verificationToken
    }).save();

    
    // Emit Event
    console.log("Emitting event for:", user.email);
    //await sendEmail(user.email, 'Welcome to My Shop', `Hello ${name}, welcome!`);
    userEvents.emit('userRegistered', user);
    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Errro in Registeration",
      error,
    });
  }
};

//POST LOGIN
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registerd",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    //token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

//forgotPasswordController

export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      res.status(400).send({ message: "Emai is required" });
    }
    if (!answer) {
      res.status(400).send({ message: "answer is required" });
    }
    if (!newPassword) {
      res.status(400).send({ message: "New Password is required" });
    }
    //check
    const user = await userModel.findOne({ email, answer });
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong Email Or Answer",
      });
    }
    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

//test controller
export const testController = (req, res) => {
  try {
    res.send("Protected Routes");
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};

//update prfole
export const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const user = await userModel.findById(req.user._id);
    //password
    if (password && password.length < 6) {
      return res.json({ error: "Passsword is required and 6 character long" });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile Updated SUccessfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Update profile",
      error,
    });
  }
};

//orders
export const getOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
};
//orders
export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("products", "-photo")
      .populate("buyer", "name")
      .sort({ createdAt: "-1" });
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
};

//order status
export const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Updateing Order",
      error,
    });
  }
};


// address controller
export const createAddressController = async (req, res) => {
  try {
    const {
      fullName,
      phone,
      addressLine1,
      addressLine2,
      city,
      state,
      country,
      postalCode,
      isDefault,
    } = req.body;

    // Unset existing default if this one is set as default
    if (isDefault) {
      await UserAddress.updateMany(
        { user: req.user._id },
        { $set: { isDefault: false } }
      );
    }

    const address = new UserAddress({
      user: req.user._id,
      fullName,
      phone,
      addressLine1,
      addressLine2,
      city,
      state,
      country,
      postalCode,
      isDefault,
    });

    await address.save();
    res.status(201).send({
      success: true,
      message: "Address created successfully",
      address,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error creating address",
      error,
    });
  }
};

// get all users address getAllAddressesController
export const getAllAddressesController = async (req, res) => {
  try {

    const addresses = await UserAddress
      .find({ user: req.user._id });
      console.log("addresses==>", addresses)
    res.json(addresses);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error getting address",
      error,
    });
  }
};

// get single address
export const getSingleAddressController = async (req, res) => {
  try {
    const address = await UserAddress.findById(req.params.id);
    res.status(200).send({ success: true, address });
  } catch (error) {
    res.status(500).send({ success: false, message: "Error fetching address", error });
  }
};

export const updateAddressController = async (req, res) => {
  try {
    const { id } = req.params;
    let { isDefault } = req.body;

    // Find current address to get the user
    const currentAddress = await UserAddress.findById(id);
    if (!currentAddress) {
      return res.status(404).send({
        success: false,
        message: "Address not found",
      });
    }

    // If updating to default, unset others first
    if (isDefault) {
      await UserAddress.updateMany(
        { user: currentAddress.user, _id: { $ne: id } },
        { $set: { isDefault: false } }
      );

      // Ensure the current one will be saved as default
      req.body.isDefault = true;
    } else {
      // Explicitly make sure we don't accidentally allow multiple defaults
      req.body.isDefault = false;
    }

    // Update the address
    const updatedAddress = await UserAddress.findByIdAndUpdate(id, req.body, { new: true });

    res.status(200).send({
      success: true,
      message: "Address updated successfully",
      address: updatedAddress,
    });
  } catch (error) {
    console.error("Update Address Error:", error);
    res.status(500).send({
      success: false,
      message: "Error updating address",
      error,
    });
  }
};

export const defaultAddressController = async (req, res) => {
  try {
    const address = await UserAddress.findOne({ user: req.user._id, isDefault: true });
    if (!address) {
      return res.status(404).json({ message: "No default address found" });
    }
    // res.status(200).json(address);
    res.status(200).send({ success: true, address });
  } catch (err) {
    console.error("Error in defaultAddressController:", err);
    return res.status(500).json({ message: "Server error" });
  }
};


// controllers/authController.js
export const verifyEmail = async (req, res) => {
  const { token } = req.query;

  const user = await userModel.findOne({ verificationToken: token });
  if (!user) {
    return res.status(400).json({ message: 'Invalid or expired token' });
  }

  user.isVerified = true;
  user.verificationToken = null;
  await user.save();

  res.json({ message: 'Email verified successfully!' });
};

export const getOwnDetails = async(req, res) => {

  try {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: 'No token provided' });

    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded._id).select('-password');
    res.json({ user });
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }

}
