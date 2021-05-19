const fs = require('fs');
const Promise = require('bluebird');
const { reject, resolve, delay, coroutine } = require('bluebird');

Promise.promisifyAll(fs);

let data = [
    fs.readFileAsync('./Data1.txt', 'utf-8'),
    fs.readFileAsync('./Data2.txt', 'utf-8'),
    fs.readFileAsync('./Data3.txt', 'utf-8'),
    fs.readFileAsync('./Data4.txt', 'utf-8'),
];



// Promisified the Readfile method
// fs.readFileAsync('./Data1.txt', 'utf-8').then(data => console.log(data))


// Promise.all 

// Promise.all(data)
//     .then(results => {
//         results.forEach((result,index) => console.log(result));
//     }) 


// Spread Method insted of then to preserve the order of execution and getting results.

// Promise.all(data).spread((result1, result2, result3, result4) => {
//     console.log(result1);
//     console.log(result2)
//     console.log(result3)
//     console.log(result4)
// }) 



// Delay Method for resolving promise after certain delay

// fs.readFileAsync('./Data1.txt','utf-8').delay(2000).then(result => console.log(result))


// Finally method called every time regardless of promise fullfilled or not

/*
fs.readFileAsync('./Data.txt', 'utf-8')
    .then(data => console.log(data))
    .catch((err) => console.log(err.message))
    .finally(() => console.log("finally Method called"));

*/




// Promise JOIN -> Same as Promise.all But doesnot take array of promises as input 
// and has last parameter a handler callback function with results in sequential order.


// Promise.join(
//     fs.readFileAsync('./Data1.txt', 'utf-8'),
//     fs.readFileAsync('./Data2.txt', 'utf-8'),
//     (result1, result2) => {
//         console.log(result1);
//         console.log(result2);
//     }
// )



 // Promise.hello Example
/*
let promiseHello = Promise.method(() => "hello"); 
promiseHello().then(result => console.log(result));
*/


// Promise.resolve()
/*
let promiseHello = Promise.resolve("hello");
promiseHello.then(result => console.log(result))
*/

// Promise.reject()
/*
let promiseHello = Promise.reject("hello");
promiseHello.catch(result => console.log(result))
*/

/*********************         *********************/
// INSPECTION
// user.value() => previous promise value in nesting ,then((user) => getpassword).then((password) => user.value().password == password);

// let promiseHello = Promise.reject("hello");

// console.log(promiseHello.isPending())
// console.log(promiseHello.isCancelled())
// console.log(promiseHello.isRejected())
//  console.log(promiseHello.isFulfilled())


/*

if (promiseHello.isFulfilled() == true) 
    console.log(promiseHello.value())   

if (promiseHello.isRejected() == true) 
    console.log(promiseHello.reason()); 
*/


///////////// Promise.props ///////////////


// let obj = {
//     data1 : data[0],
//     data2 : data[1],
//     data3 : data[2],
//     data4 : data[3]
// }

// Promise.props(obj).then(results => {
//     // console.log(`${results.data1} \n${results.data2} \n${results.data3}`);
//     console.log (results)
// })




 // IF any Promise is fullfilled it will resolve it's value 

 // even though one of promise is rejected it will still resolve the value of  one of fullfilled promise.
 // If all promises are rejected then it will throw an aggregation error of all promises are rejected.

// Promise.any([ ...data, Promise.reject("hello")])
//     .then(result => console.log(result))
//     .catch(err => console.log(err.message))




// Promise Some //

// Return an array of value if given specified no of promises are fullfilled regardless of errors
// If specified no of promises are not resolved then it throws aggregation error


// Promise.some([...data, Promise.reject("hello")],2)
//     .then((result) => result.forEach(item => console.log(item)));




// returns value if anyone of promises from given list is either rejected or resolved as soon as

// Promise.race([...data, reject("Rejected")])
//     .then(result => console.log(result))
//     .catch((err) => console.log(err));



// Promise.each // 

// Works as foreach loop of javascript but takes promises as each item and returns the original arrray

// let filename = [ Promise.delay(10000, 'Data1.txt'), 'Data3.txt', 'Data2.txt', 'Data4.txt' ]
// Promise.each(filename, (item) => {
//    return  fs.readFileAsync(item, 'utf-8') 
// })
//     .then(content => console.log(content))
//     .catch(err => console.log(err));


/// Promisifications //

// 1. Promisify a Single function 

/*
 const readFile = Promise.promisify(fs.readFile);

 readFile('./Data1.txt', 'utf-8')
    .then(content => console.log(content))
    .catch(err => console.log(err.message));
*/

// 2. Promisify Whole module 

// const fs2 = Promise.promisifyAll(require('fs'));

// let result = fs2.readFileAsync('./Data1.txt','utf-8');

// result.then(c => console.log(c))


// Delay Function


// let sayHello = Promise.resolve("Hello");

// sayHello
//     .delay(500).then((msg) => msg)
//     .delay(500).then((msg) => msg)
//     .delay(500).then((msg) => msg)
//     .delay(500).then((msg) => console.log(msg));


// Timeout Function

// Throws error if the given task is not completed within given timeout function //


// fs.readFileAsync('./largeFile.txt', 'utf-8')
//     .timeout(50, "Failed to read within 50ms")
//     .then(result => console.log("read"))
//     .catch((Promise.TimeoutError, e => console.log(e)));
 

// Cancellation 

/*    
Promise.config({ cancellation : true });

let func = () => {
    return new Promise((resolve, reject , oncancel) => {
        setTimeout(() => {
            console.log("hello");
        }, 1000);
        oncancel(() => process.exit())
    })
}

func().cancel() */




// Promise.map 

// data = [delay(5000, './Data1.txt'), './Data2.txt', './Data3.txt', './Data4.txt'];

// Promise.map(data, (item) => {
//     return fs.readFileAsync(item, 'utf-8');
// },{concurrency : 1 }).then(results => {
//     console.log(results)
// });


// Promise.mapSeries => Promise.map with concurrency 1.

// data = ['./Data1.txt', './Data2.txt' , './Data3.txt', './Data4.txt', reject("sfs")];
// Promise.mapSeries(data, (item) => {
//      return fs.readFileAsync(item, 'utf-8');
//  }).then(results => {
//      console.log(results)
//  }).catch(err => console.log(err))



// Promise.reduce


// Promise.reduce(['./Numberfile.txt'],
//     (acc, filename) => {
//         fs.readFileAsync(filename, 'utf-8').then(content => {
//             return acc + (content * 1);
//         })
//     },
// ).then(total => console.log(total))


// Generator Function

// Promise coroutine

// used to yeild promises 

// function PingPong() {

// }

// PingPong.prototype.ping = Promise.coroutine(function* (val) {
//     console.log("Ping?", val);
//     yield Promise.delay(5000);
//     this.pong(val+1);
// });

// PingPong.prototype.pong = Promise.coroutine(function* (val) {
//     console.log("Pong!", val);
//     yield Promise.delay(5000);
//     this.ping(val+1);
// });

// var a = new PingPong();
// a.ping(5)


// .tap is useful for reading the values and performing actions on it without affecting
    // .then()  chain. withour returning value to next promise 
 
// let sayHello = Promise.reject("Hello");


// .tapCatch() => is similar to .tap but only called while promises are rejected without affecting the chain

// sayHello
//     .then((msg) => msg)
//     .tap((msg) => console.log("in tap + ", msg))
//     .then((msg) => msg)
//     .then((msg) => console.log(msg))
//     .tapCatch(err => console.log("in error"))
//     .catch(err => console.log());


// .get() Method
// useful in cases where resolving promise will return an array as result and we want to select specific index value from that result 
// and have to perform an action on that specific item only

// Promise.resolve([1,2,3]).get(2).then(c => console.log(c))



// .thenReturn or .return(data) => eqvivalent to then(() => data) 
// Promise.resolve("he").return('hiii').then(c => console.log(c))


// asCallback Method

// get the promise result in node styled call back

// Promise.reject("Hello").asCallback((err, result) => {
//     if (err)  {
//         console.log("in error " + err)

//     }
//     else  {
//         console.log(" in result " + result)
//     }
// })

// -- using spread option
// Promise.resolve([1,2,3,4]).asCallback((err, a,b,c,d) => {
//     if (err) {
//         console.log("in error", err);
//     }
//      else {
//          console.log("in reuslt", a,b,c,d);
//      }
// }, { spread : true });




// .reflect () which returns a promise that is alway successfull when this promised is settled and returns an 
// object which has properties of inspection

// Promise.all(data.map(function(promise) {
//     return promise.reflect();
// })).each(function(inspection) {
//     if (inspection.isFulfilled()) {
//         console.log("A promise in the array was fulfilled with", inspection.value());
//     } else {
//         console.error("A promise in the array was rejected with", inspection.reason());
//     }
// });



// getNewLibraryCopy() => returns the new copy of bluebird library

// SetScheduler

// Unhandled REjections can be handled by this methods

// Promise.reject("Rejected")

// process.on('unhandledRejection', (reason, promise) => {
//     console.log(reason);
// })

// process.on('rejectionHandled', (promise) => {
//     console.log("hd")
// })


// To hide the unhandled rejection errors 

// does the same as somePromises.catch(() => { });   -- Does nothing
// .suppressUnhandledRejections()



// thenReturn or .return()

// Promise.resolve("hello")
//     .then(data => data)
//     .thenReturn("helow")
//     .then(s => console.log(s))



// let Person = {
//     fn : "Prathamesh",
//     ln : "Patil",
//     fullname : function(arg) {
//         return this.fn + " " + this.ln + " LIves in " + arg;
//     }
// }

// let Animal = {
//     fn : "Tigar",
//     ln : "Siberian"
// }


/// function Borrwoing ------------- 

// Function borrowing concept is used her in call methods

// Animal object doesn't have the full name method but it can borrow from 
// Person object cause they same similar properties

// console.log(Person.fullname.apply(Animal, ["jungle"]))
// console.log(Person.fullname('Surat'));

// let method = Person.fullname.bind(Animal, 'Jungle');

// console.log(method())


// ---------------Binding existing function with predefined values to create two new funcitons --------------------

// let multiply = ( a, b ) => a * b;

// let multiplyByTwoNumbers = multiply.bind();
// let multiplyBy2 = multiply.bind(this, 2)
// let give_square_of_2 = multiply.bind(this, 2, 2);

//No matter how much arguments you pass this will always return you the square of 2
// console.log(give_square_of_2()) 

// console.log(multiplyBy2(2))



// function Cat (color, age) {
//     this.color = color;
//     this.age = age;
// }

// var kitty = new Cat("Red", 5);

// Cat.prototype.myfun = function() {
//     fs.readFileAsync('./Data1.txt','utf-8')
//     .then((content => {
//         return this.color
//     }))
//     .then((color) => {
//         console.log("this cat is of", color , "color and of age :", this.age)
//     })
//     .catch(err => console.log(err));
// }

// kitty.myfun()


Promise.allSettled([Promise.resolve('Delayed Resolved').delay(1000), ...data, reject("Manual Error")])
    .then((results) => {
        console.log(results)
        results.forEach(result => { 
            result.isFulfilled() ? console.log(result.value()) : console.log(result.reason())   
        })
    })

// let q;
//    let p = () => {
//      return Promise.allSettled([Promise.resolve('Delayed Resolved').delay(1000), ...data, reject("Manual Error")])
//    }

//    (async function() {
//             q = await p()
//            console.log(q)
//    })()


// process.on('unhandledRejection', () => console.log("error"))