var connection =  new require('./kafka/Connection');
const mongoose = require('mongoose');

//DB Config
// const db = "mongodb+srv://root:9712412002@canvas-ipu73.mongodb.net/test?retryWrites=true";

const db = require('./config/keys').mongoURI

mongoose.Promise = global.Promise;

//Connect to Mongo Db
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log('Mongo Db Connected in Kafka'))
    .catch((err) => console.log(err))

//topics files
//var signin = require('./services/signin.js');
var Users = require('./services/users.js');



function handleTopicRequest(topic_name,fname){
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name +" ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        
        fname.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
        
    });
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request

handleTopicRequest("users",Users)
