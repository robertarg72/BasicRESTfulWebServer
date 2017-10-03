var SERVER_NAME = 'product-api'
var PORT = 8000;
var HOST = '127.0.0.1';


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
  console.log('>> sendGet: received request');

  // Find every entity within the given collection
  productSave.find({}, function (error, products) {
    
    // Return all of the users in the system
    res.send(products)

    console.log('<< sendGet: sending response');
  })
})

// Create a new product
server.post('/sendPost', function (req, res, next) {
  console.log('>> sendPost: received request');

  // Make sure product name is defined
  if (req.params.product === undefined ) {
    // If there are any errors, pass them to next in the correct format
    return next(new restify.InvalidArgumentError('product name must be supplied'))
  } // Make sure price is defined
  if (req.params.price === undefined ) {
    // If there are any errors, pass them to next in the correct format
    return next(new restify.InvalidArgumentError('price must be supplied'))
  }
  var newProduct = {
    _id: req.params.id,
		product: req.params.product, 
		price: req.params.price
	}

  // Create the product using the persistence engine
  productSave.create( newProduct, function (error, product) {

    // If there are any errors, pass them to next in the correct format
    if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))

    // Send the user if no issues
    res.send(201, product)

    console.log('<< sendPost: sending response');
  })
})

// Delete user with the given id
server.del('/sendDelete', function (req, res, next) {
  console.log('>> sendDelete: received request');

  // Delete the user with the persistence engine
  productSave.deleteMany({}, function (error, product) {

    // If there are any errors, pass them to next in the correct format
    if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))

    // Send a 200 OK response
    res.send()

    console.log('<< sendDelete: sending response');
  })
})


