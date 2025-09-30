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

async function GetGeomarDataNew() {
    let url = "https://marlin-live.com/api/latestmeasurementsNEW"
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    let data = await response.json()
    return data
}


async function GetGeomarDataTimeRange(id, timeRange) {
    let url = `https://marlin-live.com/api/location/${id}/measurementsWithinTimeRange?timeRange=${timeRange}`
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    let data = await response.json()
    return data
}

export { GetGeomarData, GetGeomarDataNew, GetGeomarDataTimeRange }

