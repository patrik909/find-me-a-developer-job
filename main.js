// http://apikatalogen.se/api/arbetsformedlingen-api
// http://apikatalogen.se/api/carrerjet-api
// http://apikatalogen.se/api/appjobb-api
const jobListOutput = document.getElementById('job-list-output')
const AMS_BASEURL = 'http://api.arbetsformedlingen.se/af/v0/platsannonser/'
// soklista/yrken?yrkesgruppid=2512



fetchJobs = (searchURL) => {
  return (
    fetch(AMS_BASEURL + searchURL)
    .then((res) => res.json())
    .then((jobs) => {
      return jobs
    })
  )
}

listJobs = (jobs) => {
  console.log(jobs)
  listedJobs = ''
  jobs.matchningslista.matchningdata.map(job => {
    listedJobs += `
      <li>
        <p>${job.annonsrubrik}</p>
        <p>${job.arbetsplatsnamn}</p>
      </li>
    `;
  })
  jobListOutput.innerHTML = listedJobs
}

// Fetch and list front end developer jobs
fetchJobs('matchning?yrkesid=7633&antalrader=10000').then(resp => listJobs(resp))