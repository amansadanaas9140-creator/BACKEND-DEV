import express from "express"
import helmet from "helmet"
import cors from "cors"
import dotenv from "dotenv"
import path from "path"
import fs from "fs"
import { fileURLToPath } from "url"
import router from "./employee/router/app.route.js"

dotenv.config()

const app = express()


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.set("views", path.join(__dirname, "employee/views"))   
app.set("view engine", "ejs")

app.use(helmet())
app.use(express.static(path.join(__dirname, "employee", "public")))
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(express.json())

const port = process.env.PORT || 8000

function getEmployees() {
    try {
        if (!fs.existsSync("Employee.json")) {
            return []
        }
        const data = fs.readFileSync("Employee.json", "utf-8")
        return JSON.parse(data || "[]")
    } catch (error) {
        console.log("index/getEmployees: ", error)
        return []
    }
}

app.get("/home", (req, res) => {
    const employees = getEmployees()
    res.render("index", { employees })
})

app.get("/employee/add", (req, res) => {
    res.render("add")
})

app.get("/employee/login", (req, res) => {
    res.render("login")
})

app.get("/employee/signup", (req, res) => {
    res.render("signup")
})

app.get("/employee/edit/:id", (req, res) => {
    const id = Number(req.params.id)
    const employees = getEmployees()
    const employee = employees.find((value) => value.id === id)

    if (!employee) {
        return res.redirect("/home")
    }

    res.render("edit", { employee })
})

app.use("/employee", router)
app.use("/admin", router)

app.listen(port, () => {
    console.log("connected to the server.")
})
