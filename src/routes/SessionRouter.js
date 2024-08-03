import { passportCall } from "../middlewares/passportCall.js";
import BaseRouter from "./BaseRouter.js";
import jwt from 'jsonwebtoken';


class SessionsRouter extends BaseRouter {

    init() {

        this.post('/register', ['PUBLIC'], passportCall('register'), (req, res) => {
            res.sendSuccess('Registered');
        })

        this.post('/login', ['PUBLIC'], passportCall('login'), (req, res) => {
            console.log(req.user);

            const sessionUser = {
                name: `${req.user.firstName}  ${req.user.lastName}`,
                role: req.user.role,
                id: req.user._id
            };

            const token = jwt.sign(sessionUser, 'secreto', {expiresIn: '1d'});


            res.cookie('token', token).send({status:"success",message:"logged in"});
        })

        this.get('/current', async(req, res) => {
            if(!req.user) {
                return res.status(401).send({status: 'error', error: 'Not logged in'});
            };
            res.send(req.user);
        })
    }
}

const sessionsRouter = new SessionsRouter();
export default sessionsRouter.getRouter();