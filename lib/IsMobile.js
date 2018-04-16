(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define('IsMobile', ['exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.IsMobile = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  /* eslint-env browser */

  /**
   * isMobile.js v0.4.1
   *
   * A simple library to detect Apple phones and tablets,
   * Android phones and tablets, other mobile devices (like blackberry, mini-opera and windows phone),
   * and any kind of seven inch device, via user agent sniffing.
   *
   * @author: Kai Mallea (kmallea@gmail.com)
   *
   * @license: http://creativecommons.org/publicdomain/zero/1.0/
   */
  var apple_phone = /iPhone/i;
  var apple_ipod = /iPod/i;
  var apple_tablet = /iPad/i;
  var android_phone = /(?=.*\bAndroid\b)(?=.*\bMobile\b)/i; // Match 'Android' AND 'Mobile'
  var android_tablet = /Android/i;
  var amazon_phone = /(?=.*\bAndroid\b)(?=.*\bSD4930UR\b)/i;
  var amazon_tablet = /(?=.*\bAndroid\b)(?=.*\b(?:KFOT|KFTT|KFJWI|KFJWA|KFSOWI|KFTHWI|KFTHWA|KFAPWI|KFAPWA|KFARWI|KFASWI|KFSAWI|KFSAWA)\b)/i;
  var windows_phone = /Windows Phone/i;
  var windows_tablet = /(?=.*\bWindows\b)(?=.*\bARM\b)/i; // Match 'Windows' AND 'ARM'
  var other_blackberry = /BlackBerry/i;
  var other_blackberry_10 = /BB10/i;
  var other_opera = /Opera Mini/i;
  var other_chrome = /(CriOS|Chrome)(?=.*\bMobile\b)/i;
  var other_firefox = /(?=.*\bFirefox\b)(?=.*\bMobile\b)/i; // Match 'Firefox' AND 'Mobile'
  var seven_inch = new RegExp('(?:' + // Non-capturing group
  'Nexus 7' + // Nexus 7
  '|' + // OR
  'BNTV250' + // B&N Nook Tablet 7 inch
  '|' + // OR
  'Kindle Fire' + // Kindle Fire
  '|' + // OR
  'Silk' + // Kindle Fire, Silk Accelerated
  '|' + // OR
  'GT-P1000' + // Galaxy Tab 7 inch
  ')', // End non-capturing group
  'i' // Case-insensitive matching
  );

  var match = function match(regex, userAgent) {
    return regex.test(userAgent);
  };

  var IsMobile = function () {
    function IsMobile(userAgent) {
      _classCallCheck(this, IsMobile);

      var ua = userAgent || navigator.userAgent;

      // Facebook mobile app's integrated browser adds a bunch of strings that
      // match everything. Strip it out if it exists.
      var tmp = ua.split('[FBAN');
      if (typeof tmp[1] !== 'undefined') {
        ua = tmp[0];
      }

      // Twitter mobile app's integrated browser on iPad adds a "Twitter for
      // iPhone" string. Same probable happens on other tablet platforms.
      // This will confuse detection so strip it out if it exists.
      tmp = ua.split('Twitter');
      if (typeof tmp[1] !== 'undefined') {
        ua = tmp[0];
      }

      this.ua = ua;
    }

    _createClass(IsMobile, [{
      key: 'apple',
      get: function get() {
        return {
          phone: match(apple_phone, this.ua),
          ipod: match(apple_ipod, this.ua),
          tablet: !match(apple_phone, this.ua) && match(apple_tablet, this.ua),
          device: match(apple_phone, this.ua) || match(apple_ipod, this.ua) || match(apple_tablet, this.ua)
        };
      }
    }, {
      key: 'amazon',
      get: function get() {
        return {
          phone: match(amazon_phone, this.ua),
          tablet: !match(amazon_phone, this.ua) && match(amazon_tablet, this.ua),
          device: match(amazon_phone, this.ua) || match(amazon_tablet, this.ua)
        };
      }
    }, {
      key: 'android',
      get: function get() {
        return {
          phone: match(amazon_phone, this.ua) || match(android_phone, this.ua),
          tablet: !match(amazon_phone, this.ua) && !match(android_phone, this.ua) && (match(amazon_tablet, this.ua) || match(android_tablet, this.ua)),
          device: match(amazon_phone, this.ua) || match(amazon_tablet, this.ua) || match(android_phone, this.ua) || match(android_tablet, this.ua)
        };
      }
    }, {
      key: 'windows',
      get: function get() {
        return {
          phone: match(windows_phone, this.ua),
          tablet: match(windows_tablet, this.ua),
          device: match(windows_phone, this.ua) || match(windows_tablet, this.ua)
        };
      }
    }, {
      key: 'other',
      get: function get() {
        return {
          blackberry: match(other_blackberry, this.ua),
          blackberry10: match(other_blackberry_10, this.ua),
          opera: match(other_opera, this.ua),
          firefox: match(other_firefox, this.ua),
          chrome: match(other_chrome, this.ua),
          device: match(other_blackberry, this.ua) || match(other_blackberry_10, this.ua) || match(other_opera, this.ua) || match(other_firefox, this.ua) || match(other_chrome, this.ua)
        };
      }
    }, {
      key: 'seven_inch',
      get: function get() {
        return match(seven_inch, this.ua);
      }
    }, {
      key: 'any',
      get: function get() {
        return this.apple.device || this.android.device || this.windows.device || this.other.device || this.seven_inch;
      }
    }, {
      key: 'phone',
      get: function get() {
        return this.apple.phone || this.android.phone || this.windows.phone;
      }
    }, {
      key: 'tablet',
      get: function get() {
        return this.apple.tablet || this.android.tablet || this.windows.tablet;
      }
    }]);

    return IsMobile;
  }();

  exports.default = IsMobile;
});