const { isEven, calculateTotalPrice, processPurchase, sendNotification, generatePassword } = require("./../src/function.js");


describe("when i want to verify if a number is even or not", () => {
    test("then it should return true for even number ", () => {
        expect(isEven(2)).toBe(true)
    }); 
    test("then it should return false for odd number", () => {
        expect(isEven(1)).toBe(false)
    });
    test("then it should return error for not number", () => {
        expect(() => isEven("2")).toThrow('Input must be a number');
    });
    test("then it shouldn't return error for number", () => {
        expect(() => isEven(2)).not.toThrow('Input must be a number');
    });

})
