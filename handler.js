const axios = require('axios');

module.exports.glucose = (event, context, callback) => {
    axios.get('https://www.thezlotnicks.com/api/alexa')
        .then(function (result) {
            const data = result.data; // Expect JSON of {glucose: num, trend: num, last: string}
            let trend;
            switch (data.trend) {
                case 1:
                    trend = 'the dreaded double up';
                    break;
                case 2:
                    trend = 'going up';
                    break;
                case 3:
                    trend = 'slightly up';
                    break;
                case 4:
                    trend = 'flat';
                    break;
                case 5:
                    trend = 'slightly down';
                    break;
                case 6:
                    trend = 'going down';
                    break;
                case 7:
                    trend = 'the dreaded double down';
                    break;
                default:
                    trend = 'no trend data';
            }
            let say = `Zoe is at ${data.glucose} and ${trend}.`;
            if (data.glucose >=95 && data.glucose <=150 && data.trend == 4) {
                say += 'Rock on!';
            } else if (data.glucose >= 285) {
                say+= 'Stop! Insulin time';
            } else if (data.glucose <=85) {
                say+= 'Sugar? Yes, please!';
            }

            const response = {
                version: '1.0',
                response: {
                    outputSpeech: {
                        type: 'PlainText',
                        text: say,
                    },
                    shouldEndSession: true,
                },
            };

            callback(null, response);
        });
};
