# thinkAPP
Build and Manage For ionic APP using ThinkPHP and Metronic Template of angularJS
thnkphp是一个用来进行内容管理、ionic APP构建与管理的后台管理工具，基于Metronic Template(angularJS)模板

## 第一步 安装和配置数据库
1. 向数据库中顺序导入Data文件夹中的table.sql和data.sql文件
2. 如果是非windows操作系统,需要将apache的用户修改为本地用户, 修改文件/etc/apache2/httpd.conf, 将User: _www修改为您的用户名
3. 重启Apache进程
4. 默认管理地址为: http://yourSite/default.html
5. $ sudo vi /etc/apache2/extra/httpd-vhosts.conf
```
<VirtualHost *:80>
     ServerName thinkapp.cn
     DocumentRoot "/Users/gadflybsd/PhpstormProjects/thinkAPP"
     <Directory "/Users/gadflybsd/PhpstormProjects/thinkAPP">
         Options Indexes FollowSymLinks Includes ExecCGI
         AllowOverride All
         Require all granted
         DirectoryIndex default.html index.html index.php
     </Directory>
     ErrorLog "/private/var/log/apache2/thinkapp.cn-error_log"
     CustomLog "/private/var/log/apache2/thinkapp.cn-access_log" common
 </VirtualHost>
```


## 第二步 构建ionic APP项目
