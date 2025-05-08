import { AuthRoute } from "../modules/auth"
import express from "express"
const router = express.Router()
const routes = [
    {
        path: '/auth',
        route: AuthRoute
    }
]
routes.forEach((route: { path: string; route: any; }) => {
    router.use(route.path, route.route)
})
export default router