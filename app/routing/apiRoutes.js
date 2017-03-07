const path = require('path');
const friendData = require('../data/friends');

module.exports = function(app) {
    app.get('/api/friends', (req, res) => {
        res.json(friendData);
    });

    app.post('/api/friends', (req, res) => {
        const currentUserScores = req.body["scores[]"];

        computeScores(currentUserScores, friendData, (suggestedProfile) => {
            res.json(suggestedProfile);
        });
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
    cb(bestMatch);
}
