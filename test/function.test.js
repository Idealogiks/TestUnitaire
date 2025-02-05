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

describe("when i want to calculate the price", () => {
    test("then it throw an error when price isn't array ", () => {
        expect(() => calculateTotalPrice(2)).toThrow('Prices must be an array');
    }); 
    test("then it not throw an error when price is an array ", () => {
        expect(() => calculateTotalPrice([2])).not.toThrow('Prices must be an array');
    });
    test("then it not throw an error when tax is an number ", () => {
        expect(() => calculateTotalPrice(2)).not.toThrow('Tax rate must be a number');
    });
    test("then it throw an error when tax isn't an number ", () => {
        expect(() => calculateTotalPrice([2])).toThrow('Tax rate must be a number');
    });
    test("then it throw an error when price is negative ", () => {
        const price = [-2];
        expect(() => calculateTotalPrice()).toThrow('Each price must be a non-negative number');
    });
    test("then it throw an error when price is negative ", () => {
        expect(() => calculateTotalPrice.price([-2])).toThrow('Each price must be a non-negative number');
    });
})
