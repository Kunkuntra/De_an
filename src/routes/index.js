const siteRouter = require('./site.route');
const productRouter = require('./product.route');
const storedRouter = require('./stored.route');
const trashRouter = require('./trash.route');
const authRouter = require('./auth.route');
const userRouter = require('./user.route');

module.exports =(app)=>{

    app.use('/user', userRouter);
    app.use('/auth', authRouter);
    app.use('/trash',trashRouter);
    app.use('/stored', storedRouter);
    app.use('/product', productRouter);
    app.use('/', siteRouter);


}
