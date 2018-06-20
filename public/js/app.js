(function() {
  'use strict';

  var globals = typeof global === 'undefined' ? self : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = {}.hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    return aliases[name] ? expandAlias(aliases[name]) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (bundle && typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = typeof window === 'undefined' ? this : window;
var process;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("api.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var ProjectsAPI = {
    projects: [{
        "org": { // First Project in list
            "name": "Organization 1", // Organization Name
            "desc": "Donec maximus dolor sed leo faucibus, at tincidunt odio ornare. Vestibulum ac congue elit." // Organization Description
        },
        "number": 1,
        "name": "Project 1", // Project Name
        "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ", // Project Description
        "tasks": [{ // List of tasks
            "number": 1,
            "name": "Task 1", // First Task Name
            "desc": "Cras cursus sit amet ante ut laoreet." // Task Description
        }, {
            "number": 2,
            "name": "Task 2", // Second task Name
            "desc": "Fusce sed commodo erat." // Second task decription
        }]
    }, {
        "org": { // Second Project
            "name": "Organization 2",
            "desc": " Curabitur vitae venenatis libero, ac tincidunt sapien."
        },
        "number": 2,
        "name": "Project 2",
        "desc": "Maecenas faucibus, neque quis eleifend luctus",
        "tasks": [{
            "number": 1,
            "name": "Task 1",
            "desc": "Praesent rutrum aliquam suscipit."
        }, {
            "number": 2,
            "name": "Task 2",
            "desc": "Curabitur egestas massa in risus scelerisque consectetur."
        }]
    }],
    all: function all() {
        return this.projects;
    }
};

exports.default = ProjectsAPI;
});

;require.register("components/App.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _header = require('./header');

var _header2 = _interopRequireDefault(_header);

var _main = require('./main');

var _main2 = _interopRequireDefault(_main);

var _footer = require('./footer');

var _footer2 = _interopRequireDefault(_footer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var App = function App() {
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(_header2.default, null),
    _react2.default.createElement(_main2.default, null),
    _react2.default.createElement(_footer2.default, null)
  );
};

exports.default = App;
});

;require.register("components/footer.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Footer = function Footer() {
  return _react2.default.createElement(
    'footer',
    { className: 'footer pt-100 is-white', style: { marginTop: 2 + 'em' } },
    _react2.default.createElement(
      'div',
      { className: 'container' },
      _react2.default.createElement(
        'div',
        { className: 'content has-text-centered' },
        _react2.default.createElement(
          'p',
          null,
          _react2.default.createElement(
            'strong',
            null,
            'Chain Reaction'
          ),
          ', a Skilled Volunteerism Colony for ',
          _react2.default.createElement(
            'a',
            { href: 'https://colony.io/hackathon/' },
            'ColonyJS Hackathon'
          )
        )
      )
    )
  );
};

exports.default = Footer;
});

;require.register("components/header.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Header = function Header() {
  return _react2.default.createElement(
    'header',
    { style: { marginBottom: 2 + 'em' } },
    _react2.default.createElement(
      'section',
      { className: 'column is-desktop' },
      _react2.default.createElement(
        'nav',
        { className: 'navbar is-white is-fixed-top', role: 'navigation', 'aria-label': 'main navigation' },
        _react2.default.createElement(
          'div',
          { className: 'container is-desktop' },
          _react2.default.createElement(
            'div',
            { className: 'navbar-brand' },
            _react2.default.createElement(
              'a',
              { className: 'navbar-item' },
              _react2.default.createElement('img', { src: 'img/chainrxn_logo.png', width: '112', height: '28', alt: 'Logo' })
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'navbar-menu' },
            _react2.default.createElement(
              'div',
              { className: 'navbar-end' },
              _react2.default.createElement(
                'div',
                { className: 'navbar-item' },
                _react2.default.createElement(
                  _reactRouterDom.Link,
                  { to: '/' },
                  'Home'
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'navbar-item' },
                _react2.default.createElement(
                  _reactRouterDom.Link,
                  { to: '/projects' },
                  'Explore Projects'
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'navbar-item' },
                _react2.default.createElement(
                  _reactRouterDom.Link,
                  { to: '/organization' },
                  'Organization'
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'navbar-item' },
                _react2.default.createElement(
                  _reactRouterDom.Link,
                  { to: '/profile' },
                  'Profile'
                )
              )
            )
          )
        )
      )
    ),
    _react2.default.createElement(
      'section',
      null,
      _react2.default.createElement(
        'div',
        { className: 'hero is-info' },
        _react2.default.createElement(
          'div',
          { className: 'hero-body is-desktop' },
          _react2.default.createElement(
            'div',
            { className: 'container' },
            _react2.default.createElement(
              'h1',
              { className: 'title' },
              'Chain Reaction'
            )
          )
        )
      )
    )
  );
};

exports.default = Header;
});

;require.register("components/home.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Home = function Home() {
    return _react2.default.createElement(
        "section",
        { className: "pt-60 pb-60" },
        _react2.default.createElement(
            "div",
            { className: "container" },
            _react2.default.createElement(
                "div",
                { className: "content has-text-centered" },
                _react2.default.createElement(
                    "h1",
                    null,
                    "Proof of Concept"
                ),
                _react2.default.createElement(
                    "p",
                    null,
                    _react2.default.createElement(
                        "b",
                        null,
                        "Chain Reaction"
                    ),
                    " is a skilled volunteerism distributed autonomous organisation (DAO)"
                ),
                _react2.default.createElement(
                    "p",
                    null,
                    "Built on ",
                    _react2.default.createElement(
                        "b",
                        null,
                        "ColonyJS"
                    ),
                    " and the ",
                    _react2.default.createElement(
                        "b",
                        null,
                        "Colony Network"
                    )
                )
            )
        )
    );
};

exports.default = Home;
});

;require.register("components/main.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _home = require('./home');

var _home2 = _interopRequireDefault(_home);

var _projects = require('./projects');

var _projects2 = _interopRequireDefault(_projects);

var _organization = require('./organization');

var _organization2 = _interopRequireDefault(_organization);

var _profile = require('./profile');

var _profile2 = _interopRequireDefault(_profile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Main = function Main() {
  return _react2.default.createElement(
    'main',
    null,
    _react2.default.createElement(
      _reactRouterDom.Switch,
      null,
      _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/', component: _home2.default }),
      _react2.default.createElement(_reactRouterDom.Route, { path: '/projects', component: _projects2.default }),
      _react2.default.createElement(_reactRouterDom.Route, { path: '/organization', component: _organization2.default }),
      _react2.default.createElement(_reactRouterDom.Route, { path: '/profile', component: _profile2.default })
    )
  );
};

exports.default = Main;
});

;require.register("components/organization.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require("babel-core/register");
require("babel-polyfill");

var MyComponent = function (_React$Component) {
  _inherits(MyComponent, _React$Component);

  function MyComponent(props) {
    _classCallCheck(this, MyComponent);

    var _this = _possibleConstructorReturn(this, (MyComponent.__proto__ || Object.getPrototypeOf(MyComponent)).call(this, props));

    _this.state = {
      meta: null,
      colony_1: null,
      colony_2: null
    };
    return _this;
  }

  _createClass(MyComponent, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.fetchColony();
    }
  }, {
    key: "fetchColony",
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _require, providers, Wallet, _require2, EthersAdapter, _require3, TrufflepigLoader, _require4, ColonyNetworkClient, loader, provider, _ref2, privateKey, wallet, adapter, networkClient, metaColonyClient, metaColonyAddress, setState, colonyClient, colonyAddress, colonyClient_2, colonyAddress_2;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                // Import the prerequisites
                _require = require('ethers'), providers = _require.providers, Wallet = _require.Wallet;
                _require2 = require('@colony/colony-js-adapter-ethers'), EthersAdapter = _require2.default;
                _require3 = require('@colony/colony-js-contract-loader-http'), TrufflepigLoader = _require3.TrufflepigLoader;
                // Import the ColonyNetworkClient

                _require4 = require('@colony/colony-js-client'), ColonyNetworkClient = _require4.default;
                // Create an instance of the Trufflepig contract loader

                loader = new TrufflepigLoader();
                // Create a provider for local TestRPC (Ganache)

                provider = new providers.JsonRpcProvider('http://localhost:8545/');
                // Get the private key from the first account from the ganache-accounts
                // through trufflepig

                _context.next = 8;
                return loader.getAccount(0);

              case 8:
                _ref2 = _context.sent;
                privateKey = _ref2.privateKey;


                // Create a wallet with the private key (so we have a balance we can use)
                wallet = new Wallet(privateKey, provider);

                // Create an adapter (powered by ethers)

                adapter = new EthersAdapter({
                  loader: loader,
                  provider: provider,
                  wallet: wallet
                });

                // Connect to ColonyNetwork with the adapter!

                networkClient = new ColonyNetworkClient({ adapter: adapter });
                _context.next = 15;
                return networkClient.init();

              case 15:
                _context.next = 17;
                return networkClient.getMetaColonyClient();

              case 17:
                metaColonyClient = _context.sent;
                metaColonyAddress = metaColonyClient.contract.address;

                console.log('Meta Colony address: ' + metaColonyClient.contract.address);
                setState = this.setState.bind(this);

                setState({ meta: metaColonyAddress });

                _context.next = 24;
                return networkClient.getColonyClient(2);

              case 24:
                colonyClient = _context.sent;
                colonyAddress = colonyClient.contract.address;

                setState({ colony_1: colonyAddress });

                _context.next = 29;
                return networkClient.getColonyClient(3);

              case 29:
                colonyClient_2 = _context.sent;
                colonyAddress_2 = colonyClient_2.contract.address;

                setState({ colony_2: colonyAddress_2 });

              case 32:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function fetchColony() {
        return _ref.apply(this, arguments);
      }

      return fetchColony;
    }()
  }, {
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        { className: "container has-text-centered" },
        _react2.default.createElement(
          "h1",
          { className: "title" },
          "Colony Information"
        ),
        _react2.default.createElement(
          "div",
          { className: "content has-text-centered" },
          _react2.default.createElement(
            "h2",
            { className: "subtitle" },
            "Meta Colony"
          ),
          _react2.default.createElement(
            "p",
            null,
            "Meta Colony Address: ",
            this.state.data === null ? _react2.default.createElement(
              "code",
              null,
              "Loading..."
            ) : _react2.default.createElement(
              "code",
              null,
              this.state.meta
            )
          ),
          _react2.default.createElement(
            "h2",
            { className: "subtitle" },
            "Colonies"
          ),
          _react2.default.createElement(
            "p",
            null,
            "Colony 1 Address: ",
            this.state.colony === null ? _react2.default.createElement(
              "code",
              null,
              "Loading..."
            ) : _react2.default.createElement(
              "code",
              null,
              this.state.colony_1
            )
          ),
          _react2.default.createElement(
            "p",
            null,
            "Colony 2 Address: ",
            this.state.colony === null ? _react2.default.createElement(
              "code",
              null,
              "Loading..."
            ) : _react2.default.createElement(
              "code",
              null,
              this.state.colony_2
            )
          )
        )
      );
    }
  }]);

  return MyComponent;
}(_react2.default.Component);

exports.default = MyComponent;
});

;require.register("components/profile.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require("babel-core/register");
require("babel-polyfill");

var MyComponent = function (_React$Component) {
  _inherits(MyComponent, _React$Component);

  function MyComponent(props) {
    _classCallCheck(this, MyComponent);

    var _this = _possibleConstructorReturn(this, (MyComponent.__proto__ || Object.getPrototypeOf(MyComponent)).call(this, props));

    _this.state = {
      token: null,
      colony_id: null,
      colony_add: null
    };
    return _this;
  }

  _createClass(MyComponent, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.fetchColony();
    }
  }, {
    key: "fetchColony",
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _require, providers, Wallet, _require2, EthersAdapter, _require3, TrufflepigLoader, _require4, ColonyNetworkClient, loader, provider, _ref2, privateKey, wallet, adapter, networkClient, tokenAddress, _ref3, _ref3$eventData, colonyId, colonyAddress, setState;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                // Import the prerequisites
                _require = require('ethers'), providers = _require.providers, Wallet = _require.Wallet;
                _require2 = require('@colony/colony-js-adapter-ethers'), EthersAdapter = _require2.default;
                _require3 = require('@colony/colony-js-contract-loader-http'), TrufflepigLoader = _require3.TrufflepigLoader;
                // Import the ColonyNetworkClient

                _require4 = require('@colony/colony-js-client'), ColonyNetworkClient = _require4.default;
                // Create an instance of the Trufflepig contract loader

                loader = new TrufflepigLoader();
                // Create a provider for local TestRPC (Ganache)

                provider = new providers.JsonRpcProvider('http://localhost:8545/');
                // Get the private key from the first account from the ganache-accounts
                // through trufflepig

                _context.next = 8;
                return loader.getAccount(0);

              case 8:
                _ref2 = _context.sent;
                privateKey = _ref2.privateKey;


                // Create a wallet with the private key (so we have a balance we can use)
                wallet = new Wallet(privateKey, provider);

                // Create an adapter (powered by ethers)

                adapter = new EthersAdapter({
                  loader: loader,
                  provider: provider,
                  wallet: wallet
                });

                // Connect to ColonyNetwork with the adapter!

                networkClient = new ColonyNetworkClient({ adapter: adapter });
                _context.next = 15;
                return networkClient.init();

              case 15:
                _context.next = 17;
                return networkClient.createToken({
                  name: 'Cool Colony Token',
                  symbol: 'COLNY'
                });

              case 17:
                tokenAddress = _context.sent;

                console.log('Token address: ' + tokenAddress);

                // Create a cool Colony!
                _context.next = 21;
                return networkClient.createColony.send({ tokenAddress: tokenAddress });

              case 21:
                _ref3 = _context.sent;
                _ref3$eventData = _ref3.eventData;
                colonyId = _ref3$eventData.colonyId;
                colonyAddress = _ref3$eventData.colonyAddress;


                // Congrats, you've created a Colony!
                console.log('Colony ID: ' + colonyId);
                console.log('Colony address: ' + colonyAddress);

                setState = this.setState.bind(this);

                setState({ token: tokenAddress });
                setState({ colony_id: colonyId });
                setState({ colony_add: colonyAddress });

              case 31:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function fetchColony() {
        return _ref.apply(this, arguments);
      }

      return fetchColony;
    }()
  }, {
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        { className: "container has-text-centered" },
        _react2.default.createElement(
          "h1",
          { className: "title" },
          "Profile Information"
        ),
        _react2.default.createElement(
          "section",
          { className: "pt-60 pb-60" },
          _react2.default.createElement(
            "div",
            { className: "container" },
            _react2.default.createElement(
              "div",
              { className: "content" },
              _react2.default.createElement(
                "p",
                null,
                "Profile Page"
              ),
              _react2.default.createElement(
                "p",
                null,
                "Personal Token Address: ",
                this.state.token === null ? _react2.default.createElement(
                  "code",
                  null,
                  "Loading..."
                ) : _react2.default.createElement(
                  "code",
                  null,
                  this.state.token
                )
              ),
              _react2.default.createElement(
                "p",
                null,
                "Personal Colony ID: ",
                this.state.colony_id === null ? _react2.default.createElement(
                  "code",
                  null,
                  "Loading..."
                ) : _react2.default.createElement(
                  "code",
                  null,
                  this.state.colony_id
                )
              ),
              _react2.default.createElement(
                "p",
                null,
                "Personal Colony Address: ",
                this.state.colony_add === null ? _react2.default.createElement(
                  "code",
                  null,
                  "Loading..."
                ) : _react2.default.createElement(
                  "code",
                  null,
                  this.state.colony_add
                )
              )
            )
          )
        )
      );
    }
  }]);

  return MyComponent;
}(_react2.default.Component);

exports.default = MyComponent;
});

;require.register("components/projects.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _api = require('../api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Projects = function Projects() {
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'section',
      { className: 'pt-20 pb-20 has-background-white-ter' },
      _react2.default.createElement(
        'div',
        { className: 'container' },
        _react2.default.createElement('input', { className: 'input', type: 'text', placeholder: 'Text input' })
      )
    ),
    _react2.default.createElement(
      'section',
      { className: 'has-background-white-ter pb-40 h100' },
      _react2.default.createElement(
        'div',
        { className: 'container' },
        _api2.default.all().map(function (project) {
          return _react2.default.createElement(
            'div',
            { className: 'card', key: project.number },
            _react2.default.createElement(
              'div',
              { className: 'card-header card-content' },
              _react2.default.createElement(
                'div',
                { className: 'media' },
                _react2.default.createElement(
                  'div',
                  { className: 'media-left' },
                  _react2.default.createElement(
                    'figure',
                    { className: 'image is-48x48' },
                    _react2.default.createElement('img', { className: 'avatar-small', src: 'https://bulma.io/images/placeholders/96x96.png', alt: 'Placeholder image' })
                  )
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'media-content' },
                _react2.default.createElement(
                  'p',
                  { className: 'title is-6' },
                  project.org.name
                ),
                _react2.default.createElement(
                  'p',
                  { className: 'subtitle is-6' },
                  project.org.desc
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'time' },
                project.timeadded
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'card-content' },
              project.name,
              project.desc
            ),
            project.tasks.map(function (task) {
              return _react2.default.createElement(
                'div',
                { className: 'card-content', key: task.number },
                _react2.default.createElement(
                  'div',
                  { className: 'columns tasks' },
                  _react2.default.createElement(
                    'div',
                    { className: 'column is-one-third' },
                    _react2.default.createElement(
                      'div',
                      { className: 'name title is-6' },
                      task.name
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'description subtitle is-6' },
                      task.desc
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'column' },
                    _react2.default.createElement(
                      'a',
                      { className: 'button is-info is-outlined', href: '#' },
                      'Apply now'
                    )
                  )
                )
              );
            })
          );
        })
      )
    )
  );
};

exports.default = Projects;
});

;require.register("initialize.js", function(exports, require, module) {
"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactRouterDom = require("react-router-dom");

var _App = require("./components/App");

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require("babel-core/register");
require("babel-polyfill");

(0, _reactDom.render)(_react2.default.createElement(
  _reactRouterDom.BrowserRouter,
  null,
  _react2.default.createElement(_App2.default, null)
), document.getElementById('app'));
});

require.alias("node-browser-modules/node_modules/assert/assert.js", "assert");
require.alias("node-browser-modules/node_modules/buffer/index.js", "buffer");
require.alias("process/browser.js", "process");process = require('process');require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');


//# sourceMappingURL=app.js.map