import React, { useEffect, useState } from 'react'

export const Selects = () => {

    const [departments, setDepartaments] = useState([]);
    const [showCities, setShowCities] = useState(false);
    const [city, setCity] = useState([]);

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

    const departmentSelected = (e) => {
        setShowCities(true);
        let deparment = departments.find(el => el.departamento === e.target.value);
        deparment && setCity(deparment.ciudades)
    };

  return (
    <div>
      <h1>Select anidados</h1>
      <h2>Colombia</h2>

      <label htmlFor="select-primary">Departamentos</label>
      <select name="primary" id="select-primary" onChange={departmentSelected}>
        <option value="">Choose a department</option>
        {departments.map((el, index) => (
          <option key={index} value={el.departamento}>
            {el.departamento}
          </option>
        ))}
      </select>
      <p></p>
      {showCities && (
        <>
          <label htmlFor="select-secondary">Ciudades</label>
          <select name="secondary" id="select-secondary">
            <option value="">Choose a city</option>
            {
              city.map((el, index) => (
                <option key={index} value={el}>
                  {el}
                </option>
              ))}
          </select>
        </>
      )}

      <p></p>
    </div>
  );
}
