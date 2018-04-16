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
const apple_phone = /iPhone/i;
const apple_ipod = /iPod/i;
const apple_tablet = /iPad/i;
const android_phone = /(?=.*\bAndroid\b)(?=.*\bMobile\b)/i; // Match 'Android' AND 'Mobile'
const android_tablet = /Android/i;
const amazon_phone = /(?=.*\bAndroid\b)(?=.*\bSD4930UR\b)/i;
const amazon_tablet = /(?=.*\bAndroid\b)(?=.*\b(?:KFOT|KFTT|KFJWI|KFJWA|KFSOWI|KFTHWI|KFTHWA|KFAPWI|KFAPWA|KFARWI|KFASWI|KFSAWI|KFSAWA)\b)/i;
const windows_phone = /Windows Phone/i;
const windows_tablet = /(?=.*\bWindows\b)(?=.*\bARM\b)/i; // Match 'Windows' AND 'ARM'
const other_blackberry = /BlackBerry/i;
const other_blackberry_10 = /BB10/i;
const other_opera = /Opera Mini/i;
const other_chrome = /(CriOS|Chrome)(?=.*\bMobile\b)/i;
const other_firefox = /(?=.*\bFirefox\b)(?=.*\bMobile\b)/i; // Match 'Firefox' AND 'Mobile'
const seven_inch = new RegExp(
  '(?:' + // Non-capturing group
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

const match = (regex, userAgent) => regex.test(userAgent);

export default class IsMobile {
  constructor(userAgent) {
    let ua = userAgent || navigator.userAgent;

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

  get apple() {
    return {
      phone: match(apple_phone, this.ua),
      ipod: match(apple_ipod, this.ua),
      tablet: !match(apple_phone, this.ua) && match(apple_tablet, this.ua),
      device:
        match(apple_phone, this.ua) || match(apple_ipod, this.ua) || match(apple_tablet, this.ua),
    };
  }

  get amazon() {
    return {
      phone: match(amazon_phone, this.ua),
      tablet: !match(amazon_phone, this.ua) && match(amazon_tablet, this.ua),
      device: match(amazon_phone, this.ua) || match(amazon_tablet, this.ua),
    };
  }

  get android() {
    return {
      phone: match(amazon_phone, this.ua) || match(android_phone, this.ua),
      tablet:
        !match(amazon_phone, this.ua) &&
        !match(android_phone, this.ua) &&
        (match(amazon_tablet, this.ua) || match(android_tablet, this.ua)),
      device:
        match(amazon_phone, this.ua) ||
        match(amazon_tablet, this.ua) ||
        match(android_phone, this.ua) ||
        match(android_tablet, this.ua),
    };
  }

  get windows() {
    return {
      phone: match(windows_phone, this.ua),
      tablet: match(windows_tablet, this.ua),
      device: match(windows_phone, this.ua) || match(windows_tablet, this.ua),
    };
  }

  get other() {
    return {
      blackberry: match(other_blackberry, this.ua),
      blackberry10: match(other_blackberry_10, this.ua),
      opera: match(other_opera, this.ua),
      firefox: match(other_firefox, this.ua),
      chrome: match(other_chrome, this.ua),
      device:
        match(other_blackberry, this.ua) ||
        match(other_blackberry_10, this.ua) ||
        match(other_opera, this.ua) ||
        match(other_firefox, this.ua) ||
        match(other_chrome, this.ua),
    };
  }

  get seven_inch() {
    return match(seven_inch, this.ua);
  }

  get any() {
    return (
      this.apple.device ||
      this.android.device ||
      this.windows.device ||
      this.other.device ||
      this.seven_inch
    );
  }

  // excludes 'other' devices and ipods, targeting touchscreen phones
  get phone() {
    return this.apple.phone || this.android.phone || this.windows.phone;
  }

  // excludes 7 inch devices, classifying as phone or tablet is left to the user
  get tablet() {
    return this.apple.tablet || this.android.tablet || this.windows.tablet;
  }
}
