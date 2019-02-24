// http://apikatalogen.se/api/arbetsformedlingen-api
// http://apikatalogen.se/api/carrerjet-api
// http://apikatalogen.se/api/appjobb-api

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

fetchJobs('matchning?yrkesid=7633').then(resp => console.log(resp))