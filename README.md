# demo

自己平常开发时碰到觉得反正都写了demo不如放到网上的各个小东西╰(*°▽°*)╯。

1. babel

   介绍： babel demo，npm install下载所需的包后，使用grunt default命令运行，当你看到产生了lib文件并且本地打开view/index.html里面有内容了就代表，你！成功了！

   功能： 使用babel由ES6转换成ES5后，使用browserify使用类似于 node 的 require()通过预编译让前端Javascript可以直接使用 由babel转换之后的ES5，然后由clean将中间产生的包含ES5文件的dist文件删除。

   ​

2. compresspic（进行中,暂时只写了一个限定内存大小）

   介绍： 图片压缩，有损压缩

   ​    可配置图片固定长宽度。

   ​    可配置图片压缩质量。

   ​    可配置图片压缩至限定所占内存以下。（但无法准确的配置到固定内存大小）

3. grunt-webpack动态配置路径

   介绍： grunt-webpack动态配置路径，适用于一个配置相对于多个项目的情况。

   命令执行： grunt_webpack项目下npm install后运行NODE_ENV=production grunt build:(配置的文件名)，样例中的例子是wp.json，所以运行的命令是NODE_ENV=production grunt build:wp,成功在/project/wp/dist下产生相应js即成功。

4. vue单文件组件（开发中）

   介绍： 使用webpack+vue-loader不适用vue init跑出可上传的自定义npm包。