/*
    A simple cookie library
*/

(function (document,window){
    'use strict';
    var _cookie = {
        read: function(params){
            var name = params.name;

            if(!name) return;

            var parts = document.cookie.split(name + '=');

            if(parts.length ===2 ) return decodeURIComponent(parts.pop().split(';'));

            return;
        },
        create: function(params) {
            params.name = params.name || false; // cookie name / key
            params.value = params.value || ''; // cookie value
            params.expires = params.expires || false; // cookie expires (days)
            params.path = params.path || '/'; // cookie path. defaults to '/' the whole website.
        
            if (params.name) {
                var cookie    = encodeURIComponent(params.name) + '=' + encodeURIComponent(params.value) + ';';
                var path      = 'path=' + params.path + ';';
                var domain    = params.domain ? 'domain=' + params.domain + ';' : '';
                var secure    = params.secure ? 'secure;' : '';
                var httpOnly  = params.httpOnly ? 'httpOnly;' : '';
                var expires   = '';
        
                // If the params object contains expires in days.
                if (params.expires) {
                    // using "expires" because IE doesn't support "max-age".
                    params.expires = new Date(new Date().getTime() + 
                        parseInt(params.expires, 10) * 1000 * 60 * 60 * 24);
                    // using the UTC time zone.
                    expires = 'expires=' + params.expires.toUTCString() + ';';
                }
        
                // assign all the concatenated values to document.cookie.
                document.cookie = cookie + expires + path + domain + secure + httpOnly;
                return true;
            }
        
            return false;
        },
        exists: function(params) {
            // checks the `params` object for property name
            if (!params || !params.name) {
                return;
            }
        
            // call the read method providing the `params` object as parameter
            if (this.read(params)) {
                return true;
            }
        
            return false;
        },
        listAsObject: function() {
            var cookiesObj = {}; // an empty object to store retrieved cookies.
            var cookies = document.cookie ? document.cookie.split('; ') : [];
            var len = cookies.length; // length of keys.
            var cookie;
        
            if (!cookies) {
                return cookiesObj;
            }
        
            while (len--) {
                cookie = cookies[len].split('=');
                cookiesObj[decodeURIComponent(cookie[0])] = decodeURIComponent(cookie[1]);
            }
        
            return cookiesObj;
        },
        remove: function(params) {
            if (!params) return;
        
            if (this.read(params)) {
                return this.create({
                    name: params.name,
                    value: ' ', // set value to empty string
                    expires: -1, // reset expires
                    path: params.path,
                    domain: params.domain
                });
            }
        
            return false;
        }
        
    }

    if(typeof define === 'function' && define.amd){
        define([], function(){
            return _cookie;
        });
    }
    else{
        window._cookie = _cookie;
    }

    console.log("in function cookiejs");
})(document,window);