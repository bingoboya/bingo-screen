// import { useTimeoutFn } from '/@/hooks/core/useTimeout';
import { tryOnUnmounted } from '@vueuse/core';
import { unref, nextTick, watch, computed, ref } from 'vue';
import { useDebounceFn, useThrottleFn } from '@vueuse/core';
// import { useEventListener } from '/@/hooks/event/useEventListener';
// import { useBreakpoint } from '/@/hooks/event/useBreakpoint';
import echarts from '@/utils/echarts.js';
// import { useRootSetting } from './useRootSetting';
import { screenMap, sizeEnum, screenEnum } from './breakpointEnum';

let globalScreenRef;
let globalWidthRef;
let globalRealWidthRef;
export function useBreakpoint() {
  return {
    screenRef: computed(() => unref(globalScreenRef)),
    widthRef: globalWidthRef,
    screenEnum,
    realWidthRef: globalRealWidthRef,
  };
}

export function useEventListener({
  el = window,
  name,
  listener,
  options,
  autoRemove = true,
  isDebounce = true,
  wait = 80,
}){
  /* eslint-disable-next-line */
  let remove = () => {};
  const isAddRef = ref(false);

  if (el) {
    const element = ref(el)

    const handler = isDebounce ? useDebounceFn(listener, wait) : useThrottleFn(listener, wait);
    const realHandler = wait ? handler : listener;
    const removeEventListener = (e) => {
      isAddRef.value = true;
      e.removeEventListener(name, realHandler, options);
    };
    const addEventListener = (e) => e.addEventListener(name, realHandler, options);

    const removeWatch = watch(
      element,
      (v, _ov, cleanUp) => {
        if (v) {
          !unref(isAddRef) && addEventListener(v);
          cleanUp(() => {
            autoRemove && removeEventListener(v);
          });
        }
      },
      { immediate: true },
    );

    remove = () => {
      removeEventListener(element.value);
      removeWatch();
    };
  }
  return { removeEvent: remove };
}

export function isFunction(val) {
  return typeof val === 'function';
}
export function useTimeoutRef(wait) {
  const readyRef = ref(false);

  let timer;
  function stop() {
    readyRef.value = false;
    timer && window.clearTimeout(timer);
  }
  function start() {
    stop();
    timer = setTimeout(() => {
      readyRef.value = true;
    }, wait);
  }

  start();

  tryOnUnmounted(stop);

  return { readyRef, stop, start };
}
export function useTimeoutFn(handle, wait, native = false) {
  if (!isFunction(handle)) {
    throw new Error('handle is not Function!');
  }

  const { readyRef, stop, start } = useTimeoutRef(wait);
  if (native) {
    handle();
  } else {
    watch(
      readyRef,
      (maturity) => {
        maturity && handle();
      },
      { immediate: false },
    );
  }
  return { readyRef, stop, start };
}
// export function getDarkMode() {
//   return 'dark'
// }
export function useRootSetting(){
  // const appStore = useAppStore();
  const getDarkMode = 'dark'
  return {
    getDarkMode
  }
}
export function useECharts(
  elRef,
  theme = 'default',
) {
  const { getDarkMode: getSysDarkMode } = useRootSetting();

  const getDarkMode = computed(() => {
    return theme === 'default' ? getSysDarkMode.value : theme;
  });
  let chartInstance = null;
  let resizeFn = resize;
  const cacheOptions = ref({});
  let removeResizeFn = () => {};

  resizeFn = useDebounceFn(resize, 200);

  const getOptions = computed(() => {
    if (getDarkMode.value !== 'dark') {
      return cacheOptions.value;
    }
    return {
      backgroundColor: 'transparent',
      ...cacheOptions.value,
    };
  });

  function initCharts(t = theme) {
    const el = unref(elRef);
    if (!el || !unref(el)) {
      return;
    }

    chartInstance = echarts.init(el, t);
    const { removeEvent } = useEventListener({
      el: window,
      name: 'resize',
      listener: resizeFn,
    });
    removeResizeFn = removeEvent;
    const { widthRef, screenEnum } = useBreakpoint();
    if (unref(widthRef) <= screenEnum.MD || el.offsetHeight === 0) {
      useTimeoutFn(() => {
        resizeFn();
      }, 30);
    }
  }

  function setOptions(options, clear = true) {
    cacheOptions.value = options;
    if (unref(elRef) && unref(elRef).offsetHeight === 0) {
      useTimeoutFn(() => {
        setOptions(unref(getOptions));
      }, 30);
      return;
    }
    nextTick(() => {
      useTimeoutFn(() => {
        if (!chartInstance) {
          initCharts(getDarkMode.value);

          if (!chartInstance) return;
        }
        clear && (chartInstance && chartInstance.clear());

        chartInstance && chartInstance.setOption(unref(getOptions));
      }, 30);
    });
  }

  function resize() {
    chartInstance && chartInstance.resize();
  }

  watch(
    () => getDarkMode.value,
    (theme) => {
      if (chartInstance) {
        chartInstance.dispose();
        initCharts(theme);
        setOptions(cacheOptions.value);
      }
    },
  );

  tryOnUnmounted(() => {
    if (!chartInstance) return;
    removeResizeFn();
    chartInstance.dispose();
    chartInstance = null;
  });

  function getInstance() {
    if (!chartInstance) {
      initCharts(getDarkMode.value);
    }
    return chartInstance;
  }

  return {
    setOptions,
    resize,
    echarts,
    getInstance,
  };
}
