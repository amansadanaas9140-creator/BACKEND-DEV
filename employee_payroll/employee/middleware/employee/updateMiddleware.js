import joi from "joi"
import { StatusCodes } from "http-status-pro-js"

export default function employeeUpdateMidd(req,res,next){
    try {
        const isHtmlForm = req.is("application/x-www-form-urlencoded")

        let schema = joi.object({
            id:joi.number().integer().positive(),
            name:joi.string().trim().min(3).max(100).lowercase(),
            email:joi.string().email().lowercase().required(),
            password:joi.string().alphanum().min(4).max(6).required(),
            department:joi.string().lowercase().trim(),
            basic_salary:joi.number()
        })
    
        let{error,value} = schema.validate(req.body)
    
        if(error){
            if (isHtmlForm) {
                if (req.body?.id) {
                    return res.status(StatusCodes.BAD_REQUEST.code).redirect(`/employee/edit/${req.body.id}`)
                }
                return res.status(StatusCodes.BAD_REQUEST.code).redirect("/home")
            }

            return res.status(StatusCodes.BAD_REQUEST.code).json({
                code:StatusCodes.BAD_REQUEST.code,
                message:StatusCodes.BAD_REQUEST.message,
                data:null
            })
        }
    
        req.body = value
        next()    
    } catch (error) {
        console.log("middleware/updateMiddleware: ",error)
        const isHtmlForm = req.is("application/x-www-form-urlencoded")
        if (isHtmlForm) {
            if (req.body?.id) {
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).redirect(`/employee/edit/${req.body.id}`)
            }
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).redirect("/home")
        }

        res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code:StatusCodes.INTERNAL_SERVER_ERROR.code,
            message:StatusCodes.INTERNAL_SERVER_ERROR.message,
            data:null
        })
    }

}
