运行THREE.JS DEMO：
1.安装node.js
2.在含有start.js的目录下，在cmd命令窗口中输入node start.js
3.根据命令行提示信息，在浏览器输入地址即可访问



obj/mtl to js tools:
1.安装python-2.6msi   
2.下载convert_obj_three.py   ,obj转js脚本
3.安装好python后
 当前路径   python convertor.py -i  model.obj -o  output.js -d invert
绝对路径   C:\Python26\python d:\convert_obj_three.py -i d:\model.obj -o d:\model.js -d invert
4.如果有mtl文件，会有提示找不到**.mtl，只需要按照提示重命名即可。
5.转换后的js模型文件，大多数会出现opacity/transparency 为0.0的问题，加参数 -d invert即可。
