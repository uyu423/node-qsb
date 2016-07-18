var qsb = require('../');

var qs = new qsb().forceQuery('select * from tableName').printString();
//select * from tableName
