import React, { useState, useEffect, useContext, useCallback } from 'react'
import { Button, NavDropdown } from 'react-bootstrap'

import { Loader } from '../Components/Loader'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'

export const History = () => {
  // const [data, setData] = useState({}) 
  // const [loading, setLoading] = useState(true)
  const auth = useContext(AuthContext)
  const {request, loading} = useHttp()
  const [notes, setNotes] = useState([])

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
    <div className="history-page">
      <h1 className="display-4" style={{color: 'white', textAlign: 'left', marginLeft: '12rem'}}>History</h1>

      <div className="history-card">
         <div className="value-card" style={{display: 'flex'}}>
           <div>
             <h5 style={{color: 'white', fontWeight: '300', marginLeft: '1rem '}}>Название</h5>
             <NavDropdown.Divider />
              {
                notes.map(note => {
                  return (
                   <h5 style={{color: 'white', fontWeight: '300', marginLeft: '1rem ', marginTop: '2rem'}}>{note.title}</h5>
                  )
                })
              }
           </div>

           <div>
             <h5 className="categ-card" style={{marginLeft: '6.5rem'}}>Сумма</h5>
             <NavDropdown.Divider />
             {
               notes.map(note => {
                 return (
                  <h5 style={{color: 'white', fontWeight: '300', marginLeft:  '6.5rem ', marginTop: '2.5rem'}}>{note.limit}</h5>
                 )
               })
             }
           </div>

           <div>
             <h5 className="categ-card" style={{marginLeft: '7.5rem'}}>Категория</h5>
             <NavDropdown.Divider />
             <h5 className="categ-card" style={{marginLeft: '7.5rem',marginTop: '1rem'}}>-</h5>
           </div>

           <div>
            <h5 className="categ-card" style={{marginLeft: '7.5rem'}}>Тип</h5>
            <NavDropdown.Divider />
            <h5 className="categ-card" style={{marginLeft: '7.5rem',marginTop: '1rem'}}>-</h5>
           </div>

           <div>
             <h5 className="categ-card" style={{marginLeft: '7rem'}}>Открыть</h5>
             <NavDropdown.Divider style={{width: '15rem'}} />
             <Button variant="success" style={{marginLeft: '7rem', marginTop: '1rem'}}>Открыть</Button>
           </div>
         </div>
      </div>
    </div>
  )
}