import React, {useState, useCallback, useEffect, useContext} from 'react'
import { ProgressBar } from 'react-bootstrap'
import { Loader } from '../Components/Loader'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from './../context/AuthContext';
import { NavDropdown } from 'react-bootstrap'
import logo from '../logo.svg'

export const Planning = () => {
  const {request, loading} = useHttp() 
  const auth = useContext(AuthContext)
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
    <div className="planing-page">
      <h1 style={{color: 'white'}} className="display-4" >Планирование</h1>
      <NavDropdown.Divider />
     <div className="logo-planing">
      <div className="planing-link">
               { 
                 notes.map(note => {
                   return (
                     <div className="progress-txt">
                      <div className="planing-ifno">
                       <h5 className="title-plan ">{note.title}</h5>
                       <h5 className="title-plan ">: 0,00 $ из {note.limit}$</h5> 
                      </div>
                       <ProgressBar className="progress" striped variant="danger" animated now={60} />
                     </div>
                   )
                 }) 
               }

      </div>

       <div style={{marginLeft: '12rem'}} className="createPost-logo">
          <img 
            src={logo} 
            className="App-logo logo-plan" 
            alt="logo" 
            style={{height: '330px',width: '330px', marginTop: '1rem', position: 'fixed'}} 
          />
           <h5 className="display-4 logo-title" style={{marginTop: '18rem', position: 'fixed'}}>
            <strong>
              React.js-Crm
            </strong> 
           </h5>
      </div>
     </div> 
    </div>
  )
} 