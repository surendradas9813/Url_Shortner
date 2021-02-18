const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const shortUrl = require(__dirname+"/models/shortUrl");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));


mongoose.connect("mongodb+srv://admin_Surendra:btech4year@cluster0.5am27.mongodb.net/UrlShortener", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });


app.set("view engine","ejs");

app.get("/",async (req,res)=>{
    const Urls = await shortUrl.find();
    res.render("index",{Urls:Urls});
});


app.post("/shortUrls",async (req,res)=>{
    await shortUrl.create({full: req.body.fullUrl});
    res.redirect("/");
});

app.get("/:shortUrl",async (req,res)=>{
    const shorturl = await shortUrl.findOne({short: req.params.shortUrl}); 

    if(shortUrl == null) return res.sendStatus(404);


    shorturl.clicks++;

    shorturl.save();

    res.redirect(shorturl.full);
})

app.listen(process.env.PORT || 3000,(req,res)=>{
    console.log("server is up and running");
});