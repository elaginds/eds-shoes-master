import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { FontAwesomeIcon } from './plugins/font-awesome'
import { Vue3Mq } from "vue3-mq";

createApp(App)
    .use(store)
    .use(router)
    .use(Vue3Mq, {
        breakpoints: { // default breakpoints - customize this
            sm: 0,
            md: 600,
            lg: 1250,
        }
    })
    .component("font-awesome-icon", FontAwesomeIcon)
    .mount('#app')
