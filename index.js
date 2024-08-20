import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

let data = [];

function addData(title, content, index="", titleChange="") {
    let today = new Date();
    today = today.getMonth() + '/' + today.getDate() + '/' + today.getFullYear();
    if (index) {
        if (data[index].title === titleChange) {data[index] = {title: title, content: content.replace(/\r\n/g, '<br>'), date: today}};
    } else {
        data.push({title: title, content: content.replace(/\r\n/g, '<br>'), date: today});
    }
}

function deleteData(index, title) {
    if (data.includes(data[index])) {
        if (data[index].title === title) {
            data.splice(index, 1);
            return true;
        };
    };
    console.log("Invalid value for delete function.");
    return false;
}

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs", {data: data});
});

app.post("/", (req, res) => {
    if (req.body["postIndex"]) {
        deleteData(req.body["postIndex"], req.body["postTitle"]);
    } else {
        req.body["inputChange"]? addData(req.body["postTitle"], req.body["postContent"], req.body["inputChange"], req.body["titleChange"]) : addData(req.body["postTitle"], req.body["postContent"]);
    }
    res.redirect("/")
});

app.listen(port, () => {
   console.log(`Listening on port ${port}`) ;
});