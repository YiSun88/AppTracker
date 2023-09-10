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

<div>
	<img width="50" src="https://user-images.githubusercontent.com/25181517/117447155-6a868a00-af3d-11eb-9cfe-245df15c9f3f.png" alt="JavaScript" title="JavaScript"/>
	<img width="50" src="https://user-images.githubusercontent.com/25181517/183897015-94a058a6-b86e-4e42-a37f-bf92061753e5.png" alt="React" title="React"/>
	<img width="50" src="https://user-images.githubusercontent.com/25181517/189716630-fe6c084c-6c66-43af-aa49-64c8aea4a5c2.png" alt="Material UI" title="Material UI"/>
	<img width="50" src="https://user-images.githubusercontent.com/25181517/192158956-48192682-23d5-4bfc-9dfb-6511ade346bc.png" alt="Sass" title="Sass"/>
	<img width="50" src="https://user-images.githubusercontent.com/25181517/183568594-85e280a7-0d7e-4d1a-9028-c8c2209e073c.png" alt="Node.js" title="Node.js"/>
	<img width="50" src="https://user-images.githubusercontent.com/25181517/183859966-a3462d8d-1bc7-4880-b353-e2cbed900ed6.png" alt="Express" title="Express"/>
	<img width="50" src="https://user-images.githubusercontent.com/25181517/182884177-d48a8579-2cd0-447a-b9a6-ffc7cb02560e.png" alt="mongoDB" title="mongoDB"/>
	<img width="50" src="https://user-images.githubusercontent.com/25181517/187955008-981340e6-b4cc-441b-80cf-7a5e94d29e7e.png" alt="webpack" title="webpack"/>
</div>

## <b>Contributing</b>

As part of the open-source community, we'd like to welcome those who'd like to contribute to this product. We released Gifts AI in hopes of helping developers efficiently onboard new codebases. If you found this project useful, feel free to give it a star to help increase the visibility of this product. If you find any issues with this product, please report them with the 'Issues' tab or submit a PR.

Thank you!

  <p align="left">
      <a href="https://github.com/YiSun88/AppTracker/issues">Report Bug / Request Feature</a>
  </p>

## <b>Meet the Contributor</b>

- Yi Sun  • [LinkedIn](https://www.linkedin.com/in/yi-sun-swe/) • [Github](https://github.com/YiSun88)

