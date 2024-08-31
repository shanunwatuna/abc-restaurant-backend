const User = require('../models/User');

const handleLogout = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204);
    const refreshToken = cookies.jwt;

    // TODO: check user refreshToken equals to variable
    // const users = await User.find({});
    // if (!user) return res.sendStatus(403);
    // res.clearCookie('jwt', {httpOnly: true});
    const user = await User.findOne({ refreshToken }).exec();
    if (!user) {
        res.clearCookie('jwt', {httpOnly: true, sameSite: 'none'});
        return res.sendStatus(204);
    }

    // setup delete refresh token from db
    user.refreshToken = '';
    const result = await user.save();
    console.log(result);

    res.clearCookie('jwt', { httpOnly:true });
    res.sendStatus(204);
}

module.exports = { handleLogout };