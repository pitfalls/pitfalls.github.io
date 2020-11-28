
import React from 'react';
import ReactDOM from 'react-dom';
/**
 * REACT app with WP API
 * @link http://mediatemple.net/blog/tips/loading-and-using-external-data-in-react/
 * @link http://codepen.io/krogsgard/pen/NRBqPp
 */
var Advent = React.createClass({
  // Set the initial React state
  getInitialState: function() {
    return {
      posts: [] // our data setup is expecting Posts
    }
  },

  componentDidMount: function() {
    var _th = this;
    this.serverRequest =
      axios
        .get(this.props.source)
        .then(function(result) {
           _th.setState({
             posts: result.data
           });
        });
  },

  // Error handling - if Ajax request is still going when React (or you) remove a component, abort Ajax request
  componentWillUnmount: function() {
    this.serverRequest.abort();
  },

  // Render our component!!
  render: function() {
    return (
      <div className="post-wrapper">
			{this.state.posts.map(function(post) {
				return (
					<div key={post.link} className="post">
            <a className="author-wrap" href={post._embedded.author[0].link}><img className="avatar" src={post._embedded.author[0].avatar_urls['48']} />posted by {post._embedded.author[0].name}</a>
						<h2 className="post-title"><a href={post.link}
						dangerouslySetInnerHTML={{__html:post.title.rendered}}
						/></h2>
						 {post.featured_media ?
						 	<a href={post.link}><img src={post._embedded['wp:featuredmedia'][0].media_details.sizes["thumbnail"].source_url} /></a>
						 : null}
						{post.excerpt.rendered ?
							<div className="excerpt" dangerouslySetInnerHTML={{__html:post.excerpt.rendered}} />
						: null}
						<div className="entry-meta">

							<a className="button read-more" href={post.link}>Read More &raquo;</a>
						</div>
					</div>
				);
			})}
			</div>
    )
  }
});

React.render(
  <Advent source="http://aaronsnowberger.com/wp-json/wp/v2/posts/?_embed&categories=764&per_page=3&author=1" />,
  document.querySelector("#posts")
);
