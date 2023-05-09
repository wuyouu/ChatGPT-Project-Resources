const { Configuration, OpenAIApi } = require("openai")
const configuration = new Configuration({
  apiKey: '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'
  // apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration)
(async () => {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "白日依山尽",
    temperature: 0,
    max_tokens: 100
  })
  console.log(response.data.choices[0].text)
})()