/**
 * Custom event emitter plugin utilizing some special properties of the
 * callbacks function; specifically that we can bind events after the 
 * event has already been triggered.
 */
(function($) {

    $.eventEmitter = function() {
        this._callbacks = {};

        this.on = function(names, callback) {
            var names = names.split(' '),
                l = names.length,
                i;
                
            for (i = 0; i < l; i++) {
                if (!this._callbacks[names[i]]) {
                    this._callbacks[names[i]] = $.Callbacks('once unique memory');
                }
                this._callbacks[names[i]].add(callback);
            }
        };

        this.off = function(names, callback) {
            var names = names.split(' '),
                l = names.length,
                i;
                
            for (i = 0; i < l; i++) {
                if (this._callbacks[names[i]]) {
                    this._callbacks[names[i]].remove(callback);
                }
            }
        };

        this.trigger = function(name) {
            if (!this._callbacks[name]) {
                this._callbacks[name] = $.Callbacks('once unique memory');
            }
            this._callbacks[name].fire(Array.prototype.slice.call(arguments, 1));
        };
    };

})(jQuery);
