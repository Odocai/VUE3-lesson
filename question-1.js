const person = {
    name:'odocai',
    get aliasName(){
        return this.name + 'great'
    }
}

let proxyPerson = new Proxy(person,{
    get(target,key,recevier){ // recevier是代理对象
        console.log('key>>>>',key);
        // return target[key];
        return Reflect.get(target,key,recevier)
    }
})

console.log(proxyPerson.aliasName)