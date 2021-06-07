module.exports = function(application){ 
    //função de call back
    application.get('/', function(req, res){
        application.app.controllers.home.index(application, req, res)
    });
}