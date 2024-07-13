document.getElementById('file-upload').addEventListener('change', (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
  
      // 假設我們要讀取第一個工作表
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
  
      // 將工作表轉換為 JSON 數據
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      
      // 假設班級數據在 JSON 中的結構為 [{ "Class": "1A" }, { "Class": "1B" }, ...]
      const classes = jsonData.map(row => row.Class);
      
      // 獲取按鈕容器
      const buttonContainer = document.getElementById('button-container');
      buttonContainer.innerHTML = ''; // 清空之前的按鈕
  
  
  
      classes.forEach(className => {
        const button = document.createElement('button');
        button.textContent = className;
        button.classList.add('class-button'); // 添加 CSS 樣式類
        buttonContainer.appendChild(button);
      });
  
    };
  
    reader.readAsArrayBuffer(file);
  
  });