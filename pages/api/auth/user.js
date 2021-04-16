import withSession from '../../../lib/session'



export default withSession(async (req, res) => {
  
  const user = req.session.get('user')


  if (user) {
   console.log('use user: '+Object.keys(user))

    res.status(200).json(user)
  } else {
    res.json({
      isLoggedIn: false
    })
  }
})
