"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function unimplementedError(methodName, classname) {
  return new Error("".concat(methodName, " is a required method of ").concat(classname, ", but was not implemented."));
}
var EnzymeAdapter = /*#__PURE__*/function () {
  function EnzymeAdapter() {
    _classCallCheck(this, EnzymeAdapter);
    this.options = {};
  }

  // Provided a bag of options, return an `EnzymeRenderer`. Some options can be implementation
  // specific, like `attach` etc. for React, but not part of this interface explicitly.
  // eslint-disable-next-line class-methods-use-this, no-unused-vars
  return _createClass(EnzymeAdapter, [{
    key: "createRenderer",
    value: function createRenderer(options) {
      throw unimplementedError('createRenderer', 'EnzymeAdapter');
    }

    // converts an RSTNode to the corresponding JSX Pragma Element. This will be needed
    // in order to implement the `Wrapper.mount()` and `Wrapper.shallow()` methods, but should
    // be pretty straightforward for people to implement.
    // eslint-disable-next-line class-methods-use-this, no-unused-vars
  }, {
    key: "nodeToElement",
    value: function nodeToElement(node) {
      throw unimplementedError('nodeToElement', 'EnzymeAdapter');
    }

    // eslint-disable-next-line class-methods-use-this
  }, {
    key: "matchesElementType",
    value: function matchesElementType(node, matchingType) {
      if (!node) {
        return node;
      }
      var type = node.type;
      return type === matchingType;
    }

    // eslint-disable-next-line class-methods-use-this, no-unused-vars
  }, {
    key: "isValidElement",
    value: function isValidElement(element) {
      throw unimplementedError('isValidElement', 'EnzymeAdapter');
    }

    // eslint-disable-next-line class-methods-use-this, no-unused-vars
  }, {
    key: "createElement",
    value: function createElement(type, props) {
      throw unimplementedError('createElement', 'EnzymeAdapter');
    }

    // eslint-disable-next-line class-methods-use-this
  }, {
    key: "invokeSetStateCallback",
    value: function invokeSetStateCallback(instance, callback) {
      callback.call(instance);
    }
  }]);
}();
EnzymeAdapter.MODES = {
  STRING: 'string',
  MOUNT: 'mount',
  SHALLOW: 'shallow'
};
var _default = exports["default"] = EnzymeAdapter;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJ1bmltcGxlbWVudGVkRXJyb3IiLCJtZXRob2ROYW1lIiwiY2xhc3NuYW1lIiwiRXJyb3IiLCJjb25jYXQiLCJFbnp5bWVBZGFwdGVyIiwiX2NsYXNzQ2FsbENoZWNrIiwib3B0aW9ucyIsIl9jcmVhdGVDbGFzcyIsImtleSIsInZhbHVlIiwiY3JlYXRlUmVuZGVyZXIiLCJub2RlVG9FbGVtZW50Iiwibm9kZSIsIm1hdGNoZXNFbGVtZW50VHlwZSIsIm1hdGNoaW5nVHlwZSIsInR5cGUiLCJpc1ZhbGlkRWxlbWVudCIsImVsZW1lbnQiLCJjcmVhdGVFbGVtZW50IiwicHJvcHMiLCJpbnZva2VTZXRTdGF0ZUNhbGxiYWNrIiwiaW5zdGFuY2UiLCJjYWxsYmFjayIsImNhbGwiLCJNT0RFUyIsIlNUUklORyIsIk1PVU5UIiwiU0hBTExPVyIsIl9kZWZhdWx0IiwiZXhwb3J0cyIsIm1vZHVsZSIsImRlZmF1bHQiXSwic291cmNlcyI6WyIuLi9zcmMvRW56eW1lQWRhcHRlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiB1bmltcGxlbWVudGVkRXJyb3IobWV0aG9kTmFtZSwgY2xhc3NuYW1lKSB7XG4gIHJldHVybiBuZXcgRXJyb3IoYCR7bWV0aG9kTmFtZX0gaXMgYSByZXF1aXJlZCBtZXRob2Qgb2YgJHtjbGFzc25hbWV9LCBidXQgd2FzIG5vdCBpbXBsZW1lbnRlZC5gKTtcbn1cblxuY2xhc3MgRW56eW1lQWRhcHRlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMub3B0aW9ucyA9IHt9O1xuICB9XG5cbiAgLy8gUHJvdmlkZWQgYSBiYWcgb2Ygb3B0aW9ucywgcmV0dXJuIGFuIGBFbnp5bWVSZW5kZXJlcmAuIFNvbWUgb3B0aW9ucyBjYW4gYmUgaW1wbGVtZW50YXRpb25cbiAgLy8gc3BlY2lmaWMsIGxpa2UgYGF0dGFjaGAgZXRjLiBmb3IgUmVhY3QsIGJ1dCBub3QgcGFydCBvZiB0aGlzIGludGVyZmFjZSBleHBsaWNpdGx5LlxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY2xhc3MtbWV0aG9kcy11c2UtdGhpcywgbm8tdW51c2VkLXZhcnNcbiAgY3JlYXRlUmVuZGVyZXIob3B0aW9ucykge1xuICAgIHRocm93IHVuaW1wbGVtZW50ZWRFcnJvcignY3JlYXRlUmVuZGVyZXInLCAnRW56eW1lQWRhcHRlcicpO1xuICB9XG5cbiAgLy8gY29udmVydHMgYW4gUlNUTm9kZSB0byB0aGUgY29ycmVzcG9uZGluZyBKU1ggUHJhZ21hIEVsZW1lbnQuIFRoaXMgd2lsbCBiZSBuZWVkZWRcbiAgLy8gaW4gb3JkZXIgdG8gaW1wbGVtZW50IHRoZSBgV3JhcHBlci5tb3VudCgpYCBhbmQgYFdyYXBwZXIuc2hhbGxvdygpYCBtZXRob2RzLCBidXQgc2hvdWxkXG4gIC8vIGJlIHByZXR0eSBzdHJhaWdodGZvcndhcmQgZm9yIHBlb3BsZSB0byBpbXBsZW1lbnQuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjbGFzcy1tZXRob2RzLXVzZS10aGlzLCBuby11bnVzZWQtdmFyc1xuICBub2RlVG9FbGVtZW50KG5vZGUpIHtcbiAgICB0aHJvdyB1bmltcGxlbWVudGVkRXJyb3IoJ25vZGVUb0VsZW1lbnQnLCAnRW56eW1lQWRhcHRlcicpO1xuICB9XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNsYXNzLW1ldGhvZHMtdXNlLXRoaXNcbiAgbWF0Y2hlc0VsZW1lbnRUeXBlKG5vZGUsIG1hdGNoaW5nVHlwZSkge1xuICAgIGlmICghbm9kZSkge1xuICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfVxuICAgIGNvbnN0IHsgdHlwZSB9ID0gbm9kZTtcbiAgICByZXR1cm4gdHlwZSA9PT0gbWF0Y2hpbmdUeXBlO1xuICB9XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNsYXNzLW1ldGhvZHMtdXNlLXRoaXMsIG5vLXVudXNlZC12YXJzXG4gIGlzVmFsaWRFbGVtZW50KGVsZW1lbnQpIHtcbiAgICB0aHJvdyB1bmltcGxlbWVudGVkRXJyb3IoJ2lzVmFsaWRFbGVtZW50JywgJ0VuenltZUFkYXB0ZXInKTtcbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjbGFzcy1tZXRob2RzLXVzZS10aGlzLCBuby11bnVzZWQtdmFyc1xuICBjcmVhdGVFbGVtZW50KHR5cGUsIHByb3BzLCAuLi5jaGlsZHJlbikge1xuICAgIHRocm93IHVuaW1wbGVtZW50ZWRFcnJvcignY3JlYXRlRWxlbWVudCcsICdFbnp5bWVBZGFwdGVyJyk7XG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY2xhc3MtbWV0aG9kcy11c2UtdGhpc1xuICBpbnZva2VTZXRTdGF0ZUNhbGxiYWNrKGluc3RhbmNlLCBjYWxsYmFjaykge1xuICAgIGNhbGxiYWNrLmNhbGwoaW5zdGFuY2UpO1xuICB9XG59XG5cbkVuenltZUFkYXB0ZXIuTU9ERVMgPSB7XG4gIFNUUklORzogJ3N0cmluZycsXG4gIE1PVU5UOiAnbW91bnQnLFxuICBTSEFMTE9XOiAnc2hhbGxvdycsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBFbnp5bWVBZGFwdGVyO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxTQUFTQSxrQkFBa0JBLENBQUNDLFVBQVUsRUFBRUMsU0FBUyxFQUFFO0VBQ2pELE9BQU8sSUFBSUMsS0FBSyxJQUFBQyxNQUFBLENBQUlILFVBQVUsK0JBQUFHLE1BQUEsQ0FBNEJGLFNBQVMsK0JBQTRCLENBQUM7QUFDbEc7QUFBQyxJQUVLRyxhQUFhO0VBQ2pCLFNBQUFBLGNBQUEsRUFBYztJQUFBQyxlQUFBLE9BQUFELGFBQUE7SUFDWixJQUFJLENBQUNFLE9BQU8sR0FBRyxDQUFDLENBQUM7RUFDbkI7O0VBRUE7RUFDQTtFQUNBO0VBQUEsT0FBQUMsWUFBQSxDQUFBSCxhQUFBO0lBQUFJLEdBQUE7SUFBQUMsS0FBQSxFQUNBLFNBQUFDLGNBQWNBLENBQUNKLE9BQU8sRUFBRTtNQUN0QixNQUFNUCxrQkFBa0IsQ0FBQyxnQkFBZ0IsRUFBRSxlQUFlLENBQUM7SUFDN0Q7O0lBRUE7SUFDQTtJQUNBO0lBQ0E7RUFBQTtJQUFBUyxHQUFBO0lBQUFDLEtBQUEsRUFDQSxTQUFBRSxhQUFhQSxDQUFDQyxJQUFJLEVBQUU7TUFDbEIsTUFBTWIsa0JBQWtCLENBQUMsZUFBZSxFQUFFLGVBQWUsQ0FBQztJQUM1RDs7SUFFQTtFQUFBO0lBQUFTLEdBQUE7SUFBQUMsS0FBQSxFQUNBLFNBQUFJLGtCQUFrQkEsQ0FBQ0QsSUFBSSxFQUFFRSxZQUFZLEVBQUU7TUFDckMsSUFBSSxDQUFDRixJQUFJLEVBQUU7UUFDVCxPQUFPQSxJQUFJO01BQ2I7TUFDQSxJQUFRRyxJQUFJLEdBQUtILElBQUksQ0FBYkcsSUFBSTtNQUNaLE9BQU9BLElBQUksS0FBS0QsWUFBWTtJQUM5Qjs7SUFFQTtFQUFBO0lBQUFOLEdBQUE7SUFBQUMsS0FBQSxFQUNBLFNBQUFPLGNBQWNBLENBQUNDLE9BQU8sRUFBRTtNQUN0QixNQUFNbEIsa0JBQWtCLENBQUMsZ0JBQWdCLEVBQUUsZUFBZSxDQUFDO0lBQzdEOztJQUVBO0VBQUE7SUFBQVMsR0FBQTtJQUFBQyxLQUFBLEVBQ0EsU0FBQVMsYUFBYUEsQ0FBQ0gsSUFBSSxFQUFFSSxLQUFLLEVBQWU7TUFDdEMsTUFBTXBCLGtCQUFrQixDQUFDLGVBQWUsRUFBRSxlQUFlLENBQUM7SUFDNUQ7O0lBRUE7RUFBQTtJQUFBUyxHQUFBO0lBQUFDLEtBQUEsRUFDQSxTQUFBVyxzQkFBc0JBLENBQUNDLFFBQVEsRUFBRUMsUUFBUSxFQUFFO01BQ3pDQSxRQUFRLENBQUNDLElBQUksQ0FBQ0YsUUFBUSxDQUFDO0lBQ3pCO0VBQUM7QUFBQTtBQUdIakIsYUFBYSxDQUFDb0IsS0FBSyxHQUFHO0VBQ3BCQyxNQUFNLEVBQUUsUUFBUTtFQUNoQkMsS0FBSyxFQUFFLE9BQU87RUFDZEMsT0FBTyxFQUFFO0FBQ1gsQ0FBQztBQUFDLElBQUFDLFFBQUEsR0FBQUMsT0FBQSxjQUVhekIsYUFBYTtBQUFBMEIsTUFBQSxDQUFBRCxPQUFBLEdBQUFBLE9BQUEsQ0FBQUUsT0FBQSIsImlnbm9yZUxpc3QiOltdfQ==
//# sourceMappingURL=EnzymeAdapter.js.map