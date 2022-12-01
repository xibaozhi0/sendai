const {AuthenticationError} =require('apollo-server')
const jwt=require('jsonwebtoken')

module.exports=(context) => { 
    //context={...header}
    const authHeader=context.req.headers.authorization
    if (authHeader) {
        const token=authHeader.split('Bearer')[1];
        if (token) {
            try{
                const user=jwt.verify(token,"UNSAGE_STRING")
                return user
            }catch(err){
                throw new AuthenticationError("invalid/expired token")
            }
        }
        throw new ("authentication token must be bearer [token]")
    }
    throw new error ("authorization header must be provided")
 }