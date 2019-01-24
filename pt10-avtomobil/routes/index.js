var express = require('express');
var router = express.Router();
var connection = require('../config/db');
var passport = require('passport');

var validateSession = function(req,res,next){ //validasi yang udah login
	if(req.session.user){
		next();
	}else{
		res.redirect('/');
	}
}

var validateLogin= function(req,res,next){ //yang belom login
	if(req.session.user){
		res.redirect('/home');
	}else{
		next();
	}
}



//get Register page
router.get('/Register', function(req, res, next){res.render('Register', { title: 'Products!'});
});

router.get('/', validateLogin,function(req, res, next){
	res.render('LoginPage');
});

router.get('/home',validateSession,function(req,res,next){
	res.render('home');
})

//validate Products
router.get('/Products',validateSession,function(req,res,next){
	res.render('Products');
})

//validate BuyProducts  -- Page baru.
router.get('/Products',validateSession,function(req,res,next){
	res.render('Products');
})

//validate Price, adanya validasi, kita gabisa langsung masuk ke halaman tersebut.
router.get('/Price',validateSession,function(req,res,next){
	res.render('Price');
})

router.post('/doLogin',function(req,res,next){
	var username = req.body.username;
	var password = req.body.password;

	var sql = "SELECT * FROM user WHERE username=? AND password=?";
	var param = [username,password];

	connection.query(sql,param,function(err,result){
		if(err){
			console.log(err);
			throw err;
		}if(result.length!=0){
			req.session.user = result[0]; //buat nyimpen data
			res.redirect('/home');
		}else{
			res.redirect('/');
		}

	});
});


//tombol register
router.post('/doRegister',function(req,res,next){
	//Ambil data client

	var Id = req.body.Id;
	var Username = req.body.Username;
	var Password = req.body.Password;
	var Email = req.body.Email;
	
	//query
	var sql = "INSERT INTO user(Username,Password,Email) VALUES(?,?,?)";

	//Set param
	var param = [Username,Password,Email];

	//Connect to database
	connection.query(sql,param,function(err,result){
		if(err){
			console.log(err);
			throw err;
		}
		res.redirect('/');
	});

});

router.get('/doLogout',function(req,res,next){
	req.session.destroy();
	res.redirect('/');
});

module.exports = router;
