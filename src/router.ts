import Vue from 'vue';
import Router from 'vue-router';
import store from './store/index';
import Run from './views/Run.vue';
import About from './views/About.vue';
import Contact from './views/Contact.vue';
import NotFoundPage from './views/404.vue';
import ErrorPage from './views/500.vue';

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'run',
            component: Run,
        },
        {
            path: '/about',
            name: 'about',
            component: About,
        },
        {
            path: '/contact',
            name: 'contact',
            component: Contact,
        },
        {
            path: '/404',
            name: 'notFound',
            component: NotFoundPage,
        },
        {
            path: '/500',
            name: 'error',
            component: ErrorPage,
        },
    ],
});


router.beforeEach((to, _, next): void => {
    try {
        if(to.matched.length === 0) {
            store.dispatch('spotifyToken/parseUrlResponse', to.fullPath);
            next('/');
        } else {
            next();
        }
    } catch(err) {
        store.commit('logError', {
            location: 'page routing',
            error: err,
        });
        next('/500');
    }
});

export default router;
