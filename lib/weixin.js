'use strict';

var request = require('./request');
var redis = require('./redis');
var config = require('config');
let knowError = require("./knownError");


function weixinCallBack(data) {
    if (data.errcode) {
        let code = data.errcode;
        let message = data.errmsg;
        throw knowError({code, message});
    } else {
        return data;
    }
}


module.exports = function (weixinConfig) {

    let {appId, secret, keyPrefix}= weixinConfig;

    return {
        getAccessToken: function () {
            var key = appId + '_' + keyPrefix + '_access_token';
            return redis.getCache(key, 60 * 90, function () {
                var url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' +
                    appId + '&secret=' + secret;
                return request({
                    url: url,
                    json: true
                }).then(function (body) {
                    return body.access_token;
                });
            });
        },
        postWeixin: function (url, body = {}) {
            return this.getAccessToken().then((access_token) => {
                return request({
                    body,
                    method: "POST",
                    url: `https://api.weixin.qq.com/cgi-bin${url}`,
                    json: true,
                    qs: {access_token}
                }).then(weixinCallBack)
            })
        },
        getWeixin: function (url, qs = {}) {
            return this.getAccessToken().then((access_token) => {
                qs.access_token = access_token;
                return request({
                    qs: qs,
                    json: true,
                    method: "GET",
                    url: `https://api.weixin.qq.com/cgi-bin${url}`
                }).then(weixinCallBack)
            })
        }
    }
};