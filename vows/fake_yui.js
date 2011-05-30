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
};

vows.describe('fakeYUI').addBatch({
    'Y module': {
        topic: fakeYUI.Y('./vows/fixtures/yui_module', {
            some: 'property'
        }),

        'includes passed-in properties': function (topic) {
            assert.equal(topic.some, 'property');
        },

        'run': {
            topic: function (Y) {
                return Y.run;
            },

            'runs module as script': function (topic) {
                topic();
                assert.isTrue(process.moduleCalled);
            }
        },

        'namespace': {
            topic: function (Y) {
                Y.run();
                return Y.someNamespace;
            },

            'access allowed to properties': function (topic) {
                assert.equal(topic.foo, 'bar');
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

        'run': {
            topic: function (Y) {
                return Y.run;
            },

            'runs script at provided path when executed': function (topic) {
                topic();
                assert.isTrue(process.scriptCalled);
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

            'has fake addClass()': hasFake('addClass'),
            'has fake removeClass()': hasFake('removeClass'),
            'has fake on()': hasFake('on'),
            'has fake set()': hasFake('set')
        },

        'all': {
            topic: function (Y) {
                return Y.all('#bob');
            },

            'has fake addClass()': hasFake('addClass'),
            'has fake removeClass()': hasFake('removeClass'),
            'has fake on()': hasFake('on'),
            'has fake set()': hasFake('set')
        }
    },

    'node': {
        topic: fakeYUI.node(),

        'has fake addClass()': hasFake('addClass'),
        'has fake removeClass()': hasFake('removeClass'),
        'has fake on()': hasFake('on'),
        'has fake set()': hasFake('set')
    },

    'nodeList': {
        topic: fakeYUI.nodeList(),

        'has fake addClass()': hasFake('addClass'),
        'has fake removeClass()': hasFake('removeClass'),
        'has fake on()': hasFake('on'),
        'has fake set()': hasFake('set')
    }
}).exportTo(module);
