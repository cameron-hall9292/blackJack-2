console.log("test");



const array = [1,2,2,3,3,4,4,4,5];

const set = new Set(array);

console.log(set);
set.add(20);

console.log(set);
//create a new array from a set

const newArray = [...set]
console.log(newArray);
//loop through set and change values

for (let value of set) 
    {
       console.log(value *= 20) 
    }

console.log(set);
