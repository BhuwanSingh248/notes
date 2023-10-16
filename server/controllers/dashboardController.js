
exports.dashboard = async (req, res) => {
    console.log("dashbaord");
    const locals = {
        title : "dashboard",
        description : "landing page for node js "
    }
    res.render('dashboard/index', {locals, layout:'../views/layout/dashboard'});

}