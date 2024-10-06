import Head from "next/head";
import Image from "next/image";
import localFont from "next/font/local";
import styles from "@/styles/Home.module.css";

import { Container, Typography, Button } from '@mui/joy';
import Link from 'next/link'; // Import Link from Next.js

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export default function Home() {
  return (
    <>
    <Head>
    <title>VisuWatt</title>
    </Head>
    <div style={{margin:'2rem'}}>

      <Typography className={styles.pageTitle} variant="h1" component="h1" gutterBottom>
        VisuWatt
      </Typography>
      <div style={{display:'flex'}}>
        <div className={styles.flexItem}>
          <Typography variant="h2" component="h2" gutterBottom sx={{ fontWeight: 'bold', fontSize: '2rem', color: '#3d9970' }}>
          Our Challenge
        </Typography>
        <Typography variant="body1" sx={{ fontSize: '1rem', marginBottom: '20px' }}>
          NextEra Energy is the world's leading sustainable energy company, and it's our mission to accelerate the industry toward a zero-carbon future.
          The next phase of our zero-carbon blueprint is to decarbonize the home, and we're challenging you to develop innovative solutions that help homeowners monitor, understand, and optimize their energy consumption.
          Your task is to make home energy use more efficient and sustainable through a mobile app, web app, IoT device, data analysis tool, or any other technology-driven solution of your choice.
          Your project should aim to be user-friendly, impactful, and scalable, demonstrating how technology can drive significant improvements in household energy efficiency.
        </Typography>
        </div>
        <div className={styles.flexItem}>
        <Typography variant="h2" component="h2" gutterBottom sx={{ fontWeight: 'bold', fontSize: '2rem', color: '#3d9970' }}>
          Our Hackathon Goal
        </Typography>
        <Typography variant="body1" sx={{ fontSize: '1rem', marginBottom: '20px' }}>
          VisuWatt <em>is a web application that seeks to educate <strong>homeowners</strong> on energy consumption and the resources available to them to further that goal</em>. Working with 10 different counties in Florida, we created datasets to provide a snapshot of our <strong>visualization goal</strong>.
          We wanted to create something scalable, aiming to integrate official datasets in the future.
          This would help homeowners take advantage of <strong>local workshops</strong>, <strong>incentives</strong>, or <strong>bring more awareness</strong> to what affects their utilities.
          We also created a survey in order to collect data from homeowners.
          In giving companies this data, they would be able to make <strong>informed decision</strong> on how best to support their commmunities.
        </Typography>
        </div>
      </div>

      <div style={{maxWidth:'fit-content',margin:'0 auto'}}>
        <Button size="lg" component='a' href="/map-new" color="success">View Map</Button>
      </div>
      {/* Link to NewPage.js */}
      {/* <Link href="/MyForm" passHref>
        <Button variant="contained" color="primary" sx={{ padding: '12px 24px', fontSize: '1.25rem' }}>
          Continue
        </Button>
      </Link> */}
    </div>
    </>
  );
}
