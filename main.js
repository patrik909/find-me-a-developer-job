// http://apikatalogen.se/api/arbetsformedlingen-api
const AMS_BASEURL = 'http://api.arbetsformedlingen.se/af/v0/platsannonser/'
// http://apikatalogen.se/api/carrerjet-api
// http://apikatalogen.se/api/appjobb-api

const jobListOutput = document.getElementById('job-list-output')
const allJobsButton = document.getElementById('all-jobs-button')
const frontEndJobsButton = document.getElementById('front-end-jobs-button')
const stockholmLocationButton = document.getElementById('stockholm-location-button')
const jobAmountOutput = document.getElementById('job-amount-output')
// soklista/yrken?yrkesgruppid=2512
//matchning?nyckelord="bagare"

// Användbarhetsdesigner 6528
// Applikationsutvecklare/Apputvecklare 7576
// Interaktionsdesigner 7575
// Systemutvecklare/Programmerare 2419

fetch(AMS_BASEURL + 'soklista/yrken?yrkesgruppid=2512')
.then((res) => res.json())
.then((jobs) => {
  console.log(jobs)
})

allJobsArray = []

fetchJobs = (searchURL) => {
  return (
    fetch(AMS_BASEURL + searchURL)
    .then((res) => res.json())
    .then((jobs) => {
      allJobsArray = jobs
      return jobs
    })
  )
}

listJobs = (jobs) => {
  listedJobs = ''
  jobs.map(job => {
    listedJobs += `
      <li>
        <p>${job.annonsrubrik}</p>
        <p>${job.arbetsplatsnamn}</p>
        <p>${job.anstallningstyp}</p>
        <p>${job.kommunnamn}</p>
        <p>${job.publiceraddatum}</p>
        <p>${job.sista_ansokningsdag}</p>
        <p>${job.yrkesbenamning}</p>
      </li>
    `
    // console.log(job)
  })
  jobAmountOutput.innerHTML = jobs.length
  jobListOutput.innerHTML = listedJobs
}

// Fetch and list front end developer jobs
fetchJobs('matchning?yrkesid=7633&antalrader=10000')
.then(resp => listJobs(resp.matchningslista.matchningdata))

allJobsButton.addEventListener('click', () => {
  listJobs(allJobsArray.matchningslista.matchningdata)
})

frontEndJobsButton.addEventListener('click', (event) => {
  let frontEndJobs = allJobsArray.matchningslista.matchningdata.filter(job => job.yrkesbenamning === 'Frontend-utvecklare')
  listJobs(frontEndJobs)
})

stockholmLocationButton.addEventListener('click', (event) => {
  let stockholmJobs = allJobsArray.matchningslista.matchningdata.filter(job => job.kommunnamn === 'Stockholm')
  let filtredStockholmJobs = stockholmJobs.filter(job => job.yrkesbenamning === 'Frontend-utvecklare')
  listJobs(filtredStockholmJobs)
})