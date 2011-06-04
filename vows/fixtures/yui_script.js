/*global window, process, YUI, module, require */
"use strict";

YUI().use('node', 'io-base', 'json', 'links', function (Y) {
    process.scriptCalled = true;
    Y.namespace('some.name.space');
    Y.some.name.space.foo = 'bar';

    Y.namespace('someNamespace');
    Y.someNamespace.foo = 'bar';
});
