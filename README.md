#BarrageController<br>弹幕发射控制器
<br>
##How to use？
####1.你需要提前引入`barrage.js`文件和`barrage.css`文件
####2.接着你需要实例化BarrageController ({elemName}),这里的elemName指的是你所写的容纳弹幕的div的ID<br>
#####eg. ```var temp = new BarrageController({elemName: "barrage"});```
####3.接下来你需要做的就是调用addBarrage({})函数，这里的addBarrage()可以传入一下参数(*为必填)
* image =====> 发射弹幕的头像图片地址
<br><br>
* text  =====> 发射弹幕的内容(*)
<br><br>
* user  =====> 发射弹幕的用户昵称(*)
<br><br>
* textcolor =====> 发射弹幕的文字颜色(不填的话默认为黑色)
<br><br>
* sender =====> 发射弹幕者的身份(不填的话默认为NORMAL，选项如下)
 * NORMAL 普通人
 * VIP    贵宾
 * ADMIN  管理员
<br><br>
* position =====> 发射弹幕在弹幕容器中的出现类型(不填默认为NORMAL，选项如下)
 * NORMAL 普通弹幕，从左往右出现
 * TOP    顶部居中出现
 * BOTTOM 底部居中出现
 
####4.未完待续
