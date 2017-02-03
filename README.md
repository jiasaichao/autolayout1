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