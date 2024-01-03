import React, { useState } from 'react'
import { useFetch } from '../../hooks/useFetch'


export const InputSelect = ({title}) => {

   const {departments} = useFetch();
   (departments === []) ? null : console.log(departments);

    
   if(!departments) return null;

  return (
   <>
   <label htmlFor={title}>{title}</label>
   <select name={title} id={title}>
    <option value="">---</option>
   </select>
   </>
  )
}
