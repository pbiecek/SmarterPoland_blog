(function () {

  window.tableau = window.tableau || {};

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Stuff that is called immediately and needs to be called for every inclusion of this script file
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  (function (t) {


    function serverRoot() {
      var i, e, r, scriptEls, protoRegex, baseWindowProto;

      // search backwards through the script tags to find this script
      scriptEls = document.getElementsByTagName("script");
      for (i = scriptEls.length - 1; i >= 0; i -= 1) {
        e = scriptEls[i];
        if (/viz_v1\.js/.test(e.src)) {
          break;
        }
      }

      r = new RegExp(".*?[^/:]\/").exec(e.src);
      if (!r || (r[0].toLowerCase().indexOf("http://") === -1 && r[0].toLowerCase().indexOf("https://") === -1)) {
        r = new RegExp(".*?[^/:]\/").exec(window.location.href);
      }

      return r ? r[0].toLowerCase() : "";
    }

    // We need to add something to the global namespace so that we can keep track
    // between invocations of this script file.
    t._apiScripts = t._apiScripts || [];
    t._apiScripts.push(serverRoot());

  }(window.tableau));

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // This should only be executed once
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  if (!window.tableau._apiLoaded) {
    window.tableau._apiLoaded = true;

    (function () {

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////
      // Variable Declarations
      /////////////////////////////////////////////////////////////////////////////////////////////////////////////

      var
        ELEMENT_NODE_TYPE = 1,
        isIE = navigator.userAgent.indexOf("MSIE") > -1 && !window.opera,

        loadIndex = -1,
        shouldSimulateMobile,

        // All the object nodes that we've seen so far
        tableauNodes = [],

        // array which holds the indexes of the vizs sorted in loadOrder
        vizsLoadOrder = [];

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////
      // Helper Functions
      /////////////////////////////////////////////////////////////////////////////////////////////////////////////

      function isNullOrUndef(obj) {
        return obj === undefined || obj === null;
      }

      function isNullOrEmpty(obj) {
        return obj === undefined || obj === null || obj.length === 0;
      }

      function hasPostMessage() {
        return !isNullOrUndef(window.postMessage);
      }

      function isElementOfTag(element, tagName) {
        return element && element.nodeType === ELEMENT_NODE_TYPE &&
          element.tagName.toLowerCase() === tagName.toLowerCase();
      }

      // Modified from jQuery's hasClass implementation
      function hasClass(element, className) {
        var rclass = /[\n\t\r]/g;
        return element && (" " + element.className + " ").replace(rclass, " ").indexOf(" " + className + " ") > -1;
      }

      // Recursively searches element's parents until one is found containing the
      // className or the stopAtElement is reached. If stopAtElement is not specified,
      // the search stops at the <body> element.
      function findParentWithClassName(element, className, stopAtElement) {
        var parent = element ? element.parentNode : null;

        stopAtElement = stopAtElement || document.body;

        while (parent) {
          if (hasClass(parent, className)) {
            return parent;
          }

          if (parent === stopAtElement) {
            parent = null;
          } else {
            parent = parent.parentNode;
          }
        }

        return parent;
      }

      // escapes a raw string into "safe" HTML for use in either an attribute or as HTML content
      function escapeHTML(str) {
        var escaped, i, len, specialChars;

        specialChars = [
          [ /&/g,  "&amp;"  ],
          [ /</g,  "&lt;"   ],
          [ />/g,  "&gt;"   ],
          [ /"/g,  "&quot;" ], // " fix my flawed syntax highlighting
          [ /'/g,  "&#39;"  ], // ' fix my flawed syntax highlighting
          [ /\//g, "&#47;"  ]
        ];

        escaped = str || "";
        for (i = 0, len = specialChars.length; i < len; i++) {
          escaped = escaped.replace(specialChars[i][0], specialChars[i][1]);
        }

        return escaped;
      }

      function tableauGCS(e, p) {
        if (window.getComputedStyle) {
          return window.getComputedStyle(e, p);
        } else {
          return e.currentStyle;
        }
      }

      function toBoolean(value, defaultIfMissing) {
        var
          positiveRegex = /^(yes|y|true|t|1)$/i,
          match;

        if (isNullOrEmpty(value)) {
          return defaultIfMissing;
        }

        match = value.match(positiveRegex);
        return !isNullOrEmpty(match);
      }

      function filterFromObjectParams(params) {
        var i, len, url = [];

        if (isNullOrEmpty(params.filter)) {
          return "";
        }

        for (i = 0, len = params.filter.length; i < len; i++) {
          url.push('&' + params.filter[i]);
        }

        return url.join('');
      }

      function formatSiteRootForUrl(siteRoot) {
        // remove front slash
        siteRoot = siteRoot.replace(/^\//, "");

        // add trailing slash
        if (siteRoot.charAt(siteRoot.length) !== '/') {
          siteRoot += '/';
        }

        return siteRoot;
      }

      function urlFromObjectParams(viewName, serverRoot, params) {
        var
          name,
          skipParams,
          siteRoot,
          url = [serverRoot];

        // if a non-empty site root is specifed, format it and use it
        // otherwise we'll leave it as an empty string
        siteRoot = params.site_root ? params.site_root : "";
        if (siteRoot.length > 0) {
          siteRoot = formatSiteRootForUrl(siteRoot);
        }

        // $note-ltan-2011-11-10
        // The path param represents stateful urls which are only in public.
        // At the moment, public doesn't care about sites, that's why the site
        // root is only included for regular (non-stateful) links. If sometime
        // in the future we use stateful url for corporate (which has sites), we'll
        // want to add the site root for stateful url as well.
        if (!isNullOrEmpty(params.path)) {
          url.push(params.path);
        } else if (!isNullOrEmpty(params.ticket)) {
          url.push('trusted/' + params.ticket + '/' + siteRoot + 'views/' + viewName);
        } else {
          url.push(siteRoot + 'views/' + viewName);
        }

        url.push('?:embed=y');
        url.push('&:showVizHome=no');

        skipParams = {
          'load-order': 1,
          'width': 1,
          'height': 1,
          'embed': 1,
          'filter': 1,
          'path': 1,
          'ticket': 1,
          'serverRoot' : 1,
          'static_image': 1,
          'site_prefix' : 1,
          'site_root' : 1
        };

        // any option not named above is appended to the URL
        for (name in params) {
          if (params.hasOwnProperty(name)) {
            if (skipParams[name] === undefined) {
              url.push('&:' + name + '=' + params[name]);
            }
          }
        }

        return url.join('');
      }

      // Recursively gets all of the <param> elements and adds the values to the params object.
      // Returns the value of the <param name="name"> tag, which is the viz name.
      function getObjectElementParams(objectElement, params) {
        var
          child, children = objectElement.childNodes,
          i, len,
          name, value,
          viewName = "", viewNameFromChildren;

        params = params || {};

        for (i = 0, len = children.length; i < len; i++) {
          child = children[i];
          if (isElementOfTag(child, "param") && child.name) {
            name = child.name;
            value = child.value ? child.value : null;
            if (name === "name") {
              viewName = value;
            } else if (name === "filter") {
              params.filter = params.filter || [];
              params.filter.push(value);
            } else {
              params[name] = value;
              if (name === "mobile" && toBoolean(value, false)) {
                shouldSimulateMobile = true;
              }
            }
          } else if (child.childNodes && child.childNodes.length > 0 && !isElementOfTag(child, "object")) {
            viewNameFromChildren = getObjectElementParams(child, params);
            viewName = isNullOrEmpty(viewName) ? viewNameFromChildren : viewName;
          }
        }

        return viewName;
      }

      function calculateServerRootFromObjectParameters(opts) {
        // the host_url parameter overrides the server root from the <script> element
        var protoRegex, baseWindowProto, serverRoot;
        if (!isNullOrEmpty(opts.host_url)) {
          serverRoot = decodeURIComponent(opts.host_url);
        } else if (!isNullOrEmpty(opts.serverRoot)) {
          serverRoot = opts.serverRoot;
        } else {
          // one of these should have been specified - fall back to the first <script> element on the page
          serverRoot = tableau._apiScripts[0];
        }
        protoRegex = new RegExp(".*\/\/");
        baseWindowProto = protoRegex.exec(window.location.href)[0];

        if (serverRoot.indexOf(baseWindowProto) === -1) {
          serverRoot = serverRoot.replace(protoRegex, baseWindowProto);
        }
        return serverRoot;
      }

      // Note: There is an identical function in wgapp/views/view/show.rhtml
      function abs(el) {
        var ret = { top: 0, left: 0 };
        while (el) {
          ret.top += el.offsetTop;
          ret.left += el.offsetLeft;
          el = el.offsetParent;
        }
        return ret;
      }

      // check if target is in container
      function isInContainer(container, target) {
        var i;
        for (i = 0; container[i] !== undefined; i += 1) {
          if (container[i] === target) {
            return true;
          }
        }
        return false;
      }

      // in-place removal of target from container. Returns true if element removed,
      // false if not found
      function removeFromContainer(container, target) {
        var i;
        for (i = 0; container[i] !== undefined; i += 1) {
          if (container[i] === target) {
            container.splice(i, 1);
            return true;
          }
        }
        return false;
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////
      // Viz Loading Helper Functions
      /////////////////////////////////////////////////////////////////////////////////////////////////////////////

      function sortVizs(a, b) {
        var
          viza = tableau.vizs[a]._loadOrder,
          vizb = tableau.vizs[b]._loadOrder;

        if (viza < vizb) {
          return -1;
        } else if (viza === vizb) {
          return 0;
        } else {
          return 1;
        }
      }

      function onCompleteLoading(index) {
        // send the previous LoadFeedback on onLoaded message
        var completedViz = index > -1 ? tableau.vizs[vizsLoadOrder[index]] : null;
        if (completedViz) {
          completedViz._onLoaded();
        }
      }

      // This function will load the next viz ONLY if the index passed in is the index of the latest viz we tried to
      // load. There are two main paths that leads to this function:
      //  1. Message received indicating that a viz has finished loading
      //  2. Timer has expired (in case viz fails to load) and we just want to load the next viz
      // For a single viz, only one of these two will actually make it through to load the next viz. For example if
      // we've already start loading viz B after we finished loading viz A, then, when the timer expired (the one set
      // when we started loading viz A), we simply abort because we already started loading viz B.
      function loadNextViz(lastLoadedIndex) {
        var viz, nextIndex;

        // Abort loading because we already loaded the next viz
        if (lastLoadedIndex !== loadIndex) {
          return;
        }

        nextIndex = loadIndex + 1;

        // load the next viz
        viz = tableau.vizs[vizsLoadOrder[nextIndex]];
        if (viz) {
          loadIndex = nextIndex;
          viz.load();

          if (window.postMessage) {
            // We'll just start loading the next viz if this one takes too long
            // (it might have failed and not send a completion msg to trigger loading the next one)
            // The 3000ms value is somewhat arbitrary. We want to wait long enough to give the viz a chance to load up,
            // but we also don't want the user to wait forever for the viz to finish load.
            setTimeout(
              function () { loadNextViz(loadIndex); },
              3000
            );
          }
        }
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////
      // Event Callbacks
      /////////////////////////////////////////////////////////////////////////////////////////////////////////////

      function checkForDone2() {
        var viz;

        if (isIE) {
          viz = tableau.vizs[vizsLoadOrder[loadIndex]];

          if (viz && viz._iframe.readyState === 'complete') {
            onCompleteLoading(loadIndex);
            loadNextViz(loadIndex);
          }
        } else {
          onCompleteLoading(loadIndex);
          loadNextViz(loadIndex);
        }
      }

      function checkForDone1() {
        setTimeout(checkForDone2, 3000);
      }

      function postLayoutInfo(source) {
        if (!hasPostMessage()) { return; }

        var top, left, width, height, msgArr, docElement;

        docElement = document.documentElement;
        width = typeof (window.innerWidth) !== 'undefined' ? window.innerWidth : docElement.offsetWidth;
        height = typeof (window.innerHeight) !== 'undefined' ? window.innerHeight : docElement.offsetHeight;
        left = typeof (window.pageXOffset) !== 'undefined' ? window.pageXOffset : docElement.scrollLeft;
        top = typeof (window.pageYOffset) !== 'undefined' ? window.pageYOffset : docElement.scrollTop;

        msgArr = ['layoutInfoResp', left, top, width, height];
        source.postMessage(msgArr.join(','), '*');
      }

      function onMessage(e) {
        var
          i,
          viz,
          multipartData,
          messageType,
          completedID,
          completedViz;

        if (!e.data) {
          return;
        }

        multipartData = e.data.split(',');
        messageType = multipartData[0];

        // backwards compatibility requires checking for "completed"
        // for completion messages, multipartData[1] contains loading order id
        if (messageType === "tableau.completed" || messageType === "completed") {
          completedID = parseInt(multipartData[1], 10);

          if (isNaN(completedID)) { // error pages don't have an ID; dismiss all relevant spinners
            for (i = 0; i <= loadIndex; i++) {
              viz = tableau.vizs[vizsLoadOrder[i]];
              if (viz) {
                viz._hideLoadIndicators();
              }
            }
          }
          onCompleteLoading(completedID);
          loadNextViz(completedID);
        } else if (messageType === "tableau.loadIndicatorsLoaded") {
          viz = tableau.vizs[vizsLoadOrder[loadIndex]];
          if (viz) {
            viz._hideLoadIndicators();
          }
        } else if (messageType === 'layoutInfoReq') {
          postLayoutInfo(e.source);
        }
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////
      // Mobile Functions
      /////////////////////////////////////////////////////////////////////////////////////////////////////////////

      function mobileDetect() {
        // Note: user agent sniffing code appears in:
        //   wgapp's views/views/show,
        //   vqlweb's views/viewer/show
        //   the api's viz_v1.js
        var ua = navigator.userAgent;
        if (ua.indexOf('iPad') !== -1) {
          return true;
        }
        if (ua.indexOf('Android') !== -1) {
          return true;
        }
        if ((ua.indexOf('AppleWebKit') !== -1) && (ua.indexOf('Mobile') !== -1)) {
          return true;
        }
        return false;
      }

      // Note: createOuterScaling code also appears in:
      //   wgapp's views/views/show.rhhtml.
      //   the api's viz_v1.js
      function createOuterScaling() {
        var _completed = false;

        function postScaleFactor(source, id) {
          var scrollX, scrollY, sf, msg;
          scrollX = 0;
          scrollY = 0;
          sf = (document.documentElement.clientWidth / window.innerWidth);
          msg = 'sf,' + id + ',' + sf + ',' + scrollX + ',' + scrollY;
          source.postMessage(msg, '*');
        }

        function onMessage(e) {
          var
            argv = e.data.split(','),
            i = 0,
            id;

          while (i < argv.length) {
            if (!_completed &&
                (argv[i] === 'tableau.completed' || argv[i] === 'completed')) {
              _completed = true;
              postScaleFactor(e.source, -1);
            }
            if (argv[i] === 'sf?') {
              id = argv[++i];
              postScaleFactor(e.source, id);
            }
            ++i;
          }
        }

        if (window.addEventListener) {
          window.addEventListener("message", onMessage, false);
        }

        return this;
      }


      /////////////////////////////////////////////////////////////////////////////////////////////////////////////
      // LoadFeedback Class
      // ------------------
      // Contains the logic and data needed to show/hide immediate feedback like spinners, glass panes, etc. The
      // reason why this is separate from the Viz class is because these are implementation details that shouldn't
      // be exposed via the public Viz API and because we don't want to change the public-facing signatures.
      /////////////////////////////////////////////////////////////////////////////////////////////////////////////

      function LoadFeedback(objectElement) {
        this._objectElement = objectElement;
      }

      LoadFeedback.prototype.getRootElement = function () {
        if (this._ensurePlaceholderDiv()) {
          return this._placeholderDiv;
        }
        return null;
      };

      LoadFeedback.prototype.sizeToObjectElement = function (elementToSize) {
        var source = this._objectElement;

        if (isNullOrUndef(source)) {
          return;
        }

        if (source.width) {
          if (parseInt(source.width, 10).toString() === source.width) {
            elementToSize.style.width = source.width + "px";
          } else {
            elementToSize.style.width = source.width;
          }
        }
        if (source.height) {
          if (parseInt(source.height, 10).toString() === source.height) {
            elementToSize.style.height = source.height + "px";
          } else {
            elementToSize.style.height = source.height;
          }
        }
      };

      // IMPORTANT:
      // The following is patterned after java/war-vizql/war/WEB-INF/views/viewer/view_spinner.jsp so
      // these two should stay in sync.  Also wgapp/app/views/shared/_thin_client_viewer.html.erb
      LoadFeedback.prototype.createLoadingFeedback = function (serverRoot, objectParams) {
        var html, placeholderStyle, showTabs, tempDiv, top, spinnerImg, that = this,
          displaySpinner = toBoolean(objectParams.display_spinner, true);

        if (!this._ensurePlaceholderDiv()) {
          return;
        }

        // size the placeholder correctly
        this.sizeToObjectElement(this._placeholderDiv);

        // make the placeholder a positioned element so the child absolutely positioned elements
        // won't overflow the placeholder
        placeholderStyle = this._placeholderDiv.style;
        placeholderStyle.position = "relative";
        placeholderStyle.overflow = "hidden";

        // make the placeholder invisible at first
        placeholderStyle.display = "none";

        html = [
          '<div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; border: 0; padding: 0; margin: 0">'
        ];

        // spinner, always include but we may not show it if displaySpinner is false
        html.push('<div style="top: 20%; left: 0; right: 0; text-align: center; position: absolute; ');
        html.push('       z-index: 991; box-shadow: none;">');
        html.push('<img alt="Initializing..." src="');
        html.push(escapeHTML(serverRoot + 'images/30x30REV.gif') + '"');
        html.push('       style="display:none; border: 0; cursor: default; box-shadow: none;" />');
        html.push('</div>');

        // overlay
        if (toBoolean(objectParams.display_overlay, true)) {
          html.push('<div style=\'position: absolute; top: 0; left: 0; right: 0; bottom: 0; z-index: 990;');
          html.push('            background-color: #CCCCD3;');
          html.push('            -ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=24)";');
          html.push('            filter: alpha(opacity=24); opacity: 0.24;\'></div>');
        }

        // static image
        if (toBoolean(objectParams.display_static_image, true) && !isNullOrEmpty(objectParams.static_image)) {
          showTabs = toBoolean(objectParams.tabs, false);

          // 30px + 1px border for tabs; 8px + 1px border for no tabs
          // There is always an 8px border on dashboards that is not user-configurable
          top = showTabs ? '31px;' : '9px';

          html.push('<div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; ');
          html.push('background: transparent url(\'');
          html.push(escapeHTML(objectParams.static_image));
          html.push('\') no-repeat scroll 0 0; box-shadow: none; left: 8px; top:');
          html.push(top);
          html.push('"></div>');
        }

        html.push('</div>');

        tempDiv = document.createElement("div");
        tempDiv.innerHTML = html.join('');
        this._glassPaneElement = tempDiv.firstChild;
        this._placeholderDiv.appendChild(this._glassPaneElement);
        tempDiv.innerHTML = "";
        tempDiv = null;

        spinnerImg = this._glassPaneElement.firstChild.firstChild;
        // BUG#47542 - conditionally display spinner if it loads, this avoids showing a broken img in error cases
        spinnerImg.onload = function () {
          if (displaySpinner) {
            spinnerImg.style.display = "";
          }
        };
        // if spinner image fails to load then likely the viz will also fail, remove LoadFeedback
        spinnerImg.onerror = function () {
          that.dispose();
        };

        return this._createAndAppendIframe();
      };

      LoadFeedback.prototype.show = function () {
        if (this._placeholderDiv) {
          this._placeholderDiv.style.display = "block";
        }
      };

      LoadFeedback.prototype.dispose = function () {
        if (this._glassPaneElement) {
          this._glassPaneElement.innerHTML = "";
          this._glassPaneElement.parentNode.removeChild(this._glassPaneElement);
          this._glassPaneElement = null;
        }

        if (this._objectElement) {
          // kill the object node, removing all references to it
          removeFromContainer(tableauNodes, this._objectElement);
          this._objectElement.parentNode.removeChild(this._objectElement);
          this._objectElement = null;
        }
      };

      // Ensures that a proper placeholder div has been created. Returns true if successful,
      // false otherwise.
      LoadFeedback.prototype._ensurePlaceholderDiv = function () {
        var div;

        // we don't need to create another placeholder div if one is already created
        if (!isNullOrUndef(this._placeholderDiv)) {
          return true;
        }

        // but we can't create one without the objectElement
        if (isNullOrUndef(this._objectElement)) {
          return false;
        }

        // First see if we're dealing with a new-style placeholder, which has a parent
        // with a specific class name. Some blog software will put more tags in between
        // the <object> and the <div>, though, so be resilient and check all of the parents
        // up to the body.
        div = findParentWithClassName(this._objectElement, "tableauPlaceholder");

        if (!div) {
          // create a placeholder div
          div = document.createElement("div");
          div.className = "tableauPlaceholder";

          // move the placeholder next to the <object> element
          this._objectElement.parentNode.insertBefore(div, this._objectElement);

          // move the <object> tag to be a child of the placeholder div so the rest of the code can
          // deal with them in a standard way
          div.appendChild(this._objectElement);

          // make sure the <object> is hidden - IE sometimes like to show it
          this._objectElement.style.display = "none";
        }

        this._placeholderDiv = div;

        return true;
      };

      LoadFeedback.prototype._createAndAppendIframe = function () {
        var attrs, i, len, ifr, isChrome, isWebKit, isSafari, ua;

        if (isNullOrUndef(this._objectElement)) {
          return;
        }

        attrs = this._objectElement.attributes;

        ifr = document.createElement("iframe");
        ifr.frameBorder = '0';
        ifr.marginHeight = '0';
        ifr.marginWidth = '0';

        ifr.setAttribute('allowTransparency', 'true');

        // copy the attributes from the object to the iframe
        for (i = 0, len = attrs.length; i < len; i++) {
          if (attrs[i].specified) {
            ifr.setAttribute(attrs[i].name, attrs[i].value);
          }
        }

        // IE doesn't seem to carry the style through the 'attributes' collection
        // so set it here manually
        ifr.style.cssText = this._objectElement.style.cssText;

        // reset any box model styles
        ifr.style.margin = '0px';
        ifr.style.padding = '0px';
        ifr.style.border = 'none';

        // size the iframe correctly
        this.sizeToObjectElement(ifr);

        // B89134 add no-op mousewheel handler to iframe so that Safari 6.1.1+ will send mousewheel
        // events to content nested in overflow:hidden containers within the iframe
        ua = navigator.userAgent;
        isWebKit = ua.indexOf("WebKit") >= 0;
        isChrome = ua.indexOf("Chrome") >= 0;
        isSafari = ua.indexOf("Safari") >= 0 || (isWebKit && !isChrome);

        if (isSafari) {
          ifr.addEventListener("mousewheel", function () {});
        }

        // add the iframe as a child of the placeholder div
        if (this._ensurePlaceholderDiv()) {
          this._placeholderDiv.appendChild(ifr);
        }

        return ifr;
      };

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////
      // The following block is part of the public and documented API.
      /////////////////////////////////////////////////////////////////////////////////////////////////////////////

      window.tableau.Viz = function (name, node, opts) {
        this._name       = name;
        this._iframe     = node;
        this._filterArgs = '';
        this._filterOpts = filterFromObjectParams(opts);

        this._serverRoot = calculateServerRootFromObjectParameters(opts);
        this._baseUrl = urlFromObjectParams(this._name, this._serverRoot, opts);

        this._loadOrder = opts['load-order'] ? parseInt(opts['load-order'], 10) : 0;
        this._filter = {};
      };

      // an array which holds the vizs on this page, the array is ordered
      // from top to bottom on the page.
      window.tableau.vizs = [];

      window.tableau.createViz = function (name, refnode, opts) {
        var iframe, loadFeedback, serverRoot, viz;

        serverRoot = calculateServerRootFromObjectParameters(opts);

        // create the spinner, glass pane, etc.
        loadFeedback = new LoadFeedback(refnode);
        iframe = loadFeedback.createLoadingFeedback(serverRoot, opts);
        loadFeedback.show();

        // create the new Viz object
        viz = new tableau.Viz(name, iframe, opts);
        viz._loadFeedback = loadFeedback;
        viz.show();

        vizsLoadOrder.push(this.vizs.length);
        this.vizs.push(viz);
        if (!isNullOrEmpty(name)) {
          this.vizs[name] = viz;
        }

        if (!window.postMessage) {
          // only use these methods if postMessage isn't available
          if (isIE) {
            iframe.onreadystatechange = checkForDone1;
          } else {
            iframe.onload = checkForDone1;
          }
        }
      };

      // load the original viz as it was defined in the object
      window.tableau.Viz.prototype.load = function () {
        var loadOrderOpt = "&:loadOrderID=" + loadIndex,
          recordViewOpt = (window.top === window.self) ? "" : "&:increment_view_count=no";
        this._iframe.src = this._baseUrl + this._filterOpts + loadOrderOpt + recordViewOpt;
      };

      window.tableau.Viz.prototype.show = function () {
        this._iframe.style.display = 'block';
      };

      window.tableau.Viz.prototype.hide = function () {
        this._iframe.style.display = 'none';
      };

      window.tableau.Viz.prototype.refresh = function () {
        this._iframe.src = this._baseUrl + this._filterOpts + this._filterArgs + '&:refresh=true';
      };

      // load the viz without any filters at all
      window.tableau.Viz.prototype.revert = function () {
        this._iframe.src = this._baseUrl + '&:revert=all';
        this._filterArgs = '';
        this._filter = {};
      };

      window.tableau.Viz.prototype.filter = function (filt) {
        var p;

        if (isNullOrUndef(filt)) {
          this.revert();
          return;
        }

        for (p in filt) {
          this._filter[p] = filt[p];
        }

        this._filterArgs = '';
        for (p in filt) {
          this._filterArgs += "&" + encodeURIComponent(p) + "=";

          if (typeof filt[p] === "string") {
            this._filterArgs += encodeURIComponent(filt[p]);
          } else {
            this._filterArgs += encodeURIComponent(filt[p].join(','));
          }
        }

        this._iframe.src = this._baseUrl + this._filterOpts + this._filterArgs;
      };

      window.tableau.Viz.prototype._sendVizOffset = function () {
        if (!hasPostMessage() || !this._iframe || !this._iframe.contentWindow) {
          return;
        }

        var pos = abs(this._iframe), params;
        params = ['vizOffsetResp', pos.left, pos.top];
        this._iframe.contentWindow.postMessage(params.join(','), '*');
      };

      window.tableau.Viz.prototype._onLoaded = function () {
        this._hideLoadIndicators();
        this._sendVizOffset();
      };

      window.tableau.Viz.prototype._hideLoadIndicators = function () {
        if (this._loadFeedback) {
          this._loadFeedback.dispose();
          this._loadFeedback = null;
          delete this._loadFeedback;
        }
      };

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////
      // END - public API
      /////////////////////////////////////////////////////////////////////////////////////////////////////////////

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////
      // Initialization Functions
      /////////////////////////////////////////////////////////////////////////////////////////////////////////////

      // Get the tableau object elements that were not loaded and are not queued to be loaded
      function getNewTableauObjectElements() {
        var
          i, len,
          node, nodes = document.getElementsByTagName("object"),
          newTableauNodes = [];


        // find all of the Tableau-specific <object> tags
        for (i = 0, len = nodes.length; i < len; i++) {
          node = nodes[i];
          if (hasClass(node, "tableauViz") && !isInContainer(tableauNodes, node)) {
            tableauNodes.push(node);
            newTableauNodes.push(node);
          }
        }

        return newTableauNodes;
      }

      // At the very top of this file you can see that we're caching the serverRoot for each <script> element.
      // Since we store them in the same order in which they're executed, we should have a 1x1 mapping between
      // the vizes and the <script> elements. Adds the "serverRoot" property to the "params" object contained in
      // each element in the vizes array.
      function associateVizesWithServerRoots(vizes) {
        var
          i, len,
          serverRoots = window.tableau._apiScripts;

        // Hmmm... we have a problem. I guess the best thing to do is to continue on our merry
        // way and hope that the <object> tag has a host_url parameter. Otherwise, the viz won't load.
        // if (vizes.length !== serverRoots.length) {
        // }

        for (i = 0, len = Math.min(vizes.length, serverRoots.length); i < len; i++) {
          vizes[i].params.serverRoot = serverRoots[i];
        }
      }

      // "Old-style" placeholder divs were meant to provide explicit size before this
      // script would run. However, they proved to be more harmful than good since in
      // RSS readers there would be a big white gap where the placholder would be and
      // then the <noscript> element after that. We don't need them anymore, so just
      // get rid of them.
      function removeOldStylePlaceholderDivs() {
        var div = document.getElementById("tableau_hide_this");
        while (div) {
          div.parentNode.removeChild(div);
          div = document.getElementById("tableau_hide_this");
        }
      }

      // Grab any new vizs on the page and queue them up to load. This function needs to be idempotent.
      // i.e. Given a set of Tableau <object> tags in the DOM, only the first call to
      // this function should have side effects. All subsequent calls with the same set of Tableau <object>
      // tags in the DOM must have no side effects. If there are new Tableau <object> tags in the DOM,
      // side effects will again happen on the next call, but not on subsequent calls
      function createNewVizesAndStartLoading() {
        var
          i, len,
          objectElement, objectElements,
          params,
          viewName,
          vizInfos = [];

        objectElements = getNewTableauObjectElements();
        if (objectElements.length === 0) {
          return;
        }

        removeOldStylePlaceholderDivs();

        // find all object tags in the document and collect their associated information
        for (i = 0, len = objectElements.length; i < len; i++) {

          objectElement = objectElements[i];
          params = {
            filter: [],
            ticket: '',
            path: ''
          };
          viewName = getObjectElementParams(objectElement, params);

          params.width = parseInt(tableauGCS(objectElement, null).width, 10);
          if (isNaN(params.width)) {
            delete params.width;
          }
          params.height = parseInt(tableauGCS(objectElement, null).height, 10);
          if (isNaN(params.height)) {
            delete params.height;
          }

          vizInfos.push({name: viewName, objectElement: objectElement, params: params});
        }

        // assign server roots in case the embed code does not have a "host_url" param (it should)
        associateVizesWithServerRoots(vizInfos);

        // for each object tag, instantiate a viz object
        for (i = 0, len = vizInfos.length; i < len; i++) {
          tableau.createViz(vizInfos[i].name, vizInfos[i].objectElement, vizInfos[i].params);
        }

        // load'em up!
        vizsLoadOrder.sort(sortVizs);
        loadNextViz(loadIndex);
      }

       // Mozilla, Opera and webkit nightlies currently support this event
      if (document.addEventListener) {
        // Use the handy event callback
        document.addEventListener("DOMContentLoaded", createNewVizesAndStartLoading, false);
        document.addEventListener("message", onMessage, false);

        // A fallback to window.onload, that will always work
        window.addEventListener("load", createNewVizesAndStartLoading, false);
        window.addEventListener("message", onMessage, false);

      // If IE event model is used
      } else if (document.attachEvent) {
        // ensure firing before onload,
        // maybe late but safe also for iframes
        document.attachEvent("onreadystatechange", createNewVizesAndStartLoading);
        document.attachEvent("onmessage", onMessage);

        // A fallback to window.onload, that will always work
        window.attachEvent("onload", createNewVizesAndStartLoading);
        window.attachEvent("onmessage", onMessage);
      } else { //Hail Mary
        window.onload = createNewVizesAndStartLoading;
        window.onmessage = onMessage;
      }

      // if we're mobile or simulating mobile, create the scaling code
      if (mobileDetect() || shouldSimulateMobile) {
        createOuterScaling();
      }

      // expose the viz creation function so we can kick it later
      tableau._createNewVizesAndStartLoading = createNewVizesAndStartLoading;
    }());
  }

  // if this script is executed after the browser 'load' event fired,
  // then get cracking now. Queue up any vizs that have yet to be loaded
  if (document.readyState === 'complete') {
    tableau._createNewVizesAndStartLoading();
  }

}());
