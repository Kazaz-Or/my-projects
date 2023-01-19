//const launches = require('./launches.mongo')

const launches = new Map();

let latestFlightNumber = 100;


const launch = {
    flightNumber: 100,
    mission: 'Kepler Exloration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('November 29, 2023'),
    target: 'Kepler-442 b',
    customers: ['KAZI', 'NASA'],
    upcoming: true,
    success: true,
};

launches.set(launch.flightNumber, launch);

function existsLaunchWithId(launchId) {
    return launches.has(launchId);
};


function getAllLaunches() {
    return Array.from(launches.values());
};

function addNewLaunch(launch) {
    latestFlightNumber ++;
    launches.set(
        latestFlightNumber,
        Object.assign(launch, {
            success: true,
            upcoming: true,
            customers: ['Kazi.io', 'NASA'],
            flightNumber: latestFlightNumber,
        } )
    );
};

function abortLaunchById(launchId) {
    const aborted = launches.get(launchId);
    aborted.upcoming = false;
    aborted.success = false;
    return aborted;
};


module.exports = {
    existsLaunchWithId,
    getAllLaunches,
    addNewLaunch,
    abortLaunchById,
};
