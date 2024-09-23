const fs = require('fs')
const fuelData = JSON.parse(fs.readFileSync('./data/response.json'));

const calculateFuelEvents = (req, res) => {
    const fuelEvents = []
    let totalFuelConsumed = 0;

    let previousFuelLevel = fuelData[0].fuel_level;
    let startTime = fuelData[0].timestamp;

    for (let i = 1; i < fuelData.length; i++) {
        const current = fuelData[i];
        const fuelDifference = current.fuel_level - previousFuelLevel;

        if (fuelDifference > 0) {
            fuelEvents.push({
                start_time: startTime,
                end_time: current.timestamp,
                fuelAdded: fuelDifference,
                location: current.location,
            })
        }
        if (fuelDifference < 0) {
            totalFuelConsumed += Math.abs(fuelDifference);
        }

        previousFuelLevel = current.fuel_level;
        startTime = current.timestamp;
    }
    res.json({
        fuelEvents,
        totalFuelConsumed,
    })
}
const fuel = (req, res) => {
    const fuel = fuelData;
    res.json({fuel})
}
module.exports = {
    calculateFuelEvents,
    fuel
}