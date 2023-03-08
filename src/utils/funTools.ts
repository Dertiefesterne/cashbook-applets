// 防抖
export function debounce(fn: () => void, wait: number = 2000) {
    var timer: any = null;
    return function () {
        if (timer !== null) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn()
        }, wait);
    }
}

//节流
export function throttle(fn: () => void, time: number = 2000) {
    let canRun: boolean = true;
    return function () {
        if (!canRun) return;
        canRun = false;
        fn()//执行2000ms内触发的第一次
        setTimeout(() => {
            // fn()//执行2000内触发的最后一次
            canRun = true;
        }, time);
    };
}