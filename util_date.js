Date.prototype.mmdd = function() {
      return (this.getMonth() + 1) +
      "/" +  this.padZero(this.getDate());
};
Date.prototype.mmddyyyy = function() {
      return (this.getMonth() + 1) +
      "/" +  this.padZero(this.getDate()) +
      "/" +  this.padZero(this.getFullYear());
};
Date.prototype.yyyymmdd = function() {
      return this.getFullYear()  +
      "/" +  this.padZero((this.getMonth() + 1)) +
      "/" +  this.padZero(this.getDate());
};
Date.prototype.yyyymmINT = function() {
      return this.getFullYear()  +
      this.padZero((this.getMonth() + 1));
};
Date.prototype.yyyymmddjustDigit = function() {
      return Number(this.getFullYear()  +
      this.padZero((this.getMonth() + 1)) +
      this.padZero(this.getDate()));
};
Date.prototype.yyyymmdddash = function() {
      return this.getFullYear()  +
      "-" +  this.padZero((this.getMonth() + 1)) +
      "-" +  this.padZero(this.getDate());
};
Date.prototype.yyyymmdddot = function() {
      return this.getFullYear()  +
      "." +  this.padZero((this.getMonth() + 1)) +
      "." +  this.padZero(this.getDate());
};
Date.prototype.mmddyyyytime = function(){
      return (this.getMonth() + 1) +
      "/" +  this.padZero(this.getDate()) +
      "/" +  this.padZero(this.getFullYear()) +
      " " + this.padZero(this.getHours()) + 
      ":" + this.padZero(this.getMinutes()) + 
      ":" + this.padZero(this.getSeconds());
};
Date.prototype.getLocalDate = function(nation) {
      var offset = this.getTimezoneOffset() / 60;
      var hours = this.getHours();

      this.setHours(hours - offset);
      return this;   
}

Date.prototype.yyyymmddfordb = function() {
   var yyyy = this.getFullYear();
   var mm = this.getMonth() < 9 ? "0" + (this.getMonth() + 1) : (this.getMonth() + 1); // getMonth() is zero-based
   var dd  = this.getDate() < 10 ? "0" + this.getDate() : this.getDate();
   return "".concat(yyyy).concat("-").concat(mm).concat("-").concat(dd);
};

Date.prototype.yyyymmddfordbUTC = function() {
   var yyyy = this.getUTCFullYear();
   var mm = this.getUTCMonth() < 9 ? "0" + (this.getUTCMonth() + 1) : (this.getUTCMonth() + 1); // getMonth() is zero-based
   var dd  = this.getUTCDate() < 10 ? "0" + this.getUTCDate() : this.getUTCDate();
   return "".concat(yyyy).concat("-").concat(mm).concat("-").concat(dd);
};

Date.prototype.yyyymmddtime = function(){
      return this.getFullYear()  +
      "/" +  this.padZero((this.getMonth() + 1)) +
      "/" +  this.padZero(this.getDate())+
      " " + this.padZero(this.getHours()) + 
      ":" + this.padZero(this.getMinutes()) + 
      ":" + this.padZero(this.getSeconds());
};
Date.prototype.yyyymmddtimeDash = function(){
      return this.getFullYear()  +
      "-" +  this.padZero((this.getMonth() + 1)) +
      "-" +  this.padZero(this.getDate())+
      " " + this.padZero(this.getHours()) + 
      ":" + this.padZero(this.getMinutes()) + 
      ":" + this.padZero(this.getSeconds());
};
Date.prototype.yyyymmddtimeDashWithT = function(){
      return this.getFullYear()  +
      "-" +  this.padZero((this.getMonth() + 1)) +
      "-" +  this.padZero(this.getDate())+
      "T" + this.padZero(this.getHours()) + 
      ":" + this.padZero(this.getMinutes()) + 
      ":" + this.padZero(this.getSeconds());
};
Date.prototype.yyyymmddtimeUTC = function(){
      return this.getUTCFullYear()  +
      "/" +  this.padZero((this.getUTCMonth() + 1)) +
      "/" +  this.padZero(this.getUTCDate())+
      " " + this.padZero(this.getUTCHours()) + 
      ":" + this.padZero(this.getUTCMinutes()) + 
      ":" + this.padZero(this.getUTCSeconds());
};

Date.prototype.yyyymmddstarttime = function(){
      return this.getFullYear()  +
      "/" +  this.padZero((this.getMonth() + 1)) +
      "/" +  this.padZero(this.getDate())+
      " " + "00:00:00";
};
Date.prototype.yyyymmddendtime = function(){
      return this.getFullYear()  +
      "/" +  this.padZero((this.getMonth() + 1)) +
      "/" +  this.padZero(this.getDate())+
      " " + "23:59:59";
};
Date.prototype.yyyymmddstarttimedash = function(){
      return this.getFullYear()  +
      "-" +  this.padZero((this.getMonth() + 1)) +
      "-" +  this.padZero(this.getDate())+
      "T" + "00:00:00";
};
Date.prototype.yyyymmddendtimedash = function(){
      return this.getFullYear()  +
      "-" +  this.padZero((this.getMonth() + 1)) +
      "-" +  this.padZero(this.getDate())+
      "T" + "23:59:59";
};
Date.prototype.yyyymmddINT = function() {
      return this.getFullYear()  +
      this.padZero((this.getMonth() + 1)) +
      this.padZero(this.getDate());
};
Date.prototype.padZero =function (n) {
      n = n + '';
      return n.length >= 2 ? n : new Array(2 - n.length + 1).join('0') + n;
}
Date.prototype.convert = function(d) {
      // Converts the date in d to a date-object. The input can be:
      //   a date object: returned without modification
      //  an array      : Interpreted as [year,month,day]. NOTE: month is 0-11.
      //   a number     : Interpreted as number of milliseconds
      //                  since 1 Jan 1970 (a timestamp) 
      //   a string     : Any format supported by the javascript engine, like
      //                  "YYYY/MM/DD", "MM/DD/YYYY", "Jan 31 2009" etc.
      //  an object     : Interpreted as an object with year, month and date
      //                  attributes.  **NOTE** month is 0-11.
      return (
            d.constructor === Date ? d :
            d.constructor === Array ? new Date(d[0],d[1],d[2]) :
            d.constructor === Number ? new Date(d) :
            d.constructor === String ? new Date(d) :
            typeof d === "object" ? new Date(d.year,d.month,d.date) :
            NaN
      );
}

Date.prototype.compare = function(d){
      //  -1 : if this < d
      //   0 : if this = d
      //   1 : if this > d
      // NaN : if this or d is an illegal date      
      var day = new Date(d);
      return (
            isFinite(a=this.convert(this).valueOf()) &&
            isFinite(b=this.convert(day).valueOf()) ?
            (a>b)-(a<b) :
            NaN
      );
}

function getNextDay(_date, _count){
      var d = new Date(_date);
      d.setDate(d.getDate() + _count);
      return new Date(d);
}

module.exports = getNextDay;