import React, { useEffect, useState } from 'react'

import { getTenants } from '../Service/TenantService'

import {useNavigate} from 'react-router-dom'
function ListOfTenants() {

  const [tenants,setTenants] = useState([]);
  const navigate = useNavigate();
  useEffect(() =>{
    getAllTenants();
  },[])


  function getAllTenants(){
    getTenants().then((response) => {
        setTenants(response.data)
        console.log("work")
    }).catch(err => console.error(err))
  }

  function addTenant(){
    navigate('/add/tenant')
  }

  return (
    
    <>
      
      <div className='container'>
       <h2>List of Tenants</h2>

       <button className='btn btn-primary mb-2' onClick={addTenant}>Add Tenant</button>
         
        <table className='table table-striped table-bordered'> 

         <thead>

          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone number</th>
            <th>Room type</th>
            <th>Room no</th>
            <th>Floor</th>
          </tr>

         </thead>

         <tbody>

            {
             tenants.map( tenant =>{

                return(
             <tr key={tenant.id}>
                <td>{tenant.id}</td>
                <td>{tenant.name}</td>
                <td>{tenant.email}</td>
                <td>{tenant.phoneNumber}</td>
                <td>{tenant.roomType}</td>
                <td>{tenant.roomNo}</td>
                <td>{tenant.floor}</td>
             </tr> ) })

            }
         </tbody>

        </table>

      </div>
    
    </>
  )
}

export default ListOfTenants