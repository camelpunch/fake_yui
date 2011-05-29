/*global window, process, YUI, module, require */
"use strict";

(typeof window === 'object' ? window : process). // global for browser/node
YUI.add('some-module', function (Y) {
    process.moduleCalled = true;
});
