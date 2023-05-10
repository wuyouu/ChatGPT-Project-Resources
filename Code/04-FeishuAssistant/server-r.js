const express = require('express')
const axios = require('axios')
const bodyParser = require('body-parser')
const { getAiRes } = require('./openai')

const app = express()
app.use(bodyParser.json())

const ID_LIST = new Set()
let message_record = ''

app.post('/api/feishu-assistant', async (req, res) => {
  // res.status(200).json({
  //     challenge: req.body.challenge
  // })

  res.status(200).json({
    code: 0,
    msg: 'success'
  })

  // 1. 事件监测
  if (req.body.header.event_type !== 'im.message.receive_v1') {
    return
  }

  // 6. 重复消息监测
  if (ID_LIST.has(req.body.header.event_id)) {
    return
  }
  ID_LIST.add(req.body.header.event_id)

  // 2. 用户消息处理
  const { content, message_id } = req.body.event.message
  const { text } = JSON.parse(content)

  // 7. 用户消息记录
  message_record += `Q:${text}\n`

  // 3. 针对text生成回复，使用 openai api
  // const resText = await getAiRes(text)
  const resText = await getAiRes(message_record)

  // 7.2 回复消息记录
  message_record += `A:${resText}\n`

  // 4. 飞书 access_token 的获取
  const token = await axios.post('https://open.feishu.cn/open-apis/auth/v3/app_access_token/internal', {
    'app_id': 'cli_a4d0bb3446799013',
    'app_secret': 'Oy7t7gsH59IPOxmJKjRFjd7gC8ypuDPJ'
  }, {
    header: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  })
  // console.log(token)

  // 5. 回复消息
  try {
    const resResult = await axios.post(`https://open.feishu.cn/open-apis/im/v1/messages/${message_id}/reply`, {
      msg_type: 'text',
      content: `{"text":"${resText}"}`
    }, {
      headers: {
        'Authorization': `Bearer ${token.data.app_access_token}`
      }
    })

    console.log('success', resResult)
  } catch (err) {
    console.log('fail', err)
  }
})

app.listen(3001, () => {
  console.log('Server is running on port 3001')
})