#Fake YUI

This is a partial implementation of fakes for YUI3. Use it to do isolated
testing in e.g. node.js without requiring a DOM implementation. After all, YUI
is there to deal with the DOM.

At present, if you want to use Fake YUI with node, it requires an extra line
before your YUI().use() line in your scripts, to get around the fact that node
has a different name for its global object. In future, eval() might be another
approach for loading scripts, or maybe I just need to learn node.js properly.

For example:

``` javascript
YUI().use('node', 'io-base', 'json', function (Y) {
    // your code here
});
```

becomes:

``` javascript
(typeof window === 'object' ? window : process). // global for browser/node
YUI().use('node', 'io-base', 'json', function (Y) {
    // your code here
});
```

To start testing using vows, or another node.js testing framework:

``` javascript
var vows = require('vows'),
assert = require('assert'),
fakeYUI = require('./fake_yui/fake_yui'),

// path is relative to where you have fake_yui.js
Y = fakeYUI.Y('../../public/javascripts/your_public_script', {
    // add some extra more fakes here
    JSON: {
        parse: function () {}
    },
    io: function () {}
});
```

In your test, you can do:

``` javascript
Y.run(); // runs your script
fakeYUI.node() // returns a fake node object
fakeYUI.nodeList() // returns a fake node list object
```

Check the source to see what's currently stubbed. Feel free to fork and grow the
stubs, since I'm only updating this when I add stubs I need.
