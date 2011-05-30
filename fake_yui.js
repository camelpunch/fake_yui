/*global module, process, require*/
"use strict";

var nodeAPI = function () {
    return {
        on: function () {},
        set: function () {},
        removeClass: function () {},
        addClass: function () {}
    };
},

Y = function (path, Yinstance) {
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
