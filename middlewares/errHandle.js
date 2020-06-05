module.exports = (err, req, res, next) => {
	// console.log(err.name);
	if (err.name == 'SequelizeValidationError') {
		let errors = err.errors.map(el => ({
			msg : el.message
		}))
		return res.status(400).json({
			errors
		})
	} else if (err.name == 'SequelizeUniqueConstraintError') {
		let errors = err.errors.map(el => ({
			msg : el.message
		}))
		return res.status(400).json({
			errors
		})
	} else if (err.name == 'Wrong Password Or Email') {
			let errors = [{msg: "Wrong Password Or Email"}]
			return res.status(404).json({
				errors
		})
	} 
	else if (err.name == 'Password is to Weak') {
		let errors = [{msg: "Password is to Weak"}]
		return res.status(400).json({
				errors
		})
	}
	else if (err.name == 'Email Already Used') {
		let errors = err.errors.map(el => ({
			msg : el.msg
		}))
		return res.status(400).json({
			errors
		})
	}
	else if (err.name == 'JsonWebTokenError') {
		let errors = [{msg: "Please Login First"}]
		return res.status(500).json({
			errors
		})
	}
	else {
		console.log(err);
		return res.status(500).json(err)
	}
}