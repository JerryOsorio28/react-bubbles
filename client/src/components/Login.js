import React, { useState } from "react";
import axios from 'axios';

//Semantic UI components for structure and style of the Form
import { Button, Form } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  // console.log('Login', props)

  const [login, setLogin] = useState({ 
    username: 'Lambda School', 
    password: 'i<3Lambd4'
   })

  const handleChanges = e => {
    const inputLogin = { ...login, [e.target.name]: e.target.value}
    setLogin(inputLogin)
  }

  const handleSubmit = e => {
    e.preventDefault();
    axios
    .post('http://localhost:5000/api/login', login)
    .then( res => {
      console.log(res)
      localStorage.setItem('token', res.data.payload)
      props.history.push('/BubblePage')
    })
    .catch( err => console.log(err.response))
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <Form.Field>
          <label>Username</label>
          <input 
          placeholder='Username' 
          name='username'
          value={login.username}
          onChange={handleChanges}
          />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input
          placeholder='Password' 
          name='password'
          value={login.password}
          onChange={handleChanges}
          />
        </Form.Field>
        <Button type='submit'>Submit</Button>
      </Form>
    </>
  );
};

export default Login;
