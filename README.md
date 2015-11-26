#BarrageController<br>弹幕发射控制器
<br>
##How to use？
####1.你需要提前引入`barrage.js`文件和`barrage.css`文件
####2.接着你需要实例化BarrageController ({elemName}),这里的elemName指的是你所写的容纳弹幕的div的ID<br>
#####eg. 
``` js
var temp = new BarrageController({elemName: "barrage"});
```
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

#####eg.
``` js
temp.addBarrage({
    image: "http://7xoehm.com1.z0.glb.clouddn.com/main2.jpg",
    text: "发射内容",
    user: "admin",
    sender: "ADMIN",
    position: "NORMAL"
});
```
####4.关于新添加的一段时间内弹幕无更新则初始化出现顺序的说明
#####BarrageController新添加了一个函数——setClearTime(newTime)，调用此函数可以设置弹幕每次初始化需要经历的时间间隔
#####真实的初始化的时间间隔为你设置的时间间隔的1倍到两倍之间，即如果你设置1000ms，则初始化的时间为1000~2000之间
#####eg.
``` js
temp.setClearTime(1000);
```
####5.加载弹幕时的动画(假设有需要)
#####可以引入`loading.css`
#####在对应的弹幕容器中加入加入class为`loading`的div
#####加入5个`<span>`
#####span的id分别对应`load-sp1`、`load-sp2`、`load-sp3`、`load-sp4`、`load-sp5`
#####将会继续整合到控制器中，由用户选择是否启用加载等待，后期也可以单独使用该加载到任何地方

####6.未完待续

