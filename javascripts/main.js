
(function(){
    var line1 = document.getElementById('line1');
    var line2 = document.getElementById('line2');
    var line3 = document.getElementById('line3');
    var f = function(){
        var canvas = document.getElementById('output');
        canvas.width = 600;
        canvas.height = 700;
        if(canvas.getContext){
            var context = canvas.getContext('2d');
            var imgbg = new Image();
            imgbg.src = './img/sanzai.jpg';
            imgbg.onload = function(){
                context.drawImage(imgbg, 0, 0, canvas.width, canvas.width);
                context.fillStyle = "rgb(255,255,255)";
                context.scale(1, 0.7);
                context.arc(canvas.width - 120, canvas.height - 20, 140, 0, Math.PI * 2, false);
                context.fill();
                context.beginPath();
                context.moveTo(canvas.width - 120, canvas.height - 20);
                context.lineTo(canvas.width - 320, canvas.height - 20);
                context.lineTo(canvas.width - 120, canvas.height - 80);
                context.closePath();
                context.fill();
                context.scale(1, 1);
                context.fillStyle = "rgb(0,0,0)";
                context.font = "25pt monospace";
                context.fillText(line1.value, canvas.width - 220, canvas.height - 50);
                context.fillText(line2.value, canvas.width - 220, canvas.height + 0);
                context.fillText(line3.value, canvas.width - 220, canvas.height + 50);
            };
        }
    };
    f();
    line1.addEventListener('change', f);
    line2.addEventListener('change', f);
    line3.addEventListener('change', f);
})();
