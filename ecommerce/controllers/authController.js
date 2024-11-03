import { hashPassword } from "./../helpers/authHelper";
export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, role } = req.body;

    if (!name) {
      return res.send({ message: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }
    if (!phone) {
      return res.send({ message: "Phone is Required" });
    }
    if (!address) {
      return res.send({ message: "Address is Required" });
    }
    if (!role) {
      return res.send({ message: "Role is required" });
    }

    const existingUser = await userSchema.findOne({ email });

    if (existingUser) {
      return res.status(500).send({
        success: true,
        message: "User already exists, please login",
      });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = new userSchema({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      role,
    }).save();

    return res
      .send(201)
      .send({ success: true, message: "User created successfully", newUser });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};
