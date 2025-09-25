const prompt = require("prompt-sync")()

function main() {
    console.log("------Calculadora------");

    let num1 = Number(prompt("Ingrese el primer número:"));
    let operador = (prompt("Ingrese tipo de operador [+] [-]  [/]  [*]"));
    let num2 = Number(prompt("Ingrese el segundo número:"));
    let resultado;

//let variables

switch(operador){
    case "+":
        resultado = num1 + num2;
        break;
    case "-":
        resultado = num1 - num2;
        break;
    case "/":
        resultado = num1 / num2;
        if (num2 === 0){
        resultado = "error";
        } else {
        resultado = num1 / num2;
        }
        break;

    case "*":
        resultado = num1 * num2;
        break;

        default:
            resultado = "operador invalido";
        
}

console.log("Resultado: " + resultado);

}
main();