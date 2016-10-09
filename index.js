var config = require('config');
var aws = require('aws-sdk');
aws.config.region = 'us-west-2';
var ses = new aws.SES();

exports.handler = (event, context, callback) => {
    var carNumber = 2;
    var month = new Date().getMonth()+1;
    var today = new Date().getDate();
    var isCarNumberState = (carNumber%2 === 0) ? "EVEN" : "ODD";
    var isDateState = (today%2 === 0) ? "EVEN" : "ODD";
    var isAbleToGoMainStreet = (isCarNumberState === "EVEN") ? (
        // even context
        (isDateState === "EVEN") ? true : false
    ) : (
        // odd context
        (isDateState === "ODD") ? false : true
    );

    var gatheringTime = (isAbleToGoMainStreet) ? "9:00" : "9:30";
    var gatheringState = (isAbleToGoMainStreet) ? "" : "not";
    var msg = "Hi. Today's "+ isDateState + " day and your car number is " + isCarNumberState + ". \n" +
      "You can" + gatheringState + " go through main street. \n" +
      "You should gather in " + gatheringTime;

    var params = {
        Destination: {
            ToAddresses: config.get("targetAddressess")
        },
        Message: {
            Subject: { Data: "["+month+"/"+today+"] trafic news", Charset: 'UTF-8' },
            Body: {
              Text: { Data: msg, Charset: 'UTF-8' }
            }
        },
        Source: config.get("fromAddress"),
        ReplyToAddresses: [
            config.get("fromName") + '<' + config.get("fromAddress") + '>'
        ]
    };
    if(event.env === "TEST") {
      console.log(params);
      console.log(gatheringTime);
      console.log(msg);
      callback();
    }

    ses.sendEmail(params, function (err, data) {
        if (err) {
            console.log(err, err.stack);
            context.fail('Internal Error: The email could not be sent.');
        } else {
            console.log(data);           // successful response
            context.succeed('The email was successfully sent.');
        }
    });

};
