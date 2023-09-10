<p align="center">
  <h1 align="center"><b>AppTracker</b></h1>
</p>
<h2 align="center">
  A tool to help people track their job applications. 
</h2>
  
<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#overview">Overview</a></li>
    <li><a href="#installation--getting-started">Installation / Getting Started</a></li>
    <li><a href="#functionality--features">Functionality / Features</a></li>
    <li><a href="#tech-stack">Tech Stack</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#meet-the-contributor">Meet the Contributor</a></li>
  </ol>
</details>

## <b>Overview</b>

<p align="left">
AppTracker is an all-in-one tool to help people track the job application status and gain insight on the stats.
</p>

## <b>Installation / Getting Started</b>

Perform the following steps to install AppTracker locally:

1. Clone this AppTracker repository onto your local machine.
2. Open AppTracker repo in VS Code or your favorite IDE.
3. Run `npm install` in the root directory to install required dependencies.
4. Create a new `.env` file and add your MongoDB database URI, a JWT Secret Key (can be any string, to be used to sign JWTs) and Salt Work Factor (a number string like "20") to the `.env` file like the example below:

```
ATLAS_URI={YOUR_MONGODB_URI}
SECRET_KEY={YOUR_JWT_SECRET_KEY}
SALT_WORK_FACTOR={YOUR_SALT_FACTOR}
```

5. Run `npm run build` to build the production files.
6. Run `npm run start` to start AppTracker.
7. Visit `http://localhost:3000/` in your browser to start tracking your job applications!
   

## <b>Functionality / Features</b>

### Log In and Dashboard

After user logs in, a dashboard is presented to provide summary of application stats. In addition, another chart is avaiable to track applications submitted per week in past 3 months.
<br />
<br />
![Login Dashboard and Report](https://github.com/YiSun88/AppTracker/assets/112419406/070b7d45-0146-4c77-8635-552722b301a5)
<br />
<br />

### Application Table with Filters

User is allowed to filter the applications by company name, job position, location and status.
<br />
<br />
![Application Table Filters](https://github.com/YiSun88/AppTracker/assets/112419406/39dc304c-e0e2-46b4-8146-8a35b91328cc)
<br />
<br />

### Add or Edit applications

Users can add or edit applications with an intuitive form. A milestone diagram is also provided for each applicaiton at bottom-right of the application's detail page.
<br />
<br />
![Application CRUD](https://github.com/YiSun88/AppTracker/assets/112419406/010ebe15-f437-4914-9fad-03ab577f3a81)
<br />
<br />

### Upcomming Events and Dark Mode

Upcomming events are shown on the left for easy access, and dark mode is also provided for people preferring that style.
<br />
<br />
![Upcomming Event and Dark Mode](https://github.com/YiSun88/AppTracker/assets/112419406/5eefc2ae-6afa-4212-8d3d-b8ec6bec01de)
<br />
<br />

## <b>Tech Stack</b>

<div align="center">
	<img width="50" src="https://user-images.githubusercontent.com/25181517/183890598-19a0ac2d-e88a-4005-a8df-1ee36782fde1.png" alt="TypeScript" title="TypeScript"/>
	<img width="50" src="https://github.com/marwin1991/profile-technology-icons/assets/136815194/5f8c622c-c217-4649-b0a9-7e0ee24bd704" alt="Next.js" title="Next.js"/>
	<img width="50" src="https://user-images.githubusercontent.com/25181517/202896760-337261ed-ee92-4979-84c4-d4b829c7355d.png" alt="Tailwind CSS" title="Tailwind CSS"/>
	<img width="50" src="https://user-images.githubusercontent.com/25181517/183568594-85e280a7-0d7e-4d1a-9028-c8c2209e073c.png" alt="Node.js" title="Node.js"/>
	<img width="50" src="https://user-images.githubusercontent.com/25181517/117208740-bfb78400-adf5-11eb-97bb-09072b6bedfc.png" alt="PostgreSQL" title="PostgreSQL"/>
	<img width="50" src="https://user-images.githubusercontent.com/25181517/187955005-f4ca6f1a-e727-497b-b81b-93fb9726268e.png" alt="Jest" title="Jest"/>
</div>

## <b>Contributing</b>

As part of the open-source community, we'd like to welcome those who'd like to contribute to this product. We released Gifts AI in hopes of helping developers efficiently onboard new codebases. If you found this project useful, feel free to give it a star to help increase the visibility of this product. If you find any issues with this product, please report them with the 'Issues' tab or submit a PR.

Thank you!

  <p align="left">
      <a href="https://github.com/YiSun88/AppTracker/issues">Report Bug / Request Feature</a>
  </p>

## <b>Meet the Contributor</b>

- Yi Sun  • [LinkedIn](https://www.linkedin.com/in/yi-sun-swe/) • [Github](https://github.com/YiSun88)

