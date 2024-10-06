import { Map, Marker, Overlay } from "pigeon-maps"
import Image from 'next/image'
import { useState } from "react"
import { Button } from "@mui/joy";
import {collections} from '../lib/collection-names'

export default function MapNew() {
  const [bubble, setBubble] = useState({ visible: false, position: [0, 0], text: '' });
  const [records, setRecords] = useState([])

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

  function dataHelper(data) { //relying on state in getData does not work because of state's delayed updating
    console.log(`helper data print: ${data[0]}`)
    setRecords(data[0])
  }

  const getRecords = async (bubbleName) => {
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
          variant="solid"
          color="success"
          onClick={() => console.log("Survey Button Clicked")}
        >
          Take Survey
        </Button>
      </Overlay>

      {/* Text Bubble */}
      {bubble.visible && (
        <Overlay anchor={bubble.position} offset={[0, 0]}>
          <div style={bubbleStyle}>
            <p><strong>{bubble.text}</strong></p>    
            <p>Utilities: {records.utilityCompany}</p>
            {/* <p>Housing: {records.housing}</p> */}
            <p>Tax Incentives: {records.taxCredit.Status=='Yes' && (records.taxCredit.Type[0])}</p>
            <p>Workshops Offered: {records.Workshops.Status=='Yes' && (records.Workshops.Type[0])}</p>

          </div>
        </Overlay>
      )}
    </Map>
  );
}

const bubbleStyle = {
  backgroundColor: 'white',
  padding: '5px 10px',
  borderRadius: '5px',
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