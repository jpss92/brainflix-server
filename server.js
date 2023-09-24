const express = require("express");
const fs = require("fs");
const app = express();
const port = 8080;
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.get('/videos', (req, res) => {
    const filePath = './data/video-details.json';

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).json({error: 'Internal Server Error'})
        }
        try {
            const jsonData =  JSON.parse(data);
            res.json(jsonData)
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'JSON Parsing Error'})
        }
    });
});

const dataFilePath = "./data/video-details.json";
let jsonData = [];
try {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    jsonData = JSON.parse(data);
} catch (error) {
    console.error(error);
}

app.get("/videos/:id", (req,res) => {
    const id = req.params.id;
    const result = jsonData.find(item => item.id === id);

    if (result) {
        res.json(result);
    } else {
        res.status(404).json({ error: 'Data not found'})
    }
});

app.post("/videos", (req, res) => {

    const newVideo = req.body;
    jsonData.push(newVideo);

    fs.writeFile(dataFilePath, JSON.stringify(jsonData, null, 2), (err) => {
        if(err) {
            console.log(err);
            return res.status(500).json({error:'Error writing to file'});
        }
        res.status(201).json({message:'Video added successfully', data: newVideo});
     });
});

app.listen(port, () => {
    console.log("server is running on port 8080!");
});