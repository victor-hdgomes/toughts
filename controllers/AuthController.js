const User = require('../models/User')
const bcrypt = require('bcryptjs')

module.exports = class AuthController{
    static login(req,res){
        res.render('auth/login')
    }
    static async loginPost(req,res){
        const {email, password} = req.body

        //Find User
        const user = await User.findOne({where: {email: email}})
        if (!user) {
            req.flash('message', 'E-mail não encontrado!')
            res.render('auth/login')
            return
        }

        //Check if passwords match
        const passwordMath = bcrypt.compareSync(password, user.password)
        if (!passwordMath) {
            req.flash('message', 'Senha inválida!')
            res.render('auth/login')
            return
        }

        //Initialize session
        req.session.userid = user.id
        req.flash('message', 'Login realizado com sucesso!')
        req.session.save(()=>{
            res.redirect('/')
        })
    }
    static register(req,res){
        res.render('auth/register')
    }
    static async registerPost(req,res){
        const {name, email, password, confirmpassword} = req.body

        //Password match with validation
        if (password!=confirmpassword) {
            req.flash('message', 'As senhas não conferem, tente novamente!')
            res.render('auth/register')
            return
        }

        //Check if email is correct
        const check = /\S+@\S+\.\S+/
        if (!check.test(email)) {
            req.flash('message', 'Email não foi escrito corretamente!')
            res.render('auth/register')
            return
        }

        //Check if user exists
        const checkIfUserExists = await User.findOne({where: {email: email}})
        if (checkIfUserExists) {
            req.flash('message', 'E-mail está em uso!')
            res.render('auth/register')
            return
        }

        //Create a password
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password, salt)

        const user = {
            name, email, password: hashedPassword
        }

        try {
            const createdUser = await User.create(user)

            //Initialize session
            req.session.userid = createdUser.id

            req.flash('message', 'Cadastro realizado com sucesso!')

            req.session.save(()=> {
                res.redirect('/')
            })
        } catch (error) {
            console.log(error)
        }
    }
    static logout(req,res){
        req.session.destroy()
        res.redirect('/login')
    }
}