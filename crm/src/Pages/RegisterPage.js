import React, { useState, useEffect } from 'react'
import {Card, Form, Button} from 'react-bootstrap'
import {useHistory} from 'react-router-dom'

import { useHttp } from './../hooks/http.hook';
import { useMessage } from './../hooks/message.hook';

export const RegisterPage = () => {
  const history = useHistory()
  const message = useMessage()
  const {loading, error, request, clearError} = useHttp()
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

  const registerHandler = async event => {
    event.preventDefault()
    try {
      const data = await request('/api/auth/register', 'POST', {...form})
      message(data.message)
      history.push('/auth')
    } catch(e) {}
  }

  return (
    <div className="register-page">
      <Card 
        className="card-auth" 
        style={{backgroundColor: 'gray', width: '500px', height: '340px'}}
      >
          <div className="auth-header">       
            <Button 
              href="/auth" 
              variant="success" 
              style={{ height: '2.5rem', marginLeft: '0.5rem',marginTop: '1rem'}} 
            >
              Назад
            </Button>

            <h1 style={{color: 'white', marginLeft: '1rem'}}><small>Регистрация аккаунта</small></h1>
          </div>
          
         <Form.Group 
           style={{marginTop: '1rem'}}
          >
           <Form.Control 
             style={{width: '25rem', marginLeft: '1rem', marginTop:  '1rem', margin: '0 auto'}} 
             placeholder="Введите email ..."
             id="email"
             name="email"
             type="text"
             onChange={changeHandler}
           />
            <Form.Control 
              style={{width: '25rem', marginLeft: '3rem', marginTop: '2rem',}} placeholder="Введите NickName ..." 
              id="name"
              type="text"
              name="name"
              onChange={changeHandler}
            />
              <Form.Control 
                style={{width: '25rem', marginLeft: '3rem', marginTop: '2rem',}} placeholder="Введите пароль ..." 
                id="password"
                type="password"
                name="password"
                onChange={changeHandler}
                />
         </Form.Group>
         <div className="auth-btn">
          <Button
            variant="info" 
            style={{width: '11rem', height: '2.5rem', margin: '0 auto'}} 
            onClick={event => registerHandler(event)}
            disabled={loading}
          >
            Зарегестрироваться
          </Button>
         </div>   
      </Card>
    </div>
  )
}