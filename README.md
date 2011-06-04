#Fake YUI

This is a partial implementation of fakes for YUI3. Use it to do isolated
testing in e.g. node.js without requiring a DOM implementation. After all, YUI
is there to deal with the DOM.

To start testing using vows, or another node.js testing framework:

``` javascript
var vows = require('vows'),
assert = require('assert'),
fakeYUI = require('./fake_yui/fake_yui'),

// path is relative to where you have fake_yui.js
Y = fakeYUI.Y('../../public/javascripts/your_public_script', {
    // add some more fakes / stubs here
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
