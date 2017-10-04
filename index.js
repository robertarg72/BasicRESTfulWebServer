/*
 * index.js
 * Project: Assignment 1
 * Name: Robert Argume
 * StudentID: 300949529
 * Date: Oct 03, 2017
 * Description: Simple RESTful web server for Enterprise Technologies Assignment 1
 * Curl example:
 *   - curl -d '{"product":"aa", "price":"22"}' -H "Content-Type: application/json" -X POST http://127.0.0.1:8000/sendPost
 */

var SERVER_NAME = 'product-api';
var PORT = 8000;
var HOST = '127.0.0.1';
var getRequestCounter = 0;
var postRequestCounter = 0;

// Module with help functions for logging messages in the console
var utils = require('./utils.js')();

// Module for string messages used in the server
var msg = require('./stringMessages.js');

// Restifiy framework for RESTful Service
var restify = require('restify')

  // Get a persistence engine for the users
  , productSave = require('save')('products')

  // Create the restify server
  , server = restify.createServer({ name: SERVER_NAME})

server.listen(PORT, HOST, function () {
    // Modern ES6: template literals to insert variable values in a string 
    utils.logWithColor(`Server ${server.name} listening at ${server.url}`, utils.BLUE);
    console.log('End Points:');
    console.log('  ' + server.url +'/product' + '   method: GET');
    console.log('  ' + server.url +'/product' + '   method: POST');
    console.log('  ' + server.url +'/product' + '   method: DELETE');
    utils.logWithColor( '  Waiting for requests ... ', utils.GREEN);
})

server
  // Allow the use of POST
  .use(restify.fullResponse())

  // Maps req.body to req.params so there is no switching between them
  .use(restify.bodyParser())

// Get all products in the system
server.get('/product', function (req, res, next) {
  utils.log(msg.inBoundSign, msg.sendGetTitle, msg.infoType, msg.receivedRequestMessage);
  getRequestCounter++;

  // Find every entity within the given collection
  productSave.find({}, function (error, products) {
    
    // If there are any errors, pass them to next in the correct format
    if (error) {
      utils.log(msg.outBoundSign, msg.sendGetTitle, msg.errorType, error);
      utils.showRequestCounters(getRequestCounter, postRequestCounter);
      return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)));
    }

    // Return all of the users in the system
    res.send(products);

    //console.log('<< sendGet: sending response');
    utils.log(msg.outBoundSign, msg.sendGetTitle, msg.infoType, msg.sendingResponseMessage);
  })

  // Show counters for GET and POST request
  utils.showRequestCounters(getRequestCounter, postRequestCounter);
})

// Create a new product
server.post('/product', function (req, res, next) {
  utils.log(msg.inBoundSign, msg.sendPostTitle, msg.infoType, msg.receivedRequestMessage);
  postRequestCounter++;

  // Make sure product name is defined
  if (req.params.product === undefined ) {
    utils.log(msg.outBoundSign, msg.sendPostTitle, msg.errorType, msg.productMissingError);
    utils.showRequestCounters(getRequestCounter, postRequestCounter);

    // If there are any errors, pass them to next in the correct format
    return next(new restify.InvalidArgumentError(msg.productMissingError));
  } // Make sure price is defined
  if (req.params.price === undefined ) {
    utils.log(msg.outBoundSign, msg.sendPostTitle, msg.errorType, msg.priceMissingError);
    utils.showRequestCounters(getRequestCounter, postRequestCounter);

    // If there are any errors, pass them to next in the correct format
    return next(new restify.InvalidArgumentError(msg.priceMissingError));
  }
  var newProduct = {
    _id: req.params.id,
		product: req.params.product, 
		price: req.params.price
	}

  // Create the product using the persistence engine
  productSave.create( newProduct, function (error, product) {

    // If there are any errors, pass them to next in the correct format
    if (error){
      utils.log(msg.outBoundSign, msg.sendPostTitle, msg.errorType, error);
      utils.showRequestCounters(getRequestCounter, postRequestCounter);
      return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)));
    } 

    // Send the user if no issues
    res.send(201, product);

    //console.log('<< sendPost: sending response');
    utils.log(msg.outBoundSign, msg.sendPostTitle, msg.infoType, msg.sendingResponseMessage);
  })

  // Show counters for GET and POST request
  utils.showRequestCounters(getRequestCounter, postRequestCounter);
})

// Delete user with the given id
server.del('/product', function (req, res, next) {
  utils.log(msg.inBoundSign, msg.sendDeleteTitle, msg.infoType, msg.receivedRequestMessage);

  // Delete the user with the persistence engine
  productSave.deleteMany({}, function (error, product) {

    // If there are any errors, pass them to next in the correct format
    if (error) {
      utils.log(msg.outBoundSign, msg.sendDeleteTitle, msg.errorType, error);
      return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)));
    }
    // Send a 200 OK response
    res.send();

    utils.log(msg.outBoundSign, msg.sendDeleteTitle, msg.infoType, msg.sendingResponseMessage);
  })
  
  // Show counters for GET and POST request
  utils.showRequestCounters(getRequestCounter, postRequestCounter);
})



