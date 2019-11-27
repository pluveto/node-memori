import VueRouter from "vue-router";
import CollectionsPage from "./pages/collections/CollectionsPage"
import AddCardPage from "./pages/collections/AddCardPage"
import AddDisplacementPage from "./pages/collections/AddDisplacementPage"
import EditCardPage from "./pages/cards/EditCardPage"
import EditDisplacementsPage from "./pages/displacements/EditDisplacementsPage"
import HomePage from "./pages/HomePage"
import SettingsPage from "./pages/SettingsPage"
import ClockInPage from "./pages/ClockInPage"
import LearningPage from "./pages/learning/LearningPage"
import WordRecognitionPage from "./pages/learning/WordRecognitionPage"
import ImportCardsPage from "./pages/collections/ImportCardsPage"
const router = new VueRouter({

  routes: [{
    path: '/',
    component: HomePage
  },{
    path: '/collections/:id',
    component: CollectionsPage
  },{
    path: '/settings',
    component: SettingsPage
  },{
    path: '/clockin',
    component: ClockInPage
  },{
    path: '/collections/:id/add',
    component: AddCardPage
  },{
    path: '/collections/:id/displacements/add',
    component: AddDisplacementPage
  }
  ,{
    path: '/cards/:id/edit',
    component: EditCardPage
  },{
    path: '/displacements/:id/edit',
    component: EditDisplacementsPage
  },{
    path: '/collections/:id/learn',
    component: LearningPage
  },{
    path: '/collections/:id/import',
    component: ImportCardsPage
  }
]
})

export default router