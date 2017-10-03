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

var inBoundSign = ">>";
var outBoundSign = "<<";

var sendGetTitle = 'sendGet';
var sendPostTitle = 'sendPost'; 
var sendDeleteTitle = 'sendDelete';

var receivedRequestMessage = 'received request';
var sendingResponseMessage = 'sending response';

var infoType = 'INFO';
var errorType = 'ERROR';

var productMissingError = 'product name must be supplied';
var priceMissingError = 'price must be supplied';

// Module with help functions for showing messages in the console
var utils = require('./utils.js')();

var restify = require('restify')

  // Get a persistence engine for the users
  , productSave = require('save')('products')

  // Create the restify server
  , server = restify.createServer({ name: SERVER_NAME})

  server.listen(PORT, HOST, function () {
  console.log('Server %s listening at %s', server.name, server.url)
  console.log('End Points:')
  console.log('  ' + server.url +'/sendGet' + '   method: GET')
  console.log('  ' + server.url +'/sendPost'+ '   method: POST')  
  console.log('  ' + server.url +'/sendDelete' + ' method: DELETE')
})

server
  // Allow the use of POST
  .use(restify.fullResponse())

  // Maps req.body to req.params so there is no switching between them
  .use(restify.bodyParser())

// Get all products in the system
server.get('/sendGet', function (req, res, next) {
  utils.log(inBoundSign, sendGetTitle, infoType, receivedRequestMessage);
  getRequestCounter++;

  // Find every entity within the given collection
  productSave.find({}, function (error, products) {
    
    // If there are any errors, pass them to next in the correct format
    if (error) {
      utils.log(outBoundSign, sendGetTitle, errorType, error);
      utils.showRequestCounters(getRequestCounter, postRequestCounter);
      return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)));
    }

    // Return all of the users in the system
    res.send(products);

    //console.log('<< sendGet: sending response');
    utils.log(outBoundSign, sendGetTitle, infoType, sendingResponseMessage);
  })

  // Show counters for GET and POST request
  utils.showRequestCounters(getRequestCounter, postRequestCounter);
})

// Create a new product
server.post('/sendPost', function (req, res, next) {
  utils.log(inBoundSign, sendPostTitle, infoType, receivedRequestMessage);
  postRequestCounter++;

  // Make sure product name is defined
  if (req.params.product === undefined ) {
    utils.log(outBoundSign, sendPostTitle, errorType, productMissingError);
    utils.showRequestCounters(getRequestCounter, postRequestCounter);

    // If there are any errors, pass them to next in the correct format
    return next(new restify.InvalidArgumentError(productMissingError));
  } // Make sure price is defined
  if (req.params.price === undefined ) {
    utils.log(outBoundSign, sendPostTitle, errorType, priceMissingError);
    utils.showRequestCounters(getRequestCounter, postRequestCounter);

    // If there are any errors, pass them to next in the correct format
    return next(new restify.InvalidArgumentError(priceMissingError));
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
      utils.log(outBoundSign, sendPostTitle, errorType, error);
      utils.showRequestCounters(getRequestCounter, postRequestCounter);
      return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)));
    } 

    // Send the user if no issues
    res.send(201, product);

    //console.log('<< sendPost: sending response');
    utils.log(outBoundSign, sendPostTitle, infoType, sendingResponseMessage);
  })

  // Show counters for GET and POST request
  utils.showRequestCounters(getRequestCounter, postRequestCounter);
})

// Delete user with the given id
server.del('/sendDelete', function (req, res, next) {
  utils.log(inBoundSign, sendDeleteTitle, infoType, receivedRequestMessage);

  // Delete the user with the persistence engine
  productSave.deleteMany({}, function (error, product) {

    // If there are any errors, pass them to next in the correct format
    if (error) {
      utils.log(outBoundSign, sendDeleteTitle, errorType, error);
      return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)));
    }
    // Send a 200 OK response
    res.send();

    utils.log(outBoundSign, sendDeleteTitle, infoType, sendingResponseMessage);
  })
  
  // Show counters for GET and POST request
  utils.showRequestCounters(getRequestCounter, postRequestCounter);
})



