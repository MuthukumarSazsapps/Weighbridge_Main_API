import company from './company.js'
import login from './login.js'

const routes = app => {
    app.use('/login',login)
    app.use('/company',company);
}

export default routes;