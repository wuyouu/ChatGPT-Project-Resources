const axios = require('axios');
const HttpsProxyAgent = require('https-proxy-agent')

const API_KEY = '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';

const httpsAgent = new HttpsProxyAgent(`http://127.0.0.1:15236`);
const proxyAxios = axios.create({
  proxy: false,
  httpsAgent,
  headers: {
    'Authorization': `Bearer ${API_KEY}`
  }
})

;(async () => {
  const response = await proxyAxios.post('https://api.openai.com/v1/completions', {
    model: 'text-davinci-003',
    prompt: '白日依山尽',
    max_tokens: 100,
    temperature: 0,
  })
  console.log(response.data.choices[0].text)
})()
  