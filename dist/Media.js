"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createMedia = createMedia;

var _react = _interopRequireDefault(require("react"));

var _DynamicResponsive = require("./DynamicResponsive");

var _MediaQueries = require("./MediaQueries");

var _Utils = require("./Utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? Object(arguments[i]) : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys.push.apply(ownKeys, Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * This is used to generate a Media component, its context provider, and CSS
 * rules based on your application’s breakpoints and interactions.
 *
 * Note that the interaction queries are entirely up to you to define and they
 * should be written in such a way that they match when you want the element to
 * be hidden.
 *
 * @example
 *
   ```tsx
   const MyAppMedia = createMedia({
     breakpoints: {
       xs: 0,
       sm: 768,
       md: 900
       lg: 1024,
       xl: 1192,
     },
     interactions: {
       hover: `not all and (hover:hover)`
     },
   })

   export const Media = MyAppMedia.Media
   export const MediaContextProvider = MyAppMedia.MediaContextProvider
   export const createMediaStyle = MyAppMedia.createMediaStyle
   ```
 *
 */
function createMedia(config) {
  var _class, _temp;

  var breakpoints = (0, _Utils.castBreakpointsToIntegers)(config.breakpoints);
  var mediaQueries = new _MediaQueries.MediaQueries(breakpoints, config.interactions || {});
  var DynamicResponsive = (0, _DynamicResponsive.createResponsiveComponents)();

  var MediaContext = _react.default.createContext({});

  MediaContext.displayName = "Media.Context";

  var MediaParentContext = _react.default.createContext({
    hasParentMedia: false,
    breakpointProps: {}
  });

  MediaContext.displayName = "MediaParent.Context";
  var getMediaContextValue = (0, _Utils.memoize)(function (onlyMatch) {
    return {
      onlyMatch: onlyMatch
    };
  });

  var MediaContextProvider = function MediaContextProvider(_ref) {
    var disableDynamicMediaQueries = _ref.disableDynamicMediaQueries,
        onlyMatch = _ref.onlyMatch,
        children = _ref.children;
    return _react.default.createElement(DynamicResponsive.Provider, {
      mediaQueries: mediaQueries.dynamicResponsiveMediaQueries,
      initialMatchingMediaQueries: (0, _Utils.intersection)(mediaQueries.mediaQueryTypes, onlyMatch)
    }, _react.default.createElement(DynamicResponsive.Consumer, null, function (matches) {
      var matchingMediaQueries = Object.keys(matches).filter(function (key) {
        return matches[key];
      });
      var MediaContextValue = disableDynamicMediaQueries ? getMediaContextValue(onlyMatch) : getMediaContextValue((0, _Utils.intersection)(matchingMediaQueries, onlyMatch));
      return _react.default.createElement(MediaContext.Provider, {
        value: MediaContextValue
      }, children);
    }));
  };

  var Media = (_temp = _class = /*#__PURE__*/function (_React$Component) {
    _inherits(Media, _React$Component);

    function Media(props) {
      var _this;

      _classCallCheck(this, Media);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Media).call(this, props));

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getMediaParentContextValue", (0, _Utils.memoize)(function (breakpointProps) {
        return {
          hasParentMedia: true,
          breakpointProps: breakpointProps
        };
      }));

      validateProps(props);
      return _this;
    }

    _createClass(Media, [{
      key: "render",
      value: function render() {
        var _this2 = this;

        var props = this.props;

        var children = props.children,
            passedClassName = props.className,
            style = props.style,
            interaction = props.interaction,
            breakpointProps = _objectWithoutProperties(props, ["children", "className", "style", "interaction"]);

        var mediaParentContextValue = this.getMediaParentContextValue(breakpointProps);
        return _react.default.createElement(MediaParentContext.Consumer, null, function (mediaParentContext) {
          return _react.default.createElement(MediaParentContext.Provider, {
            value: mediaParentContextValue
          }, _react.default.createElement(MediaContext.Consumer, null, function () {
            var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
                onlyMatch = _ref2.onlyMatch;

            var className;

            if (props.interaction) {
              className = (0, _Utils.createClassName)("interaction", props.interaction);
            } else {
              if (props.at) {
                var largestBreakpoint = mediaQueries.breakpoints.largestBreakpoint;

                if (props.at === largestBreakpoint) {
                  // TODO: We should look into making React’s __DEV__ available
                  //       and have webpack completely compile these away.
                  var ownerName = null;

                  try {
                    var owner = _this2._reactInternalFiber._debugOwner.type;
                    ownerName = owner.displayName || owner.name;
                  } catch (err) {// no-op
                  }

                  console.warn("[@artsy/fresnel] " + "`at` is being used with the largest breakpoint. " + "Consider using `<Media greaterThanOrEqual=" + "\"".concat(largestBreakpoint, "\">` to account for future ") + "breakpoint definitions outside of this range.".concat(ownerName ? " It is being used in the ".concat(ownerName, " component.") : ""));
                }
              }

              var type = (0, _Utils.propKey)(breakpointProps);
              var breakpoint = breakpointProps[type];
              className = (0, _Utils.createClassName)(type, breakpoint);
            }

            var doesMatchParent = !mediaParentContext.hasParentMedia || (0, _Utils.intersection)(mediaQueries.breakpoints.toVisibleAtBreakpointSet(mediaParentContext.breakpointProps), mediaQueries.breakpoints.toVisibleAtBreakpointSet(breakpointProps)).length > 0;
            var renderChildren = doesMatchParent && (onlyMatch === undefined || mediaQueries.shouldRenderMediaQuery(_objectSpread({}, breakpointProps, {
              interaction: interaction
            }), onlyMatch));

            if (props.children instanceof Function) {
              return props.children(className, renderChildren);
            } else {
              return _react.default.createElement("div", {
                className: "fresnel-container ".concat(className, " ").concat(passedClassName),
                style: style,
                suppressHydrationWarning: !renderChildren
              }, renderChildren ? props.children : null);
            }
          }));
        });
      }
    }]);

    return Media;
  }(_react.default.Component), _defineProperty(_class, "defaultProps", {
    className: "",
    style: {}
  }), _defineProperty(_class, "contextType", MediaParentContext), _temp);
  return {
    Media: Media,
    MediaContextProvider: MediaContextProvider,
    createMediaStyle: mediaQueries.toStyle,
    SortedBreakpoints: _toConsumableArray(mediaQueries.breakpoints.sortedBreakpoints),
    findBreakpointAtWidth: mediaQueries.breakpoints.findBreakpointAtWidth,
    findBreakpointsForWidths: mediaQueries.breakpoints.findBreakpointsForWidths,
    valuesWithBreakpointProps: mediaQueries.breakpoints.valuesWithBreakpointProps
  };
}

var MutuallyExclusiveProps = _MediaQueries.MediaQueries.validKeys();

function validateProps(props) {
  var selectedProps = Object.keys(props).filter(function (prop) {
    return MutuallyExclusiveProps.includes(prop);
  });

  if (selectedProps.length < 1) {
    throw new Error("1 of ".concat(MutuallyExclusiveProps.join(", "), " is required."));
  } else if (selectedProps.length > 1) {
    throw new Error("Only 1 of ".concat(selectedProps.join(", "), " is allowed at a time."));
  }
}
//# sourceMappingURL=Media.js.map