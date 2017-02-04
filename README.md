# 自动布局
## 运行
* 开发环境执行 `npm run start`
## 容器组件
## 数据持久化LokiJS
安装 `npm install lokijs`
### 功能
* 它使用JSON格式将数据保存到磁盘，使数据具备了可移植性。 
* 支持字段索引，提供更快地文档访问速度。'id'字段自动建立索引。
* Views视图，您可以声明自定义视图函数来返回结果集基于复杂的逻辑。
* Map reduce 可以声明映射和减少函数来从数据库中检索数据聚合。
### 使用实例
创建数据库:  
`var db = new loki('loki.json') `   
创建数据集:  
`var children = db.addCollection('children')`  
查找数据集collections是一个数组
`var children = db.collections.find((val)=>val.name=='children')`
插入文档:  
```
children.insert({name:'Sleipnir', legs: 8})
children.insert({name:'Jormungandr', legs: 0})
children.insert({name:'Hel', legs: 2})
```

获取文档:
```
children.get(1); // returns Sleipnir
children.find( {'name':'Sleipnir'} )//如果两个属性第二个好像不起作用用findObjects这个，返回数组，没有filter，有findOne
children.find( { legs: { '$gt' : 2 } } )
children.findObject( {'name':'Sleipnir',elementId:1} )//查询条件是且关系，返回一个对象，findObjects是返回一个数组
```
其他可用方法实例 Resultset chaining:
limit - 允许将结果限制为特定文档计数。
offset - 允许从结果中跳过第一数量的文档。
branch - 用于将查询路径拆分为多个分支。
simplesort - 只传递属性名称，您的resulset将按此排序。
sort - 允许你提供自己的比较函数来对结果集进行排序。
compoundort - 允许您基于多个属性按升序或降序排序。
update - 用于对当前在结果集中的所有文档运行更新操作（javascript函数）。这个常用更新操作，一个
remove - 从集合中移除当前在resultset中的所有文档对象（以及resultset）
map - 映射到一个新的匿名集合，提供一个map函数
mapReduce - 允许您为当前结果集数据指定一个映射函数和一个reduce函数。
eqJoin - 左连接两组数据。连接键可以定义或计算属性
transform - 在结果集级别，这需要一个原始变换数组。当开始链时，命名的或原始的变换可以被传递到链方法。有关更多详细信息，请参阅“集合转换”Wiki页面。
```
var results = coll.chain()
                  .find({'Age': {'$gt':20}})
                  .where(function(obj) {
                     return obj.Country.indexOf('FR') === 0;
                   })
                  .simplesort('Name')
                  .offset(100)
                  .limit(25)
                  .data();
```
'Find'运算符示例:
$eq / $ne : 
```
// explicit
var results = coll.find({'Name': { '$eq' : 'Odin' }});

// implicit (assumes equality operator)
results = coll.find({'Name': 'Odin'});

// 不相等
results = coll.find({'legs': { '$ne' : 8 }});
```
$regex:
```
// pass in raw regex
var results = coll.find({'Name': { '$regex' : /din/ }});

// or pass in string pattern only
results = coll.find({'Name': { '$regex': 'din' }});

// or pass in [pattern, options] string array
results = coll.find({'Name': { '$regex': ['din', 'i'] }});
```

If using regex operator within a named transform or dynamic view filter, it is best to use the latter two examples since raw regex does not seem to serialize/deserialize well.

$in:
```
var users = db.addCollection("users");
users.insert({ name : 'odin' });
users.insert({ name : 'thor' });
users.insert({ name : 'svafrlami' });

// match users with name in array set ['odin' or 'thor']
var results = users.find({ 'name' : { '$in' : ['odin', 'thor'] } });
```
$between
```
// match users with count value between 50 and 75
var results = users.find({ count : { '$between': [50, 75] });
```
$contains / $containsAny / $containsNone
```
var users = db.addCollection("users");
users.insert({ name : 'odin', weapons : ['gungnir', 'draupnir']});
users.insert({ name : 'thor', weapons : ['mjolnir']});
users.insert({ name : 'svafrlami', weapons : ['tyrfing']});
users.insert({ name : 'arngrim', weapons : ['tyrfing']});

// returns 'svafrlami' and 'arngrim' documents
var results = users.find({ 'weapons' : { '$contains' : 'tyrfing' } });

// returns 'svafrlami', 'arngrim', and 'thor' documents
results = users.find({ 'weapons' : { '$containsAny' : ['tyrfing', 'mjolnir'] } });

// returns 'svafrlami' and 'arngrim'
results = users.find({ 'weapons' : { '$containsNone' : ['gungnir', 'mjolnir'] } });
```
Composing Nested Queries

$and : 
```
// fetch documents matching both sub-expressions
var results = coll.find({
  '$and': [{ 
      'Age' : {
        '$gt': 30
      }
    },{
      'Name' : 'Thor'
    }]
});
```
$or : 
```
// fetch documents matching any of the sub-expressions
var results = coll.find({
  '$or': [{ 
      'Age' : {
        '$gte': '40'
      }
    },{
      'Name' : 'Thor'
    }]
});
```
创建动态视图:
```
var legs = children.addDynamicView('legs');
legs.applyFind( { legs: { '$gt' : 2 } )
legs.applySimpleSort('legs');
legs.data();
```
MapReduce（数据聚合）:
```
children.mapReduce( 
  function( obj ){ return obj.legs; } , 
  function( array ) { 
    var sum = 0;
    for (var i=0; i < array.length; i++ ){ 
      sum += array[i];
    }
    return ( sum / array.length ).toFixed(2);
 });
```
1.4版本新增了NativeScript应用适配器。请看下面的示例代码：
```
// 基本要求
var fs = require("file-system");
var Loki = require("./node_modules/lokijs/src/lokijs.js");
var LokiNativeScriptAdapter = require("./node_modules/loki-nativescript-adapter/loki-nativescript-adapter.js");

// 配置Loki
var path = fs.path.join(fs.knownFolders.currentApp().path, "database.db");
var db = new Loki(path, {
    adapter: new LokiNativeScriptAdapter()
});

//保存一些影片
var movies = db.addCollection("movies");
movies.insert({ title: "Ghost Busters", year: 1984 });
movies.insert({ title: "Ghost Busters II", year: 1989 });
movies.insert({ title: "Ghost Busters", year: 2016 });
console.log(movies.data);
db.saveDatabase();

//加载并找出部分影片
db.loadDatabase({}, function() {
    var movies = db.getCollection("movies");
    console.log(movies.find({ title: "Ghost Busters" }));
});
```
该版本新增或改进了若干查询操作符，如$where、$ne、$len、$keyin、$nkeyin、$type、$contains和$containsAny。存活时间（TTL）特性也十分方便，它会自动删除一定时间间隔内没有被访问的对象。举例来说，这在存储会话或游戏中非常有用。
## 参考资料

[Electron + React + Node.js + ES6 开发桌面软件](http://blog.csdn.net/arnozhang12/article/details/51735815)    
[Electron 中文文档](http://www.w3cschool.cn/electronmanual/)  
[LokiJs的api文档](https://rawgit.com/techfort/LokiJS/master/jsdoc/index.html)