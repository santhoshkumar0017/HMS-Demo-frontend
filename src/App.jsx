import { useState } from 'react'
import './App.css'
import ListOfTenants from './Components/ListOfTenants'
import TenantComponent from './Components/TenantComponent'
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  

  return (
    <>

   
     <BrowserRouter>
    

     <Routes>

     <Route path='/' element={<ListOfTenants/>}> </Route>
      
     <Route path='/add/tenant' element={<TenantComponent/>}> </Route> 


     </Routes>
     
     </BrowserRouter> 
    </>
  )
}

export default App
