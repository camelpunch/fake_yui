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
