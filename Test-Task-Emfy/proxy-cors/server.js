const express = require("express");
const app = express();
const cors = require("cors");


app.use(cors());

app.get("/getleads",async (req,res)=>{
    const {token,subdomain,limit,page} = req.query;
    const response = await fetch(`https://${subdomain}.amocrm.ru/api/v4/leads?limit=${limit}&page=${page}`,{
        method:"GET",
        headers:{
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
        }
    });
    const data = await response.json();
    res.json(await data);
})

app.get("/getleads/id/:id",async (req,res)=>{
    const {token,subdomain} = req.query;
    const {id} = req.params;
    const response = await fetch(`https://${subdomain}.amocrm.ru/api/v4/leads/${id}`,{
        method:"GET",
        headers:{
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
        }
    });
    const data = await response.json();
    res.json(await data);
})

app.listen(3000,()=>{
    console.log("listeting port 3000");
})