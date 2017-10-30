module.exports.luckyNumber = (event, context, callback) => {
  const upperLimit = event.request.intent.slots.UpperLimit.value || 100;
  const number = getRandomInt(0, upperLimit);
  const response = {
    version: '1.0',
    response: {
      outputSpeech: {
        type: 'PlainText',
        text: `Your lucky number is ${number}`,
      },
      shouldEndSession: false,
    },
  };

  callback(null, response);
};
