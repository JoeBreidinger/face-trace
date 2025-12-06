const express = require("express");
const bodyParser = require("body-parser");
const { ClarifaiStub, grpc } = require("clarifai-nodejs-grpc");

const app = express();
app.use(bodyParser.json());

// Clarifai setup
const stub = ClarifaiStub.grpc();
const metadata = new grpc.Metadata();
metadata.set("authorization", "Key " + process.env.CLARIFAI_PAT);

// Route to handle face detection
app.post("/api/clarifai", (req, res) => {
  const { imageUrl } = req.body;

  stub.PostModelOutputs(
    {
      model_id: "face-detection",
      inputs: [{ data: { image: { url: imageUrl } } }],
    },
    metadata,
    (err, response) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Clarifai request failed" });
      }
      if (response.status.code !== 10000) {
        return res.status(400).json({ error: response.status.description });
      }
      res.json(response);
    }
  );
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
