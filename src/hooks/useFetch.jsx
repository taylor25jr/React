import React, { useState, useEffect } from 'react';

export const useFetch = () => {
    const [departments, setDepartaments] = useState([]);

    useEffect(() => {

        const abortController = new AbortController();
        const signal = abortController.signal;
        
          const apiList = async () => {
              try {
                  const url = "https://raw.githubusercontent.com/marcovega/colombia-json/master/colombia.min.json";
                  const answer = await fetch(url) 
                  
                  if(!answer.ok) throw new Error(answer.statusText || "Ocurrio un error");
                  const json = await answer.json();
                  
                  if(!signal.aborted){
                    setDepartaments(json);
                  }
  
              } catch (error) {
                if(signal.aborted){
                  console.log(error)
                  setDepartaments(null);
              }}
          } 
          apiList();
  
          return () => abortController.abort();
      }, [])
      return {departments};
}
