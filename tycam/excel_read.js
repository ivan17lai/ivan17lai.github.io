var json;
  document.getElementById('openfile').addEventListener('click', function() {
    document.getElementById('fileInput').click();
  });

  document.getElementById('openfile2').addEventListener('click', function() {
    document.getElementById('fileInput').click();
  });

  document.getElementById('fileInput').addEventListener('change', function(event) {
    var file = event.target.files[0];
    var reader = new FileReader();

    const openfile = document.getElementById('openfile');
    const openfile_small = document.getElementById('openfile2');


    reader.onload = function(e) {
      var data = new Uint8Array(e.target.result);
      var workbook = XLSX.read(data, {type: 'array'});
      var sheetName = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[sheetName];
      json = XLSX.utils.sheet_to_json(worksheet);


      // 提取班級代號
      var classCodes = [...new Set(json.map(item => item['班級']))];

      // 生成按鈕
      generateButtons(classCodes);

      openfile.style.display = 'none';
      openfile_small.style.display = 'block';


    };

    reader.readAsArrayBuffer(file);
  });

  function generateButtons(classCodes) {
    var buttonContainer = document.getElementById('classbuttom-Bar');
    buttonContainer.innerHTML = ''; // 清空容器
    
    classCodes.forEach(function(code) {
      var button = document.createElement('button');
      button.innerHTML = '班級 ' + code;
      button.className = 'button-class';

      // 添加按鈕點擊事件
      button.addEventListener('click', function() {
        showClassStudents(code);
      });

      buttonContainer.appendChild(button);
    });
  }

  function showClassStudents(classCode) {
    var studentList = json.filter(item => item['班級'] === classCode);
    
    // 清空並顯示學生列表
    var studentContainer = document.getElementById('student-Bar');
    studentContainer.innerHTML = '';

    studentList.forEach(function(student) {
      var button = document.createElement('button');
      button.innerHTML = `${student['學號']}-${student['學生姓名']}`;
      button.className = 'button-student';
      studentContainer.appendChild(button);
    });
  }