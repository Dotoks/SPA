//Inastall Node modules with "npm install" command;
//Use live server to run this project;

import controllers from '../controllers/index.js';

const app = Sammy('#root', function () {

    this.use('Handlebars', 'hbs');

    //Home
    this.get('#/home', controllers.home.get.home);
  
    this.post('#/home', controllers.user.post.login)
    

    //User
    this.get('#/dashboard', controllers.article.get.dashboard)
    this.get('#/login', controllers.user.get.login);
    this.get('#/register', controllers.user.get.register);

    this.post('#/login', controllers.user.post.login);
    this.post('#/register', controllers.user.post.register);
    this.get('#/logout', controllers.user.get.logout);

    //Cause
    // this.get('#/dashboard', controllers.article.get.dashboard);
    this.get('#/create', controllers.article.get.create);
    this.get('#/details/:articleId', controllers.article.get.details);
    this.get('#/close/:articleId', controllers.article.del.close);
    

    this.post('#/create', controllers.article.post.create);

    this.get('#/edit/:articleId', controllers.article.get.edit)
    this.post('#/edit/:articleId', controllers.article.put.edit)
    // this.post('#/donate/:articleId', controllers.article.put.donate);


});

(() => {
    app.run('#/home');
})();