"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildPredicate = buildPredicate;
exports.reduceTreeBySelector = reduceTreeBySelector;
exports.reduceTreesBySelector = reduceTreesBySelector;
var _rstSelectorParser = require("rst-selector-parser");
var _object = _interopRequireDefault(require("object.values"));
var _arrayPrototype = _interopRequireDefault(require("array.prototype.flat"));
var _objectIs = _interopRequireDefault(require("object-is"));
var _hasown = _interopRequireDefault(require("hasown"));
var _byConstructor = _interopRequireDefault(require("html-element-map/byConstructor"));
var _RSTTraversal = require("./RSTTraversal");
var _Utils = require("./Utils");
var _getAdapter = _interopRequireDefault(require("./getAdapter"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
// our CSS selector parser instance
var parser = (0, _rstSelectorParser.createParser)();

// Combinators that allow you to chance selectors
var CHILD = 'childCombinator';
var ADJACENT_SIBLING = 'adjacentSiblingCombinator';
var GENERAL_SIBLING = 'generalSiblingCombinator';
var DESCENDANT = 'descendantCombinator';

// Selectors for targeting elements
var SELECTOR = 'selector';
var TYPE_SELECTOR = 'typeSelector';
var CLASS_SELECTOR = 'classSelector';
var ID_SELECTOR = 'idSelector';
var UNIVERSAL_SELECTOR = 'universalSelector';
var ATTRIBUTE_PRESENCE = 'attributePresenceSelector';
var ATTRIBUTE_VALUE = 'attributeValueSelector';
// @TODO we dont support these, throw if they are used
var PSEUDO_CLASS = 'pseudoClassSelector';
var PSEUDO_ELEMENT = 'pseudoElementSelector';
var EXACT_ATTRIBUTE_OPERATOR = '=';
var WHITELIST_ATTRIBUTE_OPERATOR = '~=';
var HYPHENATED_ATTRIBUTE_OPERATOR = '|=';
var PREFIX_ATTRIBUTE_OPERATOR = '^=';
var SUFFIX_ATTRIBUTE_OPERATOR = '$=';
var SUBSTRING_ATTRIBUTE_OPERATOR = '*=';
function unique(arr) {
  return _toConsumableArray(new Set(arr));
}

/**
 * Calls reduce on a array of nodes with the passed
 * function, returning only unique results.
 * @param {Function} fn
 * @param {Array<Node>} nodes
 */
function uniqueReduce(fn, nodes) {
  return unique(nodes.reduce(fn, []));
}

/**
 * Takes a CSS selector and returns a set of tokens parsed
 * by scalpel.
 * @param {String} selector
 */
function safelyGenerateTokens(selector) {
  try {
    return parser.parse(selector);
  } catch (err) {
    throw new Error("Failed to parse selector: ".concat(selector));
  }
}
function matchAttributeSelector(node, token) {
  var operator = token.operator,
    value = token.value,
    name = token.name;
  var nodeProps = (0, _Utils.propsOfNode)(node);
  var descriptor = Object.getOwnPropertyDescriptor(nodeProps, name);
  if (descriptor && descriptor.get) {
    return false;
  }
  var nodePropValue = nodeProps[name];
  if (typeof nodePropValue === 'undefined') {
    return false;
  }
  if (token.type === ATTRIBUTE_PRESENCE) {
    return (0, _hasown["default"])(nodeProps, token.name);
  }
  // Only the exact value operator ("=") can match non-strings
  if (typeof nodePropValue !== 'string' || typeof value !== 'string') {
    if (operator !== EXACT_ATTRIBUTE_OPERATOR) {
      return false;
    }
  }
  switch (operator) {
    /**
     * Represents an element with the att attribute whose value is exactly "val".
     * @example
     * [attr="val"] matches attr="val"
     */
    case EXACT_ATTRIBUTE_OPERATOR:
      return (0, _objectIs["default"])(nodePropValue, value);
    /**
     * Represents an element with the att attribute whose value is a whitespace-separated
     * list of words, one of which is exactly
     * @example
     *  [rel~="copyright"] matches rel="copyright other"
     */
    case WHITELIST_ATTRIBUTE_OPERATOR:
      return nodePropValue.split(' ').indexOf(value) !== -1;
    /**
     * Represents an element with the att attribute, its value either being exactly the
     * value or beginning with the value immediately followed by "-"
     * @example
     * [hreflang|="en"] matches hreflang="en-US"
     */
    case HYPHENATED_ATTRIBUTE_OPERATOR:
      return nodePropValue === value || nodePropValue.startsWith("".concat(value, "-"));
    /**
     * Represents an element with the att attribute whose value begins with the prefix value.
     * If the value is the empty string then the selector does not represent anything.
     * @example
     * [type^="image"] matches type="imageobject"
     */
    case PREFIX_ATTRIBUTE_OPERATOR:
      return value === '' ? false : nodePropValue.slice(0, value.length) === value;
    /**
     * Represents an element with the att attribute whose value ends with the suffix value.
     * If the value is the empty string then the selector does not represent anything.
     * @example
     * [type$="image"] matches type="imageobject"
     */
    case SUFFIX_ATTRIBUTE_OPERATOR:
      return value === '' ? false : nodePropValue.slice(-value.length) === value;
    /**
     * Represents an element with the att attribute whose value contains at least one
     * instance of the value. If value is the empty string then the
     * selector does not represent anything.
     * @example
     * [title*="hello"] matches title="well hello there"
     */
    case SUBSTRING_ATTRIBUTE_OPERATOR:
      return value === '' ? false : nodePropValue.indexOf(value) !== -1;
    default:
      throw new Error("Enzyme::Selector: Unknown attribute selector operator \"".concat(operator, "\""));
  }
}
function matchPseudoSelector(node, token, root) {
  var name = token.name,
    parameters = token.parameters;
  if (name === 'not') {
    // eslint-disable-next-line no-use-before-define
    return parameters.every(function (selector) {
      return reduceTreeBySelector(selector, node).length === 0;
    });
  }
  if (name === 'empty') {
    return (0, _RSTTraversal.treeFilter)(node, function (n) {
      return n !== node;
    }).length === 0;
  }
  if (name === 'first-child') {
    var _findParentNode = (0, _RSTTraversal.findParentNode)(root, node),
      rendered = _findParentNode.rendered;
    var _rendered = _slicedToArray(rendered, 1),
      firstChild = _rendered[0];
    return firstChild === node;
  }
  if (name === 'last-child') {
    var _findParentNode2 = (0, _RSTTraversal.findParentNode)(root, node),
      _rendered2 = _findParentNode2.rendered;
    return _rendered2[_rendered2.length - 1] === node;
  }
  if (name === 'focus') {
    if (typeof document === 'undefined') {
      throw new Error('Enzyme::Selector does not support the ":focus" pseudo-element without a global `document`.');
    }
    var adapter = (0, _getAdapter["default"])();
    /* eslint-env browser */
    return document.activeElement && adapter.nodeToHostNode(node) === document.activeElement;
  }
  throw new TypeError("Enzyme::Selector does not support the \"".concat(token.name, "\" pseudo-element or pseudo-class selectors."));
}

/**
 * Takes a node and a token and determines if the node
 * matches the predicate defined by the token.
 * @param {Node} node
 * @param {Token} token
 */
function nodeMatchesToken(node, token, root) {
  if (node === null || typeof node === 'string') {
    return false;
  }
  switch (token.type) {
    /**
     * Match every node
     * @example '*' matches every node
     */
    case UNIVERSAL_SELECTOR:
      return true;
    /**
     * Match against the className prop
     * @example '.active' matches <div className='active' />
     */
    case CLASS_SELECTOR:
      return (0, _RSTTraversal.hasClassName)(node, token.name);
    /**
     * Simple type matching
     * @example 'div' matches <div />
     */
    case TYPE_SELECTOR:
      return (0, _Utils.nodeHasType)(node, token.name);
    /**
     * Match against the `id` prop
     * @example '#nav' matches <ul id="nav" />
     */
    case ID_SELECTOR:
      return (0, _RSTTraversal.nodeHasId)(node, token.name);
    /**
     * Matches if an attribute is present, regardless
     * of its value
     * @example '[disabled]' matches <a disabled />
     */
    case ATTRIBUTE_PRESENCE:
      return matchAttributeSelector(node, token);
    /**
     * Matches if an attribute is present with the
     * provided value
     * @example '[data-foo=foo]' matches <div data-foo="foo" />
     */
    case ATTRIBUTE_VALUE:
      return matchAttributeSelector(node, token);
    case PSEUDO_ELEMENT:
    case PSEUDO_CLASS:
      return matchPseudoSelector(node, token, root);
    default:
      throw new Error("Unknown token type: ".concat(token.type));
  }
}

/**
 * Returns a predicate function that checks if a
 * node matches every token in the body of a selector
 * token.
 * @param {Token} token
 */
function buildPredicateFromToken(token, root) {
  return function (node) {
    return token.body.every(function (bodyToken) {
      return nodeMatchesToken(node, bodyToken, root);
    });
  };
}

/**
 * Returns whether a parsed selector is a complex selector, which
 * is defined as a selector that contains combinators.
 * @param {Array<Token>} tokens
 */
function isComplexSelector(tokens) {
  return tokens.some(function (token) {
    return token.type !== SELECTOR;
  });
}

/**
 * Takes a component constructor, object, or string representing
 * a simple selector and returns a predicate function that can
 * be applied to a single node.
 * @param {EnzymeSelector} selector
 */
function buildPredicate(selector) {
  // If the selector is a string, parse it as a simple CSS selector
  if (typeof selector === 'string') {
    var tokens = safelyGenerateTokens(selector);
    if (isComplexSelector(tokens)) {
      throw new TypeError('This method does not support complex CSS selectors');
    }
    // Simple selectors only have a single selector token
    return buildPredicateFromToken(tokens[0]);
  }

  // If the selector is an element type, check if the node's type matches
  var adapter = (0, _getAdapter["default"])();
  var isElementType = adapter.isValidElementType ? adapter.isValidElementType(selector) : typeof selector === 'function';
  if (isElementType) {
    return function (node) {
      return adapter.matchesElementType(node, selector);
    };
  }
  // If the selector is an non-empty object, treat the keys/values as props
  if (_typeof(selector) === 'object') {
    if (!Array.isArray(selector) && selector !== null && Object.keys(selector).length > 0) {
      var hasUndefinedValues = (0, _object["default"])(selector).some(function (value) {
        return typeof value === 'undefined';
      });
      if (hasUndefinedValues) {
        throw new TypeError('Enzyme::Props can’t have `undefined` values. Try using ‘findWhere()’ instead.');
      }
      return function (node) {
        return (0, _RSTTraversal.nodeMatchesObjectProps)(node, selector);
      };
    }
    throw new TypeError('Enzyme::Selector does not support an array, null, or empty object as a selector');
  }
  throw new TypeError('Enzyme::Selector expects a string, object, or valid element type (Component Constructor)');
}

/**
 * Matches only nodes which are adjacent siblings (direct next sibling)
 * against a predicate, returning those that match.
 * @param {Array<Node>} nodes
 * @param {Function} predicate
 * @param {Node} root
 */
function matchAdjacentSiblings(nodes, predicate, root) {
  return nodes.reduce(function (matches, node) {
    var parent = (0, _RSTTraversal.findParentNode)(root, node);
    // If there's no parent, there's no siblings
    if (!parent) {
      return matches;
    }
    var parentChildren = (0, _RSTTraversal.childrenOfNode)(parent);
    var nodeIndex = parentChildren.indexOf(node);
    var adjacentSibling = parentChildren[nodeIndex + 1];
    // No sibling
    if (!adjacentSibling) {
      return matches;
    }
    if (predicate(adjacentSibling)) {
      matches.push(adjacentSibling);
    }
    return matches;
  }, []);
}

/**
 * Matches only nodes which are general siblings (any sibling *after*)
 * against a predicate, returning those that match.
 * @param {Array<Node>} nodes
 * @param {Function} predicate
 * @param {Node} root
 */
function matchGeneralSibling(nodes, predicate, root) {
  return uniqueReduce(function (matches, node) {
    var parent = (0, _RSTTraversal.findParentNode)(root, node);
    if (!parent) {
      return matches;
    }
    var parentChildren = (0, _RSTTraversal.childrenOfNode)(parent);
    var nodeIndex = parentChildren.indexOf(node);
    var youngerSiblings = parentChildren.slice(nodeIndex + 1);
    return matches.concat(youngerSiblings.filter(predicate));
  }, nodes);
}

/**
 * Matches only nodes which are direct children (not grandchildren, etc.)
 * against a predicate, returning those that match.
 * @param {Array<Node>} nodes
 * @param {Function} predicate
 */
function matchDirectChild(nodes, predicate) {
  return uniqueReduce(function (matches, node) {
    return matches.concat((0, _RSTTraversal.childrenOfNode)(node).filter(predicate));
  }, nodes);
}

/**
 * Matches all descendant nodes against a predicate,
 * returning those that match.
 * @param {Array<Node>} nodes
 * @param {Function} predicate
 */
function matchDescendant(nodes, predicate) {
  return uniqueReduce(function (matches, node) {
    return matches.concat((0, _RSTTraversal.treeFilter)(node, predicate));
  }, (0, _arrayPrototype["default"])(nodes.map(_RSTTraversal.childrenOfNode)));
}

/**
 * Takes an RST and reduces it to a set of nodes matching
 * the selector. The selector can be a simple selector, which
 * is handled by `buildPredicate`, or a complex CSS selector which
 * reduceTreeBySelector parses and reduces the tree based on the combinators.
 *
 * @param {EnzymeSelector} selector
 * @param {RSTNode} root
 */
function reduceTreeBySelector(selector, root) {
  if (typeof selector !== 'string') {
    var elements = (0, _byConstructor["default"])(selector);
    if (elements.length > 0) {
      return (0, _arrayPrototype["default"])(elements.map(function (x) {
        return reduceTreeBySelector(x.tag, root);
      }));

      // when https://github.com/aweary/rst-selector-parser/issues/15 is resolved
      // const htmlTagNames = elements.map(x => x.tag).join(', ');
      // return reduceTreeBySelector(htmlTagNames, root);
    }
  }
  if (typeof selector === 'function' || _typeof(selector) === 'object') {
    return (0, _RSTTraversal.treeFilter)(root, buildPredicate(selector));
  }
  var results = [];
  if (typeof selector === 'string') {
    var tokens = safelyGenerateTokens(selector);
    var index = 0;
    while (index < tokens.length) {
      var token = tokens[index];
      /**
       * There are two types of tokens in a CSS selector:
       *
       * 1. Selector tokens. These target nodes directly, like
       *    type or attribute selectors. These are easy to apply
       *    because we can traverse the tree and return only
       *    the nodes that match the predicate.
       *
       * 2. Combinator tokens. These tokens chain together
       *    selector nodes. For example > for children, or +
       *    for adjacent siblings. These are harder to match
       *    as we have to track where in the tree we are
       *    to determine if a selector node applies or not.
       */
      if (token.type === SELECTOR) {
        var predicate = buildPredicateFromToken(token, root);
        results = results.concat((0, _RSTTraversal.treeFilter)(root, predicate));
      } else {
        // We can assume there always all previously matched tokens since selectors
        // cannot start with combinators.
        var type = token.type;
        // We assume the next token is a selector, so move the index
        // forward and build the predicate.
        index += 1;
        var _predicate = buildPredicateFromToken(tokens[index], root);
        // We match against only the nodes which have already been matched,
        // since a combinator is meant to refine a previous selector.
        switch (type) {
          // The + combinator
          case ADJACENT_SIBLING:
            results = matchAdjacentSiblings(results, _predicate, root);
            break;
          // The ~ combinator
          case GENERAL_SIBLING:
            results = matchGeneralSibling(results, _predicate, root);
            break;
          // The > combinator
          case CHILD:
            results = matchDirectChild(results, _predicate);
            break;
          // The ' ' (whitespace) combinator
          case DESCENDANT:
            {
              results = matchDescendant(results, _predicate);
              break;
            }
          default:
            throw new Error("Unknown combinator selector: ".concat(type));
        }
      }
      index += 1;
    }
  } else {
    throw new TypeError('Enzyme::Selector expects a string, object, or Component Constructor');
  }
  return results;
}
function reduceTreesBySelector(selector, roots) {
  var results = roots.map(function (n) {
    return reduceTreeBySelector(selector, n);
  });
  return unique((0, _arrayPrototype["default"])(results, 1));
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfcnN0U2VsZWN0b3JQYXJzZXIiLCJyZXF1aXJlIiwiX29iamVjdCIsIl9pbnRlcm9wUmVxdWlyZURlZmF1bHQiLCJfYXJyYXlQcm90b3R5cGUiLCJfb2JqZWN0SXMiLCJfaGFzb3duIiwiX2J5Q29uc3RydWN0b3IiLCJfUlNUVHJhdmVyc2FsIiwiX1V0aWxzIiwiX2dldEFkYXB0ZXIiLCJlIiwiX19lc01vZHVsZSIsIl90eXBlb2YiLCJvIiwiU3ltYm9sIiwiaXRlcmF0b3IiLCJjb25zdHJ1Y3RvciIsInByb3RvdHlwZSIsIl9zbGljZWRUb0FycmF5IiwiciIsIl9hcnJheVdpdGhIb2xlcyIsIl9pdGVyYWJsZVRvQXJyYXlMaW1pdCIsIl91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheSIsIl9ub25JdGVyYWJsZVJlc3QiLCJUeXBlRXJyb3IiLCJsIiwidCIsIm4iLCJpIiwidSIsImEiLCJmIiwiY2FsbCIsIm5leHQiLCJPYmplY3QiLCJkb25lIiwicHVzaCIsInZhbHVlIiwibGVuZ3RoIiwiQXJyYXkiLCJpc0FycmF5IiwiX3RvQ29uc3VtYWJsZUFycmF5IiwiX2FycmF5V2l0aG91dEhvbGVzIiwiX2l0ZXJhYmxlVG9BcnJheSIsIl9ub25JdGVyYWJsZVNwcmVhZCIsIl9hcnJheUxpa2VUb0FycmF5IiwidG9TdHJpbmciLCJzbGljZSIsIm5hbWUiLCJmcm9tIiwidGVzdCIsInBhcnNlciIsImNyZWF0ZVBhcnNlciIsIkNISUxEIiwiQURKQUNFTlRfU0lCTElORyIsIkdFTkVSQUxfU0lCTElORyIsIkRFU0NFTkRBTlQiLCJTRUxFQ1RPUiIsIlRZUEVfU0VMRUNUT1IiLCJDTEFTU19TRUxFQ1RPUiIsIklEX1NFTEVDVE9SIiwiVU5JVkVSU0FMX1NFTEVDVE9SIiwiQVRUUklCVVRFX1BSRVNFTkNFIiwiQVRUUklCVVRFX1ZBTFVFIiwiUFNFVURPX0NMQVNTIiwiUFNFVURPX0VMRU1FTlQiLCJFWEFDVF9BVFRSSUJVVEVfT1BFUkFUT1IiLCJXSElURUxJU1RfQVRUUklCVVRFX09QRVJBVE9SIiwiSFlQSEVOQVRFRF9BVFRSSUJVVEVfT1BFUkFUT1IiLCJQUkVGSVhfQVRUUklCVVRFX09QRVJBVE9SIiwiU1VGRklYX0FUVFJJQlVURV9PUEVSQVRPUiIsIlNVQlNUUklOR19BVFRSSUJVVEVfT1BFUkFUT1IiLCJ1bmlxdWUiLCJhcnIiLCJTZXQiLCJ1bmlxdWVSZWR1Y2UiLCJmbiIsIm5vZGVzIiwicmVkdWNlIiwic2FmZWx5R2VuZXJhdGVUb2tlbnMiLCJzZWxlY3RvciIsInBhcnNlIiwiZXJyIiwiRXJyb3IiLCJjb25jYXQiLCJtYXRjaEF0dHJpYnV0ZVNlbGVjdG9yIiwibm9kZSIsInRva2VuIiwib3BlcmF0b3IiLCJub2RlUHJvcHMiLCJwcm9wc09mTm9kZSIsImRlc2NyaXB0b3IiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJnZXQiLCJub2RlUHJvcFZhbHVlIiwidHlwZSIsImhhc093biIsImlzIiwic3BsaXQiLCJpbmRleE9mIiwic3RhcnRzV2l0aCIsIm1hdGNoUHNldWRvU2VsZWN0b3IiLCJyb290IiwicGFyYW1ldGVycyIsImV2ZXJ5IiwicmVkdWNlVHJlZUJ5U2VsZWN0b3IiLCJ0cmVlRmlsdGVyIiwiX2ZpbmRQYXJlbnROb2RlIiwiZmluZFBhcmVudE5vZGUiLCJyZW5kZXJlZCIsIl9yZW5kZXJlZCIsImZpcnN0Q2hpbGQiLCJfZmluZFBhcmVudE5vZGUyIiwiZG9jdW1lbnQiLCJhZGFwdGVyIiwiZ2V0QWRhcHRlciIsImFjdGl2ZUVsZW1lbnQiLCJub2RlVG9Ib3N0Tm9kZSIsIm5vZGVNYXRjaGVzVG9rZW4iLCJoYXNDbGFzc05hbWUiLCJub2RlSGFzVHlwZSIsIm5vZGVIYXNJZCIsImJ1aWxkUHJlZGljYXRlRnJvbVRva2VuIiwiYm9keSIsImJvZHlUb2tlbiIsImlzQ29tcGxleFNlbGVjdG9yIiwidG9rZW5zIiwic29tZSIsImJ1aWxkUHJlZGljYXRlIiwiaXNFbGVtZW50VHlwZSIsImlzVmFsaWRFbGVtZW50VHlwZSIsIm1hdGNoZXNFbGVtZW50VHlwZSIsImtleXMiLCJoYXNVbmRlZmluZWRWYWx1ZXMiLCJ2YWx1ZXMiLCJub2RlTWF0Y2hlc09iamVjdFByb3BzIiwibWF0Y2hBZGphY2VudFNpYmxpbmdzIiwicHJlZGljYXRlIiwibWF0Y2hlcyIsInBhcmVudCIsInBhcmVudENoaWxkcmVuIiwiY2hpbGRyZW5PZk5vZGUiLCJub2RlSW5kZXgiLCJhZGphY2VudFNpYmxpbmciLCJtYXRjaEdlbmVyYWxTaWJsaW5nIiwieW91bmdlclNpYmxpbmdzIiwiZmlsdGVyIiwibWF0Y2hEaXJlY3RDaGlsZCIsIm1hdGNoRGVzY2VuZGFudCIsImZsYXQiLCJtYXAiLCJlbGVtZW50cyIsImVsZW1lbnRzQnlDb25zdHJ1Y3RvciIsIngiLCJ0YWciLCJyZXN1bHRzIiwiaW5kZXgiLCJyZWR1Y2VUcmVlc0J5U2VsZWN0b3IiLCJyb290cyJdLCJzb3VyY2VzIjpbIi4uL3NyYy9zZWxlY3RvcnMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlUGFyc2VyIH0gZnJvbSAncnN0LXNlbGVjdG9yLXBhcnNlcic7XG5pbXBvcnQgdmFsdWVzIGZyb20gJ29iamVjdC52YWx1ZXMnO1xuaW1wb3J0IGZsYXQgZnJvbSAnYXJyYXkucHJvdG90eXBlLmZsYXQnO1xuaW1wb3J0IGlzIGZyb20gJ29iamVjdC1pcyc7XG5pbXBvcnQgaGFzT3duIGZyb20gJ2hhc293bic7XG5pbXBvcnQgZWxlbWVudHNCeUNvbnN0cnVjdG9yIGZyb20gJ2h0bWwtZWxlbWVudC1tYXAvYnlDb25zdHJ1Y3Rvcic7XG5pbXBvcnQge1xuICB0cmVlRmlsdGVyLFxuICBub2RlSGFzSWQsXG4gIGZpbmRQYXJlbnROb2RlLFxuICBub2RlTWF0Y2hlc09iamVjdFByb3BzLFxuICBjaGlsZHJlbk9mTm9kZSxcbiAgaGFzQ2xhc3NOYW1lLFxufSBmcm9tICcuL1JTVFRyYXZlcnNhbCc7XG5pbXBvcnQgeyBub2RlSGFzVHlwZSwgcHJvcHNPZk5vZGUgfSBmcm9tICcuL1V0aWxzJztcbmltcG9ydCBnZXRBZGFwdGVyIGZyb20gJy4vZ2V0QWRhcHRlcic7XG4vLyBvdXIgQ1NTIHNlbGVjdG9yIHBhcnNlciBpbnN0YW5jZVxuY29uc3QgcGFyc2VyID0gY3JlYXRlUGFyc2VyKCk7XG5cbi8vIENvbWJpbmF0b3JzIHRoYXQgYWxsb3cgeW91IHRvIGNoYW5jZSBzZWxlY3RvcnNcbmNvbnN0IENISUxEID0gJ2NoaWxkQ29tYmluYXRvcic7XG5jb25zdCBBREpBQ0VOVF9TSUJMSU5HID0gJ2FkamFjZW50U2libGluZ0NvbWJpbmF0b3InO1xuY29uc3QgR0VORVJBTF9TSUJMSU5HID0gJ2dlbmVyYWxTaWJsaW5nQ29tYmluYXRvcic7XG5jb25zdCBERVNDRU5EQU5UID0gJ2Rlc2NlbmRhbnRDb21iaW5hdG9yJztcblxuLy8gU2VsZWN0b3JzIGZvciB0YXJnZXRpbmcgZWxlbWVudHNcbmNvbnN0IFNFTEVDVE9SID0gJ3NlbGVjdG9yJztcbmNvbnN0IFRZUEVfU0VMRUNUT1IgPSAndHlwZVNlbGVjdG9yJztcbmNvbnN0IENMQVNTX1NFTEVDVE9SID0gJ2NsYXNzU2VsZWN0b3InO1xuY29uc3QgSURfU0VMRUNUT1IgPSAnaWRTZWxlY3Rvcic7XG5jb25zdCBVTklWRVJTQUxfU0VMRUNUT1IgPSAndW5pdmVyc2FsU2VsZWN0b3InO1xuY29uc3QgQVRUUklCVVRFX1BSRVNFTkNFID0gJ2F0dHJpYnV0ZVByZXNlbmNlU2VsZWN0b3InO1xuY29uc3QgQVRUUklCVVRFX1ZBTFVFID0gJ2F0dHJpYnV0ZVZhbHVlU2VsZWN0b3InO1xuLy8gQFRPRE8gd2UgZG9udCBzdXBwb3J0IHRoZXNlLCB0aHJvdyBpZiB0aGV5IGFyZSB1c2VkXG5jb25zdCBQU0VVRE9fQ0xBU1MgPSAncHNldWRvQ2xhc3NTZWxlY3Rvcic7XG5jb25zdCBQU0VVRE9fRUxFTUVOVCA9ICdwc2V1ZG9FbGVtZW50U2VsZWN0b3InO1xuXG5jb25zdCBFWEFDVF9BVFRSSUJVVEVfT1BFUkFUT1IgPSAnPSc7XG5jb25zdCBXSElURUxJU1RfQVRUUklCVVRFX09QRVJBVE9SID0gJ349JztcbmNvbnN0IEhZUEhFTkFURURfQVRUUklCVVRFX09QRVJBVE9SID0gJ3w9JztcbmNvbnN0IFBSRUZJWF9BVFRSSUJVVEVfT1BFUkFUT1IgPSAnXj0nO1xuY29uc3QgU1VGRklYX0FUVFJJQlVURV9PUEVSQVRPUiA9ICckPSc7XG5jb25zdCBTVUJTVFJJTkdfQVRUUklCVVRFX09QRVJBVE9SID0gJyo9JztcblxuZnVuY3Rpb24gdW5pcXVlKGFycikge1xuICByZXR1cm4gWy4uLm5ldyBTZXQoYXJyKV07XG59XG5cbi8qKlxuICogQ2FsbHMgcmVkdWNlIG9uIGEgYXJyYXkgb2Ygbm9kZXMgd2l0aCB0aGUgcGFzc2VkXG4gKiBmdW5jdGlvbiwgcmV0dXJuaW5nIG9ubHkgdW5pcXVlIHJlc3VsdHMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHBhcmFtIHtBcnJheTxOb2RlPn0gbm9kZXNcbiAqL1xuZnVuY3Rpb24gdW5pcXVlUmVkdWNlKGZuLCBub2Rlcykge1xuICByZXR1cm4gdW5pcXVlKG5vZGVzLnJlZHVjZShmbiwgW10pKTtcbn1cblxuLyoqXG4gKiBUYWtlcyBhIENTUyBzZWxlY3RvciBhbmQgcmV0dXJucyBhIHNldCBvZiB0b2tlbnMgcGFyc2VkXG4gKiBieSBzY2FscGVsLlxuICogQHBhcmFtIHtTdHJpbmd9IHNlbGVjdG9yXG4gKi9cbmZ1bmN0aW9uIHNhZmVseUdlbmVyYXRlVG9rZW5zKHNlbGVjdG9yKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIHBhcnNlci5wYXJzZShzZWxlY3Rvcik7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHRocm93IG5ldyBFcnJvcihgRmFpbGVkIHRvIHBhcnNlIHNlbGVjdG9yOiAke3NlbGVjdG9yfWApO1xuICB9XG59XG5cbmZ1bmN0aW9uIG1hdGNoQXR0cmlidXRlU2VsZWN0b3Iobm9kZSwgdG9rZW4pIHtcbiAgY29uc3QgeyBvcGVyYXRvciwgdmFsdWUsIG5hbWUgfSA9IHRva2VuO1xuICBjb25zdCBub2RlUHJvcHMgPSBwcm9wc09mTm9kZShub2RlKTtcbiAgY29uc3QgZGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iobm9kZVByb3BzLCBuYW1lKTtcbiAgaWYgKGRlc2NyaXB0b3IgJiYgZGVzY3JpcHRvci5nZXQpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgY29uc3Qgbm9kZVByb3BWYWx1ZSA9IG5vZGVQcm9wc1tuYW1lXTtcbiAgaWYgKHR5cGVvZiBub2RlUHJvcFZhbHVlID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpZiAodG9rZW4udHlwZSA9PT0gQVRUUklCVVRFX1BSRVNFTkNFKSB7XG4gICAgcmV0dXJuIGhhc093bihub2RlUHJvcHMsIHRva2VuLm5hbWUpO1xuICB9XG4gIC8vIE9ubHkgdGhlIGV4YWN0IHZhbHVlIG9wZXJhdG9yIChcIj1cIikgY2FuIG1hdGNoIG5vbi1zdHJpbmdzXG4gIGlmICh0eXBlb2Ygbm9kZVByb3BWYWx1ZSAhPT0gJ3N0cmluZycgfHwgdHlwZW9mIHZhbHVlICE9PSAnc3RyaW5nJykge1xuICAgIGlmIChvcGVyYXRvciAhPT0gRVhBQ1RfQVRUUklCVVRFX09QRVJBVE9SKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG4gIHN3aXRjaCAob3BlcmF0b3IpIHtcbiAgICAvKipcbiAgICAgKiBSZXByZXNlbnRzIGFuIGVsZW1lbnQgd2l0aCB0aGUgYXR0IGF0dHJpYnV0ZSB3aG9zZSB2YWx1ZSBpcyBleGFjdGx5IFwidmFsXCIuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBbYXR0cj1cInZhbFwiXSBtYXRjaGVzIGF0dHI9XCJ2YWxcIlxuICAgICAqL1xuICAgIGNhc2UgRVhBQ1RfQVRUUklCVVRFX09QRVJBVE9SOlxuICAgICAgcmV0dXJuIGlzKG5vZGVQcm9wVmFsdWUsIHZhbHVlKTtcbiAgICAvKipcbiAgICAgKiBSZXByZXNlbnRzIGFuIGVsZW1lbnQgd2l0aCB0aGUgYXR0IGF0dHJpYnV0ZSB3aG9zZSB2YWx1ZSBpcyBhIHdoaXRlc3BhY2Utc2VwYXJhdGVkXG4gICAgICogbGlzdCBvZiB3b3Jkcywgb25lIG9mIHdoaWNoIGlzIGV4YWN0bHlcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqICBbcmVsfj1cImNvcHlyaWdodFwiXSBtYXRjaGVzIHJlbD1cImNvcHlyaWdodCBvdGhlclwiXG4gICAgICovXG4gICAgY2FzZSBXSElURUxJU1RfQVRUUklCVVRFX09QRVJBVE9SOlxuICAgICAgcmV0dXJuIG5vZGVQcm9wVmFsdWUuc3BsaXQoJyAnKS5pbmRleE9mKHZhbHVlKSAhPT0gLTE7XG4gICAgLyoqXG4gICAgICogUmVwcmVzZW50cyBhbiBlbGVtZW50IHdpdGggdGhlIGF0dCBhdHRyaWJ1dGUsIGl0cyB2YWx1ZSBlaXRoZXIgYmVpbmcgZXhhY3RseSB0aGVcbiAgICAgKiB2YWx1ZSBvciBiZWdpbm5pbmcgd2l0aCB0aGUgdmFsdWUgaW1tZWRpYXRlbHkgZm9sbG93ZWQgYnkgXCItXCJcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIFtocmVmbGFuZ3w9XCJlblwiXSBtYXRjaGVzIGhyZWZsYW5nPVwiZW4tVVNcIlxuICAgICAqL1xuICAgIGNhc2UgSFlQSEVOQVRFRF9BVFRSSUJVVEVfT1BFUkFUT1I6XG4gICAgICByZXR1cm4gbm9kZVByb3BWYWx1ZSA9PT0gdmFsdWUgfHwgbm9kZVByb3BWYWx1ZS5zdGFydHNXaXRoKGAke3ZhbHVlfS1gKTtcbiAgICAvKipcbiAgICAgKiBSZXByZXNlbnRzIGFuIGVsZW1lbnQgd2l0aCB0aGUgYXR0IGF0dHJpYnV0ZSB3aG9zZSB2YWx1ZSBiZWdpbnMgd2l0aCB0aGUgcHJlZml4IHZhbHVlLlxuICAgICAqIElmIHRoZSB2YWx1ZSBpcyB0aGUgZW1wdHkgc3RyaW5nIHRoZW4gdGhlIHNlbGVjdG9yIGRvZXMgbm90IHJlcHJlc2VudCBhbnl0aGluZy5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIFt0eXBlXj1cImltYWdlXCJdIG1hdGNoZXMgdHlwZT1cImltYWdlb2JqZWN0XCJcbiAgICAgKi9cbiAgICBjYXNlIFBSRUZJWF9BVFRSSUJVVEVfT1BFUkFUT1I6XG4gICAgICByZXR1cm4gdmFsdWUgPT09ICcnID8gZmFsc2UgOiBub2RlUHJvcFZhbHVlLnNsaWNlKDAsIHZhbHVlLmxlbmd0aCkgPT09IHZhbHVlO1xuICAgIC8qKlxuICAgICAqIFJlcHJlc2VudHMgYW4gZWxlbWVudCB3aXRoIHRoZSBhdHQgYXR0cmlidXRlIHdob3NlIHZhbHVlIGVuZHMgd2l0aCB0aGUgc3VmZml4IHZhbHVlLlxuICAgICAqIElmIHRoZSB2YWx1ZSBpcyB0aGUgZW1wdHkgc3RyaW5nIHRoZW4gdGhlIHNlbGVjdG9yIGRvZXMgbm90IHJlcHJlc2VudCBhbnl0aGluZy5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIFt0eXBlJD1cImltYWdlXCJdIG1hdGNoZXMgdHlwZT1cImltYWdlb2JqZWN0XCJcbiAgICAgKi9cbiAgICBjYXNlIFNVRkZJWF9BVFRSSUJVVEVfT1BFUkFUT1I6XG4gICAgICByZXR1cm4gdmFsdWUgPT09ICcnID8gZmFsc2UgOiBub2RlUHJvcFZhbHVlLnNsaWNlKC12YWx1ZS5sZW5ndGgpID09PSB2YWx1ZTtcbiAgICAvKipcbiAgICAgKiBSZXByZXNlbnRzIGFuIGVsZW1lbnQgd2l0aCB0aGUgYXR0IGF0dHJpYnV0ZSB3aG9zZSB2YWx1ZSBjb250YWlucyBhdCBsZWFzdCBvbmVcbiAgICAgKiBpbnN0YW5jZSBvZiB0aGUgdmFsdWUuIElmIHZhbHVlIGlzIHRoZSBlbXB0eSBzdHJpbmcgdGhlbiB0aGVcbiAgICAgKiBzZWxlY3RvciBkb2VzIG5vdCByZXByZXNlbnQgYW55dGhpbmcuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBbdGl0bGUqPVwiaGVsbG9cIl0gbWF0Y2hlcyB0aXRsZT1cIndlbGwgaGVsbG8gdGhlcmVcIlxuICAgICAqL1xuICAgIGNhc2UgU1VCU1RSSU5HX0FUVFJJQlVURV9PUEVSQVRPUjpcbiAgICAgIHJldHVybiB2YWx1ZSA9PT0gJycgPyBmYWxzZSA6IG5vZGVQcm9wVmFsdWUuaW5kZXhPZih2YWx1ZSkgIT09IC0xO1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEVuenltZTo6U2VsZWN0b3I6IFVua25vd24gYXR0cmlidXRlIHNlbGVjdG9yIG9wZXJhdG9yIFwiJHtvcGVyYXRvcn1cImApO1xuICB9XG59XG5cbmZ1bmN0aW9uIG1hdGNoUHNldWRvU2VsZWN0b3Iobm9kZSwgdG9rZW4sIHJvb3QpIHtcbiAgY29uc3QgeyBuYW1lLCBwYXJhbWV0ZXJzIH0gPSB0b2tlbjtcbiAgaWYgKG5hbWUgPT09ICdub3QnKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVzZS1iZWZvcmUtZGVmaW5lXG4gICAgcmV0dXJuIHBhcmFtZXRlcnMuZXZlcnkoKHNlbGVjdG9yKSA9PiByZWR1Y2VUcmVlQnlTZWxlY3RvcihzZWxlY3Rvciwgbm9kZSkubGVuZ3RoID09PSAwKTtcbiAgfVxuICBpZiAobmFtZSA9PT0gJ2VtcHR5Jykge1xuICAgIHJldHVybiB0cmVlRmlsdGVyKG5vZGUsIChuKSA9PiBuICE9PSBub2RlKS5sZW5ndGggPT09IDA7XG4gIH1cbiAgaWYgKG5hbWUgPT09ICdmaXJzdC1jaGlsZCcpIHtcbiAgICBjb25zdCB7IHJlbmRlcmVkIH0gPSBmaW5kUGFyZW50Tm9kZShyb290LCBub2RlKTtcbiAgICBjb25zdCBbZmlyc3RDaGlsZF0gPSByZW5kZXJlZDtcbiAgICByZXR1cm4gZmlyc3RDaGlsZCA9PT0gbm9kZTtcbiAgfVxuICBpZiAobmFtZSA9PT0gJ2xhc3QtY2hpbGQnKSB7XG4gICAgY29uc3QgeyByZW5kZXJlZCB9ID0gZmluZFBhcmVudE5vZGUocm9vdCwgbm9kZSk7XG4gICAgcmV0dXJuIHJlbmRlcmVkW3JlbmRlcmVkLmxlbmd0aCAtIDFdID09PSBub2RlO1xuICB9XG4gIGlmIChuYW1lID09PSAnZm9jdXMnKSB7XG4gICAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRW56eW1lOjpTZWxlY3RvciBkb2VzIG5vdCBzdXBwb3J0IHRoZSBcIjpmb2N1c1wiIHBzZXVkby1lbGVtZW50IHdpdGhvdXQgYSBnbG9iYWwgYGRvY3VtZW50YC4nKTtcbiAgICB9XG4gICAgY29uc3QgYWRhcHRlciA9IGdldEFkYXB0ZXIoKTtcbiAgICAvKiBlc2xpbnQtZW52IGJyb3dzZXIgKi9cbiAgICByZXR1cm4gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAmJiBhZGFwdGVyLm5vZGVUb0hvc3ROb2RlKG5vZGUpID09PSBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuICB9XG5cbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihgRW56eW1lOjpTZWxlY3RvciBkb2VzIG5vdCBzdXBwb3J0IHRoZSBcIiR7dG9rZW4ubmFtZX1cIiBwc2V1ZG8tZWxlbWVudCBvciBwc2V1ZG8tY2xhc3Mgc2VsZWN0b3JzLmApO1xufVxuXG4vKipcbiAqIFRha2VzIGEgbm9kZSBhbmQgYSB0b2tlbiBhbmQgZGV0ZXJtaW5lcyBpZiB0aGUgbm9kZVxuICogbWF0Y2hlcyB0aGUgcHJlZGljYXRlIGRlZmluZWQgYnkgdGhlIHRva2VuLlxuICogQHBhcmFtIHtOb2RlfSBub2RlXG4gKiBAcGFyYW0ge1Rva2VufSB0b2tlblxuICovXG5mdW5jdGlvbiBub2RlTWF0Y2hlc1Rva2VuKG5vZGUsIHRva2VuLCByb290KSB7XG4gIGlmIChub2RlID09PSBudWxsIHx8IHR5cGVvZiBub2RlID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBzd2l0Y2ggKHRva2VuLnR5cGUpIHtcbiAgICAvKipcbiAgICAgKiBNYXRjaCBldmVyeSBub2RlXG4gICAgICogQGV4YW1wbGUgJyonIG1hdGNoZXMgZXZlcnkgbm9kZVxuICAgICAqL1xuICAgIGNhc2UgVU5JVkVSU0FMX1NFTEVDVE9SOlxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgLyoqXG4gICAgICogTWF0Y2ggYWdhaW5zdCB0aGUgY2xhc3NOYW1lIHByb3BcbiAgICAgKiBAZXhhbXBsZSAnLmFjdGl2ZScgbWF0Y2hlcyA8ZGl2IGNsYXNzTmFtZT0nYWN0aXZlJyAvPlxuICAgICAqL1xuICAgIGNhc2UgQ0xBU1NfU0VMRUNUT1I6XG4gICAgICByZXR1cm4gaGFzQ2xhc3NOYW1lKG5vZGUsIHRva2VuLm5hbWUpO1xuICAgIC8qKlxuICAgICAqIFNpbXBsZSB0eXBlIG1hdGNoaW5nXG4gICAgICogQGV4YW1wbGUgJ2RpdicgbWF0Y2hlcyA8ZGl2IC8+XG4gICAgICovXG4gICAgY2FzZSBUWVBFX1NFTEVDVE9SOlxuICAgICAgcmV0dXJuIG5vZGVIYXNUeXBlKG5vZGUsIHRva2VuLm5hbWUpO1xuICAgIC8qKlxuICAgICAqIE1hdGNoIGFnYWluc3QgdGhlIGBpZGAgcHJvcFxuICAgICAqIEBleGFtcGxlICcjbmF2JyBtYXRjaGVzIDx1bCBpZD1cIm5hdlwiIC8+XG4gICAgICovXG4gICAgY2FzZSBJRF9TRUxFQ1RPUjpcbiAgICAgIHJldHVybiBub2RlSGFzSWQobm9kZSwgdG9rZW4ubmFtZSk7XG4gICAgLyoqXG4gICAgICogTWF0Y2hlcyBpZiBhbiBhdHRyaWJ1dGUgaXMgcHJlc2VudCwgcmVnYXJkbGVzc1xuICAgICAqIG9mIGl0cyB2YWx1ZVxuICAgICAqIEBleGFtcGxlICdbZGlzYWJsZWRdJyBtYXRjaGVzIDxhIGRpc2FibGVkIC8+XG4gICAgICovXG4gICAgY2FzZSBBVFRSSUJVVEVfUFJFU0VOQ0U6XG4gICAgICByZXR1cm4gbWF0Y2hBdHRyaWJ1dGVTZWxlY3Rvcihub2RlLCB0b2tlbik7XG4gICAgLyoqXG4gICAgICogTWF0Y2hlcyBpZiBhbiBhdHRyaWJ1dGUgaXMgcHJlc2VudCB3aXRoIHRoZVxuICAgICAqIHByb3ZpZGVkIHZhbHVlXG4gICAgICogQGV4YW1wbGUgJ1tkYXRhLWZvbz1mb29dJyBtYXRjaGVzIDxkaXYgZGF0YS1mb289XCJmb29cIiAvPlxuICAgICAqL1xuICAgIGNhc2UgQVRUUklCVVRFX1ZBTFVFOlxuICAgICAgcmV0dXJuIG1hdGNoQXR0cmlidXRlU2VsZWN0b3Iobm9kZSwgdG9rZW4pO1xuICAgIGNhc2UgUFNFVURPX0VMRU1FTlQ6XG4gICAgY2FzZSBQU0VVRE9fQ0xBU1M6XG4gICAgICByZXR1cm4gbWF0Y2hQc2V1ZG9TZWxlY3Rvcihub2RlLCB0b2tlbiwgcm9vdCk7XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVW5rbm93biB0b2tlbiB0eXBlOiAke3Rva2VuLnR5cGV9YCk7XG4gIH1cbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgcHJlZGljYXRlIGZ1bmN0aW9uIHRoYXQgY2hlY2tzIGlmIGFcbiAqIG5vZGUgbWF0Y2hlcyBldmVyeSB0b2tlbiBpbiB0aGUgYm9keSBvZiBhIHNlbGVjdG9yXG4gKiB0b2tlbi5cbiAqIEBwYXJhbSB7VG9rZW59IHRva2VuXG4gKi9cbmZ1bmN0aW9uIGJ1aWxkUHJlZGljYXRlRnJvbVRva2VuKHRva2VuLCByb290KSB7XG4gIHJldHVybiAobm9kZSkgPT4gdG9rZW4uYm9keS5ldmVyeSgoYm9keVRva2VuKSA9PiBub2RlTWF0Y2hlc1Rva2VuKG5vZGUsIGJvZHlUb2tlbiwgcm9vdCkpO1xufVxuXG4vKipcbiAqIFJldHVybnMgd2hldGhlciBhIHBhcnNlZCBzZWxlY3RvciBpcyBhIGNvbXBsZXggc2VsZWN0b3IsIHdoaWNoXG4gKiBpcyBkZWZpbmVkIGFzIGEgc2VsZWN0b3IgdGhhdCBjb250YWlucyBjb21iaW5hdG9ycy5cbiAqIEBwYXJhbSB7QXJyYXk8VG9rZW4+fSB0b2tlbnNcbiAqL1xuZnVuY3Rpb24gaXNDb21wbGV4U2VsZWN0b3IodG9rZW5zKSB7XG4gIHJldHVybiB0b2tlbnMuc29tZSgodG9rZW4pID0+IHRva2VuLnR5cGUgIT09IFNFTEVDVE9SKTtcbn1cblxuLyoqXG4gKiBUYWtlcyBhIGNvbXBvbmVudCBjb25zdHJ1Y3Rvciwgb2JqZWN0LCBvciBzdHJpbmcgcmVwcmVzZW50aW5nXG4gKiBhIHNpbXBsZSBzZWxlY3RvciBhbmQgcmV0dXJucyBhIHByZWRpY2F0ZSBmdW5jdGlvbiB0aGF0IGNhblxuICogYmUgYXBwbGllZCB0byBhIHNpbmdsZSBub2RlLlxuICogQHBhcmFtIHtFbnp5bWVTZWxlY3Rvcn0gc2VsZWN0b3JcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkUHJlZGljYXRlKHNlbGVjdG9yKSB7XG4gIC8vIElmIHRoZSBzZWxlY3RvciBpcyBhIHN0cmluZywgcGFyc2UgaXQgYXMgYSBzaW1wbGUgQ1NTIHNlbGVjdG9yXG4gIGlmICh0eXBlb2Ygc2VsZWN0b3IgPT09ICdzdHJpbmcnKSB7XG4gICAgY29uc3QgdG9rZW5zID0gc2FmZWx5R2VuZXJhdGVUb2tlbnMoc2VsZWN0b3IpO1xuICAgIGlmIChpc0NvbXBsZXhTZWxlY3Rvcih0b2tlbnMpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGlzIG1ldGhvZCBkb2VzIG5vdCBzdXBwb3J0IGNvbXBsZXggQ1NTIHNlbGVjdG9ycycpO1xuICAgIH1cbiAgICAvLyBTaW1wbGUgc2VsZWN0b3JzIG9ubHkgaGF2ZSBhIHNpbmdsZSBzZWxlY3RvciB0b2tlblxuICAgIHJldHVybiBidWlsZFByZWRpY2F0ZUZyb21Ub2tlbih0b2tlbnNbMF0pO1xuICB9XG5cbiAgLy8gSWYgdGhlIHNlbGVjdG9yIGlzIGFuIGVsZW1lbnQgdHlwZSwgY2hlY2sgaWYgdGhlIG5vZGUncyB0eXBlIG1hdGNoZXNcbiAgY29uc3QgYWRhcHRlciA9IGdldEFkYXB0ZXIoKTtcbiAgY29uc3QgaXNFbGVtZW50VHlwZSA9IGFkYXB0ZXIuaXNWYWxpZEVsZW1lbnRUeXBlXG4gICAgPyBhZGFwdGVyLmlzVmFsaWRFbGVtZW50VHlwZShzZWxlY3RvcilcbiAgICA6IHR5cGVvZiBzZWxlY3RvciA9PT0gJ2Z1bmN0aW9uJztcbiAgaWYgKGlzRWxlbWVudFR5cGUpIHtcbiAgICByZXR1cm4gKG5vZGUpID0+IGFkYXB0ZXIubWF0Y2hlc0VsZW1lbnRUeXBlKG5vZGUsIHNlbGVjdG9yKTtcbiAgfVxuICAvLyBJZiB0aGUgc2VsZWN0b3IgaXMgYW4gbm9uLWVtcHR5IG9iamVjdCwgdHJlYXQgdGhlIGtleXMvdmFsdWVzIGFzIHByb3BzXG4gIGlmICh0eXBlb2Ygc2VsZWN0b3IgPT09ICdvYmplY3QnKSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHNlbGVjdG9yKSAmJiBzZWxlY3RvciAhPT0gbnVsbCAmJiBPYmplY3Qua2V5cyhzZWxlY3RvcikubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgaGFzVW5kZWZpbmVkVmFsdWVzID0gdmFsdWVzKHNlbGVjdG9yKS5zb21lKCh2YWx1ZSkgPT4gdHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJyk7XG4gICAgICBpZiAoaGFzVW5kZWZpbmVkVmFsdWVzKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0VuenltZTo6UHJvcHMgY2Fu4oCZdCBoYXZlIGB1bmRlZmluZWRgIHZhbHVlcy4gVHJ5IHVzaW5nIOKAmGZpbmRXaGVyZSgp4oCZIGluc3RlYWQuJyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gKG5vZGUpID0+IG5vZGVNYXRjaGVzT2JqZWN0UHJvcHMobm9kZSwgc2VsZWN0b3IpO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdFbnp5bWU6OlNlbGVjdG9yIGRvZXMgbm90IHN1cHBvcnQgYW4gYXJyYXksIG51bGwsIG9yIGVtcHR5IG9iamVjdCBhcyBhIHNlbGVjdG9yJyk7XG4gIH1cblxuICB0aHJvdyBuZXcgVHlwZUVycm9yKCdFbnp5bWU6OlNlbGVjdG9yIGV4cGVjdHMgYSBzdHJpbmcsIG9iamVjdCwgb3IgdmFsaWQgZWxlbWVudCB0eXBlIChDb21wb25lbnQgQ29uc3RydWN0b3IpJyk7XG59XG5cbi8qKlxuICogTWF0Y2hlcyBvbmx5IG5vZGVzIHdoaWNoIGFyZSBhZGphY2VudCBzaWJsaW5ncyAoZGlyZWN0IG5leHQgc2libGluZylcbiAqIGFnYWluc3QgYSBwcmVkaWNhdGUsIHJldHVybmluZyB0aG9zZSB0aGF0IG1hdGNoLlxuICogQHBhcmFtIHtBcnJheTxOb2RlPn0gbm9kZXNcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHByZWRpY2F0ZVxuICogQHBhcmFtIHtOb2RlfSByb290XG4gKi9cbmZ1bmN0aW9uIG1hdGNoQWRqYWNlbnRTaWJsaW5ncyhub2RlcywgcHJlZGljYXRlLCByb290KSB7XG4gIHJldHVybiBub2Rlcy5yZWR1Y2UoKG1hdGNoZXMsIG5vZGUpID0+IHtcbiAgICBjb25zdCBwYXJlbnQgPSBmaW5kUGFyZW50Tm9kZShyb290LCBub2RlKTtcbiAgICAvLyBJZiB0aGVyZSdzIG5vIHBhcmVudCwgdGhlcmUncyBubyBzaWJsaW5nc1xuICAgIGlmICghcGFyZW50KSB7XG4gICAgICByZXR1cm4gbWF0Y2hlcztcbiAgICB9XG4gICAgY29uc3QgcGFyZW50Q2hpbGRyZW4gPSBjaGlsZHJlbk9mTm9kZShwYXJlbnQpO1xuICAgIGNvbnN0IG5vZGVJbmRleCA9IHBhcmVudENoaWxkcmVuLmluZGV4T2Yobm9kZSk7XG4gICAgY29uc3QgYWRqYWNlbnRTaWJsaW5nID0gcGFyZW50Q2hpbGRyZW5bbm9kZUluZGV4ICsgMV07XG4gICAgLy8gTm8gc2libGluZ1xuICAgIGlmICghYWRqYWNlbnRTaWJsaW5nKSB7XG4gICAgICByZXR1cm4gbWF0Y2hlcztcbiAgICB9XG4gICAgaWYgKHByZWRpY2F0ZShhZGphY2VudFNpYmxpbmcpKSB7XG4gICAgICBtYXRjaGVzLnB1c2goYWRqYWNlbnRTaWJsaW5nKTtcbiAgICB9XG4gICAgcmV0dXJuIG1hdGNoZXM7XG4gIH0sIFtdKTtcbn1cblxuLyoqXG4gKiBNYXRjaGVzIG9ubHkgbm9kZXMgd2hpY2ggYXJlIGdlbmVyYWwgc2libGluZ3MgKGFueSBzaWJsaW5nICphZnRlciopXG4gKiBhZ2FpbnN0IGEgcHJlZGljYXRlLCByZXR1cm5pbmcgdGhvc2UgdGhhdCBtYXRjaC5cbiAqIEBwYXJhbSB7QXJyYXk8Tm9kZT59IG5vZGVzXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBwcmVkaWNhdGVcbiAqIEBwYXJhbSB7Tm9kZX0gcm9vdFxuICovXG5mdW5jdGlvbiBtYXRjaEdlbmVyYWxTaWJsaW5nKG5vZGVzLCBwcmVkaWNhdGUsIHJvb3QpIHtcbiAgcmV0dXJuIHVuaXF1ZVJlZHVjZSgobWF0Y2hlcywgbm9kZSkgPT4ge1xuICAgIGNvbnN0IHBhcmVudCA9IGZpbmRQYXJlbnROb2RlKHJvb3QsIG5vZGUpO1xuICAgIGlmICghcGFyZW50KSB7XG4gICAgICByZXR1cm4gbWF0Y2hlcztcbiAgICB9XG4gICAgY29uc3QgcGFyZW50Q2hpbGRyZW4gPSBjaGlsZHJlbk9mTm9kZShwYXJlbnQpO1xuICAgIGNvbnN0IG5vZGVJbmRleCA9IHBhcmVudENoaWxkcmVuLmluZGV4T2Yobm9kZSk7XG4gICAgY29uc3QgeW91bmdlclNpYmxpbmdzID0gcGFyZW50Q2hpbGRyZW4uc2xpY2Uobm9kZUluZGV4ICsgMSk7XG4gICAgcmV0dXJuIG1hdGNoZXMuY29uY2F0KHlvdW5nZXJTaWJsaW5ncy5maWx0ZXIocHJlZGljYXRlKSk7XG4gIH0sIG5vZGVzKTtcbn1cblxuLyoqXG4gKiBNYXRjaGVzIG9ubHkgbm9kZXMgd2hpY2ggYXJlIGRpcmVjdCBjaGlsZHJlbiAobm90IGdyYW5kY2hpbGRyZW4sIGV0Yy4pXG4gKiBhZ2FpbnN0IGEgcHJlZGljYXRlLCByZXR1cm5pbmcgdGhvc2UgdGhhdCBtYXRjaC5cbiAqIEBwYXJhbSB7QXJyYXk8Tm9kZT59IG5vZGVzXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBwcmVkaWNhdGVcbiAqL1xuZnVuY3Rpb24gbWF0Y2hEaXJlY3RDaGlsZChub2RlcywgcHJlZGljYXRlKSB7XG4gIHJldHVybiB1bmlxdWVSZWR1Y2UoXG4gICAgKG1hdGNoZXMsIG5vZGUpID0+IG1hdGNoZXMuY29uY2F0KGNoaWxkcmVuT2ZOb2RlKG5vZGUpLmZpbHRlcihwcmVkaWNhdGUpKSxcbiAgICBub2RlcyxcbiAgKTtcbn1cblxuLyoqXG4gKiBNYXRjaGVzIGFsbCBkZXNjZW5kYW50IG5vZGVzIGFnYWluc3QgYSBwcmVkaWNhdGUsXG4gKiByZXR1cm5pbmcgdGhvc2UgdGhhdCBtYXRjaC5cbiAqIEBwYXJhbSB7QXJyYXk8Tm9kZT59IG5vZGVzXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBwcmVkaWNhdGVcbiAqL1xuZnVuY3Rpb24gbWF0Y2hEZXNjZW5kYW50KG5vZGVzLCBwcmVkaWNhdGUpIHtcbiAgcmV0dXJuIHVuaXF1ZVJlZHVjZShcbiAgICAobWF0Y2hlcywgbm9kZSkgPT4gbWF0Y2hlcy5jb25jYXQodHJlZUZpbHRlcihub2RlLCBwcmVkaWNhdGUpKSxcbiAgICBmbGF0KG5vZGVzLm1hcChjaGlsZHJlbk9mTm9kZSkpLFxuICApO1xufVxuXG4vKipcbiAqIFRha2VzIGFuIFJTVCBhbmQgcmVkdWNlcyBpdCB0byBhIHNldCBvZiBub2RlcyBtYXRjaGluZ1xuICogdGhlIHNlbGVjdG9yLiBUaGUgc2VsZWN0b3IgY2FuIGJlIGEgc2ltcGxlIHNlbGVjdG9yLCB3aGljaFxuICogaXMgaGFuZGxlZCBieSBgYnVpbGRQcmVkaWNhdGVgLCBvciBhIGNvbXBsZXggQ1NTIHNlbGVjdG9yIHdoaWNoXG4gKiByZWR1Y2VUcmVlQnlTZWxlY3RvciBwYXJzZXMgYW5kIHJlZHVjZXMgdGhlIHRyZWUgYmFzZWQgb24gdGhlIGNvbWJpbmF0b3JzLlxuICpcbiAqIEBwYXJhbSB7RW56eW1lU2VsZWN0b3J9IHNlbGVjdG9yXG4gKiBAcGFyYW0ge1JTVE5vZGV9IHJvb3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlZHVjZVRyZWVCeVNlbGVjdG9yKHNlbGVjdG9yLCByb290KSB7XG4gIGlmICh0eXBlb2Ygc2VsZWN0b3IgIT09ICdzdHJpbmcnKSB7XG4gICAgY29uc3QgZWxlbWVudHMgPSBlbGVtZW50c0J5Q29uc3RydWN0b3Ioc2VsZWN0b3IpO1xuICAgIGlmIChlbGVtZW50cy5sZW5ndGggPiAwKSB7XG4gICAgICByZXR1cm4gZmxhdChlbGVtZW50cy5tYXAoKHgpID0+IHJlZHVjZVRyZWVCeVNlbGVjdG9yKHgudGFnLCByb290KSkpO1xuXG4gICAgICAvLyB3aGVuIGh0dHBzOi8vZ2l0aHViLmNvbS9hd2VhcnkvcnN0LXNlbGVjdG9yLXBhcnNlci9pc3N1ZXMvMTUgaXMgcmVzb2x2ZWRcbiAgICAgIC8vIGNvbnN0IGh0bWxUYWdOYW1lcyA9IGVsZW1lbnRzLm1hcCh4ID0+IHgudGFnKS5qb2luKCcsICcpO1xuICAgICAgLy8gcmV0dXJuIHJlZHVjZVRyZWVCeVNlbGVjdG9yKGh0bWxUYWdOYW1lcywgcm9vdCk7XG4gICAgfVxuICB9XG5cbiAgaWYgKHR5cGVvZiBzZWxlY3RvciA9PT0gJ2Z1bmN0aW9uJyB8fCB0eXBlb2Ygc2VsZWN0b3IgPT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIHRyZWVGaWx0ZXIocm9vdCwgYnVpbGRQcmVkaWNhdGUoc2VsZWN0b3IpKTtcbiAgfVxuXG4gIGxldCByZXN1bHRzID0gW107XG4gIGlmICh0eXBlb2Ygc2VsZWN0b3IgPT09ICdzdHJpbmcnKSB7XG4gICAgY29uc3QgdG9rZW5zID0gc2FmZWx5R2VuZXJhdGVUb2tlbnMoc2VsZWN0b3IpO1xuICAgIGxldCBpbmRleCA9IDA7XG4gICAgd2hpbGUgKGluZGV4IDwgdG9rZW5zLmxlbmd0aCkge1xuICAgICAgY29uc3QgdG9rZW4gPSB0b2tlbnNbaW5kZXhdO1xuICAgICAgLyoqXG4gICAgICAgKiBUaGVyZSBhcmUgdHdvIHR5cGVzIG9mIHRva2VucyBpbiBhIENTUyBzZWxlY3RvcjpcbiAgICAgICAqXG4gICAgICAgKiAxLiBTZWxlY3RvciB0b2tlbnMuIFRoZXNlIHRhcmdldCBub2RlcyBkaXJlY3RseSwgbGlrZVxuICAgICAgICogICAgdHlwZSBvciBhdHRyaWJ1dGUgc2VsZWN0b3JzLiBUaGVzZSBhcmUgZWFzeSB0byBhcHBseVxuICAgICAgICogICAgYmVjYXVzZSB3ZSBjYW4gdHJhdmVyc2UgdGhlIHRyZWUgYW5kIHJldHVybiBvbmx5XG4gICAgICAgKiAgICB0aGUgbm9kZXMgdGhhdCBtYXRjaCB0aGUgcHJlZGljYXRlLlxuICAgICAgICpcbiAgICAgICAqIDIuIENvbWJpbmF0b3IgdG9rZW5zLiBUaGVzZSB0b2tlbnMgY2hhaW4gdG9nZXRoZXJcbiAgICAgICAqICAgIHNlbGVjdG9yIG5vZGVzLiBGb3IgZXhhbXBsZSA+IGZvciBjaGlsZHJlbiwgb3IgK1xuICAgICAgICogICAgZm9yIGFkamFjZW50IHNpYmxpbmdzLiBUaGVzZSBhcmUgaGFyZGVyIHRvIG1hdGNoXG4gICAgICAgKiAgICBhcyB3ZSBoYXZlIHRvIHRyYWNrIHdoZXJlIGluIHRoZSB0cmVlIHdlIGFyZVxuICAgICAgICogICAgdG8gZGV0ZXJtaW5lIGlmIGEgc2VsZWN0b3Igbm9kZSBhcHBsaWVzIG9yIG5vdC5cbiAgICAgICAqL1xuICAgICAgaWYgKHRva2VuLnR5cGUgPT09IFNFTEVDVE9SKSB7XG4gICAgICAgIGNvbnN0IHByZWRpY2F0ZSA9IGJ1aWxkUHJlZGljYXRlRnJvbVRva2VuKHRva2VuLCByb290KTtcbiAgICAgICAgcmVzdWx0cyA9IHJlc3VsdHMuY29uY2F0KHRyZWVGaWx0ZXIocm9vdCwgcHJlZGljYXRlKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBXZSBjYW4gYXNzdW1lIHRoZXJlIGFsd2F5cyBhbGwgcHJldmlvdXNseSBtYXRjaGVkIHRva2VucyBzaW5jZSBzZWxlY3RvcnNcbiAgICAgICAgLy8gY2Fubm90IHN0YXJ0IHdpdGggY29tYmluYXRvcnMuXG4gICAgICAgIGNvbnN0IHsgdHlwZSB9ID0gdG9rZW47XG4gICAgICAgIC8vIFdlIGFzc3VtZSB0aGUgbmV4dCB0b2tlbiBpcyBhIHNlbGVjdG9yLCBzbyBtb3ZlIHRoZSBpbmRleFxuICAgICAgICAvLyBmb3J3YXJkIGFuZCBidWlsZCB0aGUgcHJlZGljYXRlLlxuICAgICAgICBpbmRleCArPSAxO1xuICAgICAgICBjb25zdCBwcmVkaWNhdGUgPSBidWlsZFByZWRpY2F0ZUZyb21Ub2tlbih0b2tlbnNbaW5kZXhdLCByb290KTtcbiAgICAgICAgLy8gV2UgbWF0Y2ggYWdhaW5zdCBvbmx5IHRoZSBub2RlcyB3aGljaCBoYXZlIGFscmVhZHkgYmVlbiBtYXRjaGVkLFxuICAgICAgICAvLyBzaW5jZSBhIGNvbWJpbmF0b3IgaXMgbWVhbnQgdG8gcmVmaW5lIGEgcHJldmlvdXMgc2VsZWN0b3IuXG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgIC8vIFRoZSArIGNvbWJpbmF0b3JcbiAgICAgICAgICBjYXNlIEFESkFDRU5UX1NJQkxJTkc6XG4gICAgICAgICAgICByZXN1bHRzID0gbWF0Y2hBZGphY2VudFNpYmxpbmdzKHJlc3VsdHMsIHByZWRpY2F0ZSwgcm9vdCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAvLyBUaGUgfiBjb21iaW5hdG9yXG4gICAgICAgICAgY2FzZSBHRU5FUkFMX1NJQkxJTkc6XG4gICAgICAgICAgICByZXN1bHRzID0gbWF0Y2hHZW5lcmFsU2libGluZyhyZXN1bHRzLCBwcmVkaWNhdGUsIHJvb3QpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgLy8gVGhlID4gY29tYmluYXRvclxuICAgICAgICAgIGNhc2UgQ0hJTEQ6XG4gICAgICAgICAgICByZXN1bHRzID0gbWF0Y2hEaXJlY3RDaGlsZChyZXN1bHRzLCBwcmVkaWNhdGUpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgLy8gVGhlICcgJyAod2hpdGVzcGFjZSkgY29tYmluYXRvclxuICAgICAgICAgIGNhc2UgREVTQ0VOREFOVDoge1xuICAgICAgICAgICAgcmVzdWx0cyA9IG1hdGNoRGVzY2VuZGFudChyZXN1bHRzLCBwcmVkaWNhdGUpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gY29tYmluYXRvciBzZWxlY3RvcjogJHt0eXBlfWApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpbmRleCArPSAxO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdFbnp5bWU6OlNlbGVjdG9yIGV4cGVjdHMgYSBzdHJpbmcsIG9iamVjdCwgb3IgQ29tcG9uZW50IENvbnN0cnVjdG9yJyk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdHM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZWR1Y2VUcmVlc0J5U2VsZWN0b3Ioc2VsZWN0b3IsIHJvb3RzKSB7XG4gIGNvbnN0IHJlc3VsdHMgPSByb290cy5tYXAoKG4pID0+IHJlZHVjZVRyZWVCeVNlbGVjdG9yKHNlbGVjdG9yLCBuKSk7XG4gIHJldHVybiB1bmlxdWUoZmxhdChyZXN1bHRzLCAxKSk7XG59XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsSUFBQUEsa0JBQUEsR0FBQUMsT0FBQTtBQUNBLElBQUFDLE9BQUEsR0FBQUMsc0JBQUEsQ0FBQUYsT0FBQTtBQUNBLElBQUFHLGVBQUEsR0FBQUQsc0JBQUEsQ0FBQUYsT0FBQTtBQUNBLElBQUFJLFNBQUEsR0FBQUYsc0JBQUEsQ0FBQUYsT0FBQTtBQUNBLElBQUFLLE9BQUEsR0FBQUgsc0JBQUEsQ0FBQUYsT0FBQTtBQUNBLElBQUFNLGNBQUEsR0FBQUosc0JBQUEsQ0FBQUYsT0FBQTtBQUNBLElBQUFPLGFBQUEsR0FBQVAsT0FBQTtBQVFBLElBQUFRLE1BQUEsR0FBQVIsT0FBQTtBQUNBLElBQUFTLFdBQUEsR0FBQVAsc0JBQUEsQ0FBQUYsT0FBQTtBQUFzQyxTQUFBRSx1QkFBQVEsQ0FBQSxXQUFBQSxDQUFBLElBQUFBLENBQUEsQ0FBQUMsVUFBQSxHQUFBRCxDQUFBLGdCQUFBQSxDQUFBO0FBQUEsU0FBQUUsUUFBQUMsQ0FBQSxzQ0FBQUQsT0FBQSx3QkFBQUUsTUFBQSx1QkFBQUEsTUFBQSxDQUFBQyxRQUFBLGFBQUFGLENBQUEsa0JBQUFBLENBQUEsZ0JBQUFBLENBQUEsV0FBQUEsQ0FBQSx5QkFBQUMsTUFBQSxJQUFBRCxDQUFBLENBQUFHLFdBQUEsS0FBQUYsTUFB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
//# sourceMappingURL=selectors.js.map