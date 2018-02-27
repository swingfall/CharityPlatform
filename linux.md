>本文内容来自 :  [Linux.cn](https://linux.cn/article-6160-1.html)

----
- nano + file
nano是一个简单实用的文本编辑器
#### 寻求帮助

- man（manual）
man + 命令; 按q退出帮助
- help
命令 + --help; 有的命令不能用~

#### 简单操作
- ctrl + c
终止当前程序
- Tab 补全
按两次 Tab 可列出所有可用命令
已输入部分命令名或文件名，按 Tab 进行自动补全->真的好用

#### 常用命令

- cd
绝对路径从 / 开始
eg：cd Users/Wangc

- ls （list）
ls         仅列出当前目录可见文件
ls -l        列出当前目录可见文件详细信息
ls -hl    列出详细信息并以可读大小显示文件大小
ls -al    列出所有文件（包括隐藏）的详细信息

- pwd
当前路径

- mkdir
mkdir  folder
mkdir -p folder/subfolder
mkdir -v 每次创建新目录都显示信息
-p 参数为当父目录存在时忽略，若不存在则建立，用此参数可建立多级文件夹

- touch
touch file 创建文件
如果当前文件已经存在，则改变已有文件的访问时间和修改时间，而不改变内容


- rm （remove）
rm filename          删除 filename
rm -i filename       删除 filename 前提示，若多个文件则每次提示
rm -rf folder/subfolder/
递归删除 subfolder 下所有文件及文件夹，包括 subfolder 自身
rm -d folder         删除空文件夹

- cp
cp source dest      ### 将 source 复制到 dest
cp folder/*  dest
将 folder 下所有文件(不含子文件夹中的文件)复制到 dest
cp -r folder  dest
将 folder 下所有文件（包含子文件夹中的所有文件）复制到 dest

- mv （move）
mv source  folder
将 source 移动到 folder 下，完成后则为  folder/source
mv -i source folder
在移动时，若文件已存在则提示 **是否覆盖**
mv source dest
在 dest 不为目录的前提下，重命名 source 为 dest

- cat （concatenate）
cat 用于输出文件内容到 Terminal，常与重定向符号配合使用
cat /etc/locale.gen      ### 输出 locale.gen 的内容
cat -n /etc/locale.gen   ### 输出 locale.gen 的内容并显示行号

- nl
nl + file 显示内容并且加上行号

- more
more 与 cat 相似，都可以查看文件内容，所不同的是，当一个文档太长时， cat 只能展示最后布满屏幕的内容，前面的内容是不可见的。这时候可用 more 逐行显示内容。
more /etc/locale.gen
more +100 /etc/locale.gen   

- **less（一般就用 less 就可以了**)
less 与 more 相似，不过 less 支持上下滚动查看内容，而 more 只支持逐行显示。
less /etc/locale.gen
less +100 /etc/locale.gen   ### 从 100 行开始显示

- ping
主要用于测试网络连通，通过对目标机器发送数据包来测试两台主机是否连通，及延时情况

- chmod
r=read(读入),   w=write(写入),  x=execute(执行)
u=user(所有者), g=group(用户组), others(其他)
chmod +x filename     ### 为 user ，group ，others 添加执行权限
chmod -x filename     ### 取消 user ， group ，others 的执行权限
chmod +w filename     ### 为 user 添加写入权限
chmod ugo=rwx filenam ### 设置 user ，group ，others 具有 读取、写入、执行权限
chmod ug=rw filename   ### 设置 user ，group 添加 读取、写入权限
chmod ugo=--- filename ### 取消所有权限
