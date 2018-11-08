// Core
import Vue from 'vue';
import Router from 'vue-router';

// Components
import Main from '@/components/Main';
import Analytics from '@/components/Analytics';
import Locations from '@/components/Locations';
import Users from '@/components/Users';
import Bot from '@/components/Bot';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Main',
            component: Main
        },
        {
            path: '/analytics',
            name: 'Analytics',
            component: Analytics
        },
        {
            path: '/locations',
            name: 'Locations',
            component: Locations
        },
        {
            path: '/users',
            name: 'Users',
            component: Users
        },
        {
            path: '/bot',
            name: 'Bot',
            component: Bot
        }
    ]
});
