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
        expect(() => calculateTotalPrice("10", 0.2)).toThrow('Prices must be an array');
    }); 
    test("then it not throw an error when price is an array ", () => {
        expect(() => calculateTotalPrice([2], 0.2)).not.toThrow('Prices must be an array');
    });
    test("then it not throw an error when tax is an number ", () => {
        expect(() => calculateTotalPrice([2], 2)).not.toThrow('Tax rate must be a number');
    });
    test("then it throw an error when tax isn't an number ", () => {
        expect(() => calculateTotalPrice([2], [1])).toThrow('Tax rate must be a number');
    });
    test("then it throws an error when price is negative", () => {
        expect(() => calculateTotalPrice([-2], 0.2)).toThrow('Each price must be a non-negative number');
    });
    test("then it not throws an error when price is positive", () => {
        expect(() => calculateTotalPrice([2], 0.2)).not.toThrow('Each price must be a non-negative number');
    });
    test("then the result should be", () => {
        expect(calculateTotalPrice([1], 0,2)).toBe(1,2)
    });
    test("then the result shouldn't be", () => {
        expect(calculateTotalPrice([1], 0,2)).not.toBe(50)
    });
})

describe("When i want to send a notification", () => {
    test("should display the good notification", () => {
        const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
        sendNotification("snif");
        expect(consoleSpy).toHaveBeenCalledWith("Notification envoyée : snif");
        consoleSpy.mockRestore();
    });
    test("should not display the good notification", () => {
        const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
        sendNotification("fatiguée");
        expect(consoleSpy).not.toHaveBeenCalledWith("Notification envoyée : snif");
        consoleSpy.mockRestore();
    });
    test("should not display the notification because it's not a string", () => {
        const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
        sendNotification(1);
        expect(consoleSpy).not.toHaveBeenCalledWith("Notification envoyée : snif");
        consoleSpy.mockRestore();
    });
});

