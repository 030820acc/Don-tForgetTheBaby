const logoutUser = (req, res) => {
    delete req.session.auth;
};
