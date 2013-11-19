/**
 * Custom event emitter plugin utilizing some special properties of the
 * callbacks function; specifically that we can bind events after the 
 * event has already been triggered.
 */
(function($) {

    $.eventEmitter = function() {
        this._callbacks = {};

        this.on = function(name, callback) {
            if (!this._callbacks[name]) {
                this._callbacks[name] = $.Callbacks('once unique memory');
            }
            this._callbacks[name].add(callback);
        };

        this.off = function(name, callback) {
            if (!this._callbacks[name]) {
                return;
            }
            this._callbacks[name].remove(callback);
        };

        this.trigger = function(name) {
            if (!this._callbacks[name]) {
                this._callbacks[name] = $.Callbacks('once unique memory');
            }
            this._callbacks[name].fire(Array.prototype.slice.call(arguments, 1));
        };
    };

})(jQuery);
