import prisma from "../../../prisma"
import { config } from "../../config"
import { generateToken, verifyToken } from "../../helpers/generateToken"
import ApiError from "../../middleware/apiError"
import { getCache, setCache } from "../../redis"
import { generateSixDigitCode } from "../../shared"
import { AuthMail } from "./auth.mail"
import bcrypt from "bcrypt"
import httpStatus from "http-status"
import { generateAuthTokens } from "./auth.utils"
import { Secret } from "jsonwebtoken"

class Service {
    async userRegistration(payload: { name: string, email: string, password: string }) {
        const user = await prisma.user.findUnique({ where: { email: payload.email } })
        if(user){
            throw new ApiError(httpStatus.CONFLICT, 'User already exists')
        }
        
        const code = generateSixDigitCode()
        setCache(code, payload, 60 * 10)
        await AuthMail.sendUserVerificationMail({ ...payload, token: code })

    }
    async confirmRegistration(code: string) {
        const user = await getCache(code)
        if (!user) throw new ApiError(httpStatus.BAD_REQUEST,'Invalid verification code')
        user.password = await bcrypt.hash(user.password, 10)
        await prisma.user.create({ data: {...user, is_verified: true} })
        await AuthMail.sendConfirmationMail({name:user.name,email:user.email})

    }
    async login(payload: { email: string, password: string }) {
       const user = await prisma.user.findUnique({ where: { email: payload.email,is_verified: true } })
       if(!user) throw new ApiError(httpStatus.NOT_FOUND,'User not found')
        const isPasswordMatch = await bcrypt.compare(payload.password, user.password)
        if(!isPasswordMatch) throw new ApiError(httpStatus.UNAUTHORIZED,'Invalid password')
        const {accessToken,refreshToken} = generateAuthTokens({id:user.id,role:user.role})
       return {accessToken,refreshToken}
    }
    async profile(id:string) {
        const user = await prisma.user.findUnique({ where: { id,is_verified: true,is_deleted: false } })
        if(!user) throw new ApiError(httpStatus.NOT_FOUND,'User not found')
        const {password,...rest} = user
        return rest
    }
    async refreshToken(refreshToken:string) {
        const userInfo = verifyToken(refreshToken, config.refresh_token_secret as Secret)
        if(!userInfo) throw new ApiError(httpStatus.UNAUTHORIZED,'Invalid refresh token')
        const user = await prisma.user.findUniqueOrThrow({ where: { id: userInfo.id } })
        const {accessToken,refreshToken:refreshToken1} = generateAuthTokens({id:user.id,role:user.role})
       return {accessToken,refreshToken:refreshToken1}
    }
   

}

export const AuthService = new Service()