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
var _cheerio = _interopRequireDefault(require("cheerio"));
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
    return _cheerio["default"].root();
  }
  if (!isHtml(html)) {
    // create fragment with isDocument=false
    return _cheerio["default"].load(html, null, false).root();
  }
  return _cheerio["default"].load(html).root();
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfbG9kYXNoIiwiX2ludGVyb3BSZXF1aXJlRGVmYXVsdCIsInJlcXVpcmUiLCJfb2JqZWN0SXMiLCJfb2JqZWN0IiwiX29iamVjdDIiLCJfZnVuY3Rpb25Qcm90b3R5cGUiLCJfaGFzb3duIiwiX2FycmF5UHJvdG90eXBlIiwiX3N0cmluZ1Byb3RvdHlwZSIsIl9jaGVlcmlvIiwiX2NvbmZpZ3VyYXRpb24iLCJfUlNUVHJhdmVyc2FsIiwiX2dldEFkYXB0ZXIiLCJfdmFsaWRhdGVBZGFwdGVyIiwiX2VuenltZVNoYWxsb3dFcXVhbCIsIl9leGNsdWRlZCIsImUiLCJfX2VzTW9kdWxlIiwiX3R5cGVvZiIsIm8iLCJTeW1ib2wiLCJpdGVyYXRvciIsImNvbnN0cnVjdG9yIiwicHJvdG90eXBlIiwiX3NsaWNlZFRvQXJyYXkiLCJyIiwiX2FycmF5V2l0aEhvbGVzIiwiX2l0ZXJhYmxlVG9BcnJheUxpbWl0IiwiX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5IiwiX25vbkl0ZXJhYmxlUmVzdCIsIlR5cGVFcnJvciIsImEiLCJfYXJyYXlMaWtlVG9BcnJheSIsInQiLCJ0b1N0cmluZyIsImNhbGwiLCJzbGljZSIsIm5hbWUiLCJBcnJheSIsImZyb20iLCJ0ZXN0IiwibGVuZ3RoIiwibiIsImwiLCJpIiwidSIsImYiLCJuZXh0IiwiT2JqZWN0IiwiZG9uZSIsInB1c2giLCJ2YWx1ZSIsImlzQXJyYXkiLCJvd25LZXlzIiwia2V5cyIsImdldE93blByb3BlcnR5U3ltYm9scyIsImZpbHRlciIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsImVudW1lcmFibGUiLCJhcHBseSIsIl9vYmplY3RTcHJlYWQiLCJhcmd1bWVudHMiLCJmb3JFYWNoIiwiX2RlZmluZVByb3BlcnR5IiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyIsImRlZmluZVByb3BlcnRpZXMiLCJkZWZpbmVQcm9wZXJ0eSIsIl90b1Byb3BlcnR5S2V5IiwiY29uZmlndXJhYmxlIiwid3JpdGFibGUiLCJfdG9QcmltaXRpdmUiLCJ0b1ByaW1pdGl2ZSIsIlN0cmluZyIsIk51bWJlciIsIl9vYmplY3RXaXRob3V0UHJvcGVydGllcyIsIl9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlIiwiaW5kZXhPZiIsInByb3BlcnR5SXNFbnVtZXJhYmxlIiwiaGFzT3duUHJvcGVydHkiLCJJVEVSQVRPUl9TWU1CT0wiLCJleHBvcnRzIiwiZ2V0QWRhcHRlciIsIm9wdGlvbnMiLCJ1bmRlZmluZWQiLCJjb25zb2xlIiwid2FybiIsInJlYWxHZXRBZGFwdGVyIiwidmFsaWRhdGVNb3VudE9wdGlvbnMiLCJhdHRhY2hUbyIsImh5ZHJhdGVJbiIsIm1ha2VPcHRpb25zIiwiX2dldCIsImdldCIsImNvbmZpZ0F0dGFjaFRvIiwiY29uZmlnSHlkcmF0ZUluIiwiY29uZmlnIiwiZmluYWxBdHRhY2hUbyIsImZpbmFsSHlkcmF0ZUluIiwibW91bnRUYXJnZXRzIiwiaXNDdXN0b21Db21wb25lbnQiLCJjb21wb25lbnQiLCJhZGFwdGVyIiwidmFsaWRhdGVBZGFwdGVyIiwiaXNDdXN0b21Db21wb25lbnRFbGVtZW50IiwiaW5zdCIsImlzVmFsaWRFbGVtZW50IiwidHlwZSIsInByb3BzT2ZOb2RlIiwibm9kZSIsIm5ld0VudHJpZXMiLCJlbnRyaWVzIiwicHJvcHMiLCJfcmVmIiwiX3JlZjIiLCJmcm9tRW50cmllcyIsInR5cGVPZk5vZGUiLCJub2RlSGFzVHlwZSIsImRpc3BsYXlOYW1lT2ZOb2RlIiwiZGlzcGxheU5hbWUiLCJmdW5jdGlvbk5hbWUiLCJpbnRlcm5hbENoaWxkcmVuQ29tcGFyZSIsImIiLCJsZW5Db21wIiwiaXNMb29zZSIsIm5vZGVDb21wYXJlIiwibm9kZU1hdGNoZXMiLCJub2RlRXF1YWwiLCJmbGF0QSIsImZsYXQiLCJJbmZpbml0eSIsImZsYXRCIiwiY2hpbGRyZW5NYXRjaCIsImNoaWxkcmVuRXF1YWwiLCJyZW1vdmVOdWxsYXJ5UmVkdWNlciIsImFjYyIsIl9yZWYzIiwiX3JlZjQiLCJrZXkiLCJhZGRpdGlvbiIsImludGVybmFsTm9kZUNvbXBhcmUiLCJsZWZ0IiwicmlnaHQiLCJyZWR1Y2UiLCJsZWZ0S2V5cyIsInByb3AiLCJpc0VxdWFsIiwibGVmdEhhc0NoaWxkcmVuIiwicmlnaHRIYXNDaGlsZHJlbiIsImNoaWxkQ29tcGFyZSIsImNoaWxkcmVuVG9TaW1wbGlmaWVkQXJyYXkiLCJjaGlsZHJlbiIsImlzVGV4dHVhbE5vZGUiLCJyaWdodEtleXMiLCJpcyIsImNvbnRhaW5zQ2hpbGRyZW5TdWJBcnJheSIsIm1hdGNoIiwic3ViQXJyYXkiLCJjaGlsZHJlbk9mTm9kZSIsImNoZWNrZXIiLCJfIiwiYXJyYXlzRXF1YWwiLCJzb21lIiwiZXZlcnkiLCJlbCIsImNoaWxkcmVuVG9BcnJheSIsInJlc3VsdCIsIm5vZGVDaGlsZHJlbiIsImNoaWxkcmVuQXJyYXkiLCJzaW1wbGlmaWVkQXJyYXkiLCJjaGlsZCIsInByZXZpb3VzQ2hpbGQiLCJwb3AiLCJtYXAiLCJ4IiwidHJpbSIsImlzUmVhY3RFbGVtZW50QWxpa2UiLCJhcmciLCJ3aXRoU2V0U3RhdGVBbGxvd2VkIiwiZm4iLCJjbGVhbnVwIiwiZ2xvYmFsIiwiZG9jdW1lbnQiLCJBTkQiLCJmbnMiLCJmbnNSZXZlcnNlZCIsInJldmVyc2UiLCJzeW0iLCJzIiwiY29uY2F0IiwicHJpdmF0ZVNldCIsIm9iaiIsImNsb25lRWxlbWVudCIsImNyZWF0ZUVsZW1lbnQiLCJzcHlNZXRob2QiLCJpbnN0YW5jZSIsIm1ldGhvZE5hbWUiLCJnZXRTdHViIiwibGFzdFJldHVyblZhbHVlIiwib3JpZ2luYWxNZXRob2QiLCJoYXNPd25Qcm9wIiwiaGFzT3duIiwiZGVzY3JpcHRvciIsInNwaWVkIiwiX2xlbiIsImFyZ3MiLCJfa2V5IiwicmVzdG9yZSIsImdldExhc3RSZXR1cm5WYWx1ZSIsInNweVByb3BlcnR5IiwicHJvcGVydHlOYW1lIiwiaGFuZGxlcnMiLCJvcmlnaW5hbFZhbHVlIiwid2FzQXNzaWduZWQiLCJob2xkZXIiLCJnZXRWIiwic2V0IiwibmV3VmFsdWUiLCJoYW5kbGVyTmV3VmFsdWUiLCJ2IiwiaXNFbXB0eVZhbHVlIiwicmVuZGVyZWRWYWx1ZSIsInJlbmRlcmVkRGl2ZSIsIm5vZGVzIiwicmVuZGVyZWQiLCJpc0h0bWwiLCJzdHIiLCJ0YWdTdGFydCIsInRhZ0NoYXIiLCJjaGFyQ29kZUF0IiwiTG93ZXJBIiwiTG93ZXJaIiwiVXBwZXJBIiwiVXBwZXJaIiwiRXhjbGFtYXRpb24iLCJpbmNsdWRlcyIsImxvYWRDaGVlcmlvUm9vdCIsImh0bWwiLCJjaGVlcmlvIiwicm9vdCIsImxvYWQiXSwic291cmNlcyI6WyIuLi9zcmMvVXRpbHMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50IG5vLXVzZS1iZWZvcmUtZGVmaW5lOiAwICovXG5pbXBvcnQgaXNFcXVhbCBmcm9tICdsb2Rhc2guaXNlcXVhbCc7XG5pbXBvcnQgaXMgZnJvbSAnb2JqZWN0LWlzJztcbmltcG9ydCBlbnRyaWVzIGZyb20gJ29iamVjdC5lbnRyaWVzJztcbmltcG9ydCBmcm9tRW50cmllcyBmcm9tICdvYmplY3QuZnJvbWVudHJpZXMnO1xuaW1wb3J0IGZ1bmN0aW9uTmFtZSBmcm9tICdmdW5jdGlvbi5wcm90b3R5cGUubmFtZSc7XG5pbXBvcnQgaGFzT3duIGZyb20gJ2hhc293bic7XG5pbXBvcnQgZmxhdCBmcm9tICdhcnJheS5wcm90b3R5cGUuZmxhdCc7XG5pbXBvcnQgdHJpbSBmcm9tICdzdHJpbmcucHJvdG90eXBlLnRyaW0nO1xuaW1wb3J0IGNoZWVyaW8gZnJvbSAnY2hlZXJpbyc7XG5cbmltcG9ydCB7IGdldCB9IGZyb20gJy4vY29uZmlndXJhdGlvbic7XG5pbXBvcnQgeyBjaGlsZHJlbk9mTm9kZSB9IGZyb20gJy4vUlNUVHJhdmVyc2FsJztcbmltcG9ydCByZWFsR2V0QWRhcHRlciBmcm9tICcuL2dldEFkYXB0ZXInO1xuaW1wb3J0IHZhbGlkYXRlQWRhcHRlciBmcm9tICcuL3ZhbGlkYXRlQWRhcHRlcic7XG5cbmV4cG9ydCBjb25zdCBJVEVSQVRPUl9TWU1CT0wgPSB0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIFN5bWJvbC5pdGVyYXRvcjtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldEFkYXB0ZXIob3B0aW9ucyA9IHt9KSB7XG4gIGNvbnNvbGUud2FybignZ2V0QWRhcHRlciBmcm9tIFV0aWxzIGlzIGRlcHJlY2F0ZWQ7IHBsZWFzZSB1c2UgLi9nZXRBZGFwdGVyIGluc3RlYWQnKTtcbiAgcmV0dXJuIHJlYWxHZXRBZGFwdGVyKG9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZU1vdW50T3B0aW9ucyhhdHRhY2hUbywgaHlkcmF0ZUluKSB7XG4gIGlmIChhdHRhY2hUbyAmJiBoeWRyYXRlSW4gJiYgYXR0YWNoVG8gIT09IGh5ZHJhdGVJbikge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0lmIGJvdGggdGhlIGBhdHRhY2hUb2AgYW5kIGBoeWRyYXRlSW5gIG9wdGlvbnMgYXJlIHByb3ZpZGVkLCB0aGV5IG11c3QgYmUgPT09IChmb3IgYmFja3dhcmRzIGNvbXBhdGliaWxpdHkpJyk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1ha2VPcHRpb25zKG9wdGlvbnMpIHtcbiAgY29uc3QgeyBhdHRhY2hUbzogY29uZmlnQXR0YWNoVG8sIGh5ZHJhdGVJbjogY29uZmlnSHlkcmF0ZUluLCAuLi5jb25maWcgfSA9IGdldCgpO1xuICB2YWxpZGF0ZU1vdW50T3B0aW9ucyhjb25maWdBdHRhY2hUbywgY29uZmlnSHlkcmF0ZUluKTtcblxuICBjb25zdCB7IGF0dGFjaFRvLCBoeWRyYXRlSW4gfSA9IG9wdGlvbnM7XG4gIHZhbGlkYXRlTW91bnRPcHRpb25zKGF0dGFjaFRvLCBoeWRyYXRlSW4pO1xuXG4gIC8vIG5laXRoZXIgcHJlc2VudDogYm90aCB1bmRlZmluZWRcbiAgLy8gb25seSBhdHRhY2hUbyBwcmVzZW50OiBhdHRhY2hUbyBzZXQsIGh5ZHJhdGVJbiB1bmRlZmluZWRcbiAgLy8gb25seSBoeWRyYXRlSW4gcHJlc2VudDogYm90aCBzZXQgdG8gaHlkcmF0ZUluXG4gIC8vIGJvdGggcHJlc2VudCAoYW5kID09PSwgcGVyIGFib3ZlKTogYm90aCBzZXQgdG8gaHlkcmF0ZUluXG4gIGNvbnN0IGZpbmFsQXR0YWNoVG8gPSBoeWRyYXRlSW4gfHwgY29uZmlnSHlkcmF0ZUluIHx8IGNvbmZpZ0F0dGFjaFRvIHx8IGF0dGFjaFRvIHx8IHVuZGVmaW5lZDtcbiAgY29uc3QgZmluYWxIeWRyYXRlSW4gPSBoeWRyYXRlSW4gfHwgY29uZmlnSHlkcmF0ZUluIHx8IHVuZGVmaW5lZDtcbiAgY29uc3QgbW91bnRUYXJnZXRzID0ge1xuICAgIC4uLihmaW5hbEF0dGFjaFRvICYmIHsgYXR0YWNoVG86IGZpbmFsQXR0YWNoVG8gfSksXG4gICAgLi4uKGZpbmFsSHlkcmF0ZUluICYmIHsgaHlkcmF0ZUluOiBmaW5hbEh5ZHJhdGVJbiB9KSxcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIC4uLmNvbmZpZyxcbiAgICAuLi5vcHRpb25zLFxuICAgIC4uLm1vdW50VGFyZ2V0cyxcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQ3VzdG9tQ29tcG9uZW50KGNvbXBvbmVudCwgYWRhcHRlcikge1xuICB2YWxpZGF0ZUFkYXB0ZXIoYWRhcHRlcik7XG4gIGlmIChhZGFwdGVyLmlzQ3VzdG9tQ29tcG9uZW50KSB7XG4gICAgcmV0dXJuICEhYWRhcHRlci5pc0N1c3RvbUNvbXBvbmVudChjb21wb25lbnQpO1xuICB9XG4gIHJldHVybiB0eXBlb2YgY29tcG9uZW50ID09PSAnZnVuY3Rpb24nO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNDdXN0b21Db21wb25lbnRFbGVtZW50KGluc3QsIGFkYXB0ZXIpIHtcbiAgaWYgKGFkYXB0ZXIuaXNDdXN0b21Db21wb25lbnRFbGVtZW50KSB7XG4gICAgcmV0dXJuICEhYWRhcHRlci5pc0N1c3RvbUNvbXBvbmVudEVsZW1lbnQoaW5zdCk7XG4gIH1cbiAgcmV0dXJuICEhaW5zdCAmJiBhZGFwdGVyLmlzVmFsaWRFbGVtZW50KGluc3QpICYmIHR5cGVvZiBpbnN0LnR5cGUgPT09ICdmdW5jdGlvbic7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcm9wc09mTm9kZShub2RlKSB7XG4gIGNvbnN0IG5ld0VudHJpZXMgPSBlbnRyaWVzKChub2RlICYmIG5vZGUucHJvcHMpIHx8IHt9KVxuICAgIC5maWx0ZXIoKFssIHZhbHVlXSkgPT4gdHlwZW9mIHZhbHVlICE9PSAndW5kZWZpbmVkJyk7XG4gIHJldHVybiBmcm9tRW50cmllcyhuZXdFbnRyaWVzKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHR5cGVPZk5vZGUobm9kZSkge1xuICByZXR1cm4gbm9kZSA/IG5vZGUudHlwZSA6IG51bGw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBub2RlSGFzVHlwZShub2RlLCB0eXBlKSB7XG4gIGlmICghdHlwZSB8fCAhbm9kZSkgcmV0dXJuIGZhbHNlO1xuXG4gIGNvbnN0IGFkYXB0ZXIgPSByZWFsR2V0QWRhcHRlcigpO1xuICBpZiAoYWRhcHRlci5kaXNwbGF5TmFtZU9mTm9kZSkge1xuICAgIGNvbnN0IGRpc3BsYXlOYW1lID0gYWRhcHRlci5kaXNwbGF5TmFtZU9mTm9kZShub2RlKTtcbiAgICByZXR1cm4gZGlzcGxheU5hbWUgPT09IHR5cGU7XG4gIH1cblxuICBpZiAoIW5vZGUudHlwZSkgcmV0dXJuIGZhbHNlO1xuICBpZiAodHlwZW9mIG5vZGUudHlwZSA9PT0gJ3N0cmluZycpIHJldHVybiBub2RlLnR5cGUgPT09IHR5cGU7XG4gIHJldHVybiAoXG4gICAgdHlwZW9mIG5vZGUudHlwZSA9PT0gJ2Z1bmN0aW9uJyA/IGZ1bmN0aW9uTmFtZShub2RlLnR5cGUpID09PSB0eXBlIDogbm9kZS50eXBlLm5hbWUgPT09IHR5cGVcbiAgKSB8fCBub2RlLnR5cGUuZGlzcGxheU5hbWUgPT09IHR5cGU7XG59XG5cbmZ1bmN0aW9uIGludGVybmFsQ2hpbGRyZW5Db21wYXJlKGEsIGIsIGxlbkNvbXAsIGlzTG9vc2UpIHtcbiAgY29uc3Qgbm9kZUNvbXBhcmUgPSBpc0xvb3NlID8gbm9kZU1hdGNoZXMgOiBub2RlRXF1YWw7XG5cbiAgaWYgKGEgPT09IGIpIHJldHVybiB0cnVlO1xuICBpZiAoIUFycmF5LmlzQXJyYXkoYSkgJiYgIUFycmF5LmlzQXJyYXkoYikpIHtcbiAgICByZXR1cm4gbm9kZUNvbXBhcmUoYSwgYiwgbGVuQ29tcCk7XG4gIH1cbiAgY29uc3QgZmxhdEEgPSBmbGF0KGEsIEluZmluaXR5KTtcbiAgY29uc3QgZmxhdEIgPSBmbGF0KGIsIEluZmluaXR5KTtcbiAgaWYgKGZsYXRBLmxlbmd0aCAhPT0gZmxhdEIubGVuZ3RoKSByZXR1cm4gZmFsc2U7XG4gIGlmIChmbGF0QS5sZW5ndGggPT09IDAgJiYgZmxhdEIubGVuZ3RoID09PSAwKSByZXR1cm4gdHJ1ZTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBmbGF0QS5sZW5ndGg7IGkgKz0gMSkge1xuICAgIGlmICghbm9kZUNvbXBhcmUoZmxhdEFbaV0sIGZsYXRCW2ldLCBsZW5Db21wKSkgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBjaGlsZHJlbk1hdGNoKGEsIGIsIGxlbkNvbXApIHtcbiAgcmV0dXJuIGludGVybmFsQ2hpbGRyZW5Db21wYXJlKGEsIGIsIGxlbkNvbXAsIHRydWUpO1xufVxuXG5mdW5jdGlvbiBjaGlsZHJlbkVxdWFsKGEsIGIsIGxlbkNvbXApIHtcbiAgcmV0dXJuIGludGVybmFsQ2hpbGRyZW5Db21wYXJlKGEsIGIsIGxlbkNvbXAsIGZhbHNlKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlTnVsbGFyeVJlZHVjZXIoYWNjLCBba2V5LCB2YWx1ZV0pIHtcbiAgY29uc3QgYWRkaXRpb24gPSB2YWx1ZSA9PSBudWxsID8ge30gOiB7IFtrZXldOiB2YWx1ZSB9O1xuICByZXR1cm4geyAuLi5hY2MsIC4uLmFkZGl0aW9uIH07XG59XG5cbmZ1bmN0aW9uIGludGVybmFsTm9kZUNvbXBhcmUoYSwgYiwgbGVuQ29tcCwgaXNMb29zZSkge1xuICBpZiAoYSA9PT0gYikgcmV0dXJuIHRydWU7XG4gIGlmICghYSB8fCAhYikgcmV0dXJuIGZhbHNlO1xuICBpZiAoYS50eXBlICE9PSBiLnR5cGUpIHJldHVybiBmYWxzZTtcblxuICBsZXQgbGVmdCA9IHByb3BzT2ZOb2RlKGEpO1xuICBsZXQgcmlnaHQgPSBwcm9wc09mTm9kZShiKTtcbiAgaWYgKGlzTG9vc2UpIHtcbiAgICBsZWZ0ID0gZW50cmllcyhsZWZ0KS5yZWR1Y2UocmVtb3ZlTnVsbGFyeVJlZHVjZXIsIHt9KTtcbiAgICByaWdodCA9IGVudHJpZXMocmlnaHQpLnJlZHVjZShyZW1vdmVOdWxsYXJ5UmVkdWNlciwge30pO1xuICB9XG5cbiAgY29uc3QgbGVmdEtleXMgPSBPYmplY3Qua2V5cyhsZWZ0KTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZWZ0S2V5cy5sZW5ndGg7IGkgKz0gMSkge1xuICAgIGNvbnN0IHByb3AgPSBsZWZ0S2V5c1tpXTtcbiAgICAvLyB3ZSB3aWxsIGNoZWNrIGNoaWxkcmVuIGxhdGVyXG4gICAgaWYgKHByb3AgPT09ICdjaGlsZHJlbicpIHtcbiAgICAgIC8vIGNvbnRpbnVlO1xuICAgIH0gZWxzZSBpZiAoIShwcm9wIGluIHJpZ2h0KSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZWxzZSBpZiAocmlnaHRbcHJvcF0gPT09IGxlZnRbcHJvcF0pIHtcbiAgICAgIC8vIGNvbnRpbnVlO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHJpZ2h0W3Byb3BdID09PSB0eXBlb2YgbGVmdFtwcm9wXSAmJiB0eXBlb2YgbGVmdFtwcm9wXSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGlmICghaXNFcXVhbChsZWZ0W3Byb3BdLCByaWdodFtwcm9wXSkpIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGxlZnRIYXNDaGlsZHJlbiA9ICdjaGlsZHJlbicgaW4gbGVmdDtcbiAgY29uc3QgcmlnaHRIYXNDaGlsZHJlbiA9ICdjaGlsZHJlbicgaW4gcmlnaHQ7XG4gIGNvbnN0IGNoaWxkQ29tcGFyZSA9IGlzTG9vc2UgPyBjaGlsZHJlbk1hdGNoIDogY2hpbGRyZW5FcXVhbDtcbiAgaWYgKGxlZnRIYXNDaGlsZHJlbiB8fCByaWdodEhhc0NoaWxkcmVuKSB7XG4gICAgaWYgKCFjaGlsZENvbXBhcmUoXG4gICAgICBjaGlsZHJlblRvU2ltcGxpZmllZEFycmF5KGxlZnQuY2hpbGRyZW4sIGlzTG9vc2UpLFxuICAgICAgY2hpbGRyZW5Ub1NpbXBsaWZpZWRBcnJheShyaWdodC5jaGlsZHJlbiwgaXNMb29zZSksXG4gICAgICBsZW5Db21wLFxuICAgICkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBpZiAoIWlzVGV4dHVhbE5vZGUoYSkpIHtcbiAgICBjb25zdCByaWdodEtleXMgPSBPYmplY3Qua2V5cyhyaWdodCk7XG4gICAgcmV0dXJuIGxlbkNvbXAobGVmdEtleXMubGVuZ3RoIC0gbGVmdEhhc0NoaWxkcmVuLCByaWdodEtleXMubGVuZ3RoIC0gcmlnaHRIYXNDaGlsZHJlbik7XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBub2RlTWF0Y2hlcyhhLCBiLCBsZW5Db21wID0gaXMpIHtcbiAgcmV0dXJuIGludGVybmFsTm9kZUNvbXBhcmUoYSwgYiwgbGVuQ29tcCwgdHJ1ZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBub2RlRXF1YWwoYSwgYiwgbGVuQ29tcCA9IGlzKSB7XG4gIHJldHVybiBpbnRlcm5hbE5vZGVDb21wYXJlKGEsIGIsIGxlbkNvbXAsIGZhbHNlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbnRhaW5zQ2hpbGRyZW5TdWJBcnJheShtYXRjaCwgbm9kZSwgc3ViQXJyYXkpIHtcbiAgY29uc3QgY2hpbGRyZW4gPSBjaGlsZHJlbk9mTm9kZShub2RlKTtcbiAgY29uc3QgY2hlY2tlciA9IChfLCBpKSA9PiBhcnJheXNFcXVhbChtYXRjaCwgY2hpbGRyZW4uc2xpY2UoaSwgaSArIHN1YkFycmF5Lmxlbmd0aCksIHN1YkFycmF5KTtcbiAgcmV0dXJuIGNoaWxkcmVuLnNvbWUoY2hlY2tlcik7XG59XG5cbmZ1bmN0aW9uIGFycmF5c0VxdWFsKG1hdGNoLCBsZWZ0LCByaWdodCkge1xuICByZXR1cm4gbGVmdC5sZW5ndGggPT09IHJpZ2h0Lmxlbmd0aCAmJiBsZWZ0LmV2ZXJ5KChlbCwgaSkgPT4gbWF0Y2goZWwsIHJpZ2h0W2ldKSk7XG59XG5cbmZ1bmN0aW9uIGNoaWxkcmVuVG9BcnJheShjaGlsZHJlbikge1xuICBjb25zdCByZXN1bHQgPSBbXTtcblxuICBjb25zdCBwdXNoID0gKGVsKSA9PiB7XG4gICAgaWYgKGVsID09PSBudWxsIHx8IGVsID09PSBmYWxzZSB8fCB0eXBlb2YgZWwgPT09ICd1bmRlZmluZWQnKSByZXR1cm47XG4gICAgcmVzdWx0LnB1c2goZWwpO1xuICB9O1xuXG4gIGlmIChBcnJheS5pc0FycmF5KGNoaWxkcmVuKSkge1xuICAgIGNoaWxkcmVuLmZvckVhY2gocHVzaCk7XG4gIH0gZWxzZSB7XG4gICAgcHVzaChjaGlsZHJlbik7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNoaWxkcmVuVG9TaW1wbGlmaWVkQXJyYXkobm9kZUNoaWxkcmVuLCBpc0xvb3NlID0gZmFsc2UpIHtcbiAgY29uc3QgY2hpbGRyZW5BcnJheSA9IGNoaWxkcmVuVG9BcnJheShub2RlQ2hpbGRyZW4pO1xuICBjb25zdCBzaW1wbGlmaWVkQXJyYXkgPSBbXTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGNoaWxkcmVuQXJyYXkubGVuZ3RoOyBpICs9IDEpIHtcbiAgICBjb25zdCBjaGlsZCA9IGNoaWxkcmVuQXJyYXlbaV07XG4gICAgY29uc3QgcHJldmlvdXNDaGlsZCA9IHNpbXBsaWZpZWRBcnJheS5wb3AoKTtcblxuICAgIGlmICh0eXBlb2YgcHJldmlvdXNDaGlsZCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHNpbXBsaWZpZWRBcnJheS5wdXNoKGNoaWxkKTtcbiAgICB9IGVsc2UgaWYgKGlzVGV4dHVhbE5vZGUoY2hpbGQpICYmIGlzVGV4dHVhbE5vZGUocHJldmlvdXNDaGlsZCkpIHtcbiAgICAgIHNpbXBsaWZpZWRBcnJheS5wdXNoKHByZXZpb3VzQ2hpbGQgKyBjaGlsZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNpbXBsaWZpZWRBcnJheS5wdXNoKHByZXZpb3VzQ2hpbGQpO1xuICAgICAgc2ltcGxpZmllZEFycmF5LnB1c2goY2hpbGQpO1xuICAgIH1cbiAgfVxuXG4gIGlmIChpc0xvb3NlKSB7XG4gICAgcmV0dXJuIHNpbXBsaWZpZWRBcnJheS5tYXAoKHgpID0+ICh0eXBlb2YgeCA9PT0gJ3N0cmluZycgPyB0cmltKHgpIDogeCkpO1xuICB9XG5cbiAgcmV0dXJuIHNpbXBsaWZpZWRBcnJheTtcbn1cblxuZnVuY3Rpb24gaXNUZXh0dWFsTm9kZShub2RlKSB7XG4gIHJldHVybiB0eXBlb2Ygbm9kZSA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIG5vZGUgPT09ICdudW1iZXInO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNSZWFjdEVsZW1lbnRBbGlrZShhcmcsIGFkYXB0ZXIpIHtcbiAgcmV0dXJuIGFkYXB0ZXIuaXNWYWxpZEVsZW1lbnQoYXJnKSB8fCBpc1RleHR1YWxOb2RlKGFyZykgfHwgQXJyYXkuaXNBcnJheShhcmcpO1xufVxuXG4vLyBUT0RPKGxtcik6IGNhbiB3ZSBnZXQgcmlkIG9mIHRoaXMgb3V0c2lkZSBvZiB0aGUgYWRhcHRlcj9cbmV4cG9ydCBmdW5jdGlvbiB3aXRoU2V0U3RhdGVBbGxvd2VkKGZuKSB7XG4gIC8vIE5PVEUobG1yKTpcbiAgLy8gdGhpcyBpcyBjdXJyZW50bHkgaGVyZSB0byBjaXJjdW12ZW50IGEgUmVhY3QgYnVnIHdoZXJlIGBzZXRTdGF0ZSgpYCBpc1xuICAvLyBub3QgYWxsb3dlZCB3aXRob3V0IGdsb2JhbCBiZWluZyBkZWZpbmVkLlxuICBsZXQgY2xlYW51cCA9IGZhbHNlO1xuICBpZiAodHlwZW9mIGdsb2JhbC5kb2N1bWVudCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBjbGVhbnVwID0gdHJ1ZTtcbiAgICBnbG9iYWwuZG9jdW1lbnQgPSB7fTtcbiAgfVxuICBmbigpO1xuICBpZiAoY2xlYW51cCkge1xuICAgIC8vIFRoaXMgd29ya3MgYXJvdW5kIGEgYnVnIGluIG5vZGUvamVzdCBpbiB0aGF0IGRldmVsb3BlcnMgYXJlbid0IGFibGUgdG9cbiAgICAvLyBkZWxldGUgdGhpbmdzIGZyb20gZ2xvYmFsIHdoZW4gcnVubmluZyBpbiBhIG5vZGUgdm0uXG4gICAgZ2xvYmFsLmRvY3VtZW50ID0gdW5kZWZpbmVkO1xuICAgIGRlbGV0ZSBnbG9iYWwuZG9jdW1lbnQ7XG4gIH1cbn1cblxuLy8gVE9ETywgc2VtdmVyLW1ham9yOiByZW1vdmUgdGhpc1xuZXhwb3J0IGZ1bmN0aW9uIEFORChmbnMpIHtcbiAgY29uc3QgZm5zUmV2ZXJzZWQgPSBmbnMuc2xpY2UoKS5yZXZlcnNlKCk7XG4gIHJldHVybiAoeCkgPT4gZm5zUmV2ZXJzZWQuZXZlcnkoKGZuKSA9PiBmbih4KSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkaXNwbGF5TmFtZU9mTm9kZShub2RlKSB7XG4gIGlmICghbm9kZSkgcmV0dXJuIG51bGw7XG5cbiAgY29uc3QgeyB0eXBlIH0gPSBub2RlO1xuXG4gIGlmICghdHlwZSkgcmV0dXJuIG51bGw7XG5cbiAgcmV0dXJuIHR5cGUuZGlzcGxheU5hbWUgfHwgKHR5cGVvZiB0eXBlID09PSAnZnVuY3Rpb24nID8gZnVuY3Rpb25OYW1lKHR5cGUpIDogdHlwZS5uYW1lIHx8IHR5cGUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3ltKHMpIHtcbiAgcmV0dXJuIHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgPyBTeW1ib2wuZm9yKGBlbnp5bWUuJHtzfWApIDogcztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHByaXZhdGVTZXQob2JqLCBwcm9wLCB2YWx1ZSkge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBwcm9wLCB7XG4gICAgdmFsdWUsXG4gICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgd3JpdGFibGU6IHRydWUsXG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xvbmVFbGVtZW50KGFkYXB0ZXIsIGVsLCBwcm9wcykge1xuICByZXR1cm4gYWRhcHRlci5jcmVhdGVFbGVtZW50KFxuICAgIGVsLnR5cGUsXG4gICAgeyAuLi5lbC5wcm9wcywgLi4ucHJvcHMgfSxcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNweU1ldGhvZChpbnN0YW5jZSwgbWV0aG9kTmFtZSwgZ2V0U3R1YiA9ICgpID0+IHt9KSB7XG4gIGxldCBsYXN0UmV0dXJuVmFsdWU7XG4gIGNvbnN0IG9yaWdpbmFsTWV0aG9kID0gaW5zdGFuY2VbbWV0aG9kTmFtZV07XG4gIGNvbnN0IGhhc093blByb3AgPSBoYXNPd24oaW5zdGFuY2UsIG1ldGhvZE5hbWUpO1xuICBsZXQgZGVzY3JpcHRvcjtcbiAgaWYgKGhhc093blByb3ApIHtcbiAgICBkZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihpbnN0YW5jZSwgbWV0aG9kTmFtZSk7XG4gIH1cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGluc3RhbmNlLCBtZXRob2ROYW1lLCB7XG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIGVudW1lcmFibGU6ICFkZXNjcmlwdG9yIHx8ICEhZGVzY3JpcHRvci5lbnVtZXJhYmxlLFxuICAgIHZhbHVlOiBnZXRTdHViKG9yaWdpbmFsTWV0aG9kKSB8fCBmdW5jdGlvbiBzcGllZCguLi5hcmdzKSB7XG4gICAgICBjb25zdCByZXN1bHQgPSBvcmlnaW5hbE1ldGhvZC5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgIGxhc3RSZXR1cm5WYWx1ZSA9IHJlc3VsdDtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSxcbiAgfSk7XG4gIHJldHVybiB7XG4gICAgcmVzdG9yZSgpIHtcbiAgICAgIGlmIChoYXNPd25Qcm9wKSB7XG4gICAgICAgIGlmIChkZXNjcmlwdG9yKSB7XG4gICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGluc3RhbmNlLCBtZXRob2ROYW1lLCBkZXNjcmlwdG9yKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1wYXJhbS1yZWFzc2lnbiAqL1xuICAgICAgICAgIGluc3RhbmNlW21ldGhvZE5hbWVdID0gb3JpZ2luYWxNZXRob2Q7XG4gICAgICAgICAgLyogZXNsaW50LWVuYWJsZSBuby1wYXJhbS1yZWFzc2lnbiAqL1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1wYXJhbS1yZWFzc2lnbiAqL1xuICAgICAgICBkZWxldGUgaW5zdGFuY2VbbWV0aG9kTmFtZV07XG4gICAgICAgIC8qIGVzbGludC1lbmFibGUgbm8tcGFyYW0tcmVhc3NpZ24gKi9cbiAgICAgIH1cbiAgICB9LFxuICAgIGdldExhc3RSZXR1cm5WYWx1ZSgpIHtcbiAgICAgIHJldHVybiBsYXN0UmV0dXJuVmFsdWU7XG4gICAgfSxcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNweVByb3BlcnR5KGluc3RhbmNlLCBwcm9wZXJ0eU5hbWUsIGhhbmRsZXJzID0ge30pIHtcbiAgY29uc3Qgb3JpZ2luYWxWYWx1ZSA9IGluc3RhbmNlW3Byb3BlcnR5TmFtZV07XG4gIGNvbnN0IGhhc093blByb3AgPSBoYXNPd24oaW5zdGFuY2UsIHByb3BlcnR5TmFtZSk7XG4gIGxldCBkZXNjcmlwdG9yO1xuICBpZiAoaGFzT3duUHJvcCkge1xuICAgIGRlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGluc3RhbmNlLCBwcm9wZXJ0eU5hbWUpO1xuICB9XG4gIGxldCB3YXNBc3NpZ25lZCA9IGZhbHNlO1xuICBsZXQgaG9sZGVyID0gb3JpZ2luYWxWYWx1ZTtcbiAgY29uc3QgZ2V0ViA9IGhhbmRsZXJzLmdldCA/ICgpID0+IHtcbiAgICBjb25zdCB2YWx1ZSA9IGRlc2NyaXB0b3IgJiYgZGVzY3JpcHRvci5nZXQgPyBkZXNjcmlwdG9yLmdldC5jYWxsKGluc3RhbmNlKSA6IGhvbGRlcjtcbiAgICByZXR1cm4gaGFuZGxlcnMuZ2V0LmNhbGwoaW5zdGFuY2UsIHZhbHVlKTtcbiAgfSA6ICgpID0+IGhvbGRlcjtcbiAgY29uc3Qgc2V0ID0gaGFuZGxlcnMuc2V0ID8gKG5ld1ZhbHVlKSA9PiB7XG4gICAgd2FzQXNzaWduZWQgPSB0cnVlO1xuICAgIGNvbnN0IGhhbmRsZXJOZXdWYWx1ZSA9IGhhbmRsZXJzLnNldC5jYWxsKGluc3RhbmNlLCBob2xkZXIsIG5ld1ZhbHVlKTtcbiAgICBob2xkZXIgPSBoYW5kbGVyTmV3VmFsdWU7XG4gICAgaWYgKGRlc2NyaXB0b3IgJiYgZGVzY3JpcHRvci5zZXQpIHtcbiAgICAgIGRlc2NyaXB0b3Iuc2V0LmNhbGwoaW5zdGFuY2UsIGhvbGRlcik7XG4gICAgfVxuICB9IDogKHYpID0+IHtcbiAgICB3YXNBc3NpZ25lZCA9IHRydWU7XG4gICAgaG9sZGVyID0gdjtcbiAgfTtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGluc3RhbmNlLCBwcm9wZXJ0eU5hbWUsIHtcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgZW51bWVyYWJsZTogIWRlc2NyaXB0b3IgfHwgISFkZXNjcmlwdG9yLmVudW1lcmFibGUsXG4gICAgZ2V0OiBnZXRWLFxuICAgIHNldCxcbiAgfSk7XG5cbiAgcmV0dXJuIHtcbiAgICByZXN0b3JlKCkge1xuICAgICAgaWYgKGhhc093blByb3ApIHtcbiAgICAgICAgaWYgKGRlc2NyaXB0b3IpIHtcbiAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoaW5zdGFuY2UsIHByb3BlcnR5TmFtZSwgZGVzY3JpcHRvcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tcGFyYW0tcmVhc3NpZ24gKi9cbiAgICAgICAgICBpbnN0YW5jZVtwcm9wZXJ0eU5hbWVdID0gaG9sZGVyO1xuICAgICAgICAgIC8qIGVzbGludC1lbmFibGUgbm8tcGFyYW0tcmVhc3NpZ24gKi9cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tcGFyYW0tcmVhc3NpZ24gKi9cbiAgICAgICAgZGVsZXRlIGluc3RhbmNlW3Byb3BlcnR5TmFtZV07XG4gICAgICAgIC8qIGVzbGludC1lbmFibGUgbm8tcGFyYW0tcmVhc3NpZ24gKi9cbiAgICAgIH1cbiAgICB9LFxuICAgIHdhc0Fzc2lnbmVkKCkge1xuICAgICAgcmV0dXJuIHdhc0Fzc2lnbmVkO1xuICAgIH0sXG4gIH07XG59XG5cbmV4cG9ydCB7IGRlZmF1bHQgYXMgc2hhbGxvd0VxdWFsIH0gZnJvbSAnZW56eW1lLXNoYWxsb3ctZXF1YWwnO1xuXG5leHBvcnQgZnVuY3Rpb24gaXNFbXB0eVZhbHVlKHJlbmRlcmVkVmFsdWUpIHtcbiAgcmV0dXJuIHJlbmRlcmVkVmFsdWUgPT09IG51bGwgfHwgcmVuZGVyZWRWYWx1ZSA9PT0gZmFsc2U7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJlZERpdmUobm9kZXMpIHtcbiAgaWYgKGlzRW1wdHlWYWx1ZShub2RlcykpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHJldHVybiBbXS5jb25jYXQobm9kZXMpLmV2ZXJ5KChuKSA9PiB7XG4gICAgaWYgKG4pIHtcbiAgICAgIGNvbnN0IHsgcmVuZGVyZWQgfSA9IG47XG4gICAgICByZXR1cm4gaXNFbXB0eVZhbHVlKHJlbmRlcmVkKSB8fCByZW5kZXJlZERpdmUocmVuZGVyZWQpO1xuICAgIH1cblxuICAgIHJldHVybiBpc0VtcHR5VmFsdWUobik7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBpc0h0bWwoc3RyKSB7XG4gIGNvbnN0IHRhZ1N0YXJ0ID0gc3RyLmluZGV4T2YoJzwnKTtcbiAgaWYgKHRhZ1N0YXJ0ID09PSAtMSB8fCB0YWdTdGFydCA+IHN0ci5sZW5ndGggLSAzKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgY29uc3QgdGFnQ2hhciA9IHN0ci5jaGFyQ29kZUF0KHRhZ1N0YXJ0ICsgMSk7XG5cbiAgY29uc3QgTG93ZXJBID0gJ2EnLmNoYXJDb2RlQXQoMCk7IC8vIDk3XG4gIGNvbnN0IExvd2VyWiA9ICd6Jy5jaGFyQ29kZUF0KDApOyAvLyAxMjJcbiAgY29uc3QgVXBwZXJBID0gJ0EnLmNoYXJDb2RlQXQoMCk7IC8vIDY1XG4gIGNvbnN0IFVwcGVyWiA9ICdaJy5jaGFyQ29kZUF0KDApOyAvLyA5MFxuICBjb25zdCBFeGNsYW1hdGlvbiA9ICchJy5jaGFyQ29kZUF0KDApOyAvLyAzM1xuXG4gIHJldHVybiAoXG4gICAgKCh0YWdDaGFyID49IExvd2VyQSAmJiB0YWdDaGFyIDw9IExvd2VyWikgfHxcbiAgICAgICh0YWdDaGFyID49IFVwcGVyQSAmJiB0YWdDaGFyIDw9IFVwcGVyWikgfHxcbiAgICAgIHRhZ0NoYXIgPT09IEV4Y2xhbWF0aW9uKSAmJlxuICAgIHN0ci5pbmNsdWRlcygnPicsIHRhZ1N0YXJ0ICsgMilcbiAgKTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gbG9hZENoZWVyaW9Sb290KGh0bWwpIHtcbiAgaWYgKCFodG1sKSB7XG4gICAgcmV0dXJuIGNoZWVyaW8ucm9vdCgpO1xuICB9XG5cbiAgaWYgKCFpc0h0bWwoaHRtbCkpIHtcbiAgICAvLyBjcmVhdGUgZnJhZ21lbnQgd2l0aCBpc0RvY3VtZW50PWZhbHNlXG4gICAgcmV0dXJuIGNoZWVyaW8ubG9hZChodG1sLCBudWxsLCBmYWxzZSkucm9vdCgpO1xuICB9XG5cbiAgcmV0dXJuIGNoZWVyaW8ubG9hZChodG1sKS5yb290KCk7XG59XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7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
//# sourceMappingURL=Utils.js.map