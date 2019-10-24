import _regeneratorRuntime from "babel-runtime/regenerator";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from "react";
import logo from "./logo.png";
import "./App.css";
import ReactTable from "react-table";
import "react-table/react-table.css";
import motosumo from "./api/motosumo";

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    _classCallCheck(this, App);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = App.__proto__ || Object.getPrototypeOf(App)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      id: 42,
      event: []
    }, _this.fetchEvent = function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(id) {
        var response;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                console.log("fetching event..");
                _context.next = 3;
                return motosumo.get("/event", {
                  params: {
                    id: id
                  }
                });

              case 3:
                response = _context.sent;

                console.log(response);
                _this.setState({
                  event: response.data
                });

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, _this2);
      }));

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }(), _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(App, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this3 = this;

      // fetch event now, and then every 1 minute
      this.fetchEvent(this.id);
      this.timer = setInterval(function () {
        return _this3.fetchEvent();
      }, 60000);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      console.log("UPDATE: ", this.state.event);
    }
  }, {
    key: "render",
    value: function render() {
      var columns = [{
        Header: "Chain",
        accessor: "chain"
      }, {
        Header: "Gym",
        accessor: "center"
      }, {
        Header: "Distance",
        accessor: "distance"
      }, {
        Header: "kcal",
        accessor: "kcal"
      }, {
        Header: "Hours",
        accessor: "hours"
      }, {
        Header: "Unique members",
        accessor: "n_users"
      }];

      return React.createElement(
        "div",
        { className: "App" },
        React.createElement(
          "header",
          { className: "App-header" },
          React.createElement("img", { src: logo, className: "App-logo", alt: "logo" }),
          React.createElement(
            "p",
            null,
            "Welcome to the Motosumo Global Event site!"
          ),
          React.createElement(
            "div",
            { className: "App-table" },
            React.createElement(ReactTable, { data: this.state.event, columns: columns })
          ),
          React.createElement(
            "p",
            { className: "App-link" },
            "Powered by\xA0",
            React.createElement(
              "a",
              {
                className: "App-link",
                href: "https://motosumo.com",
                target: "_blank",
                rel: "noopener noreferrer"
              },
              "Motosumo"
            )
          )
        )
      );
    }
  }]);

  return App;
}(React.Component);

export default App;