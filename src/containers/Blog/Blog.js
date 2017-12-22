import React, { Component } from 'react';
import { Route, Link, NavLink, Switch} from 'react-router-dom';
// Switch allows us to tell react to only render one route given
// a collection of possibile routes.
// The Link component works in conjunction with React router
// to prevent the application from being reloaded each time we
// switch "pages".  This helps us to contain our state and not lose
// it between pages.  React router gives us ome extra information about
// the loaded routes through props.  In other words, it decorates props with
// propterties.  NavLink allows us to add css styling dynamically to show active
// link.  It literally adds an 'active' class to whichever route was most recently
// clicked.

import Posts from './Posts/Posts';
import NewPost from './NewPost/NewPost';
import FullPost from './FullPost/FullPost';



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
                            <li><NavLink
                                to="/"
                                exact
                                activeClassName="not-my-active"
                                activeStyle={{
                                    fontWeight: 'bold',
                                    textDecoration: 'underline',
                                    color: 'blue'
                                }}>Home</NavLink></li>
                            {/* "to" property can be an object used to configure
                            the path.  "hash" is used to append a fragment after the
                            URL. "seach allows us to attach query params"
                            To build a relative path, you have access to this.props.match.url
                            which is the current path, then concat that with whatever you like */}
                            <li><NavLink to={{
                                pathname: '/new-post',
                                hash: '#addedToEndOfFinalURLAfterAllOtherAddendums',
                                search: '?quick-submit=truePlusBallsss'
                            }}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                {/* <Route path="/" exact render={() => <h1>Home</h1>} /> */}
                <Switch>
                    <Route path="/" exact component={Posts} />
                    <Route path="/new-post" component={NewPost} />
                    {/* the colon ":" indicates that we have a dynamic route. we still need to
                    pass that dynamic info to the dynamic route component somehow.s*/}
                    <Route path="/:id" component={FullPost} />
                </Switch>
            </div>
        );
    }
}

export default Blog;

// the "exact" property passed to the <Route/> component is a boolean
// that will only render the component if the current path the application is at
// matches exactly with the path property also passed to that <Route />

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
