import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    //hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log(hashedPassword);
    //create new user and save to DB
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    console.log(newUser);

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to create user!" });
  }
};

export const login = async (req, res) => {
    const{ username, password} = req.body;

    try{
    //check if the user exists
    const user = await prisma.user.findUnique({
        where:{username}
    });
 if(!user) return res.status(401).json({message:"Invalid credentials!"});
    //check if the password is correct

    const isPasswordValid =await bcrypt.compare(password, user.password);
    if(!isPasswordValid) return res.status(401).json({message:"Invalid credentials!"});
    
    //generate cookie token and send to the user

}catch(err){
    console.log(err)
    res.status(500).json({message:"Failed to Login"})
}
};

export const logout = (req, res) => {};
