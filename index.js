const express = require("express");
require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");
const cors = require("cors");

const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use(cors());

const configuration = new Configuration({
  apiKey: `${process.env.API_KEY}`,
});

const openai = new OpenAIApi(configuration);

app.get("/", (req, res) => {
  res.status(200).json({ message: "hello from server" });
});

app.post("/", async (req, res) => {
  try {
    const { message } = req.body;
    console.log({message});

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${message}`,
      max_tokens: 3000,
      temperature: 0.5,
      top_p: 1.0,
      frequency_penalty: 0.5,
      presence_penalty: 0.0,
    });

    console.log({response:response.data.choices[0].text});

    res.status(200).json({
      message: response.data.choices[0].text,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ error });
  }
});

app.listen(PORT, () => {
  console.log(`Listning on PORT ${PORT} and http://localhost:${PORT}`);
});
