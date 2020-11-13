import React, {useContext, useCallback, useEffect, useState} from 'react'
import {NavLink} from 'react-router-dom'

import logo from '../logo.svg'
import {Navbar, Nav, Container} from 'react-bootstrap'
import { useHttp } from '../hooks/http.hook'
import { Loader } from '../Components/Loader'
import { AuthContext } from './../context/AuthContext';

export const Header = () => {
  const auth = useContext(AuthContext)
  const {request, loading} = useHttp()
  const [users, setUsers] = useState('')
  // const history = useHistory()
  // const auth = useContext(AuthContext)

  // const logoutHandler = async event => {
  //   event.preventDefault()
  //     auth.logout()
  //     history.push('/auth')
  // } 

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
    <Navbar expand="lg" bg="dark" variant="dark" >
      <Container>
        <Navbar.Brand href="/">
        <img src={logo} className="App-logo" alt="logo" />
        </Navbar.Brand>
           <Navbar.Toggle aria-controls="basic-navbar-nav" />
           <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <div className="main-nav">
            <NavLink
              className="nav-header"
              to="/"
            >
              Главная
            </NavLink>

            <NavLink
              className="nav-header" 
              to="/categories"
              style={{marginLeft: '9px'}}
            >
              Категории
            </NavLink>

            <NavLink
              className="nav-header" 
              to="/planning"
              style={{marginLeft: '9px'}}
            >
              Планирование
            </NavLink>

            <NavLink 
              className="nav-header" 
              to="/history"
              style={{marginLeft: '9px'}}
            >
              История
            </NavLink>

            <NavLink 
              className="nav-header" 
              to="/createPost"
              style={{marginLeft: '9px'}}
            >
              Создание Поста
            </NavLink>

          </div>  
        </Nav>
        </Navbar.Collapse>
         <div className="user-logo">
         <Navbar.Brand href="/profile">
           <img 
             src="../avatar.png" 
             className="avatar" 
             alt="logo" 
             height={60} 
             width={60} 
           />
          </Navbar.Brand>
          <h5 className="display-4 user-name-logo" style={{color: 'white'}}> {users.name}</h5> 
         </div>
        </Container> 
      </Navbar>
  )
}