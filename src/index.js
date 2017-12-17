import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

// we can use an axios to prepend/amend the outgoing request's configuration
// for example if we are always requesting from 'www.test/some/api/', we can
// omit it in the component and prepend it here wile things after api vary
// default to set up defaults for all requests being sent.

// commenting baseURL out to instead implement it in an instance within
// the axios.js file at the source level.

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com'
// adds a ehader to every request i.e. 'common'
axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
// adds a header to only post requests
axios.defaults.headers.post['Content-Type'] = 'application/json';

// Interceptors allow you to "intercept"  a http request whenever any
// are sent or recieved from anywhere in the application. This is the most
// global file in the react app. call use() to register a new interceptor.
// interceptor reciev       es a function as an input that recieves the request/config.
// need to always return the request within the interceptor or else it will block
// it's safe passage.  we can pass a second function into interceptor for error
// handeling.

axios.interceptors.request.use( request => {
    console.log( 'interceptor request object', request );
    // edit request, add headers, etc.
    return request;
}, error => {
    // this does not contain error message from outside application.
    // the error referred to here is the application talking to itself.
    // not the application hearing from outside.
    console.log('2nd interceptor fuction:', error);
    // must also return error to prevent from getting stuck just like with request.
    return Promise.reject(error);
});

// when we want to hear from the server that we are contacting about errors
// or whatever it's telling us.

axios.interceptors.response.use( response => {
    console.log( 'interceptor response object', response );
    // edit request, add headers, etc.
    return response;
}, error => {
    console.log('response interceptor', error);
    return Promise.reject(error);
});

ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();
