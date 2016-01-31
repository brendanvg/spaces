var router = require('routes')()

module.exports = router

router.addRoute('/delete/:id', function(m , db, req, res) {
	db.del(m.params.id, function(err){
		if (err) {res.end(err)}
		res.writeHead(302, {location: 'http://localhost:5001'})
		res.end()
	})
})