import Vue from 'vue'
// import moment from 'moment'
// import format from 'date-fns/format'
// // 自定义过滤器
// Vue.filter('date-format', function (value, formatStr='YYYY-MM-DD HH:mm:ss') {
//   // return moment(value).format(formatStr)
//   return format(value, formatStr)
// })
Vue.filter('date-format',function(value){
  var date = new Date(value);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  var D = date.getDate() + ' ';
  var h = date.getHours() + ':';
  var m = date.getMinutes() + ':';
  var s = date.getSeconds();
  return Y + M + D + h + m +s;
}
)

// exports.dateforame = time =>{
//   var date = new Date(time);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
//   var Y = date.getFullYear() + '-';
//   var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
//   var D = date.getDate() + ' ';
//   return Y + M + D;
// }