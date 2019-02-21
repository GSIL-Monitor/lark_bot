var {takeToken} = require('../services/token');
var {findGrop, sendMessageToGroups} = require('../services/lark')

exports.index = async function () {
  const token = await takeToken();
  const {groups} = await findGrop(token)
  for (const g of groups) {
    await sendMessageToGroups(token,g.id, {
      "text":  "test"
    })
  }
  this.body = {"session": 12121212}
}

