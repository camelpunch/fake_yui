/*global require, module, process */
"use strict";

var sys = require('sys'),
vows = require('vows'),
assert = require('assert'),
fakeYUI = require('../fake_yui'),

hasFake = function (method) {
    return function (topic) {
        topic[method]();
    };
},

hasNodeAPI = function () {
    var context = {
        'has fake addClass()': hasFake('addClass'),
        'has fake removeClass()': hasFake('removeClass'),
        'has fake on()': hasFake('on'),
        'has fake set()': hasFake('set'),
        'has fake get()': hasFake('get')
    };

    return context;
},

hasYinstanceAPI = function () {
    var context = {
        'augment': {
            topic: function (Y) {
                var obj = {};
                Y.augment(obj);
                return obj;
            },

            'adds fake publish() to an object': hasFake('publish'),
            'adds fake fire() to an object': hasFake('fire')
        },

        'namespace': {
            topic: function (Y) {
                Y.run();
                return Y.someNamespace;
            },

            'access allowed to properties': function (topic) {
                assert.equal(topic.foo, 'bar');
            }
        },

        'on': {
            topic: function (Y) {
                return Y.on;
            },

            'does nothing by default': function (topic) {
                topic('click', function () {});
            }
        },

        'one': {
            topic: function (Y) {
                return Y.one('#bob');
            },

            'has node API': hasNodeAPI()
        },

        'all': {
            topic: function (Y) {
                return Y.all('#bob');
            },

            'has node API': hasNodeAPI()
        }
    };

    return context;
};

vows.describe('fakeYUI').addBatch({
    'Y module': {
        topic: fakeYUI.Y('./vows/fixtures/yui_module', {
            some: 'property'
        }),

        'includes passed-in properties': function (topic) {
            assert.equal(topic.some, 'property');
        },

        'has Y instance API': hasYinstanceAPI(),

        'run': {
            topic: function (Y) {
                return Y.run;
            },

            'runs module as script': function (topic) {
                topic();
                assert.isTrue(process.moduleCalled);
            }
        }
    },

    'Y script': {
        topic: fakeYUI.Y('./vows/fixtures/yui_script', {
            some: 'property'
        }),

        'includes passed-in properties': function (topic) {
            assert.equal(topic.some, 'property');
        },

        'has Y instance API': hasYinstanceAPI(),

        'run': {
            topic: function (Y) {
                return Y.run;
            },

            'runs script at provided path when executed': function (topic) {
                topic();
                assert.isTrue(process.scriptCalled);
            }
        }
    },

    'node': {
        topic: fakeYUI.node(),
        'has node API': hasNodeAPI()
    },

    'nodeList': {
        topic: fakeYUI.nodeList(),
        'has node API': hasNodeAPI()
    }
}).exportTo(module);
