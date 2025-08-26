async function GetGeomarData() {
    let url = "https://marlin-live.com/api/latestmeasurements"
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    let data = await response.json()
    return data
}

export { GetGeomarData }

