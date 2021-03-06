import Vue from 'vue'
// import Read from './App.vue'
import vuetify from '@/plugins/vuetify' // path to vuetify export
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import axios from 'axios';
import App from "./App.vue";
import Slider from '@jeremyhamm/vue-slider';
// import vueFilterPrettyBytes from 'vue-filter-pretty-bytes';
import vueFilterPrettyBytes from 'vue-filter-pretty-bytes';
import VueMoment from 'vue-moment'
import moment from 'moment-timezone'
import VueLocalStorage from 'vue-localstorage'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './components/Auth/Login';
import Dashboard from './components/Auth/Dashboard';
import TestLayout from './components/Auth/Test-Layout';
import Briefcase from './components/Briefcase';
import MeetingPacks from './components/MeetingPacks';
import Meetings from './components/Meetings';
import Resources from './components/Resources';
import Approvals from './components/Approvals';
import Compliance from './components/Compliance';
import Evaluation from './components/Evaluation';
import Discussion from './components/Discussion';
import Plans from './components/Plans';
import Conference from './components/Conference';
import Elections from './components/Elections';
import RiskManagement from './components/RiskManagement';


// import PSPDFKit from "pspdfkit";

// PSPDFKit.load({ });


// axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded'
// axios.defaults.headers.common["Authorization"] = result;
// var options = {headers: { "Content-Type": application.json }};

// header('Access-Control-Allow-Origin: *');
// header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');

// import router from "./router";
// import store from "./store";

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(Slider);
Vue.use(vueFilterPrettyBytes);
// Vue.use(require('vue-moment'));
Vue.use(VueMoment, { moment });
Vue.use(VueLocalStorage);
window.axios = axios;


Vue.component('Gillian', {
  template: `<div><p> I am headed for {{city}} <button @click="changeCity()">Change Name</button></p></div>`,
  data: function(){
    return{
      city: 'Los Angeles'
    }
  },

  methods: {
    changeName:function(){ 
        this.name = 'San Fransisco';
    }
  }
});


// Vue.prototype.$http = Axios;
// const accessToken = localStorage.getItem('access_token')
// if (accessToken) {
//     Vue.prototype.$http.defaults.headers.common['Authorization'] = accessToken
// }
// axios.defaults.baseURL = "http://eserver1.stl-horizon.com/api_v10/frontend/web/";

const routes = [
  {
    path: '/',
    component: Login,
    name: 'login',
  },
  {
    path: '/dashboard',
    component: Dashboard,
    name: 'dashboard',
      beforeEnter: (to, from, next) => {
        if(store.state.authenticated == false) {
            next('/');
        } else {
            next();
        }
    }
  },
  {
    path: '/Briefcase',
    component: Briefcase,
    name: 'Briefcase',
      beforeEnter: (to, from, next) => {
        if(store.state.authenticated == false) {
            next('/');
        } else {
            next();
        }
    }
  },  
  {
    path: '/Meeting Packs',
    component: MeetingPacks,
    name: 'Meeting Packs',
      beforeEnter: (to, from, next) => {
        if(store.state.authenticated == false) {
            next('/');
        } else {
            next();
        }
    }
  },  
  {
    path: '/Meetings',
    component: Meetings,
    name: 'Meetings',
      beforeEnter: (to, from, next) => {
        if(store.state.authenticated == false) {
            next('/');
        } else {
            next();
        }
    }
  },  
  {
    path: '/Resources',
    component: Resources,
    name: 'Resources',
      beforeEnter: (to, from, next) => {
        if(store.state.authenticated == false) {
            next('/');
        } else {
            next();
        }
    }
  },  
  {
    path: '/Approvals',
    component: Approvals,
    name: 'Approvals',
      beforeEnter: (to, from, next) => {
        if(store.state.authenticated == false) {
            next('/');
        } else {
            next();
        }
    }
  },
  {
    path: '/Compliance',
    component: Compliance,
    name: 'Compliance',
      beforeEnter: (to, from, next) => {
        if(store.state.authenticated == false) {
            next('/');
        } else {
            next();
        }
    }
  },
  {
    path: '/Evaluation',
    component: Evaluation,
    name: 'Evaluation',
      beforeEnter: (to, from, next) => {
        if(store.state.authenticated == false) {
            next('/');
        } else {
            next();
        }
    }
  },
  {
    path: '/Discussion',
    component: Discussion,
    name: 'Discussion',
      beforeEnter: (to, from, next) => {
        if(store.state.authenticated == false) {
            next('/');
        } else {
            next();
        }
    }
  },  
  {
    path: '/Plans',
    component: Plans,
    name: 'Plans'
  },
  {
    path: '/Conference',
    component: Conference,
    name: 'Conference'
  },
  {
    path: '/Elections',
    component: Elections,
    name: 'Elections'
  },
  {
    path: '/Risk Management',
    component: RiskManagement,
    name: 'Risk Management'
  },
  {
    path: '/TestLayout',
    component: TestLayout,
    name: 'TestLayout'
  },
];

const store = new Vuex.Store(
  {
    state: {
        authenticated: false
    },
    mutations: {
        setAuthentication(state, status) {
            state.authenticated = status;
        }
    }
  }
);

const router = new VueRouter({
  mode: 'history',
  routes,
  base:'/'
});

new Vue({
  vuetify,
  router: router,
  store: store,
  render: h => h(App)
}).$mount("#app");
