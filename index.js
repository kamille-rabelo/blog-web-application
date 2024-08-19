import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

let data = [];

function addData(title, content) {
    data.push({Title: title, Content: content.replace(/\r\n/g, '<br>')});
}

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs", {data: data});
});

app.post("/", (req, res) => {
    addData(req.body["postTitle"], req.body["postContent"]);
    console.log(data);
    res.redirect("/")
});

app.listen(port, () => {
   console.log(`Listening on port ${port}`) ;
});