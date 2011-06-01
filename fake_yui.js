/*global module, process, require*/
"use strict";

var nodeAPI = function () {
    var chainable = function () {
        return this;
    };

    return {
        on: function () {},
        one: function () {},
        hasClass: function () {},

        get: chainable,
        set: chainable,
        removeClass: chainable,
        addClass: chainable
    };
},

Y = function (path, Yinstance) {
    Yinstance.namespace = function (name) {
        Yinstance[name] = {};
    };

    Yinstance.config = {
        win: {
            setTimeout: function () {}
        }
    };

    Yinstance.augment = function (obj) {
        obj.publish = function () {};
        obj.fire = function () {};
    };

    Yinstance.all = function () {
        return nodeAPI();
    };

    Yinstance.one = function () {
        return nodeAPI();
    };

    Yinstance.on = function () {};

    process.YUI = function () {
        return {
            use: function () {
                var application = arguments[arguments.length - 1];

                // special 'run' method on Y, for running the script under test
                Yinstance.run = function () {
                    application(Yinstance);
                };
            }
        };
    };

    process.YUI.add = function () {
        var mod = arguments[1];

        // special 'run' method on Y, for 'running' the module under test
        Yinstance.run = function () {
            mod(Yinstance);
        };
    };

    // load the script to be tested
    require(path);

    return Yinstance;
},

node = function () {
    return nodeAPI();
},

nodeList = function () {
    return nodeAPI();
};

module.exports.Y = Y;
module.exports.node = node;
module.exports.nodeList = nodeList;
