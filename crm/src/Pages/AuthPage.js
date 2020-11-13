import React, { useState, useEffect, useContext } from 'react'
import {Card, Form, Button} from 'react-bootstrap'

import { useHttp } from './../hooks/http.hook';
import { useMessage } from './../hooks/message.hook';
import { AuthContext } from './../context/AuthContext';

export const AuthPage = () => {
  const auth = useContext(AuthContext)
  const message = useMessage()
  const {error, clearError, request} = useHttp()
  const [form, setForm] = useState({
    email: '', password: ''
  })

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const loginHandler = async event => {
    event.preventDefault()
    try {
      const data = await request('/api/auth/login', 'POST', {...form})
      auth.login(data.token, data.userId)
    } catch(e) {}
  }

  return (
    <div className="auth-page">
      <div className="auth-back">
      <Card className="auth-card" style={{backgroundColor: 'gray', width: '500px', height: '270px',}}>
         <h1 style={{color: 'white', textAlign: 'Center'}}><small>Login</small></h1>
         <Form.Group style={{marginTop: '1rem'}}>
          <Form.Control 
            style={{width: '25rem', marginLeft: '1rem', marginTop: '1rem', margin: '0 auto'}} 
            id="email"
            type="text"
            name="email"
            placeholder="Введите email ..." 
            onChange={changeHandler}
            value={form.email}
          />

          <Form.Control 
            style={{width: '25rem', marginLeft: '3rem', marginTop: '2rem',}} placeholder="Введите пароль ..."
            id="password"
            name="password"
            type="password"
            onChange={changeHandler}
            value={form.password}
          />
        </Form.Group>
         <div className="auth-btn">

          <Button 
            style={{width: '6rem', marginLeft: '3rem'}} 
            onClick={loginHandler}
          >
            Войти
          </Button>
          <Button 
            href="/register" 
            variant="success" 
            style={{width: '8rem', marginLeft: '1rem'}} 
          >
            Регистрация
          </Button>
         </div>   
      </Card>
      </div>
    </div>
  )
}