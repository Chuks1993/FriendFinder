

var datesData = require("../data/datesData");



// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {

  app.get("/api/dates", function(req, res) {
    res.json(datesData);
  });




  app.post("/api/dates", function(req, res) {
    
 // newDate is the user that filled out the survey
      var newDate = req.body;
     

  

      var bestMatch = [];

      for (var i = 0; i < datesData.length; i++) {
        if (datesData[i].tier === parseInt(newDate.tier)) {
          console.log(datesData[i]);
          bestMatch.push(datesData[i]);
        } 
      }

    

      
    
      datesData.push(newDate);

      // return the best match friend
      res.json(bestMatch);
  });

    
  

 
  app.post("/api/clear", function() {
    // Empty out the arrays of data
    datesData = [];
    

    console.log(datesData);
  });
};
