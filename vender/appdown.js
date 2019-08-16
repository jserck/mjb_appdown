(function () {
    function OpenApp() {
        this.ua = navigator.userAgent;
        this.win = window;
        this.doc = window.document;
        this.res = null;
        this.xhr = null;
        this.tid = null;
        this.isWebKit = /Android|webOS|iPhone|iPod|BlackBerry/i.test(this.ua);
        this.and = this.ua.indexOf('Android') > -1 || this.ua.indexOf('Linux') > -1;
        this.os = (navigator.appVersion)
            .match(/OS (\d+)_(\d+)_?(\d+)?/);
        this.iph = !!this.ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        this.mic = /MicroMessenger/i;
        this.isWb = this.ua.toLowerCase().match(/WeiBo/i) == "weibo";
        this.isQQ = this.ua.match(/\sQQ/i) == " QQ";
        this.isSf = /Safari/.test(navigator.userAgent) && !/CriOS/.test(navigator.userAgent);
        this.micStr = 'micromessenger';
        // this.universalLink = '';
        this.yyb = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.mjhome';
        this.universalLink = 'https://test.homehawkeye.com/appDown.html?type=a';
        this.iphoneSchema = 'com.maijiaHome.MyHawkEyeApp://';
        this.iphoneDownUrl =
            'https://itunes.apple.com/cn/app/%E9%B9%B0%E7%9C%BC%E9%89%B4%E6%88%BF/id1298408736?mt=8';
        this.androidSchema = 'jump://start.yyjf/';
        this.androidDownUrl = 'http://file.homehawkeye.com/homehawkeye1.5.6.apk';
        this.url = 'http://back.homehawkeye.com/maijiabangbackstate-1.0-SNAPSHOT/backstageUser/download/';
        // this.url =
        //     'http://47.95.233.255:8081/maijiabangbackstate-1.0-SNAPSHOT/backstageUser/download/';
    }

    OpenApp.prototype.resultHttp = function () {

        if (this.ua.indexOf('CriOS') >= 0) {
            return;
        }
        this.tid = setTimeout(() => {
            {
                let type = '?';
                if (/\?/.test(window.location.href)) {
                    type = '&';
                    return;
                }
                location.href = location.href + type + 'type=a';
            }
        }, 500);

    }

    OpenApp.prototype.openUrl = function () {
        let moban = document.getElementById('g-moban');
        moban.style.display = "none";
        var urlSchema = this.iph ? this.iphoneSchema : this.androidSchema;
        if (this.iph) {
            if (this.isWb || this.isQQ) {
                return;
            }
            if (parseInt(this.os[1], 10) > 8) {
                if (!this.universalLink || !this.isSf) {
                    this.universalLink = urlSchema;
                }
                location.href = this.universalLink;
            } else {
                this.iFroam(urlSchema);
                this.resultHttp();
            }
        } else {
            // this.iFroam(urlSchema);
            window.location = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.mjhome';
        }
    }
    OpenApp.prototype.https = function () {
        if (/type=a/.test(window.location.href)) {
            let moban = document.getElementById('g-moban');
            moban.style.display = "none";
            return;
        }
        var urls;
        var p = this.f_getUrl()
            .p || '0';
        if (this.iph) {
            urls = this.url + this.f_getUrl()
                .ut + '/' + this.f_getUrl()
                .ui + '/2' + '/' +
                this.f_getUrl()
                .p;
        } else {
            urls = this.url + this.f_getUrl()
                .ut + '/' + this.f_getUrl()
                .ui + '/1' + '/' +
                p;
        }
        if (!this.f_getUrl()
            .ui || !this.f_getUrl()
            .ut) {
            this.openUrl();
        } else {
            let ut = window.localStorage.getItem('ut' + this.f_getUrl().ut);
            if (ut === this.f_getUrl().ut) {
                let moban = document.getElementById('g-moban');
                moban.style.display = "none";
                this.openUrl();
                return;
            }
            this.getHttp(urls);
        }
    }
    OpenApp.prototype.wcart = function () {
        var urlDown = this.iph ? this.iphoneDownUrl : this.yyb;
        window.location.href = urlDown;
    }

    OpenApp.prototype.getHttp = function (urls) {
        this.xhr = createXHR();
        this.xhr.open('post', urls);
        // this.xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        this.xhr.send();
        this.xhr.onreadystatechange = function () {
            if (this.xhr.readyState === 4) {
                if (this.xhr.status === 200) {
                    res = JSON.parse(this.xhr.responseText);
                    if (res.code == '0') {
                        if (res.response.id == '1') {

                            let moban = document.getElementById('g-moban');
                            window.localStorage.setItem('ut' + this.f_getUrl().ut, this.f_getUrl().ut || null);
                            if (this.iph) {
                                moban.style.display = "none";
                                // this.openUrl();
                            } else {
                                window.location = this.yyb;
                            }
                        }
                    }
                } else {
                    window.location.href = 'https://test.homehawkeye.com/appDown.html';
                }
            }
        }.bind(this);

    }

    OpenApp.prototype.isWx = function () {
        let ua = this.ua.toLowerCase();
        if (ua.match(this.mic) == this.micStr) {
            return true;
        } else {
            return false;
        }
    }
    OpenApp.prototype.f_getUrl = function () {
        let url = this.win.location.search; //鑾峰彇url涓�"?"绗﹀悗鐨勫瓧涓�
        let theRequest = new Object();
        if (url.indexOf("?") != -1) {
            let str = url.substr(1);
            strs = str.split("&");
            for (let i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[
                    1]);
            }
        }
        return theRequest;
    }
    OpenApp.prototype.iFroam = function (url) {
        let ifr = document.createElement('iframe');
        ifr.src = url;
        ifr.style.display = 'none';
        document.body.appendChild(ifr);
        window.setTimeout(function () {
            document.body.removeChild(ifr);
        }, 500)
    }
    OpenApp.prototype.init = function () {
        let moban = document.getElementById('g-moban');
        moban.style.display = "block";
        this.https();
        let g_down = document.getElementById('g-down');
        let m_con = document.getElementById('m-conatiner');
        let u_web = document.getElementsByClassName('u-web');
        let u_wx = document.getElementsByClassName('u-wx');
        let shouji = document.getElementById('shouji');
        let conatiner = document.getElementById('m-conatiner');
        g_down.addEventListener('click', this.wcart.bind(this));
        if (!this.isWebKit) {
            conatiner.style.height = '13.34rem';
        }
        if (!this.isWx() && !this.isWb && !this.isQQ) {
            m_con.className = 'm-conatiner-web';
            shouji.style.bottom = '-1.2rem';
            for (let i = 0; i < u_web.length; i++) {
                u_web[i].style.display = '';
            }
            for (let i = 0; i < u_wx.length; i++) {
                u_wx[i].style.display = 'none';
            }
        } else {
            shouji.style.bottom = '-0.2rem';
            m_con.className = 'm-conatiner';
            for (let i = 0; i < u_web.length; i++) {
                u_web[i].style.display = 'none';
            }
            for (let i = 0; i < u_wx.length; i++) {
                u_wx[i].style.display = 'block';
            }
        }

        // if (!this.isWx() && !this.isWb && !this.isQQ) {
        // if (this.iph && parseInt(this.os[1], 10) > 8 && this.isSf) {
        //      return;
        // }
        // this.touch();

        // }
    }
    // OpenApp.prototype.GetSlideDirection = function (startX, startY, endX, endY) {
    //      var dy = startY - endY;
    //      // var dx = endX - startX;
    //      var result = 0;
    //      if (dy > 0) { //鍚戜笂婊戝姩
    //           result = 1;
    //      } else if (dy < 0) { //鍚戜笅婊戝姩
    //           result = 2;
    //      } else {
    //           result = 0;
    //      }
    //      return result;
    // }
    // OpenApp.prototype.touch = function () {

    //      var startX, startY;
    //      document.addEventListener('touchstart', function (ev) {
    //           startX = ev.touches[0].pageX;
    //           startY = ev.touches[0].pageY;
    //      }, false);

    //      document.addEventListener('touchend', function (ev) {
    //           var endX, endY;
    //           endX = ev.changedTouches[0].pageX;
    //           endY = ev.changedTouches[0].pageY;
    //           var direction = this.GetSlideDirection(startX, startY, endX, endY);
    //           if (direction === 2) {
    //                location.href = 'https://test.homehawkeye.com/appDown.html' || '';
    //           }
    //      }.bind(this), false);

    // }

    // OpenApp.prototype.bindPagehideEvent = function () {
    //      window.addEventListener('pagehide', function clear() {
    //           if (isPageVisible()) {
    //                clearTimeout(this.tid);
    //                window.removeEventListener('pagehide', clear);
    //           }
    //      });
    // }
    // OpenApp.prototype.bindVisibilityChangeEvent = function () {
    //      document.addEventListener('visibilitychange', function clear() {
    //           if (isPageVisible()) {
    //                clearTimeout(this.tid);
    //                document.removeEventListener('visibilitychange', clear);
    //           }
    //      });
    // }

    // OpenApp.prototype.isPageVisible = function () {
    //      let attrNames = ['hidden', 'webkitHidden'];
    //      for (let i = 0, len = attrNames.length; i < len; i++) {
    //           if (typeof document[attrNames[i]] !== 'undefined') {
    //                return !document[attrNames[i]];
    //           }
    //      }
    //      return true;
    // }


    window.OpenApp = OpenApp;
})();