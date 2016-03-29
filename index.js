var _ = require('lodash')

var axios = require('axios')
var axios = require('axios')

var async = require('async')

var colors = require('colors');

var Url = 'http://baymaxd.harbinhub.com:10000/api'


console.log('\033[2J');



async.eachSeries(require('./userinfo.js'), function (item, callback) {

    axios.get(Url + '/userinfo/' + item.a, {
        userId: item.a
    }).then(function (response) {

        if(response.data[0].userId ==item.a){

            var b = item.b.sort()
            var result = _.uniq(_.concat(_.keys(_.first(response.data)), _.keys(response.data[1][0]), _.keys(_.first(_.last(response.data))))).sort()
            
            if (_.isEqual(result, b)) {
                console.log('【获取用户档案】 passed test!😄'.green)
            } else {
                console.log('【获取用户档案】 failed 😭   !!!'.yellow.bgRed.bold)
            }

        }else{
            return;
        }
         
         callback();
         console.log('\n\n\n');

    })
})




//2.2 增加、删除用户档案中的症状
setTimeout(function(){
async.eachSeries(require('./optsymptoms.js'), function (item, callback) {
    axios.post(Url + '/optsymptoms', {
        symptomName: item.a,
        optSign: item.b,
        userId: item.c
    })
    .then(function (response) {
        if(response.data[0].optStatus =='Success' && response.data[0].userId ==item.c){
            var d = item.d.sort();
            var result = _.uniq(_.concat(_.keys(_.first(response.data)), _.keys(response.data[1][0]), _.keys(_.first(_.last(response.data))))).sort()
                
            if (_.isEqual(result, d)) {
                console.log('【增加、删除用户档案中的症状】 passed test!😄'.yellow)
            } else {
                console.log('【增加、删除用户档案中的症状】 failed 😭   !!!'.yellow.bgRed.bold)
            }
        }else{

            return;

        }
    })
         callback();
         console.log('\n\n\n');
 })

 }, 1000);
   
// //2.3 根据用户档案中的相关症状进行诊断
setTimeout(function(){
async.eachSeries(require('./disease.js'), function (item, callback) {
    axios.post(Url + '/disease', {
        userId: item.a,
        symptomUUID: item.b
      
    })
    .then(function (response) {
       
        if(response.data[0].optStatus =='Success' && response.data[0].userId ==item.a){
            var c = item.c.sort();
            var result = _.uniq(_.concat(_.keys(_.first(response.data)), _.keys(response.data[1][0]), _.keys(_.first(_.last(response.data))))).sort()
               
            if (_.isEqual(result, c)) {
                console.log('【根据用户档案中的相关症状进行诊断】 passed test!😄'.blue)
            } else {
                console.log('【根据用户档案中的相关症状进行诊断】 failed 😭   !!!'.blue.bgRed)
            }
        }else{

            return;
        }
       
    })
         callback();
         console.log('\n\n\n');
})
},2000);


// 查询某个疾病的相关症状
setTimeout(function(){
async.eachSeries(require('./symptomlist.js'), function (item, callback) {
    axios.get(Url + '/symptomlist/' + item.a, {
        diseaseId: item.a
    })
    .then(function (response) {
        var b = item.b.sort()
    
        var data = _.chain(response.data).map('symptomName').compact().sort().value()

        if (_.isEqual(b, data)) {
            console.log('【查询某个疾病的相关症状】 passed test!😄'.magenta)
        } else {
                console.log('【查询某个疾病的相关症状】 failed 😭   !!!'.magenta)
        }
 
    })

         callback();
         console.log('\n\n\n');
})
},3000);


//2.5 增加、删除用户档案中的相关用药记录
setTimeout(function(){
async.eachSeries(require('./optdrugs.js'), function (item, callback) {
    axios.post(Url + '/optdrugs', {
        drugName: item.a,
        optSign: item.b,
        userId: item.c
    })
    .then(function (response) {
        if(response.data[0].optStatus =='Success' && response.data[0].userId ==item.c){
            var d = item.d.sort();
            var result = _.uniq(_.concat(_.keys(_.first(response.data)), _.keys(response.data[1][0]), _.keys(_.first(_.last(response.data))))).sort()
                
            if (_.isEqual(result, d)) {
                console.log('【增加、删除用户档案中的相关用药记录】 passed test!😄'.cyan)
            } else {
                console.log('【增加、删除用户档案中的相关用药记录】 failed 😭   !!!'.cyan.bgRed.bold)
            }
        }else{

            return;

        }
    })
         callback();
         console.log('\n\n\n');
 })
},4000);



 //2.6 查询用户档案中的用药是否存在冲突
setTimeout(function(){
async.eachSeries(require('./drugaction.js'), function (item, callback) {
    axios.post(Url + '/drugaction   ', {
        userId: item.a
    })
    .then(function (response) {
        if(response.data[0].userId ==item.a){
            console.log('【查询用户档案中的用药是否存在冲突】 passed test!😄'.grey)
        }else{
            console.log('【查询用户档案中的用药是否存在冲突】 failed 😭   !!!'.cyan.bgRed.grey)
        }
    })

         callback();
         console.log('\n');
 })
},5000);

//2.7 判断某食物和药物同时服用是否存在冲突
setTimeout(function(){
async.eachSeries(require('./foodaction.js'), function (item, callback) {
    axios.post(Url + '/foodaction   ', {
        userId: item.a,
        drugId: item.b,
        foodName: item.c
    })
    .then(function (response) {
        if(response.data[0].userId ==item.a){
            console.log('【判断某食物和药物同时服用是否存在冲突】 passed test!😄'.white.bgMagenta)
        }else{
            console.log('【判断某食物和药物同时服用是否存在冲突】 failed 😭   !!!'.cyan.bgMagenta.white)
        }
    })

         callback();
         console.log('\n');
 })
},6000);












