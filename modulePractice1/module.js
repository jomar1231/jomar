
import { add, multiply, message } from "./childModule.js";

const result1 = add(5, 3);
const result2 = multiply(4, 6);

document.querySelector('.input').innerHTML = `
  <p>${message}</p>
  <p>Add: 5 + 3 = ${result1}</p>
  <p>Multiply: 4 * 6 = ${result2}</p>
`;
