var qsb = require('../');

var qs = new qsb().select('tableName').where('idx', '>', '10').build();
qs.printString(); //SELECT * FROM `tableName` WHERE `idx` > '10';
console.log(qs.returnString()); //SELECT * FROM `tableName` WHERE `idx` > '10';

qs.where('name', '=', 'Yowu').build();
console.log(qs.returnString()); //SELECT * FROM `tableName` WHERE `idx` > '10' AND `name` = 'Yowu';

qs.whereOr('name', '=', 'Yu Yongwoo').build();
console.log(qs.returnString()); //SELECT * FROM `tableName` WHERE `idx` > '10' AND `name` = 'Yowu' OR `name` = 'Yu Yongwoo';
