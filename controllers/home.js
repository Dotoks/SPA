import extend from '../utils/context.js';
import models from '../models/index.js'
import docModifier from '../utils/doc-modifier.js'
export default {
    get: {
        home(context){
          
            

            extend(context).then(function(){
                this.partial('../views/home/home.hbs');
              
            });
           
        
        }
            

    },
    post: {
        home(context) {
            const { email, password } = context.params;
            models.user.login(email, password)
                .then(response => {
                    context.user = response;
                    context.redirect('#/register');
                })
                .catch(e => console.error(e));
    }
}
}