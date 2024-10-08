import { Map, Marker, Overlay } from "pigeon-maps"
import Image from 'next/image'
import Head from "next/head";
import { useState } from "react"
import { Button, Typography, CircularProgress } from "@mui/joy";
import {collections} from '../lib/collection-names'
import styles from '@/styles/map.module.css'
import { Container, FormControl, FormLabel, Input, Select, Option, Radio, RadioGroup } from "@mui/joy";


export default function MapNew() {
  const [bubble, setBubble] = useState({ visible: false, position: [0, 0], text: '' });
  const [records, setRecords] = useState([])
  const [taxIncentive, setTaxIncentive] = useState('')
  const [workshop, setWorkshop] = useState('')

  const [dataNull, setDataNull] = useState(false)
  const [isLoading, setLoading] = useState(false)

  const [buttonOpen, setOpen] = useState(false)

  const handleMarkerClick = (position, text, queryStr) => {
      //call API after showing results? for now.
      //TODO: replace this with a LoadingCircle while the API is fetching then rendering data
      getRecords(queryStr)

    if (bubble.visible && bubble.position[0] === position[0]) {
      // If the same marker is clicked again, hide the bubble
      setBubble({ visible: false, position: [0, 0], text: '' });
      setRecords([]) //set to empty so it can be repopulated
    } else {
      // Otherwise, show the bubble with the new position and text
      setBubble({ visible: true, position, text });
    }
  }

  function dataHelper(data) {
    if(data == null){
      setDataNull(true)
      setLoading(false)
      return false;
    }
    //relying on state in getData does not work because of state's delayed updating
    console.log(`helper data print: ${data[0]}`)
    setRecords(data[0])
    setTaxIncentive(data[0].taxCredit.Type[0])
    setWorkshop(data[0].Workshops.Type[0])
    setLoading(false)
    return true;
  }

  const getRecords = async (bubbleName) => {
    setLoading(true);
    // try {
    const req = await fetch(`/api/find-record-from-county?county=${bubbleName}`, {
      method: "GET",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    })
      .then((res) => {
        if (!res.ok) {
          console.log('API ERROR')
          return null;
        }
        else {
          return res.json() // Parse the response data as JSON
        }
      })
      .then((data) => { dataHelper(data) })
      .catch(err => console.log(err));
  }

  return (
    <>
      <Head>
      <title>Map - VisuWatt</title>
      </Head>
      <Typography className={styles.pageTitle} variant="h1" component="h1" gutterBottom>
        Energy Map
      </Typography>

    <Map height={700} defaultCenter={[27.9659, -82.7959]} defaultZoom={7} zoom={7} mouseEvents={false} touchEvents={false}>
      {/* Orange County */}
      <Marker width={50} anchor={[28.5384, -81.3789]} color={'red'} onClick={() => handleMarkerClick([28.5384, -81.3789], "Orange County", collections[7])} />

      {/* Broward */}
      <Marker width={50} anchor={[26.1901, -80.3659]} color={'red'} onClick={() => handleMarkerClick([26.1901, -80.3659], "Broward County", collections[0])} />

      {/* Palm Beach */}
      <Marker width={50} anchor={[26.6515, -80.2767]} color={'red'} onClick={() => handleMarkerClick([26.6515, -80.2767], "Palm Beach County", collections[8])} />

      {/* Hillsborough */}
      <Marker width={50} anchor={[27.9904, -82.3018]} color={'red'} onClick={() => handleMarkerClick([27.9904, -82.3018], "Hillsborough County", collections[2])} />

      {/* Miami - Dade */}
      <Marker width={50} anchor={[25.7617, -80.1918]} color={'red'} onClick={() => handleMarkerClick([25.7617, -80.1918], "Miami-Dade County", collections[5])} />

      {/* Franklin */}
      <Marker width={50} anchor={[29.8503, -84.8723]} color={'blue'} onClick={() => handleMarkerClick([29.8503, -84.8723], "Franklin County", collections[1])} />

      {/* Lafayette */}
      <Marker width={50} anchor={[29.9844, -83.1766]} color={'blue'} onClick={() => handleMarkerClick([29.9844, -83.1766], "Lafayette County", collections[3])} />

      {/* Union */}
      <Marker width={50} anchor={[30.0454, -82.3624]} color={'blue'} onClick={() => handleMarkerClick([30.0454, -82.3624], "Union County", collections[9])} />

      {/* Monroe */}
      <Marker width={50} anchor={[25.2974, -81.0755]} color={'blue'} onClick={() => handleMarkerClick([25.2974, -81.0755], "Monroe County", collections[6])} />

      {/* Liberty */}
      <Marker width={50} anchor={[30.1508, -84.8568]} color={'blue'} onClick={() => handleMarkerClick([30.1508, -84.8568], "Liberty County", collections[4])} />

      {/* Legend */}
      <Overlay anchor={[26.2333, -86.8833]} offset={[0, 0]}>
        <Image src="/Legend.jpeg" width={240} height={158} alt='HI' />
      </Overlay>

      {/* Survey Button */}
      <Overlay anchor={[27.0, -86.8833]} offset={[0, 0]}>
        <Button
          size="lg"
          variant="solid"
          color="success"
          onClick={() => {console.log("Survey Button Clicked"); setOpen(true)}}
        >
          Take Survey
        </Button>
      </Overlay>

      {/* Text Bubble */}
      {bubble.visible && (
        <Overlay anchor={bubble.position} offset={[0, 0]}>
          <div style={bubbleStyle}>
            <p style={{textAlign:'center'}}><strong>{bubble.text}</strong></p>
            {isLoading==true ? //is loading true?
            //if true, render the loading text
              <div style={{display:'flex', textAlign:'center'}}>
                <p>Loading...</p>
              </div>
            //if false, check if the API returned data
            //if dataNull is still true? return the error message
            : (dataNull== true ? <p>API Error!</p> : (
              //: = null is false, data was found so display it
              <>
              <p><strong>Utilities:</strong> {records.utilityCompany}</p>
              {/* <p>Housing: {records.housing}</p> */}
              <p><strong><small>Usage per Household Annually: </small></strong>{records.power} kWh</p>
              <p><strong>Main Tax Incentives:</strong> {taxIncentive}</p>
              <p><strong>Workshop Offered:</strong> {workshop}</p>
              </>
            ))}
          </div>
        </Overlay>
      )}
    </Map>

    {buttonOpen && (
      <form style={{zIndex:99, position:'absolute', left:'10', top:'10%', backgroundColor:'white', padding:'2rem', borderRadius:'10px',   border: '2px solid forestgreen'}}>
      <Container maxWidth="sm">
        <Button variant="outlined" color="success" sx={{float:'right'}} onClick={() => {setOpen(false)}}>X</Button>
          <h3 style={{marginBottom:'1rem'}}>Home Assessment Form</h3>
          <FormControl sx={{marginBottom:'1rem'}}>
              <FormLabel>Household Size</FormLabel>
              <Input sx={{maxWidth:'100px'}}/>
          </FormControl>

          <FormControl sx={{marginBottom:'1rem'}}>
              <FormLabel>Household Type</FormLabel>
              <Select
              labelId="home-type-label"
              name="homeType"
              variant="outlined"
              // sx={{ fontSize: '2rem', height: '60px'}}
            >
              <Option value=""><em>None</em></Option>
              <Option value="Apartment">Apartment</Option>
              <Option value="Single Family Home">Single Family Home</Option>
              <Option value="Townhouse">Townhouse</Option>
              <Option value="Condo">Condo</Option>
              <Option value="Mobile Home">Mobile Home</Option>
              <Option value="Other">Other</Option>
            </Select>
          </FormControl>

          <FormControl sx={{marginBottom:'1rem'}}>
              <FormLabel>Describe your understanding of home energy consumption.</FormLabel>
              <Input/>
          </FormControl>

          <FormControl sx={{marginBottom:'1rem'}}>
              <FormLabel>What is your primary source of energy? (Gas, Solar, etc)</FormLabel>
              <Input/>
          </FormControl>

          <FormControl sx={{marginBottom:'1rem'}}>
              <FormLabel>Are you interested in exploring renewable energy options for your home?</FormLabel>
              <RadioGroup defaultValue="outlined" name="radio-buttons-group">
                <Radio value="Yes" label="Yes"/>
                <Radio value="No" label="No"/>
              </RadioGroup>
          </FormControl>

          <FormControl sx={{marginBottom:'1rem'}}>
              <FormLabel>Are you interested in educational workshops in your county?</FormLabel>
              <RadioGroup defaultValue="outlined" name="radio-buttons-group">
                <Radio value="Yes" label="Yes"/>
                <Radio value="No" label="No"/>
              </RadioGroup>
          </FormControl>

          <Button color="success" onClick={() => {alert('Coming Soon!\nYour responses will help us improve our services.')}}>Submit</Button>
      </Container>
      </form>
    )}
    </>
  );
}

const bubbleStyle = {
  backgroundColor: 'white',
  padding: '5px 10px',
  borderRadius: '5px',
  border: '2px solid forestgreen',
  boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  whiteSpace: 'nowrap',
  color: 'black',
};

// {records.map(r => (
//   <>
//   <p>Utilities: {records.utilityCompany}</p>
//   <p>Housing: {records.housing}</p>
//   {/* per each tax credit item, render one */}
//   {(r.taxCredit.Status==='Yes') && taxCredit.map(t => (
//   <p>TC Type: {t.Type}</p>
//   ))} {/* END TAX CREDIT RENDER */}

//   {/* do the same w workshops */}
//   {(r.Workshops.Status==='Yes') && Workshops.map(w => (
//   <p>WKS Type: {w.Type}</p>
//   ))} {/* END WORKSHOPS RENDER */}
//   </>
// ))} {/* END MAIN RECORDS R RENDER */}