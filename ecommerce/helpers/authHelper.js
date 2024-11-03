import bcrypt from "bcrypt";

export const hashPassword = async (password) => {
  try {
    // a value of 10 means 2^10 times the iteration will happen
    const saltrounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltrounds);
    return hashedPassword;
  } catch (error) {
    console.log(error);
  }
};

export const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashPassword);
};
