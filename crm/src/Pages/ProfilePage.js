import React, { useContext, useState, useCallback, useEffect } from 'react'
import {Form, Button} from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

import { Loader } from '../Components/Loader'
import { useMessage } from '../hooks/message.hook'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'

export const Profile = () => {
  const history = useHistory()
  const [users, setUsers] = useState('')
  const auth = useContext(AuthContext)
  const message = useMessage()
  const {request, loading} = useHttp()
  const [form, setForm] = useState({})

  const logoutHandler = async event => {
    event.preventDefault()
      auth.logout()
      history.push('/auth')
  } 

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const nameHandler = async event => {
    event.preventDefault()
    try {
      const data = await request('/api/auth/change', 'PATCH', {...form}, {
        Authorization: `Bearer ${auth.token}`
      })

      message(data.message)
    } catch(e) {}
  }

  const fetchedName = useCallback( async () => {
    try {
      const fetched = await request('/api/auth/info', 'GET', null, {
        Authorization: `Bearer ${auth.token}`
      })
      setUsers(fetched)
    } catch (e) {}
  }, [auth.token, request])

  useEffect(() => {
    fetchedName() 
  }, [fetchedName])

  if (loading) {
    return <Loader />
  } 

  return (
    <div className="profile-page">
     <div style={{display: 'flex'}}>
     <Form className="profile-card" 
        style={{width: '450px',  height: '210px', marginTop: '2rem', marginLeft: '2rem'}} 
      >
        <Form.Group controlId="formBasicEmail">
          <Form.Label className="display-4">Профиль</Form.Label>
          <Form.Control 
            id="name"
            type="text"
            name="name"
            style={{marginTop: '1rem'}}
            placeholder="Введите новый UserName ..." 
            onChange={changeHandler}
          />
        </Form.Group> 

          <Button 
            variant="success" 
            type="submit" 
            style={{marginLeft: '20rem'}}
            onClick={event => nameHandler(event)}
          > 
            Изменить
          </Button>
      </Form>
      <h1 className="display-4 user-name" style={{color: 'white'}} >User Name : {users.name}</h1>
     </div> 
      <div className="btn-border">
              <Button 
                variant="danger"
                onClick={logoutHandler}
                style={{marginTop: '0rem', marginRight: '20rem', color:  'white', height: '6rem', width: '6rem', borderRadius: '55px'}}
              >
                <h5>
                 Выход
                </h5>
             </Button>
          </div> 
    </div>
  )
}