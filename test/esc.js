var qsb = require('../');

var qs = new qsb().insert('table').values(['cols'], ['aa\' aa']).build().printString();
