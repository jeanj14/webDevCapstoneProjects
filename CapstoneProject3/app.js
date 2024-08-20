import express, { urlencoded } from "express";
import ejs from "ejs";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.use(urlencoded({extended : true}));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.listen(port, (err) => {
    if (err) throw err;
    console.log(`Server is listening on ${port}`)
});