//redirect if user is not logged in
const makeAuth = (req, res, next) => {
    if (!req.session.logged_in) {
        res.redirect('/login');
    }else {
        next();
    }
};

module.exports = makeAuth;