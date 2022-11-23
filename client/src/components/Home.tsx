import React from 'react';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  paragraph: {
    marginBottom: theme.spacing(2),
  },
  textHeader: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    fontSize: '1.75rem',
    fontWeight: 'bold',
  },
  subHeader: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(0.5),
    fontSize: '1.25rem',
    fontWeight: 'bold',
  },
  subTitle: {
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5),
    fontWeight: 'bold',
  },
}));

const Home = () => {
  const classes = useStyles();

  return (
    <Container style={{marginTop: '24px', marginBottom: '24px'}}>
      <Typography variant="body1">
        This is my personal home page. Here you can find basic information about me. And possibly some other nice services and features in near future!
      </Typography>
      <Typography variant="h5" className={classes.textHeader}>
        Profile
      </Typography>      
      <Typography variant="body2">
        I am an IT professional with experience of wide variety of roles. I love learning, problem solving and challenging myself. 
        On my freetime, I spend time with my family, go biking and occasionally geocaching (been doing that since 2008 and have found more than 2k geocaches!). While indoors, I like to play with Rubik&apos;s cube. My average solve times (for traditional 3x3) are somewhere around 30-45s.
      </Typography>
      <Typography variant="h5" className={classes.textHeader}>
        Contact
      </Typography>      
      <Typography variant="body2">
        jari.j.reponen@gmail.com
      </Typography>
      <Link href="http://www.linkedin.com/in/jari-reponen" underline="none" rel="noreferrer" target="_blank">
        LinkedIn
      </Link>
      <Typography variant="h5" className={classes.textHeader}>
        Technologies
      </Typography>      
      <Typography variant="body2">
        React • Node • TypeScript • MongoDB • SQL • Docker
      </Typography>
      <Typography variant="h5" className={classes.textHeader}>
        Work experience
      </Typography>
      <Typography variant="h6" className={classes.subHeader}>
        QPR Software (Senior Software Engineer, Software Engineer, Consultant)
      </Typography>
      <Typography variant="subtitle1" className={classes.subTitle}>11/2016 - 1/2023</Typography>
      <Typography variant="body2" className={classes.paragraph}>
        I started at QPR as a Process Mining consultant. My role included writing ETL-scripts with SQL to extract data from source system (for example, SAP) and create a process model based on that data. I analyzed the process models and made business findings. My tasks involved also web development with HTML/CSS/jQuery. I developed dashboards related to performance management.
      </Typography>
      <Typography variant="body2" className={classes.paragraph}>
        From August 2019, I have worked in product development department to develop a new UI-platform and later on, creating customer solutions on that platform. 
        I worked as a developer in fullstack scrum team (React/Node/TypeScript/MongoDB). We used Azure DevOps, GIT and Docker to manage our project and to deploy to cloud environments. 
        In spring 2021 I got a Scrum Master role in addition to my earlier developer role and later, on January 2022 I was promoted to Product Owner (I still kept my developer role as well). 
      </Typography>
      <Typography variant="h6" className={classes.subHeader}>
        Liikennevirasto (Project Controller, System Administrator, Project Assistant)
      </Typography>
      <Typography variant="subtitle1" className={classes.subTitle}>5/2010 - 10/2016</Typography>
      <Typography variant="body2" className={classes.paragraph}>
        I did user acceptance testing of Project Management and financial system and was instructor in end-user classroom training session and developed content for eLearning tool.
      </Typography>
      <Typography variant="body2" className={classes.paragraph}>
        After the go-live of the system (4/2011), I was promoted to system administrator of it. I made change requests and ordered other services from application, hosting and integration platform providers.
      </Typography>
      <Typography variant="body2" className={classes.paragraph}>
        As I had studied Industrial Economics, I worked also as a project controller on route infrastructure projects, in addition my system administrator role. As project controller, I supported project managers in financial management of the project and ran customized Cognos reports from financial data.
      </Typography>
      <Typography variant="h5" className={classes.textHeader}>
        Education
      </Typography>
      <Typography variant="h6" className={classes.subHeader}>Master of Science (Technology, Industrial Engineering and Management)</Typography>
      <Typography variant="body2">
        Major: Industrial Economy
      </Typography>
      <Typography variant="body2">
        Minor: Information Technology
      </Typography>
      <Typography variant="body2">
        Lappeenranta University of Technology, 2011
      </Typography>
      <Typography variant="h6" className={classes.subHeader}>Bachelor of Science (Technology, Industrial Engineering and Management)</Typography>
      <Typography variant="body2">
        Major: Industrial Economy
      </Typography>
      <Typography variant="body2">
        Minor: Information Technology
      </Typography>
      <Typography variant="body2">
        Lappeenranta University of Technology, 2010
      </Typography>
      <Typography variant="h6" className={classes.subHeader}>
        Other education and certificates
      </Typography>
      <Typography variant="subtitle1" className={classes.subTitle}>Studies in University of Helsinki (Open University)</Typography>
      <Typography variant="body2">
        Computer fundamentals I, (2 ECTS, 2/2020), DevOps with Docker (3 ECTS, 1/2020), FullStack Web Development (8 ECTS, 12/2019), Introduction to Databases (5 ECTS, 3/2019), Introduction to Programming (5 ECTS 11/2018)
      </Typography>
      <Typography variant="subtitle1" className={classes.subTitle}>Coursera</Typography>
      <Typography variant="body2">Process Mining: Data science (9/2017), HTML, CSS and JavaScript for Web Developers (3/2017)</Typography>
      <Typography variant="subtitle1" className={classes.subTitle}>Scrum.org</Typography>
      <Typography variant="body2">Professional SCRUM Product Owner (PSPO I) -certificate (2013)</Typography>
      <Typography variant="subtitle1" className={classes.subTitle}>Scrum Alliance</Typography>
      <Typography variant="body2">Certified Scrum Master (2021)</Typography>
    </Container>
  );
};

export default Home;
