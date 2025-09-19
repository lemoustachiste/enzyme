"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AND = AND;
exports.ITERATOR_SYMBOL = void 0;
exports.childrenToSimplifiedArray = childrenToSimplifiedArray;
exports.cloneElement = cloneElement;
exports.containsChildrenSubArray = containsChildrenSubArray;
exports.displayNameOfNode = displayNameOfNode;
exports.getAdapter = getAdapter;
exports.isCustomComponent = isCustomComponent;
exports.isCustomComponentElement = isCustomComponentElement;
exports.isEmptyValue = isEmptyValue;
exports.isReactElementAlike = isReactElementAlike;
exports.loadCheerioRoot = loadCheerioRoot;
exports.makeOptions = makeOptions;
exports.nodeEqual = nodeEqual;
exports.nodeHasType = nodeHasType;
exports.nodeMatches = nodeMatches;
exports.privateSet = privateSet;
exports.propsOfNode = propsOfNode;
exports.renderedDive = renderedDive;
Object.defineProperty(exports, "shallowEqual", {
  enumerable: true,
  get: function get() {
    return _enzymeShallowEqual["default"];
  }
});
exports.spyMethod = spyMethod;
exports.spyProperty = spyProperty;
exports.sym = sym;
exports.typeOfNode = typeOfNode;
exports.withSetStateAllowed = withSetStateAllowed;
var _lodash = _interopRequireDefault(require("lodash.isequal"));
var _objectIs = _interopRequireDefault(require("object-is"));
var _object = _interopRequireDefault(require("object.entries"));
var _object2 = _interopRequireDefault(require("object.fromentries"));
var _functionPrototype = _interopRequireDefault(require("function.prototype.name"));
var _hasown = _interopRequireDefault(require("hasown"));
var _arrayPrototype = _interopRequireDefault(require("array.prototype.flat"));
var _stringPrototype = _interopRequireDefault(require("string.prototype.trim"));
var _configuration = require("./configuration");
var _RSTTraversal = require("./RSTTraversal");
var _getAdapter = _interopRequireDefault(require("./getAdapter"));
var _validateAdapter = _interopRequireDefault(require("./validateAdapter"));
var _enzymeShallowEqual = _interopRequireDefault(require("enzyme-shallow-equal"));
var _excluded = ["attachTo", "hydrateIn"];
/* eslint no-use-before-define: 0 */
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var cheerio = require('cheerio'); // do not modify output of loadCheerioRoot by babel

var ITERATOR_SYMBOL = exports.ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
function getAdapter() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  console.warn('getAdapter from Utils is deprecated; please use ./getAdapter instead');
  return (0, _getAdapter["default"])(options);
}
function validateMountOptions(attachTo, hydrateIn) {
  if (attachTo && hydrateIn && attachTo !== hydrateIn) {
    throw new TypeError('If both the `attachTo` and `hydrateIn` options are provided, they must be === (for backwards compatibility)');
  }
}
function makeOptions(options) {
  var _get = (0, _configuration.get)(),
    configAttachTo = _get.attachTo,
    configHydrateIn = _get.hydrateIn,
    config = _objectWithoutProperties(_get, _excluded);
  validateMountOptions(configAttachTo, configHydrateIn);
  var attachTo = options.attachTo,
    hydrateIn = options.hydrateIn;
  validateMountOptions(attachTo, hydrateIn);

  // neither present: both undefined
  // only attachTo present: attachTo set, hydrateIn undefined
  // only hydrateIn present: both set to hydrateIn
  // both present (and ===, per above): both set to hydrateIn
  var finalAttachTo = hydrateIn || configHydrateIn || configAttachTo || attachTo || undefined;
  var finalHydrateIn = hydrateIn || configHydrateIn || undefined;
  var mountTargets = _objectSpread(_objectSpread({}, finalAttachTo && {
    attachTo: finalAttachTo
  }), finalHydrateIn && {
    hydrateIn: finalHydrateIn
  });
  return _objectSpread(_objectSpread(_objectSpread({}, config), options), mountTargets);
}
function isCustomComponent(component, adapter) {
  (0, _validateAdapter["default"])(adapter);
  if (adapter.isCustomComponent) {
    return !!adapter.isCustomComponent(component);
  }
  return typeof component === 'function';
}
function isCustomComponentElement(inst, adapter) {
  if (adapter.isCustomComponentElement) {
    return !!adapter.isCustomComponentElement(inst);
  }
  return !!inst && adapter.isValidElement(inst) && typeof inst.type === 'function';
}
function propsOfNode(node) {
  var newEntries = (0, _object["default"])(node && node.props || {}).filter(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      value = _ref2[1];
    return typeof value !== 'undefined';
  });
  return (0, _object2["default"])(newEntries);
}
function typeOfNode(node) {
  return node ? node.type : null;
}
function nodeHasType(node, type) {
  if (!type || !node) return false;
  var adapter = (0, _getAdapter["default"])();
  if (adapter.displayNameOfNode) {
    var displayName = adapter.displayNameOfNode(node);
    return displayName === type;
  }
  if (!node.type) return false;
  if (typeof node.type === 'string') return node.type === type;
  return (typeof node.type === 'function' ? (0, _functionPrototype["default"])(node.type) === type : node.type.name === type) || node.type.displayName === type;
}
function internalChildrenCompare(a, b, lenComp, isLoose) {
  var nodeCompare = isLoose ? nodeMatches : nodeEqual;
  if (a === b) return true;
  if (!Array.isArray(a) && !Array.isArray(b)) {
    return nodeCompare(a, b, lenComp);
  }
  var flatA = (0, _arrayPrototype["default"])(a, Infinity);
  var flatB = (0, _arrayPrototype["default"])(b, Infinity);
  if (flatA.length !== flatB.length) return false;
  if (flatA.length === 0 && flatB.length === 0) return true;
  for (var i = 0; i < flatA.length; i += 1) {
    if (!nodeCompare(flatA[i], flatB[i], lenComp)) return false;
  }
  return true;
}
function childrenMatch(a, b, lenComp) {
  return internalChildrenCompare(a, b, lenComp, true);
}
function childrenEqual(a, b, lenComp) {
  return internalChildrenCompare(a, b, lenComp, false);
}
function removeNullaryReducer(acc, _ref3) {
  var _ref4 = _slicedToArray(_ref3, 2),
    key = _ref4[0],
    value = _ref4[1];
  var addition = value == null ? {} : _defineProperty({}, key, value);
  return _objectSpread(_objectSpread({}, acc), addition);
}
function internalNodeCompare(a, b, lenComp, isLoose) {
  if (a === b) return true;
  if (!a || !b) return false;
  if (a.type !== b.type) return false;
  var left = propsOfNode(a);
  var right = propsOfNode(b);
  if (isLoose) {
    left = (0, _object["default"])(left).reduce(removeNullaryReducer, {});
    right = (0, _object["default"])(right).reduce(removeNullaryReducer, {});
  }
  var leftKeys = Object.keys(left);
  for (var i = 0; i < leftKeys.length; i += 1) {
    var prop = leftKeys[i];
    // we will check children later
    if (prop === 'children') {
      // continue;
    } else if (!(prop in right)) {
      return false;
    } else if (right[prop] === left[prop]) {
      // continue;
    } else if (_typeof(right[prop]) === _typeof(left[prop]) && _typeof(left[prop]) === 'object') {
      if (!(0, _lodash["default"])(left[prop], right[prop])) return false;
    } else {
      return false;
    }
  }
  var leftHasChildren = 'children' in left;
  var rightHasChildren = 'children' in right;
  var childCompare = isLoose ? childrenMatch : childrenEqual;
  if (leftHasChildren || rightHasChildren) {
    if (!childCompare(childrenToSimplifiedArray(left.children, isLoose), childrenToSimplifiedArray(right.children, isLoose), lenComp)) {
      return false;
    }
  }
  if (!isTextualNode(a)) {
    var rightKeys = Object.keys(right);
    return lenComp(leftKeys.length - leftHasChildren, rightKeys.length - rightHasChildren);
  }
  return false;
}
function nodeMatches(a, b) {
  var lenComp = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _objectIs["default"];
  return internalNodeCompare(a, b, lenComp, true);
}
function nodeEqual(a, b) {
  var lenComp = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _objectIs["default"];
  return internalNodeCompare(a, b, lenComp, false);
}
function containsChildrenSubArray(match, node, subArray) {
  var children = (0, _RSTTraversal.childrenOfNode)(node);
  var checker = function checker(_, i) {
    return arraysEqual(match, children.slice(i, i + subArray.length), subArray);
  };
  return children.some(checker);
}
function arraysEqual(match, left, right) {
  return left.length === right.length && left.every(function (el, i) {
    return match(el, right[i]);
  });
}
function childrenToArray(children) {
  var result = [];
  var push = function push(el) {
    if (el === null || el === false || typeof el === 'undefined') return;
    result.push(el);
  };
  if (Array.isArray(children)) {
    children.forEach(push);
  } else {
    push(children);
  }
  return result;
}
function childrenToSimplifiedArray(nodeChildren) {
  var isLoose = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var childrenArray = childrenToArray(nodeChildren);
  var simplifiedArray = [];
  for (var i = 0; i < childrenArray.length; i += 1) {
    var child = childrenArray[i];
    var previousChild = simplifiedArray.pop();
    if (typeof previousChild === 'undefined') {
      simplifiedArray.push(child);
    } else if (isTextualNode(child) && isTextualNode(previousChild)) {
      simplifiedArray.push(previousChild + child);
    } else {
      simplifiedArray.push(previousChild);
      simplifiedArray.push(child);
    }
  }
  if (isLoose) {
    return simplifiedArray.map(function (x) {
      return typeof x === 'string' ? (0, _stringPrototype["default"])(x) : x;
    });
  }
  return simplifiedArray;
}
function isTextualNode(node) {
  return typeof node === 'string' || typeof node === 'number';
}
function isReactElementAlike(arg, adapter) {
  return adapter.isValidElement(arg) || isTextualNode(arg) || Array.isArray(arg);
}

// TODO(lmr): can we get rid of this outside of the adapter?
function withSetStateAllowed(fn) {
  // NOTE(lmr):
  // this is currently here to circumvent a React bug where `setState()` is
  // not allowed without global being defined.
  var cleanup = false;
  if (typeof global.document === 'undefined') {
    cleanup = true;
    global.document = {};
  }
  fn();
  if (cleanup) {
    // This works around a bug in node/jest in that developers aren't able to
    // delete things from global when running in a node vm.
    global.document = undefined;
    delete global.document;
  }
}

// TODO, semver-major: remove this
function AND(fns) {
  var fnsReversed = fns.slice().reverse();
  return function (x) {
    return fnsReversed.every(function (fn) {
      return fn(x);
    });
  };
}
function displayNameOfNode(node) {
  if (!node) return null;
  var type = node.type;
  if (!type) return null;
  return type.displayName || (typeof type === 'function' ? (0, _functionPrototype["default"])(type) : type.name || type);
}
function sym(s) {
  return typeof Symbol === 'function' ? Symbol["for"]("enzyme.".concat(s)) : s;
}
function privateSet(obj, prop, value) {
  Object.defineProperty(obj, prop, {
    value: value,
    enumerable: false,
    writable: true
  });
}
function cloneElement(adapter, el, props) {
  return adapter.createElement(el.type, _objectSpread(_objectSpread({}, el.props), props));
}
function spyMethod(instance, methodName) {
  var getStub = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};
  var lastReturnValue;
  var originalMethod = instance[methodName];
  var hasOwnProp = (0, _hasown["default"])(instance, methodName);
  var descriptor;
  if (hasOwnProp) {
    descriptor = Object.getOwnPropertyDescriptor(instance, methodName);
  }
  Object.defineProperty(instance, methodName, {
    configurable: true,
    enumerable: !descriptor || !!descriptor.enumerable,
    value: getStub(originalMethod) || function spied() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      var result = originalMethod.apply(this, args);
      lastReturnValue = result;
      return result;
    }
  });
  return {
    restore: function restore() {
      if (hasOwnProp) {
        if (descriptor) {
          Object.defineProperty(instance, methodName, descriptor);
        } else {
          /* eslint-disable no-param-reassign */
          instance[methodName] = originalMethod;
          /* eslint-enable no-param-reassign */
        }
      } else {
        /* eslint-disable no-param-reassign */
        delete instance[methodName];
        /* eslint-enable no-param-reassign */
      }
    },
    getLastReturnValue: function getLastReturnValue() {
      return lastReturnValue;
    }
  };
}
function spyProperty(instance, propertyName) {
  var handlers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var originalValue = instance[propertyName];
  var hasOwnProp = (0, _hasown["default"])(instance, propertyName);
  var descriptor;
  if (hasOwnProp) {
    descriptor = Object.getOwnPropertyDescriptor(instance, propertyName);
  }
  var _wasAssigned = false;
  var holder = originalValue;
  var getV = handlers.get ? function () {
    var value = descriptor && descriptor.get ? descriptor.get.call(instance) : holder;
    return handlers.get.call(instance, value);
  } : function () {
    return holder;
  };
  var set = handlers.set ? function (newValue) {
    _wasAssigned = true;
    var handlerNewValue = handlers.set.call(instance, holder, newValue);
    holder = handlerNewValue;
    if (descriptor && descriptor.set) {
      descriptor.set.call(instance, holder);
    }
  } : function (v) {
    _wasAssigned = true;
    holder = v;
  };
  Object.defineProperty(instance, propertyName, {
    configurable: true,
    enumerable: !descriptor || !!descriptor.enumerable,
    get: getV,
    set: set
  });
  return {
    restore: function restore() {
      if (hasOwnProp) {
        if (descriptor) {
          Object.defineProperty(instance, propertyName, descriptor);
        } else {
          /* eslint-disable no-param-reassign */
          instance[propertyName] = holder;
          /* eslint-enable no-param-reassign */
        }
      } else {
        /* eslint-disable no-param-reassign */
        delete instance[propertyName];
        /* eslint-enable no-param-reassign */
      }
    },
    wasAssigned: function wasAssigned() {
      return _wasAssigned;
    }
  };
}
function isEmptyValue(renderedValue) {
  return renderedValue === null || renderedValue === false;
}
function renderedDive(nodes) {
  if (isEmptyValue(nodes)) {
    return true;
  }
  return [].concat(nodes).every(function (n) {
    if (n) {
      var rendered = n.rendered;
      return isEmptyValue(rendered) || renderedDive(rendered);
    }
    return isEmptyValue(n);
  });
}
function isHtml(str) {
  var tagStart = str.indexOf('<');
  if (tagStart === -1 || tagStart > str.length - 3) {
    return false;
  }
  var tagChar = str.charCodeAt(tagStart + 1);
  var LowerA = 'a'.charCodeAt(0); // 97
  var LowerZ = 'z'.charCodeAt(0); // 122
  var UpperA = 'A'.charCodeAt(0); // 65
  var UpperZ = 'Z'.charCodeAt(0); // 90
  var Exclamation = '!'.charCodeAt(0); // 33

  return (tagChar >= LowerA && tagChar <= LowerZ || tagChar >= UpperA && tagChar <= UpperZ || tagChar === Exclamation) && str.includes('>', tagStart + 2);
}
function loadCheerioRoot(html) {
  if (!html) {
    return cheerio.root();
  }
  if (!isHtml(html)) {
    // create fragment with isDocument=false
    return cheerio.load(html, null, false).root();
  }
  return cheerio.load(html).root();
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfbG9kYXNoIiwiX2ludGVyb3BSZXF1aXJlRGVmYXVsdCIsInJlcXVpcmUiLCJfb2JqZWN0SXMiLCJfb2JqZWN0IiwiX29iamVjdDIiLCJfZnVuY3Rpb25Qcm90b3R5cGUiLCJfaGFzb3duIiwiX2FycmF5UHJvdG90eXBlIiwiX3N0cmluZ1Byb3RvdHlwZSIsIl9jb25maWd1cmF0aW9uIiwiX1JTVFRyYXZlcnNhbCIsIl9nZXRBZGFwdGVyIiwiX3ZhbGlkYXRlQWRhcHRlciIsIl9lbnp5bWVTaGFsbG93RXF1YWwiLCJfZXhjbHVkZWQiLCJlIiwiX19lc01vZHVsZSIsIl90eXBlb2YiLCJvIiwiU3ltYm9sIiwiaXRlcmF0b3IiLCJjb25zdHJ1Y3RvciIsInByb3RvdHlwZSIsIl9zbGljZWRUb0FycmF5IiwiciIsIl9hcnJheVdpdGhIb2xlcyIsIl9pdGVyYWJsZVRvQXJyYXlMaW1pdCIsIl91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheSIsIl9ub25JdGVyYWJsZVJlc3QiLCJUeXBlRXJyb3IiLCJhIiwiX2FycmF5TGlrZVRvQXJyYXkiLCJ0IiwidG9TdHJpbmciLCJjYWxsIiwic2xpY2UiLCJuYW1lIiwiQXJyYXkiLCJmcm9tIiwidGVzdCIsImxlbmd0aCIsIm4iLCJsIiwiaSIsInUiLCJmIiwibmV4dCIsIk9iamVjdCIsImRvbmUiLCJwdXNoIiwidmFsdWUiLCJpc0FycmF5Iiwib3duS2V5cyIsImtleXMiLCJnZXRPd25Qcm9wZXJ0eVN5bWJvbHMiLCJmaWx0ZXIiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJlbnVtZXJhYmxlIiwiYXBwbHkiLCJfb2JqZWN0U3ByZWFkIiwiYXJndW1lbnRzIiwiZm9yRWFjaCIsIl9kZWZpbmVQcm9wZXJ0eSIsImdldE93blByb3BlcnR5RGVzY3JpcHRvcnMiLCJkZWZpbmVQcm9wZXJ0aWVzIiwiZGVmaW5lUHJvcGVydHkiLCJfdG9Qcm9wZXJ0eUtleSIsImNvbmZpZ3VyYWJsZSIsIndyaXRhYmxlIiwiX3RvUHJpbWl0aXZlIiwidG9QcmltaXRpdmUiLCJTdHJpbmciLCJOdW1iZXIiLCJfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMiLCJfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZSIsImluZGV4T2YiLCJwcm9wZXJ0eUlzRW51bWVyYWJsZSIsImhhc093blByb3BlcnR5IiwiY2hlZXJpbyIsIklURVJBVE9SX1NZTUJPTCIsImV4cG9ydHMiLCJnZXRBZGFwdGVyIiwib3B0aW9ucyIsInVuZGVmaW5lZCIsImNvbnNvbGUiLCJ3YXJuIiwicmVhbEdldEFkYXB0ZXIiLCJ2YWxpZGF0ZU1vdW50T3B0aW9ucyIsImF0dGFjaFRvIiwiaHlkcmF0ZUluIiwibWFrZU9wdGlvbnMiLCJfZ2V0IiwiZ2V0IiwiY29uZmlnQXR0YWNoVG8iLCJjb25maWdIeWRyYXRlSW4iLCJjb25maWciLCJmaW5hbEF0dGFjaFRvIiwiZmluYWxIeWRyYXRlSW4iLCJtb3VudFRhcmdldHMiLCJpc0N1c3RvbUNvbXBvbmVudCIsImNvbXBvbmVudCIsImFkYXB0ZXIiLCJ2YWxpZGF0ZUFkYXB0ZXIiLCJpc0N1c3RvbUNvbXBvbmVudEVsZW1lbnQiLCJpbnN0IiwiaXNWYWxpZEVsZW1lbnQiLCJ0eXBlIiwicHJvcHNPZk5vZGUiLCJub2RlIiwibmV3RW50cmllcyIsImVudHJpZXMiLCJwcm9wcyIsIl9yZWYiLCJfcmVmMiIsImZyb21FbnRyaWVzIiwidHlwZU9mTm9kZSIsIm5vZGVIYXNUeXBlIiwiZGlzcGxheU5hbWVPZk5vZGUiLCJkaXNwbGF5TmFtZSIsImZ1bmN0aW9uTmFtZSIsImludGVybmFsQ2hpbGRyZW5Db21wYXJlIiwiYiIsImxlbkNvbXAiLCJpc0xvb3NlIiwibm9kZUNvbXBhcmUiLCJub2RlTWF0Y2hlcyIsIm5vZGVFcXVhbCIsImZsYXRBIiwiZmxhdCIsIkluZmluaXR5IiwiZmxhdEIiLCJjaGlsZHJlbk1hdGNoIiwiY2hpbGRyZW5FcXVhbCIsInJlbW92ZU51bGxhcnlSZWR1Y2VyIiwiYWNjIiwiX3JlZjMiLCJfcmVmNCIsImtleSIsImFkZGl0aW9uIiwiaW50ZXJuYWxOb2RlQ29tcGFyZSIsImxlZnQiLCJyaWdodCIsInJlZHVjZSIsImxlZnRLZXlzIiwicHJvcCIsImlzRXF1YWwiLCJsZWZ0SGFzQ2hpbGRyZW4iLCJyaWdodEhhc0NoaWxkcmVuIiwiY2hpbGRDb21wYXJlIiwiY2hpbGRyZW5Ub1NpbXBsaWZpZWRBcnJheSIsImNoaWxkcmVuIiwiaXNUZXh0dWFsTm9kZSIsInJpZ2h0S2V5cyIsImlzIiwiY29udGFpbnNDaGlsZHJlblN1YkFycmF5IiwibWF0Y2giLCJzdWJBcnJheSIsImNoaWxkcmVuT2ZOb2RlIiwiY2hlY2tlciIsIl8iLCJhcnJheXNFcXVhbCIsInNvbWUiLCJldmVyeSIsImVsIiwiY2hpbGRyZW5Ub0FycmF5IiwicmVzdWx0Iiwibm9kZUNoaWxkcmVuIiwiY2hpbGRyZW5BcnJheSIsInNpbXBsaWZpZWRBcnJheSIsImNoaWxkIiwicHJldmlvdXNDaGlsZCIsInBvcCIsIm1hcCIsIngiLCJ0cmltIiwiaXNSZWFjdEVsZW1lbnRBbGlrZSIsImFyZyIsIndpdGhTZXRTdGF0ZUFsbG93ZWQiLCJmbiIsImNsZWFudXAiLCJnbG9iYWwiLCJkb2N1bWVudCIsIkFORCIsImZucyIsImZuc1JldmVyc2VkIiwicmV2ZXJzZSIsInN5bSIsInMiLCJjb25jYXQiLCJwcml2YXRlU2V0Iiwib2JqIiwiY2xvbmVFbGVtZW50IiwiY3JlYXRlRWxlbWVudCIsInNweU1ldGhvZCIsImluc3RhbmNlIiwibWV0aG9kTmFtZSIsImdldFN0dWIiLCJsYXN0UmV0dXJuVmFsdWUiLCJvcmlnaW5hbE1ldGhvZCIsImhhc093blByb3AiLCJoYXNPd24iLCJkZXNjcmlwdG9yIiwic3BpZWQiLCJfbGVuIiwiYXJncyIsIl9rZXkiLCJyZXN0b3JlIiwiZ2V0TGFzdFJldHVyblZhbHVlIiwic3B5UHJvcGVydHkiLCJwcm9wZXJ0eU5hbWUiLCJoYW5kbGVycyIsIm9yaWdpbmFsVmFsdWUiLCJ3YXNBc3NpZ25lZCIsImhvbGRlciIsImdldFYiLCJzZXQiLCJuZXdWYWx1ZSIsImhhbmRsZXJOZXdWYWx1ZSIsInYiLCJpc0VtcHR5VmFsdWUiLCJyZW5kZXJlZFZhbHVlIiwicmVuZGVyZWREaXZlIiwibm9kZXMiLCJyZW5kZXJlZCIsImlzSHRtbCIsInN0ciIsInRhZ1N0YXJ0IiwidGFnQ2hhciIsImNoYXJDb2RlQXQiLCJMb3dlckEiLCJMb3dlcloiLCJVcHBlckEiLCJVcHBlcloiLCJFeGNsYW1hdGlvbiIsImluY2x1ZGVzIiwibG9hZENoZWVyaW9Sb290IiwiaHRtbCIsInJvb3QiLCJsb2FkIl0sInNvdXJjZXMiOlsiLi4vc3JjL1V0aWxzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludCBuby11c2UtYmVmb3JlLWRlZmluZTogMCAqL1xuaW1wb3J0IGlzRXF1YWwgZnJvbSAnbG9kYXNoLmlzZXF1YWwnO1xuaW1wb3J0IGlzIGZyb20gJ29iamVjdC1pcyc7XG5pbXBvcnQgZW50cmllcyBmcm9tICdvYmplY3QuZW50cmllcyc7XG5pbXBvcnQgZnJvbUVudHJpZXMgZnJvbSAnb2JqZWN0LmZyb21lbnRyaWVzJztcbmltcG9ydCBmdW5jdGlvbk5hbWUgZnJvbSAnZnVuY3Rpb24ucHJvdG90eXBlLm5hbWUnO1xuaW1wb3J0IGhhc093biBmcm9tICdoYXNvd24nO1xuaW1wb3J0IGZsYXQgZnJvbSAnYXJyYXkucHJvdG90eXBlLmZsYXQnO1xuaW1wb3J0IHRyaW0gZnJvbSAnc3RyaW5nLnByb3RvdHlwZS50cmltJztcbmNvbnN0IGNoZWVyaW8gPSByZXF1aXJlKCdjaGVlcmlvJyk7IC8vIGRvIG5vdCBtb2RpZnkgb3V0cHV0IG9mIGxvYWRDaGVlcmlvUm9vdCBieSBiYWJlbFxuXG5pbXBvcnQgeyBnZXQgfSBmcm9tICcuL2NvbmZpZ3VyYXRpb24nO1xuaW1wb3J0IHsgY2hpbGRyZW5PZk5vZGUgfSBmcm9tICcuL1JTVFRyYXZlcnNhbCc7XG5pbXBvcnQgcmVhbEdldEFkYXB0ZXIgZnJvbSAnLi9nZXRBZGFwdGVyJztcbmltcG9ydCB2YWxpZGF0ZUFkYXB0ZXIgZnJvbSAnLi92YWxpZGF0ZUFkYXB0ZXInO1xuXG5leHBvcnQgY29uc3QgSVRFUkFUT1JfU1lNQk9MID0gdHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiBTeW1ib2wuaXRlcmF0b3I7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRBZGFwdGVyKG9wdGlvbnMgPSB7fSkge1xuICBjb25zb2xlLndhcm4oJ2dldEFkYXB0ZXIgZnJvbSBVdGlscyBpcyBkZXByZWNhdGVkOyBwbGVhc2UgdXNlIC4vZ2V0QWRhcHRlciBpbnN0ZWFkJyk7XG4gIHJldHVybiByZWFsR2V0QWRhcHRlcihvcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVNb3VudE9wdGlvbnMoYXR0YWNoVG8sIGh5ZHJhdGVJbikge1xuICBpZiAoYXR0YWNoVG8gJiYgaHlkcmF0ZUluICYmIGF0dGFjaFRvICE9PSBoeWRyYXRlSW4pIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJZiBib3RoIHRoZSBgYXR0YWNoVG9gIGFuZCBgaHlkcmF0ZUluYCBvcHRpb25zIGFyZSBwcm92aWRlZCwgdGhleSBtdXN0IGJlID09PSAoZm9yIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5KScpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWtlT3B0aW9ucyhvcHRpb25zKSB7XG4gIGNvbnN0IHsgYXR0YWNoVG86IGNvbmZpZ0F0dGFjaFRvLCBoeWRyYXRlSW46IGNvbmZpZ0h5ZHJhdGVJbiwgLi4uY29uZmlnIH0gPSBnZXQoKTtcbiAgdmFsaWRhdGVNb3VudE9wdGlvbnMoY29uZmlnQXR0YWNoVG8sIGNvbmZpZ0h5ZHJhdGVJbik7XG5cbiAgY29uc3QgeyBhdHRhY2hUbywgaHlkcmF0ZUluIH0gPSBvcHRpb25zO1xuICB2YWxpZGF0ZU1vdW50T3B0aW9ucyhhdHRhY2hUbywgaHlkcmF0ZUluKTtcblxuICAvLyBuZWl0aGVyIHByZXNlbnQ6IGJvdGggdW5kZWZpbmVkXG4gIC8vIG9ubHkgYXR0YWNoVG8gcHJlc2VudDogYXR0YWNoVG8gc2V0LCBoeWRyYXRlSW4gdW5kZWZpbmVkXG4gIC8vIG9ubHkgaHlkcmF0ZUluIHByZXNlbnQ6IGJvdGggc2V0IHRvIGh5ZHJhdGVJblxuICAvLyBib3RoIHByZXNlbnQgKGFuZCA9PT0sIHBlciBhYm92ZSk6IGJvdGggc2V0IHRvIGh5ZHJhdGVJblxuICBjb25zdCBmaW5hbEF0dGFjaFRvID0gaHlkcmF0ZUluIHx8IGNvbmZpZ0h5ZHJhdGVJbiB8fCBjb25maWdBdHRhY2hUbyB8fCBhdHRhY2hUbyB8fCB1bmRlZmluZWQ7XG4gIGNvbnN0IGZpbmFsSHlkcmF0ZUluID0gaHlkcmF0ZUluIHx8IGNvbmZpZ0h5ZHJhdGVJbiB8fCB1bmRlZmluZWQ7XG4gIGNvbnN0IG1vdW50VGFyZ2V0cyA9IHtcbiAgICAuLi4oZmluYWxBdHRhY2hUbyAmJiB7IGF0dGFjaFRvOiBmaW5hbEF0dGFjaFRvIH0pLFxuICAgIC4uLihmaW5hbEh5ZHJhdGVJbiAmJiB7IGh5ZHJhdGVJbjogZmluYWxIeWRyYXRlSW4gfSksXG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICAuLi5jb25maWcsXG4gICAgLi4ub3B0aW9ucyxcbiAgICAuLi5tb3VudFRhcmdldHMsXG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0N1c3RvbUNvbXBvbmVudChjb21wb25lbnQsIGFkYXB0ZXIpIHtcbiAgdmFsaWRhdGVBZGFwdGVyKGFkYXB0ZXIpO1xuICBpZiAoYWRhcHRlci5pc0N1c3RvbUNvbXBvbmVudCkge1xuICAgIHJldHVybiAhIWFkYXB0ZXIuaXNDdXN0b21Db21wb25lbnQoY29tcG9uZW50KTtcbiAgfVxuICByZXR1cm4gdHlwZW9mIGNvbXBvbmVudCA9PT0gJ2Z1bmN0aW9uJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQ3VzdG9tQ29tcG9uZW50RWxlbWVudChpbnN0LCBhZGFwdGVyKSB7XG4gIGlmIChhZGFwdGVyLmlzQ3VzdG9tQ29tcG9uZW50RWxlbWVudCkge1xuICAgIHJldHVybiAhIWFkYXB0ZXIuaXNDdXN0b21Db21wb25lbnRFbGVtZW50KGluc3QpO1xuICB9XG4gIHJldHVybiAhIWluc3QgJiYgYWRhcHRlci5pc1ZhbGlkRWxlbWVudChpbnN0KSAmJiB0eXBlb2YgaW5zdC50eXBlID09PSAnZnVuY3Rpb24nO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcHJvcHNPZk5vZGUobm9kZSkge1xuICBjb25zdCBuZXdFbnRyaWVzID0gZW50cmllcygobm9kZSAmJiBub2RlLnByb3BzKSB8fCB7fSlcbiAgICAuZmlsdGVyKChbLCB2YWx1ZV0pID0+IHR5cGVvZiB2YWx1ZSAhPT0gJ3VuZGVmaW5lZCcpO1xuICByZXR1cm4gZnJvbUVudHJpZXMobmV3RW50cmllcyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0eXBlT2ZOb2RlKG5vZGUpIHtcbiAgcmV0dXJuIG5vZGUgPyBub2RlLnR5cGUgOiBudWxsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbm9kZUhhc1R5cGUobm9kZSwgdHlwZSkge1xuICBpZiAoIXR5cGUgfHwgIW5vZGUpIHJldHVybiBmYWxzZTtcblxuICBjb25zdCBhZGFwdGVyID0gcmVhbEdldEFkYXB0ZXIoKTtcbiAgaWYgKGFkYXB0ZXIuZGlzcGxheU5hbWVPZk5vZGUpIHtcbiAgICBjb25zdCBkaXNwbGF5TmFtZSA9IGFkYXB0ZXIuZGlzcGxheU5hbWVPZk5vZGUobm9kZSk7XG4gICAgcmV0dXJuIGRpc3BsYXlOYW1lID09PSB0eXBlO1xuICB9XG5cbiAgaWYgKCFub2RlLnR5cGUpIHJldHVybiBmYWxzZTtcbiAgaWYgKHR5cGVvZiBub2RlLnR5cGUgPT09ICdzdHJpbmcnKSByZXR1cm4gbm9kZS50eXBlID09PSB0eXBlO1xuICByZXR1cm4gKFxuICAgIHR5cGVvZiBub2RlLnR5cGUgPT09ICdmdW5jdGlvbicgPyBmdW5jdGlvbk5hbWUobm9kZS50eXBlKSA9PT0gdHlwZSA6IG5vZGUudHlwZS5uYW1lID09PSB0eXBlXG4gICkgfHwgbm9kZS50eXBlLmRpc3BsYXlOYW1lID09PSB0eXBlO1xufVxuXG5mdW5jdGlvbiBpbnRlcm5hbENoaWxkcmVuQ29tcGFyZShhLCBiLCBsZW5Db21wLCBpc0xvb3NlKSB7XG4gIGNvbnN0IG5vZGVDb21wYXJlID0gaXNMb29zZSA/IG5vZGVNYXRjaGVzIDogbm9kZUVxdWFsO1xuXG4gIGlmIChhID09PSBiKSByZXR1cm4gdHJ1ZTtcbiAgaWYgKCFBcnJheS5pc0FycmF5KGEpICYmICFBcnJheS5pc0FycmF5KGIpKSB7XG4gICAgcmV0dXJuIG5vZGVDb21wYXJlKGEsIGIsIGxlbkNvbXApO1xuICB9XG4gIGNvbnN0IGZsYXRBID0gZmxhdChhLCBJbmZpbml0eSk7XG4gIGNvbnN0IGZsYXRCID0gZmxhdChiLCBJbmZpbml0eSk7XG4gIGlmIChmbGF0QS5sZW5ndGggIT09IGZsYXRCLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xuICBpZiAoZmxhdEEubGVuZ3RoID09PSAwICYmIGZsYXRCLmxlbmd0aCA9PT0gMCkgcmV0dXJuIHRydWU7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZmxhdEEubGVuZ3RoOyBpICs9IDEpIHtcbiAgICBpZiAoIW5vZGVDb21wYXJlKGZsYXRBW2ldLCBmbGF0QltpXSwgbGVuQ29tcCkpIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gY2hpbGRyZW5NYXRjaChhLCBiLCBsZW5Db21wKSB7XG4gIHJldHVybiBpbnRlcm5hbENoaWxkcmVuQ29tcGFyZShhLCBiLCBsZW5Db21wLCB0cnVlKTtcbn1cblxuZnVuY3Rpb24gY2hpbGRyZW5FcXVhbChhLCBiLCBsZW5Db21wKSB7XG4gIHJldHVybiBpbnRlcm5hbENoaWxkcmVuQ29tcGFyZShhLCBiLCBsZW5Db21wLCBmYWxzZSk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZU51bGxhcnlSZWR1Y2VyKGFjYywgW2tleSwgdmFsdWVdKSB7XG4gIGNvbnN0IGFkZGl0aW9uID0gdmFsdWUgPT0gbnVsbCA/IHt9IDogeyBba2V5XTogdmFsdWUgfTtcbiAgcmV0dXJuIHsgLi4uYWNjLCAuLi5hZGRpdGlvbiB9O1xufVxuXG5mdW5jdGlvbiBpbnRlcm5hbE5vZGVDb21wYXJlKGEsIGIsIGxlbkNvbXAsIGlzTG9vc2UpIHtcbiAgaWYgKGEgPT09IGIpIHJldHVybiB0cnVlO1xuICBpZiAoIWEgfHwgIWIpIHJldHVybiBmYWxzZTtcbiAgaWYgKGEudHlwZSAhPT0gYi50eXBlKSByZXR1cm4gZmFsc2U7XG5cbiAgbGV0IGxlZnQgPSBwcm9wc09mTm9kZShhKTtcbiAgbGV0IHJpZ2h0ID0gcHJvcHNPZk5vZGUoYik7XG4gIGlmIChpc0xvb3NlKSB7XG4gICAgbGVmdCA9IGVudHJpZXMobGVmdCkucmVkdWNlKHJlbW92ZU51bGxhcnlSZWR1Y2VyLCB7fSk7XG4gICAgcmlnaHQgPSBlbnRyaWVzKHJpZ2h0KS5yZWR1Y2UocmVtb3ZlTnVsbGFyeVJlZHVjZXIsIHt9KTtcbiAgfVxuXG4gIGNvbnN0IGxlZnRLZXlzID0gT2JqZWN0LmtleXMobGVmdCk7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVmdEtleXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICBjb25zdCBwcm9wID0gbGVmdEtleXNbaV07XG4gICAgLy8gd2Ugd2lsbCBjaGVjayBjaGlsZHJlbiBsYXRlclxuICAgIGlmIChwcm9wID09PSAnY2hpbGRyZW4nKSB7XG4gICAgICAvLyBjb250aW51ZTtcbiAgICB9IGVsc2UgaWYgKCEocHJvcCBpbiByaWdodCkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2UgaWYgKHJpZ2h0W3Byb3BdID09PSBsZWZ0W3Byb3BdKSB7XG4gICAgICAvLyBjb250aW51ZTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiByaWdodFtwcm9wXSA9PT0gdHlwZW9mIGxlZnRbcHJvcF0gJiYgdHlwZW9mIGxlZnRbcHJvcF0gPT09ICdvYmplY3QnKSB7XG4gICAgICBpZiAoIWlzRXF1YWwobGVmdFtwcm9wXSwgcmlnaHRbcHJvcF0pKSByZXR1cm4gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBjb25zdCBsZWZ0SGFzQ2hpbGRyZW4gPSAnY2hpbGRyZW4nIGluIGxlZnQ7XG4gIGNvbnN0IHJpZ2h0SGFzQ2hpbGRyZW4gPSAnY2hpbGRyZW4nIGluIHJpZ2h0O1xuICBjb25zdCBjaGlsZENvbXBhcmUgPSBpc0xvb3NlID8gY2hpbGRyZW5NYXRjaCA6IGNoaWxkcmVuRXF1YWw7XG4gIGlmIChsZWZ0SGFzQ2hpbGRyZW4gfHwgcmlnaHRIYXNDaGlsZHJlbikge1xuICAgIGlmICghY2hpbGRDb21wYXJlKFxuICAgICAgY2hpbGRyZW5Ub1NpbXBsaWZpZWRBcnJheShsZWZ0LmNoaWxkcmVuLCBpc0xvb3NlKSxcbiAgICAgIGNoaWxkcmVuVG9TaW1wbGlmaWVkQXJyYXkocmlnaHQuY2hpbGRyZW4sIGlzTG9vc2UpLFxuICAgICAgbGVuQ29tcCxcbiAgICApKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgaWYgKCFpc1RleHR1YWxOb2RlKGEpKSB7XG4gICAgY29uc3QgcmlnaHRLZXlzID0gT2JqZWN0LmtleXMocmlnaHQpO1xuICAgIHJldHVybiBsZW5Db21wKGxlZnRLZXlzLmxlbmd0aCAtIGxlZnRIYXNDaGlsZHJlbiwgcmlnaHRLZXlzLmxlbmd0aCAtIHJpZ2h0SGFzQ2hpbGRyZW4pO1xuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbm9kZU1hdGNoZXMoYSwgYiwgbGVuQ29tcCA9IGlzKSB7XG4gIHJldHVybiBpbnRlcm5hbE5vZGVDb21wYXJlKGEsIGIsIGxlbkNvbXAsIHRydWUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbm9kZUVxdWFsKGEsIGIsIGxlbkNvbXAgPSBpcykge1xuICByZXR1cm4gaW50ZXJuYWxOb2RlQ29tcGFyZShhLCBiLCBsZW5Db21wLCBmYWxzZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb250YWluc0NoaWxkcmVuU3ViQXJyYXkobWF0Y2gsIG5vZGUsIHN1YkFycmF5KSB7XG4gIGNvbnN0IGNoaWxkcmVuID0gY2hpbGRyZW5PZk5vZGUobm9kZSk7XG4gIGNvbnN0IGNoZWNrZXIgPSAoXywgaSkgPT4gYXJyYXlzRXF1YWwobWF0Y2gsIGNoaWxkcmVuLnNsaWNlKGksIGkgKyBzdWJBcnJheS5sZW5ndGgpLCBzdWJBcnJheSk7XG4gIHJldHVybiBjaGlsZHJlbi5zb21lKGNoZWNrZXIpO1xufVxuXG5mdW5jdGlvbiBhcnJheXNFcXVhbChtYXRjaCwgbGVmdCwgcmlnaHQpIHtcbiAgcmV0dXJuIGxlZnQubGVuZ3RoID09PSByaWdodC5sZW5ndGggJiYgbGVmdC5ldmVyeSgoZWwsIGkpID0+IG1hdGNoKGVsLCByaWdodFtpXSkpO1xufVxuXG5mdW5jdGlvbiBjaGlsZHJlblRvQXJyYXkoY2hpbGRyZW4pIHtcbiAgY29uc3QgcmVzdWx0ID0gW107XG5cbiAgY29uc3QgcHVzaCA9IChlbCkgPT4ge1xuICAgIGlmIChlbCA9PT0gbnVsbCB8fCBlbCA9PT0gZmFsc2UgfHwgdHlwZW9mIGVsID09PSAndW5kZWZpbmVkJykgcmV0dXJuO1xuICAgIHJlc3VsdC5wdXNoKGVsKTtcbiAgfTtcblxuICBpZiAoQXJyYXkuaXNBcnJheShjaGlsZHJlbikpIHtcbiAgICBjaGlsZHJlbi5mb3JFYWNoKHB1c2gpO1xuICB9IGVsc2Uge1xuICAgIHB1c2goY2hpbGRyZW4pO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjaGlsZHJlblRvU2ltcGxpZmllZEFycmF5KG5vZGVDaGlsZHJlbiwgaXNMb29zZSA9IGZhbHNlKSB7XG4gIGNvbnN0IGNoaWxkcmVuQXJyYXkgPSBjaGlsZHJlblRvQXJyYXkobm9kZUNoaWxkcmVuKTtcbiAgY29uc3Qgc2ltcGxpZmllZEFycmF5ID0gW107XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGlsZHJlbkFycmF5Lmxlbmd0aDsgaSArPSAxKSB7XG4gICAgY29uc3QgY2hpbGQgPSBjaGlsZHJlbkFycmF5W2ldO1xuICAgIGNvbnN0IHByZXZpb3VzQ2hpbGQgPSBzaW1wbGlmaWVkQXJyYXkucG9wKCk7XG5cbiAgICBpZiAodHlwZW9mIHByZXZpb3VzQ2hpbGQgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBzaW1wbGlmaWVkQXJyYXkucHVzaChjaGlsZCk7XG4gICAgfSBlbHNlIGlmIChpc1RleHR1YWxOb2RlKGNoaWxkKSAmJiBpc1RleHR1YWxOb2RlKHByZXZpb3VzQ2hpbGQpKSB7XG4gICAgICBzaW1wbGlmaWVkQXJyYXkucHVzaChwcmV2aW91c0NoaWxkICsgY2hpbGQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzaW1wbGlmaWVkQXJyYXkucHVzaChwcmV2aW91c0NoaWxkKTtcbiAgICAgIHNpbXBsaWZpZWRBcnJheS5wdXNoKGNoaWxkKTtcbiAgICB9XG4gIH1cblxuICBpZiAoaXNMb29zZSkge1xuICAgIHJldHVybiBzaW1wbGlmaWVkQXJyYXkubWFwKCh4KSA9PiAodHlwZW9mIHggPT09ICdzdHJpbmcnID8gdHJpbSh4KSA6IHgpKTtcbiAgfVxuXG4gIHJldHVybiBzaW1wbGlmaWVkQXJyYXk7XG59XG5cbmZ1bmN0aW9uIGlzVGV4dHVhbE5vZGUobm9kZSkge1xuICByZXR1cm4gdHlwZW9mIG5vZGUgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiBub2RlID09PSAnbnVtYmVyJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzUmVhY3RFbGVtZW50QWxpa2UoYXJnLCBhZGFwdGVyKSB7XG4gIHJldHVybiBhZGFwdGVyLmlzVmFsaWRFbGVtZW50KGFyZykgfHwgaXNUZXh0dWFsTm9kZShhcmcpIHx8IEFycmF5LmlzQXJyYXkoYXJnKTtcbn1cblxuLy8gVE9ETyhsbXIpOiBjYW4gd2UgZ2V0IHJpZCBvZiB0aGlzIG91dHNpZGUgb2YgdGhlIGFkYXB0ZXI/XG5leHBvcnQgZnVuY3Rpb24gd2l0aFNldFN0YXRlQWxsb3dlZChmbikge1xuICAvLyBOT1RFKGxtcik6XG4gIC8vIHRoaXMgaXMgY3VycmVudGx5IGhlcmUgdG8gY2lyY3VtdmVudCBhIFJlYWN0IGJ1ZyB3aGVyZSBgc2V0U3RhdGUoKWAgaXNcbiAgLy8gbm90IGFsbG93ZWQgd2l0aG91dCBnbG9iYWwgYmVpbmcgZGVmaW5lZC5cbiAgbGV0IGNsZWFudXAgPSBmYWxzZTtcbiAgaWYgKHR5cGVvZiBnbG9iYWwuZG9jdW1lbnQgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgY2xlYW51cCA9IHRydWU7XG4gICAgZ2xvYmFsLmRvY3VtZW50ID0ge307XG4gIH1cbiAgZm4oKTtcbiAgaWYgKGNsZWFudXApIHtcbiAgICAvLyBUaGlzIHdvcmtzIGFyb3VuZCBhIGJ1ZyBpbiBub2RlL2plc3QgaW4gdGhhdCBkZXZlbG9wZXJzIGFyZW4ndCBhYmxlIHRvXG4gICAgLy8gZGVsZXRlIHRoaW5ncyBmcm9tIGdsb2JhbCB3aGVuIHJ1bm5pbmcgaW4gYSBub2RlIHZtLlxuICAgIGdsb2JhbC5kb2N1bWVudCA9IHVuZGVmaW5lZDtcbiAgICBkZWxldGUgZ2xvYmFsLmRvY3VtZW50O1xuICB9XG59XG5cbi8vIFRPRE8sIHNlbXZlci1tYWpvcjogcmVtb3ZlIHRoaXNcbmV4cG9ydCBmdW5jdGlvbiBBTkQoZm5zKSB7XG4gIGNvbnN0IGZuc1JldmVyc2VkID0gZm5zLnNsaWNlKCkucmV2ZXJzZSgpO1xuICByZXR1cm4gKHgpID0+IGZuc1JldmVyc2VkLmV2ZXJ5KChmbikgPT4gZm4oeCkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGlzcGxheU5hbWVPZk5vZGUobm9kZSkge1xuICBpZiAoIW5vZGUpIHJldHVybiBudWxsO1xuXG4gIGNvbnN0IHsgdHlwZSB9ID0gbm9kZTtcblxuICBpZiAoIXR5cGUpIHJldHVybiBudWxsO1xuXG4gIHJldHVybiB0eXBlLmRpc3BsYXlOYW1lIHx8ICh0eXBlb2YgdHlwZSA9PT0gJ2Z1bmN0aW9uJyA/IGZ1bmN0aW9uTmFtZSh0eXBlKSA6IHR5cGUubmFtZSB8fCB0eXBlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN5bShzKSB7XG4gIHJldHVybiB0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nID8gU3ltYm9sLmZvcihgZW56eW1lLiR7c31gKSA6IHM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcml2YXRlU2V0KG9iaiwgcHJvcCwgdmFsdWUpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwgcHJvcCwge1xuICAgIHZhbHVlLFxuICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgIHdyaXRhYmxlOiB0cnVlLFxuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsb25lRWxlbWVudChhZGFwdGVyLCBlbCwgcHJvcHMpIHtcbiAgcmV0dXJuIGFkYXB0ZXIuY3JlYXRlRWxlbWVudChcbiAgICBlbC50eXBlLFxuICAgIHsgLi4uZWwucHJvcHMsIC4uLnByb3BzIH0sXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzcHlNZXRob2QoaW5zdGFuY2UsIG1ldGhvZE5hbWUsIGdldFN0dWIgPSAoKSA9PiB7fSkge1xuICBsZXQgbGFzdFJldHVyblZhbHVlO1xuICBjb25zdCBvcmlnaW5hbE1ldGhvZCA9IGluc3RhbmNlW21ldGhvZE5hbWVdO1xuICBjb25zdCBoYXNPd25Qcm9wID0gaGFzT3duKGluc3RhbmNlLCBtZXRob2ROYW1lKTtcbiAgbGV0IGRlc2NyaXB0b3I7XG4gIGlmIChoYXNPd25Qcm9wKSB7XG4gICAgZGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoaW5zdGFuY2UsIG1ldGhvZE5hbWUpO1xuICB9XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShpbnN0YW5jZSwgbWV0aG9kTmFtZSwge1xuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICBlbnVtZXJhYmxlOiAhZGVzY3JpcHRvciB8fCAhIWRlc2NyaXB0b3IuZW51bWVyYWJsZSxcbiAgICB2YWx1ZTogZ2V0U3R1YihvcmlnaW5hbE1ldGhvZCkgfHwgZnVuY3Rpb24gc3BpZWQoLi4uYXJncykge1xuICAgICAgY29uc3QgcmVzdWx0ID0gb3JpZ2luYWxNZXRob2QuYXBwbHkodGhpcywgYXJncyk7XG4gICAgICBsYXN0UmV0dXJuVmFsdWUgPSByZXN1bHQ7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0sXG4gIH0pO1xuICByZXR1cm4ge1xuICAgIHJlc3RvcmUoKSB7XG4gICAgICBpZiAoaGFzT3duUHJvcCkge1xuICAgICAgICBpZiAoZGVzY3JpcHRvcikge1xuICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShpbnN0YW5jZSwgbWV0aG9kTmFtZSwgZGVzY3JpcHRvcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tcGFyYW0tcmVhc3NpZ24gKi9cbiAgICAgICAgICBpbnN0YW5jZVttZXRob2ROYW1lXSA9IG9yaWdpbmFsTWV0aG9kO1xuICAgICAgICAgIC8qIGVzbGludC1lbmFibGUgbm8tcGFyYW0tcmVhc3NpZ24gKi9cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tcGFyYW0tcmVhc3NpZ24gKi9cbiAgICAgICAgZGVsZXRlIGluc3RhbmNlW21ldGhvZE5hbWVdO1xuICAgICAgICAvKiBlc2xpbnQtZW5hYmxlIG5vLXBhcmFtLXJlYXNzaWduICovXG4gICAgICB9XG4gICAgfSxcbiAgICBnZXRMYXN0UmV0dXJuVmFsdWUoKSB7XG4gICAgICByZXR1cm4gbGFzdFJldHVyblZhbHVlO1xuICAgIH0sXG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzcHlQcm9wZXJ0eShpbnN0YW5jZSwgcHJvcGVydHlOYW1lLCBoYW5kbGVycyA9IHt9KSB7XG4gIGNvbnN0IG9yaWdpbmFsVmFsdWUgPSBpbnN0YW5jZVtwcm9wZXJ0eU5hbWVdO1xuICBjb25zdCBoYXNPd25Qcm9wID0gaGFzT3duKGluc3RhbmNlLCBwcm9wZXJ0eU5hbWUpO1xuICBsZXQgZGVzY3JpcHRvcjtcbiAgaWYgKGhhc093blByb3ApIHtcbiAgICBkZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihpbnN0YW5jZSwgcHJvcGVydHlOYW1lKTtcbiAgfVxuICBsZXQgd2FzQXNzaWduZWQgPSBmYWxzZTtcbiAgbGV0IGhvbGRlciA9IG9yaWdpbmFsVmFsdWU7XG4gIGNvbnN0IGdldFYgPSBoYW5kbGVycy5nZXQgPyAoKSA9PiB7XG4gICAgY29uc3QgdmFsdWUgPSBkZXNjcmlwdG9yICYmIGRlc2NyaXB0b3IuZ2V0ID8gZGVzY3JpcHRvci5nZXQuY2FsbChpbnN0YW5jZSkgOiBob2xkZXI7XG4gICAgcmV0dXJuIGhhbmRsZXJzLmdldC5jYWxsKGluc3RhbmNlLCB2YWx1ZSk7XG4gIH0gOiAoKSA9PiBob2xkZXI7XG4gIGNvbnN0IHNldCA9IGhhbmRsZXJzLnNldCA/IChuZXdWYWx1ZSkgPT4ge1xuICAgIHdhc0Fzc2lnbmVkID0gdHJ1ZTtcbiAgICBjb25zdCBoYW5kbGVyTmV3VmFsdWUgPSBoYW5kbGVycy5zZXQuY2FsbChpbnN0YW5jZSwgaG9sZGVyLCBuZXdWYWx1ZSk7XG4gICAgaG9sZGVyID0gaGFuZGxlck5ld1ZhbHVlO1xuICAgIGlmIChkZXNjcmlwdG9yICYmIGRlc2NyaXB0b3Iuc2V0KSB7XG4gICAgICBkZXNjcmlwdG9yLnNldC5jYWxsKGluc3RhbmNlLCBob2xkZXIpO1xuICAgIH1cbiAgfSA6ICh2KSA9PiB7XG4gICAgd2FzQXNzaWduZWQgPSB0cnVlO1xuICAgIGhvbGRlciA9IHY7XG4gIH07XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShpbnN0YW5jZSwgcHJvcGVydHlOYW1lLCB7XG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIGVudW1lcmFibGU6ICFkZXNjcmlwdG9yIHx8ICEhZGVzY3JpcHRvci5lbnVtZXJhYmxlLFxuICAgIGdldDogZ2V0VixcbiAgICBzZXQsXG4gIH0pO1xuXG4gIHJldHVybiB7XG4gICAgcmVzdG9yZSgpIHtcbiAgICAgIGlmIChoYXNPd25Qcm9wKSB7XG4gICAgICAgIGlmIChkZXNjcmlwdG9yKSB7XG4gICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGluc3RhbmNlLCBwcm9wZXJ0eU5hbWUsIGRlc2NyaXB0b3IpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLXBhcmFtLXJlYXNzaWduICovXG4gICAgICAgICAgaW5zdGFuY2VbcHJvcGVydHlOYW1lXSA9IGhvbGRlcjtcbiAgICAgICAgICAvKiBlc2xpbnQtZW5hYmxlIG5vLXBhcmFtLXJlYXNzaWduICovXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLXBhcmFtLXJlYXNzaWduICovXG4gICAgICAgIGRlbGV0ZSBpbnN0YW5jZVtwcm9wZXJ0eU5hbWVdO1xuICAgICAgICAvKiBlc2xpbnQtZW5hYmxlIG5vLXBhcmFtLXJlYXNzaWduICovXG4gICAgICB9XG4gICAgfSxcbiAgICB3YXNBc3NpZ25lZCgpIHtcbiAgICAgIHJldHVybiB3YXNBc3NpZ25lZDtcbiAgICB9LFxuICB9O1xufVxuXG5leHBvcnQgeyBkZWZhdWx0IGFzIHNoYWxsb3dFcXVhbCB9IGZyb20gJ2VuenltZS1zaGFsbG93LWVxdWFsJztcblxuZXhwb3J0IGZ1bmN0aW9uIGlzRW1wdHlWYWx1ZShyZW5kZXJlZFZhbHVlKSB7XG4gIHJldHVybiByZW5kZXJlZFZhbHVlID09PSBudWxsIHx8IHJlbmRlcmVkVmFsdWUgPT09IGZhbHNlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyZWREaXZlKG5vZGVzKSB7XG4gIGlmIChpc0VtcHR5VmFsdWUobm9kZXMpKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICByZXR1cm4gW10uY29uY2F0KG5vZGVzKS5ldmVyeSgobikgPT4ge1xuICAgIGlmIChuKSB7XG4gICAgICBjb25zdCB7IHJlbmRlcmVkIH0gPSBuO1xuICAgICAgcmV0dXJuIGlzRW1wdHlWYWx1ZShyZW5kZXJlZCkgfHwgcmVuZGVyZWREaXZlKHJlbmRlcmVkKTtcbiAgICB9XG5cbiAgICByZXR1cm4gaXNFbXB0eVZhbHVlKG4pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gaXNIdG1sKHN0cikge1xuICBjb25zdCB0YWdTdGFydCA9IHN0ci5pbmRleE9mKCc8Jyk7XG4gIGlmICh0YWdTdGFydCA9PT0gLTEgfHwgdGFnU3RhcnQgPiBzdHIubGVuZ3RoIC0gMykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGNvbnN0IHRhZ0NoYXIgPSBzdHIuY2hhckNvZGVBdCh0YWdTdGFydCArIDEpO1xuXG4gIGNvbnN0IExvd2VyQSA9ICdhJy5jaGFyQ29kZUF0KDApOyAvLyA5N1xuICBjb25zdCBMb3dlclogPSAneicuY2hhckNvZGVBdCgwKTsgLy8gMTIyXG4gIGNvbnN0IFVwcGVyQSA9ICdBJy5jaGFyQ29kZUF0KDApOyAvLyA2NVxuICBjb25zdCBVcHBlclogPSAnWicuY2hhckNvZGVBdCgwKTsgLy8gOTBcbiAgY29uc3QgRXhjbGFtYXRpb24gPSAnIScuY2hhckNvZGVBdCgwKTsgLy8gMzNcblxuICByZXR1cm4gKFxuICAgICgodGFnQ2hhciA+PSBMb3dlckEgJiYgdGFnQ2hhciA8PSBMb3dlclopIHx8XG4gICAgICAodGFnQ2hhciA+PSBVcHBlckEgJiYgdGFnQ2hhciA8PSBVcHBlclopIHx8XG4gICAgICB0YWdDaGFyID09PSBFeGNsYW1hdGlvbikgJiZcbiAgICBzdHIuaW5jbHVkZXMoJz4nLCB0YWdTdGFydCArIDIpXG4gICk7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGxvYWRDaGVlcmlvUm9vdChodG1sKSB7XG4gIGlmICghaHRtbCkge1xuICAgIHJldHVybiBjaGVlcmlvLnJvb3QoKTtcbiAgfVxuXG4gIGlmICghaXNIdG1sKGh0bWwpKSB7XG4gICAgLy8gY3JlYXRlIGZyYWdtZW50IHdpdGggaXNEb2N1bWVudD1mYWxzZVxuICAgIHJldHVybiBjaGVlcmlvLmxvYWQoaHRtbCwgbnVsbCwgZmFsc2UpLnJvb3QoKTtcbiAgfVxuXG4gIHJldHVybiBjaGVlcmlvLmxv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
//# sourceMappingURL=Utils.js.map