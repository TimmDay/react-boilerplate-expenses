const foo = { name: 'Tom', age: 30, bad: false };
const bar = { name: 'Dick', age: 40, bad: true };
const baz = { name: 'Harry', age: 50, bad: false };

// old way
console.log(foo);
console.log(bar);
console.log(baz);

// computed property names - one line of code, one line in console, everything together and labelled
console.log({ foo, bar, baz });

// can add css to styles -> first arg %c and text, second is styles
console.log('%c People', 'color: orange; font-weight: bold');
console.log({ foo, bar, baz });

//objects with common properties can be displayed as a table
console.table([ foo, bar, baz ]);



// can time things in the console

console.time('looper');

let i = 0;
while (i < 1000000) { i++ }

console.timeEnd('looper');


// Stack Trace Logs
const deleterFunc = () => {
    console.trace('deleted item from db -> dont call this twice')
};

deleterFunc(); //line 37
deleterFunc();