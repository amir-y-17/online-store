import './App.css';

import { useRoutes } from "react-router-dom";
import React from 'react'
import route from './routes';

export default function App() {

  const routes = useRoutes(route)


  return (
    <>
    
    {routes}
    </>
  )
}