import bcrypt from "bcrypt"
import { StatusCodes } from "http-status-pro-js"
import fs from "fs"

export default function employeeUpdate(req, res) {
    try {
        const isHtmlForm = req.is("application/x-www-form-urlencoded")

        let { id, email, password, name, department, basic_salary } = req.body
        if (!fs.existsSync("Employee.json")) {
            if (isHtmlForm) {
                return res.status(StatusCodes.NOT_FOUND.code).redirect("/home")
            }

            return res.status(StatusCodes.NOT_FOUND.code).json({
                code: StatusCodes.NOT_FOUND.code,
                message: "employee not found"
            })
        }

        let data = JSON.parse(fs.readFileSync("Employee.json", "utf-8"))

        let index = data.findIndex((value) => value.email === email)

        if (index === -1) {
            if (isHtmlForm) {
                return res.status(StatusCodes.NOT_FOUND.code).redirect("/home")
            }

            return res.status(StatusCodes.NOT_FOUND.code).json({
                code: StatusCodes.NOT_FOUND.code,
                message: "employee not found"
            })
        }

        const savedPassword = data[index].password
        let isMatch = false

        if (typeof savedPassword === "string" && savedPassword.startsWith("$2")) {
            isMatch = bcrypt.compareSync(password, savedPassword)
        } else {
            isMatch = password === savedPassword
        }

        if (!isMatch) {
            if (isHtmlForm) {
                const redirectId = id || data[index].id
                return res.status(StatusCodes.UNAUTHORIZED.code).redirect(`/employee/edit/${redirectId}`)
            }

            return res.status(StatusCodes.UNAUTHORIZED.code).json({
                code: StatusCodes.UNAUTHORIZED.code,
                message: "you are not allowed to make changes to this employee"
            })
        }

        data[index].name = name
        data[index].department = department
        data[index].basic_salary = basic_salary

        fs.writeFileSync("Employee.json", JSON.stringify(data, null, 2))
        if (isHtmlForm) {
            return res.redirect("/home")
        }

        return res.status(StatusCodes.ACCEPTED.code).json({
            code: StatusCodes.ACCEPTED.code,
            message: "employee details updated"
        })

    } catch (error) {
        console.log("service/employeeUpdate: ", error)
        const isHtmlForm = req.is("application/x-www-form-urlencoded")

        if (isHtmlForm) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).redirect("/home")
        }

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code: StatusCodes.INTERNAL_SERVER_ERROR.code,
            message: StatusCodes.INTERNAL_SERVER_ERROR.message
        })
    }
}
