import { Map, Marker, Overlay } from "pigeon-maps"
import Image from 'next/image'

export default function MapNew() {
    return (
        <Map height={700} defaultCenter={[27.9659, -82.7959]} defaultZoom={7} zoom={7}>
        {/* Orange County */}
        <Marker width={50} anchor={[28.5384, -81.3789]} color={'red'}/>

        {/* Broward */}
        <Marker width={50} anchor={[26.1901, -80.3659]} color={'red'} />

        {/* Palm Beach */}
        <Marker width={50} anchor={[26.6515, -80.2767]} color={'red'}/>

        {/* Hillsborough */}
        <Marker width={50} anchor={[27.9904, -82.3018]} color={'red'} />

        {/* Miami - Dade */}
        <Marker width={50} anchor={[25.7617, -80.1918]} color={'red'}/>

        {/* Franklin */}
        <Marker width={50} anchor={[29.8503, -84.8723]} color={'blue'} />

        {/* Lafayette */}
        <Marker width={50} anchor={[29.9844, -83.1766]} color={'blue'}/>

        {/* Union */}
        <Marker width={50} anchor={[30.0454, -82.3624]} color={'blue'}/>

        {/* Monroe */}
        <Marker width={50} anchor={[25.2974, -81.0755]} color={'blue'} />

        {/* Liberty */}
        <Marker width={50} anchor={[30.1508, -84.8568]} color={'blue'} />

        {/* Legend */}
        <Overlay anchor={[26.2333, -86.8833]} offset={[0, 0]}>
        <Image src="/Legend.jpeg" width={240} height={158} alt='HI' />
        </Overlay>

      </Map>
    )
}