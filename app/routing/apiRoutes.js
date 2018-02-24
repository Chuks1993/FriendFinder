// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friendsData = require("../data/friendsData");



// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function(req, res) {
    res.json(friendsData);
  });



  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the friendsdata array)
  // ---------------------------------------------------------------------------

  app.post("/api/friends", function(req, res) {
    
 // newFriend is the user that filled out the survey
      var newFriend = req.body;

      // compute best match from scores
      var bestMatch = {};

      for(var i = 0; i < newFriend.scores.length; i++) {
       
          newFriend.scores[i] = parseInt(newFriend.scores[i]);
        
      }
      // compare the scores of newFriend with the scores of each friend in the database and find the friend with the smallest difference when each set of scores is compared

      var bestMatchIndex = 0;
      //greatest score difference for a question is 4, therefore greatest difference is 4 times # of questions in survey
      var bestMatchDifference = 40;

      for(var i = 0; i < friendsData.length; i++) {
        var totalDifference = 0;

        for(var index = 0; index < friendsData[i].scores.length; index++) {
          var differenceOneScore = Math.abs(friendsData[i].scores[index] - newFriend.scores[index]);
          totalDifference += differenceOneScore;
        }

        // if the totalDifference in scores is less than the best match so far
        // save that index and difference
        if (totalDifference < bestMatchDifference) {
          bestMatchIndex = i;
          bestMatchDifference = totalDifference;
        }
      }

      // the best match index is used to get the best match data from the friends index
      bestMatch = friendsData[bestMatchIndex];

      console.log(bestMatch);
      // Put new friend from survey in "database" array
      friendsData.push(newFriend);

      // return the best match friend
      res.json(bestMatch);
  });

    
  

 
  app.post("/api/clear", function() {
    // Empty out the arrays of data
    friendsData = [];
    

    console.log(friendsData);
  });
};
