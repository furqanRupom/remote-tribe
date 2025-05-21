import prisma from "../../../prisma"
import logger from "../../logger/logger"
import ApiError from "../../middleware/apiError"
import httpStatus from "http-status"
import { ApplicationMail } from "./application.mail"
import { getJob, getUser } from "../utils"

class Service {
    async jobApply(userId: string, jobId: string, payload: { coverLetter: string }) {
        logger.info(`Application attempt for job with id ${jobId}`)
        const jobSeeker = await getUser(userId)
        const job = await getJob(jobId)
        if (!job) {
            logger.warn(`Job with id ${jobId} not found.`)
            throw new ApiError(httpStatus.NOT_FOUND, 'Job not found')
        }
        if (!jobSeeker) {
            logger.warn(`User with id ${userId} not found.`)
            throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
        }
        const isJobExit = await prisma.job.findUnique({
            where: {
                id: jobId,
                isDeleted: false,
                isApproved: true
            }
        })
        if (!isJobExit) {
            logger.warn(`Job with id ${jobId} not found.`)
            throw new ApiError(httpStatus.NOT_FOUND, 'Job not found')
        }
        try {
            const application = await prisma.application.create({
                data: {
                    jobId,
                    userId,
                    coverLetter: payload.coverLetter
                }
            })
            logger.info(`Application created successfully for job with id ${jobId}`)
            await ApplicationMail.sendJobApplicationMail({ name: jobSeeker.name, title: job.title, company: job.companyName, email: jobSeeker.email })
            return application
        } catch (error: any) {
            logger.error(`Failed to create application for job with id ${jobId}: ${error.message}`)
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Application creation failed')
        }
    }
    async myApplications(userId: string) {
        logger.info(`Fetching applications for user with id ${userId}`)
        try {
            const applications = await prisma.application.findMany({
                where: {
                    userId
                },
                include: {
                    job: true
                }
            })
            logger.info(`Applications fetched successfully for user with id ${userId}`)
            return applications
        } catch (error: any) {
            logger.error(`Failed to fetch applications for user with id ${userId}: ${error.message}`)
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Application fetching failed')
        }
    }
}
export const ApplicationService = new Service()