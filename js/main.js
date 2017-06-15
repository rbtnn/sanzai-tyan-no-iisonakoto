
window.addEventListener('load', (function(){
    var line1 = document.getElementById('line1');
    var line2 = document.getElementById('line2');
    var line3 = document.getElementById('line3');
    var offset_x = document.getElementById('offset_x');
    var offset_y = document.getElementById('offset_y');
    var size_width = document.getElementById('size_width');
    var size_height = document.getElementById('size_height');
    var size_font = document.getElementById('size_font');
    var size_lineheight = document.getElementById('size_lineheight');
    var download = document.getElementById('download');
    var output = document.getElementById('output');
    var info_width = document.getElementById('info_width');
    var info_height = document.getElementById('info_height');

    var f = function(){
        var canvas = document.createElement('canvas');
        if(canvas.getContext){
            var context = canvas.getContext('2d');
            var imgbg = new Image();
            // imgbg.src = 'https://rbtnn.github.io/sanzai-tyan-no-iisonakoto/img/sanzai.jpg';
            imgbg.src = './img/sanzai.jpg';
            imgbg.crossOrigin = 'Anonymous';
            imgbg.onload = function(){
                canvas.width = imgbg.width / 2;
                canvas.height = imgbg.height / 2;

                var x = parseInt(offset_x.value);
                var y = parseInt(offset_y.value);
                var w = parseInt(size_width.value);
                var h = parseInt(size_height.value);
                var font_size = parseInt(size_font.value);
                var lineheight = parseInt(size_lineheight.value);

                context.beginPath();
                context.rect(0, 0, canvas.width, canvas.height);
                context.closePath();
                context.fillStyle = "rgb(0,0,0)";
                context.fill();

                context.drawImage(imgbg, 0, 0, canvas.width, canvas.height);

                context.beginPath();
                context.moveTo(x + w / 2, y + h / 4 * 1);
                context.lineTo(canvas.width / 9 * 4, canvas.height / 13 * 10);
                context.lineTo(x + w / 2, y + h / 4 * 3);
                context.closePath();
                context.fillStyle = "rgb(255,255,255)";
                context.fill();

                var fillRoundRect = function (x, y, w, h){
                    var pi = Math.PI;
                    var r = 10;
                    context.beginPath();
                    context.arc(x + r, y + r, r, - pi, - 0.5 * pi, false);
                    context.arc(x + w - r, y + r, r, - 0.5 * pi, 0, false);
                    context.arc(x + w - r, y + h - r, r, 0, 0.5 * pi, false);
                    context.arc(x + r, y + h - r, r, 0.5 * pi, pi, false);
                    context.closePath();
                    context.fillStyle = "rgb(255,255,255)";
                    context.fill();
                };
                fillRoundRect(x, y, w, h);

                context.fillStyle = "rgb(0,0,0)";
                context.font = font_size + "pt 'M+ 2p light'";
                context.fillText(line1.value, x + w * 0.1, y + h / 2 + (font_size / 2) - lineheight - font_size);
                context.fillText(line2.value, x + w * 0.1, y + h / 2 + (font_size / 2));
                context.fillText(line3.value, x + w * 0.1, y + h / 2 + (font_size / 2) + lineheight + font_size);

                while (output.firstChild){
                    output.removeChild(output.firstChild);
                }
                output.appendChild(canvas);

                info_width.innerText = '画像の幅: ' + canvas.width;
                info_height.innerText = '画像の高さ: ' + canvas.height;
                try{
                    download.href = canvas.toDataURL();
                }
                catch(e){
                }
            };
        }
        setTimeout(f, 1000);
    };
    f();
}));
