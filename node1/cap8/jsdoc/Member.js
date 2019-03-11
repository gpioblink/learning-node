/**
 * @constructor
 * @classdesc メンバーについての情報を管理します
 * @param {string} firstName 姓
 * @param {string} lastName 名
 * @thtows {Error} firstNameかlastNameが足りていません
 * @auther taritari
 * @version 1.0.1
 */

 var Member = function(firstName, lastName){
     if(firstName === undefined || lastName === undefined){
         throw new Error('firstNameかlastNameが足りません');
     }
     this.firstName = firstName;
     this.lastName = lastName;
 }

 /**
  * メンバーに関する詳細情報を表示します
  * @return {String} メンバーの氏名
  * @deprecated {@link Member#toString} メソッドを代わりに使用してください
  */
 Member.prototype.getName = function(){
     return this.lastName + ' ' + this.firstName;
 }

 /**
  * Memberクラスの内容を文字列化します
  * @return {String} メンバーの内容
  */
 Member.prototype.toString = function() {
     return this.lastName + ' ' + this.firstName;
 }

 