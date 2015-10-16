---
layout: blog_post
title: "Loading data from insecure HTTP hosts in iOS 9 with NSURLSession"
meta_description: "This tutorial shows how to access data from insecure HTTP hosts in iOS 9 with NSURLSession."
tags: programming
---

Since iOS 9 and OS X 10.11 Apple has introduced a feature called App Transport Security (ATS). Among other things it disallows loading data from insecure HTTP hosts by default. It means, for example, that loading a text file from **http://yoursite.com/file.txt** URL will no longer work in iOS 9.

There are two ways of fixing this problem:

1. Either change URLs from **http://** to **https://** which requires an SSL certificate to be installed on the server.
2. Or add an exception to the **Info.plist** file to allow using insecure HTTP protocol. The **yoursite.com** text in the following example needs to be replaced with your domain name.

```html
<key>NSAppTransportSecurity</key>
<dict>
    <key>NSExceptionDomains</key>
    <dict>
        <key>yoursite.com</key>
        <dict>
            <key>NSIncludesSubdomains</key>
            <true/>
            <key>NSTemporaryExceptionAllowsInsecureHTTPLoads</key>
            <true/>
        </dict>
    </dict>
</dict>
```

![Loading data from insecure HTTP sources in iOS 9 with NSURLSession](/image/blog/2015-09-09-loading-data-from-non-secure-hosts-in-ios9-with-nsurlsession.png)

## Reference

* [Networking with NSURLSession](https://developer.apple.com/videos/play/wwdc2015-711/): WWDC 2015 video.