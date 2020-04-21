import extend from '../utils/context.js';
import models from '../models/index.js';
import docModifier from '../utils/doc-modifier.js'
import article from '../models/article.js';

export default {
    get: {
        dashboard(context) {

            models.article.getAll().then(response => {
                const articles = response.docs.map(docModifier);
                context.articles = articles;

                extend(context).then(function () {
                    this.partial('../views/article/dashboard.hbs');
                });
            })
        },
        create(context) {
            extend(context).then(function () {
                this.partial('../views/article/create.hbs');
            });
            
        },
        details(context) {
            
           
            const { articleId } = context.params;
            console.log(articleId)

            models.article.get(articleId).then(response => {

                const article = docModifier(response);
                Object.keys(article).forEach(key => context[key] = article[key]);
                console.log(article)
                console.log(localStorage)
                console.log(context)

                context.canDelete = article.uid === localStorage.getItem('userId');
              

                extend(context).then(function () {
                    this.partial('../views/article/details.hbs');
                });

            })
                .catch(e => console.error(e));
        },
        edit(context) {
            extend(context).then(function () {
                context.id = context.params.articleId;
                this.partial('../views/article/edit.hbs');
            });

            const { articleId } = context.params;

            models.article.get(causeId).then(response => {
                const formValues = response.data();
                const formRef = document.querySelector('form');
                fillFormWithData(formRef, formValues);
            });

        }
    },
    post: {
        create(context) {

            const data = {
                ...context.params,
                uid: localStorage.getItem('userId'),
                creator: "",
                isJavaScript: false,
                isCSharp: false,
                isJava: false,
                isPyton: false

                
                
            }
            console.log(context.params)
            console.log(data)
            const {title, category} = context.params
            
            if(category === "JavaScript")
            {
                data.isJavaScript = true
            }
            if(category === "C#")
            {
                data.isCSharp = true
            }
            if(category === "Java")
            {
                data.isJava = true
            }
            if(category === "Pyton")
            {
                data.isPyton = true
            }
            

            models.article.create(data)
                .then(response => {
                    context.redirect('#/dashboard');
                })
                .catch(e => console.error(e));
        }
    },
    del: {
        close(context) {
            const { articleId } = context.params;
            models.article.close(articleId).then(response => {
                context.redirect('#/dashboard');
            })
                .catch(e => console.error(e));
        }
    },
    put: {
        donate(context) {
            const { articleId, currentDonation } = context.params;

            models.article.get(articleId).then(response => {
                const article = docModifier(response);
                article.collectedFunds += Number(currentDonation);

                if (!article.donors.includes(localStorage.getItem('userEmail'))){
                    article.donors.push(localStorage.getItem('userEmail'));
                }

                return models.article.donate(articleId, article);
            })
            .then(response => {
                context.redirect(`#/article/details/${articleId}`);
            })

        },
        edit(context) {
            const { articleId } = context.params;
            const article = {
                ...context.params,
                uid: localStorage.getItem('userId')
            }

            models.article.edit(articleId, article)
                .then(response => {
                    context.redirect(`#/details/${articleId}`);
                })
                .catch(e => console.error(e));
        }
    }
}