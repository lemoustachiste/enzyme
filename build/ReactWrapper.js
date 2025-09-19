"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _arrayPrototype = _interopRequireDefault(require("array.prototype.flat"));
var _hasown = _interopRequireDefault(require("hasown"));
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
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _construct(t, e, r) { if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && _setPrototypeOf(p, r.prototype), p; }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var NODE = (0, _Utils.sym)('__node__');
var NODES = (0, _Utils.sym)('__nodes__');
var RENDERER = (0, _Utils.sym)('__renderer__');
var UNRENDERED = (0, _Utils.sym)('__unrendered__');
var ROOT = (0, _Utils.sym)('__root__');
var OPTIONS = (0, _Utils.sym)('__options__');
var ROOT_NODES = (0, _Utils.sym)('__rootNodes__');
var WRAPPING_COMPONENT = (0, _Utils.sym)('__wrappingComponent__');
var LINKED_ROOTS = (0, _Utils.sym)('__linkedRoots__');
var UPDATED_BY = (0, _Utils.sym)('__updatedBy__');

/**
 * Finds all nodes in the current wrapper nodes' render trees that match the provided predicate
 * function.
 *
 * @param {ReactWrapper} wrapper
 * @param {Function} predicate
 * @param {Function} filter
 * @returns {ReactWrapper}
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
 * @param {ReactWrapper} wrapper
 * @param {Function} predicate
 * @returns {ReactWrapper}
 */
function filterWhereUnwrapped(wrapper, predicate) {
  return wrapper.wrap(wrapper.getNodesInternal().filter(predicate).filter(Boolean));
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
  if (!nodes) {
    (0, _Utils.privateSet)(wrapper, NODE, null);
    (0, _Utils.privateSet)(wrapper, NODES, []);
  } else if (!Array.isArray(nodes)) {
    (0, _Utils.privateSet)(wrapper, NODE, nodes);
    (0, _Utils.privateSet)(wrapper, NODES, [nodes]);
  } else {
    (0, _Utils.privateSet)(wrapper, NODE, nodes[0]);
    (0, _Utils.privateSet)(wrapper, NODES, nodes);
  }
  (0, _Utils.privateSet)(wrapper, 'length', wrapper[NODES].length);
}

/**
 * @class ReactWrapper
 */
var ReactWrapper = /*#__PURE__*/function () {
  function ReactWrapper(nodes, root) {
    var passedOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    _classCallCheck(this, ReactWrapper);
    if (!global.window && !global.document) {
      throw new Error('It looks like you called `mount()` without a global document being loaded.');
    }
    var options = (0, _Utils.makeOptions)(passedOptions);
    if (!root) {
      var adapter = (0, _getAdapter["default"])(options);
      if (!adapter.isValidElement(nodes)) {
        throw new TypeError('ReactWrapper can only wrap valid elements');
      }
      var renderer = adapter.createRenderer(_objectSpread({
        mode: 'mount'
      }, options));
      (0, _Utils.privateSet)(this, RENDERER, renderer);
      renderer.render(nodes, options.context);
      (0, _Utils.privateSet)(this, ROOT, this);
      privateSetNodes(this, this[RENDERER].getNode());
      (0, _Utils.privateSet)(this, OPTIONS, options);
      (0, _Utils.privateSet)(this, LINKED_ROOTS, []);
      if ((0, _Utils.isCustomComponent)(options.wrappingComponent, adapter)) {
        if (typeof this[RENDERER].getWrappingComponentRenderer !== 'function') {
          throw new TypeError('your adapter does not support `wrappingComponent`. Try upgrading it!');
        }
        (0, _Utils.privateSet)(this, WRAPPING_COMPONENT,
        // eslint-disable-next-line no-use-before-define
        new WrappingComponentWrapper(this, this[RENDERER].getWrappingComponentRenderer()));
        this[LINKED_ROOTS].push(this[WRAPPING_COMPONENT]);
      }
    } else {
      (0, _Utils.privateSet)(this, RENDERER, root[RENDERER]);
      (0, _Utils.privateSet)(this, ROOT, root);
      privateSetNodes(this, nodes);
      (0, _Utils.privateSet)(this, ROOT_NODES, root[NODES]);
      (0, _Utils.privateSet)(this, OPTIONS, root[OPTIONS]);
      (0, _Utils.privateSet)(this, LINKED_ROOTS, []);
    }
    (0, _Utils.privateSet)(this, UNRENDERED, nodes);
    (0, _Utils.privateSet)(this, UPDATED_BY, null);
  }

  /**
   * Returns the root wrapper
   *
   * @return {ReactWrapper}
   */
  return _createClass(ReactWrapper, [{
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
        throw new Error('ReactWrapper::getNode() can only be called when wrapping one node');
      }
      return this[NODES][0];
    }

    /**
     * Returns the the wrapped components.
     *
     * @return {Array<ReactComponent>}
     */
  }, {
    key: "getNodesInternal",
    value: function getNodesInternal() {
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
      var _this = this;
      return this.single('getElement', function () {
        return (0, _getAdapter["default"])(_this[OPTIONS]).nodeToElement(_this[NODE]);
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
      var _this2 = this;
      return this[NODES].map(function (n) {
        return (0, _getAdapter["default"])(_this2[OPTIONS]).nodeToElement(n);
      });
    }

    // eslint-disable-next-line class-methods-use-this
  }, {
    key: "getNode",
    value: function getNode() {
      throw new Error('ReactWrapper::getNode() is no longer supported. Use ReactWrapper::instance() instead');
    }

    // eslint-disable-next-line class-methods-use-this
  }, {
    key: "getNodes",
    value: function getNodes() {
      throw new Error('ReactWrapper::getNodes() is no longer supported.');
    }

    /**
     * Returns the outer most DOMComponent of the current wrapper.
     *
     * NOTE: can only be called on a wrapper of a single node.
     *
     * @returns {DOMComponent}
     */
  }, {
    key: "getDOMNode",
    value: function getDOMNode() {
      var adapter = (0, _getAdapter["default"])(this[OPTIONS]);
      return this.single('getDOMNode', function (n) {
        return adapter.nodeToHostNode(n, true);
      });
    }

    /**
     * If the root component contained a ref, you can access it here and get the relevant
     * react component instance or HTML element instance.
     *
     * NOTE: can only be called on a wrapper instance that is also the root instance.
     *
     * @param {String} refname
     * @returns {ReactComponent | HTMLElement}
     */
  }, {
    key: "ref",
    value: function ref(refname) {
      if (this[ROOT] !== this) {
        throw new Error('ReactWrapper::ref(refname) can only be called on the root');
      }
      return this.instance().refs[refname];
    }

    /**
     * Returns the wrapper's underlying instance.
     *
     * Example:
     * ```
     * const wrapper = mount(<MyComponent />);
     * const inst = wrapper.instance();
     * expect(inst).to.be.instanceOf(MyComponent);
     * ```
     * @returns {ReactComponent|DOMComponent}
     */
  }, {
    key: "instance",
    value: function instance() {
      var _this3 = this;
      return this.single('instance', function () {
        return _this3[NODE].instance;
      });
    }

    /**
     * If a `wrappingComponent` was passed in `options`, this methods returns a `ReactWrapper` around
     * the rendered `wrappingComponent`. This `ReactWrapper` can be used to update the
     * `wrappingComponent`'s props, state, etc.
     *
     * @returns ReactWrapper
     */
  }, {
    key: "getWrappingComponent",
    value: function getWrappingComponent() {
      if (this[ROOT] !== this) {
        throw new Error('ReactWrapper::getWrappingComponent() can only be called on the root');
      }
      if (!this[OPTIONS].wrappingComponent) {
        throw new Error('ReactWrapper::getWrappingComponent() can only be called on a wrapper that was originally passed a `wrappingComponent` option');
      }
      return this[WRAPPING_COMPONENT];
    }

    /**
     * Forces a re-render. Useful to run before checking the render output if something external
     * may be updating the state of the component somewhere.
     *
     * NOTE: no matter what instance this is called on, it will always update the root.
     *
     * @returns {ReactWrapper}
     */
  }, {
    key: "update",
    value: function update() {
      var _this4 = this;
      var root = this[ROOT];
      if (this !== root) {
        return root.update();
      }
      privateSetNodes(this, this[RENDERER].getNode());
      this[LINKED_ROOTS].forEach(function (linkedRoot) {
        if (linkedRoot !== _this4[UPDATED_BY]) {
          /* eslint-disable no-param-reassign */
          // Only update a linked it root if it is not the originator of our update().
          // This is needed to prevent infinite recursion when there is a bi-directional
          // link between two roots.
          linkedRoot[UPDATED_BY] = _this4;
          try {
            linkedRoot.update();
          } finally {
            linkedRoot[UPDATED_BY] = null;
          }
        }
      });
      return this;
    }

    /**
     * A method that unmounts the component. This can be used to simulate a component going through
     * and unmount/mount lifecycle.
     *
     * @returns {ReactWrapper}
     */
  }, {
    key: "unmount",
    value: function unmount() {
      var _this5 = this;
      if (this[ROOT] !== this) {
        throw new Error('ReactWrapper::unmount() can only be called on the root');
      }
      this.single('unmount', function () {
        _this5[RENDERER].unmount();
        _this5.update();
      });
      return this;
    }

    /**
     * A method that re-mounts the component, if it is not currently mounted.
     * This can be used to simulate a component going through
     * an unmount/mount lifecycle.
     *
     * @returns {ReactWrapper}
     */
  }, {
    key: "mount",
    value: function mount() {
      var _this6 = this;
      if (this[ROOT] !== this) {
        throw new Error('ReactWrapper::mount() can only be called on the root');
      }
      this[RENDERER].render(this[UNRENDERED], this[OPTIONS].context, function () {
        return _this6.update();
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
     * @returns {ReactWrapper}
     */
  }, {
    key: "setProps",
    value: function setProps(props) {
      var _this7 = this;
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      if (this[ROOT] !== this) {
        throw new Error('ReactWrapper::setProps() can only be called on the root');
      }
      if (arguments.length > 1 && typeof callback !== 'function') {
        throw new TypeError('ReactWrapper::setProps() expects a function as its second argument');
      }
      var adapter = (0, _getAdapter["default"])(this[OPTIONS]);
      this[UNRENDERED] = (0, _Utils.cloneElement)(adapter, this[UNRENDERED], props);
      this[RENDERER].render(this[UNRENDERED], null, function () {
        _this7.update();
        if (callback) {
          callback();
        }
      });
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
     * @returns {ReactWrapper}
     */
  }, {
    key: "setState",
    value: function setState(state) {
      var _this8 = this;
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      if (this.instance() === null || this.getNodeInternal().nodeType !== 'class') {
        throw new Error('ReactWrapper::setState() can only be called on class components');
      }
      if (arguments.length > 1 && typeof callback !== 'function') {
        throw new TypeError('ReactWrapper::setState() expects a function as its second argument');
      }
      this.instance().setState(state, function () {
        _this8.update();
        if (callback) {
          var adapter = (0, _getAdapter["default"])(_this8[OPTIONS]);
          var instance = _this8.instance();
          if (adapter.invokeSetStateCallback) {
            adapter.invokeSetStateCallback(instance, callback);
          } else {
            callback.call(instance);
          }
        }
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
     * @returns {ReactWrapper}
     */
  }, {
    key: "setContext",
    value: function setContext(context) {
      var _this9 = this;
      if (this[ROOT] !== this) {
        throw new Error('ReactWrapper::setContext() can only be called on the root');
      }
      if (!this[OPTIONS].context) {
        throw new Error('ReactWrapper::setContext() can only be called on a wrapper that was originally passed a context option');
      }
      this[RENDERER].render(this[UNRENDERED], context, function () {
        return _this9.update();
      });
      return this;
    }

    /**
     * Whether or not a given react element exists in the mount render tree.
     *
     * Example:
     * ```
     * const wrapper = mount(<MyComponent />);
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
     * Whether or not a given react element exists in the current render tree.
     * It will determine if one of the wrappers element "looks like" the expected
     * element by checking if all props of the expected element are present
     * on the wrappers element and equals to each other.
     *
     * Example:
     * ```
     * // MyComponent outputs <div><div class="foo">Hello</div></div>
     * const wrapper = mount(<MyComponent />);
     * expect(wrapper.containsMatchingElement(<div>Hello</div>)).to.equal(true);
     * ```
     *
     * @param {ReactElement} node
     * @returns {Boolean}
     */
  }, {
    key: "containsMatchingElement",
    value: function containsMatchingElement(node) {
      var rstNode = (0, _getAdapter["default"])(this[OPTIONS]).elementToNode(node);
      var predicate = function predicate(other) {
        return (0, _Utils.nodeMatches)(rstNode, other, function (a, b) {
          return a <= b;
        });
      };
      return findWhereUnwrapped(this, predicate).length > 0;
    }

    /**
     * Whether or not all the given react elements exist in the current render tree.
     * It will determine if one of the wrappers element "looks like" the expected
     * element by checking if all props of the expected element are present
     * on the wrappers element and equals to each other.
     *
     * Example:
     * ```
     * const wrapper = mount(<MyComponent />);
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
      var _this0 = this;
      if (!Array.isArray(nodes)) {
        throw new TypeError('nodes should be an Array');
      }
      return nodes.every(function (node) {
        return _this0.containsMatchingElement(node);
      });
    }

    /**
     * Whether or not one of the given react elements exists in the current render tree.
     * It will determine if one of the wrappers element "looks like" the expected
     * element by checking if all props of the expected element are present
     * on the wrappers element and equals to each other.
     *
     * Example:
     * ```
     * const wrapper = mount(<MyComponent />);
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
      var _this1 = this;
      return Array.isArray(nodes) && nodes.some(function (node) {
        return _this1.containsMatchingElement(node);
      });
    }

    /**
     * Whether or not a given react element exists in the render tree.
     *
     * Example:
     * ```
     * const wrapper = mount(<MyComponent />);
     * expect(wrapper.contains(<div className="foo bar" />)).to.equal(true);
     * ```
     *
     * @param {ReactElement} node
     * @returns {Boolean}
     */
  }, {
    key: "equals",
    value: function equals(node) {
      var _this10 = this;
      return this.single('equals', function () {
        return (0, _Utils.nodeEqual)(_this10.getNodeInternal(), node);
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
     * const wrapper = mount(<MyComponent />);
     * expect(wrapper.matchesElement(<div>Hello</div>)).to.equal(true);
     * ```
     *
     * @param {ReactElement} node
     * @returns {Boolean}
     */
  }, {
    key: "matchesElement",
    value: function matchesElement(node) {
      var _this11 = this;
      return this.single('matchesElement', function () {
        var adapter = (0, _getAdapter["default"])(_this11[OPTIONS]);
        var rstNode = adapter.elementToNode(node);
        return (0, _Utils.nodeMatches)(rstNode, _this11.getNodeInternal(), function (a, b) {
          return a <= b;
        });
      });
    }

    /**
     * Finds every node in the render tree of the current wrapper that matches the provided selector.
     *
     * @param {EnzymeSelector} selector
     * @returns {ReactWrapper}
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
      return nodes.every(function (node) {
        return (0, _Utils.renderedDive)(node);
      });
    }

    /**
     * Returns a new wrapper instance with only the nodes of the current wrapper instance that match
     * the provided predicate function.
     *
     * @param {Function} predicate
     * @returns {ReactWrapper}
     */
  }, {
    key: "filterWhere",
    value: function filterWhere(predicate) {
      var _this12 = this;
      return filterWhereUnwrapped(this, function (n) {
        return predicate(_this12.wrap(n));
      });
    }

    /**
     * Returns a new wrapper instance with only the nodes of the current wrapper instance that match
     * the provided selector.
     *
     * @param {EnzymeSelector} selector
     * @returns {ReactWrapper}
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
     * @returns {ReactWrapper}
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
      var adapter = (0, _getAdapter["default"])(this[OPTIONS]);
      return this.single('text', function (n) {
        return (0, _RSTTraversal.getTextFromHostNodes)(n, adapter);
      });
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
      var adapter = (0, _getAdapter["default"])(this[OPTIONS]);
      return this.single('html', function (n) {
        return (0, _RSTTraversal.getHTMLFromHostNodes)(n, adapter);
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
     * @param {Object} mock (optional)
     * @returns {ReactWrapper}
     */
  }, {
    key: "simulate",
    value: function simulate(event) {
      var _this13 = this;
      var mock = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this.single('simulate', function (n) {
        _this13[RENDERER].simulateEvent(n, event, mock);
        _this13[ROOT].update();
        return _this13;
      });
    }

    /**
     * Used to simulate throwing a rendering error. Pass an error to throw.
     *
     * @param {String} error
     * @returns {ReactWrapper}
     */
  }, {
    key: "simulateError",
    value: function simulateError(error) {
      var _this14 = this;
      if (this[ROOT] === this) {
        throw new Error('ReactWrapper::simulateError() may not be called on the root');
      }
      return this.single('simulateError', function (thisNode) {
        if (thisNode.nodeType === 'host') {
          throw new Error('ReactWrapper::simulateError() can only be called on custom components');
        }
        var renderer = _this14[RENDERER];
        if (typeof renderer.simulateError !== 'function') {
          throw new TypeError('your adapter does not support `simulateError`. Try upgrading it!');
        }
        var rootNode = getRootNodeInternal(_this14);
        var nodeHierarchy = [thisNode].concat(nodeParents(_this14, thisNode));
        renderer.simulateError(nodeHierarchy, rootNode, error);
        _this14[ROOT].update();
        return _this14;
      });
    }

    /**
     * Returns the props hash for the root node of the wrapper.
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
      var _this15 = this;
      var thisNode = this[ROOT] === this ? this[RENDERER].getNode() : this.getNodeInternal();
      if (this.instance() === null || thisNode.nodeType !== 'class') {
        throw new Error('ReactWrapper::state() can only be called on class components');
      }
      var _state = this.single('state', function () {
        return _this15.instance().state;
      });
      if (typeof name !== 'undefined') {
        if (_state == null) {
          throw new TypeError("ReactWrapper::state(\"".concat(name, "\") requires that `state` not be `null` or `undefined`"));
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
      var _this16 = this;
      if (this[ROOT] !== this) {
        throw new Error('ReactWrapper::context() can only be called on the root');
      }
      var instance = this.single('context', function () {
        return _this16.instance();
      });
      if (instance === null) {
        throw new Error('ReactWrapper::context() can only be called on wrapped nodes that have a non-null instance');
      }
      var _context = instance.context;
      if (typeof name !== 'undefined') {
        return _context[name];
      }
      return _context;
    }

    /**
     * Returns a new wrapper with all of the children of the current wrapper.
     *
     * @param {EnzymeSelector} [selector]
     * @returns {ReactWrapper}
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
     * @returns {ReactWrapper}
     */
  }, {
    key: "childAt",
    value: function childAt(index) {
      var _this17 = this;
      return this.single('childAt', function () {
        return _this17.children().at(index);
      });
    }

    /**
     * Returns a wrapper around all of the parents/ancestors of the wrapper. Does not include the node
     * in the current wrapper.
     *
     * NOTE: can only be called on a wrapper of a single node.
     *
     * @param {EnzymeSelector} [selector]
     * @returns {ReactWrapper}
     */
  }, {
    key: "parents",
    value: function parents(selector) {
      var _this18 = this;
      return this.single('parents', function (n) {
        var allParents = _this18.wrap(nodeParents(_this18, n));
        return selector ? allParents.filter(selector) : allParents;
      });
    }

    /**
     * Returns a wrapper around the immediate parent of the current node.
     *
     * @returns {ReactWrapper}
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
     * @returns {ReactWrapper}
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
     * Returns the value of  prop with the given name of the root node.
     *
     * @param {String} propName
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
      var _this19 = this;
      return this.single('invoke', function () {
        var handler = _this19.prop(propName);
        if (typeof handler !== 'function') {
          throw new TypeError('ReactWrapper::invoke() requires the name of a prop whose value is a function');
        }
        return function () {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          var response = typeof _this19[RENDERER].wrapInvoke === 'function' ? _this19[RENDERER].wrapInvoke(function () {
            return handler.apply(void 0, args);
          }) : handler.apply(void 0, args);
          _this19[ROOT].update();
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
      var _this20 = this;
      var adapter = (0, _getAdapter["default"])(this[OPTIONS]);
      if (typeof adapter.wrap !== 'function') {
        throw new RangeError('your adapter does not support `wrap`. Try upgrading it!');
      }
      return this.single('renderProp', function (n) {
        if (n.nodeType === 'host') {
          throw new TypeError('ReactWrapper::renderProp() can only be called on custom components');
        }
        if (typeof propName !== 'string') {
          throw new TypeError('ReactWrapper::renderProp(): `propName` must be a string');
        }
        var props = _this20.props();
        if (!(0, _hasown["default"])(props, propName)) {
          throw new Error("ReactWrapper::renderProp(): no prop called \u201C".concat(propName, "\u201C found"));
        }
        var propValue = props[propName];
        if (typeof propValue !== 'function') {
          throw new TypeError("ReactWrapper::renderProp(): expected prop \u201C".concat(propName, "\u201C to contain a function, but it holds \u201C").concat(_typeof(propValue), "\u201C"));
        }
        return function () {
          var element = propValue.apply(void 0, arguments);
          var wrapped = adapter.wrap(element);
          return _this20.wrap(wrapped, null, _this20[OPTIONS]);
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
     * Returns the type of the root node of this wrapper. If it's a composite component, this will be
     * the component constructor. If it's native DOM node, it will be a string.
     *
     * @returns {String|Function}
     */
  }, {
    key: "type",
    value: function type() {
      return this.single('type', function (n) {
        return (0, _Utils.typeOfNode)(n);
      });
    }

    /**
     * Returns the name of the root node of this wrapper.
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
     * Returns whether or not the current root node has the given class name or not.
     *
     * NOTE: can only be called on a wrapper of a single node.
     *
     * @param {String} className
     * @returns {Boolean}
     */
  }, {
    key: "hasClass",
    value: function hasClass(className) {
      if (typeof className === 'string' && className.indexOf('.') !== -1) {
        // eslint-disable-next-line no-console
        console.warn('It looks like you\'re calling `ReactWrapper::hasClass()` with a CSS selector. hasClass() expects a class name, not a CSS selector.');
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
     * @returns {ReactWrapper}
     */
  }, {
    key: "forEach",
    value: function forEach(fn) {
      var _this21 = this;
      this.getNodesInternal().forEach(function (n, i) {
        return fn.call(_this21, _this21.wrap(n), i);
      });
      return this;
    }

    /**
     * Maps the current array of nodes to another array. Each node is passed in as a `ReactWrapper`
     * to the map function.
     *
     * @param {Function} fn
     * @returns {Array}
     */
  }, {
    key: "map",
    value: function map(fn) {
      var _this22 = this;
      return this.getNodesInternal().map(function (n, i) {
        return fn.call(_this22, _this22.wrap(n), i);
      });
    }

    /**
     * Reduces the current array of nodes to another array.
     * Each node is passed in as a `ShallowWrapper` to the reducer function.
     *
     * @param {Function} fn - the reducer function
     * @param {*} initialValue - the initial value
     * @returns {*}
     */
  }, {
    key: "reduce",
    value: function reduce(fn) {
      var _this23 = this;
      var initialValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      if (arguments.length > 1) {
        return this.getNodesInternal().reduce(function (accum, n, i) {
          return fn.call(_this23, accum, _this23.wrap(n), i);
        }, initialValue);
      }
      return this.getNodesInternal().reduce(function (accum, n, i) {
        return fn.call(_this23, i === 1 ? _this23.wrap(accum) : accum, _this23.wrap(n), i);
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
      var _this24 = this;
      var initialValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      if (arguments.length > 1) {
        return this.getNodesInternal().reduceRight(function (accum, n, i) {
          return fn.call(_this24, accum, _this24.wrap(n), i);
        }, initialValue);
      }
      return this.getNodesInternal().reduceRight(function (accum, n, i) {
        return fn.call(_this24, i === 1 ? _this24.wrap(accum) : accum, _this24.wrap(n), i);
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
        throw new Error('ReactWrapper::some() can not be called on the root');
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
      var _this25 = this;
      return this.getNodesInternal().some(function (n, i) {
        return predicate.call(_this25, _this25.wrap(n), i);
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
      var _this26 = this;
      return this.getNodesInternal().every(function (n, i) {
        return predicate.call(_this26, _this26.wrap(n), i);
      });
    }

    /**
     * Utility method used to create new wrappers with a mapping function that returns an array of
     * nodes in response to a single node wrapper. The returned wrapper is a single wrapper around
     * all of the mapped nodes flattened (and de-duplicated).
     *
     * @param {Function} fn
     * @returns {ReactWrapper}
     */
  }, {
    key: "flatMap",
    value: function flatMap(fn) {
      var _this27 = this;
      var nodes = this.getNodesInternal().map(function (n, i) {
        return fn.call(_this27, _this27.wrap(n), i);
      });
      var flattened = (0, _arrayPrototype["default"])(nodes, 1);
      return this.wrap(flattened.filter(Boolean));
    }

    /**
     * Finds all nodes in the current wrapper nodes' render trees that match the provided predicate
     * function.
     *
     * @param {Function} predicate
     * @returns {ReactWrapper}
     */
  }, {
    key: "findWhere",
    value: function findWhere(predicate) {
      var _this28 = this;
      return findWhereUnwrapped(this, function (n) {
        var node = _this28.wrap(n);
        return node.length > 0 && predicate(node);
      });
    }

    /**
     * Returns the node at a given index of the current wrapper.
     *
     * @param {Number} index
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
     * @param {Number} index
     * @returns {ReactWrapper}
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
     * @returns {ReactWrapper}
     */
  }, {
    key: "first",
    value: function first() {
      return this.at(0);
    }

    /**
     * Returns a wrapper around the last node of the current wrapper.
     *
     * @returns {ReactWrapper}
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
     * @param {Function} fn
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
     * @param {ReactWrapper|ReactElement|Array<ReactElement>} node
     * @returns {ReactWrapper}
     */
  }, {
    key: "wrap",
    value: function wrap(node) {
      var root = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this[ROOT];
      if (node instanceof ReactWrapper) {
        return node;
      }
      for (var _len2 = arguments.length, args = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }
      return _construct(ReactWrapper, [node, root].concat(args));
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
     * @returns {ReactWrapper}
     */
  }, {
    key: "tap",
    value: function tap(intercepter) {
      intercepter(this);
      return this;
    }

    /**
     * Detaches the react tree from the DOM. Runs `ReactDOM.unmountComponentAtNode()` under the hood.
     *
     * This method will most commonly be used as a "cleanup" method if you decide to use the
     * `attachTo` option in `mount(node, options)`.
     *
     * The method is intentionally not "fluent" (in that it doesn't return `this`) because you should
     * not be doing anything with this wrapper after this method is called.
     */
  }, {
    key: "detach",
    value: function detach() {
      if (this[ROOT] !== this) {
        throw new Error('ReactWrapper::detach() can only be called on the root');
      }
      if (!this[OPTIONS].attachTo) {
        throw new Error('ReactWrapper::detach() can only be called on when the `attachTo` option was passed into `mount()`.');
      }
      this[RENDERER].unmount();
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
 * A *special* "root" wrapper that represents the component passed as `wrappingComponent`.
 * It is linked to the primary root such that updates to it will update the primary,
 * and vice versa.
 *
 * @class WrappingComponentWrapper
 */
var WrappingComponentWrapper = /*#__PURE__*/function (_ReactWrapper) {
  /* eslint-disable class-methods-use-this */
  function WrappingComponentWrapper(root, renderer) {
    var _this29;
    _classCallCheck(this, WrappingComponentWrapper);
    _this29 = _callSuper(this, WrappingComponentWrapper, [renderer.getNode(), root]);
    (0, _Utils.privateSet)(_this29, ROOT, _this29);
    (0, _Utils.privateSet)(_this29, RENDERER, renderer);
    _this29[LINKED_ROOTS].push(root);
    return _this29;
  }
  _inherits(WrappingComponentWrapper, _ReactWrapper);
  return _createClass(WrappingComponentWrapper, [{
    key: "getWrappingComponent",
    value: function getWrappingComponent() {
      throw new TypeError('ReactWrapper::getWrappingComponent() can only be called on the root');
    }
  }]);
}(ReactWrapper);
if (_Utils.ITERATOR_SYMBOL) {
  Object.defineProperty(ReactWrapper.prototype, _Utils.ITERATOR_SYMBOL, {
    configurable: true,
    value: function iterator() {
      var iter = this[NODES][_Utils.ITERATOR_SYMBOL]();
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
  Object.defineProperty(ReactWrapper.prototype, prop, {
    get: function get() {
      throw new Error((0, _stringPrototype["default"])("\n        Attempted to access ReactWrapper::".concat(prop, ", which was previously a private property on\n        Enzyme ReactWrapper instances, but is no longer and should not be relied upon.\n        ").concat(extraMessage, "\n      ")));
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
var _default = exports["default"] = ReactWrapper;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfYXJyYXlQcm90b3R5cGUiLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0IiwicmVxdWlyZSIsIl9oYXNvd24iLCJfc3RyaW5nUHJvdG90eXBlIiwiX1V0aWxzIiwiX2dldEFkYXB0ZXIiLCJfRGVidWciLCJfUlNUVHJhdmVyc2FsIiwiX3NlbGVjdG9ycyIsImUiLCJfX2VzTW9kdWxlIiwiX2NhbGxTdXBlciIsInQiLCJvIiwiX2dldFByb3RvdHlwZU9mIiwiX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4iLCJfaXNOYXRpdmVSZWZsZWN0Q29uc3RydWN0IiwiUmVmbGVjdCIsImNvbnN0cnVjdCIsImNvbnN0cnVjdG9yIiwiYXBwbHkiLCJfdHlwZW9mIiwiVHlwZUVycm9yIiwiX2Fzc2VydFRoaXNJbml0aWFsaXplZCIsIlJlZmVyZW5jZUVycm9yIiwiT2JqZWN0Iiwic2V0UHJvdG90eXBlT2YiLCJnZXRQcm90b3R5cGVPZiIsImJpbmQiLCJfX3Byb3RvX18iLCJfaW5oZXJpdHMiLCJwcm90b3R5cGUiLCJjcmVhdGUiLCJ2YWx1ZSIsIndyaXRhYmxlIiwiY29uZmlndXJhYmxlIiwiZGVmaW5lUHJvcGVydHkiLCJfc2V0UHJvdG90eXBlT2YiLCJfY29uc3RydWN0IiwiciIsImFyZ3VtZW50cyIsInB1c2giLCJwIiwiQm9vbGVhbiIsInZhbHVlT2YiLCJjYWxsIiwiU3ltYm9sIiwiaXRlcmF0b3IiLCJvd25LZXlzIiwia2V5cyIsImdldE93blByb3BlcnR5U3ltYm9scyIsImZpbHRlciIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsImVudW1lcmFibGUiLCJfb2JqZWN0U3ByZWFkIiwibGVuZ3RoIiwiZm9yRWFjaCIsIl9kZWZpbmVQcm9wZXJ0eSIsImdldE93blByb3BlcnR5RGVzY3JpcHRvcnMiLCJkZWZpbmVQcm9wZXJ0aWVzIiwiX3RvUHJvcGVydHlLZXkiLCJfY2xhc3NDYWxsQ2hlY2siLCJhIiwibiIsIl9kZWZpbmVQcm9wZXJ0aWVzIiwia2V5IiwiX2NyZWF0ZUNsYXNzIiwiaSIsIl90b1ByaW1pdGl2ZSIsInRvUHJpbWl0aXZlIiwiU3RyaW5nIiwiTnVtYmVyIiwiTk9ERSIsInN5bSIsIk5PREVTIiwiUkVOREVSRVIiLCJVTlJFTkRFUkVEIiwiUk9PVCIsIk9QVElPTlMiLCJST09UX05PREVTIiwiV1JBUFBJTkdfQ09NUE9ORU5UIiwiTElOS0VEX1JPT1RTIiwiVVBEQVRFRF9CWSIsImZpbmRXaGVyZVVud3JhcHBlZCIsIndyYXBwZXIiLCJwcmVkaWNhdGUiLCJ1bmRlZmluZWQiLCJ0cmVlRmlsdGVyIiwiZmxhdE1hcCIsImdldE5vZGVJbnRlcm5hbCIsImZpbHRlcldoZXJlVW53cmFwcGVkIiwid3JhcCIsImdldE5vZGVzSW50ZXJuYWwiLCJnZXRSb290Tm9kZUludGVybmFsIiwiRXJyb3IiLCJub2RlUGFyZW50cyIsIm5vZGUiLCJwYXJlbnRzT2ZOb2RlIiwicHJpdmF0ZVNldE5vZGVzIiwibm9kZXMiLCJwcml2YXRlU2V0IiwiQXJyYXkiLCJpc0FycmF5IiwiUmVhY3RXcmFwcGVyIiwicm9vdCIsInBhc3NlZE9wdGlvbnMiLCJnbG9iYWwiLCJ3aW5kb3ciLCJkb2N1bWVudCIsIm9wdGlvbnMiLCJtYWtlT3B0aW9ucyIsImFkYXB0ZXIiLCJnZXRBZGFwdGVyIiwiaXNWYWxpZEVsZW1lbnQiLCJyZW5kZXJlciIsImNyZWF0ZVJlbmRlcmVyIiwibW9kZSIsInJlbmRlciIsImNvbnRleHQiLCJnZXROb2RlIiwiaXNDdXN0b21Db21wb25lbnQiLCJ3cmFwcGluZ0NvbXBvbmVudCIsImdldFdyYXBwaW5nQ29tcG9uZW50UmVuZGVyZXIiLCJXcmFwcGluZ0NvbXBvbmVudFdyYXBwZXIiLCJnZXRFbGVtZW50IiwiX3RoaXMiLCJzaW5nbGUiLCJub2RlVG9FbGVtZW50IiwiZ2V0RWxlbWVudHMiLCJfdGhpczIiLCJtYXAiLCJnZXROb2RlcyIsImdldERPTU5vZGUiLCJub2RlVG9Ib3N0Tm9kZSIsInJlZiIsInJlZm5hbWUiLCJpbnN0YW5jZSIsInJlZnMiLCJfdGhpczMiLCJnZXRXcmFwcGluZ0NvbXBvbmVudCIsInVwZGF0ZSIsIl90aGlzNCIsImxpbmtlZFJvb3QiLCJ1bm1vdW50IiwiX3RoaXM1IiwibW91bnQiLCJfdGhpczYiLCJzZXRQcm9wcyIsInByb3BzIiwiX3RoaXM3IiwiY2FsbGJhY2siLCJjbG9uZUVsZW1lbnQiLCJzZXRTdGF0ZSIsInN0YXRlIiwiX3RoaXM4Iiwibm9kZVR5cGUiLCJpbnZva2VTZXRTdGF0ZUNhbGxiYWNrIiwic2V0Q29udGV4dCIsIl90aGlzOSIsImNvbnRhaW5zIiwibm9kZU9yTm9kZXMiLCJvdGhlciIsImNvbnRhaW5zQ2hpbGRyZW5TdWJBcnJheSIsIm5vZGVFcXVhbCIsImVsZW1lbnRUb05vZGUiLCJjb250YWluc01hdGNoaW5nRWxlbWVudCIsInJzdE5vZGUiLCJub2RlTWF0Y2hlcyIsImIiLCJjb250YWluc0FsbE1hdGNoaW5nRWxlbWVudHMiLCJfdGhpczAiLCJldmVyeSIsImNvbnRhaW5zQW55TWF0Y2hpbmdFbGVtZW50cyIsIl90aGlzMSIsInNvbWUiLCJlcXVhbHMiLCJfdGhpczEwIiwibWF0Y2hlc0VsZW1lbnQiLCJfdGhpczExIiwiZmluZCIsInNlbGVjdG9yIiwicmVkdWNlVHJlZXNCeVNlbGVjdG9yIiwiaXMiLCJidWlsZFByZWRpY2F0ZSIsImlzRW1wdHlSZW5kZXIiLCJyZW5kZXJlZERpdmUiLCJmaWx0ZXJXaGVyZSIsIl90aGlzMTIiLCJub3QiLCJ0ZXh0IiwiZ2V0VGV4dEZyb21Ib3N0Tm9kZXMiLCJodG1sIiwiZ2V0SFRNTEZyb21Ib3N0Tm9kZXMiLCJsb2FkQ2hlZXJpb1Jvb3QiLCJzaW11bGF0ZSIsImV2ZW50IiwiX3RoaXMxMyIsIm1vY2siLCJzaW11bGF0ZUV2ZW50Iiwic2ltdWxhdGVFcnJvciIsImVycm9yIiwiX3RoaXMxNCIsInRoaXNOb2RlIiwicm9vdE5vZGUiLCJub2RlSGllcmFyY2h5IiwiY29uY2F0IiwicHJvcHNPZk5vZGUiLCJuYW1lIiwiX3RoaXMxNSIsIl9zdGF0ZSIsIl90aGlzMTYiLCJfY29udGV4dCIsImNoaWxkcmVuIiwiYWxsQ2hpbGRyZW4iLCJjaGlsZHJlbk9mTm9kZSIsImNoaWxkQXQiLCJpbmRleCIsIl90aGlzMTciLCJhdCIsInBhcmVudHMiLCJfdGhpczE4IiwiYWxsUGFyZW50cyIsInBhcmVudCIsImdldCIsImNsb3Nlc3QiLCJtYXRjaGluZ0FuY2VzdG9ycyIsImZpcnN0IiwiZmluZFdoZXJlIiwicHJvcCIsInByb3BOYW1lIiwiaW52b2tlIiwiX3RoaXMxOSIsImhhbmRsZXIiLCJfbGVuIiwiYXJncyIsIl9rZXkiLCJyZXNwb25zZSIsIndyYXBJbnZva2UiLCJyZW5kZXJQcm9wIiwiX3RoaXMyMCIsIlJhbmdlRXJyb3IiLCJoYXNPd24iLCJwcm9wVmFsdWUiLCJlbGVtZW50Iiwid3JhcHBlZCIsInR5cGUiLCJ0eXBlT2ZOb2RlIiwiZGlzcGxheU5hbWVPZk5vZGUiLCJoYXNDbGFzcyIsImNsYXNzTmFtZSIsImluZGV4T2YiLCJjb25zb2xlIiwid2FybiIsImhhc0NsYXNzTmFtZSIsImZuIiwiX3RoaXMyMSIsIl90aGlzMjIiLCJyZWR1Y2UiLCJfdGhpczIzIiwiaW5pdGlhbFZhbHVlIiwiYWNjdW0iLCJyZWR1Y2VSaWdodCIsIl90aGlzMjQiLCJzbGljZSIsImJlZ2luIiwiZW5kIiwic29tZVdoZXJlIiwiX3RoaXMyNSIsImV2ZXJ5V2hlcmUiLCJfdGhpczI2IiwiX3RoaXMyNyIsImZsYXR0ZW5lZCIsImZsYXQiLCJfdGhpczI4IiwibGFzdCIsImlzRW1wdHkiLCJleGlzdHMiLCJmbk5hbWUiLCJfbGVuMiIsIl9rZXkyIiwiZGVidWciLCJkZWJ1Z05vZGVzIiwidGFwIiwiaW50ZXJjZXB0ZXIiLCJkZXRhY2giLCJhdHRhY2hUbyIsImhvc3ROb2RlcyIsIl9SZWFjdFdyYXBwZXIiLCJfdGhpczI5IiwiSVRFUkFUT1JfU1lNQk9MIiwiaXRlciIsIm5leHQiLCJkb25lIiwicHJpdmF0ZVdhcm5pbmciLCJleHRyYU1lc3NhZ2UiLCJ0cmltIiwiX2RlZmF1bHQiLCJleHBvcnRzIiwibW9kdWxlIiwiZGVmYXVsdCJdLCJzb3VyY2VzIjpbIi4uL3NyYy9SZWFjdFdyYXBwZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGZsYXQgZnJvbSAnYXJyYXkucHJvdG90eXBlLmZsYXQnO1xuaW1wb3J0IGhhc093biBmcm9tICdoYXNvd24nO1xuaW1wb3J0IHRyaW0gZnJvbSAnc3RyaW5nLnByb3RvdHlwZS50cmltJztcblxuaW1wb3J0IHtcbiAgY29udGFpbnNDaGlsZHJlblN1YkFycmF5LFxuICB0eXBlT2ZOb2RlLFxuICBkaXNwbGF5TmFtZU9mTm9kZSxcbiAgSVRFUkFUT1JfU1lNQk9MLFxuICBub2RlRXF1YWwsXG4gIG5vZGVNYXRjaGVzLFxuICBtYWtlT3B0aW9ucyxcbiAgc3ltLFxuICBwcml2YXRlU2V0LFxuICBjbG9uZUVsZW1lbnQsXG4gIHJlbmRlcmVkRGl2ZSxcbiAgaXNDdXN0b21Db21wb25lbnQsXG4gIGxvYWRDaGVlcmlvUm9vdCxcbn0gZnJvbSAnLi9VdGlscyc7XG5pbXBvcnQgZ2V0QWRhcHRlciBmcm9tICcuL2dldEFkYXB0ZXInO1xuaW1wb3J0IHsgZGVidWdOb2RlcyB9IGZyb20gJy4vRGVidWcnO1xuaW1wb3J0IHtcbiAgcHJvcHNPZk5vZGUsXG4gIGhhc0NsYXNzTmFtZSxcbiAgY2hpbGRyZW5PZk5vZGUsXG4gIHBhcmVudHNPZk5vZGUsXG4gIHRyZWVGaWx0ZXIsXG4gIGdldFRleHRGcm9tSG9zdE5vZGVzLFxuICBnZXRIVE1MRnJvbUhvc3ROb2Rlcyxcbn0gZnJvbSAnLi9SU1RUcmF2ZXJzYWwnO1xuXG5pbXBvcnQgeyBidWlsZFByZWRpY2F0ZSwgcmVkdWNlVHJlZXNCeVNlbGVjdG9yIH0gZnJvbSAnLi9zZWxlY3RvcnMnO1xuXG5jb25zdCBOT0RFID0gc3ltKCdfX25vZGVfXycpO1xuY29uc3QgTk9ERVMgPSBzeW0oJ19fbm9kZXNfXycpO1xuY29uc3QgUkVOREVSRVIgPSBzeW0oJ19fcmVuZGVyZXJfXycpO1xuY29uc3QgVU5SRU5ERVJFRCA9IHN5bSgnX191bnJlbmRlcmVkX18nKTtcbmNvbnN0IFJPT1QgPSBzeW0oJ19fcm9vdF9fJyk7XG5jb25zdCBPUFRJT05TID0gc3ltKCdfX29wdGlvbnNfXycpO1xuY29uc3QgUk9PVF9OT0RFUyA9IHN5bSgnX19yb290Tm9kZXNfXycpO1xuY29uc3QgV1JBUFBJTkdfQ09NUE9ORU5UID0gc3ltKCdfX3dyYXBwaW5nQ29tcG9uZW50X18nKTtcbmNvbnN0IExJTktFRF9ST09UUyA9IHN5bSgnX19saW5rZWRSb290c19fJyk7XG5jb25zdCBVUERBVEVEX0JZID0gc3ltKCdfX3VwZGF0ZWRCeV9fJyk7XG5cbi8qKlxuICogRmluZHMgYWxsIG5vZGVzIGluIHRoZSBjdXJyZW50IHdyYXBwZXIgbm9kZXMnIHJlbmRlciB0cmVlcyB0aGF0IG1hdGNoIHRoZSBwcm92aWRlZCBwcmVkaWNhdGVcbiAqIGZ1bmN0aW9uLlxuICpcbiAqIEBwYXJhbSB7UmVhY3RXcmFwcGVyfSB3cmFwcGVyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBwcmVkaWNhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZpbHRlclxuICogQHJldHVybnMge1JlYWN0V3JhcHBlcn1cbiAqL1xuZnVuY3Rpb24gZmluZFdoZXJlVW53cmFwcGVkKHdyYXBwZXIsIHByZWRpY2F0ZSwgZmlsdGVyID0gdHJlZUZpbHRlcikge1xuICByZXR1cm4gd3JhcHBlci5mbGF0TWFwKChuKSA9PiBmaWx0ZXIobi5nZXROb2RlSW50ZXJuYWwoKSwgcHJlZGljYXRlKSk7XG59XG5cbi8qKlxuICogUmV0dXJucyBhIG5ldyB3cmFwcGVyIGluc3RhbmNlIHdpdGggb25seSB0aGUgbm9kZXMgb2YgdGhlIGN1cnJlbnQgd3JhcHBlciBpbnN0YW5jZSB0aGF0IG1hdGNoXG4gKiB0aGUgcHJvdmlkZWQgcHJlZGljYXRlIGZ1bmN0aW9uLlxuICpcbiAqIEBwYXJhbSB7UmVhY3RXcmFwcGVyfSB3cmFwcGVyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBwcmVkaWNhdGVcbiAqIEByZXR1cm5zIHtSZWFjdFdyYXBwZXJ9XG4gKi9cbmZ1bmN0aW9uIGZpbHRlcldoZXJlVW53cmFwcGVkKHdyYXBwZXIsIHByZWRpY2F0ZSkge1xuICByZXR1cm4gd3JhcHBlci53cmFwKHdyYXBwZXIuZ2V0Tm9kZXNJbnRlcm5hbCgpLmZpbHRlcihwcmVkaWNhdGUpLmZpbHRlcihCb29sZWFuKSk7XG59XG5cbmZ1bmN0aW9uIGdldFJvb3ROb2RlSW50ZXJuYWwod3JhcHBlcikge1xuICBpZiAod3JhcHBlcltST09UXS5sZW5ndGggIT09IDEpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2dldFJvb3ROb2RlSW50ZXJuYWwod3JhcHBlcikgY2FuIG9ubHkgYmUgY2FsbGVkIHdoZW4gd3JhcHBlciB3cmFwcyBvbmUgbm9kZScpO1xuICB9XG4gIGlmICh3cmFwcGVyW1JPT1RdICE9PSB3cmFwcGVyKSB7XG4gICAgcmV0dXJuIHdyYXBwZXJbUk9PVF9OT0RFU11bMF07XG4gIH1cbiAgcmV0dXJuIHdyYXBwZXJbUk9PVF1bTk9ERV07XG59XG5cbmZ1bmN0aW9uIG5vZGVQYXJlbnRzKHdyYXBwZXIsIG5vZGUpIHtcbiAgcmV0dXJuIHBhcmVudHNPZk5vZGUobm9kZSwgZ2V0Um9vdE5vZGVJbnRlcm5hbCh3cmFwcGVyKSk7XG59XG5cbmZ1bmN0aW9uIHByaXZhdGVTZXROb2Rlcyh3cmFwcGVyLCBub2Rlcykge1xuICBpZiAoIW5vZGVzKSB7XG4gICAgcHJpdmF0ZVNldCh3cmFwcGVyLCBOT0RFLCBudWxsKTtcbiAgICBwcml2YXRlU2V0KHdyYXBwZXIsIE5PREVTLCBbXSk7XG4gIH0gZWxzZSBpZiAoIUFycmF5LmlzQXJyYXkobm9kZXMpKSB7XG4gICAgcHJpdmF0ZVNldCh3cmFwcGVyLCBOT0RFLCBub2Rlcyk7XG4gICAgcHJpdmF0ZVNldCh3cmFwcGVyLCBOT0RFUywgW25vZGVzXSk7XG4gIH0gZWxzZSB7XG4gICAgcHJpdmF0ZVNldCh3cmFwcGVyLCBOT0RFLCBub2Rlc1swXSk7XG4gICAgcHJpdmF0ZVNldCh3cmFwcGVyLCBOT0RFUywgbm9kZXMpO1xuICB9XG4gIHByaXZhdGVTZXQod3JhcHBlciwgJ2xlbmd0aCcsIHdyYXBwZXJbTk9ERVNdLmxlbmd0aCk7XG59XG5cbi8qKlxuICogQGNsYXNzIFJlYWN0V3JhcHBlclxuICovXG5jbGFzcyBSZWFjdFdyYXBwZXIge1xuICBjb25zdHJ1Y3Rvcihub2Rlcywgcm9vdCwgcGFzc2VkT3B0aW9ucyA9IHt9KSB7XG4gICAgaWYgKCFnbG9iYWwud2luZG93ICYmICFnbG9iYWwuZG9jdW1lbnQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignSXQgbG9va3MgbGlrZSB5b3UgY2FsbGVkIGBtb3VudCgpYCB3aXRob3V0IGEgZ2xvYmFsIGRvY3VtZW50IGJlaW5nIGxvYWRlZC4nKTtcbiAgICB9XG4gICAgY29uc3Qgb3B0aW9ucyA9IG1ha2VPcHRpb25zKHBhc3NlZE9wdGlvbnMpO1xuXG4gICAgaWYgKCFyb290KSB7XG4gICAgICBjb25zdCBhZGFwdGVyID0gZ2V0QWRhcHRlcihvcHRpb25zKTtcbiAgICAgIGlmICghYWRhcHRlci5pc1ZhbGlkRWxlbWVudChub2RlcykpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignUmVhY3RXcmFwcGVyIGNhbiBvbmx5IHdyYXAgdmFsaWQgZWxlbWVudHMnKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcmVuZGVyZXIgPSBhZGFwdGVyLmNyZWF0ZVJlbmRlcmVyKHsgbW9kZTogJ21vdW50JywgLi4ub3B0aW9ucyB9KTtcbiAgICAgIHByaXZhdGVTZXQodGhpcywgUkVOREVSRVIsIHJlbmRlcmVyKTtcbiAgICAgIHJlbmRlcmVyLnJlbmRlcihub2Rlcywgb3B0aW9ucy5jb250ZXh0KTtcbiAgICAgIHByaXZhdGVTZXQodGhpcywgUk9PVCwgdGhpcyk7XG4gICAgICBwcml2YXRlU2V0Tm9kZXModGhpcywgdGhpc1tSRU5ERVJFUl0uZ2V0Tm9kZSgpKTtcbiAgICAgIHByaXZhdGVTZXQodGhpcywgT1BUSU9OUywgb3B0aW9ucyk7XG4gICAgICBwcml2YXRlU2V0KHRoaXMsIExJTktFRF9ST09UUywgW10pO1xuXG4gICAgICBpZiAoaXNDdXN0b21Db21wb25lbnQob3B0aW9ucy53cmFwcGluZ0NvbXBvbmVudCwgYWRhcHRlcikpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzW1JFTkRFUkVSXS5nZXRXcmFwcGluZ0NvbXBvbmVudFJlbmRlcmVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigneW91ciBhZGFwdGVyIGRvZXMgbm90IHN1cHBvcnQgYHdyYXBwaW5nQ29tcG9uZW50YC4gVHJ5IHVwZ3JhZGluZyBpdCEnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGVTZXQoXG4gICAgICAgICAgdGhpcyxcbiAgICAgICAgICBXUkFQUElOR19DT01QT05FTlQsXG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVzZS1iZWZvcmUtZGVmaW5lXG4gICAgICAgICAgbmV3IFdyYXBwaW5nQ29tcG9uZW50V3JhcHBlcih0aGlzLCB0aGlzW1JFTkRFUkVSXS5nZXRXcmFwcGluZ0NvbXBvbmVudFJlbmRlcmVyKCkpLFxuICAgICAgICApO1xuICAgICAgICB0aGlzW0xJTktFRF9ST09UU10ucHVzaCh0aGlzW1dSQVBQSU5HX0NPTVBPTkVOVF0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBwcml2YXRlU2V0KHRoaXMsIFJFTkRFUkVSLCByb290W1JFTkRFUkVSXSk7XG4gICAgICBwcml2YXRlU2V0KHRoaXMsIFJPT1QsIHJvb3QpO1xuICAgICAgcHJpdmF0ZVNldE5vZGVzKHRoaXMsIG5vZGVzKTtcbiAgICAgIHByaXZhdGVTZXQodGhpcywgUk9PVF9OT0RFUywgcm9vdFtOT0RFU10pO1xuICAgICAgcHJpdmF0ZVNldCh0aGlzLCBPUFRJT05TLCByb290W09QVElPTlNdKTtcbiAgICAgIHByaXZhdGVTZXQodGhpcywgTElOS0VEX1JPT1RTLCBbXSk7XG4gICAgfVxuICAgIHByaXZhdGVTZXQodGhpcywgVU5SRU5ERVJFRCwgbm9kZXMpO1xuICAgIHByaXZhdGVTZXQodGhpcywgVVBEQVRFRF9CWSwgbnVsbCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgcm9vdCB3cmFwcGVyXG4gICAqXG4gICAqIEByZXR1cm4ge1JlYWN0V3JhcHBlcn1cbiAgICovXG4gIHJvb3QoKSB7XG4gICAgcmV0dXJuIHRoaXNbUk9PVF07XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgd3JhcHBlZCBjb21wb25lbnQuXG4gICAqXG4gICAqIEByZXR1cm4ge1JlYWN0Q29tcG9uZW50fVxuICAgKi9cbiAgZ2V0Tm9kZUludGVybmFsKCkge1xuICAgIGlmICh0aGlzLmxlbmd0aCAhPT0gMSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdSZWFjdFdyYXBwZXI6OmdldE5vZGUoKSBjYW4gb25seSBiZSBjYWxsZWQgd2hlbiB3cmFwcGluZyBvbmUgbm9kZScpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpc1tOT0RFU11bMF07XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgdGhlIHdyYXBwZWQgY29tcG9uZW50cy5cbiAgICpcbiAgICogQHJldHVybiB7QXJyYXk8UmVhY3RDb21wb25lbnQ+fVxuICAgKi9cbiAgZ2V0Tm9kZXNJbnRlcm5hbCgpIHtcbiAgICByZXR1cm4gdGhpc1tOT0RFU107XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgd3JhcHBlZCBSZWFjdEVsZW1lbnQuXG4gICAqXG4gICAqIEByZXR1cm4ge1JlYWN0RWxlbWVudH1cbiAgICovXG4gIGdldEVsZW1lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2luZ2xlKCdnZXRFbGVtZW50JywgKCkgPT4gZ2V0QWRhcHRlcih0aGlzW09QVElPTlNdKS5ub2RlVG9FbGVtZW50KHRoaXNbTk9ERV0pKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSB3cmFwcGVkIFJlYWN0RWxlbWVudHMuXG4gICAqXG4gICAqIEByZXR1cm4ge0FycmF5PFJlYWN0RWxlbWVudD59XG4gICAqL1xuICBnZXRFbGVtZW50cygpIHtcbiAgICByZXR1cm4gdGhpc1tOT0RFU10ubWFwKChuKSA9PiBnZXRBZGFwdGVyKHRoaXNbT1BUSU9OU10pLm5vZGVUb0VsZW1lbnQobikpO1xuICB9XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNsYXNzLW1ldGhvZHMtdXNlLXRoaXNcbiAgZ2V0Tm9kZSgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1JlYWN0V3JhcHBlcjo6Z2V0Tm9kZSgpIGlzIG5vIGxvbmdlciBzdXBwb3J0ZWQuIFVzZSBSZWFjdFdyYXBwZXI6Omluc3RhbmNlKCkgaW5zdGVhZCcpO1xuICB9XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNsYXNzLW1ldGhvZHMtdXNlLXRoaXNcbiAgZ2V0Tm9kZXMoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdSZWFjdFdyYXBwZXI6OmdldE5vZGVzKCkgaXMgbm8gbG9uZ2VyIHN1cHBvcnRlZC4nKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBvdXRlciBtb3N0IERPTUNvbXBvbmVudCBvZiB0aGUgY3VycmVudCB3cmFwcGVyLlxuICAgKlxuICAgKiBOT1RFOiBjYW4gb25seSBiZSBjYWxsZWQgb24gYSB3cmFwcGVyIG9mIGEgc2luZ2xlIG5vZGUuXG4gICAqXG4gICAqIEByZXR1cm5zIHtET01Db21wb25lbnR9XG4gICAqL1xuICBnZXRET01Ob2RlKCkge1xuICAgIGNvbnN0IGFkYXB0ZXIgPSBnZXRBZGFwdGVyKHRoaXNbT1BUSU9OU10pO1xuICAgIHJldHVybiB0aGlzLnNpbmdsZSgnZ2V0RE9NTm9kZScsIChuKSA9PiBhZGFwdGVyLm5vZGVUb0hvc3ROb2RlKG4sIHRydWUpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJZiB0aGUgcm9vdCBjb21wb25lbnQgY29udGFpbmVkIGEgcmVmLCB5b3UgY2FuIGFjY2VzcyBpdCBoZXJlIGFuZCBnZXQgdGhlIHJlbGV2YW50XG4gICAqIHJlYWN0IGNvbXBvbmVudCBpbnN0YW5jZSBvciBIVE1MIGVsZW1lbnQgaW5zdGFuY2UuXG4gICAqXG4gICAqIE5PVEU6IGNhbiBvbmx5IGJlIGNhbGxlZCBvbiBhIHdyYXBwZXIgaW5zdGFuY2UgdGhhdCBpcyBhbHNvIHRoZSByb290IGluc3RhbmNlLlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gcmVmbmFtZVxuICAgKiBAcmV0dXJucyB7UmVhY3RDb21wb25lbnQgfCBIVE1MRWxlbWVudH1cbiAgICovXG4gIHJlZihyZWZuYW1lKSB7XG4gICAgaWYgKHRoaXNbUk9PVF0gIT09IHRoaXMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignUmVhY3RXcmFwcGVyOjpyZWYocmVmbmFtZSkgY2FuIG9ubHkgYmUgY2FsbGVkIG9uIHRoZSByb290Jyk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmluc3RhbmNlKCkucmVmc1tyZWZuYW1lXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSB3cmFwcGVyJ3MgdW5kZXJseWluZyBpbnN0YW5jZS5cbiAgICpcbiAgICogRXhhbXBsZTpcbiAgICogYGBgXG4gICAqIGNvbnN0IHdyYXBwZXIgPSBtb3VudCg8TXlDb21wb25lbnQgLz4pO1xuICAgKiBjb25zdCBpbnN0ID0gd3JhcHBlci5pbnN0YW5jZSgpO1xuICAgKiBleHBlY3QoaW5zdCkudG8uYmUuaW5zdGFuY2VPZihNeUNvbXBvbmVudCk7XG4gICAqIGBgYFxuICAgKiBAcmV0dXJucyB7UmVhY3RDb21wb25lbnR8RE9NQ29tcG9uZW50fVxuICAgKi9cbiAgaW5zdGFuY2UoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2luZ2xlKCdpbnN0YW5jZScsICgpID0+IHRoaXNbTk9ERV0uaW5zdGFuY2UpO1xuICB9XG5cbiAgLyoqXG4gICAqIElmIGEgYHdyYXBwaW5nQ29tcG9uZW50YCB3YXMgcGFzc2VkIGluIGBvcHRpb25zYCwgdGhpcyBtZXRob2RzIHJldHVybnMgYSBgUmVhY3RXcmFwcGVyYCBhcm91bmRcbiAgICogdGhlIHJlbmRlcmVkIGB3cmFwcGluZ0NvbXBvbmVudGAuIFRoaXMgYFJlYWN0V3JhcHBlcmAgY2FuIGJlIHVzZWQgdG8gdXBkYXRlIHRoZVxuICAgKiBgd3JhcHBpbmdDb21wb25lbnRgJ3MgcHJvcHMsIHN0YXRlLCBldGMuXG4gICAqXG4gICAqIEByZXR1cm5zIFJlYWN0V3JhcHBlclxuICAgKi9cbiAgZ2V0V3JhcHBpbmdDb21wb25lbnQoKSB7XG4gICAgaWYgKHRoaXNbUk9PVF0gIT09IHRoaXMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignUmVhY3RXcmFwcGVyOjpnZXRXcmFwcGluZ0NvbXBvbmVudCgpIGNhbiBvbmx5IGJlIGNhbGxlZCBvbiB0aGUgcm9vdCcpO1xuICAgIH1cbiAgICBpZiAoIXRoaXNbT1BUSU9OU10ud3JhcHBpbmdDb21wb25lbnQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignUmVhY3RXcmFwcGVyOjpnZXRXcmFwcGluZ0NvbXBvbmVudCgpIGNhbiBvbmx5IGJlIGNhbGxlZCBvbiBhIHdyYXBwZXIgdGhhdCB3YXMgb3JpZ2luYWxseSBwYXNzZWQgYSBgd3JhcHBpbmdDb21wb25lbnRgIG9wdGlvbicpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpc1tXUkFQUElOR19DT01QT05FTlRdO1xuICB9XG5cbiAgLyoqXG4gICAqIEZvcmNlcyBhIHJlLXJlbmRlci4gVXNlZnVsIHRvIHJ1biBiZWZvcmUgY2hlY2tpbmcgdGhlIHJlbmRlciBvdXRwdXQgaWYgc29tZXRoaW5nIGV4dGVybmFsXG4gICAqIG1heSBiZSB1cGRhdGluZyB0aGUgc3RhdGUgb2YgdGhlIGNvbXBvbmVudCBzb21ld2hlcmUuXG4gICAqXG4gICAqIE5PVEU6IG5vIG1hdHRlciB3aGF0IGluc3RhbmNlIHRoaXMgaXMgY2FsbGVkIG9uLCBpdCB3aWxsIGFsd2F5cyB1cGRhdGUgdGhlIHJvb3QuXG4gICAqXG4gICAqIEByZXR1cm5zIHtSZWFjdFdyYXBwZXJ9XG4gICAqL1xuICB1cGRhdGUoKSB7XG4gICAgY29uc3Qgcm9vdCA9IHRoaXNbUk9PVF07XG4gICAgaWYgKHRoaXMgIT09IHJvb3QpIHtcbiAgICAgIHJldHVybiByb290LnVwZGF0ZSgpO1xuICAgIH1cbiAgICBwcml2YXRlU2V0Tm9kZXModGhpcywgdGhpc1tSRU5ERVJFUl0uZ2V0Tm9kZSgpKTtcbiAgICB0aGlzW0xJTktFRF9ST09UU10uZm9yRWFjaCgobGlua2VkUm9vdCkgPT4ge1xuICAgICAgaWYgKGxpbmtlZFJvb3QgIT09IHRoaXNbVVBEQVRFRF9CWV0pIHtcbiAgICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tcGFyYW0tcmVhc3NpZ24gKi9cbiAgICAgICAgLy8gT25seSB1cGRhdGUgYSBsaW5rZWQgaXQgcm9vdCBpZiBpdCBpcyBub3QgdGhlIG9yaWdpbmF0b3Igb2Ygb3VyIHVwZGF0ZSgpLlxuICAgICAgICAvLyBUaGlzIGlzIG5lZWRlZCB0byBwcmV2ZW50IGluZmluaXRlIHJlY3Vyc2lvbiB3aGVuIHRoZXJlIGlzIGEgYmktZGlyZWN0aW9uYWxcbiAgICAgICAgLy8gbGluayBiZXR3ZWVuIHR3byByb290cy5cbiAgICAgICAgbGlua2VkUm9vdFtVUERBVEVEX0JZXSA9IHRoaXM7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgbGlua2VkUm9vdC51cGRhdGUoKTtcbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICBsaW5rZWRSb290W1VQREFURURfQlldID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEEgbWV0aG9kIHRoYXQgdW5tb3VudHMgdGhlIGNvbXBvbmVudC4gVGhpcyBjYW4gYmUgdXNlZCB0byBzaW11bGF0ZSBhIGNvbXBvbmVudCBnb2luZyB0aHJvdWdoXG4gICAqIGFuZCB1bm1vdW50L21vdW50IGxpZmVjeWNsZS5cbiAgICpcbiAgICogQHJldHVybnMge1JlYWN0V3JhcHBlcn1cbiAgICovXG4gIHVubW91bnQoKSB7XG4gICAgaWYgKHRoaXNbUk9PVF0gIT09IHRoaXMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignUmVhY3RXcmFwcGVyOjp1bm1vdW50KCkgY2FuIG9ubHkgYmUgY2FsbGVkIG9uIHRoZSByb290Jyk7XG4gICAgfVxuICAgIHRoaXMuc2luZ2xlKCd1bm1vdW50JywgKCkgPT4ge1xuICAgICAgdGhpc1tSRU5ERVJFUl0udW5tb3VudCgpO1xuICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICB9KTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBBIG1ldGhvZCB0aGF0IHJlLW1vdW50cyB0aGUgY29tcG9uZW50LCBpZiBpdCBpcyBub3QgY3VycmVudGx5IG1vdW50ZWQuXG4gICAqIFRoaXMgY2FuIGJlIHVzZWQgdG8gc2ltdWxhdGUgYSBjb21wb25lbnQgZ29pbmcgdGhyb3VnaFxuICAgKiBhbiB1bm1vdW50L21vdW50IGxpZmVjeWNsZS5cbiAgICpcbiAgICogQHJldHVybnMge1JlYWN0V3JhcHBlcn1cbiAgICovXG4gIG1vdW50KCkge1xuICAgIGlmICh0aGlzW1JPT1RdICE9PSB0aGlzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1JlYWN0V3JhcHBlcjo6bW91bnQoKSBjYW4gb25seSBiZSBjYWxsZWQgb24gdGhlIHJvb3QnKTtcbiAgICB9XG4gICAgdGhpc1tSRU5ERVJFUl0ucmVuZGVyKHRoaXNbVU5SRU5ERVJFRF0sIHRoaXNbT1BUSU9OU10uY29udGV4dCwgKCkgPT4gdGhpcy51cGRhdGUoKSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQSBtZXRob2QgdGhhdCBzZXRzIHRoZSBwcm9wcyBvZiB0aGUgcm9vdCBjb21wb25lbnQsIGFuZCByZS1yZW5kZXJzLiBVc2VmdWwgZm9yIHdoZW4geW91IGFyZVxuICAgKiB3YW50aW5nIHRvIHRlc3QgaG93IHRoZSBjb21wb25lbnQgYmVoYXZlcyBvdmVyIHRpbWUgd2l0aCBjaGFuZ2luZyBwcm9wcy4gQ2FsbGluZyB0aGlzLCBmb3JcbiAgICogaW5zdGFuY2UsIHdpbGwgY2FsbCB0aGUgYGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHNgIGxpZmVjeWNsZSBtZXRob2QuXG4gICAqXG4gICAqIFNpbWlsYXIgdG8gYHNldFN0YXRlYCwgdGhpcyBtZXRob2QgYWNjZXB0cyBhIHByb3BzIG9iamVjdCBhbmQgd2lsbCBtZXJnZSBpdCBpbiB3aXRoIHRoZSBhbHJlYWR5XG4gICAqIGV4aXN0aW5nIHByb3BzLlxuICAgKlxuICAgKiBOT1RFOiBjYW4gb25seSBiZSBjYWxsZWQgb24gYSB3cmFwcGVyIGluc3RhbmNlIHRoYXQgaXMgYWxzbyB0aGUgcm9vdCBpbnN0YW5jZS5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHByb3BzIG9iamVjdFxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYiAtIGNhbGxiYWNrIGZ1bmN0aW9uXG4gICAqIEByZXR1cm5zIHtSZWFjdFdyYXBwZXJ9XG4gICAqL1xuICBzZXRQcm9wcyhwcm9wcywgY2FsbGJhY2sgPSB1bmRlZmluZWQpIHtcbiAgICBpZiAodGhpc1tST09UXSAhPT0gdGhpcykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdSZWFjdFdyYXBwZXI6OnNldFByb3BzKCkgY2FuIG9ubHkgYmUgY2FsbGVkIG9uIHRoZSByb290Jyk7XG4gICAgfVxuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSAmJiB0eXBlb2YgY2FsbGJhY2sgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1JlYWN0V3JhcHBlcjo6c2V0UHJvcHMoKSBleHBlY3RzIGEgZnVuY3Rpb24gYXMgaXRzIHNlY29uZCBhcmd1bWVudCcpO1xuICAgIH1cbiAgICBjb25zdCBhZGFwdGVyID0gZ2V0QWRhcHRlcih0aGlzW09QVElPTlNdKTtcbiAgICB0aGlzW1VOUkVOREVSRURdID0gY2xvbmVFbGVtZW50KGFkYXB0ZXIsIHRoaXNbVU5SRU5ERVJFRF0sIHByb3BzKTtcbiAgICB0aGlzW1JFTkRFUkVSXS5yZW5kZXIodGhpc1tVTlJFTkRFUkVEXSwgbnVsbCwgKCkgPT4ge1xuICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEEgbWV0aG9kIHRvIGludm9rZSBgc2V0U3RhdGVgIG9uIHRoZSByb290IGNvbXBvbmVudCBpbnN0YW5jZSBzaW1pbGFyIHRvIGhvdyB5b3UgbWlnaHQgaW4gdGhlXG4gICAqIGRlZmluaXRpb24gb2YgdGhlIGNvbXBvbmVudCwgYW5kIHJlLXJlbmRlcnMuICBUaGlzIG1ldGhvZCBpcyB1c2VmdWwgZm9yIHRlc3RpbmcgeW91ciBjb21wb25lbnRcbiAgICogaW4gaGFyZCB0byBhY2hpZXZlIHN0YXRlcywgaG93ZXZlciBzaG91bGQgYmUgdXNlZCBzcGFyaW5nbHkuIElmIHBvc3NpYmxlLCB5b3Ugc2hvdWxkIHV0aWxpemVcbiAgICogeW91ciBjb21wb25lbnQncyBleHRlcm5hbCBBUEkgaW4gb3JkZXIgdG8gZ2V0IGl0IGludG8gd2hhdGV2ZXIgc3RhdGUgeW91IHdhbnQgdG8gdGVzdCwgaW4gb3JkZXJcbiAgICogdG8gYmUgYXMgYWNjdXJhdGUgb2YgYSB0ZXN0IGFzIHBvc3NpYmxlLiBUaGlzIGlzIG5vdCBhbHdheXMgcHJhY3RpY2FsLCBob3dldmVyLlxuICAgKlxuICAgKiBOT1RFOiBjYW4gb25seSBiZSBjYWxsZWQgb24gYSB3cmFwcGVyIGluc3RhbmNlIHRoYXQgaXMgYWxzbyB0aGUgcm9vdCBpbnN0YW5jZS5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHN0YXRlIHRvIG1lcmdlXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNiIC0gY2FsbGJhY2sgZnVuY3Rpb25cbiAgICogQHJldHVybnMge1JlYWN0V3JhcHBlcn1cbiAgICovXG4gIHNldFN0YXRlKHN0YXRlLCBjYWxsYmFjayA9IHVuZGVmaW5lZCkge1xuICAgIGlmICh0aGlzLmluc3RhbmNlKCkgPT09IG51bGwgfHwgdGhpcy5nZXROb2RlSW50ZXJuYWwoKS5ub2RlVHlwZSAhPT0gJ2NsYXNzJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdSZWFjdFdyYXBwZXI6OnNldFN0YXRlKCkgY2FuIG9ubHkgYmUgY2FsbGVkIG9uIGNsYXNzIGNvbXBvbmVudHMnKTtcbiAgICB9XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIHR5cGVvZiBjYWxsYmFjayAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignUmVhY3RXcmFwcGVyOjpzZXRTdGF0ZSgpIGV4cGVjdHMgYSBmdW5jdGlvbiBhcyBpdHMgc2Vjb25kIGFyZ3VtZW50Jyk7XG4gICAgfVxuICAgIHRoaXMuaW5zdGFuY2UoKS5zZXRTdGF0ZShzdGF0ZSwgKCkgPT4ge1xuICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICBjb25zdCBhZGFwdGVyID0gZ2V0QWRhcHRlcih0aGlzW09QVElPTlNdKTtcbiAgICAgICAgY29uc3QgaW5zdGFuY2UgPSB0aGlzLmluc3RhbmNlKCk7XG4gICAgICAgIGlmIChhZGFwdGVyLmludm9rZVNldFN0YXRlQ2FsbGJhY2spIHtcbiAgICAgICAgICBhZGFwdGVyLmludm9rZVNldFN0YXRlQ2FsbGJhY2soaW5zdGFuY2UsIGNhbGxiYWNrKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjYWxsYmFjay5jYWxsKGluc3RhbmNlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEEgbWV0aG9kIHRoYXQgc2V0cyB0aGUgY29udGV4dCBvZiB0aGUgcm9vdCBjb21wb25lbnQsIGFuZCByZS1yZW5kZXJzLiBVc2VmdWwgZm9yIHdoZW4geW91IGFyZVxuICAgKiB3YW50aW5nIHRvIHRlc3QgaG93IHRoZSBjb21wb25lbnQgYmVoYXZlcyBvdmVyIHRpbWUgd2l0aCBjaGFuZ2luZyBjb250ZXh0cy5cbiAgICpcbiAgICogTk9URTogY2FuIG9ubHkgYmUgY2FsbGVkIG9uIGEgd3JhcHBlciBpbnN0YW5jZSB0aGF0IGlzIGFsc28gdGhlIHJvb3QgaW5zdGFuY2UuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjb250ZXh0IG9iamVjdFxuICAgKiBAcmV0dXJucyB7UmVhY3RXcmFwcGVyfVxuICAgKi9cbiAgc2V0Q29udGV4dChjb250ZXh0KSB7XG4gICAgaWYgKHRoaXNbUk9PVF0gIT09IHRoaXMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignUmVhY3RXcmFwcGVyOjpzZXRDb250ZXh0KCkgY2FuIG9ubHkgYmUgY2FsbGVkIG9uIHRoZSByb290Jyk7XG4gICAgfVxuICAgIGlmICghdGhpc1tPUFRJT05TXS5jb250ZXh0KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1JlYWN0V3JhcHBlcjo6c2V0Q29udGV4dCgpIGNhbiBvbmx5IGJlIGNhbGxlZCBvbiBhIHdyYXBwZXIgdGhhdCB3YXMgb3JpZ2luYWxseSBwYXNzZWQgYSBjb250ZXh0IG9wdGlvbicpO1xuICAgIH1cbiAgICB0aGlzW1JFTkRFUkVSXS5yZW5kZXIodGhpc1tVTlJFTkRFUkVEXSwgY29udGV4dCwgKCkgPT4gdGhpcy51cGRhdGUoKSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogV2hldGhlciBvciBub3QgYSBnaXZlbiByZWFjdCBlbGVtZW50IGV4aXN0cyBpbiB0aGUgbW91bnQgcmVuZGVyIHRyZWUuXG4gICAqXG4gICAqIEV4YW1wbGU6XG4gICAqIGBgYFxuICAgKiBjb25zdCB3cmFwcGVyID0gbW91bnQoPE15Q29tcG9uZW50IC8+KTtcbiAgICogZXhwZWN0KHdyYXBwZXIuY29udGFpbnMoPGRpdiBjbGFzc05hbWU9XCJmb28gYmFyXCIgLz4pKS50by5lcXVhbCh0cnVlKTtcbiAgICogYGBgXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhY3RFbGVtZW50fEFycmF5PFJlYWN0RWxlbWVudD59IG5vZGVPck5vZGVzXG4gICAqIEByZXR1cm5zIHtCb29sZWFufVxuICAgKi9cbiAgY29udGFpbnMobm9kZU9yTm9kZXMpIHtcbiAgICBjb25zdCBhZGFwdGVyID0gZ2V0QWRhcHRlcih0aGlzW09QVElPTlNdKTtcblxuICAgIGNvbnN0IHByZWRpY2F0ZSA9IEFycmF5LmlzQXJyYXkobm9kZU9yTm9kZXMpXG4gICAgICA/IChvdGhlcikgPT4gY29udGFpbnNDaGlsZHJlblN1YkFycmF5KFxuICAgICAgICBub2RlRXF1YWwsXG4gICAgICAgIG90aGVyLFxuICAgICAgICBub2RlT3JOb2Rlcy5tYXAoKG5vZGUpID0+IGFkYXB0ZXIuZWxlbWVudFRvTm9kZShub2RlKSksXG4gICAgICApXG4gICAgICA6IChvdGhlcikgPT4gbm9kZUVxdWFsKGFkYXB0ZXIuZWxlbWVudFRvTm9kZShub2RlT3JOb2RlcyksIG90aGVyKTtcblxuICAgIHJldHVybiBmaW5kV2hlcmVVbndyYXBwZWQodGhpcywgcHJlZGljYXRlKS5sZW5ndGggPiAwO1xuICB9XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgb3Igbm90IGEgZ2l2ZW4gcmVhY3QgZWxlbWVudCBleGlzdHMgaW4gdGhlIGN1cnJlbnQgcmVuZGVyIHRyZWUuXG4gICAqIEl0IHdpbGwgZGV0ZXJtaW5lIGlmIG9uZSBvZiB0aGUgd3JhcHBlcnMgZWxlbWVudCBcImxvb2tzIGxpa2VcIiB0aGUgZXhwZWN0ZWRcbiAgICogZWxlbWVudCBieSBjaGVja2luZyBpZiBhbGwgcHJvcHMgb2YgdGhlIGV4cGVjdGVkIGVsZW1lbnQgYXJlIHByZXNlbnRcbiAgICogb24gdGhlIHdyYXBwZXJzIGVsZW1lbnQgYW5kIGVxdWFscyB0byBlYWNoIG90aGVyLlxuICAgKlxuICAgKiBFeGFtcGxlOlxuICAgKiBgYGBcbiAgICogLy8gTXlDb21wb25lbnQgb3V0cHV0cyA8ZGl2PjxkaXYgY2xhc3M9XCJmb29cIj5IZWxsbzwvZGl2PjwvZGl2PlxuICAgKiBjb25zdCB3cmFwcGVyID0gbW91bnQoPE15Q29tcG9uZW50IC8+KTtcbiAgICogZXhwZWN0KHdyYXBwZXIuY29udGFpbnNNYXRjaGluZ0VsZW1lbnQoPGRpdj5IZWxsbzwvZGl2PikpLnRvLmVxdWFsKHRydWUpO1xuICAgKiBgYGBcbiAgICpcbiAgICogQHBhcmFtIHtSZWFjdEVsZW1lbnR9IG5vZGVcbiAgICogQHJldHVybnMge0Jvb2xlYW59XG4gICAqL1xuICBjb250YWluc01hdGNoaW5nRWxlbWVudChub2RlKSB7XG4gICAgY29uc3QgcnN0Tm9kZSA9IGdldEFkYXB0ZXIodGhpc1tPUFRJT05TXSkuZWxlbWVudFRvTm9kZShub2RlKTtcbiAgICBjb25zdCBwcmVkaWNhdGUgPSAob3RoZXIpID0+IG5vZGVNYXRjaGVzKHJzdE5vZGUsIG90aGVyLCAoYSwgYikgPT4gYSA8PSBiKTtcbiAgICByZXR1cm4gZmluZFdoZXJlVW53cmFwcGVkKHRoaXMsIHByZWRpY2F0ZSkubGVuZ3RoID4gMDtcbiAgfVxuXG4gIC8qKlxuICAgKiBXaGV0aGVyIG9yIG5vdCBhbGwgdGhlIGdpdmVuIHJlYWN0IGVsZW1lbnRzIGV4aXN0IGluIHRoZSBjdXJyZW50IHJlbmRlciB0cmVlLlxuICAgKiBJdCB3aWxsIGRldGVybWluZSBpZiBvbmUgb2YgdGhlIHdyYXBwZXJzIGVsZW1lbnQgXCJsb29rcyBsaWtlXCIgdGhlIGV4cGVjdGVkXG4gICAqIGVsZW1lbnQgYnkgY2hlY2tpbmcgaWYgYWxsIHByb3BzIG9mIHRoZSBleHBlY3RlZCBlbGVtZW50IGFyZSBwcmVzZW50XG4gICAqIG9uIHRoZSB3cmFwcGVycyBlbGVtZW50IGFuZCBlcXVhbHMgdG8gZWFjaCBvdGhlci5cbiAgICpcbiAgICogRXhhbXBsZTpcbiAgICogYGBgXG4gICAqIGNvbnN0IHdyYXBwZXIgPSBtb3VudCg8TXlDb21wb25lbnQgLz4pO1xuICAgKiBleHBlY3Qod3JhcHBlci5jb250YWluc0FsbE1hdGNoaW5nRWxlbWVudHMoW1xuICAgKiAgIDxkaXY+SGVsbG88L2Rpdj4sXG4gICAqICAgPGRpdj5Hb29kYnllPC9kaXY+LFxuICAgKiBdKSkudG8uZXF1YWwodHJ1ZSk7XG4gICAqIGBgYFxuICAgKlxuICAgKiBAcGFyYW0ge0FycmF5PFJlYWN0RWxlbWVudD59IG5vZGVzXG4gICAqIEByZXR1cm5zIHtCb29sZWFufVxuICAgKi9cbiAgY29udGFpbnNBbGxNYXRjaGluZ0VsZW1lbnRzKG5vZGVzKSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KG5vZGVzKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignbm9kZXMgc2hvdWxkIGJlIGFuIEFycmF5Jyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5vZGVzLmV2ZXJ5KChub2RlKSA9PiB0aGlzLmNvbnRhaW5zTWF0Y2hpbmdFbGVtZW50KG5vZGUpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBXaGV0aGVyIG9yIG5vdCBvbmUgb2YgdGhlIGdpdmVuIHJlYWN0IGVsZW1lbnRzIGV4aXN0cyBpbiB0aGUgY3VycmVudCByZW5kZXIgdHJlZS5cbiAgICogSXQgd2lsbCBkZXRlcm1pbmUgaWYgb25lIG9mIHRoZSB3cmFwcGVycyBlbGVtZW50IFwibG9va3MgbGlrZVwiIHRoZSBleHBlY3RlZFxuICAgKiBlbGVtZW50IGJ5IGNoZWNraW5nIGlmIGFsbCBwcm9wcyBvZiB0aGUgZXhwZWN0ZWQgZWxlbWVudCBhcmUgcHJlc2VudFxuICAgKiBvbiB0aGUgd3JhcHBlcnMgZWxlbWVudCBhbmQgZXF1YWxzIHRvIGVhY2ggb3RoZXIuXG4gICAqXG4gICAqIEV4YW1wbGU6XG4gICAqIGBgYFxuICAgKiBjb25zdCB3cmFwcGVyID0gbW91bnQoPE15Q29tcG9uZW50IC8+KTtcbiAgICogZXhwZWN0KHdyYXBwZXIuY29udGFpbnNBbnlNYXRjaGluZ0VsZW1lbnRzKFtcbiAgICogICA8ZGl2PkhlbGxvPC9kaXY+LFxuICAgKiAgIDxkaXY+R29vZGJ5ZTwvZGl2PixcbiAgICogXSkpLnRvLmVxdWFsKHRydWUpO1xuICAgKiBgYGBcbiAgICpcbiAgICogQHBhcmFtIHtBcnJheTxSZWFjdEVsZW1lbnQ+fSBub2Rlc1xuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAgICovXG4gIGNvbnRhaW5zQW55TWF0Y2hpbmdFbGVtZW50cyhub2Rlcykge1xuICAgIHJldHVybiBBcnJheS5pc0FycmF5KG5vZGVzKSAmJiBub2Rlcy5zb21lKChub2RlKSA9PiB0aGlzLmNvbnRhaW5zTWF0Y2hpbmdFbGVtZW50KG5vZGUpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBXaGV0aGVyIG9yIG5vdCBhIGdpdmVuIHJlYWN0IGVsZW1lbnQgZXhpc3RzIGluIHRoZSByZW5kZXIgdHJlZS5cbiAgICpcbiAgICogRXhhbXBsZTpcbiAgICogYGBgXG4gICAqIGNvbnN0IHdyYXBwZXIgPSBtb3VudCg8TXlDb21wb25lbnQgLz4pO1xuICAgKiBleHBlY3Qod3JhcHBlci5jb250YWlucyg8ZGl2IGNsYXNzTmFtZT1cImZvbyBiYXJcIiAvPikpLnRvLmVxdWFsKHRydWUpO1xuICAgKiBgYGBcbiAgICpcbiAgICogQHBhcmFtIHtSZWFjdEVsZW1lbnR9IG5vZGVcbiAgICogQHJldHVybnMge0Jvb2xlYW59XG4gICAqL1xuICBlcXVhbHMobm9kZSkge1xuICAgIHJldHVybiB0aGlzLnNpbmdsZSgnZXF1YWxzJywgKCkgPT4gbm9kZUVxdWFsKHRoaXMuZ2V0Tm9kZUludGVybmFsKCksIG5vZGUpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBXaGV0aGVyIG9yIG5vdCBhIGdpdmVuIHJlYWN0IGVsZW1lbnQgbWF0Y2hlcyB0aGUgcmVuZGVyIHRyZWUuXG4gICAqIE1hdGNoIGlzIGJhc2VkIG9uIHRoZSBleHBlY3RlZCBlbGVtZW50IGFuZCBub3Qgb24gd3JhcHBlciByb290IG5vZGUuXG4gICAqIEl0IHdpbGwgZGV0ZXJtaW5lIGlmIHRoZSB3cmFwcGVyIHJvb3Qgbm9kZSBcImxvb2tzIGxpa2VcIiB0aGUgZXhwZWN0ZWRcbiAgICogZWxlbWVudCBieSBjaGVja2luZyBpZiBhbGwgcHJvcHMgb2YgdGhlIGV4cGVjdGVkIGVsZW1lbnQgYXJlIHByZXNlbnRcbiAgICogb24gdGhlIHdyYXBwZXIgcm9vdCBub2RlIGFuZCBlcXVhbHMgdG8gZWFjaCBvdGhlci5cbiAgICpcbiAgICogRXhhbXBsZTpcbiAgICogYGBgXG4gICAqIC8vIE15Q29tcG9uZW50IG91dHB1dHMgPGRpdiBjbGFzcz1cImZvb1wiPkhlbGxvPC9kaXY+XG4gICAqIGNvbnN0IHdyYXBwZXIgPSBtb3VudCg8TXlDb21wb25lbnQgLz4pO1xuICAgKiBleHBlY3Qod3JhcHBlci5tYXRjaGVzRWxlbWVudCg8ZGl2PkhlbGxvPC9kaXY+KSkudG8uZXF1YWwodHJ1ZSk7XG4gICAqIGBgYFxuICAgKlxuICAgKiBAcGFyYW0ge1JlYWN0RWxlbWVudH0gbm9kZVxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAgICovXG4gIG1hdGNoZXNFbGVtZW50KG5vZGUpIHtcbiAgICByZXR1cm4gdGhpcy5zaW5nbGUoJ21hdGNoZXNFbGVtZW50JywgKCkgPT4ge1xuICAgICAgY29uc3QgYWRhcHRlciA9IGdldEFkYXB0ZXIodGhpc1tPUFRJT05TXSk7XG4gICAgICBjb25zdCByc3ROb2RlID0gYWRhcHRlci5lbGVtZW50VG9Ob2RlKG5vZGUpO1xuICAgICAgcmV0dXJuIG5vZGVNYXRjaGVzKHJzdE5vZGUsIHRoaXMuZ2V0Tm9kZUludGVybmFsKCksIChhLCBiKSA9PiBhIDw9IGIpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbmRzIGV2ZXJ5IG5vZGUgaW4gdGhlIHJlbmRlciB0cmVlIG9mIHRoZSBjdXJyZW50IHdyYXBwZXIgdGhhdCBtYXRjaGVzIHRoZSBwcm92aWRlZCBzZWxlY3Rvci5cbiAgICpcbiAgICogQHBhcmFtIHtFbnp5bWVTZWxlY3Rvcn0gc2VsZWN0b3JcbiAgICogQHJldHVybnMge1JlYWN0V3JhcHBlcn1cbiAgICovXG4gIGZpbmQoc2VsZWN0b3IpIHtcbiAgICByZXR1cm4gdGhpcy53cmFwKHJlZHVjZVRyZWVzQnlTZWxlY3RvcihzZWxlY3RvciwgdGhpcy5nZXROb2Rlc0ludGVybmFsKCkpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHdoZXRoZXIgb3Igbm90IGN1cnJlbnQgbm9kZSBtYXRjaGVzIGEgcHJvdmlkZWQgc2VsZWN0b3IuXG4gICAqXG4gICAqIE5PVEU6IGNhbiBvbmx5IGJlIGNhbGxlZCBvbiBhIHdyYXBwZXIgb2YgYSBzaW5nbGUgbm9kZS5cbiAgICpcbiAgICogQHBhcmFtIHtFbnp5bWVTZWxlY3Rvcn0gc2VsZWN0b3JcbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuICBpcyhzZWxlY3Rvcikge1xuICAgIGNvbnN0IHByZWRpY2F0ZSA9IGJ1aWxkUHJlZGljYXRlKHNlbGVjdG9yKTtcbiAgICByZXR1cm4gdGhpcy5zaW5nbGUoJ2lzJywgKG4pID0+IHByZWRpY2F0ZShuKSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBjb21wb25lbnQgcmVuZGVyZWQgbm90aGluZywgaS5lLiwgbnVsbCBvciBmYWxzZS5cbiAgICpcbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuICBpc0VtcHR5UmVuZGVyKCkge1xuICAgIGNvbnN0IG5vZGVzID0gdGhpcy5nZXROb2Rlc0ludGVybmFsKCk7XG5cbiAgICByZXR1cm4gbm9kZXMuZXZlcnkoKG5vZGUpID0+IHJlbmRlcmVkRGl2ZShub2RlKSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIG5ldyB3cmFwcGVyIGluc3RhbmNlIHdpdGggb25seSB0aGUgbm9kZXMgb2YgdGhlIGN1cnJlbnQgd3JhcHBlciBpbnN0YW5jZSB0aGF0IG1hdGNoXG4gICAqIHRoZSBwcm92aWRlZCBwcmVkaWNhdGUgZnVuY3Rpb24uXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IHByZWRpY2F0ZVxuICAgKiBAcmV0dXJucyB7UmVhY3RXcmFwcGVyfVxuICAgKi9cbiAgZmlsdGVyV2hlcmUocHJlZGljYXRlKSB7XG4gICAgcmV0dXJuIGZpbHRlcldoZXJlVW53cmFwcGVkKHRoaXMsIChuKSA9PiBwcmVkaWNhdGUodGhpcy53cmFwKG4pKSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIG5ldyB3cmFwcGVyIGluc3RhbmNlIHdpdGggb25seSB0aGUgbm9kZXMgb2YgdGhlIGN1cnJlbnQgd3JhcHBlciBpbnN0YW5jZSB0aGF0IG1hdGNoXG4gICAqIHRoZSBwcm92aWRlZCBzZWxlY3Rvci5cbiAgICpcbiAgICogQHBhcmFtIHtFbnp5bWVTZWxlY3Rvcn0gc2VsZWN0b3JcbiAgICogQHJldHVybnMge1JlYWN0V3JhcHBlcn1cbiAgICovXG4gIGZpbHRlcihzZWxlY3Rvcikge1xuICAgIGNvbnN0IHByZWRpY2F0ZSA9IGJ1aWxkUHJlZGljYXRlKHNlbGVjdG9yKTtcbiAgICByZXR1cm4gZmlsdGVyV2hlcmVVbndyYXBwZWQodGhpcywgcHJlZGljYXRlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgbmV3IHdyYXBwZXIgaW5zdGFuY2Ugd2l0aCBvbmx5IHRoZSBub2RlcyBvZiB0aGUgY3VycmVudCB3cmFwcGVyIHRoYXQgZGlkIG5vdCBtYXRjaFxuICAgKiB0aGUgcHJvdmlkZWQgc2VsZWN0b3IuIEVzc2VudGlhbGx5IHRoZSBpbnZlcnNlIG9mIGBmaWx0ZXJgLlxuICAgKlxuICAgKiBAcGFyYW0ge0VuenltZVNlbGVjdG9yfSBzZWxlY3RvclxuICAgKiBAcmV0dXJucyB7UmVhY3RXcmFwcGVyfVxuICAgKi9cbiAgbm90KHNlbGVjdG9yKSB7XG4gICAgY29uc3QgcHJlZGljYXRlID0gYnVpbGRQcmVkaWNhdGUoc2VsZWN0b3IpO1xuICAgIHJldHVybiBmaWx0ZXJXaGVyZVVud3JhcHBlZCh0aGlzLCAobikgPT4gIXByZWRpY2F0ZShuKSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIHN0cmluZyBvZiB0aGUgcmVuZGVyZWQgdGV4dCBvZiB0aGUgY3VycmVudCByZW5kZXIgdHJlZS4gIFRoaXMgZnVuY3Rpb24gc2hvdWxkIGJlXG4gICAqIGxvb2tlZCBhdCB3aXRoIHNrZXB0aWNpc20gaWYgYmVpbmcgdXNlZCB0byB0ZXN0IHdoYXQgdGhlIGFjdHVhbCBIVE1MIG91dHB1dCBvZiB0aGUgY29tcG9uZW50XG4gICAqIHdpbGwgYmUuIElmIHRoYXQgaXMgd2hhdCB5b3Ugd291bGQgbGlrZSB0byB0ZXN0LCB1c2UgZW56eW1lJ3MgYHJlbmRlcmAgZnVuY3Rpb24gaW5zdGVhZC5cbiAgICpcbiAgICogTk9URTogY2FuIG9ubHkgYmUgY2FsbGVkIG9uIGEgd3JhcHBlciBvZiBhIHNpbmdsZSBub2RlLlxuICAgKlxuICAgKiBAcmV0dXJucyB7U3RyaW5nfVxuICAgKi9cbiAgdGV4dCgpIHtcbiAgICBjb25zdCBhZGFwdGVyID0gZ2V0QWRhcHRlcih0aGlzW09QVElPTlNdKTtcbiAgICByZXR1cm4gdGhpcy5zaW5nbGUoJ3RleHQnLCAobikgPT4gZ2V0VGV4dEZyb21Ib3N0Tm9kZXMobiwgYWRhcHRlcikpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIEhUTUwgb2YgdGhlIG5vZGUuXG4gICAqXG4gICAqIE5PVEU6IGNhbiBvbmx5IGJlIGNhbGxlZCBvbiBhIHdyYXBwZXIgb2YgYSBzaW5nbGUgbm9kZS5cbiAgICpcbiAgICogQHJldHVybnMge1N0cmluZ31cbiAgICovXG4gIGh0bWwoKSB7XG4gICAgY29uc3QgYWRhcHRlciA9IGdldEFkYXB0ZXIodGhpc1tPUFRJT05TXSk7XG4gICAgcmV0dXJuIHRoaXMuc2luZ2xlKCdodG1sJywgKG4pID0+IGdldEhUTUxGcm9tSG9zdE5vZGVzKG4sIGFkYXB0ZXIpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBjdXJyZW50IG5vZGUgcmVuZGVyZWQgdG8gSFRNTCBhbmQgd3JhcHBlZCBpbiBhIENoZWVyaW9XcmFwcGVyLlxuICAgKlxuICAgKiBOT1RFOiBjYW4gb25seSBiZSBjYWxsZWQgb24gYSB3cmFwcGVyIG9mIGEgc2luZ2xlIG5vZGUuXG4gICAqXG4gICAqIEByZXR1cm5zIHtDaGVlcmlvV3JhcHBlcn1cbiAgICovXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBodG1sID0gdGhpcy5odG1sKCk7XG4gICAgcmV0dXJuIGxvYWRDaGVlcmlvUm9vdChodG1sKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2VkIHRvIHNpbXVsYXRlIGV2ZW50cy4gUGFzcyBhbiBldmVudG5hbWUgYW5kIChvcHRpb25hbGx5KSBldmVudCBhcmd1bWVudHMuIFRoaXMgbWV0aG9kIG9mXG4gICAqIHRlc3RpbmcgZXZlbnRzIHNob3VsZCBiZSBtZXQgd2l0aCBzb21lIHNrZXB0aWNpc20uXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuICAgKiBAcGFyYW0ge09iamVjdH0gbW9jayAob3B0aW9uYWwpXG4gICAqIEByZXR1cm5zIHtSZWFjdFdyYXBwZXJ9XG4gICAqL1xuICBzaW11bGF0ZShldmVudCwgbW9jayA9IHt9KSB7XG4gICAgcmV0dXJuIHRoaXMuc2luZ2xlKCdzaW11bGF0ZScsIChuKSA9PiB7XG4gICAgICB0aGlzW1JFTkRFUkVSXS5zaW11bGF0ZUV2ZW50KG4sIGV2ZW50LCBtb2NrKTtcbiAgICAgIHRoaXNbUk9PVF0udXBkYXRlKCk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2VkIHRvIHNpbXVsYXRlIHRocm93aW5nIGEgcmVuZGVyaW5nIGVycm9yLiBQYXNzIGFuIGVycm9yIHRvIHRocm93LlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gZXJyb3JcbiAgICogQHJldHVybnMge1JlYWN0V3JhcHBlcn1cbiAgICovXG4gIHNpbXVsYXRlRXJyb3IoZXJyb3IpIHtcbiAgICBpZiAodGhpc1tST09UXSA9PT0gdGhpcykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdSZWFjdFdyYXBwZXI6OnNpbXVsYXRlRXJyb3IoKSBtYXkgbm90IGJlIGNhbGxlZCBvbiB0aGUgcm9vdCcpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnNpbmdsZSgnc2ltdWxhdGVFcnJvcicsICh0aGlzTm9kZSkgPT4ge1xuICAgICAgaWYgKHRoaXNOb2RlLm5vZGVUeXBlID09PSAnaG9zdCcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdSZWFjdFdyYXBwZXI6OnNpbXVsYXRlRXJyb3IoKSBjYW4gb25seSBiZSBjYWxsZWQgb24gY3VzdG9tIGNvbXBvbmVudHMnKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcmVuZGVyZXIgPSB0aGlzW1JFTkRFUkVSXTtcbiAgICAgIGlmICh0eXBlb2YgcmVuZGVyZXIuc2ltdWxhdGVFcnJvciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCd5b3VyIGFkYXB0ZXIgZG9lcyBub3Qgc3VwcG9ydCBgc2ltdWxhdGVFcnJvcmAuIFRyeSB1cGdyYWRpbmcgaXQhJyk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHJvb3ROb2RlID0gZ2V0Um9vdE5vZGVJbnRlcm5hbCh0aGlzKTtcbiAgICAgIGNvbnN0IG5vZGVIaWVyYXJjaHkgPSBbdGhpc05vZGVdLmNvbmNhdChub2RlUGFyZW50cyh0aGlzLCB0aGlzTm9kZSkpO1xuICAgICAgcmVuZGVyZXIuc2ltdWxhdGVFcnJvcihub2RlSGllcmFyY2h5LCByb290Tm9kZSwgZXJyb3IpO1xuXG4gICAgICB0aGlzW1JPT1RdLnVwZGF0ZSgpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgcHJvcHMgaGFzaCBmb3IgdGhlIHJvb3Qgbm9kZSBvZiB0aGUgd3JhcHBlci5cbiAgICpcbiAgICogTk9URTogY2FuIG9ubHkgYmUgY2FsbGVkIG9uIGEgd3JhcHBlciBvZiBhIHNpbmdsZSBub2RlLlxuICAgKlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgKi9cbiAgcHJvcHMoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2luZ2xlKCdwcm9wcycsIHByb3BzT2ZOb2RlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBzdGF0ZSBoYXNoIGZvciB0aGUgcm9vdCBub2RlIG9mIHRoZSB3cmFwcGVyLiBPcHRpb25hbGx5IHBhc3MgaW4gYSBwcm9wIG5hbWUgYW5kIGl0XG4gICAqIHdpbGwgcmV0dXJuIGp1c3QgdGhhdCB2YWx1ZS5cbiAgICpcbiAgICogTk9URTogY2FuIG9ubHkgYmUgY2FsbGVkIG9uIGEgd3JhcHBlciBvZiBhIHNpbmdsZSBub2RlLlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSAob3B0aW9uYWwpXG4gICAqIEByZXR1cm5zIHsqfVxuICAgKi9cbiAgc3RhdGUobmFtZSkge1xuICAgIGNvbnN0IHRoaXNOb2RlID0gdGhpc1tST09UXSA9PT0gdGhpcyA/IHRoaXNbUkVOREVSRVJdLmdldE5vZGUoKSA6IHRoaXMuZ2V0Tm9kZUludGVybmFsKCk7XG4gICAgaWYgKHRoaXMuaW5zdGFuY2UoKSA9PT0gbnVsbCB8fCB0aGlzTm9kZS5ub2RlVHlwZSAhPT0gJ2NsYXNzJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdSZWFjdFdyYXBwZXI6OnN0YXRlKCkgY2FuIG9ubHkgYmUgY2FsbGVkIG9uIGNsYXNzIGNvbXBvbmVudHMnKTtcbiAgICB9XG4gICAgY29uc3QgX3N0YXRlID0gdGhpcy5zaW5nbGUoJ3N0YXRlJywgKCkgPT4gdGhpcy5pbnN0YW5jZSgpLnN0YXRlKTtcbiAgICBpZiAodHlwZW9mIG5hbWUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBpZiAoX3N0YXRlID09IG51bGwpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgUmVhY3RXcmFwcGVyOjpzdGF0ZShcIiR7bmFtZX1cIikgcmVxdWlyZXMgdGhhdCBcXGBzdGF0ZVxcYCBub3QgYmUgXFxgbnVsbFxcYCBvciBcXGB1bmRlZmluZWRcXGBgKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBfc3RhdGVbbmFtZV07XG4gICAgfVxuICAgIHJldHVybiBfc3RhdGU7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgY29udGV4dCBoYXNoIGZvciB0aGUgcm9vdCBub2RlIG9mIHRoZSB3cmFwcGVyLlxuICAgKiBPcHRpb25hbGx5IHBhc3MgaW4gYSBwcm9wIG5hbWUgYW5kIGl0IHdpbGwgcmV0dXJuIGp1c3QgdGhhdCB2YWx1ZS5cbiAgICpcbiAgICogTk9URTogY2FuIG9ubHkgYmUgY2FsbGVkIG9uIGEgd3JhcHBlciBvZiBhIHNpbmdsZSBub2RlLlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSAob3B0aW9uYWwpXG4gICAqIEByZXR1cm5zIHsqfVxuICAgKi9cbiAgY29udGV4dChuYW1lKSB7XG4gICAgaWYgKHRoaXNbUk9PVF0gIT09IHRoaXMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignUmVhY3RXcmFwcGVyOjpjb250ZXh0KCkgY2FuIG9ubHkgYmUgY2FsbGVkIG9uIHRoZSByb290Jyk7XG4gICAgfVxuICAgIGNvbnN0IGluc3RhbmNlID0gdGhpcy5zaW5nbGUoJ2NvbnRleHQnLCAoKSA9PiB0aGlzLmluc3RhbmNlKCkpO1xuICAgIGlmIChpbnN0YW5jZSA9PT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdSZWFjdFdyYXBwZXI6OmNvbnRleHQoKSBjYW4gb25seSBiZSBjYWxsZWQgb24gd3JhcHBlZCBub2RlcyB0aGF0IGhhdmUgYSBub24tbnVsbCBpbnN0YW5jZScpO1xuICAgIH1cbiAgICBjb25zdCBfY29udGV4dCA9IGluc3RhbmNlLmNvbnRleHQ7XG4gICAgaWYgKHR5cGVvZiBuYW1lICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgcmV0dXJuIF9jb250ZXh0W25hbWVdO1xuICAgIH1cbiAgICByZXR1cm4gX2NvbnRleHQ7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIG5ldyB3cmFwcGVyIHdpdGggYWxsIG9mIHRoZSBjaGlsZHJlbiBvZiB0aGUgY3VycmVudCB3cmFwcGVyLlxuICAgKlxuICAgKiBAcGFyYW0ge0VuenltZVNlbGVjdG9yfSBbc2VsZWN0b3JdXG4gICAqIEByZXR1cm5zIHtSZWFjdFdyYXBwZXJ9XG4gICAqL1xuICBjaGlsZHJlbihzZWxlY3Rvcikge1xuICAgIGNvbnN0IGFsbENoaWxkcmVuID0gdGhpcy5mbGF0TWFwKChuKSA9PiBjaGlsZHJlbk9mTm9kZShuLmdldE5vZGVJbnRlcm5hbCgpKSk7XG4gICAgcmV0dXJuIHNlbGVjdG9yID8gYWxsQ2hpbGRyZW4uZmlsdGVyKHNlbGVjdG9yKSA6IGFsbENoaWxkcmVuO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBuZXcgd3JhcHBlciB3aXRoIGEgc3BlY2lmaWMgY2hpbGRcbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtpbmRleF1cbiAgICogQHJldHVybnMge1JlYWN0V3JhcHBlcn1cbiAgICovXG4gIGNoaWxkQXQoaW5kZXgpIHtcbiAgICByZXR1cm4gdGhpcy5zaW5nbGUoJ2NoaWxkQXQnLCAoKSA9PiB0aGlzLmNoaWxkcmVuKCkuYXQoaW5kZXgpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgd3JhcHBlciBhcm91bmQgYWxsIG9mIHRoZSBwYXJlbnRzL2FuY2VzdG9ycyBvZiB0aGUgd3JhcHBlci4gRG9lcyBub3QgaW5jbHVkZSB0aGUgbm9kZVxuICAgKiBpbiB0aGUgY3VycmVudCB3cmFwcGVyLlxuICAgKlxuICAgKiBOT1RFOiBjYW4gb25seSBiZSBjYWxsZWQgb24gYSB3cmFwcGVyIG9mIGEgc2luZ2xlIG5vZGUuXG4gICAqXG4gICAqIEBwYXJhbSB7RW56eW1lU2VsZWN0b3J9IFtzZWxlY3Rvcl1cbiAgICogQHJldHVybnMge1JlYWN0V3JhcHBlcn1cbiAgICovXG4gIHBhcmVudHMoc2VsZWN0b3IpIHtcbiAgICByZXR1cm4gdGhpcy5zaW5nbGUoJ3BhcmVudHMnLCAobikgPT4ge1xuICAgICAgY29uc3QgYWxsUGFyZW50cyA9IHRoaXMud3JhcChub2RlUGFyZW50cyh0aGlzLCBuKSk7XG4gICAgICByZXR1cm4gc2VsZWN0b3IgPyBhbGxQYXJlbnRzLmZpbHRlcihzZWxlY3RvcikgOiBhbGxQYXJlbnRzO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSB3cmFwcGVyIGFyb3VuZCB0aGUgaW1tZWRpYXRlIHBhcmVudCBvZiB0aGUgY3VycmVudCBub2RlLlxuICAgKlxuICAgKiBAcmV0dXJucyB7UmVhY3RXcmFwcGVyfVxuICAgKi9cbiAgcGFyZW50KCkge1xuICAgIHJldHVybiB0aGlzLmZsYXRNYXAoKG4pID0+IFtuLnBhcmVudHMoKS5nZXQoMCldKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge0VuenltZVNlbGVjdG9yfSBzZWxlY3RvclxuICAgKiBAcmV0dXJucyB7UmVhY3RXcmFwcGVyfVxuICAgKi9cbiAgY2xvc2VzdChzZWxlY3Rvcikge1xuICAgIGlmICh0aGlzLmlzKHNlbGVjdG9yKSkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGNvbnN0IG1hdGNoaW5nQW5jZXN0b3JzID0gdGhpcy5wYXJlbnRzKCkuZmlsdGVyKHNlbGVjdG9yKTtcbiAgICByZXR1cm4gbWF0Y2hpbmdBbmNlc3RvcnMubGVuZ3RoID4gMCA/IG1hdGNoaW5nQW5jZXN0b3JzLmZpcnN0KCkgOiB0aGlzLmZpbmRXaGVyZSgoKSA9PiBmYWxzZSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgdmFsdWUgb2YgIHByb3Agd2l0aCB0aGUgZ2l2ZW4gbmFtZSBvZiB0aGUgcm9vdCBub2RlLlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gcHJvcE5hbWVcbiAgICogQHJldHVybnMgeyp9XG4gICAqL1xuICBwcm9wKHByb3BOYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvcHMoKVtwcm9wTmFtZV07XG4gIH1cblxuICAvKipcbiAgICogVXNlZCB0byBpbnZva2UgYSBmdW5jdGlvbiBwcm9wLlxuICAgKiBXaWxsIGludm9rZSBhbiBmdW5jdGlvbiBwcm9wIGFuZCByZXR1cm4gaXRzIHZhbHVlLlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gcHJvcE5hbWVcbiAgICogQHJldHVybnMge0FueX1cbiAgICovXG4gIGludm9rZShwcm9wTmFtZSkge1xuICAgIHJldHVybiB0aGlzLnNpbmdsZSgnaW52b2tlJywgKCkgPT4ge1xuICAgICAgY29uc3QgaGFuZGxlciA9IHRoaXMucHJvcChwcm9wTmFtZSk7XG4gICAgICBpZiAodHlwZW9mIGhhbmRsZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignUmVhY3RXcmFwcGVyOjppbnZva2UoKSByZXF1aXJlcyB0aGUgbmFtZSBvZiBhIHByb3Agd2hvc2UgdmFsdWUgaXMgYSBmdW5jdGlvbicpO1xuICAgICAgfVxuICAgICAgcmV0dXJuICguLi5hcmdzKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gdHlwZW9mIHRoaXNbUkVOREVSRVJdLndyYXBJbnZva2UgPT09ICdmdW5jdGlvbidcbiAgICAgICAgICA/IHRoaXNbUkVOREVSRVJdLndyYXBJbnZva2UoKCkgPT4gaGFuZGxlciguLi5hcmdzKSlcbiAgICAgICAgICA6IGhhbmRsZXIoLi4uYXJncyk7XG4gICAgICAgIHRoaXNbUk9PVF0udXBkYXRlKCk7XG4gICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIHdyYXBwZXIgb2YgdGhlIG5vZGUgcmVuZGVyZWQgYnkgdGhlIHByb3ZpZGVkIHJlbmRlciBwcm9wLlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gcHJvcE5hbWVcbiAgICogQHJldHVybnMge0Z1bmN0aW9ufVxuICAgKi9cbiAgcmVuZGVyUHJvcChwcm9wTmFtZSkge1xuICAgIGNvbnN0IGFkYXB0ZXIgPSBnZXRBZGFwdGVyKHRoaXNbT1BUSU9OU10pO1xuICAgIGlmICh0eXBlb2YgYWRhcHRlci53cmFwICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcigneW91ciBhZGFwdGVyIGRvZXMgbm90IHN1cHBvcnQgYHdyYXBgLiBUcnkgdXBncmFkaW5nIGl0IScpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnNpbmdsZSgncmVuZGVyUHJvcCcsIChuKSA9PiB7XG4gICAgICBpZiAobi5ub2RlVHlwZSA9PT0gJ2hvc3QnKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1JlYWN0V3JhcHBlcjo6cmVuZGVyUHJvcCgpIGNhbiBvbmx5IGJlIGNhbGxlZCBvbiBjdXN0b20gY29tcG9uZW50cycpO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBwcm9wTmFtZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignUmVhY3RXcmFwcGVyOjpyZW5kZXJQcm9wKCk6IGBwcm9wTmFtZWAgbXVzdCBiZSBhIHN0cmluZycpO1xuICAgICAgfVxuICAgICAgY29uc3QgcHJvcHMgPSB0aGlzLnByb3BzKCk7XG4gICAgICBpZiAoIWhhc093bihwcm9wcywgcHJvcE5hbWUpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgUmVhY3RXcmFwcGVyOjpyZW5kZXJQcm9wKCk6IG5vIHByb3AgY2FsbGVkIOKAnCR7cHJvcE5hbWV94oCcIGZvdW5kYCk7XG4gICAgICB9XG4gICAgICBjb25zdCBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICBpZiAodHlwZW9mIHByb3BWYWx1ZSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBSZWFjdFdyYXBwZXI6OnJlbmRlclByb3AoKTogZXhwZWN0ZWQgcHJvcCDigJwke3Byb3BOYW1lfeKAnCB0byBjb250YWluIGEgZnVuY3Rpb24sIGJ1dCBpdCBob2xkcyDigJwke3R5cGVvZiBwcm9wVmFsdWV94oCcYCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAoLi4uYXJncykgPT4ge1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gcHJvcFZhbHVlKC4uLmFyZ3MpO1xuICAgICAgICBjb25zdCB3cmFwcGVkID0gYWRhcHRlci53cmFwKGVsZW1lbnQpO1xuICAgICAgICByZXR1cm4gdGhpcy53cmFwKHdyYXBwZWQsIG51bGwsIHRoaXNbT1BUSU9OU10pO1xuICAgICAgfTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBrZXkgYXNzaWduZWQgdG8gdGhlIGN1cnJlbnQgbm9kZS5cbiAgICpcbiAgICogQHJldHVybnMge1N0cmluZ31cbiAgICovXG4gIGtleSgpIHtcbiAgICByZXR1cm4gdGhpcy5zaW5nbGUoJ2tleScsIChuKSA9PiAobi5rZXkgPT09IHVuZGVmaW5lZCA/IG51bGwgOiBuLmtleSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHR5cGUgb2YgdGhlIHJvb3Qgbm9kZSBvZiB0aGlzIHdyYXBwZXIuIElmIGl0J3MgYSBjb21wb3NpdGUgY29tcG9uZW50LCB0aGlzIHdpbGwgYmVcbiAgICogdGhlIGNvbXBvbmVudCBjb25zdHJ1Y3Rvci4gSWYgaXQncyBuYXRpdmUgRE9NIG5vZGUsIGl0IHdpbGwgYmUgYSBzdHJpbmcuXG4gICAqXG4gICAqIEByZXR1cm5zIHtTdHJpbmd8RnVuY3Rpb259XG4gICAqL1xuICB0eXBlKCkge1xuICAgIHJldHVybiB0aGlzLnNpbmdsZSgndHlwZScsIChuKSA9PiB0eXBlT2ZOb2RlKG4pKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBuYW1lIG9mIHRoZSByb290IG5vZGUgb2YgdGhpcyB3cmFwcGVyLlxuICAgKlxuICAgKiBJbiBvcmRlciBvZiBwcmVjZWRlbmNlID0+IHR5cGUuZGlzcGxheU5hbWUgLT4gdHlwZS5uYW1lIC0+IHR5cGUuXG4gICAqXG4gICAqIEByZXR1cm5zIHtTdHJpbmd9XG4gICAqL1xuICBuYW1lKCkge1xuICAgIGNvbnN0IGFkYXB0ZXIgPSBnZXRBZGFwdGVyKHRoaXNbT1BUSU9OU10pO1xuICAgIHJldHVybiB0aGlzLnNpbmdsZSgnbmFtZScsIChuKSA9PiAoXG4gICAgICBhZGFwdGVyLmRpc3BsYXlOYW1lT2ZOb2RlID8gYWRhcHRlci5kaXNwbGF5TmFtZU9mTm9kZShuKSA6IGRpc3BsYXlOYW1lT2ZOb2RlKG4pXG4gICAgKSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgY3VycmVudCByb290IG5vZGUgaGFzIHRoZSBnaXZlbiBjbGFzcyBuYW1lIG9yIG5vdC5cbiAgICpcbiAgICogTk9URTogY2FuIG9ubHkgYmUgY2FsbGVkIG9uIGEgd3JhcHBlciBvZiBhIHNpbmdsZSBub2RlLlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gY2xhc3NOYW1lXG4gICAqIEByZXR1cm5zIHtCb29sZWFufVxuICAgKi9cbiAgaGFzQ2xhc3MoY2xhc3NOYW1lKSB7XG4gICAgaWYgKHR5cGVvZiBjbGFzc05hbWUgPT09ICdzdHJpbmcnICYmIGNsYXNzTmFtZS5pbmRleE9mKCcuJykgIT09IC0xKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgY29uc29sZS53YXJuKCdJdCBsb29rcyBsaWtlIHlvdVxcJ3JlIGNhbGxpbmcgYFJlYWN0V3JhcHBlcjo6aGFzQ2xhc3MoKWAgd2l0aCBhIENTUyBzZWxlY3Rvci4gaGFzQ2xhc3MoKSBleHBlY3RzIGEgY2xhc3MgbmFtZSwgbm90IGEgQ1NTIHNlbGVjdG9yLicpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5zaW5nbGUoJ2hhc0NsYXNzJywgKG4pID0+IGhhc0NsYXNzTmFtZShuLCBjbGFzc05hbWUpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJdGVyYXRlcyB0aHJvdWdoIGVhY2ggbm9kZSBvZiB0aGUgY3VycmVudCB3cmFwcGVyIGFuZCBleGVjdXRlcyB0aGUgcHJvdmlkZWQgZnVuY3Rpb24gd2l0aCBhXG4gICAqIHdyYXBwZXIgYXJvdW5kIHRoZSBjb3JyZXNwb25kaW5nIG5vZGUgcGFzc2VkIGluIGFzIHRoZSBmaXJzdCBhcmd1bWVudC5cbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAgICogQHJldHVybnMge1JlYWN0V3JhcHBlcn1cbiAgICovXG4gIGZvckVhY2goZm4pIHtcbiAgICB0aGlzLmdldE5vZGVzSW50ZXJuYWwoKS5mb3JFYWNoKChuLCBpKSA9PiBmbi5jYWxsKHRoaXMsIHRoaXMud3JhcChuKSwgaSkpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIE1hcHMgdGhlIGN1cnJlbnQgYXJyYXkgb2Ygbm9kZXMgdG8gYW5vdGhlciBhcnJheS4gRWFjaCBub2RlIGlzIHBhc3NlZCBpbiBhcyBhIGBSZWFjdFdyYXBwZXJgXG4gICAqIHRvIHRoZSBtYXAgZnVuY3Rpb24uXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gICAqIEByZXR1cm5zIHtBcnJheX1cbiAgICovXG4gIG1hcChmbikge1xuICAgIHJldHVybiB0aGlzLmdldE5vZGVzSW50ZXJuYWwoKS5tYXAoKG4sIGkpID0+IGZuLmNhbGwodGhpcywgdGhpcy53cmFwKG4pLCBpKSk7XG4gIH1cblxuICAvKipcbiAgICogUmVkdWNlcyB0aGUgY3VycmVudCBhcnJheSBvZiBub2RlcyB0byBhbm90aGVyIGFycmF5LlxuICAgKiBFYWNoIG5vZGUgaXMgcGFzc2VkIGluIGFzIGEgYFNoYWxsb3dXcmFwcGVyYCB0byB0aGUgcmVkdWNlciBmdW5jdGlvbi5cbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gLSB0aGUgcmVkdWNlciBmdW5jdGlvblxuICAgKiBAcGFyYW0geyp9IGluaXRpYWxWYWx1ZSAtIHRoZSBpbml0aWFsIHZhbHVlXG4gICAqIEByZXR1cm5zIHsqfVxuICAgKi9cbiAgcmVkdWNlKGZuLCBpbml0aWFsVmFsdWUgPSB1bmRlZmluZWQpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldE5vZGVzSW50ZXJuYWwoKS5yZWR1Y2UoXG4gICAgICAgIChhY2N1bSwgbiwgaSkgPT4gZm4uY2FsbCh0aGlzLCBhY2N1bSwgdGhpcy53cmFwKG4pLCBpKSxcbiAgICAgICAgaW5pdGlhbFZhbHVlLFxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZ2V0Tm9kZXNJbnRlcm5hbCgpLnJlZHVjZSgoYWNjdW0sIG4sIGkpID0+IGZuLmNhbGwoXG4gICAgICB0aGlzLFxuICAgICAgaSA9PT0gMSA/IHRoaXMud3JhcChhY2N1bSkgOiBhY2N1bSxcbiAgICAgIHRoaXMud3JhcChuKSxcbiAgICAgIGksXG4gICAgKSk7XG4gIH1cblxuICAvKipcbiAgICogUmVkdWNlcyB0aGUgY3VycmVudCBhcnJheSBvZiBub2RlcyB0byBhbm90aGVyIGFycmF5LCBmcm9tIHJpZ2h0IHRvIGxlZnQuIEVhY2ggbm9kZSBpcyBwYXNzZWRcbiAgICogaW4gYXMgYSBgU2hhbGxvd1dyYXBwZXJgIHRvIHRoZSByZWR1Y2VyIGZ1bmN0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiAtIHRoZSByZWR1Y2VyIGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7Kn0gaW5pdGlhbFZhbHVlIC0gdGhlIGluaXRpYWwgdmFsdWVcbiAgICogQHJldHVybnMgeyp9XG4gICAqL1xuICByZWR1Y2VSaWdodChmbiwgaW5pdGlhbFZhbHVlID0gdW5kZWZpbmVkKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXROb2Rlc0ludGVybmFsKCkucmVkdWNlUmlnaHQoXG4gICAgICAgIChhY2N1bSwgbiwgaSkgPT4gZm4uY2FsbCh0aGlzLCBhY2N1bSwgdGhpcy53cmFwKG4pLCBpKSxcbiAgICAgICAgaW5pdGlhbFZhbHVlLFxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZ2V0Tm9kZXNJbnRlcm5hbCgpLnJlZHVjZVJpZ2h0KChhY2N1bSwgbiwgaSkgPT4gZm4uY2FsbChcbiAgICAgIHRoaXMsXG4gICAgICBpID09PSAxID8gdGhpcy53cmFwKGFjY3VtKSA6IGFjY3VtLFxuICAgICAgdGhpcy53cmFwKG4pLFxuICAgICAgaSxcbiAgICApKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgbmV3IHdyYXBwZXIgd2l0aCBhIHN1YnNldCBvZiB0aGUgbm9kZXMgb2YgdGhlIG9yaWdpbmFsIHdyYXBwZXIsIGFjY29yZGluZyB0byB0aGVcbiAgICogcnVsZXMgb2YgYEFycmF5I3NsaWNlYC5cbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGJlZ2luXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBlbmRcbiAgICogQHJldHVybnMge1NoYWxsb3dXcmFwcGVyfVxuICAgKi9cbiAgc2xpY2UoYmVnaW4sIGVuZCkge1xuICAgIHJldHVybiB0aGlzLndyYXAodGhpcy5nZXROb2Rlc0ludGVybmFsKCkuc2xpY2UoYmVnaW4sIGVuZCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgd2hldGhlciBvciBub3QgYW55IG9mIHRoZSBub2RlcyBpbiB0aGUgd3JhcHBlciBtYXRjaCB0aGUgcHJvdmlkZWQgc2VsZWN0b3IuXG4gICAqXG4gICAqIEBwYXJhbSB7RW56eW1lU2VsZWN0b3J9IHNlbGVjdG9yXG4gICAqIEByZXR1cm5zIHtCb29sZWFufVxuICAgKi9cbiAgc29tZShzZWxlY3Rvcikge1xuICAgIGlmICh0aGlzW1JPT1RdID09PSB0aGlzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1JlYWN0V3JhcHBlcjo6c29tZSgpIGNhbiBub3QgYmUgY2FsbGVkIG9uIHRoZSByb290Jyk7XG4gICAgfVxuICAgIGNvbnN0IHByZWRpY2F0ZSA9IGJ1aWxkUHJlZGljYXRlKHNlbGVjdG9yKTtcbiAgICByZXR1cm4gdGhpcy5nZXROb2Rlc0ludGVybmFsKCkuc29tZShwcmVkaWNhdGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgd2hldGhlciBvciBub3QgYW55IG9mIHRoZSBub2RlcyBpbiB0aGUgd3JhcHBlciBwYXNzIHRoZSBwcm92aWRlZCBwcmVkaWNhdGUgZnVuY3Rpb24uXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IHByZWRpY2F0ZVxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAgICovXG4gIHNvbWVXaGVyZShwcmVkaWNhdGUpIHtcbiAgICByZXR1cm4gdGhpcy5nZXROb2Rlc0ludGVybmFsKCkuc29tZSgobiwgaSkgPT4gcHJlZGljYXRlLmNhbGwodGhpcywgdGhpcy53cmFwKG4pLCBpKSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB3aGV0aGVyIG9yIG5vdCBhbGwgb2YgdGhlIG5vZGVzIGluIHRoZSB3cmFwcGVyIG1hdGNoIHRoZSBwcm92aWRlZCBzZWxlY3Rvci5cbiAgICpcbiAgICogQHBhcmFtIHtFbnp5bWVTZWxlY3Rvcn0gc2VsZWN0b3JcbiAgICogQHJldHVybnMge0Jvb2xlYW59XG4gICAqL1xuICBldmVyeShzZWxlY3Rvcikge1xuICAgIGNvbnN0IHByZWRpY2F0ZSA9IGJ1aWxkUHJlZGljYXRlKHNlbGVjdG9yKTtcbiAgICByZXR1cm4gdGhpcy5nZXROb2Rlc0ludGVybmFsKCkuZXZlcnkocHJlZGljYXRlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHdoZXRoZXIgb3Igbm90IGFueSBvZiB0aGUgbm9kZXMgaW4gdGhlIHdyYXBwZXIgcGFzcyB0aGUgcHJvdmlkZWQgcHJlZGljYXRlIGZ1bmN0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBwcmVkaWNhdGVcbiAgICogQHJldHVybnMge0Jvb2xlYW59XG4gICAqL1xuICBldmVyeVdoZXJlKHByZWRpY2F0ZSkge1xuICAgIHJldHVybiB0aGlzLmdldE5vZGVzSW50ZXJuYWwoKS5ldmVyeSgobiwgaSkgPT4gcHJlZGljYXRlLmNhbGwodGhpcywgdGhpcy53cmFwKG4pLCBpKSk7XG4gIH1cblxuICAvKipcbiAgICogVXRpbGl0eSBtZXRob2QgdXNlZCB0byBjcmVhdGUgbmV3IHdyYXBwZXJzIHdpdGggYSBtYXBwaW5nIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhbiBhcnJheSBvZlxuICAgKiBub2RlcyBpbiByZXNwb25zZSB0byBhIHNpbmdsZSBub2RlIHdyYXBwZXIuIFRoZSByZXR1cm5lZCB3cmFwcGVyIGlzIGEgc2luZ2xlIHdyYXBwZXIgYXJvdW5kXG4gICAqIGFsbCBvZiB0aGUgbWFwcGVkIG5vZGVzIGZsYXR0ZW5lZCAoYW5kIGRlLWR1cGxpY2F0ZWQpLlxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICAgKiBAcmV0dXJucyB7UmVhY3RXcmFwcGVyfVxuICAgKi9cbiAgZmxhdE1hcChmbikge1xuICAgIGNvbnN0IG5vZGVzID0gdGhpcy5nZXROb2Rlc0ludGVybmFsKCkubWFwKChuLCBpKSA9PiBmbi5jYWxsKHRoaXMsIHRoaXMud3JhcChuKSwgaSkpO1xuICAgIGNvbnN0IGZsYXR0ZW5lZCA9IGZsYXQobm9kZXMsIDEpO1xuICAgIHJldHVybiB0aGlzLndyYXAoZmxhdHRlbmVkLmZpbHRlcihCb29sZWFuKSk7XG4gIH1cblxuICAvKipcbiAgICogRmluZHMgYWxsIG5vZGVzIGluIHRoZSBjdXJyZW50IHdyYXBwZXIgbm9kZXMnIHJlbmRlciB0cmVlcyB0aGF0IG1hdGNoIHRoZSBwcm92aWRlZCBwcmVkaWNhdGVcbiAgICogZnVuY3Rpb24uXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IHByZWRpY2F0ZVxuICAgKiBAcmV0dXJucyB7UmVhY3RXcmFwcGVyfVxuICAgKi9cbiAgZmluZFdoZXJlKHByZWRpY2F0ZSkge1xuICAgIHJldHVybiBmaW5kV2hlcmVVbndyYXBwZWQodGhpcywgKG4pID0+IHtcbiAgICAgIGNvbnN0IG5vZGUgPSB0aGlzLndyYXAobik7XG4gICAgICByZXR1cm4gbm9kZS5sZW5ndGggPiAwICYmIHByZWRpY2F0ZShub2RlKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBub2RlIGF0IGEgZ2l2ZW4gaW5kZXggb2YgdGhlIGN1cnJlbnQgd3JhcHBlci5cbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGluZGV4XG4gICAqIEByZXR1cm5zIHtSZWFjdEVsZW1lbnR9XG4gICAqL1xuICBnZXQoaW5kZXgpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRFbGVtZW50cygpW2luZGV4XTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgd3JhcHBlciBhcm91bmQgdGhlIG5vZGUgYXQgYSBnaXZlbiBpbmRleCBvZiB0aGUgY3VycmVudCB3cmFwcGVyLlxuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gaW5kZXhcbiAgICogQHJldHVybnMge1JlYWN0V3JhcHBlcn1cbiAgICovXG4gIGF0KGluZGV4KSB7XG4gICAgY29uc3Qgbm9kZXMgPSB0aGlzLmdldE5vZGVzSW50ZXJuYWwoKTtcbiAgICBpZiAoaW5kZXggPCBub2Rlcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiB0aGlzLndyYXAobm9kZXNbaW5kZXhdKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMud3JhcChbXSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIHdyYXBwZXIgYXJvdW5kIHRoZSBmaXJzdCBub2RlIG9mIHRoZSBjdXJyZW50IHdyYXBwZXIuXG4gICAqXG4gICAqIEByZXR1cm5zIHtSZWFjdFdyYXBwZXJ9XG4gICAqL1xuICBmaXJzdCgpIHtcbiAgICByZXR1cm4gdGhpcy5hdCgwKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgd3JhcHBlciBhcm91bmQgdGhlIGxhc3Qgbm9kZSBvZiB0aGUgY3VycmVudCB3cmFwcGVyLlxuICAgKlxuICAgKiBAcmV0dXJucyB7UmVhY3RXcmFwcGVyfVxuICAgKi9cbiAgbGFzdCgpIHtcbiAgICByZXR1cm4gdGhpcy5hdCh0aGlzLmxlbmd0aCAtIDEpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlbGVnYXRlcyB0byBleGlzdHMoKVxuICAgKlxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICovXG4gIGlzRW1wdHkoKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICBjb25zb2xlLndhcm4oJ0VuenltZTo6RGVwcmVjYXRlZCBtZXRob2QgaXNFbXB0eSgpIGNhbGxlZCwgdXNlIGV4aXN0cygpIGluc3RlYWQuJyk7XG4gICAgcmV0dXJuICF0aGlzLmV4aXN0cygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgY3VycmVudCB3cmFwcGVyIGhhcyBub2Rlcy4gRmFsc2Ugb3RoZXJ3aXNlLlxuICAgKiBJZiBjYWxsZWQgd2l0aCBhIHNlbGVjdG9yIGl0IHJldHVybnMgYC5maW5kKHNlbGVjdG9yKS5leGlzdHMoKWAgaW5zdGVhZC5cbiAgICpcbiAgICogQHBhcmFtIHtFbnp5bWVTZWxlY3Rvcn0gc2VsZWN0b3IgKG9wdGlvbmFsKVxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICovXG4gIGV4aXN0cyhzZWxlY3RvciA9IG51bGwpIHtcbiAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA+IDAgPyB0aGlzLmZpbmQoc2VsZWN0b3IpLmV4aXN0cygpIDogdGhpcy5sZW5ndGggPiAwO1xuICB9XG5cbiAgLyoqXG4gICAqIFV0aWxpdHkgbWV0aG9kIHRoYXQgdGhyb3dzIGFuIGVycm9yIGlmIHRoZSBjdXJyZW50IGluc3RhbmNlIGhhcyBhIGxlbmd0aCBvdGhlciB0aGFuIG9uZS5cbiAgICogVGhpcyBpcyBwcmltYXJpbHkgdXNlZCB0byBlbmZvcmNlIHRoYXQgY2VydGFpbiBtZXRob2RzIGFyZSBvbmx5IHJ1biBvbiBhIHdyYXBwZXIgd2hlbiBpdCBpc1xuICAgKiB3cmFwcGluZyBhIHNpbmdsZSBub2RlLlxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICAgKiBAcmV0dXJucyB7Kn1cbiAgICovXG4gIHNpbmdsZShuYW1lLCBmbikge1xuICAgIGNvbnN0IGZuTmFtZSA9IHR5cGVvZiBuYW1lID09PSAnc3RyaW5nJyA/IG5hbWUgOiAndW5rbm93bic7XG4gICAgY29uc3QgY2FsbGJhY2sgPSB0eXBlb2YgZm4gPT09ICdmdW5jdGlvbicgPyBmbiA6IG5hbWU7XG4gICAgaWYgKHRoaXMubGVuZ3RoICE9PSAxKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYE1ldGhvZCDigJwke2ZuTmFtZX3igJ0gaXMgbWVhbnQgdG8gYmUgcnVuIG9uIDEgbm9kZS4gJHt0aGlzLmxlbmd0aH0gZm91bmQgaW5zdGVhZC5gKTtcbiAgICB9XG4gICAgcmV0dXJuIGNhbGxiYWNrLmNhbGwodGhpcywgdGhpcy5nZXROb2RlSW50ZXJuYWwoKSk7XG4gIH1cblxuICAvKipcbiAgICogSGVscGZ1bCB1dGlsaXR5IG1ldGhvZCB0byBjcmVhdGUgYSBuZXcgd3JhcHBlciB3aXRoIHRoZSBzYW1lIHJvb3QgYXMgdGhlIGN1cnJlbnQgd3JhcHBlciwgd2l0aFxuICAgKiBhbnkgbm9kZXMgcGFzc2VkIGluIGFzIHRoZSBmaXJzdCBwYXJhbWV0ZXIgYXV0b21hdGljYWxseSB3cmFwcGVkLlxuICAgKlxuICAgKiBAcGFyYW0ge1JlYWN0V3JhcHBlcnxSZWFjdEVsZW1lbnR8QXJyYXk8UmVhY3RFbGVtZW50Pn0gbm9kZVxuICAgKiBAcmV0dXJucyB7UmVhY3RXcmFwcGVyfVxuICAgKi9cbiAgd3JhcChub2RlLCByb290ID0gdGhpc1tST09UXSwgLi4uYXJncykge1xuICAgIGlmIChub2RlIGluc3RhbmNlb2YgUmVhY3RXcmFwcGVyKSB7XG4gICAgICByZXR1cm4gbm9kZTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBSZWFjdFdyYXBwZXIobm9kZSwgcm9vdCwgLi4uYXJncyk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhbiBIVE1MLWxpa2Ugc3RyaW5nIG9mIHRoZSBzaGFsbG93IHJlbmRlciBmb3IgZGVidWdnaW5nIHB1cnBvc2VzLlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIC0gUHJvcGVydHkgYmFnIG9mIGFkZGl0aW9uYWwgb3B0aW9ucy5cbiAgICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5pZ25vcmVQcm9wc10gLSBpZiB0cnVlLCBwcm9wcyBhcmUgb21pdHRlZCBmcm9tIHRoZSBzdHJpbmcuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMudmVyYm9zZV0gLSBpZiB0cnVlLCBhcnJheXMgYW5kIG9iamVjdHMgdG8gYmUgdmVyYm9zZWx5IHByaW50ZWQuXG4gICAqIEByZXR1cm5zIHtTdHJpbmd9XG4gICAqL1xuICBkZWJ1ZyhvcHRpb25zID0ge30pIHtcbiAgICByZXR1cm4gZGVidWdOb2Rlcyh0aGlzLmdldE5vZGVzSW50ZXJuYWwoKSwgb3B0aW9ucyk7XG4gIH1cblxuICAvKipcbiAgICogSW52b2tlcyBpbnRlcmNlcHRlciBhbmQgcmV0dXJucyBpdHNlbGYuIGludGVyY2VwdGVyIGlzIGNhbGxlZCB3aXRoIGl0c2VsZi5cbiAgICogVGhpcyBpcyBoZWxwZnVsIHdoZW4gZGVidWdnaW5nIG5vZGVzIGluIG1ldGhvZCBjaGFpbnMuXG4gICAqIEBwYXJhbSBmblxuICAgKiBAcmV0dXJucyB7UmVhY3RXcmFwcGVyfVxuICAgKi9cbiAgdGFwKGludGVyY2VwdGVyKSB7XG4gICAgaW50ZXJjZXB0ZXIodGhpcyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogRGV0YWNoZXMgdGhlIHJlYWN0IHRyZWUgZnJvbSB0aGUgRE9NLiBSdW5zIGBSZWFjdERPTS51bm1vdW50Q29tcG9uZW50QXROb2RlKClgIHVuZGVyIHRoZSBob29kLlxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCB3aWxsIG1vc3QgY29tbW9ubHkgYmUgdXNlZCBhcyBhIFwiY2xlYW51cFwiIG1ldGhvZCBpZiB5b3UgZGVjaWRlIHRvIHVzZSB0aGVcbiAgICogYGF0dGFjaFRvYCBvcHRpb24gaW4gYG1vdW50KG5vZGUsIG9wdGlvbnMpYC5cbiAgICpcbiAgICogVGhlIG1ldGhvZCBpcyBpbnRlbnRpb25hbGx5IG5vdCBcImZsdWVudFwiIChpbiB0aGF0IGl0IGRvZXNuJ3QgcmV0dXJuIGB0aGlzYCkgYmVjYXVzZSB5b3Ugc2hvdWxkXG4gICAqIG5vdCBiZSBkb2luZyBhbnl0aGluZyB3aXRoIHRoaXMgd3JhcHBlciBhZnRlciB0aGlzIG1ldGhvZCBpcyBjYWxsZWQuXG4gICAqL1xuICBkZXRhY2goKSB7XG4gICAgaWYgKHRoaXNbUk9PVF0gIT09IHRoaXMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignUmVhY3RXcmFwcGVyOjpkZXRhY2goKSBjYW4gb25seSBiZSBjYWxsZWQgb24gdGhlIHJvb3QnKTtcbiAgICB9XG4gICAgaWYgKCF0aGlzW09QVElPTlNdLmF0dGFjaFRvKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1JlYWN0V3JhcHBlcjo6ZGV0YWNoKCkgY2FuIG9ubHkgYmUgY2FsbGVkIG9uIHdoZW4gdGhlIGBhdHRhY2hUb2Agb3B0aW9uIHdhcyBwYXNzZWQgaW50byBgbW91bnQoKWAuJyk7XG4gICAgfVxuICAgIHRoaXNbUkVOREVSRVJdLnVubW91bnQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdHJpcHMgb3V0IGFsbCB0aGUgbm90IGhvc3Qtbm9kZXMgZnJvbSB0aGUgbGlzdCBvZiBub2Rlc1xuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBpcyB1c2VmdWwgaWYgeW91IHdhbnQgdG8gY2hlY2sgZm9yIHRoZSBwcmVzZW5jZSBvZiBob3N0IG5vZGVzXG4gICAqIChhY3R1YWxseSByZW5kZXJlZCBIVE1MIGVsZW1lbnRzKSBpZ25vcmluZyB0aGUgUmVhY3Qgbm9kZXMuXG4gICAqL1xuICBob3N0Tm9kZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuZmlsdGVyV2hlcmUoKG4pID0+IHR5cGVvZiBuLnR5cGUoKSA9PT0gJ3N0cmluZycpO1xuICB9XG59XG5cbi8qKlxuICogQSAqc3BlY2lhbCogXCJyb290XCIgd3JhcHBlciB0aGF0IHJlcHJlc2VudHMgdGhlIGNvbXBvbmVudCBwYXNzZWQgYXMgYHdyYXBwaW5nQ29tcG9uZW50YC5cbiAqIEl0IGlzIGxpbmtlZCB0byB0aGUgcHJpbWFyeSByb290IHN1Y2ggdGhhdCB1cGRhdGVzIHRvIGl0IHdpbGwgdXBkYXRlIHRoZSBwcmltYXJ5LFxuICogYW5kIHZpY2UgdmVyc2EuXG4gKlxuICogQGNsYXNzIFdyYXBwaW5nQ29tcG9uZW50V3JhcHBlclxuICovXG5jbGFzcyBXcmFwcGluZ0NvbXBvbmVudFdyYXBwZXIgZXh0ZW5kcyBSZWFjdFdyYXBwZXIge1xuICAvKiBlc2xpbnQtZGlzYWJsZSBjbGFzcy1tZXRob2RzLXVzZS10aGlzICovXG4gIGNvbnN0cnVjdG9yKHJvb3QsIHJlbmRlcmVyKSB7XG4gICAgc3VwZXIocmVuZGVyZXIuZ2V0Tm9kZSgpLCByb290KTtcblxuICAgIHByaXZhdGVTZXQodGhpcywgUk9PVCwgdGhpcyk7XG4gICAgcHJpdmF0ZVNldCh0aGlzLCBSRU5ERVJFUiwgcmVuZGVyZXIpO1xuICAgIHRoaXNbTElOS0VEX1JPT1RTXS5wdXNoKHJvb3QpO1xuICB9XG5cbiAgZ2V0V3JhcHBpbmdDb21wb25lbnQoKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignUmVhY3RXcmFwcGVyOjpnZXRXcmFwcGluZ0NvbXBvbmVudCgpIGNhbiBvbmx5IGJlIGNhbGxlZCBvbiB0aGUgcm9vdCcpO1xuICB9XG59XG5cbmlmIChJVEVSQVRPUl9TWU1CT0wpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFJlYWN0V3JhcHBlci5wcm90b3R5cGUsIElURVJBVE9SX1NZTUJPTCwge1xuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICB2YWx1ZTogZnVuY3Rpb24gaXRlcmF0b3IoKSB7XG4gICAgICBjb25zdCBpdGVyID0gdGhpc1tOT0RFU11bSVRFUkFUT1JfU1lNQk9MXSgpO1xuICAgICAgY29uc3QgYWRhcHRlciA9IGdldEFkYXB0ZXIodGhpc1tPUFRJT05TXSk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBbSVRFUkFUT1JfU1lNQk9MXSgpIHsgcmV0dXJuIHRoaXM7IH0sXG4gICAgICAgIG5leHQoKSB7XG4gICAgICAgICAgY29uc3QgbmV4dCA9IGl0ZXIubmV4dCgpO1xuICAgICAgICAgIGlmIChuZXh0LmRvbmUpIHtcbiAgICAgICAgICAgIHJldHVybiB7IGRvbmU6IHRydWUgfTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGRvbmU6IGZhbHNlLFxuICAgICAgICAgICAgdmFsdWU6IGFkYXB0ZXIubm9kZVRvRWxlbWVudChuZXh0LnZhbHVlKSxcbiAgICAgICAgICB9O1xuICAgICAgICB9LFxuICAgICAgfTtcbiAgICB9LFxuICB9KTtcbn1cblxuZnVuY3Rpb24gcHJpdmF0ZVdhcm5pbmcocHJvcCwgZXh0cmFNZXNzYWdlKSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShSZWFjdFdyYXBwZXIucHJvdG90eXBlLCBwcm9wLCB7XG4gICAgZ2V0KCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKHRyaW0oYFxuICAgICAgICBBdHRlbXB0ZWQgdG8gYWNjZXNzIFJlYWN0V3JhcHBlcjo6JHtwcm9wfSwgd2hpY2ggd2FzIHByZXZpb3VzbHkgYSBwcml2YXRlIHByb3BlcnR5IG9uXG4gICAgICAgIEVuenltZSBSZWFjdFdyYXBwZXIgaW5zdGFuY2VzLCBidXQgaXMgbm8gbG9uZ2VyIGFuZCBzaG91bGQgbm90IGJlIHJlbGllZCB1cG9uLlxuICAgICAgICAke2V4dHJhTWVzc2FnZX1cbiAgICAgIGApKTtcbiAgICB9LFxuICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gIH0pO1xufVxuXG5wcml2YXRlV2FybmluZygnbm9kZScsICdDb25zaWRlciB1c2luZyB0aGUgZ2V0RWxlbWVudCgpIG1ldGhvZCBpbnN0ZWFkLicpO1xucHJpdmF0ZVdhcm5pbmcoJ25vZGVzJywgJ0NvbnNpZGVyIHVzaW5nIHRoZSBnZXRFbGVtZW50cygpIG1ldGhvZCBpbnN0ZWFkLicpO1xucHJpdmF0ZVdhcm5pbmcoJ3JlbmRlcmVyJywgJycpO1xucHJpdmF0ZVdhcm5pbmcoJ29wdGlvbnMnLCAnJyk7XG5wcml2YXRlV2FybmluZygnY29tcGxleFNlbGVjdG9yJywgJycpO1xuXG5leHBvcnQgZGVmYXVsdCBSZWFjdFdyYXBwZXI7XG4iXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLElBQUFBLGVBQUEsR0FBQUMsc0JBQUEsQ0FBQUMsT0FBQTtBQUNBLElBQUFDLE9BQUEsR0FBQUYsc0JBQUEsQ0FBQUMsT0FBQTtBQUNBLElBQUFFLGdCQUFBLEdBQUFILHNCQUFBLENBQUFDLE9BQUE7QUFFQSxJQUFBRyxNQUFBLEdBQUFILE9BQUE7QUFlQSxJQUFBSSxXQUFBLEdBQUFMLHNCQUFBLENBQUFDLE9BQUE7QUFDQSxJQUFBSyxNQUFBLEdBQUFMLE9BQUE7QUFDQSxJQUFBTSxhQUFBLEdBQUFOLE9BQUE7QUFVQSxJQUFBTyxVQUFBLEdBQUFQLE9BQUE7QUFBb0UsU0FBQUQsdUJBQUFTLENBQUEsV0FBQUEsQ0FBQSxJQUFBQSxDQUFBLENBQUFDLFVBQUEsR0FBQUQsQ0FBQSxnQkFBQUEsQ0FBQTtBQUFBLFNBQUFFLFdBQUFDLENBQUEsRUFBQUMsQ0FBQSxFQUFBSixDQUFBLFdBQUFJLENBQUEsR0FBQUMsZUFBQSxDQUFBRCxDQUFBLEdBQUFFLDBCQUFBLENBQUFILENBQUEsRUFBQUkseUJBQUEsS0FBQUMsT0FBQSxDQUFBQyxTQUFBLENBQUFMLENBQUEsRUFBQUosQ0FBQSxRQUFBSyxlQUFBLENBQUFGLENBQUEsRUFBQU8sV0FBQSxJQUFBTixDQUFBLENBQUFPLEtBQUEsQ0FBQVIsQ0FBQSxFQUFBSCxDQUFBO0FBQUEsU0FBQU0sMkJBQUFILENBQUEsRUFBQUgs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
//# sourceMappingURL=ReactWrapper.js.map