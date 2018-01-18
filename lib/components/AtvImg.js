'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styles = require('../styles');

var _styles2 = _interopRequireDefault(_styles);

var AtvImg = (function (_Component) {
  _inherits(AtvImg, _Component);

  function AtvImg() {
    var _this = this;

    _classCallCheck(this, AtvImg);

    _Component.apply(this, arguments);

    this.state = {
      rootElemWidth: 0,
      rootElemHeight: 0,
      isOnHover: false,
      container: {},
      shine: {},
      layers: []
    };

    this.handleMove = function (_ref) {
      var pageX = _ref.pageX;
      var pageY = _ref.pageY;

      var layerCount = _this.props.layers.length; // the number of layers

      var _state = _this.state;
      var rootElemWidth = _state.rootElemWidth;
      var rootElemHeight = _state.rootElemHeight;

      var bodyScrollTop = document.body.scrollTop || document.getElementsByTagName('html')[0].scrollTop;
      var bodyScrollLeft = document.body.scrollLeft;
      var offsets = _this.refs.root.getBoundingClientRect();
      var wMultiple = 320 / rootElemWidth;
      var offsetX = 0.52 - (pageX - offsets.left - bodyScrollLeft) / rootElemWidth; // cursor position X
      var offsetY = 0.52 - (pageY - offsets.top - bodyScrollTop) / rootElemHeight; // cursor position Y
      var dy = pageY - offsets.top - bodyScrollTop - rootElemHeight / 2; // center Y of container
      var dx = pageX - offsets.left - bodyScrollLeft - rootElemWidth / 2; // center X of container
      var yRotate = (offsetX - dx) * (0.07 * wMultiple); // rotation for container Y
      var xRotate = (dy - offsetY) * (0.1 * wMultiple); // rotation for container X

      var arad = Math.atan2(dy, dx); // angle between cursor and center of container in RAD

      var rawAngle = arad * 180 / Math.PI - 90; // convert rad to degrees
      var angle = rawAngle < 0 ? rawAngle + 360 : rawAngle;

      _this.setState({
        container: {
          transform: 'rotateX(' + xRotate + 'deg) rotateY(' + yRotate + 'deg)' + (_this.state.isOnHover ? ' scale3d(1.07,1.07,1.07)' : '')
        },
        shine: {
          background: 'linear-gradient(' + angle + 'deg, rgba(255, 255, 255, ' + (pageY - offsets.top - bodyScrollTop) / rootElemHeight * 0.4 + ') 0%, rgba(255, 255, 255, 0) 80%)',
          transform: 'translateX(' + (offsetX * layerCount - 0.1) + 'px) translateY(' + (offsetY * layerCount - 0.1) + 'px)'
        },
        layers: _this.props.layers.map(function (_, idx) {
          return {
            transform: 'translateX(' + offsetX * (layerCount - idx) * (idx * 2.5 / wMultiple) + 'px) translateY(' + offsetY * layerCount * (idx * 2.5 / wMultiple) + 'px)'
          };
        })
      });
    };

    this.handleTouchMove = function (evt) {
      evt.preventDefault();
      var _evt$touches$0 = evt.touches[0];
      var pageX = _evt$touches$0.pageX;
      var pageY = _evt$touches$0.pageY;

      _this.handleMove({ pageX: pageX, pageY: pageY });
    };

    this.handleEnter = function () {
      _this.setState({ isOnHover: true });
    };

    this.handleLeave = function () {
      _this.setState({
        isOnHover: false,
        container: {},
        shine: {},
        layers: []
      });
    };

    this.renderShadow = function () {
      return _react2['default'].createElement('div', { style: _extends({}, _styles2['default'].shadow, _this.state.isOnHover ? _styles2['default'].shadowOnHover : {}) });
    };

    this.renderLayers = function () {
      return _react2['default'].createElement(
        'div',
        { style: _styles2['default'].layers },
        _this.props.layers && _this.props.layers.map(function (imgSrc, idx) {
          return _react2['default'].createElement('div', {
            style: _extends({
              backgroundImage: 'url(' + imgSrc + ')'
            }, _styles2['default'].renderedLayer, _this.state.layers[idx] ? _this.state.layers[idx] : {}),
            key: idx
          });
        })
      );
    };

    this.renderShine = function () {
      return _react2['default'].createElement('div', { style: _extends({}, _styles2['default'].shine, _this.state.shine) });
    };
  }

  AtvImg.prototype.componentDidMount = function componentDidMount() {
    if (!this.props.isStatic) {
      this.setState({ // eslint-disable-line react/no-did-mount-set-state
        // this is a legit use case. we must trigger a re-render. don't worry.
        rootElemWidth: this.refs.root.clientWidth || this.refs.root.offsetWidth || this.refs.root.scrollWidth,
        rootElemHeight: this.refs.root.clientHeight || this.refs.root.offsetHeight || this.refs.root.scrollHeight
      });
    }
  };

  AtvImg.prototype.render = function render() {
    if (this.props.isStatic) {
      return _react2['default'].createElement(
        'div',
        {
          style: _extends({}, _styles2['default'].root, this.props.style ? this.props.style : {}),
          className: this.props.className || ''
        },
        _react2['default'].createElement('img', { style: _styles2['default'].staticFallback, src: this.props.staticFallback })
      );
    }

    return _react2['default'].createElement(
      'div',
      {
        style: _extends({}, _styles2['default'].root, {
          transform: 'perspective(' + this.state.rootElemWidth * 3 + 'px)'
        }, this.props.style ? this.props.style : {}),
        onMouseMove: this.handleMove,
        onMouseEnter: this.handleEnter,
        onMouseLeave: this.handleLeave,
        onTouchMove: this.handleTouchMove,
        onTouchStart: this.handleEnter,
        onTouchEnd: this.handleLeave,
        className: this.props.className || '',
        ref: 'root'
      },
      _react2['default'].createElement(
        'div',
        { style: _extends({}, _styles2['default'].container, this.state.container) },
        this.renderShadow(),
        this.renderLayers(),
        this.renderShine()
      )
    );
  };

  return AtvImg;
})(_react.Component);

exports['default'] = AtvImg;
module.exports = exports['default'];