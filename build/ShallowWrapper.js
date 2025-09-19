"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _arrayPrototype = _interopRequireDefault(require("array.prototype.flat"));
var _hasown = _interopRequireDefault(require("hasown"));
var _enzymeShallowEqual = _interopRequireDefault(require("enzyme-shallow-equal"));
var _stringPrototype = _interopRequireDefault(require("string.prototype.trim"));
var _Utils = require("./Utils");
var _getAdapter = _interopRequireDefault(require("./getAdapter"));
var _Debug = require("./Debug");
var _RSTTraversal = require("./RSTTraversal");
var _selectors = require("./selectors");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _superPropGet(t, o, e, r) { var p = _get(_getPrototypeOf(1 & r ? t.prototype : t), o, e); return 2 & r && "function" == typeof p ? function (t) { return p.apply(e, t); } : p; }
function _get() { return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) { var p = _superPropBase(e, t); if (p) { var n = Object.getOwnPropertyDescriptor(p, t); return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value; } }, _get.apply(null, arguments); }
function _superPropBase(t, o) { for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t));); return t; }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _construct(t, e, r) { if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && _setPrototypeOf(p, r.prototype), p; }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var NODE = (0, _Utils.sym)('__node__');
var NODES = (0, _Utils.sym)('__nodes__');
var RENDERER = (0, _Utils.sym)('__renderer__');
var UNRENDERED = (0, _Utils.sym)('__unrendered__');
var ROOT = (0, _Utils.sym)('__root__');
var OPTIONS = (0, _Utils.sym)('__options__');
var SET_STATE = (0, _Utils.sym)('__setState__');
var ROOT_NODES = (0, _Utils.sym)('__rootNodes__');
var CHILD_CONTEXT = (0, _Utils.sym)('__childContext__');
var WRAPPING_COMPONENT = (0, _Utils.sym)('__wrappingComponent__');
var PRIMARY_WRAPPER = (0, _Utils.sym)('__primaryWrapper__');
var ROOT_FINDER = (0, _Utils.sym)('__rootFinder__');
var PROVIDER_VALUES = (0, _Utils.sym)('__providerValues__');

/**
 * Finds all nodes in the current wrapper nodes' render trees that match the provided predicate
 * function.
 *
 * @param {ShallowWrapper} wrapper
 * @param {Function} predicate
 * @param {Function} filter
 * @returns {ShallowWrapper}
 */
function findWhereUnwrapped(wrapper, predicate) {
  var filter = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _RSTTraversal.treeFilter;
  return wrapper.flatMap(function (n) {
    return filter(n.getNodeInternal(), predicate);
  });
}

/**
 * Returns a new wrapper instance with only the nodes of the current wrapper instance that match
 * the provided predicate function.
 *
 * @param {ShallowWrapper} wrapper
 * @param {Function} predicate
 * @returns {ShallowWrapper}
 */
function filterWhereUnwrapped(wrapper, predicate) {
  return wrapper.wrap(wrapper.getNodesInternal().filter(predicate).filter(Boolean));
}

/**
 * Ensure options passed to ShallowWrapper are valid. Throws otherwise.
 * @param {Object} options
 */
function validateOptions(options) {
  var lifecycleExperimental = options.lifecycleExperimental,
    disableLifecycleMethods = options.disableLifecycleMethods,
    enableComponentDidUpdateOnSetState = options.enableComponentDidUpdateOnSetState,
    supportPrevContextArgumentOfComponentDidUpdate = options.supportPrevContextArgumentOfComponentDidUpdate,
    _options$lifecycles = options.lifecycles,
    lifecycles = _options$lifecycles === void 0 ? {} : _options$lifecycles;
  if (typeof lifecycleExperimental !== 'undefined' && typeof lifecycleExperimental !== 'boolean') {
    throw new Error('lifecycleExperimental must be either true or false if provided');
  }
  if (typeof disableLifecycleMethods !== 'undefined' && typeof disableLifecycleMethods !== 'boolean') {
    throw new Error('disableLifecycleMethods must be either true or false if provided');
  }
  if (lifecycleExperimental != null && disableLifecycleMethods != null && lifecycleExperimental === disableLifecycleMethods) {
    throw new Error('lifecycleExperimental and disableLifecycleMethods cannot be set to the same value');
  }
  if (typeof enableComponentDidUpdateOnSetState !== 'undefined' && lifecycles.componentDidUpdate && lifecycles.componentDidUpdate.onSetState !== enableComponentDidUpdateOnSetState) {
    throw new TypeError('the legacy enableComponentDidUpdateOnSetState option should be matched by `lifecycles: { componentDidUpdate: { onSetState: true } }`, for compatibility');
  }
  if (typeof supportPrevContextArgumentOfComponentDidUpdate !== 'undefined' && lifecycles.componentDidUpdate && lifecycles.componentDidUpdate.prevContext !== supportPrevContextArgumentOfComponentDidUpdate) {
    throw new TypeError('the legacy supportPrevContextArgumentOfComponentDidUpdate option should be matched by `lifecycles: { componentDidUpdate: { prevContext: true } }`, for compatibility');
  }
}
function getAdapterLifecycles(_ref) {
  var options = _ref.options;
  var _options$lifecycles2 = options.lifecycles,
    lifecycles = _options$lifecycles2 === void 0 ? {} : _options$lifecycles2,
    enableComponentDidUpdateOnSetState = options.enableComponentDidUpdateOnSetState,
    supportPrevContextArgumentOfComponentDidUpdate = options.supportPrevContextArgumentOfComponentDidUpdate;
  var hasLegacySetStateArg = typeof enableComponentDidUpdateOnSetState !== 'undefined';
  var hasLegacyPrevContextArg = typeof supportPrevContextArgumentOfComponentDidUpdate !== 'undefined';
  var componentDidUpdate = hasLegacySetStateArg || hasLegacyPrevContextArg ? _objectSpread(_objectSpread({}, hasLegacySetStateArg && {
    onSetState: !!enableComponentDidUpdateOnSetState
  }), hasLegacyPrevContextArg && {
    prevContext: !!supportPrevContextArgumentOfComponentDidUpdate
  }) : null;
  var originalGDSFP = lifecycles.getDerivedStateFromProps;
  var getDerivedStateFromProps = originalGDSFP ? {
    hasShouldComponentUpdateBug: !!originalGDSFP.hasShouldComponentUpdateBug
  } : false;
  return _objectSpread(_objectSpread(_objectSpread({}, lifecycles), {}, {
    setState: _objectSpread({}, lifecycles.setState),
    getChildContext: _objectSpread({
      calledByRenderer: true
    }, lifecycles.getChildContext)
  }, componentDidUpdate && {
    componentDidUpdate: componentDidUpdate
  }), {}, {
    getDerivedStateFromProps: getDerivedStateFromProps
  });
}
function getRootNode(node) {
  if (node.nodeType === 'host') {
    return node;
  }
  return node.rendered;
}
function getRootNodeInternal(wrapper) {
  if (wrapper[ROOT].length !== 1) {
    throw new Error('getRootNodeInternal(wrapper) can only be called when wrapper wraps one node');
  }
  if (wrapper[ROOT] !== wrapper) {
    return wrapper[ROOT_NODES][0];
  }
  return wrapper[ROOT][NODE];
}
function nodeParents(wrapper, node) {
  return (0, _RSTTraversal.parentsOfNode)(node, getRootNodeInternal(wrapper));
}
function privateSetNodes(wrapper, nodes) {
  if (!Array.isArray(nodes)) {
    (0, _Utils.privateSet)(wrapper, NODE, nodes);
    (0, _Utils.privateSet)(wrapper, NODES, [nodes]);
  } else {
    (0, _Utils.privateSet)(wrapper, NODE, nodes[0]);
    (0, _Utils.privateSet)(wrapper, NODES, nodes);
  }
  (0, _Utils.privateSet)(wrapper, 'length', wrapper[NODES].length);
}
function pureComponentShouldComponentUpdate(prevProps, props, prevState, state) {
  return !(0, _enzymeShallowEqual["default"])(prevProps, props) || !(0, _enzymeShallowEqual["default"])(prevState, state);
}
function isPureComponent(instance) {
  return instance && instance.isPureReactComponent;
}
function getChildContext(node, hierarchy, renderer) {
  var instance = node.instance,
    Component = node.type;
  var componentName = (0, _Utils.displayNameOfNode)(node);
  // Warn like react if childContextTypes is not defined:
  // https://github.com/facebook/react/blob/1454a8be03794f5e0b23a7e7696cbbbdcf8b0f5d/packages/react-dom/src/server/ReactPartialRenderer.js#L639-L646
  if (_typeof(Component.childContextTypes) !== 'object') {
    // eslint-disable-next-line no-console
    console.warn("".concat(componentName, ".getChildContext(): childContextTypes must be defined in order to use getChildContext()."));
    return {};
  }
  // Check childContextTypes like react:
  // https://github.com/facebook/react/blob/1454a8be03794f5e0b23a7e7696cbbbdcf8b0f5d/packages/react-dom/src/server/ReactPartialRenderer.js#L630-L637
  var childContext = instance.getChildContext();
  Object.keys(childContext).forEach(function (key) {
    if (!(key in Component.childContextTypes)) {
      throw new Error("".concat(componentName, ".getChildContext(): key \"").concat(key, "\" is not defined in childContextTypes."));
    }
  });
  if (typeof renderer.checkPropTypes === 'function') {
    renderer.checkPropTypes(Component.childContextTypes, childContext, 'child context', hierarchy);
  }
  return childContext;
}
function spyOnGetChildContextInitialRender(nodes, adapter) {
  if (!(0, _Utils.isCustomComponentElement)(nodes, adapter) || !nodes.type.prototype || typeof nodes.type.prototype.getChildContext !== 'function') {
    return null;
  }
  return (0, _Utils.spyMethod)(nodes.type.prototype, 'getChildContext');
}
function privateSetChildContext(adapter, wrapper, instance, renderedNode, getChildContextSpy) {
  var renderer = wrapper[RENDERER];
  // We only support parent-based context.
  if (adapter.options.legacyContextMode !== 'parent') {
    return;
  }
  if (getChildContextSpy) {
    (0, _Utils.privateSet)(wrapper, CHILD_CONTEXT, getChildContextSpy.getLastReturnValue());
    getChildContextSpy.restore();
  } else if (typeof instance.getChildContext === 'function') {
    // If there's no spy but getChildContext is a function, that means our renderer
    // is not going to call it for us, so we need to call it ourselves.
    var nodeHierarchy = [wrapper[NODE]].concat(nodeParents(wrapper, wrapper[NODE]));
    var childContext = getChildContext(renderedNode, nodeHierarchy, renderer);
    (0, _Utils.privateSet)(wrapper, CHILD_CONTEXT, childContext);
  } else {
    (0, _Utils.privateSet)(wrapper, CHILD_CONTEXT, null);
  }
}
function mockSCUIfgDSFPReturnNonNull(node, state) {
  var getDerivedStateFromProps = node.type.getDerivedStateFromProps;
  if (typeof getDerivedStateFromProps === 'function') {
    // we try to fix a React shallow renderer bug here.
    // (facebook/react#14607, which has been fixed in react 16.8):
    // when gDSFP return derived state, it will set instance state in shallow renderer before SCU,
    // this will cause `this.state` in sCU be the updated state, which is wrong behavior.
    // so we have to wrap sCU to pass the old state to original sCU.
    var instance = node.instance;
    var _spyMethod = (0, _Utils.spyMethod)(instance, 'shouldComponentUpdate', function (originalSCU) {
        return function shouldComponentUpdate() {
          instance.state = state;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          var sCUResult = originalSCU.apply(instance, args);
          var nextState = args[1];
          instance.state = nextState;
          restore();
          return sCUResult;
        };
      }),
      restore = _spyMethod.restore;
  }
}

/**
 * Recursively dive()s every custom component in a wrapper until
 * the target component is found.
 *
 * @param {ShallowWrapper} wrapper A ShallowWrapper to search
 * @param {ComponentType} target A react custom component that, when found, will end recursion
 * @param {Adapter} adapter An Enzyme adapter
 * @returns {ShallowWrapper|undefined} A ShallowWrapper for the target, or
 *  undefined if it can't be found
 */
function deepRender(wrapper, target, adapter) {
  var node = wrapper[NODE];
  var element = node && adapter.nodeToElement(node);
  if (wrapper.type() === target) {
    return wrapper.dive();
  }
  if (element && (0, _Utils.isCustomComponentElement)(element, adapter)) {
    return deepRender(wrapper.dive(), target, adapter);
  }
  var children = wrapper.children();
  for (var i = 0; i < children.length; i += 1) {
    var found = deepRender(children.at(i), target, adapter);
    if (typeof found !== 'undefined') {
      return found;
    }
  }
  return undefined;
}

/**
 * Deep-renders the `wrappingComponent` and returns the context that should
 * be accessible to the primary wrapper.
 *
 * @param {WrappingComponentWrapper} wrapper The `WrappingComponentWrapper` for a
 *  `wrappingComponent`
 * @param {Adapter} adapter An Enzyme adapter
 * @returns {object} An object containing an object of legacy context values and a Map of
 *  `createContext()` Provider values.
 */
function getContextFromWrappingComponent(wrapper, adapter) {
  var rootFinder = deepRender(wrapper, wrapper[ROOT_FINDER], adapter);
  if (!rootFinder) {
    throw new Error('`wrappingComponent` must render its children!');
  }
  return {
    legacyContext: rootFinder[OPTIONS].context,
    providerValues: rootFinder[PROVIDER_VALUES]
  };
}

/**
 * Makes options specifically for `ShallowWrapper`. Most of the logic here is around rendering
 * a `wrappingComponent` (if one was provided) and adding the child context of that component
 * to `options.context`.
 *
 * @param {ReactElement} nodes the nodes passed to `ShallowWrapper`
 * @param {ShallowWrapper} root this `ShallowWrapper`'s parent. If this is passed, options are
 *  not transformed.
 * @param {*} passedOptions the options passed to `ShallowWrapper`.
 * @param {*} wrapper the `ShallowWrapper` itself
 * @returns {Object} the decorated and transformed options
 */
function makeShallowOptions(nodes, root, passedOptions, wrapper) {
  var options = (0, _Utils.makeOptions)(passedOptions);
  var adapter = (0, _getAdapter["default"])(passedOptions);
  (0, _Utils.privateSet)(options, PROVIDER_VALUES, passedOptions[PROVIDER_VALUES]);
  if (root || !(0, _Utils.isCustomComponent)(options.wrappingComponent, adapter)) {
    return options;
  }
  if (typeof adapter.wrapWithWrappingComponent !== 'function') {
    throw new TypeError('your adapter does not support `wrappingComponent`. Try upgrading it!');
  }
  var _adapter$wrapWithWrap = adapter.wrapWithWrappingComponent(nodes, options),
    wrappedNode = _adapter$wrapWithWrap.node,
    RootFinder = _adapter$wrapWithWrap.RootFinder;
  // eslint-disable-next-line no-use-before-define
  var wrappingComponent = new WrappingComponentWrapper(wrappedNode, wrapper, RootFinder);
  var _getContextFromWrappi = getContextFromWrappingComponent(wrappingComponent, adapter),
    wrappingComponentLegacyContext = _getContextFromWrappi.legacyContext,
    wrappingComponentProviderValues = _getContextFromWrappi.providerValues;
  (0, _Utils.privateSet)(wrapper, WRAPPING_COMPONENT, wrappingComponent);
  return _objectSpread(_objectSpread({}, options), {}, _defineProperty({
    context: _objectSpread(_objectSpread({}, options.context), wrappingComponentLegacyContext)
  }, PROVIDER_VALUES, wrappingComponentProviderValues));
}
function makeInheritedChildOptions(wrapper) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var childOptions = _objectSpread(_objectSpread(_objectSpread({}, wrapper[OPTIONS]), options), {}, {
    context: options.context || _objectSpread(_objectSpread({}, wrapper[OPTIONS].context), wrapper[ROOT][CHILD_CONTEXT])
  });
  (0, _Utils.privateSet)(childOptions, PROVIDER_VALUES, wrapper[ROOT][PROVIDER_VALUES]);
  return childOptions;
}

/**
 * @class ShallowWrapper
 */
var ShallowWrapper = /*#__PURE__*/function () {
  function ShallowWrapper(nodes, root) {
    var _this = this;
    var passedOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    _classCallCheck(this, ShallowWrapper);
    validateOptions(passedOptions);
    var options = makeShallowOptions(nodes, root, passedOptions, this);
    var adapter = (0, _getAdapter["default"])(options);
    var lifecycles = getAdapterLifecycles(adapter);

    // mounting a ShallowRender component
    if (!root) {
      if (!adapter.isValidElement(nodes)) {
        throw new TypeError('ShallowWrapper can only wrap valid elements');
      }
      var getChildContextSpy = lifecycles.getChildContext.calledByRenderer ? spyOnGetChildContextInitialRender(nodes, adapter) : null;
      (0, _Utils.privateSet)(this, ROOT, this);
      (0, _Utils.privateSet)(this, UNRENDERED, nodes);
      var renderer = adapter.createRenderer(_objectSpread({
        mode: 'shallow'
      }, options));
      (0, _Utils.privateSet)(this, RENDERER, renderer);
      var providerValues = new Map(options[PROVIDER_VALUES] || []);
      this[RENDERER].render(nodes, options.context, {
        providerValues: providerValues
      });
      var renderedNode = this[RENDERER].getNode();
      privateSetNodes(this, getRootNode(renderedNode));
      (0, _Utils.privateSet)(this, OPTIONS, options);
      (0, _Utils.privateSet)(this, PROVIDER_VALUES, providerValues);
      var instance = renderedNode.instance;
      if (instance && !options.disableLifecycleMethods) {
        // Ensure to call componentDidUpdate when instance.setState is called
        if (lifecycles.componentDidUpdate.onSetState && !instance[SET_STATE]) {
          (0, _Utils.privateSet)(instance, SET_STATE, instance.setState);
          instance.setState = function (updater) {
            var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
            return _this.setState.apply(_this, _toConsumableArray(callback == null ? [updater] : [updater, callback]));
          };
        }
        if (typeof instance.componentDidMount === 'function') {
          this[RENDERER].batchedUpdates(function () {
            instance.componentDidMount();
          });
        }
        privateSetChildContext(adapter, this, instance, renderedNode, getChildContextSpy);
      }
      // creating a child component through enzyme's ShallowWrapper APIs.
    } else {
      (0, _Utils.privateSet)(this, ROOT, root);
      (0, _Utils.privateSet)(this, UNRENDERED, null);
      (0, _Utils.privateSet)(this, RENDERER, root[RENDERER]);
      privateSetNodes(this, nodes);
      (0, _Utils.privateSet)(this, OPTIONS, root[OPTIONS]);
      (0, _Utils.privateSet)(this, ROOT_NODES, root[NODES]);
      (0, _Utils.privateSet)(this, PROVIDER_VALUES, null);
    }
  }

  /**
   * Returns the root wrapper
   *
   * @return {ShallowWrapper}
   */
  return _createClass(ShallowWrapper, [{
    key: "root",
    value: function root() {
      return this[ROOT];
    }

    /**
     * Returns the wrapped component.
     *
     * @return {ReactComponent}
     */
  }, {
    key: "getNodeInternal",
    value: function getNodeInternal() {
      if (this.length !== 1) {
        throw new Error('ShallowWrapper::getNode() can only be called when wrapping one node');
      }
      if (this[ROOT] === this) {
        this.update();
      }
      return this[NODE];
    }

    /**
     * Returns the the wrapped components.
     *
     * @return {Array<ReactComponent>}
     */
  }, {
    key: "getNodesInternal",
    value: function getNodesInternal() {
      if (this[ROOT] === this && this.length === 1) {
        this.update();
      }
      return this[NODES];
    }

    /**
     * Returns the wrapped ReactElement.
     *
     * @return {ReactElement}
     */
  }, {
    key: "getElement",
    value: function getElement() {
      var _this2 = this;
      return this.single('getElement', function (n) {
        return (0, _getAdapter["default"])(_this2[OPTIONS]).nodeToElement(n);
      });
    }

    /**
     * Returns the wrapped ReactElements.
     *
     * @return {Array<ReactElement>}
     */
  }, {
    key: "getElements",
    value: function getElements() {
      var _this3 = this;
      return this.getNodesInternal().map(function (n) {
        return (0, _getAdapter["default"])(_this3[OPTIONS]).nodeToElement(n);
      });
    }

    // eslint-disable-next-line class-methods-use-this
  }, {
    key: "getNode",
    value: function getNode() {
      throw new Error('ShallowWrapper::getNode() is no longer supported. Use ShallowWrapper::getElement() instead');
    }

    // eslint-disable-next-line class-methods-use-this
  }, {
    key: "getNodes",
    value: function getNodes() {
      throw new Error('ShallowWrapper::getNodes() is no longer supported. Use ShallowWrapper::getElements() instead');
    }

    /**
     * Gets the instance of the component being rendered as the root node passed into `shallow()`.
     *
     * NOTE: can only be called on a wrapper instance that is also the root instance.
     *
     * Example:
     * ```
     * const wrapper = shallow(<MyComponent />);
     * const inst = wrapper.instance();
     * expect(inst).to.be.instanceOf(MyComponent);
     * ```
     * @returns {ReactComponent}
     */
  }, {
    key: "instance",
    value: function instance() {
      if (this[ROOT] !== this) {
        throw new Error('ShallowWrapper::instance() can only be called on the root');
      }
      return this[RENDERER].getNode().instance;
    }

    /**
     * If a `wrappingComponent` was passed in `options`, this methods returns a `ShallowWrapper`
     * around the rendered `wrappingComponent`. This `ShallowWrapper` can be used to update the
     * `wrappingComponent`'s props, state, etc.
     *
     * @returns ShallowWrapper
     */
  }, {
    key: "getWrappingComponent",
    value: function getWrappingComponent() {
      if (this[ROOT] !== this) {
        throw new Error('ShallowWrapper::getWrappingComponent() can only be called on the root');
      }
      if (!this[OPTIONS].wrappingComponent) {
        throw new Error('ShallowWrapper::getWrappingComponent() can only be called on a wrapper that was originally passed a `wrappingComponent` option');
      }
      return this[WRAPPING_COMPONENT];
    }

    /**
     * Forces a re-render. Useful to run before checking the render output if something external
     * may be updating the state of the component somewhere.
     *
     * NOTE: can only be called on a wrapper instance that is also the root instance.
     *
     * @returns {ShallowWrapper}
     */
  }, {
    key: "update",
    value: function update() {
      if (this[ROOT] !== this) {
        throw new Error('ShallowWrapper::update() can only be called on the root');
      }
      if (this.length !== 1) {
        throw new Error('ShallowWrapper::update() can only be called when wrapping one node');
      }
      privateSetNodes(this, getRootNode(this[RENDERER].getNode()));
      return this;
    }

    /**
     * A method that unmounts the component. This can be used to simulate a component going through
     * and unmount/mount lifecycle.
     * @returns {ShallowWrapper}
     */
  }, {
    key: "unmount",
    value: function unmount() {
      this[RENDERER].unmount();
      if (this[ROOT][WRAPPING_COMPONENT]) {
        this[ROOT][WRAPPING_COMPONENT].unmount();
      }
      return this;
    }

    /**
     * A method is for re-render with new props and context.
     * This calls componentDidUpdate method if disableLifecycleMethods is not enabled.
     *
     * NOTE: can only be called on a wrapper instance that is also the root instance.
     *
     * @param {Object} props
     * @param {Object} context
     * @returns {ShallowWrapper}
     */
  }, {
    key: "rerender",
    value: function rerender(props, context) {
      var _this4 = this;
      var adapter = (0, _getAdapter["default"])(this[OPTIONS]);
      this.single('rerender', function () {
        (0, _Utils.withSetStateAllowed)(function () {
          // NOTE(lmr): In react 16, instances will be null for SFCs, but
          // rerendering with props/context is still a valid thing to do. In
          // this case, state will be undefined, but props/context will exist.
          var node = _this4[RENDERER].getNode();
          var instance = node.instance || {};
          var type = node.type || {};
          var state = instance.state;
          var prevProps = instance.props || _this4[UNRENDERED].props;
          var prevContext = instance.context || _this4[OPTIONS].context;
          var nextContext = context || prevContext;
          if (context) {
            _this4[OPTIONS] = _objectSpread(_objectSpread({}, _this4[OPTIONS]), {}, {
              context: nextContext
            });
          }
          _this4[RENDERER].batchedUpdates(function () {
            // When shouldComponentUpdate returns false we shouldn't call componentDidUpdate.
            // so we spy shouldComponentUpdate to get the result.
            var lifecycles = getAdapterLifecycles(adapter);
            var shouldRender = true;
            var shouldComponentUpdateSpy;
            var getChildContextSpy;
            if (!_this4[OPTIONS].disableLifecycleMethods && instance) {
              if (typeof instance.shouldComponentUpdate === 'function') {
                var gDSFP = lifecycles.getDerivedStateFromProps;
                if (gDSFP && gDSFP.hasShouldComponentUpdateBug) {
                  mockSCUIfgDSFPReturnNonNull(node, state);
                }
                shouldComponentUpdateSpy = (0, _Utils.spyMethod)(instance, 'shouldComponentUpdate');
              }
              if (lifecycles.getChildContext.calledByRenderer && typeof instance.getChildContext === 'function') {
                getChildContextSpy = (0, _Utils.spyMethod)(instance, 'getChildContext');
              }
            }
            if (!shouldComponentUpdateSpy && isPureComponent(instance)) {
              shouldRender = pureComponentShouldComponentUpdate(prevProps, props, state, instance.state);
            }
            if (props) _this4[UNRENDERED] = (0, _Utils.cloneElement)(adapter, _this4[UNRENDERED], props);
            _this4[RENDERER].render(_this4[UNRENDERED], nextContext, {
              providerValues: _this4[PROVIDER_VALUES]
            });
            if (shouldComponentUpdateSpy) {
              shouldRender = shouldComponentUpdateSpy.getLastReturnValue();
              shouldComponentUpdateSpy.restore();
            }
            if (shouldRender && !_this4[OPTIONS].disableLifecycleMethods && instance) {
              privateSetChildContext(adapter, _this4, instance, node, getChildContextSpy);
              if (lifecycles.getSnapshotBeforeUpdate) {
                var snapshot;
                if (typeof instance.getSnapshotBeforeUpdate === 'function') {
                  snapshot = instance.getSnapshotBeforeUpdate(prevProps, state);
                }
                if (lifecycles.componentDidUpdate && typeof instance.componentDidUpdate === 'function' && (!state || (0, _enzymeShallowEqual["default"])(state, _this4.instance().state) || typeof type.getDerivedStateFromProps === 'function')) {
                  instance.componentDidUpdate(prevProps, state, snapshot);
                }
              } else if (lifecycles.componentDidUpdate && typeof instance.componentDidUpdate === 'function') {
                if (lifecycles.componentDidUpdate.prevContext) {
                  instance.componentDidUpdate(prevProps, state, prevContext);
                } else if (!state || (0, _enzymeShallowEqual["default"])(_this4.instance().state, state)) {
                  instance.componentDidUpdate(prevProps, state);
                }
              }
              // If it doesn't need to rerender, update only its props.
            } else if (!(0, _enzymeShallowEqual["default"])(props, instance.props)) {
              instance.props = (Object.freeze || Object)(_objectSpread(_objectSpread({}, instance.props), props));
            }
            _this4.update();
          });
        });
      });
      return this;
    }

    /**
     * A method that sets the props of the root component, and re-renders. Useful for when you are
     * wanting to test how the component behaves over time with changing props. Calling this, for
     * instance, will call the `componentWillReceiveProps` lifecycle method.
     *
     * Similar to `setState`, this method accepts a props object and will merge it in with the already
     * existing props.
     *
     * NOTE: can only be called on a wrapper instance that is also the root instance.
     *
     * @param {Object} props object
     * @param {Function} cb - callback function
     * @returns {ShallowWrapper}
     */
  }, {
    key: "setProps",
    value: function setProps(props) {
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      if (this[ROOT] !== this) {
        throw new Error('ShallowWrapper::setProps() can only be called on the root');
      }
      if (arguments.length > 1 && typeof callback !== 'function') {
        throw new TypeError('ReactWrapper::setProps() expects a function as its second argument');
      }
      this.rerender(props);
      if (callback) {
        callback();
      }
      return this;
    }

    /**
     * A method to invoke `setState` on the root component instance similar to how you might in the
     * definition of the component, and re-renders.  This method is useful for testing your component
     * in hard to achieve states, however should be used sparingly. If possible, you should utilize
     * your component's external API in order to get it into whatever state you want to test, in order
     * to be as accurate of a test as possible. This is not always practical, however.
     *
     * NOTE: can only be called on a wrapper instance that is also the root instance.
     *
     * @param {Object} state to merge
     * @param {Function} cb - callback function
     * @returns {ShallowWrapper}
     */
  }, {
    key: "setState",
    value: function setState(state) {
      var _this5 = this;
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      if (this[ROOT] !== this) {
        throw new Error('ShallowWrapper::setState() can only be called on the root');
      }
      if (this.instance() === null || this[RENDERER].getNode().nodeType !== 'class') {
        throw new Error('ShallowWrapper::setState() can only be called on class components');
      }
      if (arguments.length > 1 && typeof callback !== 'function') {
        throw new TypeError('ReactWrapper::setState() expects a function as its second argument');
      }
      this.single('setState', function () {
        (0, _Utils.withSetStateAllowed)(function () {
          var adapter = (0, _getAdapter["default"])(_this5[OPTIONS]);
          var lifecycles = getAdapterLifecycles(adapter);
          var node = _this5[RENDERER].getNode();
          var instance = node.instance;
          var prevProps = instance.props;
          var prevState = instance.state;
          var prevContext = instance.context;
          var statePayload = typeof state === 'function' ? state.call(instance, prevState, prevProps) : state;

          // returning null or undefined prevents the update in React 16+
          // https://github.com/facebook/react/pull/12756
          var maybeHasUpdate = !lifecycles.setState.skipsComponentDidUpdateOnNullish || statePayload != null;

          // When shouldComponentUpdate returns false we shouldn't call componentDidUpdate.
          // so we spy shouldComponentUpdate to get the result.
          var shouldComponentUpdateSpy;
          var getChildContextSpy;
          var shouldRender = true;
          if (!_this5[OPTIONS].disableLifecycleMethods && instance) {
            if (lifecycles.componentDidUpdate && lifecycles.componentDidUpdate.onSetState && typeof instance.shouldComponentUpdate === 'function') {
              var gDSFP = lifecycles.getDerivedStateFromProps;
              if (gDSFP && gDSFP.hasShouldComponentUpdateBug) {
                mockSCUIfgDSFPReturnNonNull(node, state);
              }
              shouldComponentUpdateSpy = (0, _Utils.spyMethod)(instance, 'shouldComponentUpdate');
            }
            if (lifecycles.getChildContext.calledByRenderer && typeof instance.getChildContext === 'function') {
              getChildContextSpy = (0, _Utils.spyMethod)(instance, 'getChildContext');
            }
          }
          if (!shouldComponentUpdateSpy && isPureComponent(instance)) {
            shouldRender = pureComponentShouldComponentUpdate(prevProps, instance.props, prevState, _objectSpread(_objectSpread({}, prevState), statePayload));
          }

          // We don't pass the setState callback here
          // to guarantee to call the callback after finishing the render
          if (instance[SET_STATE]) {
            instance[SET_STATE](statePayload);
          } else {
            instance.setState(statePayload);
          }
          if (shouldComponentUpdateSpy) {
            shouldRender = shouldComponentUpdateSpy.getLastReturnValue();
            shouldComponentUpdateSpy.restore();
          }
          if (maybeHasUpdate && shouldRender && !_this5[OPTIONS].disableLifecycleMethods) {
            privateSetChildContext(adapter, _this5, instance, node, getChildContextSpy);
            if (lifecycles.componentDidUpdate && lifecycles.componentDidUpdate.onSetState) {
              if (lifecycles.getSnapshotBeforeUpdate && typeof instance.getSnapshotBeforeUpdate === 'function') {
                var snapshot = instance.getSnapshotBeforeUpdate(prevProps, prevState);
                if (typeof instance.componentDidUpdate === 'function') {
                  instance.componentDidUpdate(prevProps, prevState, snapshot);
                }
              } else if (typeof instance.componentDidUpdate === 'function') {
                if (lifecycles.componentDidUpdate.prevContext) {
                  instance.componentDidUpdate(prevProps, prevState, prevContext);
                } else {
                  instance.componentDidUpdate(prevProps, prevState);
                }
              }
            }
          }
          _this5.update();
          // call the setState callback
          if (callback) {
            if (adapter.invokeSetStateCallback) {
              adapter.invokeSetStateCallback(instance, callback);
            } else {
              callback.call(instance);
            }
          }
        });
      });
      return this;
    }

    /**
     * A method that sets the context of the root component, and re-renders. Useful for when you are
     * wanting to test how the component behaves over time with changing contexts.
     *
     * NOTE: can only be called on a wrapper instance that is also the root instance.
     *
     * @param {Object} context object
     * @returns {ShallowWrapper}
     */
  }, {
    key: "setContext",
    value: function setContext(context) {
      if (this[ROOT] !== this) {
        throw new Error('ShallowWrapper::setContext() can only be called on the root');
      }
      if (!this[OPTIONS].context) {
        throw new Error('ShallowWrapper::setContext() can only be called on a wrapper that was originally passed a context option');
      }
      return this.rerender(null, context);
    }

    /**
     * Whether or not a given react element exists in the shallow render tree.
     *
     * Example:
     * ```
     * const wrapper = shallow(<MyComponent />);
     * expect(wrapper.contains(<div className="foo bar" />)).to.equal(true);
     * ```
     *
     * @param {ReactElement|Array<ReactElement>} nodeOrNodes
     * @returns {Boolean}
     */
  }, {
    key: "contains",
    value: function contains(nodeOrNodes) {
      var adapter = (0, _getAdapter["default"])(this[OPTIONS]);
      if (!(0, _Utils.isReactElementAlike)(nodeOrNodes, adapter)) {
        throw new Error('ShallowWrapper::contains() can only be called with a ReactElement (or an array of them), a string, or a number as an argument.');
      }
      var predicate = Array.isArray(nodeOrNodes) ? function (other) {
        return (0, _Utils.containsChildrenSubArray)(_Utils.nodeEqual, other, nodeOrNodes.map(function (node) {
          return adapter.elementToNode(node);
        }));
      } : function (other) {
        return (0, _Utils.nodeEqual)(adapter.elementToNode(nodeOrNodes), other);
      };
      return findWhereUnwrapped(this, predicate).length > 0;
    }

    /**
     * Whether or not a given react element exists in the shallow render tree.
     * Match is based on the expected element and not on wrappers element.
     * It will determine if one of the wrappers element "looks like" the expected
     * element by checking if all props of the expected element are present
     * on the wrappers element and equals to each other.
     *
     * Example:
     * ```
     * // MyComponent outputs <div><div class="foo">Hello</div></div>
     * const wrapper = shallow(<MyComponent />);
     * expect(wrapper.containsMatchingElement(<div>Hello</div>)).to.equal(true);
     * ```
     *
     * @param {ReactElement} node
     * @returns {Boolean}
     */
  }, {
    key: "containsMatchingElement",
    value: function containsMatchingElement(node) {
      var adapter = (0, _getAdapter["default"])(this[OPTIONS]);
      var rstNode = adapter.elementToNode(node);
      var predicate = function predicate(other) {
        return (0, _Utils.nodeMatches)(rstNode, other, function (a, b) {
          return a <= b;
        });
      };
      return findWhereUnwrapped(this, predicate).length > 0;
    }

    /**
     * Whether or not all the given react elements exist in the shallow render tree.
     * Match is based on the expected element and not on wrappers element.
     * It will determine if one of the wrappers element "looks like" the expected
     * element by checking if all props of the expected element are present
     * on the wrappers element and equals to each other.
     *
     * Example:
     * ```
     * const wrapper = shallow(<MyComponent />);
     * expect(wrapper.containsAllMatchingElements([
     *   <div>Hello</div>,
     *   <div>Goodbye</div>,
     * ])).to.equal(true);
     * ```
     *
     * @param {Array<ReactElement>} nodes
     * @returns {Boolean}
     */
  }, {
    key: "containsAllMatchingElements",
    value: function containsAllMatchingElements(nodes) {
      var _this6 = this;
      if (!Array.isArray(nodes)) {
        throw new TypeError('nodes should be an Array');
      }
      return nodes.every(function (node) {
        return _this6.containsMatchingElement(node);
      });
    }

    /**
     * Whether or not one of the given react elements exists in the shallow render tree.
     * Match is based on the expected element and not on wrappers element.
     * It will determine if one of the wrappers element "looks like" the expected
     * element by checking if all props of the expected element are present
     * on the wrappers element and equals to each other.
     *
     * Example:
     * ```
     * const wrapper = shallow(<MyComponent />);
     * expect(wrapper.containsAnyMatchingElements([
     *   <div>Hello</div>,
     *   <div>Goodbye</div>,
     * ])).to.equal(true);
     * ```
     *
     * @param {Array<ReactElement>} nodes
     * @returns {Boolean}
     */
  }, {
    key: "containsAnyMatchingElements",
    value: function containsAnyMatchingElements(nodes) {
      var _this7 = this;
      return Array.isArray(nodes) && nodes.some(function (node) {
        return _this7.containsMatchingElement(node);
      });
    }

    /**
     * Whether or not a given react element exists in the render tree.
     *
     * Example:
     * ```
     * const wrapper = shallow(<MyComponent />);
     * expect(wrapper.contains(<div className="foo bar" />)).to.equal(true);
     * ```
     *
     * @param {ReactElement} node
     * @returns {Boolean}
     */
  }, {
    key: "equals",
    value: function equals(node) {
      var _this8 = this;
      return this.single('equals', function () {
        return (0, _Utils.nodeEqual)(_this8.getNodeInternal(), node);
      });
    }

    /**
     * Whether or not a given react element matches the render tree.
     * Match is based on the expected element and not on wrapper root node.
     * It will determine if the wrapper root node "looks like" the expected
     * element by checking if all props of the expected element are present
     * on the wrapper root node and equals to each other.
     *
     * Example:
     * ```
     * // MyComponent outputs <div class="foo">Hello</div>
     * const wrapper = shallow(<MyComponent />);
     * expect(wrapper.matchesElement(<div>Hello</div>)).to.equal(true);
     * ```
     *
     * @param {ReactElement} node
     * @returns {Boolean}
     */
  }, {
    key: "matchesElement",
    value: function matchesElement(node) {
      var _this9 = this;
      return this.single('matchesElement', function () {
        var adapter = (0, _getAdapter["default"])(_this9[OPTIONS]);
        var rstNode = adapter.elementToNode(node);
        return (0, _Utils.nodeMatches)(rstNode, _this9.getNodeInternal(), function (a, b) {
          return a <= b;
        });
      });
    }

    /**
     * Finds every node in the render tree of the current wrapper that matches the provided selector.
     *
     * @param {EnzymeSelector} selector
     * @returns {ShallowWrapper}
     */
  }, {
    key: "find",
    value: function find(selector) {
      return this.wrap((0, _selectors.reduceTreesBySelector)(selector, this.getNodesInternal()));
    }

    /**
     * Returns whether or not current node matches a provided selector.
     *
     * NOTE: can only be called on a wrapper of a single node.
     *
     * @param {EnzymeSelector} selector
     * @returns {boolean}
     */
  }, {
    key: "is",
    value: function is(selector) {
      var predicate = (0, _selectors.buildPredicate)(selector);
      return this.single('is', function (n) {
        return predicate(n);
      });
    }

    /**
     * Returns true if the component rendered nothing, i.e., null or false.
     *
     * @returns {boolean}
     */
  }, {
    key: "isEmptyRender",
    value: function isEmptyRender() {
      var nodes = this.getNodesInternal();
      return nodes.every(function (n) {
        return (0, _Utils.isEmptyValue)(n);
      });
    }

    /**
     * Returns a new wrapper instance with only the nodes of the current wrapper instance that match
     * the provided predicate function. The predicate should receive a wrapped node as its first
     * argument.
     *
     * @param {Function} predicate
     * @returns {ShallowWrapper}
     */
  }, {
    key: "filterWhere",
    value: function filterWhere(predicate) {
      var _this0 = this;
      return filterWhereUnwrapped(this, function (n) {
        return predicate(_this0.wrap(n));
      });
    }

    /**
     * Returns a new wrapper instance with only the nodes of the current wrapper instance that match
     * the provided selector.
     *
     * @param {EnzymeSelector} selector
     * @returns {ShallowWrapper}
     */
  }, {
    key: "filter",
    value: function filter(selector) {
      var predicate = (0, _selectors.buildPredicate)(selector);
      return filterWhereUnwrapped(this, predicate);
    }

    /**
     * Returns a new wrapper instance with only the nodes of the current wrapper that did not match
     * the provided selector. Essentially the inverse of `filter`.
     *
     * @param {EnzymeSelector} selector
     * @returns {ShallowWrapper}
     */
  }, {
    key: "not",
    value: function not(selector) {
      var predicate = (0, _selectors.buildPredicate)(selector);
      return filterWhereUnwrapped(this, function (n) {
        return !predicate(n);
      });
    }

    /**
     * Returns a string of the rendered text of the current render tree.  This function should be
     * looked at with skepticism if being used to test what the actual HTML output of the component
     * will be. If that is what you would like to test, use enzyme's `render` function instead.
     *
     * NOTE: can only be called on a wrapper of a single node.
     *
     * @returns {String}
     */
  }, {
    key: "text",
    value: function text() {
      return this.single('text', _RSTTraversal.getTextFromNode);
    }

    /**
     * Returns the HTML of the node.
     *
     * NOTE: can only be called on a wrapper of a single node.
     *
     * @returns {String}
     */
  }, {
    key: "html",
    value: function html() {
      var _this1 = this;
      return this.single('html', function (n) {
        if (_this1.type() === null) return null;
        var adapter = (0, _getAdapter["default"])(_this1[OPTIONS]);
        var renderer = adapter.createRenderer(_objectSpread(_objectSpread({}, _this1[OPTIONS]), {}, {
          mode: 'string'
        }));
        return renderer.render(adapter.nodeToElement(n));
      });
    }

    /**
     * Returns the current node rendered to HTML and wrapped in a CheerioWrapper.
     *
     * NOTE: can only be called on a wrapper of a single node.
     *
     * @returns {CheerioWrapper}
     */
  }, {
    key: "render",
    value: function render() {
      var html = this.html();
      return (0, _Utils.loadCheerioRoot)(html);
    }

    /**
     * Used to simulate events. Pass an eventname and (optionally) event arguments. This method of
     * testing events should be met with some skepticism.
     *
     * @param {String} event
     * @param {Array} args
     * @returns {ShallowWrapper}
     */
  }, {
    key: "simulate",
    value: function simulate(event) {
      var _this10 = this;
      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }
      return this.single('simulate', function (n) {
        var _this10$RENDERER;
        (_this10$RENDERER = _this10[RENDERER]).simulateEvent.apply(_this10$RENDERER, [n, event].concat(args));
        _this10[ROOT].update();
        return _this10;
      });
    }

    /**
     * Used to simulate throwing a rendering error. Pass an error to throw.
     *
     * @param {String} error
     * @returns {ShallowWrapper}
     */
  }, {
    key: "simulateError",
    value: function simulateError(error) {
      var _this11 = this;
      // in shallow, the "root" is the "rendered" thing.

      return this.single('simulateError', function (thisNode) {
        if (thisNode.nodeType === 'host') {
          throw new TypeError('ShallowWrapper::simulateError() can only be called on custom components');
        }
        var renderer = _this11[RENDERER];
        if (typeof renderer.simulateError !== 'function') {
          throw new TypeError('your adapter does not support `simulateError`. Try upgrading it!');
        }
        var rootNode = getRootNodeInternal(_this11);
        var nodeHierarchy = [thisNode].concat(nodeParents(_this11, thisNode));
        renderer.simulateError(nodeHierarchy, rootNode, error);
        return _this11;
      });
    }

    /**
     * Returns the props hash for the current node of the wrapper.
     *
     * NOTE: can only be called on a wrapper of a single node.
     *
     * @returns {Object}
     */
  }, {
    key: "props",
    value: function props() {
      return this.single('props', _RSTTraversal.propsOfNode);
    }

    /**
     * Returns the state hash for the root node of the wrapper. Optionally pass in a prop name and it
     * will return just that value.
     *
     * NOTE: can only be called on a wrapper of a single node.
     *
     * @param {String} name (optional)
     * @returns {*}
     */
  }, {
    key: "state",
    value: function state(name) {
      var _this12 = this;
      if (this[ROOT] !== this) {
        throw new Error('ShallowWrapper::state() can only be called on the root');
      }
      if (this.instance() === null || this[RENDERER].getNode().nodeType !== 'class') {
        throw new Error('ShallowWrapper::state() can only be called on class components');
      }
      var _state = this.single('state', function () {
        return _this12.instance().state;
      });
      if (typeof name !== 'undefined') {
        if (_state == null) {
          throw new TypeError("ShallowWrapper::state(\"".concat(name, "\") requires that `state` not be `null` or `undefined`"));
        }
        return _state[name];
      }
      return _state;
    }

    /**
     * Returns the context hash for the root node of the wrapper.
     * Optionally pass in a prop name and it will return just that value.
     *
     * NOTE: can only be called on a wrapper of a single node.
     *
     * @param {String} name (optional)
     * @returns {*}
     */
  }, {
    key: "context",
    value: function context(name) {
      var _this13 = this;
      if (this[ROOT] !== this) {
        throw new Error('ShallowWrapper::context() can only be called on the root');
      }
      if (!this[OPTIONS].context) {
        throw new Error('ShallowWrapper::context() can only be called on a wrapper that was originally passed a context option');
      }
      if (this.instance() === null) {
        throw new Error('ShallowWrapper::context() can only be called on wrapped nodes that have a non-null instance');
      }
      var _context = this.single('context', function () {
        return _this13.instance().context;
      });
      if (name) {
        return _context[name];
      }
      return _context;
    }

    /**
     * Returns a new wrapper with all of the children of the current wrapper.
     *
     * @param {EnzymeSelector} [selector]
     * @returns {ShallowWrapper}
     */
  }, {
    key: "children",
    value: function children(selector) {
      var allChildren = this.flatMap(function (n) {
        return (0, _RSTTraversal.childrenOfNode)(n.getNodeInternal());
      });
      return selector ? allChildren.filter(selector) : allChildren;
    }

    /**
     * Returns a new wrapper with a specific child
     *
     * @param {Number} [index]
     * @returns {ShallowWrapper}
     */
  }, {
    key: "childAt",
    value: function childAt(index) {
      var _this14 = this;
      return this.single('childAt', function () {
        return _this14.children().at(index);
      });
    }

    /**
     * Returns a wrapper around all of the parents/ancestors of the wrapper. Does not include the node
     * in the current wrapper.
     *
     * NOTE: can only be called on a wrapper of a single node.
     *
     * @param {EnzymeSelector} [selector]
     * @returns {ShallowWrapper}
     */
  }, {
    key: "parents",
    value: function parents(selector) {
      var _this15 = this;
      return this.single('parents', function (n) {
        var allParents = _this15.wrap(nodeParents(_this15, n));
        return selector ? allParents.filter(selector) : allParents;
      });
    }

    /**
     * Returns a wrapper around the immediate parent of the current node.
     *
     * @returns {ShallowWrapper}
     */
  }, {
    key: "parent",
    value: function parent() {
      return this.flatMap(function (n) {
        return [n.parents().get(0)];
      });
    }

    /**
     *
     * @param {EnzymeSelector} selector
     * @returns {ShallowWrapper}
     */
  }, {
    key: "closest",
    value: function closest(selector) {
      if (this.is(selector)) {
        return this;
      }
      var matchingAncestors = this.parents().filter(selector);
      return matchingAncestors.length > 0 ? matchingAncestors.first() : this.findWhere(function () {
        return false;
      });
    }

    /**
     * Shallow renders the current node and returns a shallow wrapper around it.
     *
     * NOTE: can only be called on wrapper of a single node.
     *
     * @param {Object} options
     * @returns {ShallowWrapper}
     */
  }, {
    key: "shallow",
    value: function shallow() {
      var _this16 = this;
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this.single('shallow', function (n) {
        var childOptions = makeInheritedChildOptions(_this16, options);
        return _this16.wrap((0, _getAdapter["default"])(_this16[OPTIONS]).nodeToElement(n), null, childOptions);
      });
    }

    /**
     * Returns the value of prop with the given name of the current node.
     *
     * @param propName
     * @returns {*}
     */
  }, {
    key: "prop",
    value: function prop(propName) {
      return this.props()[propName];
    }

    /**
     * Used to invoke a function prop.
     * Will invoke an function prop and return its value.
     *
     * @param {String} propName
     * @returns {Any}
     */
  }, {
    key: "invoke",
    value: function invoke(propName) {
      var _this17 = this;
      return this.single('invoke', function () {
        var handler = _this17.prop(propName);
        if (typeof handler !== 'function') {
          throw new TypeError('ShallowWrapper::invoke() requires the name of a prop whose value is a function');
        }
        return function () {
          var response = handler.apply(void 0, arguments);
          _this17[ROOT].update();
          return response;
        };
      });
    }

    /**
     * Returns a wrapper of the node rendered by the provided render prop.
     *
     * @param {String} propName
     * @returns {Function}
     */
  }, {
    key: "renderProp",
    value: function renderProp(propName) {
      var _this18 = this;
      var adapter = (0, _getAdapter["default"])(this[OPTIONS]);
      if (typeof adapter.wrap !== 'function') {
        throw new RangeError('your adapter does not support `wrap`. Try upgrading it!');
      }
      return this.single('renderProp', function (n) {
        if (n.nodeType === 'host') {
          throw new TypeError('ShallowWrapper::renderProp() can only be called on custom components');
        }
        if (typeof propName !== 'string') {
          throw new TypeError('ShallowWrapper::renderProp(): `propName` must be a string');
        }
        var props = _this18.props();
        if (!(0, _hasown["default"])(props, propName)) {
          throw new Error("ShallowWrapper::renderProp(): no prop called \u201C".concat(propName, "\u201C found"));
        }
        var propValue = props[propName];
        if (typeof propValue !== 'function') {
          throw new TypeError("ShallowWrapper::renderProp(): expected prop \u201C".concat(propName, "\u201C to contain a function, but it holds \u201C").concat(_typeof(propValue), "\u201C"));
        }
        return function () {
          var element = propValue.apply(void 0, arguments);
          var wrapped = adapter.wrap(element);
          return _this18.wrap(wrapped, null, _this18[OPTIONS]);
        };
      });
    }

    /**
     * Returns the key assigned to the current node.
     *
     * @returns {String}
     */
  }, {
    key: "key",
    value: function key() {
      return this.single('key', function (n) {
        return n.key === undefined ? null : n.key;
      });
    }

    /**
     * Returns the type of the current node of this wrapper. If it's a composite component, this will
     * be the component constructor. If it's a native DOM node, it will be a string of the tag name.
     * If it's null, it will be null.
     *
     * @returns {String|Function|null}
     */
  }, {
    key: "type",
    value: function type() {
      return this.single('type', function (n) {
        return (0, _Utils.typeOfNode)(n);
      });
    }

    /**
     * Returns the name of the current node of this wrapper.
     *
     * In order of precedence => type.displayName -> type.name -> type.
     *
     * @returns {String}
     */
  }, {
    key: "name",
    value: function name() {
      var adapter = (0, _getAdapter["default"])(this[OPTIONS]);
      return this.single('name', function (n) {
        return adapter.displayNameOfNode ? adapter.displayNameOfNode(n) : (0, _Utils.displayNameOfNode)(n);
      });
    }

    /**
     * Returns whether or not the current node has the given class name or not.
     *
     * NOTE: can only be called on a wrapper of a single node.
     *
     * @param className
     * @returns {Boolean}
     */
  }, {
    key: "hasClass",
    value: function hasClass(className) {
      if (typeof className === 'string' && className.indexOf('.') !== -1) {
        // eslint-disable-next-line no-console
        console.warn('It looks like you\'re calling `ShallowWrapper::hasClass()` with a CSS selector. hasClass() expects a class name, not a CSS selector.');
      }
      return this.single('hasClass', function (n) {
        return (0, _RSTTraversal.hasClassName)(n, className);
      });
    }

    /**
     * Iterates through each node of the current wrapper and executes the provided function with a
     * wrapper around the corresponding node passed in as the first argument.
     *
     * @param {Function} fn
     * @returns {ShallowWrapper}
     */
  }, {
    key: "forEach",
    value: function forEach(fn) {
      var _this19 = this;
      this.getNodesInternal().forEach(function (n, i) {
        return fn.call(_this19, _this19.wrap(n), i);
      });
      return this;
    }

    /**
     * Maps the current array of nodes to another array. Each node is passed in as a `ShallowWrapper`
     * to the map function.
     *
     * @param {Function} fn
     * @returns {Array}
     */
  }, {
    key: "map",
    value: function map(fn) {
      var _this20 = this;
      return this.getNodesInternal().map(function (n, i) {
        return fn.call(_this20, _this20.wrap(n), i);
      });
    }

    /**
     * Reduces the current array of nodes to a value. Each node is passed in as a `ShallowWrapper`
     * to the reducer function.
     *
     * @param {Function} fn - the reducer function
     * @param {*} initialValue - the initial value
     * @returns {*}
     */
  }, {
    key: "reduce",
    value: function reduce(fn) {
      var _this21 = this;
      var initialValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      if (arguments.length > 1) {
        return this.getNodesInternal().reduce(function (accum, n, i) {
          return fn.call(_this21, accum, _this21.wrap(n), i);
        }, initialValue);
      }
      return this.getNodesInternal().reduce(function (accum, n, i) {
        return fn.call(_this21, i === 1 ? _this21.wrap(accum) : accum, _this21.wrap(n), i);
      });
    }

    /**
     * Reduces the current array of nodes to another array, from right to left. Each node is passed
     * in as a `ShallowWrapper` to the reducer function.
     *
     * @param {Function} fn - the reducer function
     * @param {*} initialValue - the initial value
     * @returns {*}
     */
  }, {
    key: "reduceRight",
    value: function reduceRight(fn) {
      var _this22 = this;
      var initialValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      if (arguments.length > 1) {
        return this.getNodesInternal().reduceRight(function (accum, n, i) {
          return fn.call(_this22, accum, _this22.wrap(n), i);
        }, initialValue);
      }
      return this.getNodesInternal().reduceRight(function (accum, n, i) {
        return fn.call(_this22, i === 1 ? _this22.wrap(accum) : accum, _this22.wrap(n), i);
      });
    }

    /**
     * Returns a new wrapper with a subset of the nodes of the original wrapper, according to the
     * rules of `Array#slice`.
     *
     * @param {Number} begin
     * @param {Number} end
     * @returns {ShallowWrapper}
     */
  }, {
    key: "slice",
    value: function slice(begin, end) {
      return this.wrap(this.getNodesInternal().slice(begin, end));
    }

    /**
     * Returns whether or not any of the nodes in the wrapper match the provided selector.
     *
     * @param {EnzymeSelector} selector
     * @returns {Boolean}
     */
  }, {
    key: "some",
    value: function some(selector) {
      if (this[ROOT] === this) {
        throw new Error('ShallowWrapper::some() can not be called on the root');
      }
      var predicate = (0, _selectors.buildPredicate)(selector);
      return this.getNodesInternal().some(predicate);
    }

    /**
     * Returns whether or not any of the nodes in the wrapper pass the provided predicate function.
     *
     * @param {Function} predicate
     * @returns {Boolean}
     */
  }, {
    key: "someWhere",
    value: function someWhere(predicate) {
      var _this23 = this;
      return this.getNodesInternal().some(function (n, i) {
        return predicate.call(_this23, _this23.wrap(n), i);
      });
    }

    /**
     * Returns whether or not all of the nodes in the wrapper match the provided selector.
     *
     * @param {EnzymeSelector} selector
     * @returns {Boolean}
     */
  }, {
    key: "every",
    value: function every(selector) {
      var predicate = (0, _selectors.buildPredicate)(selector);
      return this.getNodesInternal().every(predicate);
    }

    /**
     * Returns whether or not any of the nodes in the wrapper pass the provided predicate function.
     *
     * @param {Function} predicate
     * @returns {Boolean}
     */
  }, {
    key: "everyWhere",
    value: function everyWhere(predicate) {
      var _this24 = this;
      return this.getNodesInternal().every(function (n, i) {
        return predicate.call(_this24, _this24.wrap(n), i);
      });
    }

    /**
     * Utility method used to create new wrappers with a mapping function that returns an array of
     * nodes in response to a single node wrapper. The returned wrapper is a single wrapper around
     * all of the mapped nodes flattened (and de-duplicated).
     *
     * @param {Function} fn
     * @returns {ShallowWrapper}
     */
  }, {
    key: "flatMap",
    value: function flatMap(fn) {
      var _this25 = this;
      var nodes = this.getNodesInternal().map(function (n, i) {
        return fn.call(_this25, _this25.wrap(n), i);
      });
      var flattened = (0, _arrayPrototype["default"])(nodes, 1);
      return this.wrap(flattened.filter(Boolean));
    }

    /**
     * Finds all nodes in the current wrapper nodes' render trees that match the provided predicate
     * function. The predicate function will receive the nodes inside a ShallowWrapper as its
     * first argument.
     *
     * @param {Function} predicate
     * @returns {ShallowWrapper}
     */
  }, {
    key: "findWhere",
    value: function findWhere(predicate) {
      var _this26 = this;
      return findWhereUnwrapped(this, function (n) {
        var node = _this26.wrap(n);
        return node.length > 0 && predicate(node);
      });
    }

    /**
     * Returns the node at a given index of the current wrapper.
     *
     * @param index
     * @returns {ReactElement}
     */
  }, {
    key: "get",
    value: function get(index) {
      return this.getElements()[index];
    }

    /**
     * Returns a wrapper around the node at a given index of the current wrapper.
     *
     * @param index
     * @returns {ShallowWrapper}
     */
  }, {
    key: "at",
    value: function at(index) {
      var nodes = this.getNodesInternal();
      if (index < nodes.length) {
        return this.wrap(nodes[index]);
      }
      return this.wrap([]);
    }

    /**
     * Returns a wrapper around the first node of the current wrapper.
     *
     * @returns {ShallowWrapper}
     */
  }, {
    key: "first",
    value: function first() {
      return this.at(0);
    }

    /**
     * Returns a wrapper around the last node of the current wrapper.
     *
     * @returns {ShallowWrapper}
     */
  }, {
    key: "last",
    value: function last() {
      return this.at(this.length - 1);
    }

    /**
     * Delegates to exists()
     *
     * @returns {boolean}
     */
  }, {
    key: "isEmpty",
    value: function isEmpty() {
      // eslint-disable-next-line no-console
      console.warn('Enzyme::Deprecated method isEmpty() called, use exists() instead.');
      return !this.exists();
    }

    /**
     * Returns true if the current wrapper has nodes. False otherwise.
     * If called with a selector it returns `.find(selector).exists()` instead.
     *
     * @param {EnzymeSelector} selector (optional)
     * @returns {boolean}
     */
  }, {
    key: "exists",
    value: function exists() {
      var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      return arguments.length > 0 ? this.find(selector).exists() : this.length > 0;
    }

    /**
     * Utility method that throws an error if the current instance has a length other than one.
     * This is primarily used to enforce that certain methods are only run on a wrapper when it is
     * wrapping a single node.
     *
     * @param fn
     * @returns {*}
     */
  }, {
    key: "single",
    value: function single(name, fn) {
      var fnName = typeof name === 'string' ? name : 'unknown';
      var callback = typeof fn === 'function' ? fn : name;
      if (this.length !== 1) {
        throw new Error("Method \u201C".concat(fnName, "\u201D is meant to be run on 1 node. ").concat(this.length, " found instead."));
      }
      return callback.call(this, this.getNodeInternal());
    }

    /**
     * Helpful utility method to create a new wrapper with the same root as the current wrapper, with
     * any nodes passed in as the first parameter automatically wrapped.
     *
     * @param node
     * @returns {ShallowWrapper}
     */
  }, {
    key: "wrap",
    value: function wrap(node) {
      var root = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this[ROOT];
      if (node instanceof ShallowWrapper) {
        return node;
      }
      for (var _len3 = arguments.length, args = new Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
        args[_key3 - 2] = arguments[_key3];
      }
      return _construct(ShallowWrapper, [node, root].concat(args));
    }

    /**
     * Returns an HTML-like string of the shallow render for debugging purposes.
     *
     * @param {Object} [options] - Property bag of additional options.
     * @param {boolean} [options.ignoreProps] - if true, props are omitted from the string.
     * @param {boolean} [options.verbose] - if true, arrays and objects to be verbosely printed.
     * @returns {String}
     */
  }, {
    key: "debug",
    value: function debug() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return (0, _Debug.debugNodes)(this.getNodesInternal(), options);
    }

    /**
     * Invokes intercepter and returns itself. intercepter is called with itself.
     * This is helpful when debugging nodes in method chains.
     * @param fn
     * @returns {ShallowWrapper}
     */
  }, {
    key: "tap",
    value: function tap(intercepter) {
      intercepter(this);
      return this;
    }

    /**
     * Primarily useful for HOCs (higher-order components), this method may only be
     * run on a single, non-DOM node, and will return the node, shallow-rendered.
     *
     * @param {Object} options
     * @returns {ShallowWrapper}
     */
  }, {
    key: "dive",
    value: function dive() {
      var _this27 = this;
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var adapter = (0, _getAdapter["default"])(this[OPTIONS]);
      var name = 'dive';
      return this.single(name, function (n) {
        if (n && n.nodeType === 'host') {
          throw new TypeError("ShallowWrapper::".concat(name, "() can not be called on Host Components"));
        }
        var el = (0, _getAdapter["default"])(_this27[OPTIONS]).nodeToElement(n);
        if (!(0, _Utils.isCustomComponentElement)(el, adapter)) {
          throw new TypeError("ShallowWrapper::".concat(name, "() can only be called on components"));
        }
        var childOptions = makeInheritedChildOptions(_this27, options);
        return _this27.wrap(el, null, childOptions);
      });
    }

    /**
     * Strips out all the not host-nodes from the list of nodes
     *
     * This method is useful if you want to check for the presence of host nodes
     * (actually rendered HTML elements) ignoring the React nodes.
     */
  }, {
    key: "hostNodes",
    value: function hostNodes() {
      return this.filterWhere(function (n) {
        return typeof n.type() === 'string';
      });
    }
  }]);
}();
/**
 * Updates the context of the primary wrapper when the
 * `wrappingComponent` re-renders.
 */
function updatePrimaryRootContext(wrappingComponent) {
  var adapter = (0, _getAdapter["default"])(wrappingComponent[OPTIONS]);
  var primaryWrapper = wrappingComponent[PRIMARY_WRAPPER];
  var primaryRenderer = primaryWrapper[RENDERER];
  var primaryNode = primaryRenderer.getNode();
  var _getContextFromWrappi2 = getContextFromWrappingComponent(wrappingComponent, adapter),
    legacyContext = _getContextFromWrappi2.legacyContext,
    providerValues = _getContextFromWrappi2.providerValues;
  var prevProviderValues = primaryWrapper[PROVIDER_VALUES];
  primaryWrapper.setContext(_objectSpread(_objectSpread({}, wrappingComponent[PRIMARY_WRAPPER][OPTIONS].context), legacyContext));
  primaryWrapper[PROVIDER_VALUES] = new Map([].concat(_toConsumableArray(prevProviderValues), _toConsumableArray(providerValues)));
  if (typeof adapter.isContextConsumer === 'function' && adapter.isContextConsumer(primaryNode.type)) {
    var Consumer = primaryNode.type;
    // Adapters with an `isContextConsumer` method will definitely have a `getProviderFromConsumer`
    // method.
    var Provider = adapter.getProviderFromConsumer(Consumer);
    var newValue = providerValues.get(Provider);
    var oldValue = prevProviderValues.get(Provider);

    // Use referential comparison like React
    if (newValue !== oldValue) {
      primaryWrapper.rerender();
    }
  }
}

/**
 * A *special* "root" wrapper that represents the component passed as `wrappingComponent`.
 * It is linked to the primary root such that updates to it will update the primary.
 *
 * @class WrappingComponentWrapper
 */
var WrappingComponentWrapper = /*#__PURE__*/function (_ShallowWrapper) {
  function WrappingComponentWrapper(nodes, root, RootFinder) {
    var _this28;
    _classCallCheck(this, WrappingComponentWrapper);
    _this28 = _callSuper(this, WrappingComponentWrapper, [nodes]);
    (0, _Utils.privateSet)(_this28, PRIMARY_WRAPPER, root);
    (0, _Utils.privateSet)(_this28, ROOT_FINDER, RootFinder);
    return _this28;
  }

  /**
   * Like rerender() on ShallowWrapper, except it also does a "full render" of
   * itself and updates the primary ShallowWrapper's context.
   */
  _inherits(WrappingComponentWrapper, _ShallowWrapper);
  return _createClass(WrappingComponentWrapper, [{
    key: "rerender",
    value: function rerender() {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }
      var result = _superPropGet(WrappingComponentWrapper, "rerender", this, 3)(args);
      updatePrimaryRootContext(this);
      return result;
    }

    /**
     * Like setState() on ShallowWrapper, except it also does a "full render" of
     * itself and updates the primary ShallowWrapper's context.
     */
  }, {
    key: "setState",
    value: function setState() {
      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }
      var result = _superPropGet(WrappingComponentWrapper, "setState", this, 3)(args);
      updatePrimaryRootContext(this);
      return result;
    }

    // eslint-disable-next-line class-methods-use-this
  }, {
    key: "getWrappingComponent",
    value: function getWrappingComponent() {
      throw new Error('ShallowWrapper::getWrappingComponent() can only be called on the root');
    }
  }]);
}(ShallowWrapper);
if (_Utils.ITERATOR_SYMBOL) {
  Object.defineProperty(ShallowWrapper.prototype, _Utils.ITERATOR_SYMBOL, {
    configurable: true,
    value: function iterator() {
      var iter = this.getNodesInternal()[_Utils.ITERATOR_SYMBOL]();
      var adapter = (0, _getAdapter["default"])(this[OPTIONS]);
      return _defineProperty(_defineProperty({}, _Utils.ITERATOR_SYMBOL, function () {
        return this;
      }), "next", function next() {
        var next = iter.next();
        if (next.done) {
          return {
            done: true
          };
        }
        return {
          done: false,
          value: adapter.nodeToElement(next.value)
        };
      });
    }
  });
}
function privateWarning(prop, extraMessage) {
  Object.defineProperty(ShallowWrapper.prototype, prop, {
    get: function get() {
      throw new Error((0, _stringPrototype["default"])("\n        Attempted to access ShallowWrapper::".concat(prop, ", which was previously a private property on\n        Enzyme ShallowWrapper instances, but is no longer and should not be relied upon.\n        ").concat(extraMessage, "\n      ")));
    },
    enumerable: false,
    configurable: false
  });
}
privateWarning('node', 'Consider using the getElement() method instead.');
privateWarning('nodes', 'Consider using the getElements() method instead.');
privateWarning('renderer', '');
privateWarning('options', '');
privateWarning('complexSelector', '');
var _default = exports["default"] = ShallowWrapper;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfYXJyYXlQcm90b3R5cGUiLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0IiwicmVxdWlyZSIsIl9oYXNvd24iLCJfZW56eW1lU2hhbGxvd0VxdWFsIiwiX3N0cmluZ1Byb3RvdHlwZSIsIl9VdGlscyIsIl9nZXRBZGFwdGVyIiwiX0RlYnVnIiwiX1JTVFRyYXZlcnNhbCIsIl9zZWxlY3RvcnMiLCJlIiwiX19lc01vZHVsZSIsIl9jYWxsU3VwZXIiLCJ0IiwibyIsIl9nZXRQcm90b3R5cGVPZiIsIl9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuIiwiX2lzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCIsIlJlZmxlY3QiLCJjb25zdHJ1Y3QiLCJjb25zdHJ1Y3RvciIsImFwcGx5IiwiX3R5cGVvZiIsIlR5cGVFcnJvciIsIl9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQiLCJSZWZlcmVuY2VFcnJvciIsIl9zdXBlclByb3BHZXQiLCJyIiwicCIsIl9nZXQiLCJwcm90b3R5cGUiLCJnZXQiLCJiaW5kIiwiX3N1cGVyUHJvcEJhc2UiLCJuIiwiT2JqZWN0IiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwiY2FsbCIsImFyZ3VtZW50cyIsImxlbmd0aCIsInZhbHVlIiwiaGFzT3duUHJvcGVydHkiLCJzZXRQcm90b3R5cGVPZiIsImdldFByb3RvdHlwZU9mIiwiX19wcm90b19fIiwiX2luaGVyaXRzIiwiY3JlYXRlIiwid3JpdGFibGUiLCJjb25maWd1cmFibGUiLCJkZWZpbmVQcm9wZXJ0eSIsIl9zZXRQcm90b3R5cGVPZiIsIl9jb25zdHJ1Y3QiLCJwdXNoIiwiQm9vbGVhbiIsInZhbHVlT2YiLCJfdG9Db25zdW1hYmxlQXJyYXkiLCJfYXJyYXlXaXRob3V0SG9sZXMiLCJfaXRlcmFibGVUb0FycmF5IiwiX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5IiwiX25vbkl0ZXJhYmxlU3ByZWFkIiwiYSIsIl9hcnJheUxpa2VUb0FycmF5IiwidG9TdHJpbmciLCJzbGljZSIsIm5hbWUiLCJBcnJheSIsImZyb20iLCJ0ZXN0IiwiU3ltYm9sIiwiaXRlcmF0b3IiLCJpc0FycmF5IiwiX2NsYXNzQ2FsbENoZWNrIiwiX2RlZmluZVByb3BlcnRpZXMiLCJlbnVtZXJhYmxlIiwiX3RvUHJvcGVydHlLZXkiLCJrZXkiLCJfY3JlYXRlQ2xhc3MiLCJvd25LZXlzIiwia2V5cyIsImdldE93blByb3BlcnR5U3ltYm9scyIsImZpbHRlciIsIl9vYmplY3RTcHJlYWQiLCJmb3JFYWNoIiwiX2RlZmluZVByb3BlcnR5IiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyIsImRlZmluZVByb3BlcnRpZXMiLCJpIiwiX3RvUHJpbWl0aXZlIiwidG9QcmltaXRpdmUiLCJTdHJpbmciLCJOdW1iZXIiLCJOT0RFIiwic3ltIiwiTk9ERVMiLCJSRU5ERVJFUiIsIlVOUkVOREVSRUQiLCJST09UIiwiT1BUSU9OUyIsIlNFVF9TVEFURSIsIlJPT1RfTk9ERVMiLCJDSElMRF9DT05URVhUIiwiV1JBUFBJTkdfQ09NUE9ORU5UIiwiUFJJTUFSWV9XUkFQUEVSIiwiUk9PVF9GSU5ERVIiLCJQUk9WSURFUl9WQUxVRVMiLCJmaW5kV2hlcmVVbndyYXBwZWQiLCJ3cmFwcGVyIiwicHJlZGljYXRlIiwidW5kZWZpbmVkIiwidHJlZUZpbHRlciIsImZsYXRNYXAiLCJnZXROb2RlSW50ZXJuYWwiLCJmaWx0ZXJXaGVyZVVud3JhcHBlZCIsIndyYXAiLCJnZXROb2Rlc0ludGVybmFsIiwidmFsaWRhdGVPcHRpb25zIiwib3B0aW9ucyIsImxpZmVjeWNsZUV4cGVyaW1lbnRhbCIsImRpc2FibGVMaWZlY3ljbGVNZXRob2RzIiwiZW5hYmxlQ29tcG9uZW50RGlkVXBkYXRlT25TZXRTdGF0ZSIsInN1cHBvcnRQcmV2Q29udGV4dEFyZ3VtZW50T2ZDb21wb25lbnREaWRVcGRhdGUiLCJfb3B0aW9ucyRsaWZlY3ljbGVzIiwibGlmZWN5Y2xlcyIsIkVycm9yIiwiY29tcG9uZW50RGlkVXBkYXRlIiwib25TZXRTdGF0ZSIsInByZXZDb250ZXh0IiwiZ2V0QWRhcHRlckxpZmVjeWNsZXMiLCJfcmVmIiwiX29wdGlvbnMkbGlmZWN5Y2xlczIiLCJoYXNMZWdhY3lTZXRTdGF0ZUFyZyIsImhhc0xlZ2FjeVByZXZDb250ZXh0QXJnIiwib3JpZ2luYWxHRFNGUCIsImdldERlcml2ZWRTdGF0ZUZyb21Qcm9wcyIsImhhc1Nob3VsZENvbXBvbmVudFVwZGF0ZUJ1ZyIsInNldFN0YXRlIiwiZ2V0Q2hpbGRDb250ZXh0IiwiY2FsbGVkQnlSZW5kZXJlciIsImdldFJvb3ROb2RlIiwibm9kZSIsIm5vZGVUeXBlIiwicmVuZGVyZWQiLCJnZXRSb290Tm9kZUludGVybmFsIiwibm9kZVBhcmVudHMiLCJwYXJlbnRzT2ZOb2RlIiwicHJpdmF0ZVNldE5vZGVzIiwibm9kZXMiLCJwcml2YXRlU2V0IiwicHVyZUNvbXBvbmVudFNob3VsZENvbXBvbmVudFVwZGF0ZSIsInByZXZQcm9wcyIsInByb3BzIiwicHJldlN0YXRlIiwic3RhdGUiLCJzaGFsbG93RXF1YWwiLCJpc1B1cmVDb21wb25lbnQiLCJpbnN0YW5jZSIsImlzUHVyZVJlYWN0Q29tcG9uZW50IiwiaGllcmFyY2h5IiwicmVuZGVyZXIiLCJDb21wb25lbnQiLCJ0eXBlIiwiY29tcG9uZW50TmFtZSIsImRpc3BsYXlOYW1lT2ZOb2RlIiwiY2hpbGRDb250ZXh0VHlwZXMiLCJjb25zb2xlIiwid2FybiIsImNvbmNhdCIsImNoaWxkQ29udGV4dCIsImNoZWNrUHJvcFR5cGVzIiwic3B5T25HZXRDaGlsZENvbnRleHRJbml0aWFsUmVuZGVyIiwiYWRhcHRlciIsImlzQ3VzdG9tQ29tcG9uZW50RWxlbWVudCIsInNweU1ldGhvZCIsInByaXZhdGVTZXRDaGlsZENvbnRleHQiLCJyZW5kZXJlZE5vZGUiLCJnZXRDaGlsZENvbnRleHRTcHkiLCJsZWdhY3lDb250ZXh0TW9kZSIsImdldExhc3RSZXR1cm5WYWx1ZSIsInJlc3RvcmUiLCJub2RlSGllcmFyY2h5IiwibW9ja1NDVUlmZ0RTRlBSZXR1cm5Ob25OdWxsIiwiX3NweU1ldGhvZCIsIm9yaWdpbmFsU0NVIiwic2hvdWxkQ29tcG9uZW50VXBkYXRlIiwiX2xlbiIsImFyZ3MiLCJfa2V5Iiwic0NVUmVzdWx0IiwibmV4dFN0YXRlIiwiZGVlcFJlbmRlciIsInRhcmdldCIsImVsZW1lbnQiLCJub2RlVG9FbGVtZW50IiwiZGl2ZSIsImNoaWxkcmVuIiwiZm91bmQiLCJhdCIsImdldENvbnRleHRGcm9tV3JhcHBpbmdDb21wb25lbnQiLCJyb290RmluZGVyIiwibGVnYWN5Q29udGV4dCIsImNvbnRleHQiLCJwcm92aWRlclZhbHVlcyIsIm1ha2VTaGFsbG93T3B0aW9ucyIsInJvb3QiLCJwYXNzZWRPcHRpb25zIiwibWFrZU9wdGlvbnMiLCJnZXRBZGFwdGVyIiwiaXNDdXN0b21Db21wb25lbnQiLCJ3cmFwcGluZ0NvbXBvbmVudCIsIndyYXBXaXRoV3JhcHBpbmdDb21wb25lbnQiLCJfYWRhcHRlciR3cmFwV2l0aFdyYXAiLCJ3cmFwcGVkTm9kZSIsIlJvb3RGaW5kZXIiLCJXcmFwcGluZ0NvbXBvbmVudFdyYXBwZXIiLCJfZ2V0Q29udGV4dEZyb21XcmFwcGkiLCJ3cmFwcGluZ0NvbXBvbmVudExlZ2FjeUNvbnRleHQiLCJ3cmFwcGluZ0NvbXBvbmVudFByb3ZpZGVyVmFsdWVzIiwibWFrZUluaGVyaXRlZENoaWxkT3B0aW9ucyIsImNoaWxkT3B0aW9ucyIsIlNoYWxsb3dXcmFwcGVyIiwiX3RoaXMiLCJpc1ZhbGlkRWxlbWVudCIsImNyZWF0ZVJlbmRlcmVyIiwibW9kZSIsIk1hcCIsInJlbmRlciIsImdldE5vZGUiLCJ1cGRhdGVyIiwiY2FsbGJhY2siLCJjb21wb25lbnREaWRNb3VudCIsImJhdGNoZWRVcGRhdGVzIiwidXBkYXRlIiwiZ2V0RWxlbWVudCIsIl90aGlzMiIsInNpbmdsZSIsImdldEVsZW1lbnRzIiwiX3RoaXMzIiwibWFwIiwiZ2V0Tm9kZXMiLCJnZXRXcmFwcGluZ0NvbXBvbmVudCIsInVubW91bnQiLCJyZXJlbmRlciIsIl90aGlzNCIsIndpdGhTZXRTdGF0ZUFsbG93ZWQiLCJuZXh0Q29udGV4dCIsInNob3VsZFJlbmRlciIsInNob3VsZENvbXBvbmVudFVwZGF0ZVNweSIsImdEU0ZQIiwiY2xvbmVFbGVtZW50IiwiZ2V0U25hcHNob3RCZWZvcmVVcGRhdGUiLCJzbmFwc2hvdCIsImZyZWV6ZSIsInNldFByb3BzIiwiX3RoaXM1Iiwic3RhdGVQYXlsb2FkIiwibWF5YmVIYXNVcGRhdGUiLCJza2lwc0NvbXBvbmVudERpZFVwZGF0ZU9uTnVsbGlzaCIsImludm9rZVNldFN0YXRlQ2FsbGJhY2siLCJzZXRDb250ZXh0IiwiY29udGFpbnMiLCJub2RlT3JOb2RlcyIsImlzUmVhY3RFbGVtZW50QWxpa2UiLCJvdGhlciIsImNvbnRhaW5zQ2hpbGRyZW5TdWJBcnJheSIsIm5vZGVFcXVhbCIsImVsZW1lbnRUb05vZGUiLCJjb250YWluc01hdGNoaW5nRWxlbWVudCIsInJzdE5vZGUiLCJub2RlTWF0Y2hlcyIsImIiLCJjb250YWluc0FsbE1hdGNoaW5nRWxlbWVudHMiLCJfdGhpczYiLCJldmVyeSIsImNvbnRhaW5zQW55TWF0Y2hpbmdFbGVtZW50cyIsIl90aGlzNyIsInNvbWUiLCJlcXVhbHMiLCJfdGhpczgiLCJtYXRjaGVzRWxlbWVudCIsIl90aGlzOSIsImZpbmQiLCJzZWxlY3RvciIsInJlZHVjZVRyZWVzQnlTZWxlY3RvciIsImlzIiwiYnVpbGRQcmVkaWNhdGUiLCJpc0VtcHR5UmVuZGVyIiwiaXNFbXB0eVZhbHVlIiwiZmlsdGVyV2hlcmUiLCJfdGhpczAiLCJub3QiLCJ0ZXh0IiwiZ2V0VGV4dEZyb21Ob2RlIiwiaHRtbCIsIl90aGlzMSIsImxvYWRDaGVlcmlvUm9vdCIsInNpbXVsYXRlIiwiZXZlbnQiLCJfdGhpczEwIiwiX2xlbjIiLCJfa2V5MiIsIl90aGlzMTAkUkVOREVSRVIiLCJzaW11bGF0ZUV2ZW50Iiwic2ltdWxhdGVFcnJvciIsImVycm9yIiwiX3RoaXMxMSIsInRoaXNOb2RlIiwicm9vdE5vZGUiLCJwcm9wc09mTm9kZSIsIl90aGlzMTIiLCJfc3RhdGUiLCJfdGhpczEzIiwiX2NvbnRleHQiLCJhbGxDaGlsZHJlbiIsImNoaWxkcmVuT2ZOb2RlIiwiY2hpbGRBdCIsImluZGV4IiwiX3RoaXMxNCIsInBhcmVudHMiLCJfdGhpczE1IiwiYWxsUGFyZW50cyIsInBhcmVudCIsImNsb3Nlc3QiLCJtYXRjaGluZ0FuY2VzdG9ycyIsImZpcnN0IiwiZmluZFdoZXJlIiwic2hhbGxvdyIsIl90aGlzMTYiLCJwcm9wIiwicHJvcE5hbWUiLCJpbnZva2UiLCJfdGhpczE3IiwiaGFuZGxlciIsInJlc3BvbnNlIiwicmVuZGVyUHJvcCIsIl90aGlzMTgiLCJSYW5nZUVycm9yIiwiaGFzT3duIiwicHJvcFZhbHVlIiwid3JhcHBlZCIsInR5cGVPZk5vZGUiLCJoYXNDbGFzcyIsImNsYXNzTmFtZSIsImluZGV4T2YiLCJoYXNDbGFzc05hbWUiLCJmbiIsIl90aGlzMTkiLCJfdGhpczIwIiwicmVkdWNlIiwiX3RoaXMyMSIsImluaXRpYWxWYWx1ZSIsImFjY3VtIiwicmVkdWNlUmlnaHQiLCJfdGhpczIyIiwiYmVnaW4iLCJlbmQiLCJzb21lV2hlcmUiLCJfdGhpczIzIiwiZXZlcnlXaGVyZSIsIl90aGlzMjQiLCJfdGhpczI1IiwiZmxhdHRlbmVkIiwiZmxhdCIsIl90aGlzMjYiLCJsYXN0IiwiaXNFbXB0eSIsImV4aXN0cyIsImZuTmFtZSIsIl9sZW4zIiwiX2tleTMiLCJkZWJ1ZyIsImRlYnVnTm9kZXMiLCJ0YXAiLCJpbnRlcmNlcHRlciIsIl90aGlzMjciLCJlbCIsImhvc3ROb2RlcyIsInVwZGF0ZVByaW1hcnlSb290Q29udGV4dCIsInByaW1hcnlXcmFwcGVyIiwicHJpbWFyeVJlbmRlcmVyIiwicHJpbWFyeU5vZGUiLCJfZ2V0Q29udGV4dEZyb21XcmFwcGkyIiwicHJldlByb3ZpZGVyVmFsdWVzIiwiaXNDb250ZXh0Q29uc3VtZXIiLCJDb25zdW1lciIsIlByb3ZpZGVyIiwiZ2V0UHJvdmlkZXJGcm9tQ29uc3VtZXIiLCJuZXdWYWx1ZSIsIm9sZFZhbHVlIiwiX1NoYWxsb3dXcmFwcGVyIiwiX3RoaXMyOCIsIl9sZW40IiwiX2tleTQiLCJyZXN1bHQiLCJfbGVuNSIsIl9rZXk1IiwiSVRFUkFUT1JfU1lNQk9MIiwiaXRlciIsIm5leHQiLCJkb25lIiwicHJpdmF0ZVdhcm5pbmciLCJleHRyYU1lc3NhZ2UiLCJ0cmltIiwiX2RlZmF1bHQiLCJleHBvcnRzIiwibW9kdWxlIiwiZGVmYXVsdCJdLCJzb3VyY2VzIjpbIi4uL3NyYy9TaGFsbG93V3JhcHBlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZmxhdCBmcm9tICdhcnJheS5wcm90b3R5cGUuZmxhdCc7XG5pbXBvcnQgaGFzT3duIGZyb20gJ2hhc293bic7XG5pbXBvcnQgc2hhbGxvd0VxdWFsIGZyb20gJ2VuenltZS1zaGFsbG93LWVxdWFsJztcbmltcG9ydCB0cmltIGZyb20gJ3N0cmluZy5wcm90b3R5cGUudHJpbSc7XG5cbmltcG9ydCB7XG4gIG5vZGVFcXVhbCxcbiAgbm9kZU1hdGNoZXMsXG4gIGNvbnRhaW5zQ2hpbGRyZW5TdWJBcnJheSxcbiAgd2l0aFNldFN0YXRlQWxsb3dlZCxcbiAgdHlwZU9mTm9kZSxcbiAgaXNSZWFjdEVsZW1lbnRBbGlrZSxcbiAgZGlzcGxheU5hbWVPZk5vZGUsXG4gIGlzQ3VzdG9tQ29tcG9uZW50LFxuICBpc0N1c3RvbUNvbXBvbmVudEVsZW1lbnQsXG4gIElURVJBVE9SX1NZTUJPTCxcbiAgbWFrZU9wdGlvbnMsXG4gIHN5bSxcbiAgcHJpdmF0ZVNldCxcbiAgY2xvbmVFbGVtZW50LFxuICBzcHlNZXRob2QsXG4gIGlzRW1wdHlWYWx1ZSxcbiAgbG9hZENoZWVyaW9Sb290LFxufSBmcm9tICcuL1V0aWxzJztcbmltcG9ydCBnZXRBZGFwdGVyIGZyb20gJy4vZ2V0QWRhcHRlcic7XG5pbXBvcnQgeyBkZWJ1Z05vZGVzIH0gZnJvbSAnLi9EZWJ1Zyc7XG5pbXBvcnQge1xuICBwcm9wc09mTm9kZSxcbiAgZ2V0VGV4dEZyb21Ob2RlLFxuICBoYXNDbGFzc05hbWUsXG4gIGNoaWxkcmVuT2ZOb2RlLFxuICBwYXJlbnRzT2ZOb2RlLFxuICB0cmVlRmlsdGVyLFxufSBmcm9tICcuL1JTVFRyYXZlcnNhbCc7XG5pbXBvcnQgeyBidWlsZFByZWRpY2F0ZSwgcmVkdWNlVHJlZXNCeVNlbGVjdG9yIH0gZnJvbSAnLi9zZWxlY3RvcnMnO1xuXG5jb25zdCBOT0RFID0gc3ltKCdfX25vZGVfXycpO1xuY29uc3QgTk9ERVMgPSBzeW0oJ19fbm9kZXNfXycpO1xuY29uc3QgUkVOREVSRVIgPSBzeW0oJ19fcmVuZGVyZXJfXycpO1xuY29uc3QgVU5SRU5ERVJFRCA9IHN5bSgnX191bnJlbmRlcmVkX18nKTtcbmNvbnN0IFJPT1QgPSBzeW0oJ19fcm9vdF9fJyk7XG5jb25zdCBPUFRJT05TID0gc3ltKCdfX29wdGlvbnNfXycpO1xuY29uc3QgU0VUX1NUQVRFID0gc3ltKCdfX3NldFN0YXRlX18nKTtcbmNvbnN0IFJPT1RfTk9ERVMgPSBzeW0oJ19fcm9vdE5vZGVzX18nKTtcbmNvbnN0IENISUxEX0NPTlRFWFQgPSBzeW0oJ19fY2hpbGRDb250ZXh0X18nKTtcbmNvbnN0IFdSQVBQSU5HX0NPTVBPTkVOVCA9IHN5bSgnX193cmFwcGluZ0NvbXBvbmVudF9fJyk7XG5jb25zdCBQUklNQVJZX1dSQVBQRVIgPSBzeW0oJ19fcHJpbWFyeVdyYXBwZXJfXycpO1xuY29uc3QgUk9PVF9GSU5ERVIgPSBzeW0oJ19fcm9vdEZpbmRlcl9fJyk7XG5jb25zdCBQUk9WSURFUl9WQUxVRVMgPSBzeW0oJ19fcHJvdmlkZXJWYWx1ZXNfXycpO1xuXG4vKipcbiAqIEZpbmRzIGFsbCBub2RlcyBpbiB0aGUgY3VycmVudCB3cmFwcGVyIG5vZGVzJyByZW5kZXIgdHJlZXMgdGhhdCBtYXRjaCB0aGUgcHJvdmlkZWQgcHJlZGljYXRlXG4gKiBmdW5jdGlvbi5cbiAqXG4gKiBAcGFyYW0ge1NoYWxsb3dXcmFwcGVyfSB3cmFwcGVyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBwcmVkaWNhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZpbHRlclxuICogQHJldHVybnMge1NoYWxsb3dXcmFwcGVyfVxuICovXG5mdW5jdGlvbiBmaW5kV2hlcmVVbndyYXBwZWQod3JhcHBlciwgcHJlZGljYXRlLCBmaWx0ZXIgPSB0cmVlRmlsdGVyKSB7XG4gIHJldHVybiB3cmFwcGVyLmZsYXRNYXAoKG4pID0+IGZpbHRlcihuLmdldE5vZGVJbnRlcm5hbCgpLCBwcmVkaWNhdGUpKTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgbmV3IHdyYXBwZXIgaW5zdGFuY2Ugd2l0aCBvbmx5IHRoZSBub2RlcyBvZiB0aGUgY3VycmVudCB3cmFwcGVyIGluc3RhbmNlIHRoYXQgbWF0Y2hcbiAqIHRoZSBwcm92aWRlZCBwcmVkaWNhdGUgZnVuY3Rpb24uXG4gKlxuICogQHBhcmFtIHtTaGFsbG93V3JhcHBlcn0gd3JhcHBlclxuICogQHBhcmFtIHtGdW5jdGlvbn0gcHJlZGljYXRlXG4gKiBAcmV0dXJucyB7U2hhbGxvd1dyYXBwZXJ9XG4gKi9cbmZ1bmN0aW9uIGZpbHRlcldoZXJlVW53cmFwcGVkKHdyYXBwZXIsIHByZWRpY2F0ZSkge1xuICByZXR1cm4gd3JhcHBlci53cmFwKHdyYXBwZXIuZ2V0Tm9kZXNJbnRlcm5hbCgpLmZpbHRlcihwcmVkaWNhdGUpLmZpbHRlcihCb29sZWFuKSk7XG59XG5cbi8qKlxuICogRW5zdXJlIG9wdGlvbnMgcGFzc2VkIHRvIFNoYWxsb3dXcmFwcGVyIGFyZSB2YWxpZC4gVGhyb3dzIG90aGVyd2lzZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gKi9cbmZ1bmN0aW9uIHZhbGlkYXRlT3B0aW9ucyhvcHRpb25zKSB7XG4gIGNvbnN0IHtcbiAgICBsaWZlY3ljbGVFeHBlcmltZW50YWwsXG4gICAgZGlzYWJsZUxpZmVjeWNsZU1ldGhvZHMsXG4gICAgZW5hYmxlQ29tcG9uZW50RGlkVXBkYXRlT25TZXRTdGF0ZSxcbiAgICBzdXBwb3J0UHJldkNvbnRleHRBcmd1bWVudE9mQ29tcG9uZW50RGlkVXBkYXRlLFxuICAgIGxpZmVjeWNsZXMgPSB7fSxcbiAgfSA9IG9wdGlvbnM7XG4gIGlmICh0eXBlb2YgbGlmZWN5Y2xlRXhwZXJpbWVudGFsICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgbGlmZWN5Y2xlRXhwZXJpbWVudGFsICE9PSAnYm9vbGVhbicpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2xpZmVjeWNsZUV4cGVyaW1lbnRhbCBtdXN0IGJlIGVpdGhlciB0cnVlIG9yIGZhbHNlIGlmIHByb3ZpZGVkJyk7XG4gIH1cblxuICBpZiAodHlwZW9mIGRpc2FibGVMaWZlY3ljbGVNZXRob2RzICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgZGlzYWJsZUxpZmVjeWNsZU1ldGhvZHMgIT09ICdib29sZWFuJykge1xuICAgIHRocm93IG5ldyBFcnJvcignZGlzYWJsZUxpZmVjeWNsZU1ldGhvZHMgbXVzdCBiZSBlaXRoZXIgdHJ1ZSBvciBmYWxzZSBpZiBwcm92aWRlZCcpO1xuICB9XG5cbiAgaWYgKFxuICAgIGxpZmVjeWNsZUV4cGVyaW1lbnRhbCAhPSBudWxsXG4gICAgJiYgZGlzYWJsZUxpZmVjeWNsZU1ldGhvZHMgIT0gbnVsbFxuICAgICYmIGxpZmVjeWNsZUV4cGVyaW1lbnRhbCA9PT0gZGlzYWJsZUxpZmVjeWNsZU1ldGhvZHNcbiAgKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdsaWZlY3ljbGVFeHBlcmltZW50YWwgYW5kIGRpc2FibGVMaWZlY3ljbGVNZXRob2RzIGNhbm5vdCBiZSBzZXQgdG8gdGhlIHNhbWUgdmFsdWUnKTtcbiAgfVxuXG4gIGlmIChcbiAgICB0eXBlb2YgZW5hYmxlQ29tcG9uZW50RGlkVXBkYXRlT25TZXRTdGF0ZSAhPT0gJ3VuZGVmaW5lZCdcbiAgICAmJiBsaWZlY3ljbGVzLmNvbXBvbmVudERpZFVwZGF0ZVxuICAgICYmIGxpZmVjeWNsZXMuY29tcG9uZW50RGlkVXBkYXRlLm9uU2V0U3RhdGUgIT09IGVuYWJsZUNvbXBvbmVudERpZFVwZGF0ZU9uU2V0U3RhdGVcbiAgKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcigndGhlIGxlZ2FjeSBlbmFibGVDb21wb25lbnREaWRVcGRhdGVPblNldFN0YXRlIG9wdGlvbiBzaG91bGQgYmUgbWF0Y2hlZCBieSBgbGlmZWN5Y2xlczogeyBjb21wb25lbnREaWRVcGRhdGU6IHsgb25TZXRTdGF0ZTogdHJ1ZSB9IH1gLCBmb3IgY29tcGF0aWJpbGl0eScpO1xuICB9XG5cbiAgaWYgKFxuICAgIHR5cGVvZiBzdXBwb3J0UHJldkNvbnRleHRBcmd1bWVudE9mQ29tcG9uZW50RGlkVXBkYXRlICE9PSAndW5kZWZpbmVkJ1xuICAgICYmIGxpZmVjeWNsZXMuY29tcG9uZW50RGlkVXBkYXRlXG4gICAgJiYgbGlmZWN5Y2xlcy5jb21wb25lbnREaWRVcGRhdGUucHJldkNvbnRleHQgIT09IHN1cHBvcnRQcmV2Q29udGV4dEFyZ3VtZW50T2ZDb21wb25lbnREaWRVcGRhdGVcbiAgKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcigndGhlIGxlZ2FjeSBzdXBwb3J0UHJldkNvbnRleHRBcmd1bWVudE9mQ29tcG9uZW50RGlkVXBkYXRlIG9wdGlvbiBzaG91bGQgYmUgbWF0Y2hlZCBieSBgbGlmZWN5Y2xlczogeyBjb21wb25lbnREaWRVcGRhdGU6IHsgcHJldkNvbnRleHQ6IHRydWUgfSB9YCwgZm9yIGNvbXBhdGliaWxpdHknKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRBZGFwdGVyTGlmZWN5Y2xlcyh7IG9wdGlvbnMgfSkge1xuICBjb25zdCB7XG4gICAgbGlmZWN5Y2xlcyA9IHt9LFxuICAgIGVuYWJsZUNvbXBvbmVudERpZFVwZGF0ZU9uU2V0U3RhdGUsXG4gICAgc3VwcG9ydFByZXZDb250ZXh0QXJndW1lbnRPZkNvbXBvbmVudERpZFVwZGF0ZSxcbiAgfSA9IG9wdGlvbnM7XG5cbiAgY29uc3QgaGFzTGVnYWN5U2V0U3RhdGVBcmcgPSB0eXBlb2YgZW5hYmxlQ29tcG9uZW50RGlkVXBkYXRlT25TZXRTdGF0ZSAhPT0gJ3VuZGVmaW5lZCc7XG4gIGNvbnN0IGhhc0xlZ2FjeVByZXZDb250ZXh0QXJnID0gdHlwZW9mIHN1cHBvcnRQcmV2Q29udGV4dEFyZ3VtZW50T2ZDb21wb25lbnREaWRVcGRhdGUgIT09ICd1bmRlZmluZWQnO1xuICBjb25zdCBjb21wb25lbnREaWRVcGRhdGUgPSBoYXNMZWdhY3lTZXRTdGF0ZUFyZyB8fCBoYXNMZWdhY3lQcmV2Q29udGV4dEFyZ1xuICAgID8ge1xuICAgICAgLi4uKGhhc0xlZ2FjeVNldFN0YXRlQXJnICYmIHtcbiAgICAgICAgb25TZXRTdGF0ZTogISFlbmFibGVDb21wb25lbnREaWRVcGRhdGVPblNldFN0YXRlLFxuICAgICAgfSksXG4gICAgICAuLi4oaGFzTGVnYWN5UHJldkNvbnRleHRBcmcgJiYge1xuICAgICAgICBwcmV2Q29udGV4dDogISFzdXBwb3J0UHJldkNvbnRleHRBcmd1bWVudE9mQ29tcG9uZW50RGlkVXBkYXRlLFxuICAgICAgfSksXG4gICAgfVxuICAgIDogbnVsbDtcbiAgY29uc3QgeyBnZXREZXJpdmVkU3RhdGVGcm9tUHJvcHM6IG9yaWdpbmFsR0RTRlAgfSA9IGxpZmVjeWNsZXM7XG4gIGNvbnN0IGdldERlcml2ZWRTdGF0ZUZyb21Qcm9wcyA9IG9yaWdpbmFsR0RTRlAgPyB7XG4gICAgaGFzU2hvdWxkQ29tcG9uZW50VXBkYXRlQnVnOiAhIW9yaWdpbmFsR0RTRlAuaGFzU2hvdWxkQ29tcG9uZW50VXBkYXRlQnVnLFxuICB9IDogZmFsc2U7XG5cbiAgcmV0dXJuIHtcbiAgICAuLi5saWZlY3ljbGVzLFxuICAgIHNldFN0YXRlOiB7XG4gICAgICAuLi5saWZlY3ljbGVzLnNldFN0YXRlLFxuICAgIH0sXG4gICAgZ2V0Q2hpbGRDb250ZXh0OiB7XG4gICAgICBjYWxsZWRCeVJlbmRlcmVyOiB0cnVlLFxuICAgICAgLi4ubGlmZWN5Y2xlcy5nZXRDaGlsZENvbnRleHQsXG4gICAgfSxcbiAgICAuLi4oY29tcG9uZW50RGlkVXBkYXRlICYmIHsgY29tcG9uZW50RGlkVXBkYXRlIH0pLFxuICAgIGdldERlcml2ZWRTdGF0ZUZyb21Qcm9wcyxcbiAgfTtcbn1cblxuZnVuY3Rpb24gZ2V0Um9vdE5vZGUobm9kZSkge1xuICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gJ2hvc3QnKSB7XG4gICAgcmV0dXJuIG5vZGU7XG4gIH1cbiAgcmV0dXJuIG5vZGUucmVuZGVyZWQ7XG59XG5cbmZ1bmN0aW9uIGdldFJvb3ROb2RlSW50ZXJuYWwod3JhcHBlcikge1xuICBpZiAod3JhcHBlcltST09UXS5sZW5ndGggIT09IDEpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2dldFJvb3ROb2RlSW50ZXJuYWwod3JhcHBlcikgY2FuIG9ubHkgYmUgY2FsbGVkIHdoZW4gd3JhcHBlciB3cmFwcyBvbmUgbm9kZScpO1xuICB9XG4gIGlmICh3cmFwcGVyW1JPT1RdICE9PSB3cmFwcGVyKSB7XG4gICAgcmV0dXJuIHdyYXBwZXJbUk9PVF9OT0RFU11bMF07XG4gIH1cbiAgcmV0dXJuIHdyYXBwZXJbUk9PVF1bTk9ERV07XG59XG5cbmZ1bmN0aW9uIG5vZGVQYXJlbnRzKHdyYXBwZXIsIG5vZGUpIHtcbiAgcmV0dXJuIHBhcmVudHNPZk5vZGUobm9kZSwgZ2V0Um9vdE5vZGVJbnRlcm5hbCh3cmFwcGVyKSk7XG59XG5cbmZ1bmN0aW9uIHByaXZhdGVTZXROb2Rlcyh3cmFwcGVyLCBub2Rlcykge1xuICBpZiAoIUFycmF5LmlzQXJyYXkobm9kZXMpKSB7XG4gICAgcHJpdmF0ZVNldCh3cmFwcGVyLCBOT0RFLCBub2Rlcyk7XG4gICAgcHJpdmF0ZVNldCh3cmFwcGVyLCBOT0RFUywgW25vZGVzXSk7XG4gIH0gZWxzZSB7XG4gICAgcHJpdmF0ZVNldCh3cmFwcGVyLCBOT0RFLCBub2Rlc1swXSk7XG4gICAgcHJpdmF0ZVNldCh3cmFwcGVyLCBOT0RFUywgbm9kZXMpO1xuICB9XG4gIHByaXZhdGVTZXQod3JhcHBlciwgJ2xlbmd0aCcsIHdyYXBwZXJbTk9ERVNdLmxlbmd0aCk7XG59XG5cbmZ1bmN0aW9uIHB1cmVDb21wb25lbnRTaG91bGRDb21wb25lbnRVcGRhdGUocHJldlByb3BzLCBwcm9wcywgcHJldlN0YXRlLCBzdGF0ZSkge1xuICByZXR1cm4gIXNoYWxsb3dFcXVhbChwcmV2UHJvcHMsIHByb3BzKSB8fCAhc2hhbGxvd0VxdWFsKHByZXZTdGF0ZSwgc3RhdGUpO1xufVxuXG5mdW5jdGlvbiBpc1B1cmVDb21wb25lbnQoaW5zdGFuY2UpIHtcbiAgcmV0dXJuIGluc3RhbmNlICYmIGluc3RhbmNlLmlzUHVyZVJlYWN0Q29tcG9uZW50O1xufVxuXG5mdW5jdGlvbiBnZXRDaGlsZENvbnRleHQobm9kZSwgaGllcmFyY2h5LCByZW5kZXJlcikge1xuICBjb25zdCB7IGluc3RhbmNlLCB0eXBlOiBDb21wb25lbnQgfSA9IG5vZGU7XG4gIGNvbnN0IGNvbXBvbmVudE5hbWUgPSBkaXNwbGF5TmFtZU9mTm9kZShub2RlKTtcbiAgLy8gV2FybiBsaWtlIHJlYWN0IGlmIGNoaWxkQ29udGV4dFR5cGVzIGlzIG5vdCBkZWZpbmVkOlxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVhY3QvYmxvYi8xNDU0YThiZTAzNzk0ZjVlMGIyM2E3ZTc2OTZjYmJiZGNmOGIwZjVkL3BhY2thZ2VzL3JlYWN0LWRvbS9zcmMvc2VydmVyL1JlYWN0UGFydGlhbFJlbmRlcmVyLmpzI0w2MzktTDY0NlxuICBpZiAodHlwZW9mIENvbXBvbmVudC5jaGlsZENvbnRleHRUeXBlcyAhPT0gJ29iamVjdCcpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgIGNvbnNvbGUud2FybihcbiAgICAgIGAke2NvbXBvbmVudE5hbWV9LmdldENoaWxkQ29udGV4dCgpOiBjaGlsZENvbnRleHRUeXBlcyBtdXN0IGJlIGRlZmluZWQgaW4gb3JkZXIgdG8gdXNlIGdldENoaWxkQ29udGV4dCgpLmAsXG4gICAgKTtcbiAgICByZXR1cm4ge307XG4gIH1cbiAgLy8gQ2hlY2sgY2hpbGRDb250ZXh0VHlwZXMgbGlrZSByZWFjdDpcbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlYWN0L2Jsb2IvMTQ1NGE4YmUwMzc5NGY1ZTBiMjNhN2U3Njk2Y2JiYmRjZjhiMGY1ZC9wYWNrYWdlcy9yZWFjdC1kb20vc3JjL3NlcnZlci9SZWFjdFBhcnRpYWxSZW5kZXJlci5qcyNMNjMwLUw2MzdcbiAgY29uc3QgY2hpbGRDb250ZXh0ID0gaW5zdGFuY2UuZ2V0Q2hpbGRDb250ZXh0KCk7XG4gIE9iamVjdC5rZXlzKGNoaWxkQ29udGV4dCkuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgaWYgKCEoa2V5IGluIENvbXBvbmVudC5jaGlsZENvbnRleHRUeXBlcykpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYCR7Y29tcG9uZW50TmFtZX0uZ2V0Q2hpbGRDb250ZXh0KCk6IGtleSBcIiR7a2V5fVwiIGlzIG5vdCBkZWZpbmVkIGluIGNoaWxkQ29udGV4dFR5cGVzLmAsXG4gICAgICApO1xuICAgIH1cbiAgfSk7XG4gIGlmICh0eXBlb2YgcmVuZGVyZXIuY2hlY2tQcm9wVHlwZXMgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZW5kZXJlci5jaGVja1Byb3BUeXBlcyhDb21wb25lbnQuY2hpbGRDb250ZXh0VHlwZXMsIGNoaWxkQ29udGV4dCwgJ2NoaWxkIGNvbnRleHQnLCBoaWVyYXJjaHkpO1xuICB9XG4gIHJldHVybiBjaGlsZENvbnRleHQ7XG59XG5cbmZ1bmN0aW9uIHNweU9uR2V0Q2hpbGRDb250ZXh0SW5pdGlhbFJlbmRlcihub2RlcywgYWRhcHRlcikge1xuICBpZiAoXG4gICAgIWlzQ3VzdG9tQ29tcG9uZW50RWxlbWVudChub2RlcywgYWRhcHRlcilcbiAgICB8fCAhbm9kZXMudHlwZS5wcm90b3R5cGVcbiAgICB8fCB0eXBlb2Ygbm9kZXMudHlwZS5wcm90b3R5cGUuZ2V0Q2hpbGRDb250ZXh0ICE9PSAnZnVuY3Rpb24nXG4gICkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcmV0dXJuIHNweU1ldGhvZChub2Rlcy50eXBlLnByb3RvdHlwZSwgJ2dldENoaWxkQ29udGV4dCcpO1xufVxuXG5mdW5jdGlvbiBwcml2YXRlU2V0Q2hpbGRDb250ZXh0KGFkYXB0ZXIsIHdyYXBwZXIsIGluc3RhbmNlLCByZW5kZXJlZE5vZGUsIGdldENoaWxkQ29udGV4dFNweSkge1xuICBjb25zdCByZW5kZXJlciA9IHdyYXBwZXJbUkVOREVSRVJdO1xuICAvLyBXZSBvbmx5IHN1cHBvcnQgcGFyZW50LWJhc2VkIGNvbnRleHQuXG4gIGlmIChhZGFwdGVyLm9wdGlvbnMubGVnYWN5Q29udGV4dE1vZGUgIT09ICdwYXJlbnQnKSB7IHJldHVybjsgfVxuICBpZiAoZ2V0Q2hpbGRDb250ZXh0U3B5KSB7XG4gICAgcHJpdmF0ZVNldCh3cmFwcGVyLCBDSElMRF9DT05URVhULCBnZXRDaGlsZENvbnRleHRTcHkuZ2V0TGFzdFJldHVyblZhbHVlKCkpO1xuICAgIGdldENoaWxkQ29udGV4dFNweS5yZXN0b3JlKCk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGluc3RhbmNlLmdldENoaWxkQ29udGV4dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIC8vIElmIHRoZXJlJ3Mgbm8gc3B5IGJ1dCBnZXRDaGlsZENvbnRleHQgaXMgYSBmdW5jdGlvbiwgdGhhdCBtZWFucyBvdXIgcmVuZGVyZXJcbiAgICAvLyBpcyBub3QgZ29pbmcgdG8gY2FsbCBpdCBmb3IgdXMsIHNvIHdlIG5lZWQgdG8gY2FsbCBpdCBvdXJzZWx2ZXMuXG4gICAgY29uc3Qgbm9kZUhpZXJhcmNoeSA9IFt3cmFwcGVyW05PREVdXS5jb25jYXQobm9kZVBhcmVudHMod3JhcHBlciwgd3JhcHBlcltOT0RFXSkpO1xuICAgIGNvbnN0IGNoaWxkQ29udGV4dCA9IGdldENoaWxkQ29udGV4dChyZW5kZXJlZE5vZGUsIG5vZGVIaWVyYXJjaHksIHJlbmRlcmVyKTtcbiAgICBwcml2YXRlU2V0KHdyYXBwZXIsIENISUxEX0NPTlRFWFQsIGNoaWxkQ29udGV4dCk7XG4gIH0gZWxzZSB7XG4gICAgcHJpdmF0ZVNldCh3cmFwcGVyLCBDSElMRF9DT05URVhULCBudWxsKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBtb2NrU0NVSWZnRFNGUFJldHVybk5vbk51bGwobm9kZSwgc3RhdGUpIHtcbiAgY29uc3QgeyBnZXREZXJpdmVkU3RhdGVGcm9tUHJvcHMgfSA9IG5vZGUudHlwZTtcblxuICBpZiAodHlwZW9mIGdldERlcml2ZWRTdGF0ZUZyb21Qcm9wcyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIC8vIHdlIHRyeSB0byBmaXggYSBSZWFjdCBzaGFsbG93IHJlbmRlcmVyIGJ1ZyBoZXJlLlxuICAgIC8vIChmYWNlYm9vay9yZWFjdCMxNDYwNywgd2hpY2ggaGFzIGJlZW4gZml4ZWQgaW4gcmVhY3QgMTYuOCk6XG4gICAgLy8gd2hlbiBnRFNGUCByZXR1cm4gZGVyaXZlZCBzdGF0ZSwgaXQgd2lsbCBzZXQgaW5zdGFuY2Ugc3RhdGUgaW4gc2hhbGxvdyByZW5kZXJlciBiZWZvcmUgU0NVLFxuICAgIC8vIHRoaXMgd2lsbCBjYXVzZSBgdGhpcy5zdGF0ZWAgaW4gc0NVIGJlIHRoZSB1cGRhdGVkIHN0YXRlLCB3aGljaCBpcyB3cm9uZyBiZWhhdmlvci5cbiAgICAvLyBzbyB3ZSBoYXZlIHRvIHdyYXAgc0NVIHRvIHBhc3MgdGhlIG9sZCBzdGF0ZSB0byBvcmlnaW5hbCBzQ1UuXG4gICAgY29uc3QgeyBpbnN0YW5jZSB9ID0gbm9kZTtcbiAgICBjb25zdCB7IHJlc3RvcmUgfSA9IHNweU1ldGhvZChcbiAgICAgIGluc3RhbmNlLFxuICAgICAgJ3Nob3VsZENvbXBvbmVudFVwZGF0ZScsXG4gICAgICAob3JpZ2luYWxTQ1UpID0+IGZ1bmN0aW9uIHNob3VsZENvbXBvbmVudFVwZGF0ZSguLi5hcmdzKSB7XG4gICAgICAgIGluc3RhbmNlLnN0YXRlID0gc3RhdGU7XG4gICAgICAgIGNvbnN0IHNDVVJlc3VsdCA9IG9yaWdpbmFsU0NVLmFwcGx5KGluc3RhbmNlLCBhcmdzKTtcbiAgICAgICAgY29uc3QgWywgbmV4dFN0YXRlXSA9IGFyZ3M7XG4gICAgICAgIGluc3RhbmNlLnN0YXRlID0gbmV4dFN0YXRlO1xuICAgICAgICByZXN0b3JlKCk7XG4gICAgICAgIHJldHVybiBzQ1VSZXN1bHQ7XG4gICAgICB9LFxuICAgICk7XG4gIH1cbn1cblxuLyoqXG4gKiBSZWN1cnNpdmVseSBkaXZlKClzIGV2ZXJ5IGN1c3RvbSBjb21wb25lbnQgaW4gYSB3cmFwcGVyIHVudGlsXG4gKiB0aGUgdGFyZ2V0IGNvbXBvbmVudCBpcyBmb3VuZC5cbiAqXG4gKiBAcGFyYW0ge1NoYWxsb3dXcmFwcGVyfSB3cmFwcGVyIEEgU2hhbGxvd1dyYXBwZXIgdG8gc2VhcmNoXG4gKiBAcGFyYW0ge0NvbXBvbmVudFR5cGV9IHRhcmdldCBBIHJlYWN0IGN1c3RvbSBjb21wb25lbnQgdGhhdCwgd2hlbiBmb3VuZCwgd2lsbCBlbmQgcmVjdXJzaW9uXG4gKiBAcGFyYW0ge0FkYXB0ZXJ9IGFkYXB0ZXIgQW4gRW56eW1lIGFkYXB0ZXJcbiAqIEByZXR1cm5zIHtTaGFsbG93V3JhcHBlcnx1bmRlZmluZWR9IEEgU2hhbGxvd1dyYXBwZXIgZm9yIHRoZSB0YXJnZXQsIG9yXG4gKiAgdW5kZWZpbmVkIGlmIGl0IGNhbid0IGJlIGZvdW5kXG4gKi9cbmZ1bmN0aW9uIGRlZXBSZW5kZXIod3JhcHBlciwgdGFyZ2V0LCBhZGFwdGVyKSB7XG4gIGNvbnN0IG5vZGUgPSB3cmFwcGVyW05PREVdO1xuICBjb25zdCBlbGVtZW50ID0gbm9kZSAmJiBhZGFwdGVyLm5vZGVUb0VsZW1lbnQobm9kZSk7XG4gIGlmICh3cmFwcGVyLnR5cGUoKSA9PT0gdGFyZ2V0KSB7XG4gICAgcmV0dXJuIHdyYXBwZXIuZGl2ZSgpO1xuICB9XG4gIGlmIChlbGVtZW50ICYmIGlzQ3VzdG9tQ29tcG9uZW50RWxlbWVudChlbGVtZW50LCBhZGFwdGVyKSkge1xuICAgIHJldHVybiBkZWVwUmVuZGVyKHdyYXBwZXIuZGl2ZSgpLCB0YXJnZXQsIGFkYXB0ZXIpO1xuICB9XG4gIGNvbnN0IGNoaWxkcmVuID0gd3JhcHBlci5jaGlsZHJlbigpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgY29uc3QgZm91bmQgPSBkZWVwUmVuZGVyKGNoaWxkcmVuLmF0KGkpLCB0YXJnZXQsIGFkYXB0ZXIpO1xuICAgIGlmICh0eXBlb2YgZm91bmQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICByZXR1cm4gZm91bmQ7XG4gICAgfVxuICB9XG4gIHJldHVybiB1bmRlZmluZWQ7XG59XG5cbi8qKlxuICogRGVlcC1yZW5kZXJzIHRoZSBgd3JhcHBpbmdDb21wb25lbnRgIGFuZCByZXR1cm5zIHRoZSBjb250ZXh0IHRoYXQgc2hvdWxkXG4gKiBiZSBhY2Nlc3NpYmxlIHRvIHRoZSBwcmltYXJ5IHdyYXBwZXIuXG4gKlxuICogQHBhcmFtIHtXcmFwcGluZ0NvbXBvbmVudFdyYXBwZXJ9IHdyYXBwZXIgVGhlIGBXcmFwcGluZ0NvbXBvbmVudFdyYXBwZXJgIGZvciBhXG4gKiAgYHdyYXBwaW5nQ29tcG9uZW50YFxuICogQHBhcmFtIHtBZGFwdGVyfSBhZGFwdGVyIEFuIEVuenltZSBhZGFwdGVyXG4gKiBAcmV0dXJucyB7b2JqZWN0fSBBbiBvYmplY3QgY29udGFpbmluZyBhbiBvYmplY3Qgb2YgbGVnYWN5IGNvbnRleHQgdmFsdWVzIGFuZCBhIE1hcCBvZlxuICogIGBjcmVhdGVDb250ZXh0KClgIFByb3ZpZGVyIHZhbHVlcy5cbiAqL1xuZnVuY3Rpb24gZ2V0Q29udGV4dEZyb21XcmFwcGluZ0NvbXBvbmVudCh3cmFwcGVyLCBhZGFwdGVyKSB7XG4gIGNvbnN0IHJvb3RGaW5kZXIgPSBkZWVwUmVuZGVyKHdyYXBwZXIsIHdyYXBwZXJbUk9PVF9GSU5ERVJdLCBhZGFwdGVyKTtcbiAgaWYgKCFyb290RmluZGVyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdgd3JhcHBpbmdDb21wb25lbnRgIG11c3QgcmVuZGVyIGl0cyBjaGlsZHJlbiEnKTtcbiAgfVxuICByZXR1cm4ge1xuICAgIGxlZ2FjeUNvbnRleHQ6IHJvb3RGaW5kZXJbT1BUSU9OU10uY29udGV4dCxcbiAgICBwcm92aWRlclZhbHVlczogcm9vdEZpbmRlcltQUk9WSURFUl9WQUxVRVNdLFxuICB9O1xufVxuXG4vKipcbiAqIE1ha2VzIG9wdGlvbnMgc3BlY2lmaWNhbGx5IGZvciBgU2hhbGxvd1dyYXBwZXJgLiBNb3N0IG9mIHRoZSBsb2dpYyBoZXJlIGlzIGFyb3VuZCByZW5kZXJpbmdcbiAqIGEgYHdyYXBwaW5nQ29tcG9uZW50YCAoaWYgb25lIHdhcyBwcm92aWRlZCkgYW5kIGFkZGluZyB0aGUgY2hpbGQgY29udGV4dCBvZiB0aGF0IGNvbXBvbmVudFxuICogdG8gYG9wdGlvbnMuY29udGV4dGAuXG4gKlxuICogQHBhcmFtIHtSZWFjdEVsZW1lbnR9IG5vZGVzIHRoZSBub2RlcyBwYXNzZWQgdG8gYFNoYWxsb3dXcmFwcGVyYFxuICogQHBhcmFtIHtTaGFsbG93V3JhcHBlcn0gcm9vdCB0aGlzIGBTaGFsbG93V3JhcHBlcmAncyBwYXJlbnQuIElmIHRoaXMgaXMgcGFzc2VkLCBvcHRpb25zIGFyZVxuICogIG5vdCB0cmFuc2Zvcm1lZC5cbiAqIEBwYXJhbSB7Kn0gcGFzc2VkT3B0aW9ucyB0aGUgb3B0aW9ucyBwYXNzZWQgdG8gYFNoYWxsb3dXcmFwcGVyYC5cbiAqIEBwYXJhbSB7Kn0gd3JhcHBlciB0aGUgYFNoYWxsb3dXcmFwcGVyYCBpdHNlbGZcbiAqIEByZXR1cm5zIHtPYmplY3R9IHRoZSBkZWNvcmF0ZWQgYW5kIHRyYW5zZm9ybWVkIG9wdGlvbnNcbiAqL1xuZnVuY3Rpb24gbWFrZVNoYWxsb3dPcHRpb25zKG5vZGVzLCByb290LCBwYXNzZWRPcHRpb25zLCB3cmFwcGVyKSB7XG4gIGNvbnN0IG9wdGlvbnMgPSBtYWtlT3B0aW9ucyhwYXNzZWRPcHRpb25zKTtcbiAgY29uc3QgYWRhcHRlciA9IGdldEFkYXB0ZXIocGFzc2VkT3B0aW9ucyk7XG4gIHByaXZhdGVTZXQob3B0aW9ucywgUFJPVklERVJfVkFMVUVTLCBwYXNzZWRPcHRpb25zW1BST1ZJREVSX1ZBTFVFU10pO1xuICBpZiAocm9vdCB8fCAhaXNDdXN0b21Db21wb25lbnQob3B0aW9ucy53cmFwcGluZ0NvbXBvbmVudCwgYWRhcHRlcikpIHtcbiAgICByZXR1cm4gb3B0aW9ucztcbiAgfVxuICBpZiAodHlwZW9mIGFkYXB0ZXIud3JhcFdpdGhXcmFwcGluZ0NvbXBvbmVudCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3lvdXIgYWRhcHRlciBkb2VzIG5vdCBzdXBwb3J0IGB3cmFwcGluZ0NvbXBvbmVudGAuIFRyeSB1cGdyYWRpbmcgaXQhJyk7XG4gIH1cbiAgY29uc3QgeyBub2RlOiB3cmFwcGVkTm9kZSwgUm9vdEZpbmRlciB9ID0gYWRhcHRlci53cmFwV2l0aFdyYXBwaW5nQ29tcG9uZW50KG5vZGVzLCBvcHRpb25zKTtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVzZS1iZWZvcmUtZGVmaW5lXG4gIGNvbnN0IHdyYXBwaW5nQ29tcG9uZW50ID0gbmV3IFdyYXBwaW5nQ29tcG9uZW50V3JhcHBlcih3cmFwcGVkTm9kZSwgd3JhcHBlciwgUm9vdEZpbmRlcik7XG4gIGNvbnN0IHtcbiAgICBsZWdhY3lDb250ZXh0OiB3cmFwcGluZ0NvbXBvbmVudExlZ2FjeUNvbnRleHQsXG4gICAgcHJvdmlkZXJWYWx1ZXM6IHdyYXBwaW5nQ29tcG9uZW50UHJvdmlkZXJWYWx1ZXMsXG4gIH0gPSBnZXRDb250ZXh0RnJvbVdyYXBwaW5nQ29tcG9uZW50KHdyYXBwaW5nQ29tcG9uZW50LCBhZGFwdGVyKTtcbiAgcHJpdmF0ZVNldCh3cmFwcGVyLCBXUkFQUElOR19DT01QT05FTlQsIHdyYXBwaW5nQ29tcG9uZW50KTtcbiAgcmV0dXJuIHtcbiAgICAuLi5vcHRpb25zLFxuICAgIGNvbnRleHQ6IHtcbiAgICAgIC4uLm9wdGlvbnMuY29udGV4dCxcbiAgICAgIC4uLndyYXBwaW5nQ29tcG9uZW50TGVnYWN5Q29udGV4dCxcbiAgICB9LFxuICAgIFtQUk9WSURFUl9WQUxVRVNdOiB3cmFwcGluZ0NvbXBvbmVudFByb3ZpZGVyVmFsdWVzLFxuICB9O1xufVxuXG5mdW5jdGlvbiBtYWtlSW5oZXJpdGVkQ2hpbGRPcHRpb25zKHdyYXBwZXIsIG9wdGlvbnMgPSB7fSkge1xuICBjb25zdCBjaGlsZE9wdGlvbnMgPSB7XG4gICAgLi4ud3JhcHBlcltPUFRJT05TXSxcbiAgICAuLi5vcHRpb25zLFxuICAgIGNvbnRleHQ6IG9wdGlvbnMuY29udGV4dCB8fCB7XG4gICAgICAuLi53cmFwcGVyW09QVElPTlNdLmNvbnRleHQsXG4gICAgICAuLi53cmFwcGVyW1JPT1RdW0NISUxEX0NPTlRFWFRdLFxuICAgIH0sXG4gIH07XG4gIHByaXZhdGVTZXQoY2hpbGRPcHRpb25zLCBQUk9WSURFUl9WQUxVRVMsIHdyYXBwZXJbUk9PVF1bUFJPVklERVJfVkFMVUVTXSk7XG4gIHJldHVybiBjaGlsZE9wdGlvbnM7XG59XG5cbi8qKlxuICogQGNsYXNzIFNoYWxsb3dXcmFwcGVyXG4gKi9cbmNsYXNzIFNoYWxsb3dXcmFwcGVyIHtcbiAgY29uc3RydWN0b3Iobm9kZXMsIHJvb3QsIHBhc3NlZE9wdGlvbnMgPSB7fSkge1xuICAgIHZhbGlkYXRlT3B0aW9ucyhwYXNzZWRPcHRpb25zKTtcblxuICAgIGNvbnN0IG9wdGlvbnMgPSBtYWtlU2hhbGxvd09wdGlvbnMobm9kZXMsIHJvb3QsIHBhc3NlZE9wdGlvbnMsIHRoaXMpO1xuICAgIGNvbnN0IGFkYXB0ZXIgPSBnZXRBZGFwdGVyKG9wdGlvbnMpO1xuICAgIGNvbnN0IGxpZmVjeWNsZXMgPSBnZXRBZGFwdGVyTGlmZWN5Y2xlcyhhZGFwdGVyKTtcblxuICAgIC8vIG1vdW50aW5nIGEgU2hhbGxvd1JlbmRlciBjb21wb25lbnRcbiAgICBpZiAoIXJvb3QpIHtcbiAgICAgIGlmICghYWRhcHRlci5pc1ZhbGlkRWxlbWVudChub2RlcykpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignU2hhbGxvd1dyYXBwZXIgY2FuIG9ubHkgd3JhcCB2YWxpZCBlbGVtZW50cycpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBnZXRDaGlsZENvbnRleHRTcHkgPSBsaWZlY3ljbGVzLmdldENoaWxkQ29udGV4dC5jYWxsZWRCeVJlbmRlcmVyXG4gICAgICAgID8gc3B5T25HZXRDaGlsZENvbnRleHRJbml0aWFsUmVuZGVyKG5vZGVzLCBhZGFwdGVyKVxuICAgICAgICA6IG51bGw7XG4gICAgICBwcml2YXRlU2V0KHRoaXMsIFJPT1QsIHRoaXMpO1xuICAgICAgcHJpdmF0ZVNldCh0aGlzLCBVTlJFTkRFUkVELCBub2Rlcyk7XG4gICAgICBjb25zdCByZW5kZXJlciA9IGFkYXB0ZXIuY3JlYXRlUmVuZGVyZXIoeyBtb2RlOiAnc2hhbGxvdycsIC4uLm9wdGlvbnMgfSk7XG4gICAgICBwcml2YXRlU2V0KHRoaXMsIFJFTkRFUkVSLCByZW5kZXJlcik7XG4gICAgICBjb25zdCBwcm92aWRlclZhbHVlcyA9IG5ldyBNYXAob3B0aW9uc1tQUk9WSURFUl9WQUxVRVNdIHx8IFtdKTtcbiAgICAgIHRoaXNbUkVOREVSRVJdLnJlbmRlcihub2Rlcywgb3B0aW9ucy5jb250ZXh0LCB7IHByb3ZpZGVyVmFsdWVzIH0pO1xuICAgICAgY29uc3QgcmVuZGVyZWROb2RlID0gdGhpc1tSRU5ERVJFUl0uZ2V0Tm9kZSgpO1xuICAgICAgcHJpdmF0ZVNldE5vZGVzKHRoaXMsIGdldFJvb3ROb2RlKHJlbmRlcmVkTm9kZSkpO1xuICAgICAgcHJpdmF0ZVNldCh0aGlzLCBPUFRJT05TLCBvcHRpb25zKTtcbiAgICAgIHByaXZhdGVTZXQodGhpcywgUFJPVklERVJfVkFMVUVTLCBwcm92aWRlclZhbHVlcyk7XG5cbiAgICAgIGNvbnN0IHsgaW5zdGFuY2UgfSA9IHJlbmRlcmVkTm9kZTtcbiAgICAgIGlmIChpbnN0YW5jZSAmJiAhb3B0aW9ucy5kaXNhYmxlTGlmZWN5Y2xlTWV0aG9kcykge1xuICAgICAgICAvLyBFbnN1cmUgdG8gY2FsbCBjb21wb25lbnREaWRVcGRhdGUgd2hlbiBpbnN0YW5jZS5zZXRTdGF0ZSBpcyBjYWxsZWRcbiAgICAgICAgaWYgKGxpZmVjeWNsZXMuY29tcG9uZW50RGlkVXBkYXRlLm9uU2V0U3RhdGUgJiYgIWluc3RhbmNlW1NFVF9TVEFURV0pIHtcbiAgICAgICAgICBwcml2YXRlU2V0KGluc3RhbmNlLCBTRVRfU1RBVEUsIGluc3RhbmNlLnNldFN0YXRlKTtcbiAgICAgICAgICBpbnN0YW5jZS5zZXRTdGF0ZSA9ICh1cGRhdGVyLCBjYWxsYmFjayA9IHVuZGVmaW5lZCkgPT4gdGhpcy5zZXRTdGF0ZShcbiAgICAgICAgICAgIC4uLihjYWxsYmFjayA9PSBudWxsID8gW3VwZGF0ZXJdIDogW3VwZGF0ZXIsIGNhbGxiYWNrXSksXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgaW5zdGFuY2UuY29tcG9uZW50RGlkTW91bnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICB0aGlzW1JFTkRFUkVSXS5iYXRjaGVkVXBkYXRlcygoKSA9PiB7XG4gICAgICAgICAgICBpbnN0YW5jZS5jb21wb25lbnREaWRNb3VudCgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHByaXZhdGVTZXRDaGlsZENvbnRleHQoYWRhcHRlciwgdGhpcywgaW5zdGFuY2UsIHJlbmRlcmVkTm9kZSwgZ2V0Q2hpbGRDb250ZXh0U3B5KTtcbiAgICAgIH1cbiAgICAvLyBjcmVhdGluZyBhIGNoaWxkIGNvbXBvbmVudCB0aHJvdWdoIGVuenltZSdzIFNoYWxsb3dXcmFwcGVyIEFQSXMuXG4gICAgfSBlbHNlIHtcbiAgICAgIHByaXZhdGVTZXQodGhpcywgUk9PVCwgcm9vdCk7XG4gICAgICBwcml2YXRlU2V0KHRoaXMsIFVOUkVOREVSRUQsIG51bGwpO1xuICAgICAgcHJpdmF0ZVNldCh0aGlzLCBSRU5ERVJFUiwgcm9vdFtSRU5ERVJFUl0pO1xuICAgICAgcHJpdmF0ZVNldE5vZGVzKHRoaXMsIG5vZGVzKTtcbiAgICAgIHByaXZhdGVTZXQodGhpcywgT1BUSU9OUywgcm9vdFtPUFRJT05TXSk7XG4gICAgICBwcml2YXRlU2V0KHRoaXMsIFJPT1RfTk9ERVMsIHJvb3RbTk9ERVNdKTtcbiAgICAgIHByaXZhdGVTZXQodGhpcywgUFJPVklERVJfVkFMVUVTLCBudWxsKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgcm9vdCB3cmFwcGVyXG4gICAqXG4gICAqIEByZXR1cm4ge1NoYWxsb3dXcmFwcGVyfVxuICAgKi9cbiAgcm9vdCgpIHtcbiAgICByZXR1cm4gdGhpc1tST09UXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSB3cmFwcGVkIGNvbXBvbmVudC5cbiAgICpcbiAgICogQHJldHVybiB7UmVhY3RDb21wb25lbnR9XG4gICAqL1xuICBnZXROb2RlSW50ZXJuYWwoKSB7XG4gICAgaWYgKHRoaXMubGVuZ3RoICE9PSAxKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NoYWxsb3dXcmFwcGVyOjpnZXROb2RlKCkgY2FuIG9ubHkgYmUgY2FsbGVkIHdoZW4gd3JhcHBpbmcgb25lIG5vZGUnKTtcbiAgICB9XG4gICAgaWYgKHRoaXNbUk9PVF0gPT09IHRoaXMpIHtcbiAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzW05PREVdO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHRoZSB3cmFwcGVkIGNvbXBvbmVudHMuXG4gICAqXG4gICAqIEByZXR1cm4ge0FycmF5PFJlYWN0Q29tcG9uZW50Pn1cbiAgICovXG4gIGdldE5vZGVzSW50ZXJuYWwoKSB7XG4gICAgaWYgKHRoaXNbUk9PVF0gPT09IHRoaXMgJiYgdGhpcy5sZW5ndGggPT09IDEpIHtcbiAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzW05PREVTXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSB3cmFwcGVkIFJlYWN0RWxlbWVudC5cbiAgICpcbiAgICogQHJldHVybiB7UmVhY3RFbGVtZW50fVxuICAgKi9cbiAgZ2V0RWxlbWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5zaW5nbGUoJ2dldEVsZW1lbnQnLCAobikgPT4gZ2V0QWRhcHRlcih0aGlzW09QVElPTlNdKS5ub2RlVG9FbGVtZW50KG4pKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSB3cmFwcGVkIFJlYWN0RWxlbWVudHMuXG4gICAqXG4gICAqIEByZXR1cm4ge0FycmF5PFJlYWN0RWxlbWVudD59XG4gICAqL1xuICBnZXRFbGVtZW50cygpIHtcbiAgICByZXR1cm4gdGhpcy5nZXROb2Rlc0ludGVybmFsKCkubWFwKChuKSA9PiBnZXRBZGFwdGVyKHRoaXNbT1BUSU9OU10pLm5vZGVUb0VsZW1lbnQobikpO1xuICB9XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNsYXNzLW1ldGhvZHMtdXNlLXRoaXNcbiAgZ2V0Tm9kZSgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1NoYWxsb3dXcmFwcGVyOjpnZXROb2RlKCkgaXMgbm8gbG9uZ2VyIHN1cHBvcnRlZC4gVXNlIFNoYWxsb3dXcmFwcGVyOjpnZXRFbGVtZW50KCkgaW5zdGVhZCcpO1xuICB9XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNsYXNzLW1ldGhvZHMtdXNlLXRoaXNcbiAgZ2V0Tm9kZXMoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdTaGFsbG93V3JhcHBlcjo6Z2V0Tm9kZXMoKSBpcyBubyBsb25nZXIgc3VwcG9ydGVkLiBVc2UgU2hhbGxvd1dyYXBwZXI6OmdldEVsZW1lbnRzKCkgaW5zdGVhZCcpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIGluc3RhbmNlIG9mIHRoZSBjb21wb25lbnQgYmVpbmcgcmVuZGVyZWQgYXMgdGhlIHJvb3Qgbm9kZSBwYXNzZWQgaW50byBgc2hhbGxvdygpYC5cbiAgICpcbiAgICogTk9URTogY2FuIG9ubHkgYmUgY2FsbGVkIG9uIGEgd3JhcHBlciBpbnN0YW5jZSB0aGF0IGlzIGFsc28gdGhlIHJvb3QgaW5zdGFuY2UuXG4gICAqXG4gICAqIEV4YW1wbGU6XG4gICAqIGBgYFxuICAgKiBjb25zdCB3cmFwcGVyID0gc2hhbGxvdyg8TXlDb21wb25lbnQgLz4pO1xuICAgKiBjb25zdCBpbnN0ID0gd3JhcHBlci5pbnN0YW5jZSgpO1xuICAgKiBleHBlY3QoaW5zdCkudG8uYmUuaW5zdGFuY2VPZihNeUNvbXBvbmVudCk7XG4gICAqIGBgYFxuICAgKiBAcmV0dXJucyB7UmVhY3RDb21wb25lbnR9XG4gICAqL1xuICBpbnN0YW5jZSgpIHtcbiAgICBpZiAodGhpc1tST09UXSAhPT0gdGhpcykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdTaGFsbG93V3JhcHBlcjo6aW5zdGFuY2UoKSBjYW4gb25seSBiZSBjYWxsZWQgb24gdGhlIHJvb3QnKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXNbUkVOREVSRVJdLmdldE5vZGUoKS5pbnN0YW5jZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJZiBhIGB3cmFwcGluZ0NvbXBvbmVudGAgd2FzIHBhc3NlZCBpbiBgb3B0aW9uc2AsIHRoaXMgbWV0aG9kcyByZXR1cm5zIGEgYFNoYWxsb3dXcmFwcGVyYFxuICAgKiBhcm91bmQgdGhlIHJlbmRlcmVkIGB3cmFwcGluZ0NvbXBvbmVudGAuIFRoaXMgYFNoYWxsb3dXcmFwcGVyYCBjYW4gYmUgdXNlZCB0byB1cGRhdGUgdGhlXG4gICAqIGB3cmFwcGluZ0NvbXBvbmVudGAncyBwcm9wcywgc3RhdGUsIGV0Yy5cbiAgICpcbiAgICogQHJldHVybnMgU2hhbGxvd1dyYXBwZXJcbiAgICovXG4gIGdldFdyYXBwaW5nQ29tcG9uZW50KCkge1xuICAgIGlmICh0aGlzW1JPT1RdICE9PSB0aGlzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NoYWxsb3dXcmFwcGVyOjpnZXRXcmFwcGluZ0NvbXBvbmVudCgpIGNhbiBvbmx5IGJlIGNhbGxlZCBvbiB0aGUgcm9vdCcpO1xuICAgIH1cbiAgICBpZiAoIXRoaXNbT1BUSU9OU10ud3JhcHBpbmdDb21wb25lbnQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignU2hhbGxvd1dyYXBwZXI6OmdldFdyYXBwaW5nQ29tcG9uZW50KCkgY2FuIG9ubHkgYmUgY2FsbGVkIG9uIGEgd3JhcHBlciB0aGF0IHdhcyBvcmlnaW5hbGx5IHBhc3NlZCBhIGB3cmFwcGluZ0NvbXBvbmVudGAgb3B0aW9uJyk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzW1dSQVBQSU5HX0NPTVBPTkVOVF07XG4gIH1cblxuICAvKipcbiAgICogRm9yY2VzIGEgcmUtcmVuZGVyLiBVc2VmdWwgdG8gcnVuIGJlZm9yZSBjaGVja2luZyB0aGUgcmVuZGVyIG91dHB1dCBpZiBzb21ldGhpbmcgZXh0ZXJuYWxcbiAgICogbWF5IGJlIHVwZGF0aW5nIHRoZSBzdGF0ZSBvZiB0aGUgY29tcG9uZW50IHNvbWV3aGVyZS5cbiAgICpcbiAgICogTk9URTogY2FuIG9ubHkgYmUgY2FsbGVkIG9uIGEgd3JhcHBlciBpbnN0YW5jZSB0aGF0IGlzIGFsc28gdGhlIHJvb3QgaW5zdGFuY2UuXG4gICAqXG4gICAqIEByZXR1cm5zIHtTaGFsbG93V3JhcHBlcn1cbiAgICovXG4gIHVwZGF0ZSgpIHtcbiAgICBpZiAodGhpc1tST09UXSAhPT0gdGhpcykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdTaGFsbG93V3JhcHBlcjo6dXBkYXRlKCkgY2FuIG9ubHkgYmUgY2FsbGVkIG9uIHRoZSByb290Jyk7XG4gICAgfVxuICAgIGlmICh0aGlzLmxlbmd0aCAhPT0gMSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdTaGFsbG93V3JhcHBlcjo6dXBkYXRlKCkgY2FuIG9ubHkgYmUgY2FsbGVkIHdoZW4gd3JhcHBpbmcgb25lIG5vZGUnKTtcbiAgICB9XG4gICAgcHJpdmF0ZVNldE5vZGVzKHRoaXMsIGdldFJvb3ROb2RlKHRoaXNbUkVOREVSRVJdLmdldE5vZGUoKSkpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEEgbWV0aG9kIHRoYXQgdW5tb3VudHMgdGhlIGNvbXBvbmVudC4gVGhpcyBjYW4gYmUgdXNlZCB0byBzaW11bGF0ZSBhIGNvbXBvbmVudCBnb2luZyB0aHJvdWdoXG4gICAqIGFuZCB1bm1vdW50L21vdW50IGxpZmVjeWNsZS5cbiAgICogQHJldHVybnMge1NoYWxsb3dXcmFwcGVyfVxuICAgKi9cbiAgdW5tb3VudCgpIHtcbiAgICB0aGlzW1JFTkRFUkVSXS51bm1vdW50KCk7XG4gICAgaWYgKHRoaXNbUk9PVF1bV1JBUFBJTkdfQ09NUE9ORU5UXSkge1xuICAgICAgdGhpc1tST09UXVtXUkFQUElOR19DT01QT05FTlRdLnVubW91bnQoKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQSBtZXRob2QgaXMgZm9yIHJlLXJlbmRlciB3aXRoIG5ldyBwcm9wcyBhbmQgY29udGV4dC5cbiAgICogVGhpcyBjYWxscyBjb21wb25lbnREaWRVcGRhdGUgbWV0aG9kIGlmIGRpc2FibGVMaWZlY3ljbGVNZXRob2RzIGlzIG5vdCBlbmFibGVkLlxuICAgKlxuICAgKiBOT1RFOiBjYW4gb25seSBiZSBjYWxsZWQgb24gYSB3cmFwcGVyIGluc3RhbmNlIHRoYXQgaXMgYWxzbyB0aGUgcm9vdCBpbnN0YW5jZS5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHByb3BzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjb250ZXh0XG4gICAqIEByZXR1cm5zIHtTaGFsbG93V3JhcHBlcn1cbiAgICovXG4gIHJlcmVuZGVyKHByb3BzLCBjb250ZXh0KSB7XG4gICAgY29uc3QgYWRhcHRlciA9IGdldEFkYXB0ZXIodGhpc1tPUFRJT05TXSk7XG4gICAgdGhpcy5zaW5nbGUoJ3JlcmVuZGVyJywgKCkgPT4ge1xuICAgICAgd2l0aFNldFN0YXRlQWxsb3dlZCgoKSA9PiB7XG4gICAgICAgIC8vIE5PVEUobG1yKTogSW4gcmVhY3QgMTYsIGluc3RhbmNlcyB3aWxsIGJlIG51bGwgZm9yIFNGQ3MsIGJ1dFxuICAgICAgICAvLyByZXJlbmRlcmluZyB3aXRoIHByb3BzL2NvbnRleHQgaXMgc3RpbGwgYSB2YWxpZCB0aGluZyB0byBkby4gSW5cbiAgICAgICAgLy8gdGhpcyBjYXNlLCBzdGF0ZSB3aWxsIGJlIHVuZGVmaW5lZCwgYnV0IHByb3BzL2NvbnRleHQgd2lsbCBleGlzdC5cbiAgICAgICAgY29uc3Qgbm9kZSA9IHRoaXNbUkVOREVSRVJdLmdldE5vZGUoKTtcbiAgICAgICAgY29uc3QgaW5zdGFuY2UgPSBub2RlLmluc3RhbmNlIHx8IHt9O1xuICAgICAgICBjb25zdCB0eXBlID0gbm9kZS50eXBlIHx8IHt9O1xuICAgICAgICBjb25zdCB7IHN0YXRlIH0gPSBpbnN0YW5jZTtcbiAgICAgICAgY29uc3QgcHJldlByb3BzID0gaW5zdGFuY2UucHJvcHMgfHwgdGhpc1tVTlJFTkRFUkVEXS5wcm9wcztcbiAgICAgICAgY29uc3QgcHJldkNvbnRleHQgPSBpbnN0YW5jZS5jb250ZXh0IHx8IHRoaXNbT1BUSU9OU10uY29udGV4dDtcbiAgICAgICAgY29uc3QgbmV4dENvbnRleHQgPSBjb250ZXh0IHx8IHByZXZDb250ZXh0O1xuICAgICAgICBpZiAoY29udGV4dCkge1xuICAgICAgICAgIHRoaXNbT1BUSU9OU10gPSB7IC4uLnRoaXNbT1BUSU9OU10sIGNvbnRleHQ6IG5leHRDb250ZXh0IH07XG4gICAgICAgIH1cbiAgICAgICAgdGhpc1tSRU5ERVJFUl0uYmF0Y2hlZFVwZGF0ZXMoKCkgPT4ge1xuICAgICAgICAgIC8vIFdoZW4gc2hvdWxkQ29tcG9uZW50VXBkYXRlIHJldHVybnMgZmFsc2Ugd2Ugc2hvdWxkbid0IGNhbGwgY29tcG9uZW50RGlkVXBkYXRlLlxuICAgICAgICAgIC8vIHNvIHdlIHNweSBzaG91bGRDb21wb25lbnRVcGRhdGUgdG8gZ2V0IHRoZSByZXN1bHQuXG4gICAgICAgICAgY29uc3QgbGlmZWN5Y2xlcyA9IGdldEFkYXB0ZXJMaWZlY3ljbGVzKGFkYXB0ZXIpO1xuICAgICAgICAgIGxldCBzaG91bGRSZW5kZXIgPSB0cnVlO1xuICAgICAgICAgIGxldCBzaG91bGRDb21wb25lbnRVcGRhdGVTcHk7XG4gICAgICAgICAgbGV0IGdldENoaWxkQ29udGV4dFNweTtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAhdGhpc1tPUFRJT05TXS5kaXNhYmxlTGlmZWN5Y2xlTWV0aG9kc1xuICAgICAgICAgICAgJiYgaW5zdGFuY2VcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgaW5zdGFuY2Uuc2hvdWxkQ29tcG9uZW50VXBkYXRlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHsgZ2V0RGVyaXZlZFN0YXRlRnJvbVByb3BzOiBnRFNGUCB9ID0gbGlmZWN5Y2xlcztcbiAgICAgICAgICAgICAgaWYgKGdEU0ZQICYmIGdEU0ZQLmhhc1Nob3VsZENvbXBvbmVudFVwZGF0ZUJ1Zykge1xuICAgICAgICAgICAgICAgIG1vY2tTQ1VJZmdEU0ZQUmV0dXJuTm9uTnVsbChub2RlLCBzdGF0ZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgc2hvdWxkQ29tcG9uZW50VXBkYXRlU3B5ID0gc3B5TWV0aG9kKGluc3RhbmNlLCAnc2hvdWxkQ29tcG9uZW50VXBkYXRlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIGxpZmVjeWNsZXMuZ2V0Q2hpbGRDb250ZXh0LmNhbGxlZEJ5UmVuZGVyZXJcbiAgICAgICAgICAgICAgJiYgdHlwZW9mIGluc3RhbmNlLmdldENoaWxkQ29udGV4dCA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIGdldENoaWxkQ29udGV4dFNweSA9IHNweU1ldGhvZChpbnN0YW5jZSwgJ2dldENoaWxkQ29udGV4dCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIXNob3VsZENvbXBvbmVudFVwZGF0ZVNweSAmJiBpc1B1cmVDb21wb25lbnQoaW5zdGFuY2UpKSB7XG4gICAgICAgICAgICBzaG91bGRSZW5kZXIgPSBwdXJlQ29tcG9uZW50U2hvdWxkQ29tcG9uZW50VXBkYXRlKFxuICAgICAgICAgICAgICBwcmV2UHJvcHMsXG4gICAgICAgICAgICAgIHByb3BzLFxuICAgICAgICAgICAgICBzdGF0ZSxcbiAgICAgICAgICAgICAgaW5zdGFuY2Uuc3RhdGUsXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAocHJvcHMpIHRoaXNbVU5SRU5ERVJFRF0gPSBjbG9uZUVsZW1lbnQoYWRhcHRlciwgdGhpc1tVTlJFTkRFUkVEXSwgcHJvcHMpO1xuICAgICAgICAgIHRoaXNbUkVOREVSRVJdLnJlbmRlcih0aGlzW1VOUkVOREVSRURdLCBuZXh0Q29udGV4dCwge1xuICAgICAgICAgICAgcHJvdmlkZXJWYWx1ZXM6IHRoaXNbUFJPVklERVJfVkFMVUVTXSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBpZiAoc2hvdWxkQ29tcG9uZW50VXBkYXRlU3B5KSB7XG4gICAgICAgICAgICBzaG91bGRSZW5kZXIgPSBzaG91bGRDb21wb25lbnRVcGRhdGVTcHkuZ2V0TGFzdFJldHVyblZhbHVlKCk7XG4gICAgICAgICAgICBzaG91bGRDb21wb25lbnRVcGRhdGVTcHkucmVzdG9yZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBzaG91bGRSZW5kZXJcbiAgICAgICAgICAgICYmICF0aGlzW09QVElPTlNdLmRpc2FibGVMaWZlY3ljbGVNZXRob2RzXG4gICAgICAgICAgICAmJiBpbnN0YW5jZVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgcHJpdmF0ZVNldENoaWxkQ29udGV4dChhZGFwdGVyLCB0aGlzLCBpbnN0YW5jZSwgbm9kZSwgZ2V0Q2hpbGRDb250ZXh0U3B5KTtcbiAgICAgICAgICAgIGlmIChsaWZlY3ljbGVzLmdldFNuYXBzaG90QmVmb3JlVXBkYXRlKSB7XG4gICAgICAgICAgICAgIGxldCBzbmFwc2hvdDtcbiAgICAgICAgICAgICAgaWYgKHR5cGVvZiBpbnN0YW5jZS5nZXRTbmFwc2hvdEJlZm9yZVVwZGF0ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIHNuYXBzaG90ID0gaW5zdGFuY2UuZ2V0U25hcHNob3RCZWZvcmVVcGRhdGUocHJldlByb3BzLCBzdGF0ZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIGxpZmVjeWNsZXMuY29tcG9uZW50RGlkVXBkYXRlXG4gICAgICAgICAgICAgICAgJiYgdHlwZW9mIGluc3RhbmNlLmNvbXBvbmVudERpZFVwZGF0ZSA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgICAgICAgICAgICYmIChcbiAgICAgICAgICAgICAgICAgICFzdGF0ZVxuICAgICAgICAgICAgICAgICAgfHwgc2hhbGxvd0VxdWFsKHN0YXRlLCB0aGlzLmluc3RhbmNlKCkuc3RhdGUpXG4gICAgICAgICAgICAgICAgICB8fCB0eXBlb2YgdHlwZS5nZXREZXJpdmVkU3RhdGVGcm9tUHJvcHMgPT09ICdmdW5jdGlvbidcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIGluc3RhbmNlLmNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMsIHN0YXRlLCBzbmFwc2hvdCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICAgIGxpZmVjeWNsZXMuY29tcG9uZW50RGlkVXBkYXRlXG4gICAgICAgICAgICAgICYmIHR5cGVvZiBpbnN0YW5jZS5jb21wb25lbnREaWRVcGRhdGUgPT09ICdmdW5jdGlvbidcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICBpZiAobGlmZWN5Y2xlcy5jb21wb25lbnREaWRVcGRhdGUucHJldkNvbnRleHQpIHtcbiAgICAgICAgICAgICAgICBpbnN0YW5jZS5jb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzLCBzdGF0ZSwgcHJldkNvbnRleHQpO1xuICAgICAgICAgICAgICB9IGVsc2UgaWYgKCFzdGF0ZSB8fCBzaGFsbG93RXF1YWwodGhpcy5pbnN0YW5jZSgpLnN0YXRlLCBzdGF0ZSkpIHtcbiAgICAgICAgICAgICAgICBpbnN0YW5jZS5jb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzLCBzdGF0ZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAvLyBJZiBpdCBkb2Vzbid0IG5lZWQgdG8gcmVyZW5kZXIsIHVwZGF0ZSBvbmx5IGl0cyBwcm9wcy5cbiAgICAgICAgICB9IGVsc2UgaWYgKCFzaGFsbG93RXF1YWwocHJvcHMsIGluc3RhbmNlLnByb3BzKSkge1xuICAgICAgICAgICAgaW5zdGFuY2UucHJvcHMgPSAoT2JqZWN0LmZyZWV6ZSB8fCBPYmplY3QpKHsgLi4uaW5zdGFuY2UucHJvcHMsIC4uLnByb3BzIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEEgbWV0aG9kIHRoYXQgc2V0cyB0aGUgcHJvcHMgb2YgdGhlIHJvb3QgY29tcG9uZW50LCBhbmQgcmUtcmVuZGVycy4gVXNlZnVsIGZvciB3aGVuIHlvdSBhcmVcbiAgICogd2FudGluZyB0byB0ZXN0IGhvdyB0aGUgY29tcG9uZW50IGJlaGF2ZXMgb3ZlciB0aW1lIHdpdGggY2hhbmdpbmcgcHJvcHMuIENhbGxpbmcgdGhpcywgZm9yXG4gICAqIGluc3RhbmNlLCB3aWxsIGNhbGwgdGhlIGBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzYCBsaWZlY3ljbGUgbWV0aG9kLlxuICAgKlxuICAgKiBTaW1pbGFyIHRvIGBzZXRTdGF0ZWAsIHRoaXMgbWV0aG9kIGFjY2VwdHMgYSBwcm9wcyBvYmplY3QgYW5kIHdpbGwgbWVyZ2UgaXQgaW4gd2l0aCB0aGUgYWxyZWFkeVxuICAgKiBleGlzdGluZyBwcm9wcy5cbiAgICpcbiAgICogTk9URTogY2FuIG9ubHkgYmUgY2FsbGVkIG9uIGEgd3JhcHBlciBpbnN0YW5jZSB0aGF0IGlzIGFsc28gdGhlIHJvb3QgaW5zdGFuY2UuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wcyBvYmplY3RcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2IgLSBjYWxsYmFjayBmdW5jdGlvblxuICAgKiBAcmV0dXJucyB7U2hhbGxvd1dyYXBwZXJ9XG4gICAqL1xuICBzZXRQcm9wcyhwcm9wcywgY2FsbGJhY2sgPSB1bmRlZmluZWQpIHtcbiAgICBpZiAodGhpc1tST09UXSAhPT0gdGhpcykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdTaGFsbG93V3JhcHBlcjo6c2V0UHJvcHMoKSBjYW4gb25seSBiZSBjYWxsZWQgb24gdGhlIHJvb3QnKTtcbiAgICB9XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIHR5cGVvZiBjYWxsYmFjayAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignUmVhY3RXcmFwcGVyOjpzZXRQcm9wcygpIGV4cGVjdHMgYSBmdW5jdGlvbiBhcyBpdHMgc2Vjb25kIGFyZ3VtZW50Jyk7XG4gICAgfVxuICAgIHRoaXMucmVyZW5kZXIocHJvcHMpO1xuICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgY2FsbGJhY2soKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQSBtZXRob2QgdG8gaW52b2tlIGBzZXRTdGF0ZWAgb24gdGhlIHJvb3QgY29tcG9uZW50IGluc3RhbmNlIHNpbWlsYXIgdG8gaG93IHlvdSBtaWdodCBpbiB0aGVcbiAgICogZGVmaW5pdGlvbiBvZiB0aGUgY29tcG9uZW50LCBhbmQgcmUtcmVuZGVycy4gIFRoaXMgbWV0aG9kIGlzIHVzZWZ1bCBmb3IgdGVzdGluZyB5b3VyIGNvbXBvbmVudFxuICAgKiBpbiBoYXJkIHRvIGFjaGlldmUgc3RhdGVzLCBob3dldmVyIHNob3VsZCBiZSB1c2VkIHNwYXJpbmdseS4gSWYgcG9zc2libGUsIHlvdSBzaG91bGQgdXRpbGl6ZVxuICAgKiB5b3VyIGNvbXBvbmVudCdzIGV4dGVybmFsIEFQSSBpbiBvcmRlciB0byBnZXQgaXQgaW50byB3aGF0ZXZlciBzdGF0ZSB5b3Ugd2FudCB0byB0ZXN0LCBpbiBvcmRlclxuICAgKiB0byBiZSBhcyBhY2N1cmF0ZSBvZiBhIHRlc3QgYXMgcG9zc2libGUuIFRoaXMgaXMgbm90IGFsd2F5cyBwcmFjdGljYWwsIGhvd2V2ZXIuXG4gICAqXG4gICAqIE5PVEU6IGNhbiBvbmx5IGJlIGNhbGxlZCBvbiBhIHdyYXBwZXIgaW5zdGFuY2UgdGhhdCBpcyBhbHNvIHRoZSByb290IGluc3RhbmNlLlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gc3RhdGUgdG8gbWVyZ2VcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2IgLSBjYWxsYmFjayBmdW5jdGlvblxuICAgKiBAcmV0dXJucyB7U2hhbGxvd1dyYXBwZXJ9XG4gICAqL1xuICBzZXRTdGF0ZShzdGF0ZSwgY2FsbGJhY2sgPSB1bmRlZmluZWQpIHtcbiAgICBpZiAodGhpc1tST09UXSAhPT0gdGhpcykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdTaGFsbG93V3JhcHBlcjo6c2V0U3RhdGUoKSBjYW4gb25seSBiZSBjYWxsZWQgb24gdGhlIHJvb3QnKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuaW5zdGFuY2UoKSA9PT0gbnVsbCB8fCB0aGlzW1JFTkRFUkVSXS5nZXROb2RlKCkubm9kZVR5cGUgIT09ICdjbGFzcycpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignU2hhbGxvd1dyYXBwZXI6OnNldFN0YXRlKCkgY2FuIG9ubHkgYmUgY2FsbGVkIG9uIGNsYXNzIGNvbXBvbmVudHMnKTtcbiAgICB9XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIHR5cGVvZiBjYWxsYmFjayAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignUmVhY3RXcmFwcGVyOjpzZXRTdGF0ZSgpIGV4cGVjdHMgYSBmdW5jdGlvbiBhcyBpdHMgc2Vjb25kIGFyZ3VtZW50Jyk7XG4gICAgfVxuXG4gICAgdGhpcy5zaW5nbGUoJ3NldFN0YXRlJywgKCkgPT4ge1xuICAgICAgd2l0aFNldFN0YXRlQWxsb3dlZCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IGFkYXB0ZXIgPSBnZXRBZGFwdGVyKHRoaXNbT1BUSU9OU10pO1xuXG4gICAgICAgIGNvbnN0IGxpZmVjeWNsZXMgPSBnZXRBZGFwdGVyTGlmZWN5Y2xlcyhhZGFwdGVyKTtcblxuICAgICAgICBjb25zdCBub2RlID0gdGhpc1tSRU5ERVJFUl0uZ2V0Tm9kZSgpO1xuICAgICAgICBjb25zdCB7IGluc3RhbmNlIH0gPSBub2RlO1xuICAgICAgICBjb25zdCBwcmV2UHJvcHMgPSBpbnN0YW5jZS5wcm9wcztcbiAgICAgICAgY29uc3QgcHJldlN0YXRlID0gaW5zdGFuY2Uuc3RhdGU7XG4gICAgICAgIGNvbnN0IHByZXZDb250ZXh0ID0gaW5zdGFuY2UuY29udGV4dDtcblxuICAgICAgICBjb25zdCBzdGF0ZVBheWxvYWQgPSB0eXBlb2Ygc3RhdGUgPT09ICdmdW5jdGlvbidcbiAgICAgICAgICA/IHN0YXRlLmNhbGwoaW5zdGFuY2UsIHByZXZTdGF0ZSwgcHJldlByb3BzKVxuICAgICAgICAgIDogc3RhdGU7XG5cbiAgICAgICAgLy8gcmV0dXJuaW5nIG51bGwgb3IgdW5kZWZpbmVkIHByZXZlbnRzIHRoZSB1cGRhdGUgaW4gUmVhY3QgMTYrXG4gICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWFjdC9wdWxsLzEyNzU2XG4gICAgICAgIGNvbnN0IG1heWJlSGFzVXBkYXRlID0gIWxpZmVjeWNsZXMuc2V0U3RhdGUuc2tpcHNDb21wb25lbnREaWRVcGRhdGVPbk51bGxpc2hcbiAgICAgICAgICB8fCBzdGF0ZVBheWxvYWQgIT0gbnVsbDtcblxuICAgICAgICAvLyBXaGVuIHNob3VsZENvbXBvbmVudFVwZGF0ZSByZXR1cm5zIGZhbHNlIHdlIHNob3VsZG4ndCBjYWxsIGNvbXBvbmVudERpZFVwZGF0ZS5cbiAgICAgICAgLy8gc28gd2Ugc3B5IHNob3VsZENvbXBvbmVudFVwZGF0ZSB0byBnZXQgdGhlIHJlc3VsdC5cbiAgICAgICAgbGV0IHNob3VsZENvbXBvbmVudFVwZGF0ZVNweTtcbiAgICAgICAgbGV0IGdldENoaWxkQ29udGV4dFNweTtcbiAgICAgICAgbGV0IHNob3VsZFJlbmRlciA9IHRydWU7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAhdGhpc1tPUFRJT05TXS5kaXNhYmxlTGlmZWN5Y2xlTWV0aG9kc1xuICAgICAgICAgICYmIGluc3RhbmNlXG4gICAgICAgICkge1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIGxpZmVjeWNsZXMuY29tcG9uZW50RGlkVXBkYXRlXG4gICAgICAgICAgICAmJiBsaWZlY3ljbGVzLmNvbXBvbmVudERpZFVwZGF0ZS5vblNldFN0YXRlXG4gICAgICAgICAgICAmJiB0eXBlb2YgaW5zdGFuY2Uuc2hvdWxkQ29tcG9uZW50VXBkYXRlID09PSAnZnVuY3Rpb24nXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBjb25zdCB7IGdldERlcml2ZWRTdGF0ZUZyb21Qcm9wczogZ0RTRlAgfSA9IGxpZmVjeWNsZXM7XG4gICAgICAgICAgICBpZiAoZ0RTRlAgJiYgZ0RTRlAuaGFzU2hvdWxkQ29tcG9uZW50VXBkYXRlQnVnKSB7XG4gICAgICAgICAgICAgIG1vY2tTQ1VJZmdEU0ZQUmV0dXJuTm9uTnVsbChub2RlLCBzdGF0ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzaG91bGRDb21wb25lbnRVcGRhdGVTcHkgPSBzcHlNZXRob2QoaW5zdGFuY2UsICdzaG91bGRDb21wb25lbnRVcGRhdGUnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgbGlmZWN5Y2xlcy5nZXRDaGlsZENvbnRleHQuY2FsbGVkQnlSZW5kZXJlclxuICAgICAgICAgICAgJiYgdHlwZW9mIGluc3RhbmNlLmdldENoaWxkQ29udGV4dCA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgICAgICkge1xuICAgICAgICAgICAgZ2V0Q2hpbGRDb250ZXh0U3B5ID0gc3B5TWV0aG9kKGluc3RhbmNlLCAnZ2V0Q2hpbGRDb250ZXh0Jyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghc2hvdWxkQ29tcG9uZW50VXBkYXRlU3B5ICYmIGlzUHVyZUNvbXBvbmVudChpbnN0YW5jZSkpIHtcbiAgICAgICAgICBzaG91bGRSZW5kZXIgPSBwdXJlQ29tcG9uZW50U2hvdWxkQ29tcG9uZW50VXBkYXRlKFxuICAgICAgICAgICAgcHJldlByb3BzLFxuICAgICAgICAgICAgaW5zdGFuY2UucHJvcHMsXG4gICAgICAgICAgICBwcmV2U3RhdGUsXG4gICAgICAgICAgICB7IC4uLnByZXZTdGF0ZSwgLi4uc3RhdGVQYXlsb2FkIH0sXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFdlIGRvbid0IHBhc3MgdGhlIHNldFN0YXRlIGNhbGxiYWNrIGhlcmVcbiAgICAgICAgLy8gdG8gZ3VhcmFudGVlIHRvIGNhbGwgdGhlIGNhbGxiYWNrIGFmdGVyIGZpbmlzaGluZyB0aGUgcmVuZGVyXG4gICAgICAgIGlmIChpbnN0YW5jZVtTRVRfU1RBVEVdKSB7XG4gICAgICAgICAgaW5zdGFuY2VbU0VUX1NUQVRFXShzdGF0ZVBheWxvYWQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGluc3RhbmNlLnNldFN0YXRlKHN0YXRlUGF5bG9hZCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNob3VsZENvbXBvbmVudFVwZGF0ZVNweSkge1xuICAgICAgICAgIHNob3VsZFJlbmRlciA9IHNob3VsZENvbXBvbmVudFVwZGF0ZVNweS5nZXRMYXN0UmV0dXJuVmFsdWUoKTtcbiAgICAgICAgICBzaG91bGRDb21wb25lbnRVcGRhdGVTcHkucmVzdG9yZSgpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChcbiAgICAgICAgICBtYXliZUhhc1VwZGF0ZVxuICAgICAgICAgICYmIHNob3VsZFJlbmRlclxuICAgICAgICAgICYmICF0aGlzW09QVElPTlNdLmRpc2FibGVMaWZlY3ljbGVNZXRob2RzXG4gICAgICAgICkge1xuICAgICAgICAgIHByaXZhdGVTZXRDaGlsZENvbnRleHQoYWRhcHRlciwgdGhpcywgaW5zdGFuY2UsIG5vZGUsIGdldENoaWxkQ29udGV4dFNweSk7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgbGlmZWN5Y2xlcy5jb21wb25lbnREaWRVcGRhdGVcbiAgICAgICAgICAgICYmIGxpZmVjeWNsZXMuY29tcG9uZW50RGlkVXBkYXRlLm9uU2V0U3RhdGVcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgbGlmZWN5Y2xlcy5nZXRTbmFwc2hvdEJlZm9yZVVwZGF0ZVxuICAgICAgICAgICAgICAmJiB0eXBlb2YgaW5zdGFuY2UuZ2V0U25hcHNob3RCZWZvcmVVcGRhdGUgPT09ICdmdW5jdGlvbidcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICBjb25zdCBzbmFwc2hvdCA9IGluc3RhbmNlLmdldFNuYXBzaG90QmVmb3JlVXBkYXRlKHByZXZQcm9wcywgcHJldlN0YXRlKTtcbiAgICAgICAgICAgICAgaWYgKHR5cGVvZiBpbnN0YW5jZS5jb21wb25lbnREaWRVcGRhdGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICBpbnN0YW5jZS5jb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzLCBwcmV2U3RhdGUsIHNuYXBzaG90KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgaW5zdGFuY2UuY29tcG9uZW50RGlkVXBkYXRlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgIGlmIChsaWZlY3ljbGVzLmNvbXBvbmVudERpZFVwZGF0ZS5wcmV2Q29udGV4dCkge1xuICAgICAgICAgICAgICAgIGluc3RhbmNlLmNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMsIHByZXZTdGF0ZSwgcHJldkNvbnRleHQpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGluc3RhbmNlLmNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMsIHByZXZTdGF0ZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgICAgLy8gY2FsbCB0aGUgc2V0U3RhdGUgY2FsbGJhY2tcbiAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgaWYgKGFkYXB0ZXIuaW52b2tlU2V0U3RhdGVDYWxsYmFjaykge1xuICAgICAgICAgICAgYWRhcHRlci5pbnZva2VTZXRTdGF0ZUNhbGxiYWNrKGluc3RhbmNlLCBjYWxsYmFjayk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwoaW5zdGFuY2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQSBtZXRob2QgdGhhdCBzZXRzIHRoZSBjb250ZXh0IG9mIHRoZSByb290IGNvbXBvbmVudCwgYW5kIHJlLXJlbmRlcnMuIFVzZWZ1bCBmb3Igd2hlbiB5b3UgYXJlXG4gICAqIHdhbnRpbmcgdG8gdGVzdCBob3cgdGhlIGNvbXBvbmVudCBiZWhhdmVzIG92ZXIgdGltZSB3aXRoIGNoYW5naW5nIGNvbnRleHRzLlxuICAgKlxuICAgKiBOT1RFOiBjYW4gb25seSBiZSBjYWxsZWQgb24gYSB3cmFwcGVyIGluc3RhbmNlIHRoYXQgaXMgYWxzbyB0aGUgcm9vdCBpbnN0YW5jZS5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IGNvbnRleHQgb2JqZWN0XG4gICAqIEByZXR1cm5zIHtTaGFsbG93V3JhcHBlcn1cbiAgICovXG4gIHNldENvbnRleHQoY29udGV4dCkge1xuICAgIGlmICh0aGlzW1JPT1RdICE9PSB0aGlzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NoYWxsb3dXcmFwcGVyOjpzZXRDb250ZXh0KCkgY2FuIG9ubHkgYmUgY2FsbGVkIG9uIHRoZSByb290Jyk7XG4gICAgfVxuICAgIGlmICghdGhpc1tPUFRJT05TXS5jb250ZXh0KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NoYWxsb3dXcmFwcGVyOjpzZXRDb250ZXh0KCkgY2FuIG9ubHkgYmUgY2FsbGVkIG9uIGEgd3JhcHBlciB0aGF0IHdhcyBvcmlnaW5hbGx5IHBhc3NlZCBhIGNvbnRleHQgb3B0aW9uJyk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnJlcmVuZGVyKG51bGwsIGNvbnRleHQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgb3Igbm90IGEgZ2l2ZW4gcmVhY3QgZWxlbWVudCBleGlzdHMgaW4gdGhlIHNoYWxsb3cgcmVuZGVyIHRyZWUuXG4gICAqXG4gICAqIEV4YW1wbGU6XG4gICAqIGBgYFxuICAgKiBjb25zdCB3cmFwcGVyID0gc2hhbGxvdyg8TXlDb21wb25lbnQgLz4pO1xuICAgKiBleHBlY3Qod3JhcHBlci5jb250YWlucyg8ZGl2IGNsYXNzTmFtZT1cImZvbyBiYXJcIiAvPikpLnRvLmVxdWFsKHRydWUpO1xuICAgKiBgYGBcbiAgICpcbiAgICogQHBhcmFtIHtSZWFjdEVsZW1lbnR8QXJyYXk8UmVhY3RFbGVtZW50Pn0gbm9kZU9yTm9kZXNcbiAgICogQHJldHVybnMge0Jvb2xlYW59XG4gICAqL1xuICBjb250YWlucyhub2RlT3JOb2Rlcykge1xuICAgIGNvbnN0IGFkYXB0ZXIgPSBnZXRBZGFwdGVyKHRoaXNbT1BUSU9OU10pO1xuICAgIGlmICghaXNSZWFjdEVsZW1lbnRBbGlrZShub2RlT3JOb2RlcywgYWRhcHRlcikpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignU2hhbGxvd1dyYXBwZXI6OmNvbnRhaW5zKCkgY2FuIG9ubHkgYmUgY2FsbGVkIHdpdGggYSBSZWFjdEVsZW1lbnQgKG9yIGFuIGFycmF5IG9mIHRoZW0pLCBhIHN0cmluZywgb3IgYSBudW1iZXIgYXMgYW4gYXJndW1lbnQuJyk7XG4gICAgfVxuICAgIGNvbnN0IHByZWRpY2F0ZSA9IEFycmF5LmlzQXJyYXkobm9kZU9yTm9kZXMpXG4gICAgICA/IChvdGhlcikgPT4gY29udGFpbnNDaGlsZHJlblN1YkFycmF5KFxuICAgICAgICBub2RlRXF1YWwsXG4gICAgICAgIG90aGVyLFxuICAgICAgICBub2RlT3JOb2Rlcy5tYXAoKG5vZGUpID0+IGFkYXB0ZXIuZWxlbWVudFRvTm9kZShub2RlKSksXG4gICAgICApXG4gICAgICA6IChvdGhlcikgPT4gbm9kZUVxdWFsKGFkYXB0ZXIuZWxlbWVudFRvTm9kZShub2RlT3JOb2RlcyksIG90aGVyKTtcblxuICAgIHJldHVybiBmaW5kV2hlcmVVbndyYXBwZWQodGhpcywgcHJlZGljYXRlKS5sZW5ndGggPiAwO1xuICB9XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgb3Igbm90IGEgZ2l2ZW4gcmVhY3QgZWxlbWVudCBleGlzdHMgaW4gdGhlIHNoYWxsb3cgcmVuZGVyIHRyZWUuXG4gICAqIE1hdGNoIGlzIGJhc2VkIG9uIHRoZSBleHBlY3RlZCBlbGVtZW50IGFuZCBub3Qgb24gd3JhcHBlcnMgZWxlbWVudC5cbiAgICogSXQgd2lsbCBkZXRlcm1pbmUgaWYgb25lIG9mIHRoZSB3cmFwcGVycyBlbGVtZW50IFwibG9va3MgbGlrZVwiIHRoZSBleHBlY3RlZFxuICAgKiBlbGVtZW50IGJ5IGNoZWNraW5nIGlmIGFsbCBwcm9wcyBvZiB0aGUgZXhwZWN0ZWQgZWxlbWVudCBhcmUgcHJlc2VudFxuICAgKiBvbiB0aGUgd3JhcHBlcnMgZWxlbWVudCBhbmQgZXF1YWxzIHRvIGVhY2ggb3RoZXIuXG4gICAqXG4gICAqIEV4YW1wbGU6XG4gICAqIGBgYFxuICAgKiAvLyBNeUNvbXBvbmVudCBvdXRwdXRzIDxkaXY+PGRpdiBjbGFzcz1cImZvb1wiPkhlbGxvPC9kaXY+PC9kaXY+XG4gICAqIGNvbnN0IHdyYXBwZXIgPSBzaGFsbG93KDxNeUNvbXBvbmVudCAvPik7XG4gICAqIGV4cGVjdCh3cmFwcGVyLmNvbnRhaW5zTWF0Y2hpbmdFbGVtZW50KDxkaXY+SGVsbG88L2Rpdj4pKS50by5lcXVhbCh0cnVlKTtcbiAgICogYGBgXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhY3RFbGVtZW50fSBub2RlXG4gICAqIEByZXR1cm5zIHtCb29sZWFufVxuICAgKi9cbiAgY29udGFpbnNNYXRjaGluZ0VsZW1lbnQobm9kZSkge1xuICAgIGNvbnN0IGFkYXB0ZXIgPSBnZXRBZGFwdGVyKHRoaXNbT1BUSU9OU10pO1xuICAgIGNvbnN0IHJzdE5vZGUgPSBhZGFwdGVyLmVsZW1lbnRUb05vZGUobm9kZSk7XG4gICAgY29uc3QgcHJlZGljYXRlID0gKG90aGVyKSA9PiBub2RlTWF0Y2hlcyhyc3ROb2RlLCBvdGhlciwgKGEsIGIpID0+IGEgPD0gYik7XG4gICAgcmV0dXJuIGZpbmRXaGVyZVVud3JhcHBlZCh0aGlzLCBwcmVkaWNhdGUpLmxlbmd0aCA+IDA7XG4gIH1cblxuICAvKipcbiAgICogV2hldGhlciBvciBub3QgYWxsIHRoZSBnaXZlbiByZWFjdCBlbGVtZW50cyBleGlzdCBpbiB0aGUgc2hhbGxvdyByZW5kZXIgdHJlZS5cbiAgICogTWF0Y2ggaXMgYmFzZWQgb24gdGhlIGV4cGVjdGVkIGVsZW1lbnQgYW5kIG5vdCBvbiB3cmFwcGVycyBlbGVtZW50LlxuICAgKiBJdCB3aWxsIGRldGVybWluZSBpZiBvbmUgb2YgdGhlIHdyYXBwZXJzIGVsZW1lbnQgXCJsb29rcyBsaWtlXCIgdGhlIGV4cGVjdGVkXG4gICAqIGVsZW1lbnQgYnkgY2hlY2tpbmcgaWYgYWxsIHByb3BzIG9mIHRoZSBleHBlY3RlZCBlbGVtZW50IGFyZSBwcmVzZW50XG4gICAqIG9uIHRoZSB3cmFwcGVycyBlbGVtZW50IGFuZCBlcXVhbHMgdG8gZWFjaCBvdGhlci5cbiAgICpcbiAgICogRXhhbXBsZTpcbiAgICogYGBgXG4gICAqIGNvbnN0IHdyYXBwZXIgPSBzaGFsbG93KDxNeUNvbXBvbmVudCAvPik7XG4gICAqIGV4cGVjdCh3cmFwcGVyLmNvbnRhaW5zQWxsTWF0Y2hpbmdFbGVtZW50cyhbXG4gICAqICAgPGRpdj5IZWxsbzwvZGl2PixcbiAgICogICA8ZGl2Pkdvb2RieWU8L2Rpdj4sXG4gICAqIF0pKS50by5lcXVhbCh0cnVlKTtcbiAgICogYGBgXG4gICAqXG4gICAqIEBwYXJhbSB7QXJyYXk8UmVhY3RFbGVtZW50Pn0gbm9kZXNcbiAgICogQHJldHVybnMge0Jvb2xlYW59XG4gICAqL1xuICBjb250YWluc0FsbE1hdGNoaW5nRWxlbWVudHMobm9kZXMpIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkobm9kZXMpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdub2RlcyBzaG91bGQgYmUgYW4gQXJyYXknKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbm9kZXMuZXZlcnkoKG5vZGUpID0+IHRoaXMuY29udGFpbnNNYXRjaGluZ0VsZW1lbnQobm9kZSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgb3Igbm90IG9uZSBvZiB0aGUgZ2l2ZW4gcmVhY3QgZWxlbWVudHMgZXhpc3RzIGluIHRoZSBzaGFsbG93IHJlbmRlciB0cmVlLlxuICAgKiBNYXRjaCBpcyBiYXNlZCBvbiB0aGUgZXhwZWN0ZWQgZWxlbWVudCBhbmQgbm90IG9uIHdyYXBwZXJzIGVsZW1lbnQuXG4gICAqIEl0IHdpbGwgZGV0ZXJtaW5lIGlmIG9uZSBvZiB0aGUgd3JhcHBlcnMgZWxlbWVudCBcImxvb2tzIGxpa2VcIiB0aGUgZXhwZWN0ZWRcbiAgICogZWxlbWVudCBieSBjaGVja2luZyBpZiBhbGwgcHJvcHMgb2YgdGhlIGV4cGVjdGVkIGVsZW1lbnQgYXJlIHByZXNlbnRcbiAgICogb24gdGhlIHdyYXBwZXJzIGVsZW1lbnQgYW5kIGVxdWFscyB0byBlYWNoIG90aGVyLlxuICAgKlxuICAgKiBFeGFtcGxlOlxuICAgKiBgYGBcbiAgICogY29uc3Qgd3JhcHBlciA9IHNoYWxsb3coPE15Q29tcG9uZW50IC8+KTtcbiAgICogZXhwZWN0KHdyYXBwZXIuY29udGFpbnNBbnlNYXRjaGluZ0VsZW1lbnRzKFtcbiAgICogICA8ZGl2PkhlbGxvPC9kaXY+LFxuICAgKiAgIDxkaXY+R29vZGJ5ZTwvZGl2PixcbiAgICogXSkpLnRvLmVxdWFsKHRydWUpO1xuICAgKiBgYGBcbiAgICpcbiAgICogQHBhcmFtIHtBcnJheTxSZWFjdEVsZW1lbnQ+fSBub2Rlc1xuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAgICovXG4gIGNvbnRhaW5zQW55TWF0Y2hpbmdFbGVtZW50cyhub2Rlcykge1xuICAgIHJldHVybiBBcnJheS5pc0FycmF5KG5vZGVzKSAmJiBub2Rlcy5zb21lKChub2RlKSA9PiB0aGlzLmNvbnRhaW5zTWF0Y2hpbmdFbGVtZW50KG5vZGUpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBXaGV0aGVyIG9yIG5vdCBhIGdpdmVuIHJlYWN0IGVsZW1lbnQgZXhpc3RzIGluIHRoZSByZW5kZXIgdHJlZS5cbiAgICpcbiAgICogRXhhbXBsZTpcbiAgICogYGBgXG4gICAqIGNvbnN0IHdyYXBwZXIgPSBzaGFsbG93KDxNeUNvbXBvbmVudCAvPik7XG4gICAqIGV4cGVjdCh3cmFwcGVyLmNvbnRhaW5zKDxkaXYgY2xhc3NOYW1lPVwiZm9vIGJhclwiIC8+KSkudG8uZXF1YWwodHJ1ZSk7XG4gICAqIGBgYFxuICAgKlxuICAgKiBAcGFyYW0ge1JlYWN0RWxlbWVudH0gbm9kZVxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAgICovXG4gIGVxdWFscyhub2RlKSB7XG4gICAgcmV0dXJuIHRoaXMuc2luZ2xlKCdlcXVhbHMnLCAoKSA9PiBub2RlRXF1YWwodGhpcy5nZXROb2RlSW50ZXJuYWwoKSwgbm9kZSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgb3Igbm90IGEgZ2l2ZW4gcmVhY3QgZWxlbWVudCBtYXRjaGVzIHRoZSByZW5kZXIgdHJlZS5cbiAgICogTWF0Y2ggaXMgYmFzZWQgb24gdGhlIGV4cGVjdGVkIGVsZW1lbnQgYW5kIG5vdCBvbiB3cmFwcGVyIHJvb3Qgbm9kZS5cbiAgICogSXQgd2lsbCBkZXRlcm1pbmUgaWYgdGhlIHdyYXBwZXIgcm9vdCBub2RlIFwibG9va3MgbGlrZVwiIHRoZSBleHBlY3RlZFxuICAgKiBlbGVtZW50IGJ5IGNoZWNraW5nIGlmIGFsbCBwcm9wcyBvZiB0aGUgZXhwZWN0ZWQgZWxlbWVudCBhcmUgcHJlc2VudFxuICAgKiBvbiB0aGUgd3JhcHBlciByb290IG5vZGUgYW5kIGVxdWFscyB0byBlYWNoIG90aGVyLlxuICAgKlxuICAgKiBFeGFtcGxlOlxuICAgKiBgYGBcbiAgICogLy8gTXlDb21wb25lbnQgb3V0cHV0cyA8ZGl2IGNsYXNzPVwiZm9vXCI+SGVsbG88L2Rpdj5cbiAgICogY29uc3Qgd3JhcHBlciA9IHNoYWxsb3coPE15Q29tcG9uZW50IC8+KTtcbiAgICogZXhwZWN0KHdyYXBwZXIubWF0Y2hlc0VsZW1lbnQoPGRpdj5IZWxsbzwvZGl2PikpLnRvLmVxdWFsKHRydWUpO1xuICAgKiBgYGBcbiAgICpcbiAgICogQHBhcmFtIHtSZWFjdEVsZW1lbnR9IG5vZGVcbiAgICogQHJldHVybnMge0Jvb2xlYW59XG4gICAqL1xuICBtYXRjaGVzRWxlbWVudChub2RlKSB7XG4gICAgcmV0dXJuIHRoaXMuc2luZ2xlKCdtYXRjaGVzRWxlbWVudCcsICgpID0+IHtcbiAgICAgIGNvbnN0IGFkYXB0ZXIgPSBnZXRBZGFwdGVyKHRoaXNbT1BUSU9OU10pO1xuICAgICAgY29uc3QgcnN0Tm9kZSA9IGFkYXB0ZXIuZWxlbWVudFRvTm9kZShub2RlKTtcbiAgICAgIHJldHVybiBub2RlTWF0Y2hlcyhyc3ROb2RlLCB0aGlzLmdldE5vZGVJbnRlcm5hbCgpLCAoYSwgYikgPT4gYSA8PSBiKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kcyBldmVyeSBub2RlIGluIHRoZSByZW5kZXIgdHJlZSBvZiB0aGUgY3VycmVudCB3cmFwcGVyIHRoYXQgbWF0Y2hlcyB0aGUgcHJvdmlkZWQgc2VsZWN0b3IuXG4gICAqXG4gICAqIEBwYXJhbSB7RW56eW1lU2VsZWN0b3J9IHNlbGVjdG9yXG4gICAqIEByZXR1cm5zIHtTaGFsbG93V3JhcHBlcn1cbiAgICovXG4gIGZpbmQoc2VsZWN0b3IpIHtcbiAgICByZXR1cm4gdGhpcy53cmFwKHJlZHVjZVRyZWVzQnlTZWxlY3RvcihzZWxlY3RvciwgdGhpcy5nZXROb2Rlc0ludGVybmFsKCkpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHdoZXRoZXIgb3Igbm90IGN1cnJlbnQgbm9kZSBtYXRjaGVzIGEgcHJvdmlkZWQgc2VsZWN0b3IuXG4gICAqXG4gICAqIE5PVEU6IGNhbiBvbmx5IGJlIGNhbGxlZCBvbiBhIHdyYXBwZXIgb2YgYSBzaW5nbGUgbm9kZS5cbiAgICpcbiAgICogQHBhcmFtIHtFbnp5bWVTZWxlY3Rvcn0gc2VsZWN0b3JcbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuICBpcyhzZWxlY3Rvcikge1xuICAgIGNvbnN0IHByZWRpY2F0ZSA9IGJ1aWxkUHJlZGljYXRlKHNlbGVjdG9yKTtcbiAgICByZXR1cm4gdGhpcy5zaW5nbGUoJ2lzJywgKG4pID0+IHByZWRpY2F0ZShuKSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBjb21wb25lbnQgcmVuZGVyZWQgbm90aGluZywgaS5lLiwgbnVsbCBvciBmYWxzZS5cbiAgICpcbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuICBpc0VtcHR5UmVuZGVyKCkge1xuICAgIGNvbnN0IG5vZGVzID0gdGhpcy5nZXROb2Rlc0ludGVybmFsKCk7XG5cbiAgICByZXR1cm4gbm9kZXMuZXZlcnkoKG4pID0+IGlzRW1wdHlWYWx1ZShuKSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIG5ldyB3cmFwcGVyIGluc3RhbmNlIHdpdGggb25seSB0aGUgbm9kZXMgb2YgdGhlIGN1cnJlbnQgd3JhcHBlciBpbnN0YW5jZSB0aGF0IG1hdGNoXG4gICAqIHRoZSBwcm92aWRlZCBwcmVkaWNhdGUgZnVuY3Rpb24uIFRoZSBwcmVkaWNhdGUgc2hvdWxkIHJlY2VpdmUgYSB3cmFwcGVkIG5vZGUgYXMgaXRzIGZpcnN0XG4gICAqIGFyZ3VtZW50LlxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBwcmVkaWNhdGVcbiAgICogQHJldHVybnMge1NoYWxsb3dXcmFwcGVyfVxuICAgKi9cbiAgZmlsdGVyV2hlcmUocHJlZGljYXRlKSB7XG4gICAgcmV0dXJuIGZpbHRlcldoZXJlVW53cmFwcGVkKHRoaXMsIChuKSA9PiBwcmVkaWNhdGUodGhpcy53cmFwKG4pKSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIG5ldyB3cmFwcGVyIGluc3RhbmNlIHdpdGggb25seSB0aGUgbm9kZXMgb2YgdGhlIGN1cnJlbnQgd3JhcHBlciBpbnN0YW5jZSB0aGF0IG1hdGNoXG4gICAqIHRoZSBwcm92aWRlZCBzZWxlY3Rvci5cbiAgICpcbiAgICogQHBhcmFtIHtFbnp5bWVTZWxlY3Rvcn0gc2VsZWN0b3JcbiAgICogQHJldHVybnMge1NoYWxsb3dXcmFwcGVyfVxuICAgKi9cbiAgZmlsdGVyKHNlbGVjdG9yKSB7XG4gICAgY29uc3QgcHJlZGljYXRlID0gYnVpbGRQcmVkaWNhdGUoc2VsZWN0b3IpO1xuICAgIHJldHVybiBmaWx0ZXJXaGVyZVVud3JhcHBlZCh0aGlzLCBwcmVkaWNhdGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBuZXcgd3JhcHBlciBpbnN0YW5jZSB3aXRoIG9ubHkgdGhlIG5vZGVzIG9mIHRoZSBjdXJyZW50IHdyYXBwZXIgdGhhdCBkaWQgbm90IG1hdGNoXG4gICAqIHRoZSBwcm92aWRlZCBzZWxlY3Rvci4gRXNzZW50aWFsbHkgdGhlIGludmVyc2Ugb2YgYGZpbHRlcmAuXG4gICAqXG4gICAqIEBwYXJhbSB7RW56eW1lU2VsZWN0b3J9IHNlbGVjdG9yXG4gICAqIEByZXR1cm5zIHtTaGFsbG93V3JhcHBlcn1cbiAgICovXG4gIG5vdChzZWxlY3Rvcikge1xuICAgIGNvbnN0IHByZWRpY2F0ZSA9IGJ1aWxkUHJlZGljYXRlKHNlbGVjdG9yKTtcbiAgICByZXR1cm4gZmlsdGVyV2hlcmVVbndyYXBwZWQodGhpcywgKG4pID0+ICFwcmVkaWNhdGUobikpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBzdHJpbmcgb2YgdGhlIHJlbmRlcmVkIHRleHQgb2YgdGhlIGN1cnJlbnQgcmVuZGVyIHRyZWUuICBUaGlzIGZ1bmN0aW9uIHNob3VsZCBiZVxuICAgKiBsb29rZWQgYXQgd2l0aCBza2VwdGljaXNtIGlmIGJlaW5nIHVzZWQgdG8gdGVzdCB3aGF0IHRoZSBhY3R1YWwgSFRNTCBvdXRwdXQgb2YgdGhlIGNvbXBvbmVudFxuICAgKiB3aWxsIGJlLiBJZiB0aGF0IGlzIHdoYXQgeW91IHdvdWxkIGxpa2UgdG8gdGVzdCwgdXNlIGVuenltZSdzIGByZW5kZXJgIGZ1bmN0aW9uIGluc3RlYWQuXG4gICAqXG4gICAqIE5PVEU6IGNhbiBvbmx5IGJlIGNhbGxlZCBvbiBhIHdyYXBwZXIgb2YgYSBzaW5nbGUgbm9kZS5cbiAgICpcbiAgICogQHJldHVybnMge1N0cmluZ31cbiAgICovXG4gIHRleHQoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2luZ2xlKCd0ZXh0JywgZ2V0VGV4dEZyb21Ob2RlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBIVE1MIG9mIHRoZSBub2RlLlxuICAgKlxuICAgKiBOT1RFOiBjYW4gb25seSBiZSBjYWxsZWQgb24gYSB3cmFwcGVyIG9mIGEgc2luZ2xlIG5vZGUuXG4gICAqXG4gICAqIEByZXR1cm5zIHtTdHJpbmd9XG4gICAqL1xuICBodG1sKCkge1xuICAgIHJldHVybiB0aGlzLnNpbmdsZSgnaHRtbCcsIChuKSA9PiB7XG4gICAgICBpZiAodGhpcy50eXBlKCkgPT09IG51bGwpIHJldHVybiBudWxsO1xuICAgICAgY29uc3QgYWRhcHRlciA9IGdldEFkYXB0ZXIodGhpc1tPUFRJT05TXSk7XG4gICAgICBjb25zdCByZW5kZXJlciA9IGFkYXB0ZXIuY3JlYXRlUmVuZGVyZXIoeyAuLi50aGlzW09QVElPTlNdLCBtb2RlOiAnc3RyaW5nJyB9KTtcbiAgICAgIHJldHVybiByZW5kZXJlci5yZW5kZXIoYWRhcHRlci5ub2RlVG9FbGVtZW50KG4pKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBjdXJyZW50IG5vZGUgcmVuZGVyZWQgdG8gSFRNTCBhbmQgd3JhcHBlZCBpbiBhIENoZWVyaW9XcmFwcGVyLlxuICAgKlxuICAgKiBOT1RFOiBjYW4gb25seSBiZSBjYWxsZWQgb24gYSB3cmFwcGVyIG9mIGEgc2luZ2xlIG5vZGUuXG4gICAqXG4gICAqIEByZXR1cm5zIHtDaGVlcmlvV3JhcHBlcn1cbiAgICovXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBodG1sID0gdGhpcy5odG1sKCk7XG4gICAgcmV0dXJuIGxvYWRDaGVlcmlvUm9vdChodG1sKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2VkIHRvIHNpbXVsYXRlIGV2ZW50cy4gUGFzcyBhbiBldmVudG5hbWUgYW5kIChvcHRpb25hbGx5KSBldmVudCBhcmd1bWVudHMuIFRoaXMgbWV0aG9kIG9mXG4gICAqIHRlc3RpbmcgZXZlbnRzIHNob3VsZCBiZSBtZXQgd2l0aCBzb21lIHNrZXB0aWNpc20uXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuICAgKiBAcGFyYW0ge0FycmF5fSBhcmdzXG4gICAqIEByZXR1cm5zIHtTaGFsbG93V3JhcHBlcn1cbiAgICovXG4gIHNpbXVsYXRlKGV2ZW50LCAuLi5hcmdzKSB7XG4gICAgcmV0dXJuIHRoaXMuc2luZ2xlKCdzaW11bGF0ZScsIChuKSA9PiB7XG4gICAgICB0aGlzW1JFTkRFUkVSXS5zaW11bGF0ZUV2ZW50KG4sIGV2ZW50LCAuLi5hcmdzKTtcbiAgICAgIHRoaXNbUk9PVF0udXBkYXRlKCk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2VkIHRvIHNpbXVsYXRlIHRocm93aW5nIGEgcmVuZGVyaW5nIGVycm9yLiBQYXNzIGFuIGVycm9yIHRvIHRocm93LlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gZXJyb3JcbiAgICogQHJldHVybnMge1NoYWxsb3dXcmFwcGVyfVxuICAgKi9cbiAgc2ltdWxhdGVFcnJvcihlcnJvcikge1xuICAgIC8vIGluIHNoYWxsb3csIHRoZSBcInJvb3RcIiBpcyB0aGUgXCJyZW5kZXJlZFwiIHRoaW5nLlxuXG4gICAgcmV0dXJuIHRoaXMuc2luZ2xlKCdzaW11bGF0ZUVycm9yJywgKHRoaXNOb2RlKSA9PiB7XG4gICAgICBpZiAodGhpc05vZGUubm9kZVR5cGUgPT09ICdob3N0Jykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdTaGFsbG93V3JhcHBlcjo6c2ltdWxhdGVFcnJvcigpIGNhbiBvbmx5IGJlIGNhbGxlZCBvbiBjdXN0b20gY29tcG9uZW50cycpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCByZW5kZXJlciA9IHRoaXNbUkVOREVSRVJdO1xuICAgICAgaWYgKHR5cGVvZiByZW5kZXJlci5zaW11bGF0ZUVycm9yICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3lvdXIgYWRhcHRlciBkb2VzIG5vdCBzdXBwb3J0IGBzaW11bGF0ZUVycm9yYC4gVHJ5IHVwZ3JhZGluZyBpdCEnKTtcbiAgICAgIH1cblxuICAgICAgY29uc3Qgcm9vdE5vZGUgPSBnZXRSb290Tm9kZUludGVybmFsKHRoaXMpO1xuICAgICAgY29uc3Qgbm9kZUhpZXJhcmNoeSA9IFt0aGlzTm9kZV0uY29uY2F0KG5vZGVQYXJlbnRzKHRoaXMsIHRoaXNOb2RlKSk7XG4gICAgICByZW5kZXJlci5zaW11bGF0ZUVycm9yKG5vZGVIaWVyYXJjaHksIHJvb3ROb2RlLCBlcnJvcik7XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHByb3BzIGhhc2ggZm9yIHRoZSBjdXJyZW50IG5vZGUgb2YgdGhlIHdyYXBwZXIuXG4gICAqXG4gICAqIE5PVEU6IGNhbiBvbmx5IGJlIGNhbGxlZCBvbiBhIHdyYXBwZXIgb2YgYSBzaW5nbGUgbm9kZS5cbiAgICpcbiAgICogQHJldHVybnMge09iamVjdH1cbiAgICovXG4gIHByb3BzKCkge1xuICAgIHJldHVybiB0aGlzLnNpbmdsZSgncHJvcHMnLCBwcm9wc09mTm9kZSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgc3RhdGUgaGFzaCBmb3IgdGhlIHJvb3Qgbm9kZSBvZiB0aGUgd3JhcHBlci4gT3B0aW9uYWxseSBwYXNzIGluIGEgcHJvcCBuYW1lIGFuZCBpdFxuICAgKiB3aWxsIHJldHVybiBqdXN0IHRoYXQgdmFsdWUuXG4gICAqXG4gICAqIE5PVEU6IGNhbiBvbmx5IGJlIGNhbGxlZCBvbiBhIHdyYXBwZXIgb2YgYSBzaW5nbGUgbm9kZS5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgKG9wdGlvbmFsKVxuICAgKiBAcmV0dXJucyB7Kn1cbiAgICovXG4gIHN0YXRlKG5hbWUpIHtcbiAgICBpZiAodGhpc1tST09UXSAhPT0gdGhpcykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdTaGFsbG93V3JhcHBlcjo6c3RhdGUoKSBjYW4gb25seSBiZSBjYWxsZWQgb24gdGhlIHJvb3QnKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuaW5zdGFuY2UoKSA9PT0gbnVsbCB8fCB0aGlzW1JFTkRFUkVSXS5nZXROb2RlKCkubm9kZVR5cGUgIT09ICdjbGFzcycpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignU2hhbGxvd1dyYXBwZXI6OnN0YXRlKCkgY2FuIG9ubHkgYmUgY2FsbGVkIG9uIGNsYXNzIGNvbXBvbmVudHMnKTtcbiAgICB9XG4gICAgY29uc3QgX3N0YXRlID0gdGhpcy5zaW5nbGUoJ3N0YXRlJywgKCkgPT4gdGhpcy5pbnN0YW5jZSgpLnN0YXRlKTtcbiAgICBpZiAodHlwZW9mIG5hbWUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBpZiAoX3N0YXRlID09IG51bGwpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgU2hhbGxvd1dyYXBwZXI6OnN0YXRlKFwiJHtuYW1lfVwiKSByZXF1aXJlcyB0aGF0IFxcYHN0YXRlXFxgIG5vdCBiZSBcXGBudWxsXFxgIG9yIFxcYHVuZGVmaW5lZFxcYGApO1xuICAgICAgfVxuICAgICAgcmV0dXJuIF9zdGF0ZVtuYW1lXTtcbiAgICB9XG4gICAgcmV0dXJuIF9zdGF0ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBjb250ZXh0IGhhc2ggZm9yIHRoZSByb290IG5vZGUgb2YgdGhlIHdyYXBwZXIuXG4gICAqIE9wdGlvbmFsbHkgcGFzcyBpbiBhIHByb3AgbmFtZSBhbmQgaXQgd2lsbCByZXR1cm4ganVzdCB0aGF0IHZhbHVlLlxuICAgKlxuICAgKiBOT1RFOiBjYW4gb25seSBiZSBjYWxsZWQgb24gYSB3cmFwcGVyIG9mIGEgc2luZ2xlIG5vZGUuXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIChvcHRpb25hbClcbiAgICogQHJldHVybnMgeyp9XG4gICAqL1xuICBjb250ZXh0KG5hbWUpIHtcbiAgICBpZiAodGhpc1tST09UXSAhPT0gdGhpcykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdTaGFsbG93V3JhcHBlcjo6Y29udGV4dCgpIGNhbiBvbmx5IGJlIGNhbGxlZCBvbiB0aGUgcm9vdCcpO1xuICAgIH1cbiAgICBpZiAoIXRoaXNbT1BUSU9OU10uY29udGV4dCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdTaGFsbG93V3JhcHBlcjo6Y29udGV4dCgpIGNhbiBvbmx5IGJlIGNhbGxlZCBvbiBhIHdyYXBwZXIgdGhhdCB3YXMgb3JpZ2luYWxseSBwYXNzZWQgYSBjb250ZXh0IG9wdGlvbicpO1xuICAgIH1cbiAgICBpZiAodGhpcy5pbnN0YW5jZSgpID09PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NoYWxsb3dXcmFwcGVyOjpjb250ZXh0KCkgY2FuIG9ubHkgYmUgY2FsbGVkIG9uIHdyYXBwZWQgbm9kZXMgdGhhdCBoYXZlIGEgbm9uLW51bGwgaW5zdGFuY2UnKTtcbiAgICB9XG4gICAgY29uc3QgX2NvbnRleHQgPSB0aGlzLnNpbmdsZSgnY29udGV4dCcsICgpID0+IHRoaXMuaW5zdGFuY2UoKS5jb250ZXh0KTtcbiAgICBpZiAobmFtZSkge1xuICAgICAgcmV0dXJuIF9jb250ZXh0W25hbWVdO1xuICAgIH1cbiAgICByZXR1cm4gX2NvbnRleHQ7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIG5ldyB3cmFwcGVyIHdpdGggYWxsIG9mIHRoZSBjaGlsZHJlbiBvZiB0aGUgY3VycmVudCB3cmFwcGVyLlxuICAgKlxuICAgKiBAcGFyYW0ge0VuenltZVNlbGVjdG9yfSBbc2VsZWN0b3JdXG4gICAqIEByZXR1cm5zIHtTaGFsbG93V3JhcHBlcn1cbiAgICovXG4gIGNoaWxkcmVuKHNlbGVjdG9yKSB7XG4gICAgY29uc3QgYWxsQ2hpbGRyZW4gPSB0aGlzLmZsYXRNYXAoKG4pID0+IGNoaWxkcmVuT2ZOb2RlKG4uZ2V0Tm9kZUludGVybmFsKCkpKTtcbiAgICByZXR1cm4gc2VsZWN0b3IgPyBhbGxDaGlsZHJlbi5maWx0ZXIoc2VsZWN0b3IpIDogYWxsQ2hpbGRyZW47XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIG5ldyB3cmFwcGVyIHdpdGggYSBzcGVjaWZpYyBjaGlsZFxuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gW2luZGV4XVxuICAgKiBAcmV0dXJucyB7U2hhbGxvd1dyYXBwZXJ9XG4gICAqL1xuICBjaGlsZEF0KGluZGV4KSB7XG4gICAgcmV0dXJuIHRoaXMuc2luZ2xlKCdjaGlsZEF0JywgKCkgPT4gdGhpcy5jaGlsZHJlbigpLmF0KGluZGV4KSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIHdyYXBwZXIgYXJvdW5kIGFsbCBvZiB0aGUgcGFyZW50cy9hbmNlc3RvcnMgb2YgdGhlIHdyYXBwZXIuIERvZXMgbm90IGluY2x1ZGUgdGhlIG5vZGVcbiAgICogaW4gdGhlIGN1cnJlbnQgd3JhcHBlci5cbiAgICpcbiAgICogTk9URTogY2FuIG9ubHkgYmUgY2FsbGVkIG9uIGEgd3JhcHBlciBvZiBhIHNpbmdsZSBub2RlLlxuICAgKlxuICAgKiBAcGFyYW0ge0VuenltZVNlbGVjdG9yfSBbc2VsZWN0b3JdXG4gICAqIEByZXR1cm5zIHtTaGFsbG93V3JhcHBlcn1cbiAgICovXG4gIHBhcmVudHMoc2VsZWN0b3IpIHtcbiAgICByZXR1cm4gdGhpcy5zaW5nbGUoJ3BhcmVudHMnLCAobikgPT4ge1xuICAgICAgY29uc3QgYWxsUGFyZW50cyA9IHRoaXMud3JhcChub2RlUGFyZW50cyh0aGlzLCBuKSk7XG4gICAgICByZXR1cm4gc2VsZWN0b3IgPyBhbGxQYXJlbnRzLmZpbHRlcihzZWxlY3RvcikgOiBhbGxQYXJlbnRzO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSB3cmFwcGVyIGFyb3VuZCB0aGUgaW1tZWRpYXRlIHBhcmVudCBvZiB0aGUgY3VycmVudCBub2RlLlxuICAgKlxuICAgKiBAcmV0dXJucyB7U2hhbGxvd1dyYXBwZXJ9XG4gICAqL1xuICBwYXJlbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZmxhdE1hcCgobikgPT4gW24ucGFyZW50cygpLmdldCgwKV0pO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7RW56eW1lU2VsZWN0b3J9IHNlbGVjdG9yXG4gICAqIEByZXR1cm5zIHtTaGFsbG93V3JhcHBlcn1cbiAgICovXG4gIGNsb3Nlc3Qoc2VsZWN0b3IpIHtcbiAgICBpZiAodGhpcy5pcyhzZWxlY3RvcikpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBjb25zdCBtYXRjaGluZ0FuY2VzdG9ycyA9IHRoaXMucGFyZW50cygpLmZpbHRlcihzZWxlY3Rvcik7XG4gICAgcmV0dXJuIG1hdGNoaW5nQW5jZXN0b3JzLmxlbmd0aCA+IDAgPyBtYXRjaGluZ0FuY2VzdG9ycy5maXJzdCgpIDogdGhpcy5maW5kV2hlcmUoKCkgPT4gZmFsc2UpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNoYWxsb3cgcmVuZGVycyB0aGUgY3VycmVudCBub2RlIGFuZCByZXR1cm5zIGEgc2hhbGxvdyB3cmFwcGVyIGFyb3VuZCBpdC5cbiAgICpcbiAgICogTk9URTogY2FuIG9ubHkgYmUgY2FsbGVkIG9uIHdyYXBwZXIgb2YgYSBzaW5nbGUgbm9kZS5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICogQHJldHVybnMge1NoYWxsb3dXcmFwcGVyfVxuICAgKi9cbiAgc2hhbGxvdyhvcHRpb25zID0ge30pIHtcbiAgICByZXR1cm4gdGhpcy5zaW5nbGUoJ3NoYWxsb3cnLCAobikgPT4ge1xuICAgICAgY29uc3QgY2hpbGRPcHRpb25zID0gbWFrZUluaGVyaXRlZENoaWxkT3B0aW9ucyh0aGlzLCBvcHRpb25zKTtcbiAgICAgIHJldHVybiB0aGlzLndyYXAoZ2V0QWRhcHRlcih0aGlzW09QVElPTlNdKS5ub2RlVG9FbGVtZW50KG4pLCBudWxsLCBjaGlsZE9wdGlvbnMpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHZhbHVlIG9mIHByb3Agd2l0aCB0aGUgZ2l2ZW4gbmFtZSBvZiB0aGUgY3VycmVudCBub2RlLlxuICAgKlxuICAgKiBAcGFyYW0gcHJvcE5hbWVcbiAgICogQHJldHVybnMgeyp9XG4gICAqL1xuICBwcm9wKHByb3BOYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvcHMoKVtwcm9wTmFtZV07XG4gIH1cblxuICAvKipcbiAgICogVXNlZCB0byBpbnZva2UgYSBmdW5jdGlvbiBwcm9wLlxuICAgKiBXaWxsIGludm9rZSBhbiBmdW5jdGlvbiBwcm9wIGFuZCByZXR1cm4gaXRzIHZhbHVlLlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gcHJvcE5hbWVcbiAgICogQHJldHVybnMge0FueX1cbiAgICovXG4gIGludm9rZShwcm9wTmFtZSkge1xuICAgIHJldHVybiB0aGlzLnNpbmdsZSgnaW52b2tlJywgKCkgPT4ge1xuICAgICAgY29uc3QgaGFuZGxlciA9IHRoaXMucHJvcChwcm9wTmFtZSk7XG4gICAgICBpZiAodHlwZW9mIGhhbmRsZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignU2hhbGxvd1dyYXBwZXI6Omludm9rZSgpIHJlcXVpcmVzIHRoZSBuYW1lIG9mIGEgcHJvcCB3aG9zZSB2YWx1ZSBpcyBhIGZ1bmN0aW9uJyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gKC4uLmFyZ3MpID0+IHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBoYW5kbGVyKC4uLmFyZ3MpO1xuICAgICAgICB0aGlzW1JPT1RdLnVwZGF0ZSgpO1xuICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSB3cmFwcGVyIG9mIHRoZSBub2RlIHJlbmRlcmVkIGJ5IHRoZSBwcm92aWRlZCByZW5kZXIgcHJvcC5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IHByb3BOYW1lXG4gICAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAgICovXG4gIHJlbmRlclByb3AocHJvcE5hbWUpIHtcbiAgICBjb25zdCBhZGFwdGVyID0gZ2V0QWRhcHRlcih0aGlzW09QVElPTlNdKTtcbiAgICBpZiAodHlwZW9mIGFkYXB0ZXIud3JhcCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ3lvdXIgYWRhcHRlciBkb2VzIG5vdCBzdXBwb3J0IGB3cmFwYC4gVHJ5IHVwZ3JhZGluZyBpdCEnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5zaW5nbGUoJ3JlbmRlclByb3AnLCAobikgPT4ge1xuICAgICAgaWYgKG4ubm9kZVR5cGUgPT09ICdob3N0Jykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdTaGFsbG93V3JhcHBlcjo6cmVuZGVyUHJvcCgpIGNhbiBvbmx5IGJlIGNhbGxlZCBvbiBjdXN0b20gY29tcG9uZW50cycpO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBwcm9wTmFtZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignU2hhbGxvd1dyYXBwZXI6OnJlbmRlclByb3AoKTogYHByb3BOYW1lYCBtdXN0IGJlIGEgc3RyaW5nJyk7XG4gICAgICB9XG4gICAgICBjb25zdCBwcm9wcyA9IHRoaXMucHJvcHMoKTtcbiAgICAgIGlmICghaGFzT3duKHByb3BzLCBwcm9wTmFtZSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBTaGFsbG93V3JhcHBlcjo6cmVuZGVyUHJvcCgpOiBubyBwcm9wIGNhbGxlZCDigJwke3Byb3BOYW1lfeKAnCBmb3VuZGApO1xuICAgICAgfVxuICAgICAgY29uc3QgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgaWYgKHR5cGVvZiBwcm9wVmFsdWUgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgU2hhbGxvd1dyYXBwZXI6OnJlbmRlclByb3AoKTogZXhwZWN0ZWQgcHJvcCDigJwke3Byb3BOYW1lfeKAnCB0byBjb250YWluIGEgZnVuY3Rpb24sIGJ1dCBpdCBob2xkcyDigJwke3R5cGVvZiBwcm9wVmFsdWV94oCcYCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAoLi4uYXJncykgPT4ge1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gcHJvcFZhbHVlKC4uLmFyZ3MpO1xuICAgICAgICBjb25zdCB3cmFwcGVkID0gYWRhcHRlci53cmFwKGVsZW1lbnQpO1xuICAgICAgICByZXR1cm4gdGhpcy53cmFwKHdyYXBwZWQsIG51bGwsIHRoaXNbT1BUSU9OU10pO1xuICAgICAgfTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBrZXkgYXNzaWduZWQgdG8gdGhlIGN1cnJlbnQgbm9kZS5cbiAgICpcbiAgICogQHJldHVybnMge1N0cmluZ31cbiAgICovXG4gIGtleSgpIHtcbiAgICByZXR1cm4gdGhpcy5zaW5nbGUoJ2tleScsIChuKSA9PiAobi5rZXkgPT09IHVuZGVmaW5lZCA/IG51bGwgOiBuLmtleSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHR5cGUgb2YgdGhlIGN1cnJlbnQgbm9kZSBvZiB0aGlzIHdyYXBwZXIuIElmIGl0J3MgYSBjb21wb3NpdGUgY29tcG9uZW50LCB0aGlzIHdpbGxcbiAgICogYmUgdGhlIGNvbXBvbmVudCBjb25zdHJ1Y3Rvci4gSWYgaXQncyBhIG5hdGl2ZSBET00gbm9kZSwgaXQgd2lsbCBiZSBhIHN0cmluZyBvZiB0aGUgdGFnIG5hbWUuXG4gICAqIElmIGl0J3MgbnVsbCwgaXQgd2lsbCBiZSBudWxsLlxuICAgKlxuICAgKiBAcmV0dXJucyB7U3RyaW5nfEZ1bmN0aW9ufG51bGx9XG4gICAqL1xuICB0eXBlKCkge1xuICAgIHJldHVybiB0aGlzLnNpbmdsZSgndHlwZScsIChuKSA9PiB0eXBlT2ZOb2RlKG4pKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBuYW1lIG9mIHRoZSBjdXJyZW50IG5vZGUgb2YgdGhpcyB3cmFwcGVyLlxuICAgKlxuICAgKiBJbiBvcmRlciBvZiBwcmVjZWRlbmNlID0+IHR5cGUuZGlzcGxheU5hbWUgLT4gdHlwZS5uYW1lIC0+IHR5cGUuXG4gICAqXG4gICAqIEByZXR1cm5zIHtTdHJpbmd9XG4gICAqL1xuICBuYW1lKCkge1xuICAgIGNvbnN0IGFkYXB0ZXIgPSBnZXRBZGFwdGVyKHRoaXNbT1BUSU9OU10pO1xuICAgIHJldHVybiB0aGlzLnNpbmdsZSgnbmFtZScsIChuKSA9PiAoXG4gICAgICBhZGFwdGVyLmRpc3BsYXlOYW1lT2ZOb2RlID8gYWRhcHRlci5kaXNwbGF5TmFtZU9mTm9kZShuKSA6IGRpc3BsYXlOYW1lT2ZOb2RlKG4pXG4gICAgKSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgY3VycmVudCBub2RlIGhhcyB0aGUgZ2l2ZW4gY2xhc3MgbmFtZSBvciBub3QuXG4gICAqXG4gICAqIE5PVEU6IGNhbiBvbmx5IGJlIGNhbGxlZCBvbiBhIHdyYXBwZXIgb2YgYSBzaW5nbGUgbm9kZS5cbiAgICpcbiAgICogQHBhcmFtIGNsYXNzTmFtZVxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAgICovXG4gIGhhc0NsYXNzKGNsYXNzTmFtZSkge1xuICAgIGlmICh0eXBlb2YgY2xhc3NOYW1lID09PSAnc3RyaW5nJyAmJiBjbGFzc05hbWUuaW5kZXhPZignLicpICE9PSAtMSkge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgIGNvbnNvbGUud2FybignSXQgbG9va3MgbGlrZSB5b3VcXCdyZSBjYWxsaW5nIGBTaGFsbG93V3JhcHBlcjo6aGFzQ2xhc3MoKWAgd2l0aCBhIENTUyBzZWxlY3Rvci4gaGFzQ2xhc3MoKSBleHBlY3RzIGEgY2xhc3MgbmFtZSwgbm90IGEgQ1NTIHNlbGVjdG9yLicpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5zaW5nbGUoJ2hhc0NsYXNzJywgKG4pID0+IGhhc0NsYXNzTmFtZShuLCBjbGFzc05hbWUpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJdGVyYXRlcyB0aHJvdWdoIGVhY2ggbm9kZSBvZiB0aGUgY3VycmVudCB3cmFwcGVyIGFuZCBleGVjdXRlcyB0aGUgcHJvdmlkZWQgZnVuY3Rpb24gd2l0aCBhXG4gICAqIHdyYXBwZXIgYXJvdW5kIHRoZSBjb3JyZXNwb25kaW5nIG5vZGUgcGFzc2VkIGluIGFzIHRoZSBmaXJzdCBhcmd1bWVudC5cbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAgICogQHJldHVybnMge1NoYWxsb3dXcmFwcGVyfVxuICAgKi9cbiAgZm9yRWFjaChmbikge1xuICAgIHRoaXMuZ2V0Tm9kZXNJbnRlcm5hbCgpLmZvckVhY2goKG4sIGkpID0+IGZuLmNhbGwodGhpcywgdGhpcy53cmFwKG4pLCBpKSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogTWFwcyB0aGUgY3VycmVudCBhcnJheSBvZiBub2RlcyB0byBhbm90aGVyIGFycmF5LiBFYWNoIG5vZGUgaXMgcGFzc2VkIGluIGFzIGEgYFNoYWxsb3dXcmFwcGVyYFxuICAgKiB0byB0aGUgbWFwIGZ1bmN0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICAgKiBAcmV0dXJucyB7QXJyYXl9XG4gICAqL1xuICBtYXAoZm4pIHtcbiAgICByZXR1cm4gdGhpcy5nZXROb2Rlc0ludGVybmFsKCkubWFwKChuLCBpKSA9PiBmbi5jYWxsKHRoaXMsIHRoaXMud3JhcChuKSwgaSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZHVjZXMgdGhlIGN1cnJlbnQgYXJyYXkgb2Ygbm9kZXMgdG8gYSB2YWx1ZS4gRWFjaCBub2RlIGlzIHBhc3NlZCBpbiBhcyBhIGBTaGFsbG93V3JhcHBlcmBcbiAgICogdG8gdGhlIHJlZHVjZXIgZnVuY3Rpb24uXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIC0gdGhlIHJlZHVjZXIgZnVuY3Rpb25cbiAgICogQHBhcmFtIHsqfSBpbml0aWFsVmFsdWUgLSB0aGUgaW5pdGlhbCB2YWx1ZVxuICAgKiBAcmV0dXJucyB7Kn1cbiAgICovXG4gIHJlZHVjZShmbiwgaW5pdGlhbFZhbHVlID0gdW5kZWZpbmVkKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXROb2Rlc0ludGVybmFsKCkucmVkdWNlKFxuICAgICAgICAoYWNjdW0sIG4sIGkpID0+IGZuLmNhbGwodGhpcywgYWNjdW0sIHRoaXMud3JhcChuKSwgaSksXG4gICAgICAgIGluaXRpYWxWYWx1ZSxcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmdldE5vZGVzSW50ZXJuYWwoKS5yZWR1Y2UoKGFjY3VtLCBuLCBpKSA9PiBmbi5jYWxsKFxuICAgICAgdGhpcyxcbiAgICAgIGkgPT09IDEgPyB0aGlzLndyYXAoYWNjdW0pIDogYWNjdW0sXG4gICAgICB0aGlzLndyYXAobiksXG4gICAgICBpLFxuICAgICkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZHVjZXMgdGhlIGN1cnJlbnQgYXJyYXkgb2Ygbm9kZXMgdG8gYW5vdGhlciBhcnJheSwgZnJvbSByaWdodCB0byBsZWZ0LiBFYWNoIG5vZGUgaXMgcGFzc2VkXG4gICAqIGluIGFzIGEgYFNoYWxsb3dXcmFwcGVyYCB0byB0aGUgcmVkdWNlciBmdW5jdGlvbi5cbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gLSB0aGUgcmVkdWNlciBmdW5jdGlvblxuICAgKiBAcGFyYW0geyp9IGluaXRpYWxWYWx1ZSAtIHRoZSBpbml0aWFsIHZhbHVlXG4gICAqIEByZXR1cm5zIHsqfVxuICAgKi9cbiAgcmVkdWNlUmlnaHQoZm4sIGluaXRpYWxWYWx1ZSA9IHVuZGVmaW5lZCkge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0Tm9kZXNJbnRlcm5hbCgpLnJlZHVjZVJpZ2h0KFxuICAgICAgICAoYWNjdW0sIG4sIGkpID0+IGZuLmNhbGwodGhpcywgYWNjdW0sIHRoaXMud3JhcChuKSwgaSksXG4gICAgICAgIGluaXRpYWxWYWx1ZSxcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmdldE5vZGVzSW50ZXJuYWwoKS5yZWR1Y2VSaWdodCgoYWNjdW0sIG4sIGkpID0+IGZuLmNhbGwoXG4gICAgICB0aGlzLFxuICAgICAgaSA9PT0gMSA/IHRoaXMud3JhcChhY2N1bSkgOiBhY2N1bSxcbiAgICAgIHRoaXMud3JhcChuKSxcbiAgICAgIGksXG4gICAgKSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIG5ldyB3cmFwcGVyIHdpdGggYSBzdWJzZXQgb2YgdGhlIG5vZGVzIG9mIHRoZSBvcmlnaW5hbCB3cmFwcGVyLCBhY2NvcmRpbmcgdG8gdGhlXG4gICAqIHJ1bGVzIG9mIGBBcnJheSNzbGljZWAuXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBiZWdpblxuICAgKiBAcGFyYW0ge051bWJlcn0gZW5kXG4gICAqIEByZXR1cm5zIHtTaGFsbG93V3JhcHBlcn1cbiAgICovXG4gIHNsaWNlKGJlZ2luLCBlbmQpIHtcbiAgICByZXR1cm4gdGhpcy53cmFwKHRoaXMuZ2V0Tm9kZXNJbnRlcm5hbCgpLnNsaWNlKGJlZ2luLCBlbmQpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHdoZXRoZXIgb3Igbm90IGFueSBvZiB0aGUgbm9kZXMgaW4gdGhlIHdyYXBwZXIgbWF0Y2ggdGhlIHByb3ZpZGVkIHNlbGVjdG9yLlxuICAgKlxuICAgKiBAcGFyYW0ge0VuenltZVNlbGVjdG9yfSBzZWxlY3RvclxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAgICovXG4gIHNvbWUoc2VsZWN0b3IpIHtcbiAgICBpZiAodGhpc1tST09UXSA9PT0gdGhpcykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdTaGFsbG93V3JhcHBlcjo6c29tZSgpIGNhbiBub3QgYmUgY2FsbGVkIG9uIHRoZSByb290Jyk7XG4gICAgfVxuICAgIGNvbnN0IHByZWRpY2F0ZSA9IGJ1aWxkUHJlZGljYXRlKHNlbGVjdG9yKTtcbiAgICByZXR1cm4gdGhpcy5nZXROb2Rlc0ludGVybmFsKCkuc29tZShwcmVkaWNhdGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgd2hldGhlciBvciBub3QgYW55IG9mIHRoZSBub2RlcyBpbiB0aGUgd3JhcHBlciBwYXNzIHRoZSBwcm92aWRlZCBwcmVkaWNhdGUgZnVuY3Rpb24uXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IHByZWRpY2F0ZVxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAgICovXG4gIHNvbWVXaGVyZShwcmVkaWNhdGUpIHtcbiAgICByZXR1cm4gdGhpcy5nZXROb2Rlc0ludGVybmFsKCkuc29tZSgobiwgaSkgPT4gcHJlZGljYXRlLmNhbGwodGhpcywgdGhpcy53cmFwKG4pLCBpKSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB3aGV0aGVyIG9yIG5vdCBhbGwgb2YgdGhlIG5vZGVzIGluIHRoZSB3cmFwcGVyIG1hdGNoIHRoZSBwcm92aWRlZCBzZWxlY3Rvci5cbiAgICpcbiAgICogQHBhcmFtIHtFbnp5bWVTZWxlY3Rvcn0gc2VsZWN0b3JcbiAgICogQHJldHVybnMge0Jvb2xlYW59XG4gICAqL1xuICBldmVyeShzZWxlY3Rvcikge1xuICAgIGNvbnN0IHByZWRpY2F0ZSA9IGJ1aWxkUHJlZGljYXRlKHNlbGVjdG9yKTtcbiAgICByZXR1cm4gdGhpcy5nZXROb2Rlc0ludGVybmFsKCkuZXZlcnkocHJlZGljYXRlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHdoZXRoZXIgb3Igbm90IGFueSBvZiB0aGUgbm9kZXMgaW4gdGhlIHdyYXBwZXIgcGFzcyB0aGUgcHJvdmlkZWQgcHJlZGljYXRlIGZ1bmN0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBwcmVkaWNhdGVcbiAgICogQHJldHVybnMge0Jvb2xlYW59XG4gICAqL1xuICBldmVyeVdoZXJlKHByZWRpY2F0ZSkge1xuICAgIHJldHVybiB0aGlzLmdldE5vZGVzSW50ZXJuYWwoKS5ldmVyeSgobiwgaSkgPT4gcHJlZGljYXRlLmNhbGwodGhpcywgdGhpcy53cmFwKG4pLCBpKSk7XG4gIH1cblxuICAvKipcbiAgICogVXRpbGl0eSBtZXRob2QgdXNlZCB0byBjcmVhdGUgbmV3IHdyYXBwZXJzIHdpdGggYSBtYXBwaW5nIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhbiBhcnJheSBvZlxuICAgKiBub2RlcyBpbiByZXNwb25zZSB0byBhIHNpbmdsZSBub2RlIHdyYXBwZXIuIFRoZSByZXR1cm5lZCB3cmFwcGVyIGlzIGEgc2luZ2xlIHdyYXBwZXIgYXJvdW5kXG4gICAqIGFsbCBvZiB0aGUgbWFwcGVkIG5vZGVzIGZsYXR0ZW5lZCAoYW5kIGRlLWR1cGxpY2F0ZWQpLlxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICAgKiBAcmV0dXJucyB7U2hhbGxvd1dyYXBwZXJ9XG4gICAqL1xuICBmbGF0TWFwKGZuKSB7XG4gICAgY29uc3Qgbm9kZXMgPSB0aGlzLmdldE5vZGVzSW50ZXJuYWwoKS5tYXAoKG4sIGkpID0+IGZuLmNhbGwodGhpcywgdGhpcy53cmFwKG4pLCBpKSk7XG4gICAgY29uc3QgZmxhdHRlbmVkID0gZmxhdChub2RlcywgMSk7XG4gICAgcmV0dXJuIHRoaXMud3JhcChmbGF0dGVuZWQuZmlsdGVyKEJvb2xlYW4pKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kcyBhbGwgbm9kZXMgaW4gdGhlIGN1cnJlbnQgd3JhcHBlciBub2RlcycgcmVuZGVyIHRyZWVzIHRoYXQgbWF0Y2ggdGhlIHByb3ZpZGVkIHByZWRpY2F0ZVxuICAgKiBmdW5jdGlvbi4gVGhlIHByZWRpY2F0ZSBmdW5jdGlvbiB3aWxsIHJlY2VpdmUgdGhlIG5vZGVzIGluc2lkZSBhIFNoYWxsb3dXcmFwcGVyIGFzIGl0c1xuICAgKiBmaXJzdCBhcmd1bWVudC5cbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gcHJlZGljYXRlXG4gICAqIEByZXR1cm5zIHtTaGFsbG93V3JhcHBlcn1cbiAgICovXG4gIGZpbmRXaGVyZShwcmVkaWNhdGUpIHtcbiAgICByZXR1cm4gZmluZFdoZXJlVW53cmFwcGVkKHRoaXMsIChuKSA9PiB7XG4gICAgICBjb25zdCBub2RlID0gdGhpcy53cmFwKG4pO1xuICAgICAgcmV0dXJuIG5vZGUubGVuZ3RoID4gMCAmJiBwcmVkaWNhdGUobm9kZSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgbm9kZSBhdCBhIGdpdmVuIGluZGV4IG9mIHRoZSBjdXJyZW50IHdyYXBwZXIuXG4gICAqXG4gICAqIEBwYXJhbSBpbmRleFxuICAgKiBAcmV0dXJucyB7UmVhY3RFbGVtZW50fVxuICAgKi9cbiAgZ2V0KGluZGV4KSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0RWxlbWVudHMoKVtpbmRleF07XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIHdyYXBwZXIgYXJvdW5kIHRoZSBub2RlIGF0IGEgZ2l2ZW4gaW5kZXggb2YgdGhlIGN1cnJlbnQgd3JhcHBlci5cbiAgICpcbiAgICogQHBhcmFtIGluZGV4XG4gICAqIEByZXR1cm5zIHtTaGFsbG93V3JhcHBlcn1cbiAgICovXG4gIGF0KGluZGV4KSB7XG4gICAgY29uc3Qgbm9kZXMgPSB0aGlzLmdldE5vZGVzSW50ZXJuYWwoKTtcbiAgICBpZiAoaW5kZXggPCBub2Rlcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiB0aGlzLndyYXAobm9kZXNbaW5kZXhdKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMud3JhcChbXSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIHdyYXBwZXIgYXJvdW5kIHRoZSBmaXJzdCBub2RlIG9mIHRoZSBjdXJyZW50IHdyYXBwZXIuXG4gICAqXG4gICAqIEByZXR1cm5zIHtTaGFsbG93V3JhcHBlcn1cbiAgICovXG4gIGZpcnN0KCkge1xuICAgIHJldHVybiB0aGlzLmF0KDApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSB3cmFwcGVyIGFyb3VuZCB0aGUgbGFzdCBub2RlIG9mIHRoZSBjdXJyZW50IHdyYXBwZXIuXG4gICAqXG4gICAqIEByZXR1cm5zIHtTaGFsbG93V3JhcHBlcn1cbiAgICovXG4gIGxhc3QoKSB7XG4gICAgcmV0dXJuIHRoaXMuYXQodGhpcy5sZW5ndGggLSAxKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWxlZ2F0ZXMgdG8gZXhpc3RzKClcbiAgICpcbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuICBpc0VtcHR5KCkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgY29uc29sZS53YXJuKCdFbnp5bWU6OkRlcHJlY2F0ZWQgbWV0aG9kIGlzRW1wdHkoKSBjYWxsZWQsIHVzZSBleGlzdHMoKSBpbnN0ZWFkLicpO1xuICAgIHJldHVybiAhdGhpcy5leGlzdHMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIGN1cnJlbnQgd3JhcHBlciBoYXMgbm9kZXMuIEZhbHNlIG90aGVyd2lzZS5cbiAgICogSWYgY2FsbGVkIHdpdGggYSBzZWxlY3RvciBpdCByZXR1cm5zIGAuZmluZChzZWxlY3RvcikuZXhpc3RzKClgIGluc3RlYWQuXG4gICAqXG4gICAqIEBwYXJhbSB7RW56eW1lU2VsZWN0b3J9IHNlbGVjdG9yIChvcHRpb25hbClcbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuICBleGlzdHMoc2VsZWN0b3IgPSBudWxsKSB7XG4gICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPiAwID8gdGhpcy5maW5kKHNlbGVjdG9yKS5leGlzdHMoKSA6IHRoaXMubGVuZ3RoID4gMDtcbiAgfVxuXG4gIC8qKlxuICAgKiBVdGlsaXR5IG1ldGhvZCB0aGF0IHRocm93cyBhbiBlcnJvciBpZiB0aGUgY3VycmVudCBpbnN0YW5jZSBoYXMgYSBsZW5ndGggb3RoZXIgdGhhbiBvbmUuXG4gICAqIFRoaXMgaXMgcHJpbWFyaWx5IHVzZWQgdG8gZW5mb3JjZSB0aGF0IGNlcnRhaW4gbWV0aG9kcyBhcmUgb25seSBydW4gb24gYSB3cmFwcGVyIHdoZW4gaXQgaXNcbiAgICogd3JhcHBpbmcgYSBzaW5nbGUgbm9kZS5cbiAgICpcbiAgICogQHBhcmFtIGZuXG4gICAqIEByZXR1cm5zIHsqfVxuICAgKi9cbiAgc2luZ2xlKG5hbWUsIGZuKSB7XG4gICAgY29uc3QgZm5OYW1lID0gdHlwZW9mIG5hbWUgPT09ICdzdHJpbmcnID8gbmFtZSA6ICd1bmtub3duJztcbiAgICBjb25zdCBjYWxsYmFjayA9IHR5cGVvZiBmbiA9PT0gJ2Z1bmN0aW9uJyA/IGZuIDogbmFtZTtcbiAgICBpZiAodGhpcy5sZW5ndGggIT09IDEpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgTWV0aG9kIOKAnCR7Zm5OYW1lfeKAnSBpcyBtZWFudCB0byBiZSBydW4gb24gMSBub2RlLiAke3RoaXMubGVuZ3RofSBmb3VuZCBpbnN0ZWFkLmApO1xuICAgIH1cbiAgICByZXR1cm4gY2FsbGJhY2suY2FsbCh0aGlzLCB0aGlzLmdldE5vZGVJbnRlcm5hbCgpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIZWxwZnVsIHV0aWxpdHkgbWV0aG9kIHRvIGNyZWF0ZSBhIG5ldyB3cmFwcGVyIHdpdGggdGhlIHNhbWUgcm9vdCBhcyB0aGUgY3VycmVudCB3cmFwcGVyLCB3aXRoXG4gICAqIGFueSBub2RlcyBwYXNzZWQgaW4gYXMgdGhlIGZpcnN0IHBhcmFtZXRlciBhdXRvbWF0aWNhbGx5IHdyYXBwZWQuXG4gICAqXG4gICAqIEBwYXJhbSBub2RlXG4gICAqIEByZXR1cm5zIHtTaGFsbG93V3JhcHBlcn1cbiAgICovXG4gIHdyYXAobm9kZSwgcm9vdCA9IHRoaXNbUk9PVF0sIC4uLmFyZ3MpIHtcbiAgICBpZiAobm9kZSBpbnN0YW5jZW9mIFNoYWxsb3dXcmFwcGVyKSB7XG4gICAgICByZXR1cm4gbm9kZTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBTaGFsbG93V3JhcHBlcihub2RlLCByb290LCAuLi5hcmdzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFuIEhUTUwtbGlrZSBzdHJpbmcgb2YgdGhlIHNoYWxsb3cgcmVuZGVyIGZvciBkZWJ1Z2dpbmcgcHVycG9zZXMuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gLSBQcm9wZXJ0eSBiYWcgb2YgYWRkaXRpb25hbCBvcHRpb25zLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmlnbm9yZVByb3BzXSAtIGlmIHRydWUsIHByb3BzIGFyZSBvbWl0dGVkIGZyb20gdGhlIHN0cmluZy5cbiAgICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy52ZXJib3NlXSAtIGlmIHRydWUsIGFycmF5cyBhbmQgb2JqZWN0cyB0byBiZSB2ZXJib3NlbHkgcHJpbnRlZC5cbiAgICogQHJldHVybnMge1N0cmluZ31cbiAgICovXG4gIGRlYnVnKG9wdGlvbnMgPSB7fSkge1xuICAgIHJldHVybiBkZWJ1Z05vZGVzKHRoaXMuZ2V0Tm9kZXNJbnRlcm5hbCgpLCBvcHRpb25zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnZva2VzIGludGVyY2VwdGVyIGFuZCByZXR1cm5zIGl0c2VsZi4gaW50ZXJjZXB0ZXIgaXMgY2FsbGVkIHdpdGggaXRzZWxmLlxuICAgKiBUaGlzIGlzIGhlbHBmdWwgd2hlbiBkZWJ1Z2dpbmcgbm9kZXMgaW4gbWV0aG9kIGNoYWlucy5cbiAgICogQHBhcmFtIGZuXG4gICAqIEByZXR1cm5zIHtTaGFsbG93V3JhcHBlcn1cbiAgICovXG4gIHRhcChpbnRlcmNlcHRlcikge1xuICAgIGludGVyY2VwdGVyKHRoaXMpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFByaW1hcmlseSB1c2VmdWwgZm9yIEhPQ3MgKGhpZ2hlci1vcmRlciBjb21wb25lbnRzKSwgdGhpcyBtZXRob2QgbWF5IG9ubHkgYmVcbiAgICogcnVuIG9uIGEgc2luZ2xlLCBub24tRE9NIG5vZGUsIGFuZCB3aWxsIHJldHVybiB0aGUgbm9kZSwgc2hhbGxvdy1yZW5kZXJlZC5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICogQHJldHVybnMge1NoYWxsb3dXcmFwcGVyfVxuICAgKi9cbiAgZGl2ZShvcHRpb25zID0ge30pIHtcbiAgICBjb25zdCBhZGFwdGVyID0gZ2V0QWRhcHRlcih0aGlzW09QVElPTlNdKTtcbiAgICBjb25zdCBuYW1lID0gJ2RpdmUnO1xuICAgIHJldHVybiB0aGlzLnNpbmdsZShuYW1lLCAobikgPT4ge1xuICAgICAgaWYgKG4gJiYgbi5ub2RlVHlwZSA9PT0gJ2hvc3QnKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYFNoYWxsb3dXcmFwcGVyOjoke25hbWV9KCkgY2FuIG5vdCBiZSBjYWxsZWQgb24gSG9zdCBDb21wb25lbnRzYCk7XG4gICAgICB9XG4gICAgICBjb25zdCBlbCA9IGdldEFkYXB0ZXIodGhpc1tPUFRJT05TXSkubm9kZVRvRWxlbWVudChuKTtcbiAgICAgIGlmICghaXNDdXN0b21Db21wb25lbnRFbGVtZW50KGVsLCBhZGFwdGVyKSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBTaGFsbG93V3JhcHBlcjo6JHtuYW1lfSgpIGNhbiBvbmx5IGJlIGNhbGxlZCBvbiBjb21wb25lbnRzYCk7XG4gICAgICB9XG4gICAgICBjb25zdCBjaGlsZE9wdGlvbnMgPSBtYWtlSW5oZXJpdGVkQ2hpbGRPcHRpb25zKHRoaXMsIG9wdGlvbnMpO1xuICAgICAgcmV0dXJuIHRoaXMud3JhcChlbCwgbnVsbCwgY2hpbGRPcHRpb25zKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdHJpcHMgb3V0IGFsbCB0aGUgbm90IGhvc3Qtbm9kZXMgZnJvbSB0aGUgbGlzdCBvZiBub2Rlc1xuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBpcyB1c2VmdWwgaWYgeW91IHdhbnQgdG8gY2hlY2sgZm9yIHRoZSBwcmVzZW5jZSBvZiBob3N0IG5vZGVzXG4gICAqIChhY3R1YWxseSByZW5kZXJlZCBIVE1MIGVsZW1lbnRzKSBpZ25vcmluZyB0aGUgUmVhY3Qgbm9kZXMuXG4gICAqL1xuICBob3N0Tm9kZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuZmlsdGVyV2hlcmUoKG4pID0+IHR5cGVvZiBuLnR5cGUoKSA9PT0gJ3N0cmluZycpO1xuICB9XG59XG5cbi8qKlxuICogVXBkYXRlcyB0aGUgY29udGV4dCBvZiB0aGUgcHJpbWFyeSB3cmFwcGVyIHdoZW4gdGhlXG4gKiBgd3JhcHBpbmdDb21wb25lbnRgIHJlLXJlbmRlcnMuXG4gKi9cbmZ1bmN0aW9uIHVwZGF0ZVByaW1hcnlSb290Q29udGV4dCh3cmFwcGluZ0NvbXBvbmVudCkge1xuICBjb25zdCBhZGFwdGVyID0gZ2V0QWRhcHRlcih3cmFwcGluZ0NvbXBvbmVudFtPUFRJT05TXSk7XG4gIGNvbnN0IHByaW1hcnlXcmFwcGVyID0gd3JhcHBpbmdDb21wb25lbnRbUFJJTUFSWV9XUkFQUEVSXTtcbiAgY29uc3QgcHJpbWFyeVJlbmRlcmVyID0gcHJpbWFyeVdyYXBwZXJbUkVOREVSRVJdO1xuICBjb25zdCBwcmltYXJ5Tm9kZSA9IHByaW1hcnlSZW5kZXJlci5nZXROb2RlKCk7XG4gIGNvbnN0IHtcbiAgICBsZWdhY3lDb250ZXh0LFxuICAgIHByb3ZpZGVyVmFsdWVzLFxuICB9ID0gZ2V0Q29udGV4dEZyb21XcmFwcGluZ0NvbXBvbmVudCh3cmFwcGluZ0NvbXBvbmVudCwgYWRhcHRlcik7XG4gIGNvbnN0IHByZXZQcm92aWRlclZhbHVlcyA9IHByaW1hcnlXcmFwcGVyW1BST1ZJREVSX1ZBTFVFU107XG5cbiAgcHJpbWFyeVdyYXBwZXIuc2V0Q29udGV4dCh7XG4gICAgLi4ud3JhcHBpbmdDb21wb25lbnRbUFJJTUFSWV9XUkFQUEVSXVtPUFRJT05TXS5jb250ZXh0LFxuICAgIC4uLmxlZ2FjeUNvbnRleHQsXG4gIH0pO1xuICBwcmltYXJ5V3JhcHBlcltQUk9WSURFUl9WQUxVRVNdID0gbmV3IE1hcChbLi4ucHJldlByb3ZpZGVyVmFsdWVzLCAuLi5wcm92aWRlclZhbHVlc10pO1xuXG4gIGlmICh0eXBlb2YgYWRhcHRlci5pc0NvbnRleHRDb25zdW1lciA9PT0gJ2Z1bmN0aW9uJyAmJiBhZGFwdGVyLmlzQ29udGV4dENvbnN1bWVyKHByaW1hcnlOb2RlLnR5cGUpKSB7XG4gICAgY29uc3QgQ29uc3VtZXIgPSBwcmltYXJ5Tm9kZS50eXBlO1xuICAgIC8vIEFkYXB0ZXJzIHdpdGggYW4gYGlzQ29udGV4dENvbnN1bWVyYCBtZXRob2Qgd2lsbCBkZWZpbml0ZWx5IGhhdmUgYSBgZ2V0UHJvdmlkZXJGcm9tQ29uc3VtZXJgXG4gICAgLy8gbWV0aG9kLlxuICAgIGNvbnN0IFByb3ZpZGVyID0gYWRhcHRlci5nZXRQcm92aWRlckZyb21Db25zdW1lcihDb25zdW1lcik7XG4gICAgY29uc3QgbmV3VmFsdWUgPSBwcm92aWRlclZhbHVlcy5nZXQoUHJvdmlkZXIpO1xuICAgIGNvbnN0IG9sZFZhbHVlID0gcHJldlByb3ZpZGVyVmFsdWVzLmdldChQcm92aWRlcik7XG5cbiAgICAvLyBVc2UgcmVmZXJlbnRpYWwgY29tcGFyaXNvbiBsaWtlIFJlYWN0XG4gICAgaWYgKG5ld1ZhbHVlICE9PSBvbGRWYWx1ZSkge1xuICAgICAgcHJpbWFyeVdyYXBwZXIucmVyZW5kZXIoKTtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBBICpzcGVjaWFsKiBcInJvb3RcIiB3cmFwcGVyIHRoYXQgcmVwcmVzZW50cyB0aGUgY29tcG9uZW50IHBhc3NlZCBhcyBgd3JhcHBpbmdDb21wb25lbnRgLlxuICogSXQgaXMgbGlua2VkIHRvIHRoZSBwcmltYXJ5IHJvb3Qgc3VjaCB0aGF0IHVwZGF0ZXMgdG8gaXQgd2lsbCB1cGRhdGUgdGhlIHByaW1hcnkuXG4gKlxuICogQGNsYXNzIFdyYXBwaW5nQ29tcG9uZW50V3JhcHBlclxuICovXG5jbGFzcyBXcmFwcGluZ0NvbXBvbmVudFdyYXBwZXIgZXh0ZW5kcyBTaGFsbG93V3JhcHBlciB7XG4gIGNvbnN0cnVjdG9yKG5vZGVzLCByb290LCBSb290RmluZGVyKSB7XG4gICAgc3VwZXIobm9kZXMpO1xuICAgIHByaXZhdGVTZXQodGhpcywgUFJJTUFSWV9XUkFQUEVSLCByb290KTtcbiAgICBwcml2YXRlU2V0KHRoaXMsIFJPT1RfRklOREVSLCBSb290RmluZGVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMaWtlIHJlcmVuZGVyKCkgb24gU2hhbGxvd1dyYXBwZXIsIGV4Y2VwdCBpdCBhbHNvIGRvZXMgYSBcImZ1bGwgcmVuZGVyXCIgb2ZcbiAgICogaXRzZWxmIGFuZCB1cGRhdGVzIHRoZSBwcmltYXJ5IFNoYWxsb3dXcmFwcGVyJ3MgY29udGV4dC5cbiAgICovXG4gIHJlcmVuZGVyKC4uLmFyZ3MpIHtcbiAgICBjb25zdCByZXN1bHQgPSBzdXBlci5yZXJlbmRlciguLi5hcmdzKTtcbiAgICB1cGRhdGVQcmltYXJ5Um9vdENvbnRleHQodGhpcyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBMaWtlIHNldFN0YXRlKCkgb24gU2hhbGxvd1dyYXBwZXIsIGV4Y2VwdCBpdCBhbHNvIGRvZXMgYSBcImZ1bGwgcmVuZGVyXCIgb2ZcbiAgICogaXRzZWxmIGFuZCB1cGRhdGVzIHRoZSBwcmltYXJ5IFNoYWxsb3dXcmFwcGVyJ3MgY29udGV4dC5cbiAgICovXG4gIHNldFN0YXRlKC4uLmFyZ3MpIHtcbiAgICBjb25zdCByZXN1bHQgPSBzdXBlci5zZXRTdGF0ZSguLi5hcmdzKTtcbiAgICB1cGRhdGVQcmltYXJ5Um9vdENvbnRleHQodGhpcyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjbGFzcy1tZXRob2RzLXVzZS10aGlzXG4gIGdldFdyYXBwaW5nQ29tcG9uZW50KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignU2hhbGxvd1dyYXBwZXI6OmdldFdyYXBwaW5nQ29tcG9uZW50KCkgY2FuIG9ubHkgYmUgY2FsbGVkIG9uIHRoZSByb290Jyk7XG4gIH1cbn1cblxuaWYgKElURVJBVE9SX1NZTUJPTCkge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoU2hhbGxvd1dyYXBwZXIucHJvdG90eXBlLCBJVEVSQVRPUl9TWU1CT0wsIHtcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGl0ZXJhdG9yKCkge1xuICAgICAgY29uc3QgaXRlciA9IHRoaXMuZ2V0Tm9kZXNJbnRlcm5hbCgpW0lURVJBVE9SX1NZTUJPTF0oKTtcbiAgICAgIGNvbnN0IGFkYXB0ZXIgPSBnZXRBZGFwdGVyKHRoaXNbT1BUSU9OU10pO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgW0lURVJBVE9SX1NZTUJPTF0oKSB7IHJldHVybiB0aGlzOyB9LFxuICAgICAgICBuZXh0KCkge1xuICAgICAgICAgIGNvbnN0IG5leHQgPSBpdGVyLm5leHQoKTtcbiAgICAgICAgICBpZiAobmV4dC5kb25lKSB7XG4gICAgICAgICAgICByZXR1cm4geyBkb25lOiB0cnVlIH07XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBkb25lOiBmYWxzZSxcbiAgICAgICAgICAgIHZhbHVlOiBhZGFwdGVyLm5vZGVUb0VsZW1lbnQobmV4dC52YWx1ZSksXG4gICAgICAgICAgfTtcbiAgICAgICAgfSxcbiAgICAgIH07XG4gICAgfSxcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHByaXZhdGVXYXJuaW5nKHByb3AsIGV4dHJhTWVzc2FnZSkge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoU2hhbGxvd1dyYXBwZXIucHJvdG90eXBlLCBwcm9wLCB7XG4gICAgZ2V0KCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKHRyaW0oYFxuICAgICAgICBBdHRlbXB0ZWQgdG8gYWNjZXNzIFNoYWxsb3dXcmFwcGVyOjoke3Byb3B9LCB3aGljaCB3YXMgcHJldmlvdXNseSBhIHByaXZhdGUgcHJvcGVydHkgb25cbiAgICAgICAgRW56eW1lIFNoYWxsb3dXcmFwcGVyIGluc3RhbmNlcywgYnV0IGlzIG5vIGxvbmdlciBhbmQgc2hvdWxkIG5vdCBiZSByZWxpZWQgdXBvbi5cbiAgICAgICAgJHtleHRyYU1lc3NhZ2V9XG4gICAgICBgKSk7XG4gICAgfSxcbiAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICB9KTtcbn1cblxucHJpdmF0ZVdhcm5pbmcoJ25vZGUnLCAnQ29uc2lkZXIgdXNpbmcgdGhlIGdldEVsZW1lbnQoKSBtZXRob2QgaW5zdGVhZC4nKTtcbnByaXZhdGVXYXJuaW5nKCdub2RlcycsICdDb25zaWRlciB1c2luZyB0aGUgZ2V0RWxlbWVudHMoKSBtZXRob2QgaW5zdGVhZC4nKTtcbnByaXZhdGVXYXJuaW5nKCdyZW5kZXJlcicsICcnKTtcbnByaXZhdGVXYXJuaW5nKCdvcHRpb25zJywgJycpO1xucHJpdmF0ZVdhcm5pbmcoJ2NvbXBsZXhTZWxlY3RvcicsICcnKTtcblxuZXhwb3J0IGRlZmF1bHQgU2hhbGxvd1dyYXBwZXI7XG4iXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLElBQUFBLGVBQUEsR0FBQUMsc0JBQUEsQ0FBQUMsT0FBQTtBQUNBLElBQUFDLE9BQUEsR0FBQUYsc0JBQUEsQ0FBQUMsT0FBQTtBQUNBLElBQUFFLG1CQUFBLEdBQUFILHNCQUFBLENBQUFDLE9BQUE7QUFDQSxJQUFBRyxnQkFBQSxHQUFBSixzQkFBQSxDQUFBQyxPQUFBO0FBRUEsSUFBQUksTUFBQSxHQUFBSixPQUFBO0FBbUJBLElBQUFLLFdBQUEsR0FBQU4sc0JBQUEsQ0FBQUMsT0FBQTtBQUNBLElBQUFNLE1BQUEsR0FBQU4sT0FBQTtBQUNBLElBQUFPLGFBQUEsR0FBQVAsT0FBQTtBQVFBLElBQUFRLFVBQUEsR0FBQVIsT0FBQTtBQUFvRSxTQUFBRCx1QkFBQVUsQ0FBQSxXQUFBQSxDQUFBLElBQUFBLENBQUEsQ0FBQUMsVUFBQSxHQUFBRCxDQUFBLGdCQUFBQSxDQUFBO0FBQUEsU0FBQUUsV0FBQUMsQ0FBQSxFQUFBQyxDQUFBLEVBQUFKLENBQUEsV0FBQUksQ0FBQSxHQUFBQyxlQUFBLENBQUFELENBQUEsR0FBQUUsMEJBQUEsQ0FBQUgsQ0FBQSxFQUFBSSx5QkFBQSxLQUFBQyxPQUFBLENBQUFDLFNBQUEsQ0FBQUwsQ0FBQSxFQUFBSixDQUFBLFFBQUFLLGVBQUEsQ0FBQUYsQ0FBQSxFQUFBTyxXQUFBLElBQUFOLENBQUEsQ0FBQU8sS0FBQSxDQUFBUixDQUFBLEVBQUFILENBQUE7QUFBQSxTQUFBTSwyQkFBQUgsQ0FBQSxFQUFBSCxDQUFBLFFBQUFBLENBQUEsaUJBQUFZLE9BQUEsQ0FBQVosQ0FBQSwwQkFBQUEsQ0FBQSxVQUFBQSxDQUFBLGlCQUFBQSxDQUFBLFlBQUFhLFNBQUEscUVBQUFDLHNCQUFBLENBQUFYLENBQUE7QUFBQSxTQUFBVyx1QkFBQWQsQ0FBQSxtQkFBQUEsQ0FBQSxZQUFBZSxjQUFBLHNFQUFBZixDQUFBO0FBQUEsU0FBQWdCLGNBQUFiLENBQUEsRUFBQUMsQ0FBQSxFQUFBSixDQUFBLEVBQUFpQixDQUFBLFFBQUFDLENBQUEsR0FBQUMsSUFBQSxDQUFBZCxlQUFBLEtBQUFZLENBQUEsR0FBQWQsQ0FBQSxDQUFBaUIsU0FBQSxHQUFBakIsQ0FBQSxHQUFBQyxDQUFBLEVBQUFKLENBQUEsY0FBQWlCLENBQUEseUJBQUFDLENBQUEsYUFBQWYsQ0FBQSxXQUFBZSxDQUFBLENBQUFQLEtBQUEsQ0FBQVgsQ0FBQSxFQUFBRyxDQUFBLE9BQUFlLENBQUE7QUFBQSxTQUFBQyxLQUFBLFdBQUFBLElBQUEseUJBQUFYLE9BQUEsSUFBQUEsT0FBQSxDQUFBYSxHQUFBLEdBQUFiLE9BQUEsQ0FBQWEsR0FBQSxDQUFBQyxJQUFBLGVBQUF0QixDQUFBLEVBQUFHLENBQUEsRUFBQWMsQ0FBQSxRQUFBQyxDQUFBLEdBQUFLLGNBQUEsQ0FBQXZCLENBQUEsRUFBQUcsQ0FBQSxPQUFBZSxDQUFBLFFBQUFNLENBQUEsR0FBQUMsTUFBQSxDQUFBQyx3QkFBQSxDQUFBUixDQUFBLEVBQUFmLENBQUEsVUFBQXFCLENBQUEsQ0FBQUgsR0FBQSxHQUFBRyxDQUFBLENBQUFILEdBQUEsQ0FBQU0sSUFBQSxDQUFBQyxTQUFBLENBQUFDLE1BQUEsT0FBQTdCLENBQUEsR0FBQWlCLENBQUEsSUFBQU8sQ0FBQSxDQUFBTSxLQUFBLE9BQUFYLElBQUEsQ0FBQVIsS0FBQSxPQUFBaUIsU0FBQTtBQUFBLFNBQUFMLGVBQUFwQixDQUFBLEVBQUFDLENBQUEsZUFBQTJCLGNBQUEsQ0FBQUosSUFBQSxDQUFBeEIsQ0FBQSxFQUFBQyxDQUFBLGVBQUFELENBQUEsR0FBQUUsZUFBQSxDQUFBRixDQUFBLGFBQUFBLENBQUE7QUFBQSxTQUFBRSxnQkFBQUYsQ0FBQSxXQUFBRSxlQUFBLEdBQUFvQixNQUFBLENBQUFPLGNBQUEsR0FBQVAsTUFBQSxDQUFBUSxjQUFBLENBQUFYLElBQUEsZUFBQW5CLENBQUEsV0FBQUEsQ0FBQSxDQUFBK0IsU0FBQSxJQUFBVCxNQUFBLENBQUFRLGNBQUEsQ0FBQTlCLENBQUEsTUFBQUUsZUFBQSxDQUFBRixDQUFBO0FBQUEsU0FBQWdDLFVBQUFoQyxDQUFBLEVBQUFILENBQUEsNkJBQUFBLENBQUEsYUFBQUEsQ0FBQSxZQUFBYSxTQUFBLHdEQUFBVixDQUFBLENBQUFpQixTQUFBLEdBQUFLLE1BQUEsQ0FBQVcsTUFBQSxDQUFBcEMsQ0FBQSxJQUFBQSxDQUFBLENBQUFvQixTQUFBLElBQUFWLFdBQUEsSUFBQW9CLEtBQUEsRUFBQTNCLENBQUEsRUFBQWtDLFFBQUEsTUFBQUMsWUFBQSxXQUFBYixNQUFBLENBQUFjLGNBQUEsQ0FBQXBDLENBQUEsaUJBQUFrQyxRQUFBLFNBQUFyQyxDQUFBLElBQUF3QyxlQUFBLENBQUFyQyxDQUFBLEVBQUFILENBQUE7QUFBQSxTQUFBeUMsV0FBQXRDLENBQUEsRUFBQUgsQ0FBQSxFQUFBaUIsQ0FBQSxRQUFBVix5QkFBQSxXQUFBQyxPQUFBLENBQUFDLFNBQUEsQ0FBQUUsS0FBQSxPQUFBaUIsU0FBQSxPQUFBeEIsQ0FBQSxXQUFBQSxDQUFBLENBQUFzQyxJQUFBLENBQUEvQixLQUFBLENBQUFQLENBQUEsRUFBQUosQ0FBQSxPQUFBa0IsQ0FBQSxRQUFBZixDQUFBLENBQUFtQixJQUFBLENBQUFYLEtBQUEsQ0FBQVIsQ0FBQSxFQUFBQyxDQUFBLGFBQUFhLENBQUEsSUFBQXVCLGVBQUEsQ0FBQXRCLENBQUEsRUFBQUQsQ0FBQSxDQUFBRyxTQUFBLEdBQUFGLENBQUE7QUFBQSxTQUFBc0IsZ0JBQUFyQyxDQUFBLEVBQUFILENBQUEsV0FBQXdDLGVBQUEsR0FBQWYsTUFBQSxDQUFBTyxjQUFBLEdBQUFQLE1BQUEsQ0FBQU8sY0FBQSxDQUFBVixJQUFBLGVBQUFuQixDQUFBLEVBQUFILENBQUEsV0FBQUcsQ0FBQSxDQUFBK0IsU0FBQSxHQUFBbEMsQ0FBQSxFQUFBRyxDQUFBLEtBQUFxQyxlQUFBLENBQUFyQyxDQUFBLEVBQUFILENBQUE7QUFBQSxTQUFBTywwQkFBQSxjQUFBSixDQUFBLElBQUF3QyxPQUFBLENBQUF2QixTQUFBLENBQUF3QixPQUFBLENBQUFqQixJQUFBLENBQUFuQixPQUFBLENBQUFDLFNBQUEsQ0FBQWtDLE9BQUEsaUNBQUF4QyxDQUFBLGFBQUFJLHlCQUFBLFlBQUFBLDBCQUFBLGFBQUFKLENBQUE7QUFBQSxTQUFBMEMsbUJBQUE1QixDQUFBLFdBQUE2QixrQkFBQSxDQUFBN0IsQ0FBQSxLQUFBOEIsZ0JBQUEsQ0FBQTlCLENBQUEsS0FBQStCLDJCQUFBLENBQUEvQixDQUFBLEtBQUFnQyxrQkFBQTtBQUFBLFNBQUFBLG1CQUFBLGNBQUFwQyxTQUFBO0FBQUEsU0FBQW1DLDRCQUFBL0IsQ0FBQSxFQUFBaUMsQ0FBQSxRQUFBakMsQ0FBQSwyQkFBQUEsQ0FBQSxTQUFBa0MsaUJBQUEsQ0FBQWxDLENBQUEsRUFBQWlDLENBQUEsT0FBQS9DLENBQUEsTUFBQWlELFFBQUEsQ0FBQXpCLElBQUEsQ0FBQVYsQ0FBQSxFQUFBb0MsS0FBQSw2QkFBQWxELENBQUEsSUFBQWMsQ0FBQSxDQUFBUCxXQUFBLEtBQUFQLENBQUEsR0FBQWMsQ0FBQSxDQUFBUCxXQUFBLENBQUE0QyxJQUFBLGFBQUFuRCxDQUFBLGNBQUFBLENBQUEsR0FBQW9ELEtBQUEsQ0FBQUMsSUFBQSxDQUFBdkMsQ0FBQSxvQkFBQWQsQ0FBQSwrQ0FBQXNELElBQUEsQ0FBQXRELENBQUEsSUFBQWdELGlCQUFBLENBQUFsQyxDQUFBLEVBQUFpQyxDQUFBO0FBQUEsU0FBQUgsaUJBQUE5QixDQUFBLDhCQUFBeUMsTUFBQSxZQUFBekMsQ0FBQSxDQUFBeUMsTUFBQSxDQUFBQyxRQUFBLGFBQUExQyxDQUFBLHVCQUFBc0MsS0FBQSxDQUFBQyxJQUFBLENBQUF2QyxDQUFBO0FBQUEsU0FBQTZCLG1CQUFBN0IsQ0FBQSxRQUFBc0MsS0FBQSxDQUFBSyxPQUFBLENBQUEzQyxDQUFBLFVBQUFrQyxpQkFBQSxDQUFBbEMsQ0FBQTtBQUFBLFNBQUFrQyxrQkFBQWxDLENBQUEsRUFBQWlDLENBQUEsYUFBQUEsQ0FBQSxJQUFBQSxDQUFBLEdBQUFqQyxDQUFBLENBQUFZLE1BQUEsTUFBQXFCLENBQUEsR0FBQWpDLENBQUEsQ0FBQVksTUFBQSxZQUFBN0IsQ0FBQSxNQUFBd0IsQ0FBQSxHQUFBK0IsS0FBQSxDQUFBTCxDQUFBLEdBQUFsRCxDQUFBLEdBQUFrRCxDQUFBLEVBQUFsRCxDQUFBLElBQUF3QixDQUFBLENBQUF4QixDQUFBLElBQUFpQixDQUFBLENBQUFqQixDQUFBLFVBQUF3QixDQUFBO0FBQUEsU0FBQXFDLGdCQUFBWCxDQUFBLEVBQUExQixDQUFBLFVBQUEwQixDQUFBLFlBQUExQixDQUFBLGFBQUFYLFNBQUE7QUFBQSxTQUFBaUQsa0JBQUE5RCxDQUFBLEVBQUFpQixDQUFBLGFBQUFkLENBQUEsTUFBQUEsQ0FBQSxHQUFBYyxDQUFBLENBQUFZLE1BQUEsRUFBQTFCLENBQUEsVUFBQUMsQ0FBQSxHQUFBYSxDQUFBLENBQUFkLENBQUEsR0FBQUMsQ0FBQSxDQUFBMkQsVUFBQSxHQUFBM0QsQ0FBQSxDQUFBMkQsVUFBQSxRQUFBM0QsQ0FBQSxDQUFBa0MsWUFBQSxrQkFBQWxDLENBQUEsS0FBQUEsQ0FBQSxDQUFBaUMsUUFBQSxRQUFBWixNQUFBLENBQUFjLGNBQUEsQ0FBQXZDLENBQUEsRUFBQWdFLGNBQUEsQ0FBQTVELENBQUEsQ0FBQTZELEdBQUEsR0FBQTdELENBQUE7QUFBQSxTQUFBOEQsYUFBQWxFLENBQUEsRUFBQWlCLENBQUEsRUFBQWQsQ0FBQSxXQUFBYyxDQUFBLElBQUE2QyxpQkFBQSxDQUFBOUQsQ0FBQSxDQUFBb0IsU0FBQSxFQUFBSCxDQUFBLEdBQUFkLENBQUEsSUFBQTJELGlCQUFBLENBQUE5RCxDQUFBLEVBQUFHLENBQUEsR0FBQXNCLE1BQUEsQ0FBQWMsY0FBQSxDQUFBdkMsQ0FBQSxpQkFBQXFDLFFBQUEsU0FBQXJDLENBQUE7QUFBQSxTQUFBWSxRQUFBUixDQUFBLHNDQUFBUSxPQUFBLHdCQUFBOEMsTUFBQSx1QkFBQUEsTUFBQSxDQUFBQyxRQUFBLGFBQUF2RCxDQUFBLGtCQUFBQSxDQUFBLGdCQUFBQSxDQUFBLFdBQUFBLENBQUEseUJBQUFzRCxNQUFBLElBQUF0RCxDQUFBLENBQUFNLFdBQUEsS0FBQWdELE1BQUEsSUFBQXRELENBQUEsS0FBQXNELE1BQUEsQ0FBQXRDLFNBQUEscUJBQUFoQixDQUFBLEtBQUFRLE9BQUEsQ0FBQVIsQ0FBQTtBQUFBLFNBQUErRCxRQUFBbkUsQ0FBQSxFQUFBaUIsQ0FBQSxRQUFBZCxDQUFBLEdBQUFzQixNQUFBLENBQUEyQyxJQUFBLENBQUFwRSxDQUFBLE9BQUF5QixNQUFBLENBQUE0QyxxQkFBQSxRQUFBakUsQ0FBQSxHQUFBcUIsTUFBQSxDQUFBNEMscUJBQUEsQ0FBQXJFLENBQUEsR0FBQWlCLENBQUEsS0FBQWIsQ0FBQSxHQUFBQSxDQUFBLENBQUFrRSxNQUFBLFdBQUFyRCxDQUFBLFdBQUFRLE1BQUEsQ0FBQUMsd0JBQUEsQ0FBQTFCLENBQUEsRUFBQWlCLENBQUEsRUFBQThDLFVBQUEsT0FBQTVELENBQUEsQ0FBQXVDLElBQUEsQ0FBQS9CLEtBQUEsQ0FBQVIsQ0FBQSxFQUFBQyxDQUFBLFlBQUFELENBQUE7QUFBQSxTQUFBb0UsY0FBQXZFLENBQUEsYUFBQWlCLENBQUEsTUFBQUEsQ0FBQSxHQUFBVyxTQUFBLENBQUFDLE1BQUEsRUFBQVosQ0FBQSxVQUFBZCxDQUFBLFdBQUF5QixTQUFBLENBQUFYLENBQUEsSUFBQVcsU0FBQSxDQUFBWCxDQUFBLFFBQUFBLENBQUEsT0FBQWtELE9BQUEsQ0FBQTFDLE1BQUEsQ0FBQXRCLENBQUEsT0FBQXFFLE9BQUEsV0FBQXZELENBQUEsSUFBQXdELGVBQUEsQ0FBQXpFLENBQUEsRUFBQWlCLENBQUEsRUFBQWQsQ0FBQSxDQUFBYyxDQUFBLFNBQUFRLE1BQUEsQ0FBQWlELHlCQUFBLEdBQUFqRCxNQUFBLENBQUFrRCxnQkFBQSxDQUFBM0UsQ0FBQSxFQUFBeUIsTUFBQSxDQUFBaUQseUJBQUEsQ0FBQXZFLENBQUEsS0FBQWdFLE9BQUEsQ0FBQTFDLE1BQUEsQ0FBQXRCLENBQUEsR0FBQXFFLE9BQUEsV0FBQXZELENBQUEsSUFBQVEsTUFBQSxDQUFBYyxjQUFBLENBQUF2QyxDQUFBLEVBQUFpQixDQUFBLEVBQUFRLE1BQUEsQ0FBQUMsd0JBQUEsQ0FBQXZCLENBQUEsRUFBQWMsQ0FBQSxpQkFBQWpCLENBQUE7QUFBQSxTQUFBeUUsZ0JBQUF6RSxDQUFBLEVBQUFpQixDQUFBLEVBQUFkLENBQUEsWUFBQWMsQ0FBQSxHQUFBK0MsY0FBQSxDQUFBL0MsQ0FBQSxNQUFBakIsQ0FBQSxHQUFBeUIsTUFBQSxDQUFBYyxjQUFBLENBQUF2QyxDQUFBLEVBQUFpQixDQUFBLElBQUFhLEtBQUEsRUFBQTNCLENBQUEsRUFBQTRELFVBQUEsTUFBQXpCLFlBQUEsTUFBQUQsUUFBQSxVQUFBckMsQ0FBQSxDQUFBaUIsQ0FBQSxJQUFBZCxDQUFBLEVBQUFILENBQUE7QUFBQSxTQUFBZ0UsZUFBQTdELENBQUEsUUFBQXlFLENBQUEsR0FBQUMsWUFBQSxDQUFBMUUsQ0FBQSxnQ0FBQVMsT0FBQSxDQUFBZ0UsQ0FBQSxJQUFBQSxDQUFBLEdBQUFBLENBQUE7QUFBQSxTQUFBQyxhQUFBMUUsQ0FBQSxFQUFBYyxDQUFBLG9CQUFBTCxPQUFBLENBQUFULENBQUEsTUFBQUEsQ0FBQSxTQUFBQSxDQUFBLE1BQUFILENBQUEsR0FBQUcsQ0FBQSxDQUFBdUQsTUFBQSxDQUFBb0IsV0FBQSxrQkFBQTlFLENBQUEsUUFBQTRFLENBQUEsR0FBQTVFLENBQUEsQ0FBQTJCLElBQUEsQ0FBQXhCLENBQUEsRUFBQWMsQ0FBQSxnQ0FBQUwsT0FBQSxDQUFBZ0UsQ0FBQSxVQUFBQSxDQUFBLFlBQUEvRCxTQUFBLHlFQUFBSSxDQUFBLEdBQUE4RCxNQUFBLEdBQUFDLE1BQUEsRUFBQTdFLENBQUE7QUFFcEUsSUFBTThFLElBQUksR0FBRyxJQUFBQyxVQUFHLEVBQUMsVUFBVSxDQUFDO0FBQzVCLElBQU1DLEtBQUssR0FBRyxJQUFBRCxVQUFHLEVBQUMsV0FBVyxDQUFDO0FBQzlCLElBQU1FLFFBQVEsR0FBRyxJQUFBRixVQUFHLEVBQUMsY0FBYyxDQUFDO0FBQ3BDLElBQU1HLFVBQVUsR0FBRyxJQUFBSCxVQUFHLEVBQUMsZ0JBQWdCLENBQUM7QUFDeEMsSUFBTUksSUFBSSxHQUFHLElBQUFKLFVBQUcsRUFBQyxVQUFVLENBQUM7QUFDNUIsSUFBTUssT0FBTyxHQUFHLElBQUFMLFVBQUcsRUFBQyxhQUFhLENBQUM7QUFDbEMsSUFBTU0sU0FBUyxHQUFHLElBQUFOLFVBQUcsRUFBQyxjQUFjLENBQUM7QUFDckMsSUFBTU8sVUFBVSxHQUFHLElBQUFQLFVBQUcsRUFBQyxlQUFlLENBQUM7QUFDdkMsSUFBTVEsYUFBYSxHQUFHLElBQUFSLFVBQUcsRUFBQyxrQkFBa0IsQ0FBQztBQUM3QyxJQUFNUyxrQkFBa0IsR0FBRyxJQUFBVCxVQUFHLEVBQUMsdUJBQXVCLENBQUM7QUFDdkQsSUFBTVUsZUFBZSxHQUFHLElBQUFWLFVBQUcsRUFBQyxvQkFBb0IsQ0FBQztBQUNqRCxJQUFNVyxXQUFXLEdBQUcsSUFBQVgsVUFBRyxFQUFDLGdCQUFnQixDQUFDO0FBQ3pDLElBQU1ZLGVBQWUsR0FBRyxJQUFBWixVQUFHLEVBQUMsb0JBQW9CLENBQUM7O0FBRWpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVNhLGtCQUFrQkEsQ0FBQ0MsT0FBTyxFQUFFQyxTQUFTLEVBQXVCO0VBQUEsSUFBckIzQixNQUFNLEdBQUExQyxTQUFBLENBQUFDLE1BQUEsUUFBQUQsU0FBQSxRQUFBc0UsU0FBQSxHQUFBdEUsU0FBQSxNQUFHdUUsd0JBQVU7RUFDakUsT0FBT0gsT0FBTyxDQUFDSSxPQUFPLENBQUMsVUFBQzVFLENBQUM7SUFBQSxPQUFLOEMsTUFBTSxDQUFDOUMsQ0FBQyxDQUFDNkUsZUFBZSxDQUFDLENBQUMsRUFBRUosU0FBUyxDQUFDO0VBQUEsRUFBQztBQUN2RTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBU0ssb0JBQW9CQSxDQUFDTixPQUFPLEVBQUVDLFNBQVMsRUFBRTtFQUNoRCxPQUFPRCxPQUFPLENBQUNPLElBQUksQ0FBQ1AsT0FBTyxDQUFDUSxnQkFBZ0IsQ0FBQyxDQUFDLENBQUNsQyxNQUFNLENBQUMyQixTQUFTLENBQUMsQ0FBQzNCLE1BQU0sQ0FBQzNCLE9BQU8sQ0FBQyxDQUFDO0FBQ25GOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzhELGVBQWVBLENBQUNDLE9BQU8sRUFBRTtFQUNoQyxJQUNFQyxxQkFBcUIsR0FLbkJELE9BQU8sQ0FMVEMscUJBQXFCO0lBQ3JCQyx1QkFBdUIsR0FJckJGLE9BQU8sQ0FKVEUsdUJBQXVCO0lBQ3ZCQyxrQ0FBa0MsR0FHaENILE9BQU8sQ0FIVEcsa0NBQWtDO0lBQ2xDQyw4Q0FBOEMsR0FFNUNKLE9BQU8sQ0FGVEksOENBQThDO0lBQUFDLG1CQUFBLEdBRTVDTCxPQUFPLENBRFRNLFVBQVU7SUFBVkEsVUFBVSxHQUFBRCxtQkFBQSxjQUFHLENBQUMsQ0FBQyxHQUFBQSxtQkFBQTtFQUVqQixJQUFJLE9BQU9KLHFCQUFxQixLQUFLLFdBQVcsSUFBSSxPQUFPQSxxQkFBcUIsS0FBSyxTQUFTLEVBQUU7SUFDOUYsTUFBTSxJQUFJTSxLQUFLLENBQUMsZ0VBQWdFLENBQUM7RUFDbkY7RUFFQSxJQUFJLE9BQU9MLHVCQUF1QixLQUFLLFdBQVcsSUFBSSxPQUFPQSx1QkFBdUIsS0FBSyxTQUFTLEVBQUU7SUFDbEcsTUFBTSxJQUFJSyxLQUFLLENBQUMsa0VBQWtFLENBQUM7RUFDckY7RUFFQSxJQUNFTixxQkFBcUIsSUFBSSxJQUFJLElBQzFCQyx1QkFBdUIsSUFBSSxJQUFJLElBQy9CRCxxQkFBcUIsS0FBS0MsdUJBQXVCLEVBQ3BEO0lBQ0EsTUFBTSxJQUFJSyxLQUFLLENBQUMsbUZBQW1GLENBQUM7RUFDdEc7RUFFQSxJQUNFLE9BQU9KLGtDQUFrQyxLQUFLLFdBQVcsSUFDdERHLFVBQVUsQ0FBQ0Usa0JBQWtCLElBQzdCRixVQUFVLENBQUNFLGtCQUFrQixDQUFDQyxVQUFVLEtBQUtOLGtDQUFrQyxFQUNsRjtJQUNBLE1BQU0sSUFBSWhHLFNBQVMsQ0FBQyx5SkFBeUosQ0FBQztFQUNoTDtFQUVBLElBQ0UsT0FBT2lHLDhDQUE4QyxLQUFLLFdBQVcsSUFDbEVFLFVBQVUsQ0FBQ0Usa0JBQWtCLElBQzdCRixVQUFVLENBQUNFLGtCQUFrQixDQUFDRSxXQUFXLEtBQUtOLDhDQUE4QyxFQUMvRjtJQUNBLE1BQU0sSUFBSWpHLFNBQVMsQ0FBQyxzS0FBc0ssQ0FBQztFQUM3TDtBQUNGO0FBRUEsU0FBU3dHLG9CQUFvQkEsQ0FBQUMsSUFBQSxFQUFjO0VBQUEsSUFBWFosT0FBTyxHQUFBWSxJQUFBLENBQVBaLE9BQU87RUFDckMsSUFBQWEsb0JBQUEsR0FJSWIsT0FBTyxDQUhUTSxVQUFVO0lBQVZBLFVBQVUsR0FBQU8sb0JBQUEsY0FBRyxDQUFDLENBQUMsR0FBQUEsb0JBQUE7SUFDZlYsa0NBQWtDLEdBRWhDSCxPQUFPLENBRlRHLGtDQUFrQztJQUNsQ0MsOENBQThDLEdBQzVDSixPQUFPLENBRFRJLDhDQUE4QztFQUdoRCxJQUFNVSxvQkFBb0IsR0FBRyxPQUFPWCxrQ0FBa0MsS0FBSyxXQUFXO0VBQ3RGLElBQU1ZLHVCQUF1QixHQUFHLE9BQU9YLDhDQUE4QyxLQUFLLFdBQVc7RUFDckcsSUFBTUksa0JBQWtCLEdBQUdNLG9CQUFvQixJQUFJQyx1QkFBdUIsR0FBQWxELGFBQUEsQ0FBQUEsYUFBQSxLQUVsRWlELG9CQUFvQixJQUFJO0lBQzFCTCxVQUFVLEVBQUUsQ0FBQyxDQUFDTjtFQUNoQixDQUFDLEdBQ0dZLHVCQUF1QixJQUFJO0lBQzdCTCxXQUFXLEVBQUUsQ0FBQyxDQUFDTjtFQUNqQixDQUFDLElBRUQsSUFBSTtFQUNSLElBQWtDWSxhQUFhLEdBQUtWLFVBQVUsQ0FBdERXLHdCQUF3QjtFQUNoQyxJQUFNQSx3QkFBd0IsR0FBR0QsYUFBYSxHQUFHO0lBQy9DRSwyQkFBMkIsRUFBRSxDQUFDLENBQUNGLGFBQWEsQ0FBQ0U7RUFDL0MsQ0FBQyxHQUFHLEtBQUs7RUFFVCxPQUFBckQsYUFBQSxDQUFBQSxhQUFBLENBQUFBLGFBQUEsS0FDS3lDLFVBQVU7SUFDYmEsUUFBUSxFQUFBdEQsYUFBQSxLQUNIeUMsVUFBVSxDQUFDYSxRQUFRLENBQ3ZCO0lBQ0RDLGVBQWUsRUFBQXZELGFBQUE7TUFDYndELGdCQUFnQixFQUFFO0lBQUksR0FDbkJmLFVBQVUsQ0FBQ2MsZUFBZTtFQUM5QixHQUNHWixrQkFBa0IsSUFBSTtJQUFFQSxrQkFBa0IsRUFBbEJBO0VBQW1CLENBQUM7SUFDaERTLHdCQUF3QixFQUF4QkE7RUFBd0I7QUFFNUI7QUFFQSxTQUFTSyxXQUFXQSxDQUFDQyxJQUFJLEVBQUU7RUFDekIsSUFBSUEsSUFBSSxDQUFDQyxRQUFRLEtBQUssTUFBTSxFQUFFO0lBQzVCLE9BQU9ELElBQUk7RUFDYjtFQUNBLE9BQU9BLElBQUksQ0FBQ0UsUUFBUTtBQUN0QjtBQUVBLFNBQVNDLG1CQUFtQkEsQ0FBQ3BDLE9BQU8sRUFBRTtFQUNwQyxJQUFJQSxPQUFPLENBQUNWLElBQUksQ0FBQyxDQUFDekQsTUFBTSxLQUFLLENBQUMsRUFBRTtJQUM5QixNQUFNLElBQUlvRixLQUFLLENBQUMsNkVBQTZFLENBQUM7RUFDaEc7RUFDQSxJQUFJakIsT0FBTyxDQUFDVixJQUFJLENBQUMsS0FBS1UsT0FBTyxFQUFFO0lBQzdCLE9BQU9BLE9BQU8sQ0FBQ1AsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQy9CO0VBQ0EsT0FBT08sT0FBTyxDQUFDVixJQUFJLENBQUMsQ0FBQ0wsSUFBSSxDQUFDO0FBQzVCO0FBRUEsU0FBU29ELFdBQVdBLENBQUNyQyxPQUFPLEVBQUVpQyxJQUFJLEVBQUU7RUFDbEMsT0FBTyxJQUFBSywyQkFBYSxFQUFDTCxJQUFJLEVBQUVHLG1CQUFtQixDQUFDcEMsT0FBTyxDQUFDLENBQUM7QUFDMUQ7QUFFQSxTQUFTdUMsZUFBZUEsQ0FBQ3ZDLE9BQU8sRUFBRXdDLEtBQUssRUFBRTtFQUN2QyxJQUFJLENBQUNqRixLQUFLLENBQUNLLE9BQU8sQ0FBQzRFLEtBQUssQ0FBQyxFQUFFO0lBQ3pCLElBQUFDLGlCQUFVLEVBQUN6QyxPQUFPLEVBQUVmLElBQUksRUFBRXVELEtBQUssQ0FBQztJQUNoQyxJQUFBQyxpQkFBVSxFQUFDekMsT0FBTyxFQUFFYixLQUFLLEVBQUUsQ0FBQ3FELEtBQUssQ0FBQyxDQUFDO0VBQ3JDLENBQUMsTUFBTTtJQUNMLElBQUFDLGlCQUFVLEVBQUN6QyxPQUFPLEVBQUVmLElBQUksRUFBRXVELEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNuQyxJQUFBQyxpQkFBVSxFQUFDekMsT0FBTyxFQUFFYixLQUFLLEVBQUVxRCxLQUFLLENBQUM7RUFDbkM7RUFDQSxJQUFBQyxpQkFBVSxFQUFDekMsT0FBTyxFQUFFLFFBQVEsRUFBRUEsT0FBTyxDQUFDYixLQUFLLENBQUMsQ0FBQ3RELE1BQU0sQ0FBQztBQUN0RDtBQUVBLFNBQVM2RyxrQ0FBa0NBLENBQUNDLFNBQVMsRUFBRUMsS0FBSyxFQUFFQyxTQUFTLEVBQUVDLEtBQUssRUFBRTtFQUM5RSxPQUFPLENBQUMsSUFBQUMsOEJBQVksRUFBQ0osU0FBUyxFQUFFQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUFHLDhCQUFZLEVBQUNGLFNBQVMsRUFBRUMsS0FBSyxDQUFDO0FBQzNFO0FBRUEsU0FBU0UsZUFBZUEsQ0FBQ0MsUUFBUSxFQUFFO0VBQ2pDLE9BQU9BLFFBQVEsSUFBSUEsUUFBUSxDQUFDQyxvQkFBb0I7QUFDbEQ7QUFFQSxTQUFTcEIsZUFBZUEsQ0FBQ0csSUFBSSxFQUFFa0IsU0FBUyxFQUFFQyxRQUFRLEVBQUU7RUFDbEQsSUFBUUgsUUFBUSxHQUFzQmhCLElBQUksQ0FBbENnQixRQUFRO0lBQVFJLFNBQVMsR0FBS3BCLElBQUksQ0FBeEJxQixJQUFJO0VBQ3RCLElBQU1DLGFBQWEsR0FBRyxJQUFBQyx3QkFBaUIsRUFBQ3ZCLElBQUksQ0FBQztFQUM3QztFQUNBO0VBQ0EsSUFBSXJILE9BQUEsQ0FBT3lJLFNBQVMsQ0FBQ0ksaUJBQWlCLE1BQUssUUFBUSxFQUFFO0lBQ25EO0lBQ0FDLE9BQU8sQ0FBQ0MsSUFBSSxJQUFBQyxNQUFBLENBQ1BMLGFBQWEsNkZBQ2xCLENBQUM7SUFDRCxPQUFPLENBQUMsQ0FBQztFQUNYO0VBQ0E7RUFDQTtFQUNBLElBQU1NLFlBQVksR0FBR1osUUFBUSxDQUFDbkIsZUFBZSxDQUFDLENBQUM7RUFDL0NyRyxNQUFNLENBQUMyQyxJQUFJLENBQUN5RixZQUFZLENBQUMsQ0FBQ3JGLE9BQU8sQ0FBQyxVQUFDUCxHQUFHLEVBQUs7SUFDekMsSUFBSSxFQUFFQSxHQUFHLElBQUlvRixTQUFTLENBQUNJLGlCQUFpQixDQUFDLEVBQUU7TUFDekMsTUFBTSxJQUFJeEMsS0FBSyxJQUFBMkMsTUFBQSxDQUNWTCxhQUFhLGdDQUFBSyxNQUFBLENBQTRCM0YsR0FBRyw0Q0FDakQsQ0FBQztJQUNIO0VBQ0YsQ0FBQyxDQUFDO0VBQ0YsSUFBSSxPQUFPbUYsUUFBUSxDQUFDVSxjQUFjLEtBQUssVUFBVSxFQUFFO0lBQ2pEVixRQUFRLENBQUNVLGNBQWMsQ0FBQ1QsU0FBUyxDQUFDSSxpQkFBaUIsRUFBRUksWUFBWSxFQUFFLGVBQWUsRUFBRVYsU0FBUyxDQUFDO0VBQ2hHO0VBQ0EsT0FBT1UsWUFBWTtBQUNyQjtBQUVBLFNBQVNFLGlDQUFpQ0EsQ0FBQ3ZCLEtBQUssRUFBRXdCLE9BQU8sRUFBRTtFQUN6RCxJQUNFLENBQUMsSUFBQUMsK0JBQXdCLEVBQUN6QixLQUFLLEVBQUV3QixPQUFPLENBQUMsSUFDdEMsQ0FBQ3hCLEtBQUssQ0FBQ2MsSUFBSSxDQUFDbEksU0FBUyxJQUNyQixPQUFPb0gsS0FBSyxDQUFDYyxJQUFJLENBQUNsSSxTQUFTLENBQUMwRyxlQUFlLEtBQUssVUFBVSxFQUM3RDtJQUNBLE9BQU8sSUFBSTtFQUNiO0VBRUEsT0FBTyxJQUFBb0MsZ0JBQVMsRUFBQzFCLEtBQUssQ0FBQ2MsSUFBSSxDQUFDbEksU0FBUyxFQUFFLGlCQUFpQixDQUFDO0FBQzNEO0FBRUEsU0FBUytJLHNCQUFzQkEsQ0FBQ0gsT0FBTyxFQUFFaEUsT0FBTyxFQUFFaUQsUUFBUSxFQUFFbUIsWUFBWSxFQUFFQyxrQkFBa0IsRUFBRTtFQUM1RixJQUFNakIsUUFBUSxHQUFHcEQsT0FBTyxDQUFDWixRQUFRLENBQUM7RUFDbEM7RUFDQSxJQUFJNEUsT0FBTyxDQUFDdEQsT0FBTyxDQUFDNEQsaUJBQWlCLEtBQUssUUFBUSxFQUFFO0lBQUU7RUFBUTtFQUM5RCxJQUFJRCxrQkFBa0IsRUFBRTtJQUN0QixJQUFBNUIsaUJBQVUsRUFBQ3pDLE9BQU8sRUFBRU4sYUFBYSxFQUFFMkUsa0JBQWtCLENBQUNFLGtCQUFrQixDQUFDLENBQUMsQ0FBQztJQUMzRUYsa0JBQWtCLENBQUNHLE9BQU8sQ0FBQyxDQUFDO0VBQzlCLENBQUMsTUFBTSxJQUFJLE9BQU92QixRQUFRLENBQUNuQixlQUFlLEtBQUssVUFBVSxFQUFFO0lBQ3pEO0lBQ0E7SUFDQSxJQUFNMkMsYUFBYSxHQUFHLENBQUN6RSxPQUFPLENBQUNmLElBQUksQ0FBQyxDQUFDLENBQUMyRSxNQUFNLENBQUN2QixXQUFXLENBQUNyQyxPQUFPLEVBQUVBLE9BQU8sQ0FBQ2YsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUNqRixJQUFNNEUsWUFBWSxHQUFHL0IsZUFBZSxDQUFDc0MsWUFBWSxFQUFFSyxhQUFhLEVBQUVyQixRQUFRLENBQUM7SUFDM0UsSUFBQVgsaUJBQVUsRUFBQ3pDLE9BQU8sRUFBRU4sYUFBYSxFQUFFbUUsWUFBWSxDQUFDO0VBQ2xELENBQUMsTUFBTTtJQUNMLElBQUFwQixpQkFBVSxFQUFDekMsT0FBTyxFQUFFTixhQUFhLEVBQUUsSUFBSSxDQUFDO0VBQzFDO0FBQ0Y7QUFFQSxTQUFTZ0YsMkJBQTJCQSxDQUFDekMsSUFBSSxFQUFFYSxLQUFLLEVBQUU7RUFDaEQsSUFBUW5CLHdCQUF3QixHQUFLTSxJQUFJLENBQUNxQixJQUFJLENBQXRDM0Isd0JBQXdCO0VBRWhDLElBQUksT0FBT0Esd0JBQXdCLEtBQUssVUFBVSxFQUFFO0lBQ2xEO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQSxJQUFRc0IsUUFBUSxHQUFLaEIsSUFBSSxDQUFqQmdCLFFBQVE7SUFDaEIsSUFBQTBCLFVBQUEsR0FBb0IsSUFBQVQsZ0JBQVMsRUFDM0JqQixRQUFRLEVBQ1IsdUJBQXVCLEVBQ3ZCLFVBQUMyQixXQUFXO1FBQUEsT0FBSyxTQUFTQyxxQkFBcUJBLENBQUEsRUFBVTtVQUN2RDVCLFFBQVEsQ0FBQ0gsS0FBSyxHQUFHQSxLQUFLO1VBQUMsU0FBQWdDLElBQUEsR0FBQWxKLFNBQUEsQ0FBQUMsTUFBQSxFQUQwQmtKLElBQUksT0FBQXhILEtBQUEsQ0FBQXVILElBQUEsR0FBQUUsSUFBQSxNQUFBQSxJQUFBLEdBQUFGLElBQUEsRUFBQUUsSUFBQTtZQUFKRCxJQUFJLENBQUFDLElBQUEsSUFBQXBKLFNBQUEsQ0FBQW9KLElBQUE7VUFBQTtVQUVyRCxJQUFNQyxTQUFTLEdBQUdMLFdBQVcsQ0FBQ2pLLEtBQUssQ0FBQ3NJLFFBQVEsRUFBRThCLElBQUksQ0FBQztVQUNuRCxJQUFTRyxTQUFTLEdBQUlILElBQUk7VUFDMUI5QixRQUFRLENBQUNILEtBQUssR0FBR29DLFNBQVM7VUFDMUJWLE9BQU8sQ0FBQyxDQUFDO1VBQ1QsT0FBT1MsU0FBUztRQUNsQixDQUFDO01BQUEsQ0FDSCxDQUFDO01BWE9ULE9BQU8sR0FBQUcsVUFBQSxDQUFQSCxPQUFPO0VBWWpCO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTVyxVQUFVQSxDQUFDbkYsT0FBTyxFQUFFb0YsTUFBTSxFQUFFcEIsT0FBTyxFQUFFO0VBQzVDLElBQU0vQixJQUFJLEdBQUdqQyxPQUFPLENBQUNmLElBQUksQ0FBQztFQUMxQixJQUFNb0csT0FBTyxHQUFHcEQsSUFBSSxJQUFJK0IsT0FBTyxDQUFDc0IsYUFBYSxDQUFDckQsSUFBSSxDQUFDO0VBQ25ELElBQUlqQyxPQUFPLENBQUNzRCxJQUFJLENBQUMsQ0FBQyxLQUFLOEIsTUFBTSxFQUFFO0lBQzdCLE9BQU9wRixPQUFPLENBQUN1RixJQUFJLENBQUMsQ0FBQztFQUN2QjtFQUNBLElBQUlGLE9BQU8sSUFBSSxJQUFBcEIsK0JBQXdCLEVBQUNvQixPQUFPLEVBQUVyQixPQUFPLENBQUMsRUFBRTtJQUN6RCxPQUFPbUIsVUFBVSxDQUFDbkYsT0FBTyxDQUFDdUYsSUFBSSxDQUFDLENBQUMsRUFBRUgsTUFBTSxFQUFFcEIsT0FBTyxDQUFDO0VBQ3BEO0VBQ0EsSUFBTXdCLFFBQVEsR0FBR3hGLE9BQU8sQ0FBQ3dGLFFBQVEsQ0FBQyxDQUFDO0VBQ25DLEtBQUssSUFBSTVHLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBRzRHLFFBQVEsQ0FBQzNKLE1BQU0sRUFBRStDLENBQUMsSUFBSSxDQUFDLEVBQUU7SUFDM0MsSUFBTTZHLEtBQUssR0FBR04sVUFBVSxDQUFDSyxRQUFRLENBQUNFLEVBQUUsQ0FBQzlHLENBQUMsQ0FBQyxFQUFFd0csTUFBTSxFQUFFcEIsT0FBTyxDQUFDO0lBQ3pELElBQUksT0FBT3lCLEtBQUssS0FBSyxXQUFXLEVBQUU7TUFDaEMsT0FBT0EsS0FBSztJQUNkO0VBQ0Y7RUFDQSxPQUFPdkYsU0FBUztBQUNsQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVN5RiwrQkFBK0JBLENBQUMzRixPQUFPLEVBQUVnRSxPQUFPLEVBQUU7RUFDekQsSUFBTTRCLFVBQVUsR0FBR1QsVUFBVSxDQUFDbkYsT0FBTyxFQUFFQSxPQUFPLENBQUNILFdBQVcsQ0FBQyxFQUFFbUUsT0FBTyxDQUFDO0VBQ3JFLElBQUksQ0FBQzRCLFVBQVUsRUFBRTtJQUNmLE1BQU0sSUFBSTNFLEtBQUssQ0FBQywrQ0FBK0MsQ0FBQztFQUNsRTtFQUNBLE9BQU87SUFDTDRFLGFBQWEsRUFBRUQsVUFBVSxDQUFDckcsT0FBTyxDQUFDLENBQUN1RyxPQUFPO0lBQzFDQyxjQUFjLEVBQUVILFVBQVUsQ0FBQzlGLGVBQWU7RUFDNUMsQ0FBQztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVNrRyxrQkFBa0JBLENBQUN4RCxLQUFLLEVBQUV5RCxJQUFJLEVBQUVDLGFBQWEsRUFBRWxHLE9BQU8sRUFBRTtFQUMvRCxJQUFNVSxPQUFPLEdBQUcsSUFBQXlGLGtCQUFXLEVBQUNELGFBQWEsQ0FBQztFQUMxQyxJQUFNbEMsT0FBTyxHQUFHLElBQUFvQyxzQkFBVSxFQUFDRixhQUFhLENBQUM7RUFDekMsSUFBQXpELGlCQUFVLEVBQUMvQixPQUFPLEVBQUVaLGVBQWUsRUFBRW9HLGFBQWEsQ0FBQ3BHLGVBQWUsQ0FBQyxDQUFDO0VBQ3BFLElBQUltRyxJQUFJLElBQUksQ0FBQyxJQUFBSSx3QkFBaUIsRUFBQzNGLE9BQU8sQ0FBQzRGLGlCQUFpQixFQUFFdEMsT0FBTyxDQUFDLEVBQUU7SUFDbEUsT0FBT3RELE9BQU87RUFDaEI7RUFDQSxJQUFJLE9BQU9zRCxPQUFPLENBQUN1Qyx5QkFBeUIsS0FBSyxVQUFVLEVBQUU7SUFDM0QsTUFBTSxJQUFJMUwsU0FBUyxDQUFDLHNFQUFzRSxDQUFDO0VBQzdGO0VBQ0EsSUFBQTJMLHFCQUFBLEdBQTBDeEMsT0FBTyxDQUFDdUMseUJBQXlCLENBQUMvRCxLQUFLLEVBQUU5QixPQUFPLENBQUM7SUFBN0UrRixXQUFXLEdBQUFELHFCQUFBLENBQWpCdkUsSUFBSTtJQUFleUUsVUFBVSxHQUFBRixxQkFBQSxDQUFWRSxVQUFVO0VBQ3JDO0VBQ0EsSUFBTUosaUJBQWlCLEdBQUcsSUFBSUssd0JBQXdCLENBQUNGLFdBQVcsRUFBRXpHLE9BQU8sRUFBRTBHLFVBQVUsQ0FBQztFQUN4RixJQUFBRSxxQkFBQSxHQUdJakIsK0JBQStCLENBQUNXLGlCQUFpQixFQUFFdEMsT0FBTyxDQUFDO0lBRjlDNkMsOEJBQThCLEdBQUFELHFCQUFBLENBQTdDZixhQUFhO0lBQ0dpQiwrQkFBK0IsR0FBQUYscUJBQUEsQ0FBL0NiLGNBQWM7RUFFaEIsSUFBQXRELGlCQUFVLEVBQUN6QyxPQUFPLEVBQUVMLGtCQUFrQixFQUFFMkcsaUJBQWlCLENBQUM7RUFDMUQsT0FBQS9ILGFBQUEsQ0FBQUEsYUFBQSxLQUNLbUMsT0FBTyxPQUFBakMsZUFBQTtJQUNWcUgsT0FBTyxFQUFBdkgsYUFBQSxDQUFBQSxhQUFBLEtBQ0ZtQyxPQUFPLENBQUNvRixPQUFPLEdBQ2ZlLDhCQUE4QjtFQUNsQyxHQUNBL0csZUFBZSxFQUFHZ0gsK0JBQStCO0FBRXREO0FBRUEsU0FBU0MseUJBQXlCQSxDQUFDL0csT0FBTyxFQUFnQjtFQUFBLElBQWRVLE9BQU8sR0FBQTlFLFNBQUEsQ0FBQUMsTUFBQSxRQUFBRCxTQUFBLFFBQUFzRSxTQUFBLEdBQUF0RSxTQUFBLE1BQUcsQ0FBQyxDQUFDO0VBQ3RELElBQU1vTCxZQUFZLEdBQUF6SSxhQUFBLENBQUFBLGFBQUEsQ0FBQUEsYUFBQSxLQUNieUIsT0FBTyxDQUFDVCxPQUFPLENBQUMsR0FDaEJtQixPQUFPO0lBQ1ZvRixPQUFPLEVBQUVwRixPQUFPLENBQUNvRixPQUFPLElBQUF2SCxhQUFBLENBQUFBLGFBQUEsS0FDbkJ5QixPQUFPLENBQUNULE9BQU8sQ0FBQyxDQUFDdUcsT0FBTyxHQUN4QjlGLE9BQU8sQ0FBQ1YsSUFBSSxDQUFDLENBQUNJLGFBQWEsQ0FBQztFQUNoQyxFQUNGO0VBQ0QsSUFBQStDLGlCQUFVLEVBQUN1RSxZQUFZLEVBQUVsSCxlQUFlLEVBQUVFLE9BQU8sQ0FBQ1YsSUFBSSxDQUFDLENBQUNRLGVBQWUsQ0FBQyxDQUFDO0VBQ3pFLE9BQU9rSCxZQUFZO0FBQ3JCOztBQUVBO0FBQ0E7QUFDQTtBQUZBLElBR01DLGNBQWM7RUFDbEIsU0FBQUEsZUFBWXpFLEtBQUssRUFBRXlELElBQUksRUFBc0I7SUFBQSxJQUFBaUIsS0FBQTtJQUFBLElBQXBCaEIsYUFBYSxHQUFBdEssU0FBQSxDQUFBQyxNQUFBLFFBQUFELFNBQUEsUUFBQXNFLFNBQUEsR0FBQXRFLFNBQUEsTUFBRyxDQUFDLENBQUM7SUFBQWlDLGVBQUEsT0FBQW9KLGNBQUE7SUFDekN4RyxlQUFlLENBQUN5RixhQUFhLENBQUM7SUFFOUIsSUFBTXhGLE9BQU8sR0FBR3NGLGtCQUFrQixDQUFDeEQsS0FBSyxFQUFFeUQsSUFBSSxFQUFFQyxhQUFhLEVBQUUsSUFBSSxDQUFDO0lBQ3BFLElBQU1sQyxPQUFPLEdBQUcsSUFBQW9DLHNCQUFVLEVBQUMxRixPQUFPLENBQUM7SUFDbkMsSUFBTU0sVUFBVSxHQUFHSyxvQkFBb0IsQ0FBQzJDLE9BQU8sQ0FBQzs7SUFFaEQ7SUFDQSxJQUFJLENBQUNpQyxJQUFJLEVBQUU7TUFDVCxJQUFJLENBQUNqQyxPQUFPLENBQUNtRCxjQUFjLENBQUMzRSxLQUFLLENBQUMsRUFBRTtRQUNsQyxNQUFNLElBQUkzSCxTQUFTLENBQUMsNkNBQTZDLENBQUM7TUFDcEU7TUFFQSxJQUFNd0osa0JBQWtCLEdBQUdyRCxVQUFVLENBQUNjLGVBQWUsQ0FBQ0MsZ0JBQWdCLEdBQ2xFZ0MsaUNBQWlDLENBQUN2QixLQUFLLEVBQUV3QixPQUFPLENBQUMsR0FDakQsSUFBSTtNQUNSLElBQUF2QixpQkFBVSxFQUFDLElBQUksRUFBRW5ELElBQUksRUFBRSxJQUFJLENBQUM7TUFDNUIsSUFBQW1ELGlCQUFVLEVBQUMsSUFBSSxFQUFFcEQsVUFBVSxFQUFFbUQsS0FBSyxDQUFDO01BQ25DLElBQU1ZLFFBQVEsR0FBR1ksT0FBTyxDQUFDb0QsY0FBYyxDQUFBN0ksYUFBQTtRQUFHOEksSUFBSSxFQUFFO01BQVMsR0FBSzNHLE9BQU8sQ0FBRSxDQUFDO01BQ3hFLElBQUErQixpQkFBVSxFQUFDLElBQUksRUFBRXJELFFBQVEsRUFBRWdFLFFBQVEsQ0FBQztNQUNwQyxJQUFNMkMsY0FBYyxHQUFHLElBQUl1QixHQUFHLENBQUM1RyxPQUFPLENBQUNaLGVBQWUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztNQUM5RCxJQUFJLENBQUNWLFFBQVEsQ0FBQyxDQUFDbUksTUFBTSxDQUFDL0UsS0FBSyxFQUFFOUIsT0FBTyxDQUFDb0YsT0FBTyxFQUFFO1FBQUVDLGNBQWMsRUFBZEE7TUFBZSxDQUFDLENBQUM7TUFDakUsSUFBTTNCLFlBQVksR0FBRyxJQUFJLENBQUNoRixRQUFRLENBQUMsQ0FBQ29JLE9BQU8sQ0FBQyxDQUFDO01BQzdDakYsZUFBZSxDQUFDLElBQUksRUFBRVAsV0FBVyxDQUFDb0MsWUFBWSxDQUFDLENBQUM7TUFDaEQsSUFBQTNCLGlCQUFVLEVBQUMsSUFBSSxFQUFFbEQsT0FBTyxFQUFFbUIsT0FBTyxDQUFDO01BQ2xDLElBQUErQixpQkFBVSxFQUFDLElBQUksRUFBRTNDLGVBQWUsRUFBRWlHLGNBQWMsQ0FBQztNQUVqRCxJQUFROUMsUUFBUSxHQUFLbUIsWUFBWSxDQUF6Qm5CLFFBQVE7TUFDaEIsSUFBSUEsUUFBUSxJQUFJLENBQUN2QyxPQUFPLENBQUNFLHVCQUF1QixFQUFFO1FBQ2hEO1FBQ0EsSUFBSUksVUFBVSxDQUFDRSxrQkFBa0IsQ0FBQ0MsVUFBVSxJQUFJLENBQUM4QixRQUFRLENBQUN6RCxTQUFTLENBQUMsRUFBRTtVQUNwRSxJQUFBaUQsaUJBQVUsRUFBQ1EsUUFBUSxFQUFFekQsU0FBUyxFQUFFeUQsUUFBUSxDQUFDcEIsUUFBUSxDQUFDO1VBQ2xEb0IsUUFBUSxDQUFDcEIsUUFBUSxHQUFHLFVBQUM0RixPQUFPO1lBQUEsSUFBRUMsUUFBUSxHQUFBOUwsU0FBQSxDQUFBQyxNQUFBLFFBQUFELFNBQUEsUUFBQXNFLFNBQUEsR0FBQXRFLFNBQUEsTUFBR3NFLFNBQVM7WUFBQSxPQUFLZ0gsS0FBSSxDQUFDckYsUUFBUSxDQUFBbEgsS0FBQSxDQUFidU0sS0FBSSxFQUFBckssa0JBQUEsQ0FDckQ2SyxRQUFRLElBQUksSUFBSSxHQUFHLENBQUNELE9BQU8sQ0FBQyxHQUFHLENBQUNBLE9BQU8sRUFBRUMsUUFBUSxDQUFDLENBQ3hELENBQUM7VUFBQTtRQUNIO1FBRUEsSUFBSSxPQUFPekUsUUFBUSxDQUFDMEUsaUJBQWlCLEtBQUssVUFBVSxFQUFFO1VBQ3BELElBQUksQ0FBQ3ZJLFFBQVEsQ0FBQyxDQUFDd0ksY0FBYyxDQUFDLFlBQU07WUFDbEMzRSxRQUFRLENBQUMwRSxpQkFBaUIsQ0FBQyxDQUFDO1VBQzlCLENBQUMsQ0FBQztRQUNKO1FBQ0F4RCxzQkFBc0IsQ0FBQ0gsT0FBTyxFQUFFLElBQUksRUFBRWYsUUFBUSxFQUFFbUIsWUFBWSxFQUFFQyxrQkFBa0IsQ0FBQztNQUNuRjtNQUNGO0lBQ0EsQ0FBQyxNQUFNO01BQ0wsSUFBQTVCLGlCQUFVLEVBQUMsSUFBSSxFQUFFbkQsSUFBSSxFQUFFMkcsSUFBSSxDQUFDO01BQzVCLElBQUF4RCxpQkFBVSxFQUFDLElBQUksRUFBRXBELFVBQVUsRUFBRSxJQUFJLENBQUM7TUFDbEMsSUFBQW9ELGlCQUFVLEVBQUMsSUFBSSxFQUFFckQsUUFBUSxFQUFFNkcsSUFBSSxDQUFDN0csUUFBUSxDQUFDLENBQUM7TUFDMUNtRCxlQUFlLENBQUMsSUFBSSxFQUFFQyxLQUFLLENBQUM7TUFDNUIsSUFBQUMsaUJBQVUsRUFBQyxJQUFJLEVBQUVsRCxPQUFPLEVBQUUwRyxJQUFJLENBQUMxRyxPQUFPLENBQUMsQ0FBQztNQUN4QyxJQUFBa0QsaUJBQVUsRUFBQyxJQUFJLEVBQUVoRCxVQUFVLEVBQUV3RyxJQUFJLENBQUM5RyxLQUFLLENBQUMsQ0FBQztNQUN6QyxJQUFBc0QsaUJBQVUsRUFBQyxJQUFJLEVBQUUzQyxlQUFlLEVBQUUsSUFBSSxDQUFDO0lBQ3pDO0VBQ0Y7O0VBRUE7QUFDRjtBQUNBO0FBQ0E7QUFDQTtFQUpFLE9BQUE1QixZQUFBLENBQUErSSxjQUFBO0lBQUFoSixHQUFBO0lBQUFuQyxLQUFBLEVBS0EsU0FBQW1LLElBQUlBLENBQUEsRUFBRztNQUNMLE9BQU8sSUFBSSxDQUFDM0csSUFBSSxDQUFDO0lBQ25COztJQUVBO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7RUFKRTtJQUFBckIsR0FBQTtJQUFBbkMsS0FBQSxFQUtBLFNBQUF1RSxlQUFlQSxDQUFBLEVBQUc7TUFDaEIsSUFBSSxJQUFJLENBQUN4RSxNQUFNLEtBQUssQ0FBQyxFQUFFO1FBQ3JCLE1BQU0sSUFBSW9GLEtBQUssQ0FBQyxxRUFBcUUsQ0FBQztNQUN4RjtNQUNBLElBQUksSUFBSSxDQUFDM0IsSUFBSSxDQUFDLEtBQUssSUFBSSxFQUFFO1FBQ3ZCLElBQUksQ0FBQ3VJLE1BQU0sQ0FBQyxDQUFDO01BQ2Y7TUFDQSxPQUFPLElBQUksQ0FBQzVJLElBQUksQ0FBQztJQUNuQjs7SUFFQTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0VBSkU7SUFBQWhCLEdBQUE7SUFBQW5DLEtBQUEsRUFLQSxTQUFBMEUsZ0JBQWdCQSxDQUFBLEVBQUc7TUFDakIsSUFBSSxJQUFJLENBQUNsQixJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDekQsTUFBTSxLQUFLLENBQUMsRUFBRTtRQUM1QyxJQUFJLENBQUNnTSxNQUFNLENBQUMsQ0FBQztNQUNmO01BQ0EsT0FBTyxJQUFJLENBQUMxSSxLQUFLLENBQUM7SUFDcEI7O0lBRUE7QUFDRjtBQUNBO0FBQ0E7QUFDQTtFQUpFO0lBQUFsQixHQUFBO0lBQUFuQyxLQUFBLEVBS0EsU0FBQWdNLFVBQVVBLENBQUEsRUFBRztNQUFBLElBQUFDLE1BQUE7TUFDWCxPQUFPLElBQUksQ0FBQ0MsTUFBTSxDQUFDLFlBQVksRUFBRSxVQUFDeE0sQ0FBQztRQUFBLE9BQUssSUFBQTRLLHNCQUFVLEVBQUMyQixNQUFJLENBQUN4SSxPQUFPLENBQUMsQ0FBQyxDQUFDK0YsYUFBYSxDQUFDOUosQ0FBQyxDQUFDO01BQUEsRUFBQztJQUNyRjs7SUFFQTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0VBSkU7SUFBQXlDLEdBQUE7SUFBQW5DLEtBQUEsRUFLQSxTQUFBbU0sV0FBV0EsQ0FBQSxFQUFHO01BQUEsSUFBQUMsTUFBQTtNQUNaLE9BQU8sSUFBSSxDQUFDMUgsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDMkgsR0FBRyxDQUFDLFVBQUMzTSxDQUFDO1FBQUEsT0FBSyxJQUFBNEssc0JBQVUsRUFBQzhCLE1BQUksQ0FBQzNJLE9BQU8sQ0FBQyxDQUFDLENBQUMrRixhQUFhLENBQUM5SixDQUFDLENBQUM7TUFBQSxFQUFDO0lBQ3ZGOztJQUVBO0VBQUE7SUFBQXlDLEdBQUE7SUFBQW5DLEtBQUEsRUFDQSxTQUFBMEwsT0FBT0EsQ0FBQSxFQUFHO01BQ1IsTUFBTSxJQUFJdkcsS0FBSyxDQUFDLDRGQUE0RixDQUFDO0lBQy9HOztJQUVBO0VBQUE7SUFBQWhELEdBQUE7SUFBQW5DLEtBQUEsRUFDQSxTQUFBc00sUUFBUUEsQ0FBQSxFQUFHO01BQ1QsTUFBTSxJQUFJbkgsS0FBSyxDQUFDLDhGQUE4RixDQUFDO0lBQ2pIOztJQUVBO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0VBWkU7SUFBQWhELEdBQUE7SUFBQW5DLEtBQUEsRUFhQSxTQUFBbUgsUUFBUUEsQ0FBQSxFQUFHO01BQ1QsSUFBSSxJQUFJLENBQUMzRCxJQUFJLENBQUMsS0FBSyxJQUFJLEVBQUU7UUFDdkIsTUFBTSxJQUFJMkIsS0FBSyxDQUFDLDJEQUEyRCxDQUFDO01BQzlFO01BQ0EsT0FBTyxJQUFJLENBQUM3QixRQUFRLENBQUMsQ0FBQ29JLE9BQU8sQ0FBQyxDQUFDLENBQUN2RSxRQUFRO0lBQzFDOztJQUVBO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0VBTkU7SUFBQWhGLEdBQUE7SUFBQW5DLEtBQUEsRUFPQSxTQUFBdU0sb0JBQW9CQSxDQUFBLEVBQUc7TUFDckIsSUFBSSxJQUFJLENBQUMvSSxJQUFJLENBQUMsS0FBSyxJQUFJLEVBQUU7UUFDdkIsTUFBTSxJQUFJMkIsS0FBSyxDQUFDLHVFQUF1RSxDQUFDO01BQzFGO01BQ0EsSUFBSSxDQUFDLElBQUksQ0FBQzFCLE9BQU8sQ0FBQyxDQUFDK0csaUJBQWlCLEVBQUU7UUFDcEMsTUFBTSxJQUFJckYsS0FBSyxDQUFDLGdJQUFnSSxDQUFDO01BQ25KO01BQ0EsT0FBTyxJQUFJLENBQUN0QixrQkFBa0IsQ0FBQztJQUNqQzs7SUFFQTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0VBUEU7SUFBQTFCLEdBQUE7SUFBQW5DLEtBQUEsRUFRQSxTQUFBK0wsTUFBTUEsQ0FBQSxFQUFHO01BQ1AsSUFBSSxJQUFJLENBQUN2SSxJQUFJLENBQUMsS0FBSyxJQUFJLEVBQUU7UUFDdkIsTUFBTSxJQUFJMkIsS0FBSyxDQUFDLHlEQUF5RCxDQUFDO01BQzVFO01BQ0EsSUFBSSxJQUFJLENBQUNwRixNQUFNLEtBQUssQ0FBQyxFQUFFO1FBQ3JCLE1BQU0sSUFBSW9GLEtBQUssQ0FBQyxvRUFBb0UsQ0FBQztNQUN2RjtNQUNBc0IsZUFBZSxDQUFDLElBQUksRUFBRVAsV0FBVyxDQUFDLElBQUksQ0FBQzVDLFFBQVEsQ0FBQyxDQUFDb0ksT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO01BQzVELE9BQU8sSUFBSTtJQUNiOztJQUVBO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7RUFKRTtJQUFBdkosR0FBQTtJQUFBbkMsS0FBQSxFQUtBLFNBQUF3TSxPQUFPQSxDQUFBLEVBQUc7TUFDUixJQUFJLENBQUNsSixRQUFRLENBQUMsQ0FBQ2tKLE9BQU8sQ0FBQyxDQUFDO01BQ3hCLElBQUksSUFBSSxDQUFDaEosSUFBSSxDQUFDLENBQUNLLGtCQUFrQixDQUFDLEVBQUU7UUFDbEMsSUFBSSxDQUFDTCxJQUFJLENBQUMsQ0FBQ0ssa0JBQWtCLENBQUMsQ0FBQzJJLE9BQU8sQ0FBQyxDQUFDO01BQzFDO01BQ0EsT0FBTyxJQUFJO0lBQ2I7O0lBRUE7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7RUFURTtJQUFBckssR0FBQTtJQUFBbkMsS0FBQSxFQVVBLFNBQUF5TSxRQUFRQSxDQUFDM0YsS0FBSyxFQUFFa0QsT0FBTyxFQUFFO01BQUEsSUFBQTBDLE1BQUE7TUFDdkIsSUFBTXhFLE9BQU8sR0FBRyxJQUFBb0Msc0JBQVUsRUFBQyxJQUFJLENBQUM3RyxPQUFPLENBQUMsQ0FBQztNQUN6QyxJQUFJLENBQUN5SSxNQUFNLENBQUMsVUFBVSxFQUFFLFlBQU07UUFDNUIsSUFBQVMsMEJBQW1CLEVBQUMsWUFBTTtVQUN4QjtVQUNBO1VBQ0E7VUFDQSxJQUFNeEcsSUFBSSxHQUFHdUcsTUFBSSxDQUFDcEosUUFBUSxDQUFDLENBQUNvSSxPQUFPLENBQUMsQ0FBQztVQUNyQyxJQUFNdkUsUUFBUSxHQUFHaEIsSUFBSSxDQUFDZ0IsUUFBUSxJQUFJLENBQUMsQ0FBQztVQUNwQyxJQUFNSyxJQUFJLEdBQUdyQixJQUFJLENBQUNxQixJQUFJLElBQUksQ0FBQyxDQUFDO1VBQzVCLElBQVFSLEtBQUssR0FBS0csUUFBUSxDQUFsQkgsS0FBSztVQUNiLElBQU1ILFNBQVMsR0FBR00sUUFBUSxDQUFDTCxLQUFLLElBQUk0RixNQUFJLENBQUNuSixVQUFVLENBQUMsQ0FBQ3VELEtBQUs7VUFDMUQsSUFBTXhCLFdBQVcsR0FBRzZCLFFBQVEsQ0FBQzZDLE9BQU8sSUFBSTBDLE1BQUksQ0FBQ2pKLE9BQU8sQ0FBQyxDQUFDdUcsT0FBTztVQUM3RCxJQUFNNEMsV0FBVyxHQUFHNUMsT0FBTyxJQUFJMUUsV0FBVztVQUMxQyxJQUFJMEUsT0FBTyxFQUFFO1lBQ1gwQyxNQUFJLENBQUNqSixPQUFPLENBQUMsR0FBQWhCLGFBQUEsQ0FBQUEsYUFBQSxLQUFRaUssTUFBSSxDQUFDakosT0FBTyxDQUFDO2NBQUV1RyxPQUFPLEVBQUU0QztZQUFXLEVBQUU7VUFDNUQ7VUFDQUYsTUFBSSxDQUFDcEosUUFBUSxDQUFDLENBQUN3SSxjQUFjLENBQUMsWUFBTTtZQUNsQztZQUNBO1lBQ0EsSUFBTTVHLFVBQVUsR0FBR0ssb0JBQW9CLENBQUMyQyxPQUFPLENBQUM7WUFDaEQsSUFBSTJFLFlBQVksR0FBRyxJQUFJO1lBQ3ZCLElBQUlDLHdCQUF3QjtZQUM1QixJQUFJdkUsa0JBQWtCO1lBQ3RCLElBQ0UsQ0FBQ21FLE1BQUksQ0FBQ2pKLE9BQU8sQ0FBQyxDQUFDcUIsdUJBQXVCLElBQ25DcUMsUUFBUSxFQUNYO2NBQ0EsSUFBSSxPQUFPQSxRQUFRLENBQUM0QixxQkFBcUIsS0FBSyxVQUFVLEVBQUU7Z0JBQ3hELElBQWtDZ0UsS0FBSyxHQUFLN0gsVUFBVSxDQUE5Q1csd0JBQXdCO2dCQUNoQyxJQUFJa0gsS0FBSyxJQUFJQSxLQUFLLENBQUNqSCwyQkFBMkIsRUFBRTtrQkFDOUM4QywyQkFBMkIsQ0FBQ3pDLElBQUksRUFBRWEsS0FBSyxDQUFDO2dCQUMxQztnQkFDQThGLHdCQUF3QixHQUFHLElBQUExRSxnQkFBUyxFQUFDakIsUUFBUSxFQUFFLHVCQUF1QixDQUFDO2NBQ3pFO2NBQ0EsSUFDRWpDLFVBQVUsQ0FBQ2MsZUFBZSxDQUFDQyxnQkFBZ0IsSUFDeEMsT0FBT2tCLFFBQVEsQ0FBQ25CLGVBQWUsS0FBSyxVQUFVLEVBQ2pEO2dCQUNBdUMsa0JBQWtCLEdBQUcsSUFBQUgsZ0JBQVMsRUFBQ2pCLFFBQVEsRUFBRSxpQkFBaUIsQ0FBQztjQUM3RDtZQUNGO1lBQ0EsSUFBSSxDQUFDMkYsd0JBQXdCLElBQUk1RixlQUFlLENBQUNDLFFBQVEsQ0FBQyxFQUFFO2NBQzFEMEYsWUFBWSxHQUFHakcsa0NBQWtDLENBQy9DQyxTQUFTLEVBQ1RDLEtBQUssRUFDTEUsS0FBSyxFQUNMRyxRQUFRLENBQUNILEtBQ1gsQ0FBQztZQUNIO1lBQ0EsSUFBSUYsS0FBSyxFQUFFNEYsTUFBSSxDQUFDbkosVUFBVSxDQUFDLEdBQUcsSUFBQXlKLG1CQUFZLEVBQUM5RSxPQUFPLEVBQUV3RSxNQUFJLENBQUNuSixVQUFVLENBQUMsRUFBRXVELEtBQUssQ0FBQztZQUM1RTRGLE1BQUksQ0FBQ3BKLFFBQVEsQ0FBQyxDQUFDbUksTUFBTSxDQUFDaUIsTUFBSSxDQUFDbkosVUFBVSxDQUFDLEVBQUVxSixXQUFXLEVBQUU7Y0FDbkQzQyxjQUFjLEVBQUV5QyxNQUFJLENBQUMxSSxlQUFlO1lBQ3RDLENBQUMsQ0FBQztZQUNGLElBQUk4SSx3QkFBd0IsRUFBRTtjQUM1QkQsWUFBWSxHQUFHQyx3QkFBd0IsQ0FBQ3JFLGtCQUFrQixDQUFDLENBQUM7Y0FDNURxRSx3QkFBd0IsQ0FBQ3BFLE9BQU8sQ0FBQyxDQUFDO1lBQ3BDO1lBQ0EsSUFDRW1FLFlBQVksSUFDVCxDQUFDSCxNQUFJLENBQUNqSixPQUFPLENBQUMsQ0FBQ3FCLHVCQUF1QixJQUN0Q3FDLFFBQVEsRUFDWDtjQUNBa0Isc0JBQXNCLENBQUNILE9BQU8sRUFBRXdFLE1BQUksRUFBRXZGLFFBQVEsRUFBRWhCLElBQUksRUFBRW9DLGtCQUFrQixDQUFDO2NBQ3pFLElBQUlyRCxVQUFVLENBQUMrSCx1QkFBdUIsRUFBRTtnQkFDdEMsSUFBSUMsUUFBUTtnQkFDWixJQUFJLE9BQU8vRixRQUFRLENBQUM4Rix1QkFBdUIsS0FBSyxVQUFVLEVBQUU7a0JBQzFEQyxRQUFRLEdBQUcvRixRQUFRLENBQUM4Rix1QkFBdUIsQ0FBQ3BHLFNBQVMsRUFBRUcsS0FBSyxDQUFDO2dCQUMvRDtnQkFDQSxJQUNFOUIsVUFBVSxDQUFDRSxrQkFBa0IsSUFDMUIsT0FBTytCLFFBQVEsQ0FBQy9CLGtCQUFrQixLQUFLLFVBQVUsS0FFbEQsQ0FBQzRCLEtBQUssSUFDSCxJQUFBQyw4QkFBWSxFQUFDRCxLQUFLLEVBQUUwRixNQUFJLENBQUN2RixRQUFRLENBQUMsQ0FBQyxDQUFDSCxLQUFLLENBQUMsSUFDMUMsT0FBT1EsSUFBSSxDQUFDM0Isd0JBQXdCLEtBQUssVUFBVSxDQUN2RCxFQUNEO2tCQUNBc0IsUUFBUSxDQUFDL0Isa0JBQWtCLENBQUN5QixTQUFTLEVBQUVHLEtBQUssRUFBRWtHLFFBQVEsQ0FBQztnQkFDekQ7Y0FDRixDQUFDLE1BQU0sSUFDTGhJLFVBQVUsQ0FBQ0Usa0JBQWtCLElBQzFCLE9BQU8rQixRQUFRLENBQUMvQixrQkFBa0IsS0FBSyxVQUFVLEVBQ3BEO2dCQUNBLElBQUlGLFVBQVUsQ0FBQ0Usa0JBQWtCLENBQUNFLFdBQVcsRUFBRTtrQkFDN0M2QixRQUFRLENBQUMvQixrQkFBa0IsQ0FBQ3lCLFNBQVMsRUFBRUcsS0FBSyxFQUFFMUIsV0FBVyxDQUFDO2dCQUM1RCxDQUFDLE1BQU0sSUFBSSxDQUFDMEIsS0FBSyxJQUFJLElBQUFDLDhCQUFZLEVBQUN5RixNQUFJLENBQUN2RixRQUFRLENBQUMsQ0FBQyxDQUFDSCxLQUFLLEVBQUVBLEtBQUssQ0FBQyxFQUFFO2tCQUMvREcsUUFBUSxDQUFDL0Isa0JBQWtCLENBQUN5QixTQUFTLEVBQUVHLEtBQUssQ0FBQztnQkFDL0M7Y0FDRjtjQUNGO1lBQ0EsQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFBQyw4QkFBWSxFQUFDSCxLQUFLLEVBQUVLLFFBQVEsQ0FBQ0wsS0FBSyxDQUFDLEVBQUU7Y0FDL0NLLFFBQVEsQ0FBQ0wsS0FBSyxHQUFHLENBQUNuSCxNQUFNLENBQUN3TixNQUFNLElBQUl4TixNQUFNLEVBQUE4QyxhQUFBLENBQUFBLGFBQUEsS0FBTzBFLFFBQVEsQ0FBQ0wsS0FBSyxHQUFLQSxLQUFLLENBQUUsQ0FBQztZQUM3RTtZQUNBNEYsTUFBSSxDQUFDWCxNQUFNLENBQUMsQ0FBQztVQUNmLENBQUMsQ0FBQztRQUNKLENBQUMsQ0FBQztNQUNKLENBQUMsQ0FBQztNQUNGLE9BQU8sSUFBSTtJQUNiOztJQUVBO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7RUFiRTtJQUFBNUosR0FBQTtJQUFBbkMsS0FBQSxFQWNBLFNBQUFvTixRQUFRQSxDQUFDdEcsS0FBSyxFQUF3QjtNQUFBLElBQXRCOEUsUUFBUSxHQUFBOUwsU0FBQSxDQUFBQyxNQUFBLFFBQUFELFNBQUEsUUFBQXNFLFNBQUEsR0FBQXRFLFNBQUEsTUFBR3NFLFNBQVM7TUFDbEMsSUFBSSxJQUFJLENBQUNaLElBQUksQ0FBQyxLQUFLLElBQUksRUFBRTtRQUN2QixNQUFNLElBQUkyQixLQUFLLENBQUMsMkRBQTJELENBQUM7TUFDOUU7TUFDQSxJQUFJckYsU0FBUyxDQUFDQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLE9BQU82TCxRQUFRLEtBQUssVUFBVSxFQUFFO1FBQzFELE1BQU0sSUFBSTdNLFNBQVMsQ0FBQyxvRUFBb0UsQ0FBQztNQUMzRjtNQUNBLElBQUksQ0FBQzBOLFFBQVEsQ0FBQzNGLEtBQUssQ0FBQztNQUNwQixJQUFJOEUsUUFBUSxFQUFFO1FBQ1pBLFFBQVEsQ0FBQyxDQUFDO01BQ1o7TUFDQSxPQUFPLElBQUk7SUFDYjs7SUFFQTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtFQVpFO0lBQUF6SixHQUFBO0lBQUFuQyxLQUFBLEVBYUEsU0FBQStGLFFBQVFBLENBQUNpQixLQUFLLEVBQXdCO01BQUEsSUFBQXFHLE1BQUE7TUFBQSxJQUF0QnpCLFFBQVEsR0FBQTlMLFNBQUEsQ0FBQUMsTUFBQSxRQUFBRCxTQUFBLFFBQUFzRSxTQUFBLEdBQUF0RSxTQUFBLE1BQUdzRSxTQUFTO01BQ2xDLElBQUksSUFBSSxDQUFDWixJQUFJLENBQUMsS0FBSyxJQUFJLEVBQUU7UUFDdkIsTUFBTSxJQUFJMkIsS0FBSyxDQUFDLDJEQUEyRCxDQUFDO01BQzlFO01BQ0EsSUFBSSxJQUFJLENBQUNnQyxRQUFRLENBQUMsQ0FBQyxLQUFLLElBQUksSUFBSSxJQUFJLENBQUM3RCxRQUFRLENBQUMsQ0FBQ29JLE9BQU8sQ0FBQyxDQUFDLENBQUN0RixRQUFRLEtBQUssT0FBTyxFQUFFO1FBQzdFLE1BQU0sSUFBSWpCLEtBQUssQ0FBQyxtRUFBbUUsQ0FBQztNQUN0RjtNQUNBLElBQUlyRixTQUFTLENBQUNDLE1BQU0sR0FBRyxDQUFDLElBQUksT0FBTzZMLFFBQVEsS0FBSyxVQUFVLEVBQUU7UUFDMUQsTUFBTSxJQUFJN00sU0FBUyxDQUFDLG9FQUFvRSxDQUFDO01BQzNGO01BRUEsSUFBSSxDQUFDbU4sTUFBTSxDQUFDLFVBQVUsRUFBRSxZQUFNO1FBQzVCLElBQUFTLDBCQUFtQixFQUFDLFlBQU07VUFDeEIsSUFBTXpFLE9BQU8sR0FBRyxJQUFBb0Msc0JBQVUsRUFBQytDLE1BQUksQ0FBQzVKLE9BQU8sQ0FBQyxDQUFDO1VBRXpDLElBQU15QixVQUFVLEdBQUdLLG9CQUFvQixDQUFDMkMsT0FBTyxDQUFDO1VBRWhELElBQU0vQixJQUFJLEdBQUdrSCxNQUFJLENBQUMvSixRQUFRLENBQUMsQ0FBQ29JLE9BQU8sQ0FBQyxDQUFDO1VBQ3JDLElBQVF2RSxRQUFRLEdBQUtoQixJQUFJLENBQWpCZ0IsUUFBUTtVQUNoQixJQUFNTixTQUFTLEdBQUdNLFFBQVEsQ0FBQ0wsS0FBSztVQUNoQyxJQUFNQyxTQUFTLEdBQUdJLFFBQVEsQ0FBQ0gsS0FBSztVQUNoQyxJQUFNMUIsV0FBVyxHQUFHNkIsUUFBUSxDQUFDNkMsT0FBTztVQUVwQyxJQUFNc0QsWUFBWSxHQUFHLE9BQU90RyxLQUFLLEtBQUssVUFBVSxHQUM1Q0EsS0FBSyxDQUFDbkgsSUFBSSxDQUFDc0gsUUFBUSxFQUFFSixTQUFTLEVBQUVGLFNBQVMsQ0FBQyxHQUMxQ0csS0FBSzs7VUFFVDtVQUNBO1VBQ0EsSUFBTXVHLGNBQWMsR0FBRyxDQUFDckksVUFBVSxDQUFDYSxRQUFRLENBQUN5SCxnQ0FBZ0MsSUFDdkVGLFlBQVksSUFBSSxJQUFJOztVQUV6QjtVQUNBO1VBQ0EsSUFBSVIsd0JBQXdCO1VBQzVCLElBQUl2RSxrQkFBa0I7VUFDdEIsSUFBSXNFLFlBQVksR0FBRyxJQUFJO1VBQ3ZCLElBQ0UsQ0FBQ1EsTUFBSSxDQUFDNUosT0FBTyxDQUFDLENBQUNxQix1QkFBdUIsSUFDbkNxQyxRQUFRLEVBQ1g7WUFDQSxJQUNFakMsVUFBVSxDQUFDRSxrQkFBa0IsSUFDMUJGLFVBQVUsQ0FBQ0Usa0JBQWtCLENBQUNDLFVBQVUsSUFDeEMsT0FBTzhCLFFBQVEsQ0FBQzRCLHFCQUFxQixLQUFLLFVBQVUsRUFDdkQ7Y0FDQSxJQUFrQ2dFLEtBQUssR0FBSzdILFVBQVUsQ0FBOUNXLHdCQUF3QjtjQUNoQyxJQUFJa0gsS0FBSyxJQUFJQSxLQUFLLENBQUNqSCwyQkFBMkIsRUFBRTtnQkFDOUM4QywyQkFBMkIsQ0FBQ3pDLElBQUksRUFBRWEsS0FBSyxDQUFDO2NBQzFDO2NBQ0E4Rix3QkFBd0IsR0FBRyxJQUFBMUUsZ0JBQVMsRUFBQ2pCLFFBQVEsRUFBRSx1QkFBdUIsQ0FBQztZQUN6RTtZQUNBLElBQ0VqQyxVQUFVLENBQUNjLGVBQWUsQ0FBQ0MsZ0JBQWdCLElBQ3hDLE9BQU9rQixRQUFRLENBQUNuQixlQUFlLEtBQUssVUFBVSxFQUNqRDtjQUNBdUMsa0JBQWtCLEdBQUcsSUFBQUgsZ0JBQVMsRUFBQ2pCLFFBQVEsRUFBRSxpQkFBaUIsQ0FBQztZQUM3RDtVQUNGO1VBQ0EsSUFBSSxDQUFDMkYsd0JBQXdCLElBQUk1RixlQUFlLENBQUNDLFFBQVEsQ0FBQyxFQUFFO1lBQzFEMEYsWUFBWSxHQUFHakcsa0NBQWtDLENBQy9DQyxTQUFTLEVBQ1RNLFFBQVEsQ0FBQ0wsS0FBSyxFQUNkQyxTQUFTLEVBQUF0RSxhQUFBLENBQUFBLGFBQUEsS0FDSnNFLFNBQVMsR0FBS3VHLFlBQVksQ0FDakMsQ0FBQztVQUNIOztVQUVBO1VBQ0E7VUFDQSxJQUFJbkcsUUFBUSxDQUFDekQsU0FBUyxDQUFDLEVBQUU7WUFDdkJ5RCxRQUFRLENBQUN6RCxTQUFTLENBQUMsQ0FBQzRKLFlBQVksQ0FBQztVQUNuQyxDQUFDLE1BQU07WUFDTG5HLFFBQVEsQ0FBQ3BCLFFBQVEsQ0FBQ3VILFlBQVksQ0FBQztVQUNqQztVQUNBLElBQUlSLHdCQUF3QixFQUFFO1lBQzVCRCxZQUFZLEdBQUdDLHdCQUF3QixDQUFDckUsa0JBQWtCLENBQUMsQ0FBQztZQUM1RHFFLHdCQUF3QixDQUFDcEUsT0FBTyxDQUFDLENBQUM7VUFDcEM7VUFDQSxJQUNFNkUsY0FBYyxJQUNYVixZQUFZLElBQ1osQ0FBQ1EsTUFBSSxDQUFDNUosT0FBTyxDQUFDLENBQUNxQix1QkFBdUIsRUFDekM7WUFDQXVELHNCQUFzQixDQUFDSCxPQUFPLEVBQUVtRixNQUFJLEVBQUVsRyxRQUFRLEVBQUVoQixJQUFJLEVBQUVvQyxrQkFBa0IsQ0FBQztZQUN6RSxJQUNFckQsVUFBVSxDQUFDRSxrQkFBa0IsSUFDMUJGLFVBQVUsQ0FBQ0Usa0JBQWtCLENBQUNDLFVBQVUsRUFDM0M7Y0FDQSxJQUNFSCxVQUFVLENBQUMrSCx1QkFBdUIsSUFDL0IsT0FBTzlGLFFBQVEsQ0FBQzhGLHVCQUF1QixLQUFLLFVBQVUsRUFDekQ7Z0JBQ0EsSUFBTUMsUUFBUSxHQUFHL0YsUUFBUSxDQUFDOEYsdUJBQXVCLENBQUNwRyxTQUFTLEVBQUVFLFNBQVMsQ0FBQztnQkFDdkUsSUFBSSxPQUFPSSxRQUFRLENBQUMvQixrQkFBa0IsS0FBSyxVQUFVLEVBQUU7a0JBQ3JEK0IsUUFBUSxDQUFDL0Isa0JBQWtCLENBQUN5QixTQUFTLEVBQUVFLFNBQVMsRUFBRW1HLFFBQVEsQ0FBQztnQkFDN0Q7Y0FDRixDQUFDLE1BQU0sSUFBSSxPQUFPL0YsUUFBUSxDQUFDL0Isa0JBQWtCLEtBQUssVUFBVSxFQUFFO2dCQUM1RCxJQUFJRixVQUFVLENBQUNFLGtCQUFrQixDQUFDRSxXQUFXLEVBQUU7a0JBQzdDNkIsUUFBUSxDQUFDL0Isa0JBQWtCLENBQUN5QixTQUFTLEVBQUVFLFNBQVMsRUFBRXpCLFdBQVcsQ0FBQztnQkFDaEUsQ0FBQyxNQUFNO2tCQUNMNkIsUUFBUSxDQUFDL0Isa0JBQWtCLENBQUN5QixTQUFTLEVBQUVFLFNBQVMsQ0FBQztnQkFDbkQ7Y0FDRjtZQUNGO1VBQ0Y7VUFDQXNHLE1BQUksQ0FBQ3RCLE1BQU0sQ0FBQyxDQUFDO1VBQ2I7VUFDQSxJQUFJSCxRQUFRLEVBQUU7WUFDWixJQUFJMUQsT0FBTyxDQUFDdUYsc0JBQXNCLEVBQUU7Y0FDbEN2RixPQUFPLENBQUN1RixzQkFBc0IsQ0FBQ3RHLFFBQVEsRUFBRXlFLFFBQVEsQ0FBQztZQUNwRCxDQUFDLE1BQU07Y0FDTEEsUUFBUSxDQUFDL0wsSUFBSSxDQUFDc0gsUUFBUSxDQUFDO1lBQ3pCO1VBQ0Y7UUFDRixDQUFDLENBQUM7TUFDSixDQUFDLENBQUM7TUFDRixPQUFPLElBQUk7SUFDYjs7SUFFQTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7RUFSRTtJQUFBaEYsR0FBQTtJQUFBbkMsS0FBQSxFQVNBLFNBQUEwTixVQUFVQSxDQUFDMUQsT0FBTyxFQUFFO01BQ2xCLElBQUksSUFBSSxDQUFDeEcsSUFBSSxDQUFDLEtBQUssSUFBSSxFQUFFO1FBQ3ZCLE1BQU0sSUFBSTJCLEtBQUssQ0FBQyw2REFBNkQsQ0FBQztNQUNoRjtNQUNBLElBQUksQ0FBQyxJQUFJLENBQUMxQixPQUFPLENBQUMsQ0FBQ3VHLE9BQU8sRUFBRTtRQUMxQixNQUFNLElBQUk3RSxLQUFLLENBQUMsMEdBQTBHLENBQUM7TUFDN0g7TUFDQSxPQUFPLElBQUksQ0FBQ3NILFFBQVEsQ0FBQyxJQUFJLEVBQUV6QyxPQUFPLENBQUM7SUFDckM7O0lBRUE7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0VBWEU7SUFBQTdILEdBQUE7SUFBQW5DLEtBQUEsRUFZQSxTQUFBMk4sUUFBUUEsQ0FBQ0MsV0FBVyxFQUFFO01BQ3BCLElBQU0xRixPQUFPLEdBQUcsSUFBQW9DLHNCQUFVLEVBQUMsSUFBSSxDQUFDN0csT0FBTyxDQUFDLENBQUM7TUFDekMsSUFBSSxDQUFDLElBQUFvSywwQkFBbUIsRUFBQ0QsV0FBVyxFQUFFMUYsT0FBTyxDQUFDLEVBQUU7UUFDOUMsTUFBTSxJQUFJL0MsS0FBSyxDQUFDLGdJQUFnSSxDQUFDO01BQ25KO01BQ0EsSUFBTWhCLFNBQVMsR0FBRzFDLEtBQUssQ0FBQ0ssT0FBTyxDQUFDOEwsV0FBVyxDQUFDLEdBQ3hDLFVBQUNFLEtBQUs7UUFBQSxPQUFLLElBQUFDLCtCQUF3QixFQUNuQ0MsZ0JBQVMsRUFDVEYsS0FBSyxFQUNMRixXQUFXLENBQUN2QixHQUFHLENBQUMsVUFBQ2xHLElBQUk7VUFBQSxPQUFLK0IsT0FBTyxDQUFDK0YsYUFBYSxDQUFDOUgsSUFBSSxDQUFDO1FBQUEsRUFDdkQsQ0FBQztNQUFBLElBQ0MsVUFBQzJILEtBQUs7UUFBQSxPQUFLLElBQUFFLGdCQUFTLEVBQUM5RixPQUFPLENBQUMrRixhQUFhLENBQUNMLFdBQVcsQ0FBQyxFQUFFRSxLQUFLLENBQUM7TUFBQTtNQUVuRSxPQUFPN0osa0JBQWtCLENBQUMsSUFBSSxFQUFFRSxTQUFTLENBQUMsQ0FBQ3BFLE1BQU0sR0FBRyxDQUFDO0lBQ3ZEOztJQUVBO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7RUFoQkU7SUFBQW9DLEdBQUE7SUFBQW5DLEtBQUEsRUFpQkEsU0FBQWtPLHVCQUF1QkEsQ0FBQy9ILElBQUksRUFBRTtNQUM1QixJQUFNK0IsT0FBTyxHQUFHLElBQUFvQyxzQkFBVSxFQUFDLElBQUksQ0FBQzdHLE9BQU8sQ0FBQyxDQUFDO01BQ3pDLElBQU0wSyxPQUFPLEdBQUdqRyxPQUFPLENBQUMrRixhQUFhLENBQUM5SCxJQUFJLENBQUM7TUFDM0MsSUFBTWhDLFNBQVMsR0FBRyxTQUFaQSxTQUFTQSxDQUFJMkosS0FBSztRQUFBLE9BQUssSUFBQU0sa0JBQVcsRUFBQ0QsT0FBTyxFQUFFTCxLQUFLLEVBQUUsVUFBQzFNLENBQUMsRUFBRWlOLENBQUM7VUFBQSxPQUFLak4sQ0FBQyxJQUFJaU4sQ0FBQztRQUFBLEVBQUM7TUFBQTtNQUMxRSxPQUFPcEssa0JBQWtCLENBQUMsSUFBSSxFQUFFRSxTQUFTLENBQUMsQ0FBQ3BFLE1BQU0sR0FBRyxDQUFDO0lBQ3ZEOztJQUVBO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0VBbEJFO0lBQUFvQyxHQUFBO0lBQUFuQyxLQUFBLEVBbUJBLFNBQUFzTywyQkFBMkJBLENBQUM1SCxLQUFLLEVBQUU7TUFBQSxJQUFBNkgsTUFBQTtNQUNqQyxJQUFJLENBQUM5TSxLQUFLLENBQUNLLE9BQU8sQ0FBQzRFLEtBQUssQ0FBQyxFQUFFO1FBQ3pCLE1BQU0sSUFBSTNILFNBQVMsQ0FBQywwQkFBMEIsQ0FBQztNQUNqRDtNQUVBLE9BQU8ySCxLQUFLLENBQUM4SCxLQUFLLENBQUMsVUFBQ3JJLElBQUk7UUFBQSxPQUFLb0ksTUFBSSxDQUFDTCx1QkFBdUIsQ0FBQy9ILElBQUksQ0FBQztNQUFBLEVBQUM7SUFDbEU7O0lBRUE7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7RUFsQkU7SUFBQWhFLEdBQUE7SUFBQW5DLEtBQUEsRUFtQkEsU0FBQXlPLDJCQUEyQkEsQ0FBQy9ILEtBQUssRUFBRTtNQUFBLElBQUFnSSxNQUFBO01BQ2pDLE9BQU9qTixLQUFLLENBQUNLLE9BQU8sQ0FBQzRFLEtBQUssQ0FBQyxJQUFJQSxLQUFLLENBQUNpSSxJQUFJLENBQUMsVUFBQ3hJLElBQUk7UUFBQSxPQUFLdUksTUFBSSxDQUFDUix1QkFBdUIsQ0FBQy9ILElBQUksQ0FBQztNQUFBLEVBQUM7SUFDekY7O0lBRUE7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0VBWEU7SUFBQWhFLEdBQUE7SUFBQW5DLEtBQUEsRUFZQSxTQUFBNE8sTUFBTUEsQ0FBQ3pJLElBQUksRUFBRTtNQUFBLElBQUEwSSxNQUFBO01BQ1gsT0FBTyxJQUFJLENBQUMzQyxNQUFNLENBQUMsUUFBUSxFQUFFO1FBQUEsT0FBTSxJQUFBOEIsZ0JBQVMsRUFBQ2EsTUFBSSxDQUFDdEssZUFBZSxDQUFDLENBQUMsRUFBRTRCLElBQUksQ0FBQztNQUFBLEVBQUM7SUFDN0U7O0lBRUE7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtFQWhCRTtJQUFBaEUsR0FBQTtJQUFBbkMsS0FBQSxFQWlCQSxTQUFBOE8sY0FBY0EsQ0FBQzNJLElBQUksRUFBRTtNQUFBLElBQUE0SSxNQUFBO01BQ25CLE9BQU8sSUFBSSxDQUFDN0MsTUFBTSxDQUFDLGdCQUFnQixFQUFFLFlBQU07UUFDekMsSUFBTWhFLE9BQU8sR0FBRyxJQUFBb0Msc0JBQVUsRUFBQ3lFLE1BQUksQ0FBQ3RMLE9BQU8sQ0FBQyxDQUFDO1FBQ3pDLElBQU0wSyxPQUFPLEdBQUdqRyxPQUFPLENBQUMrRixhQUFhLENBQUM5SCxJQUFJLENBQUM7UUFDM0MsT0FBTyxJQUFBaUksa0JBQVcsRUFBQ0QsT0FBTyxFQUFFWSxNQUFJLENBQUN4SyxlQUFlLENBQUMsQ0FBQyxFQUFFLFVBQUNuRCxDQUFDLEVBQUVpTixDQUFDO1VBQUEsT0FBS2pOLENBQUMsSUFBSWlOLENBQUM7UUFBQSxFQUFDO01BQ3ZFLENBQUMsQ0FBQztJQUNKOztJQUVBO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtFQUxFO0lBQUFsTSxHQUFBO0lBQUFuQyxLQUFBLEVBTUEsU0FBQWdQLElBQUlBLENBQUNDLFFBQVEsRUFBRTtNQUNiLE9BQU8sSUFBSSxDQUFDeEssSUFBSSxDQUFDLElBQUF5SyxnQ0FBcUIsRUFBQ0QsUUFBUSxFQUFFLElBQUksQ0FBQ3ZLLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzVFOztJQUVBO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7RUFQRTtJQUFBdkMsR0FBQTtJQUFBbkMsS0FBQSxFQVFBLFNBQUFtUCxFQUFFQSxDQUFDRixRQUFRLEVBQUU7TUFDWCxJQUFNOUssU0FBUyxHQUFHLElBQUFpTCx5QkFBYyxFQUFDSCxRQUFRLENBQUM7TUFDMUMsT0FBTyxJQUFJLENBQUMvQyxNQUFNLENBQUMsSUFBSSxFQUFFLFVBQUN4TSxDQUFDO1FBQUEsT0FBS3lFLFNBQVMsQ0FBQ3pFLENBQUMsQ0FBQztNQUFBLEVBQUM7SUFDL0M7O0lBRUE7QUFDRjtBQUNBO0FBQ0E7QUFDQTtFQUpFO0lBQUF5QyxHQUFBO0lBQUFuQyxLQUFBLEVBS0EsU0FBQXFQLGFBQWFBLENBQUEsRUFBRztNQUNkLElBQU0zSSxLQUFLLEdBQUcsSUFBSSxDQUFDaEMsZ0JBQWdCLENBQUMsQ0FBQztNQUVyQyxPQUFPZ0MsS0FBSyxDQUFDOEgsS0FBSyxDQUFDLFVBQUM5TyxDQUFDO1FBQUEsT0FBSyxJQUFBNFAsbUJBQVksRUFBQzVQLENBQUMsQ0FBQztNQUFBLEVBQUM7SUFDNUM7O0lBRUE7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtFQVBFO0lBQUF5QyxHQUFBO0lBQUFuQyxLQUFBLEVBUUEsU0FBQXVQLFdBQVdBLENBQUNwTCxTQUFTLEVBQUU7TUFBQSxJQUFBcUwsTUFBQTtNQUNyQixPQUFPaEwsb0JBQW9CLENBQUMsSUFBSSxFQUFFLFVBQUM5RSxDQUFDO1FBQUEsT0FBS3lFLFNBQVMsQ0FBQ3FMLE1BQUksQ0FBQy9LLElBQUksQ0FBQy9FLENBQUMsQ0FBQyxDQUFDO01BQUEsRUFBQztJQUNuRTs7SUFFQTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtFQU5FO0lBQUF5QyxHQUFBO0lBQUFuQyxLQUFBLEVBT0EsU0FBQXdDLE1BQU1BLENBQUN5TSxRQUFRLEVBQUU7TUFDZixJQUFNOUssU0FBUyxHQUFHLElBQUFpTCx5QkFBYyxFQUFDSCxRQUFRLENBQUM7TUFDMUMsT0FBT3pLLG9CQUFvQixDQUFDLElBQUksRUFBRUwsU0FBUyxDQUFDO0lBQzlDOztJQUVBO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0VBTkU7SUFBQWhDLEdBQUE7SUFBQW5DLEtBQUEsRUFPQSxTQUFBeVAsR0FBR0EsQ0FBQ1IsUUFBUSxFQUFFO01BQ1osSUFBTTlLLFNBQVMsR0FBRyxJQUFBaUwseUJBQWMsRUFBQ0gsUUFBUSxDQUFDO01BQzFDLE9BQU96SyxvQkFBb0IsQ0FBQyxJQUFJLEVBQUUsVUFBQzlFLENBQUM7UUFBQSxPQUFLLENBQUN5RSxTQUFTLENBQUN6RSxDQUFDLENBQUM7TUFBQSxFQUFDO0lBQ3pEOztJQUVBO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtFQVJFO0lBQUF5QyxHQUFBO0lBQUFuQyxLQUFBLEVBU0EsU0FBQTBQLElBQUlBLENBQUEsRUFBRztNQUNMLE9BQU8sSUFBSSxDQUFDeEQsTUFBTSxDQUFDLE1BQU0sRUFBRXlELDZCQUFlLENBQUM7SUFDN0M7O0lBRUE7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7RUFORTtJQUFBeE4sR0FBQTtJQUFBbkMsS0FBQSxFQU9BLFNBQUE0UCxJQUFJQSxDQUFBLEVBQUc7TUFBQSxJQUFBQyxNQUFBO01BQ0wsT0FBTyxJQUFJLENBQUMzRCxNQUFNLENBQUMsTUFBTSxFQUFFLFVBQUN4TSxDQUFDLEVBQUs7UUFDaEMsSUFBSW1RLE1BQUksQ0FBQ3JJLElBQUksQ0FBQyxDQUFDLEtBQUssSUFBSSxFQUFFLE9BQU8sSUFBSTtRQUNyQyxJQUFNVSxPQUFPLEdBQUcsSUFBQW9DLHNCQUFVLEVBQUN1RixNQUFJLENBQUNwTSxPQUFPLENBQUMsQ0FBQztRQUN6QyxJQUFNNkQsUUFBUSxHQUFHWSxPQUFPLENBQUNvRCxjQUFjLENBQUE3SSxhQUFBLENBQUFBLGFBQUEsS0FBTW9OLE1BQUksQ0FBQ3BNLE9BQU8sQ0FBQztVQUFFOEgsSUFBSSxFQUFFO1FBQVEsRUFBRSxDQUFDO1FBQzdFLE9BQU9qRSxRQUFRLENBQUNtRSxNQUFNLENBQUN2RCxPQUFPLENBQUNzQixhQUFhLENBQUM5SixDQUFDLENBQUMsQ0FBQztNQUNsRCxDQUFDLENBQUM7SUFDSjs7SUFFQTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtFQU5FO0lBQUF5QyxHQUFBO0lBQUFuQyxLQUFBLEVBT0EsU0FBQXlMLE1BQU1BLENBQUEsRUFBRztNQUNQLElBQU1tRSxJQUFJLEdBQUcsSUFBSSxDQUFDQSxJQUFJLENBQUMsQ0FBQztNQUN4QixPQUFPLElBQUFFLHNCQUFlLEVBQUNGLElBQUksQ0FBQztJQUM5Qjs7SUFFQTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0VBUEU7SUFBQXpOLEdBQUE7SUFBQW5DLEtBQUEsRUFRQSxTQUFBK1AsUUFBUUEsQ0FBQ0MsS0FBSyxFQUFXO01BQUEsSUFBQUMsT0FBQTtNQUFBLFNBQUFDLEtBQUEsR0FBQXBRLFNBQUEsQ0FBQUMsTUFBQSxFQUFOa0osSUFBSSxPQUFBeEgsS0FBQSxDQUFBeU8sS0FBQSxPQUFBQSxLQUFBLFdBQUFDLEtBQUEsTUFBQUEsS0FBQSxHQUFBRCxLQUFBLEVBQUFDLEtBQUE7UUFBSmxILElBQUksQ0FBQWtILEtBQUEsUUFBQXJRLFNBQUEsQ0FBQXFRLEtBQUE7TUFBQTtNQUNyQixPQUFPLElBQUksQ0FBQ2pFLE1BQU0sQ0FBQyxVQUFVLEVBQUUsVUFBQ3hNLENBQUMsRUFBSztRQUFBLElBQUEwUSxnQkFBQTtRQUNwQyxDQUFBQSxnQkFBQSxHQUFBSCxPQUFJLENBQUMzTSxRQUFRLENBQUMsRUFBQytNLGFBQWEsQ0FBQXhSLEtBQUEsQ0FBQXVSLGdCQUFBLEdBQUMxUSxDQUFDLEVBQUVzUSxLQUFLLEVBQUFsSSxNQUFBLENBQUttQixJQUFJLEVBQUM7UUFDL0NnSCxPQUFJLENBQUN6TSxJQUFJLENBQUMsQ0FBQ3VJLE1BQU0sQ0FBQyxDQUFDO1FBQ25CLE9BQU9rRSxPQUFJO01BQ2IsQ0FBQyxDQUFDO0lBQ0o7O0lBRUE7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0VBTEU7SUFBQTlOLEdBQUE7SUFBQW5DLEtBQUEsRUFNQSxTQUFBc1EsYUFBYUEsQ0FBQ0MsS0FBSyxFQUFFO01BQUEsSUFBQUMsT0FBQTtNQUNuQjs7TUFFQSxPQUFPLElBQUksQ0FBQ3RFLE1BQU0sQ0FBQyxlQUFlLEVBQUUsVUFBQ3VFLFFBQVEsRUFBSztRQUNoRCxJQUFJQSxRQUFRLENBQUNySyxRQUFRLEtBQUssTUFBTSxFQUFFO1VBQ2hDLE1BQU0sSUFBSXJILFNBQVMsQ0FBQyx5RUFBeUUsQ0FBQztRQUNoRztRQUVBLElBQU11SSxRQUFRLEdBQUdrSixPQUFJLENBQUNsTixRQUFRLENBQUM7UUFDL0IsSUFBSSxPQUFPZ0UsUUFBUSxDQUFDZ0osYUFBYSxLQUFLLFVBQVUsRUFBRTtVQUNoRCxNQUFNLElBQUl2UixTQUFTLENBQUMsa0VBQWtFLENBQUM7UUFDekY7UUFFQSxJQUFNMlIsUUFBUSxHQUFHcEssbUJBQW1CLENBQUNrSyxPQUFJLENBQUM7UUFDMUMsSUFBTTdILGFBQWEsR0FBRyxDQUFDOEgsUUFBUSxDQUFDLENBQUMzSSxNQUFNLENBQUN2QixXQUFXLENBQUNpSyxPQUFJLEVBQUVDLFFBQVEsQ0FBQyxDQUFDO1FBQ3BFbkosUUFBUSxDQUFDZ0osYUFBYSxDQUFDM0gsYUFBYSxFQUFFK0gsUUFBUSxFQUFFSCxLQUFLLENBQUM7UUFFdEQsT0FBT0MsT0FBSTtNQUNiLENBQUMsQ0FBQztJQUNKOztJQUVBO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0VBTkU7SUFBQXJPLEdBQUE7SUFBQW5DLEtBQUEsRUFPQSxTQUFBOEcsS0FBS0EsQ0FBQSxFQUFHO01BQ04sT0FBTyxJQUFJLENBQUNvRixNQUFNLENBQUMsT0FBTyxFQUFFeUUseUJBQVcsQ0FBQztJQUMxQzs7SUFFQTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7RUFSRTtJQUFBeE8sR0FBQTtJQUFBbkMsS0FBQSxFQVNBLFNBQUFnSCxLQUFLQSxDQUFDeEYsSUFBSSxFQUFFO01BQUEsSUFBQW9QLE9BQUE7TUFDVixJQUFJLElBQUksQ0FBQ3BOLElBQUksQ0FBQyxLQUFLLElBQUksRUFBRTtRQUN2QixNQUFNLElBQUkyQixLQUFLLENBQUMsd0RBQXdELENBQUM7TUFDM0U7TUFDQSxJQUFJLElBQUksQ0FBQ2dDLFFBQVEsQ0FBQyxDQUFDLEtBQUssSUFBSSxJQUFJLElBQUksQ0FBQzdELFFBQVEsQ0FBQyxDQUFDb0ksT0FBTyxDQUFDLENBQUMsQ0FBQ3RGLFFBQVEsS0FBSyxPQUFPLEVBQUU7UUFDN0UsTUFBTSxJQUFJakIsS0FBSyxDQUFDLGdFQUFnRSxDQUFDO01BQ25GO01BQ0EsSUFBTTBMLE1BQU0sR0FBRyxJQUFJLENBQUMzRSxNQUFNLENBQUMsT0FBTyxFQUFFO1FBQUEsT0FBTTBFLE9BQUksQ0FBQ3pKLFFBQVEsQ0FBQyxDQUFDLENBQUNILEtBQUs7TUFBQSxFQUFDO01BQ2hFLElBQUksT0FBT3hGLElBQUksS0FBSyxXQUFXLEVBQUU7UUFDL0IsSUFBSXFQLE1BQU0sSUFBSSxJQUFJLEVBQUU7VUFDbEIsTUFBTSxJQUFJOVIsU0FBUyw0QkFBQStJLE1BQUEsQ0FBMkJ0RyxJQUFJLDJEQUE2RCxDQUFDO1FBQ2xIO1FBQ0EsT0FBT3FQLE1BQU0sQ0FBQ3JQLElBQUksQ0FBQztNQUNyQjtNQUNBLE9BQU9xUCxNQUFNO0lBQ2Y7O0lBRUE7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0VBUkU7SUFBQTFPLEdBQUE7SUFBQW5DLEtBQUEsRUFTQSxTQUFBZ0ssT0FBT0EsQ0FBQ3hJLElBQUksRUFBRTtNQUFBLElBQUFzUCxPQUFBO01BQ1osSUFBSSxJQUFJLENBQUN0TixJQUFJLENBQUMsS0FBSyxJQUFJLEVBQUU7UUFDdkIsTUFBTSxJQUFJMkIsS0FBSyxDQUFDLDBEQUEwRCxDQUFDO01BQzdFO01BQ0EsSUFBSSxDQUFDLElBQUksQ0FBQzFCLE9BQU8sQ0FBQyxDQUFDdUcsT0FBTyxFQUFFO1FBQzFCLE1BQU0sSUFBSTdFLEtBQUssQ0FBQyx1R0FBdUcsQ0FBQztNQUMxSDtNQUNBLElBQUksSUFBSSxDQUFDZ0MsUUFBUSxDQUFDLENBQUMsS0FBSyxJQUFJLEVBQUU7UUFDNUIsTUFBTSxJQUFJaEMsS0FBSyxDQUFDLDZGQUE2RixDQUFDO01BQ2hIO01BQ0EsSUFBTTRMLFFBQVEsR0FBRyxJQUFJLENBQUM3RSxNQUFNLENBQUMsU0FBUyxFQUFFO1FBQUEsT0FBTTRFLE9BQUksQ0FBQzNKLFFBQVEsQ0FBQyxDQUFDLENBQUM2QyxPQUFPO01BQUEsRUFBQztNQUN0RSxJQUFJeEksSUFBSSxFQUFFO1FBQ1IsT0FBT3VQLFFBQVEsQ0FBQ3ZQLElBQUksQ0FBQztNQUN2QjtNQUNBLE9BQU91UCxRQUFRO0lBQ2pCOztJQUVBO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtFQUxFO0lBQUE1TyxHQUFBO0lBQUFuQyxLQUFBLEVBTUEsU0FBQTBKLFFBQVFBLENBQUN1RixRQUFRLEVBQUU7TUFDakIsSUFBTStCLFdBQVcsR0FBRyxJQUFJLENBQUMxTSxPQUFPLENBQUMsVUFBQzVFLENBQUM7UUFBQSxPQUFLLElBQUF1Uiw0QkFBYyxFQUFDdlIsQ0FBQyxDQUFDNkUsZUFBZSxDQUFDLENBQUMsQ0FBQztNQUFBLEVBQUM7TUFDNUUsT0FBTzBLLFFBQVEsR0FBRytCLFdBQVcsQ0FBQ3hPLE1BQU0sQ0FBQ3lNLFFBQVEsQ0FBQyxHQUFHK0IsV0FBVztJQUM5RDs7SUFFQTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7RUFMRTtJQUFBN08sR0FBQTtJQUFBbkMsS0FBQSxFQU1BLFNBQUFrUixPQUFPQSxDQUFDQyxLQUFLLEVBQUU7TUFBQSxJQUFBQyxPQUFBO01BQ2IsT0FBTyxJQUFJLENBQUNsRixNQUFNLENBQUMsU0FBUyxFQUFFO1FBQUEsT0FBTWtGLE9BQUksQ0FBQzFILFFBQVEsQ0FBQyxDQUFDLENBQUNFLEVBQUUsQ0FBQ3VILEtBQUssQ0FBQztNQUFBLEVBQUM7SUFDaEU7O0lBRUE7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0VBUkU7SUFBQWhQLEdBQUE7SUFBQW5DLEtBQUEsRUFTQSxTQUFBcVIsT0FBT0EsQ0FBQ3BDLFFBQVEsRUFBRTtNQUFBLElBQUFxQyxPQUFBO01BQ2hCLE9BQU8sSUFBSSxDQUFDcEYsTUFBTSxDQUFDLFNBQVMsRUFBRSxVQUFDeE0sQ0FBQyxFQUFLO1FBQ25DLElBQU02UixVQUFVLEdBQUdELE9BQUksQ0FBQzdNLElBQUksQ0FBQzhCLFdBQVcsQ0FBQytLLE9BQUksRUFBRTVSLENBQUMsQ0FBQyxDQUFDO1FBQ2xELE9BQU91UCxRQUFRLEdBQUdzQyxVQUFVLENBQUMvTyxNQUFNLENBQUN5TSxRQUFRLENBQUMsR0FBR3NDLFVBQVU7TUFDNUQsQ0FBQyxDQUFDO0lBQ0o7O0lBRUE7QUFDRjtBQUNBO0FBQ0E7QUFDQTtFQUpFO0lBQUFwUCxHQUFBO0lBQUFuQyxLQUFBLEVBS0EsU0FBQXdSLE1BQU1BLENBQUEsRUFBRztNQUNQLE9BQU8sSUFBSSxDQUFDbE4sT0FBTyxDQUFDLFVBQUM1RSxDQUFDO1FBQUEsT0FBSyxDQUFDQSxDQUFDLENBQUMyUixPQUFPLENBQUMsQ0FBQyxDQUFDOVIsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO01BQUEsRUFBQztJQUNsRDs7SUFFQTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0VBSkU7SUFBQTRDLEdBQUE7SUFBQW5DLEtBQUEsRUFLQSxTQUFBeVIsT0FBT0EsQ0FBQ3hDLFFBQVEsRUFBRTtNQUNoQixJQUFJLElBQUksQ0FBQ0UsRUFBRSxDQUFDRixRQUFRLENBQUMsRUFBRTtRQUNyQixPQUFPLElBQUk7TUFDYjtNQUNBLElBQU15QyxpQkFBaUIsR0FBRyxJQUFJLENBQUNMLE9BQU8sQ0FBQyxDQUFDLENBQUM3TyxNQUFNLENBQUN5TSxRQUFRLENBQUM7TUFDekQsT0FBT3lDLGlCQUFpQixDQUFDM1IsTUFBTSxHQUFHLENBQUMsR0FBRzJSLGlCQUFpQixDQUFDQyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQ0MsU0FBUyxDQUFDO1FBQUEsT0FBTSxLQUFLO01BQUEsRUFBQztJQUMvRjs7SUFFQTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0VBUEU7SUFBQXpQLEdBQUE7SUFBQW5DLEtBQUEsRUFRQSxTQUFBNlIsT0FBT0EsQ0FBQSxFQUFlO01BQUEsSUFBQUMsT0FBQTtNQUFBLElBQWRsTixPQUFPLEdBQUE5RSxTQUFBLENBQUFDLE1BQUEsUUFBQUQsU0FBQSxRQUFBc0UsU0FBQSxHQUFBdEUsU0FBQSxNQUFHLENBQUMsQ0FBQztNQUNsQixPQUFPLElBQUksQ0FBQ29NLE1BQU0sQ0FBQyxTQUFTLEVBQUUsVUFBQ3hNLENBQUMsRUFBSztRQUNuQyxJQUFNd0wsWUFBWSxHQUFHRCx5QkFBeUIsQ0FBQzZHLE9BQUksRUFBRWxOLE9BQU8sQ0FBQztRQUM3RCxPQUFPa04sT0FBSSxDQUFDck4sSUFBSSxDQUFDLElBQUE2RixzQkFBVSxFQUFDd0gsT0FBSSxDQUFDck8sT0FBTyxDQUFDLENBQUMsQ0FBQytGLGFBQWEsQ0FBQzlKLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRXdMLFlBQVksQ0FBQztNQUNsRixDQUFDLENBQUM7SUFDSjs7SUFFQTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7RUFMRTtJQUFBL0ksR0FBQTtJQUFBbkMsS0FBQSxFQU1BLFNBQUErUixJQUFJQSxDQUFDQyxRQUFRLEVBQUU7TUFDYixPQUFPLElBQUksQ0FBQ2xMLEtBQUssQ0FBQyxDQUFDLENBQUNrTCxRQUFRLENBQUM7SUFDL0I7O0lBRUE7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7RUFORTtJQUFBN1AsR0FBQTtJQUFBbkMsS0FBQSxFQU9BLFNBQUFpUyxNQUFNQSxDQUFDRCxRQUFRLEVBQUU7TUFBQSxJQUFBRSxPQUFBO01BQ2YsT0FBTyxJQUFJLENBQUNoRyxNQUFNLENBQUMsUUFBUSxFQUFFLFlBQU07UUFDakMsSUFBTWlHLE9BQU8sR0FBR0QsT0FBSSxDQUFDSCxJQUFJLENBQUNDLFFBQVEsQ0FBQztRQUNuQyxJQUFJLE9BQU9HLE9BQU8sS0FBSyxVQUFVLEVBQUU7VUFDakMsTUFBTSxJQUFJcFQsU0FBUyxDQUFDLGdGQUFnRixDQUFDO1FBQ3ZHO1FBQ0EsT0FBTyxZQUFhO1VBQ2xCLElBQU1xVCxRQUFRLEdBQUdELE9BQU8sQ0FBQXRULEtBQUEsU0FBQWlCLFNBQVEsQ0FBQztVQUNqQ29TLE9BQUksQ0FBQzFPLElBQUksQ0FBQyxDQUFDdUksTUFBTSxDQUFDLENBQUM7VUFDbkIsT0FBT3FHLFFBQVE7UUFDakIsQ0FBQztNQUNILENBQUMsQ0FBQztJQUNKOztJQUVBO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtFQUxFO0lBQUFqUSxHQUFBO0lBQUFuQyxLQUFBLEVBTUEsU0FBQXFTLFVBQVVBLENBQUNMLFFBQVEsRUFBRTtNQUFBLElBQUFNLE9BQUE7TUFDbkIsSUFBTXBLLE9BQU8sR0FBRyxJQUFBb0Msc0JBQVUsRUFBQyxJQUFJLENBQUM3RyxPQUFPLENBQUMsQ0FBQztNQUN6QyxJQUFJLE9BQU95RSxPQUFPLENBQUN6RCxJQUFJLEtBQUssVUFBVSxFQUFFO1FBQ3RDLE1BQU0sSUFBSThOLFVBQVUsQ0FBQyx5REFBeUQsQ0FBQztNQUNqRjtNQUVBLE9BQU8sSUFBSSxDQUFDckcsTUFBTSxDQUFDLFlBQVksRUFBRSxVQUFDeE0sQ0FBQyxFQUFLO1FBQ3RDLElBQUlBLENBQUMsQ0FBQzBHLFFBQVEsS0FBSyxNQUFNLEVBQUU7VUFDekIsTUFBTSxJQUFJckgsU0FBUyxDQUFDLHNFQUFzRSxDQUFDO1FBQzdGO1FBQ0EsSUFBSSxPQUFPaVQsUUFBUSxLQUFLLFFBQVEsRUFBRTtVQUNoQyxNQUFNLElBQUlqVCxTQUFTLENBQUMsMkRBQTJELENBQUM7UUFDbEY7UUFDQSxJQUFNK0gsS0FBSyxHQUFHd0wsT0FBSSxDQUFDeEwsS0FBSyxDQUFDLENBQUM7UUFDMUIsSUFBSSxDQUFDLElBQUEwTCxrQkFBTSxFQUFDMUwsS0FBSyxFQUFFa0wsUUFBUSxDQUFDLEVBQUU7VUFDNUIsTUFBTSxJQUFJN00sS0FBSyx1REFBQTJDLE1BQUEsQ0FBa0RrSyxRQUFRLGlCQUFTLENBQUM7UUFDckY7UUFDQSxJQUFNUyxTQUFTLEdBQUczTCxLQUFLLENBQUNrTCxRQUFRLENBQUM7UUFDakMsSUFBSSxPQUFPUyxTQUFTLEtBQUssVUFBVSxFQUFFO1VBQ25DLE1BQU0sSUFBSTFULFNBQVMsc0RBQUErSSxNQUFBLENBQWlEa0ssUUFBUSx1REFBQWxLLE1BQUEsQ0FBQWhKLE9BQUEsQ0FBaUQyVCxTQUFTLFlBQUcsQ0FBQztRQUM1STtRQUVBLE9BQU8sWUFBYTtVQUNsQixJQUFNbEosT0FBTyxHQUFHa0osU0FBUyxDQUFBNVQsS0FBQSxTQUFBaUIsU0FBUSxDQUFDO1VBQ2xDLElBQU00UyxPQUFPLEdBQUd4SyxPQUFPLENBQUN6RCxJQUFJLENBQUM4RSxPQUFPLENBQUM7VUFDckMsT0FBTytJLE9BQUksQ0FBQzdOLElBQUksQ0FBQ2lPLE9BQU8sRUFBRSxJQUFJLEVBQUVKLE9BQUksQ0FBQzdPLE9BQU8sQ0FBQyxDQUFDO1FBQ2hELENBQUM7TUFDSCxDQUFDLENBQUM7SUFDSjs7SUFFQTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0VBSkU7SUFBQXRCLEdBQUE7SUFBQW5DLEtBQUEsRUFLQSxTQUFBbUMsR0FBR0EsQ0FBQSxFQUFHO01BQ0osT0FBTyxJQUFJLENBQUMrSixNQUFNLENBQUMsS0FBSyxFQUFFLFVBQUN4TSxDQUFDO1FBQUEsT0FBTUEsQ0FBQyxDQUFDeUMsR0FBRyxLQUFLaUMsU0FBUyxHQUFHLElBQUksR0FBRzFFLENBQUMsQ0FBQ3lDLEdBQUc7TUFBQSxDQUFDLENBQUM7SUFDeEU7O0lBRUE7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7RUFORTtJQUFBQSxHQUFBO0lBQUFuQyxLQUFBLEVBT0EsU0FBQXdILElBQUlBLENBQUEsRUFBRztNQUNMLE9BQU8sSUFBSSxDQUFDMEUsTUFBTSxDQUFDLE1BQU0sRUFBRSxVQUFDeE0sQ0FBQztRQUFBLE9BQUssSUFBQWlULGlCQUFVLEVBQUNqVCxDQUFDLENBQUM7TUFBQSxFQUFDO0lBQ2xEOztJQUVBO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0VBTkU7SUFBQXlDLEdBQUE7SUFBQW5DLEtBQUEsRUFPQSxTQUFBd0IsSUFBSUEsQ0FBQSxFQUFHO01BQ0wsSUFBTTBHLE9BQU8sR0FBRyxJQUFBb0Msc0JBQVUsRUFBQyxJQUFJLENBQUM3RyxPQUFPLENBQUMsQ0FBQztNQUN6QyxPQUFPLElBQUksQ0FBQ3lJLE1BQU0sQ0FBQyxNQUFNLEVBQUUsVUFBQ3hNLENBQUM7UUFBQSxPQUMzQndJLE9BQU8sQ0FBQ1IsaUJBQWlCLEdBQUdRLE9BQU8sQ0FBQ1IsaUJBQWlCLENBQUNoSSxDQUFDLENBQUMsR0FBRyxJQUFBZ0ksd0JBQWlCLEVBQUNoSSxDQUFDLENBQUM7TUFBQSxDQUNoRixDQUFDO0lBQ0o7O0lBRUE7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtFQVBFO0lBQUF5QyxHQUFBO0lBQUFuQyxLQUFBLEVBUUEsU0FBQTRTLFFBQVFBLENBQUNDLFNBQVMsRUFBRTtNQUNsQixJQUFJLE9BQU9BLFNBQVMsS0FBSyxRQUFRLElBQUlBLFNBQVMsQ0FBQ0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQ2xFO1FBQ0FsTCxPQUFPLENBQUNDLElBQUksQ0FBQyxzSUFBc0ksQ0FBQztNQUN0SjtNQUNBLE9BQU8sSUFBSSxDQUFDcUUsTUFBTSxDQUFDLFVBQVUsRUFBRSxVQUFDeE0sQ0FBQztRQUFBLE9BQUssSUFBQXFULDBCQUFZLEVBQUNyVCxDQUFDLEVBQUVtVCxTQUFTLENBQUM7TUFBQSxFQUFDO0lBQ25FOztJQUVBO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0VBTkU7SUFBQTFRLEdBQUE7SUFBQW5DLEtBQUEsRUFPQSxTQUFBMEMsT0FBT0EsQ0FBQ3NRLEVBQUUsRUFBRTtNQUFBLElBQUFDLE9BQUE7TUFDVixJQUFJLENBQUN2TyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUNoQyxPQUFPLENBQUMsVUFBQ2hELENBQUMsRUFBRW9ELENBQUM7UUFBQSxPQUFLa1EsRUFBRSxDQUFDblQsSUFBSSxDQUFDb1QsT0FBSSxFQUFFQSxPQUFJLENBQUN4TyxJQUFJLENBQUMvRSxDQUFDLENBQUMsRUFBRW9ELENBQUMsQ0FBQztNQUFBLEVBQUM7TUFDekUsT0FBTyxJQUFJO0lBQ2I7O0lBRUE7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7RUFORTtJQUFBWCxHQUFBO0lBQUFuQyxLQUFBLEVBT0EsU0FBQXFNLEdBQUdBLENBQUMyRyxFQUFFLEVBQUU7TUFBQSxJQUFBRSxPQUFBO01BQ04sT0FBTyxJQUFJLENBQUN4TyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMySCxHQUFHLENBQUMsVUFBQzNNLENBQUMsRUFBRW9ELENBQUM7UUFBQSxPQUFLa1EsRUFBRSxDQUFDblQsSUFBSSxDQUFDcVQsT0FBSSxFQUFFQSxPQUFJLENBQUN6TyxJQUFJLENBQUMvRSxDQUFDLENBQUMsRUFBRW9ELENBQUMsQ0FBQztNQUFBLEVBQUM7SUFDOUU7O0lBRUE7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtFQVBFO0lBQUFYLEdBQUE7SUFBQW5DLEtBQUEsRUFRQSxTQUFBbVQsTUFBTUEsQ0FBQ0gsRUFBRSxFQUE0QjtNQUFBLElBQUFJLE9BQUE7TUFBQSxJQUExQkMsWUFBWSxHQUFBdlQsU0FBQSxDQUFBQyxNQUFBLFFBQUFELFNBQUEsUUFBQXNFLFNBQUEsR0FBQXRFLFNBQUEsTUFBR3NFLFNBQVM7TUFDakMsSUFBSXRFLFNBQVMsQ0FBQ0MsTUFBTSxHQUFHLENBQUMsRUFBRTtRQUN4QixPQUFPLElBQUksQ0FBQzJFLGdCQUFnQixDQUFDLENBQUMsQ0FBQ3lPLE1BQU0sQ0FDbkMsVUFBQ0csS0FBSyxFQUFFNVQsQ0FBQyxFQUFFb0QsQ0FBQztVQUFBLE9BQUtrUSxFQUFFLENBQUNuVCxJQUFJLENBQUN1VCxPQUFJLEVBQUVFLEtBQUssRUFBRUYsT0FBSSxDQUFDM08sSUFBSSxDQUFDL0UsQ0FBQyxDQUFDLEVBQUVvRCxDQUFDLENBQUM7UUFBQSxHQUN0RHVRLFlBQ0YsQ0FBQztNQUNIO01BQ0EsT0FBTyxJQUFJLENBQUMzTyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUN5TyxNQUFNLENBQUMsVUFBQ0csS0FBSyxFQUFFNVQsQ0FBQyxFQUFFb0QsQ0FBQztRQUFBLE9BQUtrUSxFQUFFLENBQUNuVCxJQUFJLENBQzVEdVQsT0FBSSxFQUNKdFEsQ0FBQyxLQUFLLENBQUMsR0FBR3NRLE9BQUksQ0FBQzNPLElBQUksQ0FBQzZPLEtBQUssQ0FBQyxHQUFHQSxLQUFLLEVBQ2xDRixPQUFJLENBQUMzTyxJQUFJLENBQUMvRSxDQUFDLENBQUMsRUFDWm9ELENBQ0YsQ0FBQztNQUFBLEVBQUM7SUFDSjs7SUFFQTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0VBUEU7SUFBQVgsR0FBQTtJQUFBbkMsS0FBQSxFQVFBLFNBQUF1VCxXQUFXQSxDQUFDUCxFQUFFLEVBQTRCO01BQUEsSUFBQVEsT0FBQTtNQUFBLElBQTFCSCxZQUFZLEdBQUF2VCxTQUFBLENBQUFDLE1BQUEsUUFBQUQsU0FBQSxRQUFBc0UsU0FBQSxHQUFBdEUsU0FBQSxNQUFHc0UsU0FBUztNQUN0QyxJQUFJdEUsU0FBUyxDQUFDQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1FBQ3hCLE9BQU8sSUFBSSxDQUFDMkUsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDNk8sV0FBVyxDQUN4QyxVQUFDRCxLQUFLLEVBQUU1VCxDQUFDLEVBQUVvRCxDQUFDO1VBQUEsT0FBS2tRLEVBQUUsQ0FBQ25ULElBQUksQ0FBQzJULE9BQUksRUFBRUYsS0FBSyxFQUFFRSxPQUFJLENBQUMvTyxJQUFJLENBQUMvRSxDQUFDLENBQUMsRUFBRW9ELENBQUMsQ0FBQztRQUFBLEdBQ3REdVEsWUFDRixDQUFDO01BQ0g7TUFDQSxPQUFPLElBQUksQ0FBQzNPLGdCQUFnQixDQUFDLENBQUMsQ0FBQzZPLFdBQVcsQ0FBQyxVQUFDRCxLQUFLLEVBQUU1VCxDQUFDLEVBQUVvRCxDQUFDO1FBQUEsT0FBS2tRLEVBQUUsQ0FBQ25ULElBQUksQ0FDakUyVCxPQUFJLEVBQ0oxUSxDQUFDLEtBQUssQ0FBQyxHQUFHMFEsT0FBSSxDQUFDL08sSUFBSSxDQUFDNk8sS0FBSyxDQUFDLEdBQUdBLEtBQUssRUFDbENFLE9BQUksQ0FBQy9PLElBQUksQ0FBQy9FLENBQUMsQ0FBQyxFQUNab0QsQ0FDRixDQUFDO01BQUEsRUFBQztJQUNKOztJQUVBO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7RUFQRTtJQUFBWCxHQUFBO0lBQUFuQyxLQUFBLEVBUUEsU0FBQXVCLEtBQUtBLENBQUNrUyxLQUFLLEVBQUVDLEdBQUcsRUFBRTtNQUNoQixPQUFPLElBQUksQ0FBQ2pQLElBQUksQ0FBQyxJQUFJLENBQUNDLGdCQUFnQixDQUFDLENBQUMsQ0FBQ25ELEtBQUssQ0FBQ2tTLEtBQUssRUFBRUMsR0FBRyxDQUFDLENBQUM7SUFDN0Q7O0lBRUE7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0VBTEU7SUFBQXZSLEdBQUE7SUFBQW5DLEtBQUEsRUFNQSxTQUFBMk8sSUFBSUEsQ0FBQ00sUUFBUSxFQUFFO01BQ2IsSUFBSSxJQUFJLENBQUN6TCxJQUFJLENBQUMsS0FBSyxJQUFJLEVBQUU7UUFDdkIsTUFBTSxJQUFJMkIsS0FBSyxDQUFDLHNEQUFzRCxDQUFDO01BQ3pFO01BQ0EsSUFBTWhCLFNBQVMsR0FBRyxJQUFBaUwseUJBQWMsRUFBQ0gsUUFBUSxDQUFDO01BQzFDLE9BQU8sSUFBSSxDQUFDdkssZ0JBQWdCLENBQUMsQ0FBQyxDQUFDaUssSUFBSSxDQUFDeEssU0FBUyxDQUFDO0lBQ2hEOztJQUVBO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtFQUxFO0lBQUFoQyxHQUFBO0lBQUFuQyxLQUFBLEVBTUEsU0FBQTJULFNBQVNBLENBQUN4UCxTQUFTLEVBQUU7TUFBQSxJQUFBeVAsT0FBQTtNQUNuQixPQUFPLElBQUksQ0FBQ2xQLGdCQUFnQixDQUFDLENBQUMsQ0FBQ2lLLElBQUksQ0FBQyxVQUFDalAsQ0FBQyxFQUFFb0QsQ0FBQztRQUFBLE9BQUtxQixTQUFTLENBQUN0RSxJQUFJLENBQUMrVCxPQUFJLEVBQUVBLE9BQUksQ0FBQ25QLElBQUksQ0FBQy9FLENBQUMsQ0FBQyxFQUFFb0QsQ0FBQyxDQUFDO01BQUEsRUFBQztJQUN0Rjs7SUFFQTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7RUFMRTtJQUFBWCxHQUFBO0lBQUFuQyxLQUFBLEVBTUEsU0FBQXdPLEtBQUtBLENBQUNTLFFBQVEsRUFBRTtNQUNkLElBQU05SyxTQUFTLEdBQUcsSUFBQWlMLHlCQUFjLEVBQUNILFFBQVEsQ0FBQztNQUMxQyxPQUFPLElBQUksQ0FBQ3ZLLGdCQUFnQixDQUFDLENBQUMsQ0FBQzhKLEtBQUssQ0FBQ3JLLFNBQVMsQ0FBQztJQUNqRDs7SUFFQTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7RUFMRTtJQUFBaEMsR0FBQTtJQUFBbkMsS0FBQSxFQU1BLFNBQUE2VCxVQUFVQSxDQUFDMVAsU0FBUyxFQUFFO01BQUEsSUFBQTJQLE9BQUE7TUFDcEIsT0FBTyxJQUFJLENBQUNwUCxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM4SixLQUFLLENBQUMsVUFBQzlPLENBQUMsRUFBRW9ELENBQUM7UUFBQSxPQUFLcUIsU0FBUyxDQUFDdEUsSUFBSSxDQUFDaVUsT0FBSSxFQUFFQSxPQUFJLENBQUNyUCxJQUFJLENBQUMvRSxDQUFDLENBQUMsRUFBRW9ELENBQUMsQ0FBQztNQUFBLEVBQUM7SUFDdkY7O0lBRUE7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtFQVBFO0lBQUFYLEdBQUE7SUFBQW5DLEtBQUEsRUFRQSxTQUFBc0UsT0FBT0EsQ0FBQzBPLEVBQUUsRUFBRTtNQUFBLElBQUFlLE9BQUE7TUFDVixJQUFNck4sS0FBSyxHQUFHLElBQUksQ0FBQ2hDLGdCQUFnQixDQUFDLENBQUMsQ0FBQzJILEdBQUcsQ0FBQyxVQUFDM00sQ0FBQyxFQUFFb0QsQ0FBQztRQUFBLE9BQUtrUSxFQUFFLENBQUNuVCxJQUFJLENBQUNrVSxPQUFJLEVBQUVBLE9BQUksQ0FBQ3RQLElBQUksQ0FBQy9FLENBQUMsQ0FBQyxFQUFFb0QsQ0FBQyxDQUFDO01BQUEsRUFBQztNQUNuRixJQUFNa1IsU0FBUyxHQUFHLElBQUFDLDBCQUFJLEVBQUN2TixLQUFLLEVBQUUsQ0FBQyxDQUFDO01BQ2hDLE9BQU8sSUFBSSxDQUFDakMsSUFBSSxDQUFDdVAsU0FBUyxDQUFDeFIsTUFBTSxDQUFDM0IsT0FBTyxDQUFDLENBQUM7SUFDN0M7O0lBRUE7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtFQVBFO0lBQUFzQixHQUFBO0lBQUFuQyxLQUFBLEVBUUEsU0FBQTRSLFNBQVNBLENBQUN6TixTQUFTLEVBQUU7TUFBQSxJQUFBK1AsT0FBQTtNQUNuQixPQUFPalEsa0JBQWtCLENBQUMsSUFBSSxFQUFFLFVBQUN2RSxDQUFDLEVBQUs7UUFDckMsSUFBTXlHLElBQUksR0FBRytOLE9BQUksQ0FBQ3pQLElBQUksQ0FBQy9FLENBQUMsQ0FBQztRQUN6QixPQUFPeUcsSUFBSSxDQUFDcEcsTUFBTSxHQUFHLENBQUMsSUFBSW9FLFNBQVMsQ0FBQ2dDLElBQUksQ0FBQztNQUMzQyxDQUFDLENBQUM7SUFDSjs7SUFFQTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7RUFMRTtJQUFBaEUsR0FBQTtJQUFBbkMsS0FBQSxFQU1BLFNBQUFULEdBQUdBLENBQUM0UixLQUFLLEVBQUU7TUFDVCxPQUFPLElBQUksQ0FBQ2hGLFdBQVcsQ0FBQyxDQUFDLENBQUNnRixLQUFLLENBQUM7SUFDbEM7O0lBRUE7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0VBTEU7SUFBQWhQLEdBQUE7SUFBQW5DLEtBQUEsRUFNQSxTQUFBNEosRUFBRUEsQ0FBQ3VILEtBQUssRUFBRTtNQUNSLElBQU16SyxLQUFLLEdBQUcsSUFBSSxDQUFDaEMsZ0JBQWdCLENBQUMsQ0FBQztNQUNyQyxJQUFJeU0sS0FBSyxHQUFHekssS0FBSyxDQUFDM0csTUFBTSxFQUFFO1FBQ3hCLE9BQU8sSUFBSSxDQUFDMEUsSUFBSSxDQUFDaUMsS0FBSyxDQUFDeUssS0FBSyxDQUFDLENBQUM7TUFDaEM7TUFDQSxPQUFPLElBQUksQ0FBQzFNLElBQUksQ0FBQyxFQUFFLENBQUM7SUFDdEI7O0lBRUE7QUFDRjtBQUNBO0FBQ0E7QUFDQTtFQUpFO0lBQUF0QyxHQUFBO0lBQUFuQyxLQUFBLEVBS0EsU0FBQTJSLEtBQUtBLENBQUEsRUFBRztNQUNOLE9BQU8sSUFBSSxDQUFDL0gsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNuQjs7SUFFQTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0VBSkU7SUFBQXpILEdBQUE7SUFBQW5DLEtBQUEsRUFLQSxTQUFBbVUsSUFBSUEsQ0FBQSxFQUFHO01BQ0wsT0FBTyxJQUFJLENBQUN2SyxFQUFFLENBQUMsSUFBSSxDQUFDN0osTUFBTSxHQUFHLENBQUMsQ0FBQztJQUNqQzs7SUFFQTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0VBSkU7SUFBQW9DLEdBQUE7SUFBQW5DLEtBQUEsRUFLQSxTQUFBb1UsT0FBT0EsQ0FBQSxFQUFHO01BQ1I7TUFDQXhNLE9BQU8sQ0FBQ0MsSUFBSSxDQUFDLG1FQUFtRSxDQUFDO01BQ2pGLE9BQU8sQ0FBQyxJQUFJLENBQUN3TSxNQUFNLENBQUMsQ0FBQztJQUN2Qjs7SUFFQTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtFQU5FO0lBQUFsUyxHQUFBO0lBQUFuQyxLQUFBLEVBT0EsU0FBQXFVLE1BQU1BLENBQUEsRUFBa0I7TUFBQSxJQUFqQnBGLFFBQVEsR0FBQW5QLFNBQUEsQ0FBQUMsTUFBQSxRQUFBRCxTQUFBLFFBQUFzRSxTQUFBLEdBQUF0RSxTQUFBLE1BQUcsSUFBSTtNQUNwQixPQUFPQSxTQUFTLENBQUNDLE1BQU0sR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDaVAsSUFBSSxDQUFDQyxRQUFRLENBQUMsQ0FBQ29GLE1BQU0sQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDdFUsTUFBTSxHQUFHLENBQUM7SUFDOUU7O0lBRUE7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtFQVBFO0lBQUFvQyxHQUFBO0lBQUFuQyxLQUFBLEVBUUEsU0FBQWtNLE1BQU1BLENBQUMxSyxJQUFJLEVBQUV3UixFQUFFLEVBQUU7TUFDZixJQUFNc0IsTUFBTSxHQUFHLE9BQU85UyxJQUFJLEtBQUssUUFBUSxHQUFHQSxJQUFJLEdBQUcsU0FBUztNQUMxRCxJQUFNb0ssUUFBUSxHQUFHLE9BQU9vSCxFQUFFLEtBQUssVUFBVSxHQUFHQSxFQUFFLEdBQUd4UixJQUFJO01BQ3JELElBQUksSUFBSSxDQUFDekIsTUFBTSxLQUFLLENBQUMsRUFBRTtRQUNyQixNQUFNLElBQUlvRixLQUFLLGlCQUFBMkMsTUFBQSxDQUFZd00sTUFBTSwyQ0FBQXhNLE1BQUEsQ0FBbUMsSUFBSSxDQUFDL0gsTUFBTSxvQkFBaUIsQ0FBQztNQUNuRztNQUNBLE9BQU82TCxRQUFRLENBQUMvTCxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQzBFLGVBQWUsQ0FBQyxDQUFDLENBQUM7SUFDcEQ7O0lBRUE7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7RUFORTtJQUFBcEMsR0FBQTtJQUFBbkMsS0FBQSxFQU9BLFNBQUF5RSxJQUFJQSxDQUFDMEIsSUFBSSxFQUE4QjtNQUFBLElBQTVCZ0UsSUFBSSxHQUFBckssU0FBQSxDQUFBQyxNQUFBLFFBQUFELFNBQUEsUUFBQXNFLFNBQUEsR0FBQXRFLFNBQUEsTUFBRyxJQUFJLENBQUMwRCxJQUFJLENBQUM7TUFDMUIsSUFBSTJDLElBQUksWUFBWWdGLGNBQWMsRUFBRTtRQUNsQyxPQUFPaEYsSUFBSTtNQUNiO01BQUMsU0FBQW9PLEtBQUEsR0FBQXpVLFNBQUEsQ0FBQUMsTUFBQSxFQUg4QmtKLElBQUksT0FBQXhILEtBQUEsQ0FBQThTLEtBQUEsT0FBQUEsS0FBQSxXQUFBQyxLQUFBLE1BQUFBLEtBQUEsR0FBQUQsS0FBQSxFQUFBQyxLQUFBO1FBQUp2TCxJQUFJLENBQUF1TCxLQUFBLFFBQUExVSxTQUFBLENBQUEwVSxLQUFBO01BQUE7TUFJbkMsT0FBQTdULFVBQUEsQ0FBV3dLLGNBQWMsR0FBQ2hGLElBQUksRUFBRWdFLElBQUksRUFBQXJDLE1BQUEsQ0FBS21CLElBQUk7SUFDL0M7O0lBRUE7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtFQVBFO0lBQUE5RyxHQUFBO0lBQUFuQyxLQUFBLEVBUUEsU0FBQXlVLEtBQUtBLENBQUEsRUFBZTtNQUFBLElBQWQ3UCxPQUFPLEdBQUE5RSxTQUFBLENBQUFDLE1BQUEsUUFBQUQsU0FBQSxRQUFBc0UsU0FBQSxHQUFBdEUsU0FBQSxNQUFHLENBQUMsQ0FBQztNQUNoQixPQUFPLElBQUE0VSxpQkFBVSxFQUFDLElBQUksQ0FBQ2hRLGdCQUFnQixDQUFDLENBQUMsRUFBRUUsT0FBTyxDQUFDO0lBQ3JEOztJQUVBO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtFQUxFO0lBQUF6QyxHQUFBO0lBQUFuQyxLQUFBLEVBTUEsU0FBQTJVLEdBQUdBLENBQUNDLFdBQVcsRUFBRTtNQUNmQSxXQUFXLENBQUMsSUFBSSxDQUFDO01BQ2pCLE9BQU8sSUFBSTtJQUNiOztJQUVBO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0VBTkU7SUFBQXpTLEdBQUE7SUFBQW5DLEtBQUEsRUFPQSxTQUFBeUosSUFBSUEsQ0FBQSxFQUFlO01BQUEsSUFBQW9MLE9BQUE7TUFBQSxJQUFkalEsT0FBTyxHQUFBOUUsU0FBQSxDQUFBQyxNQUFBLFFBQUFELFNBQUEsUUFBQXNFLFNBQUEsR0FBQXRFLFNBQUEsTUFBRyxDQUFDLENBQUM7TUFDZixJQUFNb0ksT0FBTyxHQUFHLElBQUFvQyxzQkFBVSxFQUFDLElBQUksQ0FBQzdHLE9BQU8sQ0FBQyxDQUFDO01BQ3pDLElBQU1qQyxJQUFJLEdBQUcsTUFBTTtNQUNuQixPQUFPLElBQUksQ0FBQzBLLE1BQU0sQ0FBQzFLLElBQUksRUFBRSxVQUFDOUIsQ0FBQyxFQUFLO1FBQzlCLElBQUlBLENBQUMsSUFBSUEsQ0FBQyxDQUFDMEcsUUFBUSxLQUFLLE1BQU0sRUFBRTtVQUM5QixNQUFNLElBQUlySCxTQUFTLG9CQUFBK0ksTUFBQSxDQUFvQnRHLElBQUksNENBQXlDLENBQUM7UUFDdkY7UUFDQSxJQUFNc1QsRUFBRSxHQUFHLElBQUF4SyxzQkFBVSxFQUFDdUssT0FBSSxDQUFDcFIsT0FBTyxDQUFDLENBQUMsQ0FBQytGLGFBQWEsQ0FBQzlKLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsSUFBQXlJLCtCQUF3QixFQUFDMk0sRUFBRSxFQUFFNU0sT0FBTyxDQUFDLEVBQUU7VUFDMUMsTUFBTSxJQUFJbkosU0FBUyxvQkFBQStJLE1BQUEsQ0FBb0J0RyxJQUFJLHdDQUFxQyxDQUFDO1FBQ25GO1FBQ0EsSUFBTTBKLFlBQVksR0FBR0QseUJBQXlCLENBQUM0SixPQUFJLEVBQUVqUSxPQUFPLENBQUM7UUFDN0QsT0FBT2lRLE9BQUksQ0FBQ3BRLElBQUksQ0FBQ3FRLEVBQUUsRUFBRSxJQUFJLEVBQUU1SixZQUFZLENBQUM7TUFDMUMsQ0FBQyxDQUFDO0lBQ0o7O0lBRUE7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0VBTEU7SUFBQS9JLEdBQUE7SUFBQW5DLEtBQUEsRUFNQSxTQUFBK1UsU0FBU0EsQ0FBQSxFQUFHO01BQ1YsT0FBTyxJQUFJLENBQUN4RixXQUFXLENBQUMsVUFBQzdQLENBQUM7UUFBQSxPQUFLLE9BQU9BLENBQUMsQ0FBQzhILElBQUksQ0FBQyxDQUFDLEtBQUssUUFBUTtNQUFBLEVBQUM7SUFDOUQ7RUFBQztBQUFBO0FBR0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTd04sd0JBQXdCQSxDQUFDeEssaUJBQWlCLEVBQUU7RUFDbkQsSUFBTXRDLE9BQU8sR0FBRyxJQUFBb0Msc0JBQVUsRUFBQ0UsaUJBQWlCLENBQUMvRyxPQUFPLENBQUMsQ0FBQztFQUN0RCxJQUFNd1IsY0FBYyxHQUFHekssaUJBQWlCLENBQUMxRyxlQUFlLENBQUM7RUFDekQsSUFBTW9SLGVBQWUsR0FBR0QsY0FBYyxDQUFDM1IsUUFBUSxDQUFDO0VBQ2hELElBQU02UixXQUFXLEdBQUdELGVBQWUsQ0FBQ3hKLE9BQU8sQ0FBQyxDQUFDO0VBQzdDLElBQUEwSixzQkFBQSxHQUdJdkwsK0JBQStCLENBQUNXLGlCQUFpQixFQUFFdEMsT0FBTyxDQUFDO0lBRjdENkIsYUFBYSxHQUFBcUwsc0JBQUEsQ0FBYnJMLGFBQWE7SUFDYkUsY0FBYyxHQUFBbUwsc0JBQUEsQ0FBZG5MLGNBQWM7RUFFaEIsSUFBTW9MLGtCQUFrQixHQUFHSixjQUFjLENBQUNqUixlQUFlLENBQUM7RUFFMURpUixjQUFjLENBQUN2SCxVQUFVLENBQUFqTCxhQUFBLENBQUFBLGFBQUEsS0FDcEIrSCxpQkFBaUIsQ0FBQzFHLGVBQWUsQ0FBQyxDQUFDTCxPQUFPLENBQUMsQ0FBQ3VHLE9BQU8sR0FDbkRELGFBQWEsQ0FDakIsQ0FBQztFQUNGa0wsY0FBYyxDQUFDalIsZUFBZSxDQUFDLEdBQUcsSUFBSXdILEdBQUcsSUFBQTFELE1BQUEsQ0FBQS9HLGtCQUFBLENBQUtzVSxrQkFBa0IsR0FBQXRVLGtCQUFBLENBQUtrSixjQUFjLEVBQUMsQ0FBQztFQUVyRixJQUFJLE9BQU8vQixPQUFPLENBQUNvTixpQkFBaUIsS0FBSyxVQUFVLElBQUlwTixPQUFPLENBQUNvTixpQkFBaUIsQ0FBQ0gsV0FBVyxDQUFDM04sSUFBSSxDQUFDLEVBQUU7SUFDbEcsSUFBTStOLFFBQVEsR0FBR0osV0FBVyxDQUFDM04sSUFBSTtJQUNqQztJQUNBO0lBQ0EsSUFBTWdPLFFBQVEsR0FBR3ROLE9BQU8sQ0FBQ3VOLHVCQUF1QixDQUFDRixRQUFRLENBQUM7SUFDMUQsSUFBTUcsUUFBUSxHQUFHekwsY0FBYyxDQUFDMUssR0FBRyxDQUFDaVcsUUFBUSxDQUFDO0lBQzdDLElBQU1HLFFBQVEsR0FBR04sa0JBQWtCLENBQUM5VixHQUFHLENBQUNpVyxRQUFRLENBQUM7O0lBRWpEO0lBQ0EsSUFBSUUsUUFBUSxLQUFLQyxRQUFRLEVBQUU7TUFDekJWLGNBQWMsQ0FBQ3hJLFFBQVEsQ0FBQyxDQUFDO0lBQzNCO0VBQ0Y7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMQSxJQU1NNUIsd0JBQXdCLDBCQUFBK0ssZUFBQTtFQUM1QixTQUFBL0sseUJBQVluRSxLQUFLLEVBQUV5RCxJQUFJLEVBQUVTLFVBQVUsRUFBRTtJQUFBLElBQUFpTCxPQUFBO0lBQUE5VCxlQUFBLE9BQUE4SSx3QkFBQTtJQUNuQ2dMLE9BQUEsR0FBQXpYLFVBQUEsT0FBQXlNLHdCQUFBLEdBQU1uRSxLQUFLO0lBQ1gsSUFBQUMsaUJBQVUsRUFBQWtQLE9BQUEsRUFBTy9SLGVBQWUsRUFBRXFHLElBQUksQ0FBQztJQUN2QyxJQUFBeEQsaUJBQVUsRUFBQWtQLE9BQUEsRUFBTzlSLFdBQVcsRUFBRTZHLFVBQVUsQ0FBQztJQUFDLE9BQUFpTCxPQUFBO0VBQzVDOztFQUVBO0FBQ0Y7QUFDQTtBQUNBO0VBSEV4VixTQUFBLENBQUF3Syx3QkFBQSxFQUFBK0ssZUFBQTtFQUFBLE9BQUF4VCxZQUFBLENBQUF5SSx3QkFBQTtJQUFBMUksR0FBQTtJQUFBbkMsS0FBQSxFQUlBLFNBQUF5TSxRQUFRQSxDQUFBLEVBQVU7TUFBQSxTQUFBcUosS0FBQSxHQUFBaFcsU0FBQSxDQUFBQyxNQUFBLEVBQU5rSixJQUFJLE9BQUF4SCxLQUFBLENBQUFxVSxLQUFBLEdBQUFDLEtBQUEsTUFBQUEsS0FBQSxHQUFBRCxLQUFBLEVBQUFDLEtBQUE7UUFBSjlNLElBQUksQ0FBQThNLEtBQUEsSUFBQWpXLFNBQUEsQ0FBQWlXLEtBQUE7TUFBQTtNQUNkLElBQU1DLE1BQU0sR0FBQTlXLGFBQUEsQ0FBQTJMLHdCQUFBLHVCQUFxQjVCLElBQUksQ0FBQztNQUN0QytMLHdCQUF3QixDQUFDLElBQUksQ0FBQztNQUM5QixPQUFPZ0IsTUFBTTtJQUNmOztJQUVBO0FBQ0Y7QUFDQTtBQUNBO0VBSEU7SUFBQTdULEdBQUE7SUFBQW5DLEtBQUEsRUFJQSxTQUFBK0YsUUFBUUEsQ0FBQSxFQUFVO01BQUEsU0FBQWtRLEtBQUEsR0FBQW5XLFNBQUEsQ0FBQUMsTUFBQSxFQUFOa0osSUFBSSxPQUFBeEgsS0FBQSxDQUFBd1UsS0FBQSxHQUFBQyxLQUFBLE1BQUFBLEtBQUEsR0FBQUQsS0FBQSxFQUFBQyxLQUFBO1FBQUpqTixJQUFJLENBQUFpTixLQUFBLElBQUFwVyxTQUFBLENBQUFvVyxLQUFBO01BQUE7TUFDZCxJQUFNRixNQUFNLEdBQUE5VyxhQUFBLENBQUEyTCx3QkFBQSx1QkFBcUI1QixJQUFJLENBQUM7TUFDdEMrTCx3QkFBd0IsQ0FBQyxJQUFJLENBQUM7TUFDOUIsT0FBT2dCLE1BQU07SUFDZjs7SUFFQTtFQUFBO0lBQUE3VCxHQUFBO0lBQUFuQyxLQUFBLEVBQ0EsU0FBQXVNLG9CQUFvQkEsQ0FBQSxFQUFHO01BQ3JCLE1BQU0sSUFBSXBILEtBQUssQ0FBQyx1RUFBdUUsQ0FBQztJQUMxRjtFQUFDO0FBQUEsRUE5Qm9DZ0csY0FBYztBQWlDckQsSUFBSWdMLHNCQUFlLEVBQUU7RUFDbkJ4VyxNQUFNLENBQUNjLGNBQWMsQ0FBQzBLLGNBQWMsQ0FBQzdMLFNBQVMsRUFBRTZXLHNCQUFlLEVBQUU7SUFDL0QzVixZQUFZLEVBQUUsSUFBSTtJQUNsQlIsS0FBSyxFQUFFLFNBQVM2QixRQUFRQSxDQUFBLEVBQUc7TUFDekIsSUFBTXVVLElBQUksR0FBRyxJQUFJLENBQUMxUixnQkFBZ0IsQ0FBQyxDQUFDLENBQUN5UixzQkFBZSxDQUFDLENBQUMsQ0FBQztNQUN2RCxJQUFNak8sT0FBTyxHQUFHLElBQUFvQyxzQkFBVSxFQUFDLElBQUksQ0FBQzdHLE9BQU8sQ0FBQyxDQUFDO01BQ3pDLE9BQUFkLGVBQUEsQ0FBQUEsZUFBQSxLQUNHd1Qsc0JBQWUsY0FBSTtRQUFFLE9BQU8sSUFBSTtNQUFFLENBQUMsb0JBQ3BDRSxJQUFJQSxDQUFBLEVBQUc7UUFDTCxJQUFNQSxJQUFJLEdBQUdELElBQUksQ0FBQ0MsSUFBSSxDQUFDLENBQUM7UUFDeEIsSUFBSUEsSUFBSSxDQUFDQyxJQUFJLEVBQUU7VUFDYixPQUFPO1lBQUVBLElBQUksRUFBRTtVQUFLLENBQUM7UUFDdkI7UUFDQSxPQUFPO1VBQ0xBLElBQUksRUFBRSxLQUFLO1VBQ1h0VyxLQUFLLEVBQUVrSSxPQUFPLENBQUNzQixhQUFhLENBQUM2TSxJQUFJLENBQUNyVyxLQUFLO1FBQ3pDLENBQUM7TUFDSCxDQUFDO0lBRUw7RUFDRixDQUFDLENBQUM7QUFDSjtBQUVBLFNBQVN1VyxjQUFjQSxDQUFDeEUsSUFBSSxFQUFFeUUsWUFBWSxFQUFFO0VBQzFDN1csTUFBTSxDQUFDYyxjQUFjLENBQUMwSyxjQUFjLENBQUM3TCxTQUFTLEVBQUV5UyxJQUFJLEVBQUU7SUFDcER4UyxHQUFHLFdBQUhBLEdBQUdBLENBQUEsRUFBRztNQUNKLE1BQU0sSUFBSTRGLEtBQUssQ0FBQyxJQUFBc1IsMkJBQUksbURBQUEzTyxNQUFBLENBQ29CaUssSUFBSSxzSkFBQWpLLE1BQUEsQ0FFeEMwTyxZQUFZLGFBQ2YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNEdlUsVUFBVSxFQUFFLEtBQUs7SUFDakJ6QixZQUFZLEVBQUU7RUFDaEIsQ0FBQyxDQUFDO0FBQ0o7QUFFQStWLGNBQWMsQ0FBQyxNQUFNLEVBQUUsaURBQWlELENBQUM7QUFDekVBLGNBQWMsQ0FBQyxPQUFPLEVBQUUsa0RBQWtELENBQUM7QUFDM0VBLGNBQWMsQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDO0FBQzlCQSxjQUFjLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQztBQUM3QkEsY0FBYyxDQUFDLGlCQUFpQixFQUFFLEVBQUUsQ0FBQztBQUFDLElBQUFHLFFBQUEsR0FBQUMsT0FBQSxjQUV2QnhMLGNBQWM7QUFBQXlMLE1BQUEsQ0FBQUQsT0FBQSxHQUFBQSxPQUFBLENBQUFFLE9BQUEiLCJpZ25vcmVMaXN0IjpbXX0=
//# sourceMappingURL=ShallowWrapper.js.map