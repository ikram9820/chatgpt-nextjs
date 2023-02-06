const { Configuration, OpenAIApi } = require("openai");

const OPENAI_API_KEY = "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";


const configuration = new Configuration({
  organization: "org-Ly5aQnd8tKwQxqAXElcYoh9d",
  apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function callgpt(propmt, model) {
  let response;
  try {
    response = await openai.createCompletion({
      model: model,
      prompt: propmt,
      max_tokens: 7,
      temperature: 0.5,
    });
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }

  console.log(response.data.choices[0].text);
  const message = response.data.choices[0].text;
  return message;
}



export default async function handler(req, res) {
  if (req.method === "POST") {
    const { messages, model } = req.body;
    let gptMessage;
    try {
      gptMessage = await callgpt(messages, model);
    } catch (error) {
      res.status(500).json({ message: "chat gpt is not working" });
      return;
    }
    res.status(201).json({ message: gptMessage });
  } 
  
  else {
    const response = await openai.listEngines();
    res.status(201).json({ data: response.data.data });
  }
}
