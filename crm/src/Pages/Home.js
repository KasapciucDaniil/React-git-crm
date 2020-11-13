import React, {useEffect, useState} from 'react'
import {Card, NavDropdown, Button} from 'react-bootstrap'

import { Loader } from '../Components/Loader'

export const Home = () => {
  const [data, setData] = useState({}) 
  const [loading, setLoading] = useState(true)

  const fetchValute = async () => {
    const response = await fetch('http://data.fixer.io/api/latest?access_key=8bde77ff478af3babc77cca1adc02750&format=1')
    const value = await response.json()
    setData(value)
    setLoading(false)
  } 

  useEffect(() => {
    fetchValute()
  }, [])

  if (loading) {
    return <Loader />
  }

  return (
    <div className="home-page" >
        <div className="card-page-header">
          <h1 className="display-4" style={{margin: '0 auto' ,color: 'white'}} >Счета</h1>
           <h3 style={{color: 'white'}} className="display-4 cards-date">{new Date().toLocaleString()}</h3>  
        </div> 
     <div className="cards">
      <Card 
        className="card-blue"
        style={{backgroundColor: '#03a9f4', width: '400px', height: '120px'}}>
         <h4 className="display-4 card-blue-title" style={{color: 'white', textAlign: 'left'}}
         >
           Счет в валюте
        </h4>
          <Card.Body>

            {/* {
              data.map(rates => {
                return (
                  <Card.Title
                    className="display-4  card-blue-txt"
                    style={{color: 'white', textAlign: 'left'}}
                  >
                   {rates.date} 
                  </Card.Title>
                )
              })
            } */}

            <Card.Title 
              className="display-4 card-blue-txt" 
              style={{color: 'white', textAlign: 'left'}}
            >
              {data.date}
            </Card.Title>
            <NavDropdown.Divider />
         </Card.Body>
      </Card>

        <Card 
          className="card-orange" 
          style={{backgroundColor: '#ef6c00', width: '600px', height: '280px'}}>
          <h4 className="display-4 card-orange-title" style={{color: 'white', textAlign: 'left'}}>Курс валют</h4>
            <Card.Body>
             <div className="card-orange-data">
                <Card.Title className="display-4 card-orange-txt" style={{color: 'white', textAlign: 'left'}}>Валюта</Card.Title>
                  <Card.Title className="display-4 card-orange-txt" style={{color: 'white', textAlign: 'left'}}>Курс</Card.Title>
                <Card.Title className="display-4 card-orange-txt" style={{color: 'white', textAlign: 'left'}}>Дата</Card.Title>
              </div>  
              <NavDropdown.Divider />
              <div className="card-orange-file">
              <Card.Title className="display-4 card-orange-txt" style={{color: 'white', textAlign: 'left'}}>{data.base}</Card.Title>
                 <Card.Title className="display-4 card-orange-txt" style={{color: 'white', textAlign: 'left'}}>18.85</Card.Title>
              <Card.Title className="display-4 card-orange-txt" style={{color: 'white', textAlign: 'left'}}>{data.date}</Card.Title>
              </div>
              <NavDropdown.Divider />
              <div className="card-orange-file">
              <Card.Title className="display-4 card-orange-txt" style={{color: 'white', textAlign: 'left'}}>{data.base}</Card.Title>
                <Card.Title 
                  className="display-4 card-orange-txt" 
                  style={{color: 'white', textAlign: 'left'}}
                >
                  {data.rates.USD}
                </Card.Title>
              <Card.Title className="display-4 card-orange-txt" style={{color: 'white', textAlign: 'left'}}>{data.date}</Card.Title>  
              </div>  
              <NavDropdown.Divider />
              <div className="card-orange-file">
              <Card.Title className="display-4 card-orange-txt" style={{color: 'white', textAlign: 'left'}}>{data.base}</Card.Title>
                 <Card.Title className="display-4 card-orange-txt" style={{color: 'white', textAlign: 'left'}}>18.85</Card.Title>
              <Card.Title className="display-4 card-orange-txt" style={{color: 'white', textAlign: 'left'}}>{data.date}</Card.Title>  
              </div>  
              <NavDropdown.Divider />
          </Card.Body>
        </Card>
      </div> 
      <Button href="/categories" className="add-button">+</Button>
    </div>
  )
}