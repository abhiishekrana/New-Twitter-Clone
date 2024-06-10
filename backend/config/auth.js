import jwt from "jsonwebtoken";
const isAuthenticated = async (req, res, next) => {
    try {
        const tokendata = "njkkwefwwef";
        const  token  = req.cookies.token;
        console.log(token);
        if (!token) {
            return res.status(401).json({
                message: "User not authenticated.",
                success: false
            })
        }
        const decode = await jwt.verify(token,tokendata);
        console.log(decode);
        req.user = decode.userid;
        next();

    } catch (error) {

    }
}
export default isAuthenticated;