import { Map, Marker, Overlay } from "pigeon-maps"
import Image from 'next/image'
import { useState } from "react"
import { Button } from "@mui/joy";

export default function MapNew() {
    const [bubble, setBubble] = useState({ visible: false, position: [0,0], text: ''});

    const handleMarkerClick = (position, text) => {
        if (bubble.visible && bubble.position[0] === position[0]) {
            // If the same marker is clicked again, hide the bubble
            setBubble({ visible: false, position: [0, 0], text: '' });
        } else {
            // Otherwise, show the bubble with the new position and text
            setBubble({ visible: true, position, text });
        }
    }

    return (
        <Map height={700} defaultCenter={[27.9659, -82.7959]} defaultZoom={7} zoom={7}>
        {/* Orange County */}
        <Marker width={50} anchor={[28.5384, -81.3789]} color={'red'} onClick={() => handleMarkerClick([28.5384, -81.3789], "Orange County")}/>

        {/* Broward */}
        <Marker width={50} anchor={[26.1901, -80.3659]} color={'red'} onClick={() => handleMarkerClick([26.1901, -80.3659], "Broward County")}/>

        {/* Palm Beach */}
        <Marker width={50} anchor={[26.6515, -80.2767]} color={'red'} onClick={() => handleMarkerClick([26.6515, -80.2767], "Palm Beach County")}/>

        {/* Hillsborough */}
        <Marker width={50} anchor={[27.9904, -82.3018]} color={'red'} onClick={() => handleMarkerClick([27.9904, -82.3018], "Hillsborough County")}/>

        {/* Miami - Dade */}
        <Marker width={50} anchor={[25.7617, -80.1918]} color={'red'} onClick={() => handleMarkerClick([25.7617, -80.1918], "Miami-Dade County")}/>

        {/* Franklin */}
        <Marker width={50} anchor={[29.8503, -84.8723]} color={'blue'} onClick={() => handleMarkerClick([29.8503, -84.8723], "Franklin County")}/>

        {/* Lafayette */}
        <Marker width={50} anchor={[29.9844, -83.1766]} color={'blue'} onClick={() => handleMarkerClick([29.9844, -83.1766], "Lafayette County")}/>

        {/* Union */}
        <Marker width={50} anchor={[30.0454, -82.3624]} color={'blue'} onClick={() => handleMarkerClick([30.0454, -82.3624], "Union County")}/>

        {/* Monroe */}
        <Marker width={50} anchor={[25.2974, -81.0755]} color={'blue'} onClick={() => handleMarkerClick([25.2974, -81.0755], "Monroe County")}/>

        {/* Liberty */}
        <Marker width={50} anchor={[30.1508, -84.8568]} color={'blue'} onClick={() => handleMarkerClick([30.1508, -84.8568], "Liberty County")}/>

        {/* Legend */}
        <Overlay anchor={[26.2333, -86.8833]} offset={[0, 0]}>
        <Image src="/Legend.jpeg" width={240} height={158} alt='HI' />
        </Overlay>

        {/* Survey Button */}
            <Overlay anchor={[27.0, -86.8833]} offset={[0, 0]}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => console.log("Survey Button Clicked")}
                    sx={{
                        backgroundColor: 'green',
                    }}
                >
                    Take Survey
                </Button>
            </Overlay>

        {/* Text Bubble */}
        {bubble.visible && (
                    <Overlay anchor={bubble.position} offset={[0, 0]}>
                        <div style={bubbleStyle}>
                            {bubble.text}
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