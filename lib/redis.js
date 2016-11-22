"use strict";

var Redis = require("ioredis");
var config = require('config');

var client = new Redis.Cluster(config.redis, {
    clusterRetryStrategy: function () {
        return 5000;
    }
});

var log = function (type) {
    return function () {
        console.log('redis ' + type, arguments);
    };
};

client.on('connect', log('connect'));
client.on('ready', log('ready'));
client.on('reconnecting', log('reconnecting'));
client.on('error', log('error'));
client.on('close', log('close'));



exports.get = function (key) {
    return client.get(key);
};

exports.mget = function (keys) {
    return client.mget(keys);
};

exports.set = function (key, value) {
    return client.set(key, value);
};

exports.expire = function (key, seconds) {
    return client.expire(key, seconds);
};

exports.sadd = function (key, member) {
    return client.sadd(key, member);
};

exports.scard = function (key) {
    return client.scard(key);
};

exports.smembers = function (key) {
    return client.smembers(key);
};


exports.getCache = function (key, seconds, getValue) {
    return exports.get(key).then(function (value) {
        if (value) {
            return JSON.parse(value);
        }
        return getValue().then(function (value) {
            return exports.set(key, JSON.stringify(value)).then(function () {
                return exports.expire(key, seconds);
            }).then(function () {
                return value;
            });
        });
    });
};


