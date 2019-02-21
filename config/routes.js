/**
 * Created by yuan on 2016/8/10.
 */
'use strict'

var koaBody = require('koa-body')
var multer = require('koa-multer');
var Lark = require('../app/controllers/lark')
module.exports = function (router, mupload) {
  router.get('/lark', Lark.index)
}