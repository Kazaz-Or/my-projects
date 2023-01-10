var isValid = function(res) {
    res.body.should.have.property("mission", "rocket", "target", "launchDate", "success", "upcoming", "customers", "flightNumber");
  };


module.exports = {
    isValid,
};