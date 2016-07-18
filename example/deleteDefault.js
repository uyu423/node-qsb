var qsb = require('../');

var qs = new qsb().delete('tableName')
	.where('idx', '=', 10)
	.build()
	.printString();
	//DELETE FROM `tableName` WHERE `idx` = '10';
