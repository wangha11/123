# 晓舟报告_内容管理系统

### 一、项目介绍

本项目是晓舟老师分享的学习资源 https://gitee.com/xiaozhou_report/xiaozhou_cms


### 二、启动项目

1. 启动项目之前，先按第四节的内容，在mysql数据库中创建xiaozhoucms数据库。
2. 在server目录中使用`npm install`下载依赖，然后执行`npm run dev`即可启动项目（启动前请先创建数据库，下面内容有介绍）
3. 在client目录中使用`npm install`下载依赖，然后执行`npm run serve`即可启动项目
4. 访问http://127.0.0.1:8080/#/login可以进入后台登录页面
5. 访问http://127.0.0.1:7001/可以打开前端展示页。

### 三、目录结构

* docs：项目开发的相关文档
* server：项目服务器端（基于node，egg，mysql）
* client：项目前端（基于vue）

### 四、数据库初始化

``` sql
-- 使用下面语句创建数据库
create database xiaozhoucms default character set utf8mb4 collate utf8mb4_unicode_ci;
-- 启动egg项目后，所有数据表会自动创建，然后使用下面语句创建管理员用户。
insert into users (
    username,
    password,
    created_at,
    updated_at
) values (
    "admin",
    "e10adc3949ba59abbe56e057f20f883e",
    "2020-10-01",
    "2020-10-01"
);
-- 管理员用户名为admin，密码使用md5加密，所以初始值设置为‘123456’的加密字符串。
```

### 五、页面效果和项目总结


 ![输入图片说明](https://images.gitee.com/uploads/images/2021/0928/151342_f2eb1855_9344516.png "Snipaste_2021-09-28_15-11-52.png")
 ![输入图片说明](https://images.gitee.com/uploads/images/2021/0928/151411_11c9f9ec_9344516.png "Snipaste_2021-09-28_15-12-37.png")
![输入图片说明](https://images.gitee.com/uploads/images/2021/0928/151427_57fb48fc_9344516.png "Snipaste_2021-09-28_15-12-52.png")
![输入图片说明](https://images.gitee.com/uploads/images/2021/0928/151444_b266f9b0_9344516.png "Snipaste_2021-09-28_15-13-24.png")
![输入图片说明](https://images.gitee.com/uploads/images/2021/0928/163324_ac29d895_9344516.png "Snipaste_2021-09-28_15-41-19.png")

  这个项目我前后花了大概一个月的时间完成，教学视频里展示的的功能都做了，晓舟老师的源码里有些不完整，展示页面设计稿的部分功能没有实现，目前我准备抽时间完善右侧精选栏，其他的功能回头有时间我会把它们一一完善，最后将项目展示在腾讯云上。后期再来详细总结这次做的项目。
