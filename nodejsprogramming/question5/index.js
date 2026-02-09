import {
  timeoutExample,
  immediateExample,
  nextTickExample,
  promiseExample
} from "./function.js";

console.log("Start");

timeoutExample();
immediateExample();
nextTickExample();
promiseExample();

console.log("End");