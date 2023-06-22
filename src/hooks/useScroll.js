import { onMounted, onUnmounted, ref } from "vue"

import { throttle } from 'underscore'

export default function useScroll() {
    const isReachBottom = ref(false)
    const scrollTop = ref(0)
    const scrollHeight = ref(0)
    const clientHeight = ref(0)
    // 防抖节流
    const scrollListenerhandler = throttle(() => {
        scrollTop.value = document.documentElement.scrollTop
        scrollHeight.value = document.documentElement.scrollHeight
        clientHeight.value = document.documentElement.clientHeight
        console.log("监听到了滚动");
        if ((clientHeight.value + scrollTop.value + 10) >= scrollHeight.value) {
            isReachBottom.value = true
        }

    },100)

    onMounted(() => {
        window.addEventListener("scroll", scrollListenerhandler)
    })

    onUnmounted(() => {
        window.removeEventListener("scroll", scrollListenerhandler)
    })

    return { isReachBottom, scrollHeight, scrollTop, clientHeight }
} 
