
export const accountHasBeenVerified = (req, res, next)=>{

    

    if(req.user.verified){
        return next()
        }

        ;
    

    return res.status(400).json({
        success:false,
        message:'User no verifico su cuenta'
    })

}