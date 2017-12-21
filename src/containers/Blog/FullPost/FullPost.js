import React, { Component } from 'react';
import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {

    state = {
        loadedPost: null
    }
    // here we will use axios.get, but the url has to target the specific
    // post object which we want to display the properties of in the full
    // post.
    componentDidUpdate () {
        if (this.props.id) {
            // we will get an infinite loop if we don't add a check to make sure
            // that we only send a GET request when loading a new post id.
            if ( !this.state.loadedPost || (this.state.loadedPost &&
                                            this.state.loadedPost.id !== this.props.id) ) {
                axios.get('/posts/' + this.props.id)
                    .then(response =>{
                        //console.log(response);
                        this.setState({loadedPost: response.data});
                    });
            }
        }
    }

    deletePostHandler = () => {
        axios.delete( '/posts/' + this.props.id )
            .then(response => {
                console.log(response);
            });
    }

    render () {
        let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;
        if (this.props.id) {
            post = <p style={{textAlign: 'center'}}>loading...!</p>;
        }
        if (this.state.loadedPost) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button onClick={this.deletePostHandler} className="Delete">Delete</button>
                    </div>
                </div>
            );
        }
        return post;
    }
}

export default FullPost;
