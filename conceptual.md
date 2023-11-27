### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?
Callbacks: Traditional way, but can lead to callback hell.
Promises: Provide a more structured way to handle async code.
Async/Await: Syntactic sugar built on top of Promises for even cleaner async code.
Event Emitters/Listeners: Using the EventEmitter class in Node.js for handling events asynchronously.

- What is a Promise?
A Promise in JavaScript represents the eventual completion or failure of an asynchronous operation and its resulting value. It has three states: pending, resolved (fulfilled), or rejected. Promises help in managing and organizing asynchronous code, making it more readable and maintainable.

- What are the differences between an async function and a regular function?
Async Function: Allows the use of the await keyword inside it, making it possible to pause the execution of the function until the Promise is resolved. Async functions always return a Promise.
Regular Function: Executes synchronously and returns a value immediately. It doesn't wait for asynchronous operations to complete.


- What is the difference between Node.js and Express.js?
Node.js: A runtime environment for executing JavaScript code on the server side. It provides the core functionalities, including file system access and network communication.
Express.js: A web application framework for Node.js that simplifies the process of building robust, scalable web applications. It provides a set of features and tools for building web and mobile applications.


- What is the error-first callback pattern?
In Node.js, the error-first callback pattern is a convention where the first parameter of a callback function is reserved for an error object. If an error occurs during the operation, this parameter is populated with the error information. If no error occurs, the parameter is set to null, and the succeeding parameters contain the result of the operation.


- What is middleware?
Middleware in the context of web development refers to functions that have access to the request, response, and the next middleware function in the application’s request-response cycle. They can perform various tasks such as modifying the request or response objects, ending the request-response cycle, and calling the next middleware in the stack.


- What does the `next` function do?
In the context of middleware in Express.js, the next function is used to pass control to the next middleware function in the stack. It is typically called within a middleware function to hand over the control flow to the subsequent middleware.

- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)

```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```
Answer:
s with the Provided Code:
Performance: The requests are made sequentially, causing a delay. It would be more efficient to make the requests concurrently to reduce the overall time.
Error Handling: There is no error handling for the asynchronous operations. It's essential to handle errors to prevent the entire operation from failing if one request fails.
Hardcoded URLs: URLs are hardcoded, making the function less reusable. Consider passing URLs as parameters.
Naming: The function name (getUsers) implies a synchronous operation, which could be misleading. Consider a name like fetchUserDetails.
Array Order: The returned array order doesn't match the order of requests. It could be confusing; consider reordering the array or providing explicit keys.