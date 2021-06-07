module.exports.formulario_inclusao_noticia = function(application, req, res){
    res.render('admin/form_add_noticia', {validacao:{}, noticia:{}})
}

module.exports.noticias_salvar = function(application, req, res){
    var noticia = req.body
        
    req.assert('titulo', 'Título obrigatório').notEmpty()
    req.assert('resumo', 'Resumo obrigatório').notEmpty()
    req.assert('resumo', 'O resumo deve conter entre 10 e 100 caracteres').len(10, 100)
    req.assert('autor', 'Autor obrigatório').notEmpty()
    req.assert('data_noticia', 'Data obrigatório').notEmpty().isDate({format: 'YYYY-MM-DD'})
    req.assert('noticia', 'Notícia obrigatório').notEmpty()

    var erros = req.validationErrors()

    if(erros){
        res.render('admin/form_add_noticia', {validacao: erros, noticia: noticia})
   
        return
    }

    // conexão com  bd
    var connection = application.config.dbConnection()
    // recuperar model
    var noticiasModel = new application.app.models.NoticiasDAO(connection)
    // salvarNoticia
    noticiasModel.salvarNoticia(noticia, function (error, result) {
        res.redirect('/noticias')
    })        
}