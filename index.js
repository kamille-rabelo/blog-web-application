import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

let data = [];

function addData(title, content, index="") {
    let today = new Date();
    today = today.getMonth() + '/' + today.getDate() + '/' +today.getFullYear()
    index? data[index] = {title: title, content: content.replace(/\r\n/g, '<br>'), date: today} : data.push({title: title, content: content.replace(/\r\n/g, '<br>'), date: today});
}

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs", {data: data});
});

app.post("/", (req, res) => {
    req.body["inputChange"]? addData(req.body["postTitle"], req.body["postContent"], req.body["inputChange"]) : addData(req.body["postTitle"], req.body["postContent"]);
    res.redirect("/")
});

app.listen(port, () => {
   console.log(`Listening on port ${port}`) ;
});