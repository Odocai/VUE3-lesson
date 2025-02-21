import { isObject } from "@vue/shared";
import { ReactiveFlags, mutableHandlers } from "./baseHandler";

// 用于记录我们代理后的结果，可以复用
const reactiveMap = new WeakMap();  //weakMap防止内存泄漏

function createReactiveObject(target){
    // 统一判断 响应式对象必须是对象
    if(!isObject(target)){
        return target;
    }

    if(target[ReactiveFlags.IS_REACTIVE]){
        return target;
    }

    // 取缓存 如果有直接返回
    const existsProxy = reactiveMap.get(target);
    if(existsProxy){
        return existsProxy;
    }

    let proxy = new Proxy(target,mutableHandlers);

    // 根据对象缓存代理后的结果
    reactiveMap.set(target,proxy)
    return proxy;
}

export function reactive(target){
    return createReactiveObject(target)
}