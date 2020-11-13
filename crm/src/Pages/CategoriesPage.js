import React, {useContext, useState, useCallback, useEffect} from 'react'
import { useHistory } from 'react-router-dom'

import {Card, Form, Button} from 'react-bootstrap'
import { useHttp } from './../hooks/http.hook';
import { useMessage } from '../hooks/message.hook'
import { AuthContext } from './../context/AuthContext';
import { Loader } from '../Components/Loader'

export const Categories = () => {
  const auth = useContext(AuthContext)
  const history = useHistory()
  const message = useMessage()
  const {request, loading} = useHttp()
  const [notes, setNotes] = useState([])
  const [note, setNote] = useState({})
  const [title, setTitle] = useState('')
  const [limit, setLimit] = useState('100')

  const changeHandler = event => {
    setNote({ ...note, [event.target.name]: event.target.value })
  }

  const changeNoteHandler = async event => {
    event.preventDefault()
    try {
      const data = await request('/api/note/changeNote', 'PATCH', {...note}, {
        Authorization: `Bearer ${auth.token}`
      })
      setNote(data)
      console.log(data)
      message(data.message)
    } catch(e) {}
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
      setNote(fetched[0])
    } catch (e) {}
  }, [auth.token, request])

  useEffect(() => {
    fetchedNote() 
  }, [fetchedNote])

  if (loading) {
    return <Loader />
  }

  const createHandler = async event => {
    event.preventDefault() 
    
    try {
      const data = await request('/api/note/generate', 'POST', 
        {
          title,
          limit
        }, 
        {
          Authorization: `Bearer ${auth.token}`
        }
      ) 
      history.push('/createPost')
      console.log(data)
    } catch(e) {}
  }

  return (
    <div className="categories-page" >
      <h1 className="display-4" style={{color: 'white'}} >Категории</h1>

      <div className="cards" style={{marginRight: '2rem'}} >
      <Card className="card-blue" style={{backgroundColor: 'white', width: '600px', height: '250px'}}>
         <h4 className="display-4 card-blue-title" style={{textAlign: 'left'}}>Создать категорию</h4>
         <Form.Group 
         >

          <Form.Control 
            style={{width: '30rem', marginLeft: '1rem', marginTop: '1rem'}} placeholder="Введите название категории ..." 
            onChange={e => setTitle(e.target.value)}
            value={title}
          />

          <Form.Control 
            style={{width: '30rem', marginLeft: '1rem', marginTop: '2rem'}} placeholder="Введите лимит категории ..." 
            onChange={e => setLimit(e.target.value)}
            value={limit} 
          />

        </Form.Group>
         <Button 
           variant="info" 
           style={{width: '6rem', marginLeft: '1rem'}} 
           onClick={createHandler}
         >
           Создать
         </Button>

      </Card>

        <Card className="card-orange" style={{backgroundColor: 'white', width: '600px', height: '330px'}}>
           <h4 className="display-4 card-orange-title" style={{ textAlign: 'left'}}>Редактировать категорию</h4>
            <Form.Group >
              <Form.Label style={{color: 'white', marginRight: '24.5rem'}} >Выбрать категорию</Form.Label>
              <Form.Control as="select"
                type="select"
                style={{width: '30rem', marginLeft: '1rem'}}
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
            <Form.Group>

              <Form.Control 
                style={{width: '30rem', marginLeft: '1rem', marginTop: '1rem'}} 
                placeholder="Название ..." 
                onChange={changeHandler}
                value={note.title}
                name="title"
              />

              <Form.Control 
                style={{width: '30rem', marginLeft: '1rem', marginTop: '2rem'}} 
                placeholder="Лимит категории ..." 
                value={note.limit}
                onChange={changeHandler}
                name="limit"
              />

          </Form.Group>

          <Button 
            variant="success" 
            style={{width: '6.5rem', marginLeft: '1rem'}} 
            onClick={event => changeNoteHandler(event)}
          >
            Обновить
          </Button>
          
        </Card>
      </div> 
    </div>
  )
}