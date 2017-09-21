const multiplier ={
    numbers: [2,3],
    multiplyBy: 2,
    multiply(){
        return this.numbers.map(num => num*this.multiplyBy);
    }
}

console.log(multiplier.multiply());