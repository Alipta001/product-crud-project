


class HomeController{
    async home(req, res){
        return res.status(200).json({
            status: true,
            message: "Access Granted."
        })
    }
}

module.exports = new HomeController()