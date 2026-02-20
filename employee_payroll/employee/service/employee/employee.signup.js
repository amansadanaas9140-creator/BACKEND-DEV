import bcrypt from "bcrypt"
import { StatusCodes } from "http-status-pro-js"
import { employeeCreate } from "../../model/employee/employee.model.js"

export default function employeeSignup(req,res){
    try{
        const isHtmlForm = req.is("application/x-www-form-urlencoded")

        let {name,email,password,department,basic_salary} = req.body
        let salt = bcrypt.genSaltSync(10)
        const hashPassword = bcrypt.hashSync(password, salt)
        password = hashPassword
        
        let data = employeeCreate(name,email,password,department,basic_salary)
        if(!data){
            if (isHtmlForm) {
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).redirect("/employee/add")
            }

            res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
                code:StatusCodes.INTERNAL_SERVER_ERROR.code,
                message:StatusCodes.INTERNAL_SERVER_ERROR.message,
                data:null
           })
           return;
        }

        if (isHtmlForm) {
            return res.redirect("/home")
        }

        return res.status(StatusCodes.CREATED.code).json({
            code:StatusCodes.CREATED.code,
            message:StatusCodes.CREATED.message,
            data:null
        })
    }catch(error){
        console.log("service/employee.signup: ",error)
        const isHtmlForm = req.is("application/x-www-form-urlencoded")

        if (isHtmlForm) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).redirect("/employee/add")
        }

        res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code:StatusCodes.INTERNAL_SERVER_ERROR.code,
            message:StatusCodes.INTERNAL_SERVER_ERROR.message,
            data:null
        })
    }
}
