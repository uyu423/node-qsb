var qsb = require('../');

var qs = new qsb().select('tableName', 'TN1')
	.join('tableName2', 'TN2')
	.where('TN1.idx', '<=', 10)
	.whereOr('TN2.idx', '=', 'TN1.idx')
	.build().printString();
	//SELECT * FROM `tableName` `TN1` JOIN `tableName2` `TN2` WHERE `TN1`.`idx` <= '10' OR `TN2`.`idx` = 'TN1.idx';

qs.limit(0, 10).build();
console.log(qs.returnString());
//SELECT * FROM `tableName` `TN1` JOIN `tableName2` `TN2` WHERE `TN1`.`idx` <= '10' OR `TN2`.`idx` = 'TN1.idx' LIMIT '0', '10';

qs.orderBy('TN1.idx', 'DESC')
  .orderBy('TN2.name', 'ASC')
  .build();
console.log(qs.returnString());
//SELECT * FROM `tableName` `TN1` JOIN `tableName2` `TN2` WHERE `TN1`.`idx` <= '10' OR `TN2`.`idx` = 'TN1.idx' ORDER BY `TN1`.`idx` desc LIMIT '0', '10';
