function bq(str) { return "`" + str + "`"; };	//add Back Quote
function esc(str) { return "'" + str + "'"; };

module.exports = function() {
	this._comm = "";
	this._get = "";
	this._cols = "";
	this._values = "";
	this._set = "";
	this._from = "";
	this._join = "";
	this._where = "";
	this._limit = "";
	this._order = "";
	this._qs = "SELECT 'QUERY NOT BUILD'";
};

module.exports.prototype.forceQuery = function(query) {
	this._qs = query;
	return this;
};

module.exports.prototype.select = function(from, short) {
	if(this._from.length != 0) { this._from += ", "; }
	if(this._from.length == 0) { this._from = " FROM "; }
	this._comm = "SELECT ";
	this._from += bq(from);
	if(short != undefined) { this._from += " " + bq(short); }
	return this;
};

module.exports.prototype.update = function(table) {
	this._comm = "UPDATE ";
	this._from = bq(table);
	return this;
};

module.exports.prototype.insert = function(table) {
	this._comm = "INSERT ";
	this._from = "INTO " + bq(table);
	return this;
};

module.exports.prototype.delete = function(table) {
	this._comm = "DELETE ";
	this._from = "FROM " + bq(table);
	return this;
};

module.exports.prototype.join = function(table, short) {
	this._join += " JOIN " + bq(table);
	if(short != undefined) { this._join += " " + bq(short); }
	return this;
}

module.exports.prototype.on = function(a, b, c) {
	if(this._on.length != 0) { this._on += " AND "; }
	if(this._on.length == 0) { this._on += " ON "; }
	this._on += esc(a) + " " + esc(b) + " " + esc(c);
	return this;
}

module.exports.prototype.values = function(cols, values) {
	this._cols += "(";
	for(var i=0; i<cols.length; i++) {
		this._cols += bq(cols[i]);
		if(i < cols.length - 1) {
			this._cols += ", ";
		}
	}
	this._cols += ")";
	this._values += " VALUES (";
	for(var i=0; i<values.length; i++) {
		this._values += esc(values[i]);
		if(i < values.length - 1) {
			this._values += ", ";
		}
	}
	this._values += ")";
	return this;
}

module.exports.prototype.addValues = function(values) {
	this._values += ",(";
	for(var i=0; i<values.length; i++) {
		this._values += esc(values[i]);
		if(i < values.length - 1) {
			this._values += ", ";
		}
	}
	this._values += ")";
	return this;
}

module.exports.prototype.get = function(get) {
	if(this._get.length != 0) { this._get += ", ";	}
	this._get += bq(get);
	return this;
};

module.exports.prototype.set = function(set, value) {
	if(this._set.length != 0) { this._set += ", "; }
	if(this._set.length == 0) { this._set += " SET "; }
	this._set += bq(set) + " = " + esc(value);
	return this;
};


module.exports.prototype.where = function(a, b, c) {
	if(this._where.length != 0) { this._where += " AND "; }
	if(this._where.length == 0) { this._where += " WHERE "; }
	this._where += bq(a) + " " + b + " " + esc(c);
	return this;
}

module.exports.prototype.whereOr = function(a, b, c) {
	if(this._where.length != 0) { this._where += " OR "; }
	if(this._where.length == 0) { this._where += " WHERE "; }
	this._where += bq(a) + " " + b + " " + esc(c);
	return this;
}

module.exports.prototype.limit = function(a, b) {
	if(this._limit.length == 0) { this._limit += " LIMIT "; }
	this._limit += esc(a) + ", " + esc(b);
	return this;
}

module.exports.prototype.orderBy = function(col, sort) {
	this._order += " ORDER BY " + bq(col) + " " + sort;
	return this;
}

module.exports.prototype.groupBy = function(col) {
	this._order += " GROUP BY " + bq(col);
	return this;
}

module.exports.prototype.build = function() {
	if(this._comm == "SELECT ") { this._qs = this._comm + (this._get.length == 0 ? "*" : this._get) + this._from + this._join + this._where + this._order + this._limit + ";"; }
	if(this._comm == "UPDATE ") { this._qs = this._comm + this._from + this._set + this._where + ";"; }
	if(this._comm == "INSERT ") { this._qs = this._comm + this._from + this._cols + this._values + ";" };
	if(this._comm == "DELETE ") { this._qs = this._comm + this._from + this._where + ";" };
	return this;
}

module.exports.prototype.printObject = function() {
	console.log(this);
	return this;
}

module.exports.prototype.printString = function() {
	console.log(this._qs);
	return this;
}

module.exports.prototype.returnString = function() {
	return this._qs;
}
