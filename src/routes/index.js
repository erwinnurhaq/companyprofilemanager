import CoreLayout from '../layouts/PageLayout/PageLayout'
import Home from './HomeView'
import DetailCompanyRoute from './DetailCompanyView'

export const createRoutes = (store) => ({
  path: '/',
  component: CoreLayout,
  indexRoute: Home,
  childRoutes: [
    DetailCompanyRoute
  ]
})

export default createRoutes
