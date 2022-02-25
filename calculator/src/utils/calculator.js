const readline = require('readline')
const util = require('util')
const math = require('./math')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

// rl.question returns a callback by default, we are converting it to a promise
const question = util.promisify(rl.question).bind(rl)

const calculator = async () => {
    const allowedOperations = ['+', '-', '*', '/', '%']
    let another = true

    while(another) {
        let operation = await question('Select the operation ( + - * / % ): ')
        
        // If the entered operation si not valid we go back to the while condition
        if(!allowedOperations.includes(operation)) {
            console.log('Please enter a valid operation')
            continue
        }

        let firstNum = parseInt(await question('Enter first number: '))
        let secondNum = parseInt(await question('Enter first number: '))
        
        // If the input is not a number we go back to the while condition
        if(isNaN(firstNum) || isNaN(secondNum)) {
            console.log('Please enter only numeric values')
            continue
        }
    
        let result
    
        switch (operation.trim()) {
            case '+':
                result = math.add(firstNum, secondNum)
                break
            case '-':
                result = math.substract(firstNum, secondNum)
                break
            case '*':
                result = math.multiply(firstNum, secondNum)
                break
            case '/':
                result = math.divide(firstNum, secondNum)
                break
            case '%':
                result = math.modulus(firstNum, secondNum)
                break
            default:
                break
        }
    
        console.log(`Result: ${result}`)
        
        let temp = await question('Press 1 to do another operation, 0 to exit: ')
        another = (temp.trim() === '1') ? true : false
    }
    rl.close()
}

module.exports = calculator