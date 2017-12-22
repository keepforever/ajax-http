import React, { Component } from 'react';
import axios from '../../../axios';
import Post from '../../../components/Post/Post';
import { Link } from 'react-router-dom';
// here we use Link instead of NavLink because we do not plan on styling
// the active link.

import './Posts.css';

class Posts extends Component {
    state = {
        posts: [],

    }
// componentDidMount is the best place to send HTTP requests
// cannot store get request results in a constant because javaScript
// executes code asyncronusly, meaning, it does not wait for the get
// request to finish before moving on to the next line. Axios uses
// promisies, a new-ish javaScript feature.
// then() takes a function as an input, and executes once the
// axios.get() request has completed. The function inside then() recieves
// a response object as an input.
    componentDidMount () {
        // logging props here to see decorations from React Router
        console.log(this.props);
        axios.get('/posts')
            .then(response => {
                // transform data after recieving to limit number of
                // posts displayed.
                const posts = response.data.slice(0, 4);
                // distributing the content of posts, one by one via map,
                // and hardcoding a new author property to 'Max' on each
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'Max'
                    }
                });
                this.setState({posts: updatedPosts});
                // this.setState({posts: response.data});
                // console.log( response );
            })
            .catch(error => {
                // this.setState({error: true})
                console.log(error);
            })

    }


    postSelectedHandler = (id) => {
        this.setState({selectedPostId: id});
    }
    render() {
        let posts = <p style={{textAlign: 'center'}}>Something Went Wrong...</p>
        if (!this.state.error) {
            posts = this.state.posts.map(post => {
                return (
                    <Link to={'/' + post.id} key={post.id}>
                        <Post
                            title={post.title}
                            author={post.author}
                            clicked={() => this.postSelectedHandler(post.id)} />
                    </Link>
                );
            });
        }

        return (
            <section className="Posts">
                {posts}
            </section>
        );
    }

};

export default Posts;

// since link is our outer element that's getting created by the
// map function, the key property should be passed to it so it will
// have a unique key
