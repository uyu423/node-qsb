var qsb = require('../');

var qs = new qsb().update('tableName')
	.set('name', 'Yowu')
	.where('idx', '=', '423')
	.build().printString();
	//UPDATE `tableName` SET `name` = 'Yowu' WHERE `idx` = '423';
	
qs.set('email', 'uyu423@gmail.com').build().printString();
//UPDATE `tableName` SET `name` = 'Yowu', `email` = 'uyu423@gmail.com' WHERE `idx` = '423';
