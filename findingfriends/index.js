import { createStore } from 'redux';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/app';

var express = require('express');
var router = express.Router();

//let store = createStore();


router.get('*', function(req, res){
	res.render('findingfriends/index');
});
module.exports = router;
