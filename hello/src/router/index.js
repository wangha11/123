import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Hello from '../components/Hello.vue'
import News from '../components/News.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    children:[ //通过children配置子级路由
        {
          path:'news/:id', //此处一定不要写：/news
            component:News,
            name:'News',
            props(route){
              return {
                id:route.params.id
              }
            }
        },
        {
            path:'news', //此处一定不要写：/news
            component:News,
            name:'News',
            children:[
				{
                    path: 'hello',
                    name:'Hello', //给路由命名
					component:Hello,
				}
			]
        },
        
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
