var qsb = require('../');

var qs1 = new qsb().insert('tableName')
	.values(['colName'], ['Value'])
	.build().printString();
	//INSERT INTO `tableName`(`colName`) VALUES ('Value');

var params = {
	cols : ['col1', 'col2', 'col3', 'col4'],
	vals : ['val1', 'val2', 'val3', 4000],
}
var qs2 = new qsb().insert('tableName')
	.values(params.cols, params.vals)
	.build().printString();
	//INSERT INTO `tableName`(`col1`, `col2`, `col3`, `col4`) VALUES ('val1', 'val2', 'val3', '4000');

qs2.addValues(params.vals).build().printString();
//INSERT INTO `tableName`(`col1`, `col2`, `col3`, `col4`) VALUES ('val1', 'val2', 'val3', '4000'),('val1', 'val2', 'val3', '4000');
