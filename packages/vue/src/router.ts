import { createRouter, createWebHashHistory } from 'vue-router';
import defaultLayout from '@/layouts/side-nav-outer-toolbar.vue';
import simpleLayout from '@/layouts/single-card.vue';
import { authInfo } from '@/auth';

function loadComponent(ComponentFileName: string) {
  // eslint-disable-next-line func-call-spacing
  return () => import (/* webpackChunkName: "login" */ `@/pages/${ComponentFileName}.vue`);
}

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/crm-contact-list',
    },
    {
      path: '/login-form',
      name: 'login-form',
      meta: {
        requiresAuth: false,
        layout: simpleLayout,
        title: 'Sign In',
      },
      component: loadComponent('login-form'),
    },
    {
      path: '/reset-password',
      name: 'reset-password',
      meta: {
        requiresAuth: false,
        layout: simpleLayout,
        title: 'Reset Password',
        description: 'Please enter the email address that you used to register, and we will send you a link to reset your password via Email.',
      },
      component: loadComponent('reset-password-form'),
    },
    {
      path: '/create-account',
      name: 'create-account',
      meta: {
        requiresAuth: false,
        layout: simpleLayout,
        title: 'Sign Up',
      },
      component: loadComponent('create-account-form'),
    },
    {
      path: '/change-password/:recoveryCode',
      name: 'change-password',
      meta: {
        requiresAuth: false,
        layout: simpleLayout,
        title: 'Change Password',
      },
      component: loadComponent('change-password-form'),
    },
    ...[
      { name: 'crm-contact-list' },
      { name: 'crm-contact-details' },
      { folder: 'planning', name: 'planning-task-list' },
      { folder: 'planning', file: 'planning-task-details' },
      { folder: 'analytics', name: 'analytics-dashboard' },
      { folder: 'analytics', name: 'analytics-sales-report' },
      { folder: 'analytics', name: 'analytics-geography' },
    ].map(({ folder, name, file }) => ({
      path: `/${name || file}`,
      meta: {
        requiresAuth: true,
        layout: defaultLayout,
      },
      component: loadComponent([folder, name, name, file].filter(Boolean).join('/')),
    })),
  ],
});

router.beforeEach((to, from, next) => {
  if (to.name === 'login-form' && authInfo.loggedIn()) {
    next({ name: 'home' });
  }

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!authInfo.loggedIn()) {
      next({
        name: 'login-form',
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});
