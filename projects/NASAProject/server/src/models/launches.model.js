const launches = require('./launches.mongo')

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

saveLaunch(launch);


function existsLaunchWithId(launchId) {
    return launches.has(launchId);
};


async function getAllLaunches() {
    return await launches
    .find({}, { '_id': 0, '__v': 0 });
};

async function saveLaunch(launch) {
    await launches.updateOne({
        flightNumber: launch.flightNumber,
    }, launch, {
        upsert: true,
    });
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
