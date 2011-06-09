/*global global, module, process, require*/
"use strict";

var chainable = function () {
    return this;
},

sharedAPI = function () {
    return {
        on: function () {},
        one: function () {},
        hasClass: function () {},
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

node = function () {
    var api = sharedAPI();

    api.all = function () {};
    api.ancestor = function () {};
    api.reset = chainable;

    return api;
},

nodeList = function () {
    var api = sharedAPI();

    api.item = function () {};
    api.indexOf = function () {};
    api.size = function () {};
    api.each = function () {};

    return api;
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
        };

        addToObject(Yinstance, list);
    };

    Yinstance.config = {
        win: {
            setTimeout: function () {}
        },

        doc: node()
    };

    Yinstance.EventTarget = {
        publish: function () {},
        fire: function () {}
    };

    Yinstance.augment = function (destination, source) {
        var key;

        for (key in source) {
            if (source.hasOwnProperty(key)) {
                destination[key] = source[key];
            }
        }
    };

    Yinstance.all = function () {
        return nodeList();
    };

    Yinstance.one = function () {
        return node();
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
};

module.exports.Y = Y;
module.exports.node = node;
module.exports.nodeList = nodeList;
