(function(window, document, undefined) {
    var trim = function(str)
    {
        return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g,'');
    };

    var hasClass = function(el, cn)
    {
        return (' ' + el.className + ' ').indexOf(' ' + cn + ' ') !== -1;
    };

    var addClass = function(el, cn)
    {
        if (!hasClass(el, cn)) {
            el.className = (el.className === '') ? cn : el.className + ' ' + cn;
        }
    };

    var removeClass = function(el, cn)
    {
        el.className = trim((' ' + el.className + ' ').replace(' ' + cn + ' ', ' '));
    };


    var hasParent = function(el, id)
    {
        if (el) {
            do {
                if (el.id === id) {
                    return true;
                }
                if (el.nodeType === 9) {
                    break;
                }
            }
            while((el = el.parentNode));
        }
        return false;
    };

    var addSelected = function(matchClass) {
        var elems = document.getElementsByTagName('*'), i;
        for (i in elems) {
            if((' ' + elems[i].className + ' ').indexOf(' ' + matchClass + ' ') > -1)
            {
                elems[i].innerHTML = elems[i].innerHTML + " <i>selected</i>";
            }
        }
    }

    var doc = document.documentElement;

    var transform_prop = window.Modernizr.prefixed('transform'),
        transition_prop = window.Modernizr.prefixed('transition'),
        transition_end = (function() {
            var props = {
                'WebkitTransition' : 'webkitTransitionEnd',
        'MozTransition'    : 'transitionend',
        'OTransition'      : 'oTransitionEnd otransitionend',
        'msTransition'     : 'MSTransitionEnd',
        'transition'       : 'transitionend'
            };
            return props.hasOwnProperty(transition_prop) ? props[transition_prop] : false;
        })();

    window.App = (function()
    {

        var _init = false, app = { };

        var nav_holder = document.getElementById('nav-holder'),
            login_holder = document.getElementById('login-holder'),
            nav_open = false,
            nav_class = 'js-nav',
            login_class = 'js-login';
        var config = {
            'nav-open-btn': {
                open: false,
                class_name: 'js-nav',
                holder: document.getElementById('nav-holder')
            },
            'login-open-btn': {
                open: false,
                class_name: 'js-login',
                holder: document.getElementById('login-holder')
            }
        };

    app.init = function()
    {
        if (_init) {
            return;
        }
        _init = true;
        addSelected('selected');
        var closeNavEnd = function(e)
        {
            if (e && e.target === config['nav-open-btn'].holder || e.target === config['login-open-btn'].holder) {
                document.removeEventListener(transition_end, closeNavEnd, false);
            }
            config['nav-open-btn'].open = config['login-open-btn'].open = false
            nav_open = false;
        };

    app.closeNav =function(e)
    {
        var data = (config['nav-open-btn'].open) ? config['nav-open-btn'] : config['login-open-btn']; 
        var open = data.open;
        var class_name = data.class_name;
        holder = data.holder
        if (open) {
            // close navigation after transition or immediately
            var duration = (transition_end && transition_prop) ? parseFloat(window.getComputedStyle(holder, '')[transition_prop + 'Duration']) : 0;             
            if (duration > 0) {
                document.addEventListener(transition_end, closeNavEnd, false);
            } else {
                closeNavEnd(null);
            }
        }
        removeClass(doc, class_name);
    };

    app.openNav = function(e)
    {
        var class_name = config[e.target.parentElement.id].class_name;
        if (config[e.target.parentElement.id].open) {
            return;
        }
        addClass(doc, class_name);
        config[e.target.parentElement.id].open = true;
    };

    app.toggleNav = function(e)
    { 
        if (config['nav-open-btn'].open || config['login-open-btn'].open && hasClass(doc, 'js-nav') || hasClass(doc, 'js-login')) {
            app.closeNav(e);
        } else {
            app.openNav(e);
        }
        if (e) {
            e.preventDefault();
        }
    };

    // open nav with main "nav" button
    document.getElementById('login-open-btn').addEventListener('click', app.toggleNav, false);
    document.getElementById('nav-open-btn').addEventListener('click', app.toggleNav, false);

    // close nav with main "close" button
    document.getElementById('login-close-btn').addEventListener('click', app.toggleNav, false);
    document.getElementById('nav-close-btn').addEventListener('click', app.toggleNav, false);

    // close nav by touching the partial off-screen content
    document.addEventListener('click', function(e)
            { 
                if ((config['nav-open-btn'].open || config['login-open-btn'].open) && !hasParent(e.target, 'nav-holder') && !hasParent(e.target, 'login-holder')) {
                    e.preventDefault();
                    app.closeNav();
                }
            },
            true);

    addClass(doc, 'app-ready');

    };

    return app;

    })();

    if (window.addEventListener) {
        window.addEventListener('DOMContentLoaded', window.App.init, false);
    }
})(window, window.document);
