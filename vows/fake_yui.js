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

hasChainable = function (method) {
    return function (topic) {
        assert.equal(topic[method](), topic);
    };
},

hasNodeListAPI = function () {
    var context = {
        'has chainable toggleClass()': hasChainable('toggleClass'),
        'has chainable addClass()': hasChainable('addClass'),
        'has chainable removeClass()': hasChainable('removeClass'),
        'has chainable set()': hasChainable('set'),
        'has chainable get()': hasChainable('get'),
        'has chainable setStyle()': hasChainable('setStyle'),

        'has fake getAttribute()': hasFake('getAttribute'),
        'has fake hasClass()': hasFake('hasClass'),
        'has fake on()': hasFake('on'),
        'has fake one()': hasFake('one'),
        'has fake append()': hasFake('append'),
        'has fake remove()': hasFake('remove'),
        'has fake empty()': hasFake('empty'),

        'has fake item()': hasFake('item'),
        'has fake indexOf()': hasFake('indexOf'),
        'has fake size()': hasFake('size'),
        'has fake each()': hasFake('each'),

        'does not have fake all()': function (nodeList) {
            assert.equal(nodeList.all, undefined);
        },

        'does not have fake ancestor()': function (nodeList) {
            assert.equal(nodeList.ancestor, undefined);
        },

        'does not have fake reset()': function (nodeList) {
            assert.equal(nodeList.reset, undefined);
        }
    };

    return context;
},

hasNodeAPI = function () {
    var context = {
        'has chainable toggleClass()': hasChainable('toggleClass'),
        'has chainable addClass()': hasChainable('addClass'),
        'has chainable removeClass()': hasChainable('removeClass'),
        'has chainable set()': hasChainable('set'),
        'has chainable get()': hasChainable('get'),
        'has chainable append()': hasChainable('append'),
        'has chainable prepend()': hasChainable('prepend'),
        'has chainable reset()': hasChainable('reset'),
        'has chainable setStyle()': hasChainable('setStyle'),
        'has chainable empty()': hasChainable('empty'),

        'has fake getAttribute()': hasFake('getAttribute'),
        'has fake hasClass()': hasFake('hasClass'),
        'has fake on()': hasFake('on'),
        'has fake one()': hasFake('one'),
        'has fake ancestor()': hasFake('ancestor'),
        'has fake remove()': hasFake('remove'),

        'has fake all()': hasFake('all')
    };

    return context;
},

hasYinstanceAPI = function () {
    var context = {
        'augment a normal object': {
            topic: function (Y) {
                var obj = {},
                newObj = {
                    key: 'value'
                };
                Y.augment(obj, newObj);
                return obj;
            },

            'adds just the new object properties': function (obj) {
                assert.deepEqual(obj, {
                    key: 'value'
                });
            }
        },

        'augment Y.EventTarget': {
            topic: function (Y) {
                var obj = {};
                Y.augment(obj, Y.EventTarget);
                return obj;
            },

            'adds fake publish() to an object': hasFake('publish'),
            'adds fake fire() to an object': hasFake('fire')
        },

        'namespace': {
            'without separator': {
                topic: function (Y) {
                    Y.run();
                    return Y.someNamespace;
                },

                'access allowed to properties': function (topic) {
                    assert.equal(topic.foo, 'bar');
                }
            },

            'with separator': {
                topic: function (Y) {
                    Y.run();
                    return Y.some.name.space;
                },

                'access allowed to properties': function (topic) {
                    assert.equal(topic.foo, 'bar');
                }
            }
        },

        'config': {
            'win': {
                topic: function (Y) {
                    return Y.config.win;
                },
                'has fake setTimeout()': hasFake('setTimeout')
            },

            'doc': {
                topic: function (Y) {
                    return Y.config.doc;
                },

                'has node API': hasNodeAPI()
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

            'has nodeList API': hasNodeListAPI()
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
        'has nodeList API': hasNodeListAPI()
    }
}).exportTo(module);
