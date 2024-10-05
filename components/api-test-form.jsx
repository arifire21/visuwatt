import { Button, Select, Option } from "@mui/joy";
import { useState } from "react";

export default function APITest(){
  const [county, setCounty] = useState('')
  const [requests, setRequests] = useState([])

  const handleChange = (event, newValue) => {
    setCounty(newValue)
  };

  const getRequests = async (countyReq) => {
    try {
      const req = await fetch(`/api/requests/get-all-records?county=${countyReq}`, {
        method: "GET",
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      })

      if (!req.ok) {
        console.error('Error fetching requests:', req.status, req.statusText)
        return []
      }

      return await req.json()
      .then((data) => {matchDataHelper(data.results)})
    }
    
    catch (e) {
      console.error("An error occurred trying to fetch the request:", e)
      return [] // Return empty array when an error occurs
    }
  }
  
    // useEffect(() => {
    //   getRequests()
    //     .then((requests) => setRequests(requests))
    //     .catch((error) => {
    //       console.error("Error checking for existing request:", error)
    //     })
    // },[]) // Empty dependency array ensures the effect runs once on mount

    return(
      <>
      <Select onChange={handleChange}>
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

        <Button disabled={county==='' ? true : false} onclick={() => {getRequests(county)}}>Get All Records for {county ?? '[select a county first]'}</Button>
        </>
    )
}