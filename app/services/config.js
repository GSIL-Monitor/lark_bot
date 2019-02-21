
'use strict'

const path = require('path');
const util = require('../../libs/util');

const lark_ticket_file = path.join(__dirname,'../../config/lark_ticket_file.txt');

const config = {
    app_id:'cli_9ce6404252bd9101',
    app_secret:'AW8mYXcbarNcSYEx0olNmfe4VjVPxsnW',
    bot_token:'b-0212fc49-5ad3-4ae6-adb9-d7d369a29ba9',
    getAccessToken:function(){
        return util.readFileAsync(lark_ticket_file,'utf-8')
    },
    saveAccessToken:function(data){
        data = JSON.stringify(data);
        return util.writeFileAsync(lark_ticket_file,data)
    }
};

module.exports = config