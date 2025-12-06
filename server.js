const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { ClarifaiStub, grpc } = require("clarifai-nodejs-grpc");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Clarifai setup
const stub = ClarifaiStub.grpc();
const metadata = new grpc.Metadata();
const PAT = process.env.CLARIFAI_PAT || "290305ca11094226aa3a2b6eca66c5da";
metadata.set("authorization", "Key " + PAT);

// Route to handle face detection
app.post("/api/clarifai", (req, res) => {
  const { imageUrl } = req.body;

  console.log("Received request for image URL:", imageUrl);

  stub.PostModelOutputs(
    {
      user_app_id: {
        user_id: "3umw0pbpnlo",
        app_id: "FaceTrace"
      },
      model_id: "face-detection",
      inputs: [{ data: { image: { url: imageUrl } } }],
    },
    metadata,
    (err, response) => {
      if (err) {
        console.error("Clarifai error:", err);
        return res
          .status(500)
          .json({ error: "Clarifai request failed", details: err.message });
      }

      console.log("Clarifai response status:", response.status);

      if (response.status.code !== 10000) {
        console.error("Clarifai error response:", response.status);
        return res.status(400).json({
          error: response.status.description,
          code: response.status.code,
          details: response.status.details,
        });
      }
      res.json(response);
    }
  );
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
