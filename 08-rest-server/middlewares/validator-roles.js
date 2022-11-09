import { request, response } from "express"


const isAdmin = (req = request, res = response) => {
    
    if(!req.user){
        return res.status(500).json({
            msg: 'Please verify token first'
        });
    }

    const {role, name} = req.user;

    if(role !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: `${name} is not Admin User`
        })
    }

    next();
}

const hasRole = (...roles ) => {
    return (req, res = response, next) => {

        if(!req.user){
            return res.status(500).json({
                msg: 'Please verify token first'
            });
        }

        if(!roles.includes(req.user.role)) {
            return res.status(401).json({
                msg: `Service require one of this roles: ${roles}`
            })
        }

        next();
    }
}



export { isAdmin, hasRole }