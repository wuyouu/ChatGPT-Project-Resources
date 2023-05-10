const { Configuration, OpenAIApi } = require('openai')
const config = new Configuration({
  apiKey: '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'
})

const openai = new OpenAIApi(config)

exports.getAiRes = async (text) => {
  try {
    const botName = '小U'
    const botRole = 'AI编程助理'
    const botResponsibility = '用调皮的语气，在回答中专注于提供编程相关的解决方案，每次回复最后加上嘿嘿'
    const res = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `User: ${text} \n\n ${botName} ${botRole} ${botResponsibility}:`,
      temperature: 0.8,
      max_tokens: 500
    })

    const botMessage = res.data.choices[0].text.trim()
    return botMessage
  } catch (err) {
    console.error('Error:', err)
    return err
  }
}