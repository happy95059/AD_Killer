var fso=new ActiveXObject("Scripting.FileSystemObject");
  var f=fso.CreateTextFile("C:\text.txt",true);

    f.WriteLine("abcd");
    f.WriteLine("agggg");
  f.close();