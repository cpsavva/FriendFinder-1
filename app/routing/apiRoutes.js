const path = require('path');
const friendData = require('../data/friends');

module.exports = function(app) {
    app.get('/api/friends', (req, res) => {
        res.json(friendData);
    });

    app.post('/api/friends', (req, res) => {
        const currentUserScores = req.body;
        // computeScores(currentUserScores, friendData, (suggestedProfile) => {
        //   console.log(suggestedProfile)
        //   res.send(suggestedProfile);
        // });
        res.send(currentUserScores);
        console.log("Backend: ", currentUserScores);
/* ERROR
  Backend:
  { name: 'Paul',
    photo: 'http://placehold.it/400x400',
    'scores[]': [ '1', '1', '1', '1', '1', '1', '1', '2', '1', '2' ]
  }
  */

    });

}

function computeScores(userScores, friends, cb) {
    let bestMatch;
    let bestDiff = 100;

    friends.forEach((friend, idx) => {
        let compatabilityScore = friend.scores.map((score) => parseInt(score)).reduce((accumulator, value, index) => {
            return accumulator + Math.abs(value - userScores[index]);
        });

        if (compatabilityScore < bestDiff) {
            bestDiff = Math.min(compatabilityScore, bestDiff);
            bestMatch = friends[idx];
        }
    });
    console.log(`bestMatch ${bestMatch}`)
    cb(bestMatch);
}
