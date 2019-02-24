// http://apikatalogen.se/api/arbetsformedlingen-api
// http://apikatalogen.se/api/carrerjet-api
// http://apikatalogen.se/api/appjobb-api
const jobListOutput = document.getElementById('job-list-output')
const frontEndJobsButton = document.getElementById('front-end-jobs-button')
const jobAmountOutput = document.getElementById('job-amount-output')
const AMS_BASEURL = 'http://api.arbetsformedlingen.se/af/v0/platsannonser/'
// soklista/yrken?yrkesgruppid=2512

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
      </li>
    `
  })
  jobAmountOutput.innerHTML = jobs.length
  jobListOutput.innerHTML = listedJobs
}

// Fetch and list front end developer jobs
fetchJobs('matchning?yrkesid=7633&antalrader=10000').then(resp => listJobs(resp.matchningslista.matchningdata))

frontEndJobsButton.addEventListener('click', (event) => {
  let frontEndJobs = allJobsArray.matchningslista.matchningdata.filter(job => job.yrkesbenamning === 'Frontend-utvecklare')
  listJobs(frontEndJobs)
})