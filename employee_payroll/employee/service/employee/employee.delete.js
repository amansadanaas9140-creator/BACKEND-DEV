import { StatusCodes } from "http-status-pro-js";
// import { employeeDelete } from "./model/employee/employee.model.js";
import { Delete } from "../../model/employee/employee.model.js";

export default function EmployeeDelete(req,res){
    try{
        const isHtmlForm = req.is("application/x-www-form-urlencoded")
        let employeeid  = req.params.id
        employeeid = Number(employeeid)
        let deleteEmployee = Delete(employeeid)
        if(!deleteEmployee){
            if (isHtmlForm) {
                return res.status(StatusCodes.NOT_FOUND.code).redirect("/home")
            }

            return res.status(StatusCodes.NOT_FOUND.code).json({
                code:StatusCodes.NOT_FOUND.code,
                message:"employee with this id doesn't exist or already deleted"
            })
        }

        if (isHtmlForm) {
            return res.redirect("/home")
        }

        return res.status(StatusCodes.OK.code).json({
            code:StatusCodes.OK.code,
            message:"employee deleted"
        })
    }catch(error){
        console.log("service/employeedelete: ",error)
        const isHtmlForm = req.is("application/x-www-form-urlencoded")
        if (isHtmlForm) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).redirect("/home")
        }

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code:StatusCodes.INTERNAL_SERVER_ERROR.code,
            message:"some server error occurred while deleting"

        })
    }
}
