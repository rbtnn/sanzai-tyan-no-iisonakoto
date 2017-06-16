
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
    var info_width = document.getElementById('info_width');
    var info_height = document.getElementById('info_height');
    var mode_writing = document.getElementById('mode_writing');
    var output = document.getElementById('output');

    var load_localstorage = function(){
        if (localStorage != undefined){
            var sanzai_tyan_no_iisonakoto = JSON.parse(localStorage.sanzai_tyan_no_iisonakoto);
            if (sanzai_tyan_no_iisonakoto != undefined){
                line1.value = sanzai_tyan_no_iisonakoto.line1;
                line2.value = sanzai_tyan_no_iisonakoto.line2;
                line3.value = sanzai_tyan_no_iisonakoto.line3;
                offset_x.value = sanzai_tyan_no_iisonakoto.offset_x;
                offset_y.value = sanzai_tyan_no_iisonakoto.offset_y;
                size_width.value = sanzai_tyan_no_iisonakoto.size_width;
                size_height.value = sanzai_tyan_no_iisonakoto.size_height;
                size_font.value = sanzai_tyan_no_iisonakoto.size_font;
                size_lineheight.value = sanzai_tyan_no_iisonakoto.size_lineheight;
                mode_writing.value = sanzai_tyan_no_iisonakoto.mode_writing;
            }
        }
    };

    var save_localstorage = function(){
        if (localStorage != undefined){
            var sanzai_tyan_no_iisonakoto = {
                line1 : line1.value,
                line2 : line2.value,
                line3 : line3.value,
                offset_x : offset_x.value,
                offset_y : offset_y.value,
                size_width : size_width.value,
                size_height : size_height.value,
                size_font : size_font.value,
                size_lineheight : size_lineheight.value,
                mode_writing : mode_writing.value,
            };
            localStorage.sanzai_tyan_no_iisonakoto = JSON.stringify(sanzai_tyan_no_iisonakoto);
        }
    };

    var f = function(){
        var canvas = document.createElement('canvas');
        if(canvas.getContext){
            var context = canvas.getContext('2d');
            var imgbg = new Image();
            imgbg.src = 'https://rbtnn.github.io/sanzai-tyan-no-iisonakoto/img/sanzai.jpg';
            // imgbg.src = './img/sanzai.jpg';
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
                var charWidth = context.measureText("あ").width;

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

                (function(){
                    context.fillStyle = "rgb(0,0,0)";
                    context.font = font_size + "pt 'M+ 2p light'";
                    switch(mode_writing.value){
                        case "vertical":
                            [line1.value, line2.value, line3.value].forEach(function(line, i) {
                                Array.prototype.forEach.call(line, function(ch, j) {
                                    var offset = (charWidth - context.measureText(ch).width) / 2;
                                    context.fillText(ch,
                                        x + w + offset - (charWidth + lineheight) * (i + 1),
                                        y + (font_size + 3) * (j + 1));
                                });
                            });
                            break;
                        case "horizontal":
                            context.fillText(line1.value, x + w * 0.1, y + h / 2 + (font_size / 2) - lineheight - font_size);
                            context.fillText(line2.value, x + w * 0.1, y + h / 2 + (font_size / 2));
                            context.fillText(line3.value, x + w * 0.1, y + h / 2 + (font_size / 2) + lineheight + font_size);
                            break;
                    }
                })();

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
        save_localstorage();
        setTimeout(f, 1000);
    };

    load_localstorage();
    f();
}));
