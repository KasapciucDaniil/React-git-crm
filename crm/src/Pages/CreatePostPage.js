import React, { useCallback, useEffect, useState, useContext } from 'react'
import {Form, Button} from 'react-bootstrap'

import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'
import { Loader } from '../Components/Loader'
import logo from '../logo.svg'

export const CreatePost = () => {
  const auth = useContext(AuthContext)
  const {request, loading} = useHttp()
  const [notes, setNotes] = useState([])
  const [note, setNote] = useState({})

  const changeHandler = event => {
    setNote({ ...note, [event.target.name]: event.target.value })
  }

  const noteHandler = event => {
    setNote(JSON.parse(event.target.value))
  } 

  const fetchedNote = useCallback( async () => {
    try {
      const fetched = await request('/api/note', 'GET', null, {
        Authorization: `Bearer ${auth.token}`
      }) 
      setNotes(fetched)
    } catch (e) {}
  }, [auth.token, request])

  useEffect(() => {
    fetchedNote() 
  }, [fetchedNote])

  if (loading) {
    return <Loader />
  }

  return (
    <div className="createPost-page" >
      <Form style={{width: '700px', marginRight: '7rem'}}>
        <h2 className="display-4" style={{color: 'white', marginBottom: '1rem'}} >Создание новой Записи</h2>
      
        <div className="card-createPost">
            <Form.Group >
                <Form.Label style={{marginRight: '22rem'}} >Выберите категорию</Form.Label>
                <Form.Control as="select"
                  type="select"
                  onChange={noteHandler}
                >
                
                { 
                  notes.map(note => {
                    return (
                      <option value={JSON.stringify(note)}>{note.title}</option>
                    ) 
                  }) 
                }

                </Form.Control>
            </Form.Group>   

            <Form.Group controlId="formBasicEmail">
              <Form.Label
                style={{marginRight: '40rem'}} 
                onChange={changeHandler}  
                name="limit"
              >
                Сумма
              </Form.Label>
              <Form.Control type="email" placeholder="Введите число..." />
            </Form.Group>

            <Form.Group >
                <Form.Label style={{marginRight: '41.5rem'}} >Тип</Form.Label>
                 <Form.Control 
                   as="select"
                   type="select"
                   name="type"
                   onChange={changeHandler}  
                 >
                <option>Доход</option>
                <option>Расход</option>
                </Form.Control>
            </Form.Group>   

              <Form.Group controlId="formBasicPassword">
                <Form.Label 
                  style={{marginRight: '38.5rem'}}
                  onChange={changeHandler}  
                  name="text"
                >
                  Описание
                </Form.Label>
                <Form.Control type="password" placeholder="Введите текст..." />
              </Form.Group>
            <Button 
              variant="success" 
              style={{marginLeft: '24rem'}}
            >
              Создать Пост
            </Button>
        </div>   
     </Form>
     <div className="createPost-logo">
          <img 
            src={logo} 
            className="App-logo" 
            alt="logo" 
            style={{height: '330px',width: '330px', marginTop: '4rem'}} 
          />
          <h1 className="display-4 logo-title">
           <strong>
             React.js-Crm
           </strong> 
          </h1>
     </div>
    </div>
  )
}