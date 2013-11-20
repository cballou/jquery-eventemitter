## Usage

```javascript
var Event = new $.eventEmitter();

// create a pub-sub subscribe event with channel/namespace/topic "hey"
Event.on('hey', function(p1, p2) { /* callback */ });

// trigger a pub-sub publish event on channel/namespace/topic "hey"
// passing in any number of arbitrary parameters
Event.trigger('hey', param1, param2);
```

#### Detailed Examples

Below is an example of how an event callback can be triggered
even if the actual event was triggered before the callback binding.
Note that event triggers also support supplying an unlimited number
of arguments following the event name.

```javascript
function fn1(msg) {
  console.log( 'fn1 called with message: ' + msg );
}
 
function fn2( msg ) {
  console.log( 'fn2 called with message: ' + msg );
}

var Event = new $.eventEmitter();

// outputs nothing
Event.trigger('hey', 'ho');
Event.trigger('ho', 'hum');

// outputs "fn1 called with message: ho"
Event.on('hey', fn1);

// outputs "fn2 called with message: hum"
Event.on('ho', fn2);
```

Below is another example demonstrating more common usage of an event being bound to a callback
before being triggered:

```javascript
function fn1(msg) {
  console.log( 'fn1 called with message: ' + msg );
}

function fn2( msg ) {
  console.log( 'fn2 called with message: ' + msg );
}

var Event = new $.eventEmitter();

Event.on('hey', fn1);
Event.on('ho', fn2);

// outputs "fn1 called with message: ho"
Event.trigger('hey', 'ho');

// outputs "fn2 called with message: hum"
Event.trigger('ho', 'hum');
```

## Credits

Inspired by James Padosley's [EventEmitter](http://james.padolsey.com/javascript/jquery-eventemitter/).
