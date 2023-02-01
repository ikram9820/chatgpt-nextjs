const { Configuration, OpenAIApi } = require("openai");

const OPENAI_API_KEY = "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";
const configuration = new Configuration({
  organization: "org-Ly5aQnd8tKwQxqAXElcYoh9d",
  apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
// const response = await openai.listEngines();
async function callgpt(text) {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: text,
    max_tokens: 7,
    temperature: 0,
  });
  console.log(response.data.choices[0].text);
}

export async function handler(req, res) {
  callgpt("Say this is a test");
}
