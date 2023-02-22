const express = require("express");
const router = new express.Router();
const Products = require("../models/productSchema");
const Users = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const authenicate = require("../middleware/authenticate");
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();

router.get("/getproducts", async (req, res) => {
  try {
    const producstsdata = await Products.find();
    console.log("Consoling The Data");
    res.status(201).json(producstsdata);
  } catch (error) {
    console.log(error);
  }
});

router.get("/getproducts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Products.findOne({ id: id });
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json(data);
    console.log(error);
  }
});

router.post("/register", jsonParser, async (req, res) => {
  console.log(req.body);
  const { fname, email, mobile, password, cpassword } = req.body;

  if (!fname || !email || !mobile || !password || !cpassword) {
    console.log(res);
    res.status(422).json({ error: "Fill all details" });
  }

  try {
    const preuser = await Users.findOne({ email: email });

    if (preuser) {
      res.status(422).json({ error: "Email already exists" });
    } else if (password !== cpassword) {
      res.status(422).json({ error: "Password Not Matching" });
    } else {
      const finaluser = new Users({
        fname,
        email,
        mobile,
        password,
        cpassword,
      });

      const storedata = await finaluser.save();
      res.status(201).json(storedata);
    }
  } catch (error) {
    console.log(error.message);
    res.status(422).send(error);
  }
});

router.post("/login", jsonParser, async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "Fill All Details" });
  }

  try {
    const userlogin = await Users.findOne({ email: email });
    console.log(userlogin);
    if (userlogin) {
      const isMatch = await bcrypt.compare(password, userlogin.password);
      console.log(isMatch);

      if (!isMatch) {
        res.status(400).json({ error: "Invalid Credentials" });
      } else {
        const token = await userlogin.generatAuthtoken();
        console.log(token);

        res.cookie("ecommerce", token, {
          expires: new Date(Date.now() + 864000),
          sameSite: "none",
          secure: "false",
          httpOnly: true,
        });
        res.status(201).json(userlogin);
      }
    } else {
      res.status(400).json({ error: "Users Does Not Exist" });
    }
  } catch (error) {
    res.status(400).json({ error: "Invalid" });
    console.log(error.message);
  }
});

router.post("/addcart/:id", authenicate, async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await Products.findOne({ id: id });
    console.log(cart);

    const Usercontact = await Users.findOne({ _id: req.userID });
    console.log(Usercontact);

    if (Usercontact) {
      const cartData = await Usercontact.addcartdata(cart);

      await Usercontact.save();
      console.log(cartData);
      console.log(Usercontact);
      res.status(201).json(Usercontact);
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/remove/:id", authenicate, async (req, res) => {
  try {
    const { id } = req.params;

    req.rootUser.carts = req.rootUser.carts.filter((curel) => {
      return curel.id != id;
    });

    req.rootUser.save();
    res.status(201).json(req.rootUser);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

router.get("/cartdetails", authenicate, async (req, res) => {
  try {
    const buyuser = await Users.findOne({ _id: req.userID });
    console.log(buyuser);
    res.status(201).json(buyuser);
  } catch (error) {
    console.log(error);
  }
});

router.get("/validuser", authenicate, async (req, res) => {
  try {
    const validuserone = await Users.findOne({ _id: req.userID });
    console.log(validuserone);
    res.status(201).json(validuserone);
  } catch (error) {
    console.log(error);
  }
});

router.get("/logout", authenicate, async (req, res) => {
  try {
    req.rootUser.tokens = req.rootUser.tokens.filter((curelem) => {
      return curelem.token !== req.token;
    });

    res.clearCookie("ecommerce", { path: "/" });
    req.rootUser.save();
    res.status(201).json(req.rootUser.tokens);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
