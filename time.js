(() => {
  var currentTime = document.getElementById('time');
  setInterval(function () {
    var d = new Date();
    var hours = d.getHours(),
      minutes = d.getMinutes(),
      ampm = hours >= 12 && hours < 24 ? 'pm' : 'am';
    if (hours > 12) {
      hours -= 12;
    } else if (hours === 0) {
      hours = 12;
    }
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    var sepClass = '';
    if (d.getMinutes() % 2 === 1) sepClass = 'trans';
    var sep = '<span class="' + sepClass + '">:</span>';
    currentTime.innerHTML = hours + sep + minutes + ' ' + ampm;
  }, 1000);
})();
