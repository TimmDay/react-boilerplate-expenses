const add = (a, b) => a + b;
const generateGreeting = (name = 'Anon') => `Hello ${name}!`;


test('should add 2 numbers', () => {
    const result = add(3,4);
    //an assertion
    // if (result !== 7) throw new Error(`4 + 3. Result was expected 7. Got ${result}`);
    expect(result).toBe(7); //jest version - assertion library. expect is a jest global
});

test('should return a string greeting generated from name arg', () => {
    const result = generateGreeting('Tim');
    expect(result).toBe('Hello Tim!');
});

test('should generate greeting for no name', () => {
    const result = generateGreeting();
    expect(result).toBe('Hello Anon!');
});