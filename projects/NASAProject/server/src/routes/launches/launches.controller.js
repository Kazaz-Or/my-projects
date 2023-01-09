const { getAllLaunches,
        addNewLaunch,
     } = require('../../models/launches.model');

function httpGetAllLaunches(req, res) {
    return res.status(200).json(getAllLaunches());
};


function httpAddNewLaunch(req, res) {
    const launch = req.body;
    if (!launch.missing || !launch.rocket || !launch.launchDate || !launch.destination) {
        return res.status(400).json({ error: 'missing required launch property' });
    }

    launch.launchDate = new Date(launch.launchDate);
    if (isNaN(launch.launchData)) {
        return res.status(400).json({ error: 'Invalid launch date' });
    }
    addNewLaunch(launch);
    return res.status(201).json(launch);
};

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
};
