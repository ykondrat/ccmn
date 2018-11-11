// Core
import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import Notifications from 'vue-notification';

// Router
import router from './router';

// Component
import App from './App';

// Styles
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

// Config
Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(Notifications);

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: {
        App
    },
    template: '<App/>',
});
