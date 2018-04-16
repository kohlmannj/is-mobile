[![Build Status](https://travis-ci.org/kohlmannj/is-mobile.png)](https://travis-ci.org/kohlmannj/is-mobile)
[![Node development dependencies status](https://david-dm.org/kohlmannj/is-mobile/dev-status.svg)](https://david-dm.org/kohlmannj/is-mobile)

# is-mobile

A simple JS library that detects mobile devices.

## Why use is-mobile?

You probably shouldn't use this library unless you absolutely have to. In most cases, good [responsive design](https://en.wikipedia.org/wiki/Responsive_web_design) solves the problem of controlling how to
render things across different screen sizes. But there are always edge cases. If you have an edge case,
then this library might be for you.

I had very specific requirements for a project when I created this:

**`- Redirect all iPhones, iPods, Android phones, and seven inch devices to the mobile site.`**

Yep, at the time, a completely separate site had already been created for mobile devices. So I couldn't depend on media queries, feature detection, graceful degradation, progressive enhancement, or any of the cool techniques for selectively displaying things. I had to find a way to redirect visitors on certain devices to the mobile site.

I couldn't do detection on the back-end, because the entire site was generated as HTML, and then cached and served by a [CDN](https://en.wikipedia.org/wiki/Content_delivery_network), so I had to do the detection client-side.

So I resorted to User-Agent (UA) sniffing.

I tried to keep the script small (**currently ~1.4k bytes, minified**) and simple, because it would need to execute in the `<head>`, which is generally a bad idea, since JS blocks the downloading and rendering of all assets while it parses and executes. In the case of mobile redirection, I don't mind so much, because I want to start the redirect as soon as possible, before the device has a chance to start downloading and rendering other stuff. For non-mobile platforms, the script should execute fast, so the browser can quickly get back to downloading and rendering.

## How it works

is-mobile provides an `IsMobile` class constuctor (i.e. `new IsMobile()`). If you're using the script via a `<script>` tag without modules or a module bundler, there will be a global `IsMobile` variable.

## Devices detected by is-mobile

The following properties of the contructed `IsMobile` class will either be `true` or `false`:

### Apple devices

* `isMobile.apple.phone`
* `isMobile.apple.ipod`
* `isMobile.apple.tablet`
* `isMobile.apple.device` (any mobile Apple device)

### Android devices

* `isMobile.android.phone`
* `isMobile.android.tablet`
* `isMobile.android.device` (any mobile Android device)

### Amazon Silk devices (also passes Android checks)

* `isMobile.amazon.phone`
* `isMobile.amazon.tablet`
* `isMobile.amazon.device` (any mobile Amazon Silk device)

### Windows devices

* `isMobile.windows.phone`
* `isMobile.windows.tablet`
* `isMobile.windows.device` (any mobile Windows device)

### Specific seven inch devices

* `isMobile.seven_inch`
	* `true` if the device is one of the following 7" devices:
		- Nexus 7
		- Kindle Fire
		- Nook Tablet 7 inch
		- Galaxy Tab 7 inch

### "Other" devices

* `isMobile.other.blackberry_10`
* `isMobile.other.blackberry`
* `isMobile.other.opera` (Opera Mini)
* `isMobile.other.firefox`
* `isMobile.other.chrome`
* `isMobile.other.device` (any "Other" device)

### Aggregate Groupings

* `isMobile.any` - any device matched
* `isMobile.phone` - any device in the 'phone' groups above
* `isMobile.tablet` - any device in the 'tablet' groups above

### Installation

```bash
$ npm install @kohlmannj/is-mobile
```

### Usage

```js
import IsMobile from '@kohlmannj/is-mobile';
console.log(new IsMobile(req.headers['user-agent']).any);
```
