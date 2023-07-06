const obj = {
    a:'1',
    b:'2'
}

const  desc= Object.getOwnPropertyDescriptor(obj,'a')
console.log(desc);

Object.defineProperty(obj,'a',{
    value:10,
})

Object.defineProperty(obj,'data',{
    get:()=> '123',
    set:()=> {
        throw new Error('data 属性是只读的  不能重新赋值');
    }
})
obj.data = 1


