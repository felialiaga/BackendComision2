import BaseRouter from "./BaseRouter.js";

class ViewsRouter extends BaseRouter{
    init() {


        this.get('/', ['PUBLIC'],(req, res) => {
            res.render('Home');
        });


        this.get('/register', ['PUBLIC'], (req, res) => {
            res.render('Register', {
                css: 'register'
            });
        });


        this.get('/login', ['PUBLIC'], (req, res) => {
            res.render('Login', {
                css: 'login'
            });
        });


        this.get('/profile', ['USER'] ,(req, res) => {
            console.log(req.user);
            if(!req.user){
                return res.redirect('/login')
            }
            res.render('Profile',{
                user:req.user
            })
        })
    }
}


const viewsRouter = new ViewsRouter();

export default viewsRouter.getRouter();