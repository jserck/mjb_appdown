//创建xhr对象，兼容ie浏览器

(function (win) {
     function createXHR() {
          if (typeof XMLHttpRequest != "undefined") {
               return new XMLHttpRequest();
          } else if (typeof ActiveXObject != "undefined") {
               if (typeof arguments.callee.activeXString != "string") {
                    var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0",
                         "MSXML2.XMLHttp"
                    ];
                    var i = 0;
                    var len = 0;
                    for (i = 0, len = versions.length; i < len; i++) {
                         try {
                              new ActiveXObject(versions[i]);
                              arguments.callee.activeXString = versions[i];
                              break;
                         } catch (ex) {

                         }
                    }
                    return new new ActiveXObject(arguments.callee.activeXString);
               }

          } else {
               //手动抛出异常
               throw new Error("没有XHR对象能够创建出来");
          }
     }
     win.createXHR = createXHR;
})(window);