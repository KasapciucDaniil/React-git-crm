import React from 'react'
import { Spinner } from 'react-bootstrap'

export const Loader = () => {
  return (
    <div className="loader-page" >
      <Spinner animation="border" role="status" style={{width: '150px', height: '150px', color: 'white', marginTop: '10rem'}} >
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  )
}