import express from "express";
const router = express.Router();

import { AuthController } from "./auth.controller";
import validateRequest from "../../middleware/validateRequest";
import { AuthValidation } from "./auth.validation";
import { auth } from "../../middleware/auth";
import { Role } from "@prisma/client";

router.post('/register',validateRequest(AuthValidation.userRegistrationValidation), AuthController.userRegistration)
router.post('/verify', AuthController.confirmRegistration)
router.post('/login', AuthController.login)
router.post('/logout',auth(Role.ADMIN,Role.EMPLOYER,Role.SUPER_ADMIN,Role.JOB_SEEKER), AuthController.logout)
router.get('/profile', auth(Role.ADMIN, Role.EMPLOYER, Role.SUPER_ADMIN, Role.JOB_SEEKER), AuthController.profile)
export const AuthRoute = router