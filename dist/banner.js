"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ComponentBanner;
var _react = _interopRequireDefault(require("react"));
require("./styles.css");
var _antd = require("antd");
var _componentLinkButton = _interopRequireDefault(require("@ivoyant/component-link-button"));
var _shortid = _interopRequireDefault(require("shortid"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// css

// import '../../../globalStyles/styles.css';

// components

function ComponentBanner(_ref) {
  let {
    properties,
    component,
    data = [],
    store = {},
    responseData = [],
    loading = undefined,
    error = undefined,
    payload = undefined,
    templateClassName,
    workflow = [],
    ...props
  } = _ref;
  const {
    Title,
    Text
  } = _antd.Typography;
  let recommendations = data?.data?.recommendations?.recommendations || [];
  const sortedRecommendations = recommendations?.sort((a, b) => a.priority > b.priority ? 1 : -1);
  const finalData = sortedRecommendations.slice(0, 3);

  // destructuring props
  const {
    header,
    actions
  } = properties;
  const listHeader = topHeader => /*#__PURE__*/_react.default.createElement(Title, {
    level: 5,
    className: "list-header",
    style: {
      padding: '0% 5%'
    }
  }, topHeader);
  const listItemHeader = itemHeader => /*#__PURE__*/_react.default.createElement(Text, {
    className: "list-item-header"
  }, itemHeader ? itemHeader : '');
  const getAction = type => {
    let value = actions?.find(_ref2 => {
      let {
        feature
      } = _ref2;
      return feature === type;
    });
    return value || {};
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "list-container"
  }, /*#__PURE__*/_react.default.createElement(_antd.List, {
    header: listHeader(header),
    itemLayout: "vertical",
    size: "small",
    dataSource: finalData,
    split: false,
    renderItem: item => getAction(item?.featureName).type === 'memo' ? /*#__PURE__*/_react.default.createElement("span", null, /*#__PURE__*/_react.default.createElement(_antd.List.Item, {
      key: item?.message,
      style: {
        padding: '0 0 8px 16px'
      }
    }, /*#__PURE__*/_react.default.createElement(_antd.List.Item.Meta, {
      title: listItemHeader(item?.message ? item?.message : item?.actionName)
    }), /*#__PURE__*/_react.default.createElement(_antd.Row, {
      className: "list-item-content"
    }, /*#__PURE__*/_react.default.createElement(_antd.Col, {
      span: 24
    }, item?.notes))), /*#__PURE__*/_react.default.createElement("hr", {
      className: "list-split"
    })) : /*#__PURE__*/_react.default.createElement("span", null, /*#__PURE__*/_react.default.createElement(_antd.List.Item, {
      key: item?.actionName,
      style: {
        padding: '0 0 8px 16px'
      }
    }, /*#__PURE__*/_react.default.createElement(_antd.List.Item.Meta, {
      title: listItemHeader(item?.actionName)
    }), item?.attributes?.map(_ref3 => {
      let {
        name,
        value
      } = _ref3;
      return /*#__PURE__*/_react.default.createElement(_antd.Row, {
        className: "list-item-content",
        key: _shortid.default.generate()
      }, /*#__PURE__*/_react.default.createElement(_antd.Col, {
        span: 9
      }, name), /*#__PURE__*/_react.default.createElement(_antd.Col, {
        span: 1
      }, ":"), /*#__PURE__*/_react.default.createElement(_antd.Col, {
        span: 14
      }, value));
    }), item?.messageCode == 'showNotes' && /*#__PURE__*/_react.default.createElement(_antd.Row, {
      className: "list-item-content"
    }, /*#__PURE__*/_react.default.createElement(_antd.Col, {
      span: 24
    }, item?.notes)), /*#__PURE__*/_react.default.createElement(_antd.Row, {
      className: "list-item-action-button"
    }, /*#__PURE__*/_react.default.createElement(_antd.Col, null, /*#__PURE__*/_react.default.createElement(_componentLinkButton.default, {
      size: "small",
      type: "primary",
      href: getAction(item?.featureName)?.route,
      routeData: getAction(item?.featureName)?.routeData
    }, "Take Action")))), /*#__PURE__*/_react.default.createElement("hr", {
      className: "list-split"
    }))
  }));
}
module.exports = exports.default;