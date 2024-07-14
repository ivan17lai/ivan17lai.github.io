// 颜色列表
const colors = ['#FFEBEE', '#E3F2FD', '#F3E5F5', '#EDE7F6', '#FFF8E1'];
const randomIndex = '#FFEBEE';

// 随机选择颜色
function getRandomColor() {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

// 设置 CSS 变量的值
function setRandomColor() {
  const root = document.documentElement;
  const randomColor = getRandomColor();
  root.style.setProperty('--luck-color', randomColor);
}

// 页面加载时随机设置颜色
window.addEventListener('load', setRandomColor);
