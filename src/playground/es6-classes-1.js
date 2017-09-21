
class Person{
    constructor(name = 'Anonymous', age =0){
        this.name = name;
        this.age = age;
    }
    getGreeting(){
        return `Hi. I'm ${this.name}!`;
    };
    getDescription(){
        return `${this.name} is ${this.age} year(s) old.`
    }
}

class Student extends Person{
    constructor(name, age, major){
        super(name, age);
        this.major = major;
    }
    hasMajor(){
        return !!this.major;
    }
    getDescription(){
        // return `${this.name} is ${this.age} year(s) old. Major ${this.major}`
        let description = super.getDescription();
        this.hasMajor() ? description+= ` Their major is ${this.major}` : '';
        return description;
    }
}

const me = new Person('Kostya', 28);
console.log(me.getDescription());

const you = new Student('Mariya', 25, 'HR');
console.log(you.getDescription());