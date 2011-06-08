/*global module, process, require*/
"use strict";

var nodeAPI = function () {
    var chainable = function () {
        return this;
    };

    return {
        on: function () {},
        one: function () {},
        all: function () {},
        hasClass: function () {},
        ancestor: function () {},
        remove: function () {},

        get: chainable,
        set: chainable,
        removeClass: chainable,
        addClass: chainable,
        setStyle: chainable,
        append: chainable,
        prepend: chainable
    };
},

Y = function (path, Yinstance) {
    Yinstance.namespace = function (name) {
        var list = name.split('.'),

        addToObject = function (obj, list) {
            var item = list.shift();

            if (item) {
                obj[item] = {};
                addToObject(obj[item], list);
            }
        }

        addToObject(Yinstance, list);
    };

    Yinstance.config = {
        win: {
            setTimeout: function () {}
        },

        doc: nodeAPI()
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

    global.YUI = function () {
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

    global.YUI.add = function () {
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
    var api = nodeAPI();

    api.all = undefined;
    api.ancestor = undefined;
    api.item = function () {};
    api.indexOf = function () {};
    api.size = function () {};
    api.each = function () {};

    return api;
};

module.exports.Y = Y;
module.exports.node = node;
module.exports.nodeList = nodeList;
