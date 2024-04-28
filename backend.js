
const express = require('express');
const cors = require('cors');

const { GoogleGenerativeAI } = require("@google/generative-ai");




// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// ...

const generationConfig = {
    maxOutputTokens: 300,
    temperature: 0.2,
  };

const model = genAI.getGenerativeModel({ model: "gemini-pro", generationConfig});

// ...

const app = express();
const port = 3000; // You can use any available port

app.use(cors());
app.use(express.json());

app.post('/summarize', async (req, res) => {
  try {
    console.log("???")
    const reviews = req.body.reviews;
    // const response = await openai.createCompletion({
    //   model: "text-davinci-003", // Use the latest model
    //   prompt: `Summarize these reviews: ${reviews.join('\n')}`,
    //   temperature: 0.5,
    //   max_tokens: 1024,
    //   top_p: 1.0,
    //   frequency_penalty: 0.0,
    //   presence_penalty: 0.0
    // });
    // res.json({ summary: response.data.choices[0].text.trim() });
    console.log(reviews)
    const prompt = `Given the following text, extract and summarize any customer reviews into a single paragraph that talks about high-level reviews from both positive and negative sides, and highlighting usual words people have said, and for each word, show counts of the words in reviews (should be more than 1). Only focus on reviews for the main object described in the context provided: ${reviews.join('\n')}`
    const result = await model.generateContent(prompt);
    console.log(result)
    const response = await result.response;
    const text = response.text();
    console.log("processing")
    console.log(text);
    // Send the text back to the client
    res.json({ summary: text });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "An error occurred.", summary: "Review_Not_Found" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
