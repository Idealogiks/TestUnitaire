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

describe("processPurchase", () => {
    test("should throw an error if the input is not an array", () => {
        expect(() => processPurchase(6, 6)).toThrow("Prices must be an array");
    });

    test("shouldn't throw an error if the input is an array", () => {
        expect(() => processPurchase([6], 6)).not.toThrow("Prices must be an array");
    });
  
    test("should throw an error if the tax rate is not a number", () => {
        expect(() => processPurchase([6], "0.2")).toThrow("Tax rate must be a number");
    });

    test("shouldn't throw an error if the tax rate is a number", () => {
        expect(() => processPurchase([6], 0.2)).not.toThrow("Tax rate must be a number");
    });
  
    test("should throw an error if an element in the array is not a number", () => {
        expect(() => processPurchase(["6"], 0.2)).toThrow("Each price must be a non-negative number");
    });

    test("should'nt throw an error if an element in the array is a number", () => {
        expect(() => processPurchase([6], 0.2)).not.toThrow("Each price must be a non-negative number");
    });
  
    test("should throw an error if an element in the array is a negative number", () => {
        expect(() => processPurchase([-6], 0.2)).toThrow("Each price must be a non-negative number");
    });

    test("shouldn't throw an error if an element in the array is a positive number", () => {
        expect(() => processPurchase([6], 0.2)).not.toThrow("Each price must be a non-negative number");
    });
  
    test("should return the correct total price", () => {
        expect(processPurchase([6], 0.2)).toBe(7.2);
    });
  
    test("should not return an incorrect total price", () => {
        expect(processPurchase([6], 0.2)).not.toBe(1.6);
    });
  
    test("should log the correct message", () => {
        const spy = jest.spyOn(console, "log");
        const prixTotal = processPurchase([5], 0.2);
  
        expect(spy).toHaveBeenCalledWith(
            `Notification envoyée : Votre total est de ${prixTotal.toFixed(2)} €`
        );
        spy.mockRestore();
    });
  });
  
  
  describe("generatePassword", () => {
    test("should throw an error if length is not a number", () => {
        expect(() => generatePassword("10", {})).toThrow("Length must be a number greater than or equal to 6");
    });

    test("shouldn't throw an error if length is a number", () => {
        expect(() => generatePassword(10, {})).not.toThrow("Length must be a number greater than or equal to 6");
    });
  
    test("should throw an error if length is less than 6", () => {
        expect(() => generatePassword(5, {})).toThrow("Length must be a number greater than or equal to 6");
    });

    test("shouldn't throw an error if length is more than 6", () => {
        expect(() => generatePassword(7, {})).not.toThrow("Length must be a number greater than or equal to 6");
    });
  
    test("should generate a password of the correct length", () => {
        const password = generatePassword(12, { uppercase: true, numbers: true, specialChars: true });
        expect(password.length).toBe(12);
    });

    test("shouldn't generate a password of the incorrect length", () => {
        const password = generatePassword(11, { uppercase: true, numbers: true, specialChars: true });
        expect(password.length).not.toBe(12);
    });
  
    test("should contain at least one uppercase letter if enabled", () => {
        const password = generatePassword(10, { uppercase: true, numbers: false, specialChars: false });
        expect(/[A-Z]/.test(password)).toBe(true);
    });

    test("shouldn't contain at least one uppercase letter if disabled", () => {
        const password = generatePassword(10, { uppercase: false, numbers: false, specialChars: false });
        expect(/[A-Z]/.test(password)).toBe(false);
    });

    test("should contain at least one number if enabled", () => {
        const password = generatePassword(10, { uppercase: false, numbers: true, specialChars: false });
        expect(/[0-9]/.test(password)).toBe(true);
    });

    test("shouldn't contain at least one number if disabled", () => {
        const password = generatePassword(10, { uppercase: false, numbers: false, specialChars: false });
        expect(/[0-9]/.test(password)).toBe(false);
    });
  
    test("should contain at least one special character if enabled", () => {
        const password = generatePassword(10, { uppercase: false, numbers: false, specialChars: true });
        expect(/[!@#$%^&*()_+\[\]{}|;:,.<>?]/.test(password)).toBe(true);
    });

    test("shouldn't contain at least one special character if disabled", () => {
        const password = generatePassword(10, { uppercase: false, numbers: false, specialChars: false });
        expect(/[!@#$%^&*()_+\[\]{}|;:,.<>?]/.test(password)).toBe(false);
    });
  
    test("should not generate the same password twice in a row", () => {
        const password1 = generatePassword(10, { uppercase: true, numbers: true, specialChars: true });
        const password2 = generatePassword(10, { uppercase: true, numbers: true, specialChars: true });
        expect(password1).not.toBe(password2);
    });
  });
  
  
  