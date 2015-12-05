var mongo = require('mongodb'),
	Server = mongo.Server,
    Db = mongo.Db,
    BSON = require('bson').BSONPure;

// This is the IP of the mongoDB database. It can easily be changed to point to your server.
var server = new Server('localhost', 27017, {
    auto_reconnect: true
});

//Create a new database called exampleDB (or get the existing one).
db = new Db('exampleDB', server);

db.open(function(err, db) {
    if (!err) {
        console.log("Connected to 'exampleDB' database");
        db.collection('example', {
            strict: true
        }, function(err, collection) {
            if (err) {
                console.log("The 'example' collection doesn't exist. Creating it with sample data...");
                // populateDB(); //uncomment that if you want some sample data to prepopulate your DB
            }
        });
    }
});

exports.getStuff = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving stuff: ' + id);
    db.collection('example', function(err, collection) {
        if (err) {
            throw err; //If something goes wrong just throw an error
        } else {
            collection.findOne({
                '_id': new BSON.ObjectID(id)
            }, function(err, item) {
                if (err !== null) {
                    res.status(500).send(err); // If an error occured send a status 500 to the front-end
                }

                if (item === null) {
                    res.status(404).send('Not Found!'); //Let the user know when the recipe isn't found
                } else {
                    res.send(item); //If everything went well then send back the response.
                }
            });
        }
    });
};

exports.postStuff = function(req, res) {
    var sample = req.body;
    console.log('Adding example: ' + JSON.stringify(sample));
    db.collection('example', function(err, collection) {
        if (err) {
            throw err;
        } else {
            collection.insert(sample, {
                safe: true
            }, function(err, result) {
                if (err) {
                    res.send({
                        'error': 'An error has occurred'
                    });
                } else {
                    console.log('Success: ' + JSON.stringify(result[0]));
                    res.send(result[0]);
                }
            });
        }
    });
}

exports.updateStuff = function(req, res) {
    var id = req.params.id;
    var sample = req.body;
    console.log('Updating sample: ' + id);
    console.log(JSON.stringify(sample));
    db.collection('example', function(err, collection) {
        collection.update({
            '_id': new BSON.ObjectID(id)
        }, sample, {
            safe: true
        }, function(err, result) {
            if (err) {
                console.log('Error updating sample: ' + err);
                res.send({
                    'error': 'An error has occurred'
                });
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(sample);
            }
        });
    });
}

exports.deleteStuff = function(req, res) {
    var id = req.params.id;
    console.log('Deleting sample: ' + id);
    db.collection('example', function(err, collection) {
        collection.remove({
            '_id': new BSON.ObjectID(id)
        }, {
            safe: true
        }, function(err, result) {
            if (err) {
                res.send({
                    'error': 'An error has occurred - ' + err
                });
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(result);
            }
        });
    });
}

/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
var populateDB = function() {

    var sampleData = [{
        name: "Lemon Chicken",
        cookingTime: "30 minutes",
        ingredients: [{
            'ingredient': 'Chicken',
            'quantity': '2'
        }, {
            'ingredient': 'Lemon',
            'quantity': '1'
        }, {
            'ingredient': 'Thyme',
            'quantity': '1 tbsp'
        }],
        picture: "lemonChicken.jpg"
    }, {
        name: "Beef Stroganoff",
        cookingTime: "30 minutes",
        ingredients: [{
            'ingredient': 'Beef',
            'quantity': '0.5 kg'
        }, {
            'ingredient': 'Mustard',
            'quantity': '2 tbsp'
        }, {
            'ingredient': 'Mushrooms',
            'quantity': '10'
        }],
        picture: "beefStroganoff.jpg"
    }];

    db.collection('example', function(err, collection) {
        collection.insert(sampleData, {
            safe: true
        }, function(err, result) {});
    });

};