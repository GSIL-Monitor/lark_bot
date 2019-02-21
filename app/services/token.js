var config  = require('./config');
var request = require('request')
const { app_id, app_secret, getAccessToken,saveAccessToken} = config

exports.takeToken = async function () {
  let tt = await getAccessToken()
  if (!tt || new Date(tt.expires_in).getTime() < Date.now()) {
    tt = await refreshToken()
  }else{
    tt = JSON.parse(tt)
  }
  return tt.access_token
}

async function refreshToken() {
  const body = await new Promise((resolve, reject) => {
    request(
      {
        uri: 'https://oapi.zjurl.cn/open-apis/v3/auth/tenant_access_token/internal/',
        method: 'POST',
        json: {
          app_id,
          app_secret,
        },
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
  const obj = {
    access_token: body.tenant_access_token,
    expires_in: body.expire * 1000 + Date.now(),
  }
  await saveAccessToken(Object.assign({}, obj, { app_id, app_secret }))

  return obj
}



