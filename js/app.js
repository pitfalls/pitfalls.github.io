'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * REACT app with WP API
 * @link http://mediatemple.net/blog/tips/loading-and-using-external-data-in-react/
 * @link http://codepen.io/krogsgard/pen/NRBqPp
 */
var Advent = _react2.default.createClass({
  displayName: 'Advent',

  // Set the initial React state
  getInitialState: function getInitialState() {
    return {
      posts: [] // our data setup is expecting Posts
    };
  },
  // something
  componentDidMount: function componentDidMount() {
    var _th = this;
    this.serverRequest = axios.get(this.props.source).then(function (result) {
      _th.setState({
        posts: result.data
      });
    });
  },

  // Error handling - if Ajax request is still going when React (or you) remove a component, abort Ajax request
  componentWillUnmount: function componentWillUnmount() {
    this.serverRequest.abort();
  },

  // Render our component!!
  render: function render() {
    return _react2.default.createElement(
      'div',
      { className: 'post-wrapper' },
      this.state.posts.map(function (post) {
        return _react2.default.createElement(
          'div',
          { key: post.link, className: 'post' },
          _react2.default.createElement(
            'h2',
            { className: 'post-title' },
            _react2.default.createElement('a', { href: post.link,
              dangerouslySetInnerHTML: { __html: post.title.rendered }
            })
          ),
          post.featured_media ? _react2.default.createElement(
            'a',
            { href: post.link },
            _react2.default.createElement('img', { src: post._embedded['wp:featuredmedia'][0].media_details.sizes["large"].source_url })
          ) : null,
          post.excerpt.rendered ? _react2.default.createElement('div', { className: 'excerpt', dangerouslySetInnerHTML: { __html: post.excerpt.rendered } }) : null,
          _react2.default.createElement(
            'div',
            { className: 'entry-meta' },
            _react2.default.createElement(
              'a',
              { className: 'author-wrap', href: post._embedded.author[0].link },
              _react2.default.createElement('img', { className: 'avatar', src: post._embedded.author[0].avatar_urls['48'] }),
              'by\xA0 ',
              post._embedded.author[0].name
            ),
            _react2.default.createElement(
              'a',
              { className: 'button read-more', href: post.link },
              'Read More \xBB'
            )
          )
        );
      })
    );
  }
});

_react2.default.render(_react2.default.createElement(Advent, { source: 'http://aaronsnowberger.com/wp-json/wp/v2/posts/?_embed&categories=764&per_page=3&author=1' }), document.querySelector("#posts"));
