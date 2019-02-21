var config  = require('./config');
var request = require('request')
const { app_id, app_secret, bot_token,getAccessToken,saveAccessToken} = config

exports.findGrop = async function () {
  return await new Promise((resolve, reject) => {
    request(
      {
        uri: 'https://oapi.zjurl.cn/open-apis/api/v1/groups.list',
        method: 'POST',
        json: {token:bot_token},
      }, (err, resp, body) => {
        if (err) return reject(err)

        if (typeof body === 'string') {
          body = JSON.parse(body)
        }
        if (body.code !== 0) return reject(body)
        return resolve(body)
      },
    )
  })
};

exports.sendMessageToGroups = async function (token,chat_id,content) {
  return await new Promise((resolve, reject) => {
    request(
      {
        uri: 'https://oapi.zjurl.cn/open-apis/api/v2/message',
        method: 'POST',
        headers:{Authorization:token},
        json: {"token": bot_token, "chat_id":chat_id, "msg_type": "text", "content":content},
      }, (err, resp, body) => {
        console.log('body',body)
        if (err) return reject(err)

        if (typeof body === 'string') {
          body = JSON.parse(body)
        }
        if (body.code !== 0) return reject(body)
        return resolve(body)
      },
    )
  })
}