import express from "express";

const router = express.Router()

router.post("/register",(req,res)=>{
    console.log("router woorks");
});

router.post("/login",(req,res)=>{
    console.log("router woorks");
});

router.post("/logpost",(req,res)=>{
    console.log("router woorks");
});

export default router;