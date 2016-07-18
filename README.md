# node-qsb
Node.js Database Query String Builder (QSB) for Mysql/MariaDB

# Summary
* node-qsb is very simple Database Query String Builder. create String object only. 
* It is independent of the Database driver module.
* Introduce Article : http://luckyyowu.tistory.com/345 (Korean)

# Available DBMS
* MySQL, MariaDB

# Installation
<pre>npm install node-qsb</pre>

# Example
## SELECT Query
### Default
```javascript
var qsb = require('node-qsb');

var qs = new qsb().select('tableName').where('idx', '>', '10').build();
qs.printString(); //SELECT * FROM `tableName` WHERE `idx` > '10';
console.log(qs.returnString()); //SELECT * FROM `tableName` WHERE `idx` > '10';

qs.where('name', '=', 'Yowu').build();
console.log(qs.returnString()); 
//SELECT * FROM `tableName` WHERE `idx` > '10' AND `name` = 'Yowu';

qs.whereOr('name', '=', 'Yu Yongwoo').build();
console.log(qs.returnString()); 
//SELECT * FROM `tableName` WHERE `idx` > '10' AND `name` = 'Yowu' OR `name` = 'Yu Yongwoo';
```
### Not Using 'Select *'
```javascript
var qsb = require('node-qsb');

var qs = new qsb().select('tableName').get('col1').get('col2').build();
console.log(qs.returnString());
//SELECT `col1`, `col2` FROM `tableName`;
```
### JOIN, LIMIT, ORDER BY
```javascript
var qsb = require('node-qsb');

var qs = new qsb().select('tableName', 'TN1')
	.join('tableName2', 'TN2')
	.where('TN1.idx', '<=', 1
	.whereOr('TN2.idx', '=', 'TN1.idx')
	.build().printString();
	//SELECT * FROM `tableName` `TN1` JOIN `tableName2` `TN2` WHERE `TN1`.`idx` <= '10' OR `TN2`.`idx` = 'TN1.idx';

qs.limit(0, 10).build();
console.log(qs.returnString());
//SELECT * FROM `tableName` `TN1` JOIN `tableName2` `TN2` WHERE `TN1`.`idx` <= '10' OR `TN2`.`idx` = 'TN1.idx' LIMIT '0', '10';

qs.orderBy('TN1.idx', 'desc').build();
console.log(qs.returnString());
//SELECT * FROM `tableName` `TN1` JOIN `tableName2` `TN2` WHERE `TN1`.`idx` <= '10' OR `TN2`.`idx` = 'TN1.idx' ORDER BY `TN1`.`idx` desc LIMIT '0', '10';
```

## INSERT Query
```javascript
var qsb = require('node-qsb');

var qs1 = new qsb().insert('tableName')
	.values(['colName'], ['Value'])
	.build().printString();
	//INSERT INTO `tableName`(`colName`) VALUES ('value');

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
```

## UPDATE Query
```javascript
var qsb = require('node-qsb');

var qs = new qsb().update('tableName')
	.set('name', 'Yowu')
	.where('idx', '=', '423')
	.build().printString();
	//UPDATE `tableName` SET `name` = 'Yowu' WHERE `idx` = '423';
	
qs.set('email', 'uyu423@gmail.com').build().printString();
//UPDATE `tableName` SET `name` = 'Yowu', `email` = 'uyu423@gmail.com' WHERE `idx` = '423';
```

## DELETE Query
```javascript
var qsb = require('node-qsb');

var qs = new qsb().delete('tableName')
	.where('idx', '=', 10)
	.build()
	.printString();
	//DELETE FROM `tableName` WHERE `idx` = '10';
```

## Make Query by Force Input
```javascript
var qsb = require('node-qsb');

var qs = new qsb().forceQuery('select * from tableName').printString();
//select * from tableName
```
