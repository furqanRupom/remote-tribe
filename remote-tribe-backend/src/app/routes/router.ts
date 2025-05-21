import { AuthRoute } from "../modules/auth"
import express from "express"
import { UserRoutes } from "../modules/user"
import { JobsRoutes } from "../modules/jobs"
const router = express.Router()
const routes = [
    {
        path: '/auth',
        route: AuthRoute
    },
    {
        path:"/users",
        route:UserRoutes
    },
    {
        path:"/jobs",
        route:JobsRoutes
    }
]
routes.forEach((route: { path: string; route: any; }) => {
    router.use(route.path, route.route)
})
export default router