var config=require('../config');

module.exports=function(req,res,next){
  const auth = {login: config.apiUsername, password: config.apiPassword} // change this

  const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
  const [login, password] = new Buffer(b64auth, 'base64').toString().split(':')

  // Verify login and password are set and correct
  if (!login || !password || login !== auth.login || password !== auth.password) {
    res.set('WWW-Authenticate', 'Basic realm="nope"') // change this
    res.status(401).send('Request is not authorized. You must pass credentials provided by administrator via HTTP Basic Authorization') // custom message
    return
  }
  next();
}
