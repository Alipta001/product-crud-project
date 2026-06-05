


class HomeController{
    async home(req, res){
        res.render('home/home')
    }
}

module.exports = new HomeController()