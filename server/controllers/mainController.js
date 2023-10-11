
exports.homepage = async (req, res) => {
        const locals = {
            title : "home",
            description : "landing page for node js "
        }
        res.render('index', locals)
    
}