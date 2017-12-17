import React, { Component } from 'react';
// import axios from 'axios';
import axios from '../../axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

// XMLHttpRequest - default javaScript object for making requests
// we will use third party AXIOS to help us do this.

class Blog extends Component {
    state = {
        posts: [],
        selectedPostId: null,
        error: false
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
                this.setState({error: true})
                //console.log(error);
            })

    }

    postSelectedHandler = (id) => {
        this.setState({selectedPostId: id});
    }

    render () {
        let posts = <p style={{textAlign: 'center'}}>Something Went Wrong...</p>
        if (!this.state.error) {
            posts = this.state.posts.map(post => {
                return <Post
                    key={post.id}
                    title={post.title}
                    author={post.author}
                    clicked={() => this.postSelectedHandler(post.id)} />
            });
        }
        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId} />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;
