var qsb = require('../');

var qs = new qsb().select('tableName').get('col1').get('col2').build();
console.log(qs.returnString());
//SELECT `col1`, `col2` FROM `tableName`;
