import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import radio from '@/components/radio';
import test from '@/components/test';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/radio',
      name: 'radio',
      component: radio
    },
    {
      path: '/test',
      name: 'test',
      component: test
    }
  ]
});
