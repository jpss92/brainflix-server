const express = require("express");
const fs = require("fs");
const router = express.Router();
const dataFilePath = "./data/video-details.json";
let jsonData = [];

try {
    const data = fs.readFileSync(dataFilePath, "utf8");
    jsonData = JSON.parse(data);
} catch (error) {
    console.error(error);
}

router.get('/', (req, res) => {
    res.json(jsonData);
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    const result = jsonData.find(item => item.id === id);

    if (result) {
        res.json(result);
    } else {
        res.status(404).json({ error: 'Data not found' });
    }
});

router.post('/', (req, res) => {
    const newVideo = req.body;
    jsonData.push(newVideo);

    fs.writeFile(dataFilePath, JSON.stringify(jsonData, null, 2), (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Error writing to file' });
        }
        res.status(201).json({ message: 'Video added successfully', data: newVideo });
    });
});

module.exports = router;
