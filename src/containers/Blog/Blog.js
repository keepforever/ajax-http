import React, { Component } from 'react';
import Posts from './Posts/Posts';

import './Blog.css';

// XMLHttpRequest - default javaScript object for making requests
// we will use third party AXIOS to help us do this.

class Blog extends Component {

    render () {

        return (
            <div className={"Blog"}>
                <header>
                    <nav>
                        <ul>
                            <li><a href="/">Home</a></li>
                            <li><a href="/">New Post</a></li>
                        </ul>
                    </nav>
                </header>
                <Posts />
            </div>
        );
    }
}

export default Blog;

// Removed because we want to render at different routes using our newly
// devloped react-router skillz.

// Components were moved into the containers folder because they will each
// become their own root elements via the Router.

// Full Post, New Post, Posts will all become containers under the new routing
// paradigm

// <section>
//     <FullPost id={this.state.selectedPostId} />
// </section>
// <section>
//     <NewPost />
// </section>
//
// import Post from '../../components/Post/Post';
// import FullPost from '../../components/FullPost/FullPost';
// import NewPost from '../../components/NewPost/NewPost';
// import axios from 'axios';
