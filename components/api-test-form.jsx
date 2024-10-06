import { Button, Select, Option } from "@mui/joy";
import { useState } from "react";
import { useEffect } from "react";

export default function APITest(){
  const [county, setCounty] = useState('')
  const [requests, setRequests] = useState([])

  function dataHelper(requests){ //relying on state in getData does not work because of state's delayed updating
    // console.log(results)
      setRequests(requests)
    }

  const handleChange = (event, newValue) => {
    setCounty(newValue)
  };
  
  function test(){
    console.log('hi')
  }

  const getRequests = async () => {
    // try {
      const req = await fetch(`/api/get-all-records?county=${county}`, {
        method: "GET",
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      })
        .then((res) => {
          if(!res.ok){
            console.log('Check Internet Connection')
            // setMatchEmpty(true)
            // setRequestFail(true)
            return null;
          }
          else {
            return res.json() // Parse the response data as JSON
          }
        }) 
        .then((data) => {dataHelper(data)})
        .catch( err => console.log(err) );
  }


    return(
      <>
      <Select onChange={handleChange} sx={{maxWidth:'500px'}}>
        <Option value="Broward">Broward</Option>
        <Option value="Franklin">Franklin</Option>
        <Option value="Hillsborough">Hillsborough</Option>
        <Option value="Liberty">Liberty</Option>
        <Option value="Miami-Dade">Miami-Dade</Option>
        <Option value="Monroe">Monroe</Option>
        <Option value="Orange">Orange</Option>
        <Option value="Palm Beach">Palm Beach</Option>
        <Option value="Union">Union</Option>
      </Select>

        <Button disabled={county==='' ? true : false} onClick={getRequests}>Get All Records for {county}</Button>
        </>
    )
}