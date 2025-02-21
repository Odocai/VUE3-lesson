import { activeEffect } from "./effect";




function track(target,key){


    // activeEffect 有这个属性 说明这个key是在effect中访问的，没有说明是在effect之外访问的不用收集
}