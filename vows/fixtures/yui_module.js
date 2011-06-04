/*global window, process, YUI, module, require */
"use strict";

YUI.add('some-module', function (Y) {
    process.moduleCalled = true;
    Y.namespace('some.name.space');
    Y.some.name.space.foo = 'bar';

    Y.namespace('someNamespace');
    Y.someNamespace.foo = 'bar';
}, '0.3.4', { requires: ['some', 'stuff'] });
