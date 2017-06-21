
window.addEventListener('load', (function(){
    var mouse_flag = false;
    var mouse_x = 0;
    var mouse_y = 0;
    var mouse_w = 0;
    var mouse_h = 0;

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
            if(localStorage.getItem('sanzai_tyan_no_iisonakoto') != null){
                var local = JSON.parse(localStorage.sanzai_tyan_no_iisonakoto);
                if (local != undefined){
                    line1.value = local.line1;
                    line2.value = local.line2;
                    line3.value = local.line3;
                    offset_x.value = local.offset_x;
                    offset_y.value = local.offset_y;
                    size_width.value = local.size_width;
                    size_height.value = local.size_height;
                    size_font.value = local.size_font;
                    size_lineheight.value = local.size_lineheight;
                    mode_writing.value = local.mode_writing;
                }
            }
        }
    };

    var save_localstorage = function(){
        if (localStorage != undefined){
            localStorage.sanzai_tyan_no_iisonakoto = JSON.stringify({
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
            });
        }
    };

    var measureText = function(line, font){
        var rtn = { 'width' : 0, 'height' : 0 };
        var canvas = document.createElement('canvas');
        canvas.width = 100;
        canvas.height = 100;
        if(canvas.getContext){
            var context = canvas.getContext('2d');
            context.font = font;
            context.fillText(line, 0, canvas.height / 2);
            rtn.width = context.measureText(line).width;
            var pixels = context.getImageData(0, 0, canvas.width, canvas.height);
            var data = pixels.data;
            var currentRow = -1;
            for (var i = 0, len = data.length; i < len; i += 4) {
                var alpha = data[i + 3];
                if (alpha > 0) {
                    var row = Math.floor((i / 4) / canvas.width);
                    if (row > currentRow) {
                        currentRow = row;
                        rtn.height++;
                    }
                }
            }
        }
        return rtn;
    };

    var draw = function(x, y, w, h){
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

                (function(){
                    var what = function(flag){
                        var b = (mode_writing.value == (flag ? 'vertical' : 'horizontal'));
                        return b ? 'height' : 'width';
                    };
                    context.fillStyle = "rgb(0,0,0)";
                    context.font = font_size + "pt 'M+ 2p light'";
                    var multiInfo = measureText("あ", context.font);
                    var lines = [line1.value, line2.value, line3.value];

                    var max = 0;
                    var default_offset = { 'width' : x + w, 'height' : y };
                    var offset = {};

                    offset = { 'width' : x + w, 'height' : y };
                    lines.forEach(function(line, lnum) {
                        offset[what(true)] = default_offset[what(true)];
                        Array.prototype.forEach.call(line, function(ch, col){
                            var info = measureText(ch, context.font);
                            offset[what(true)] += info[what(true)];
                        });
                        if(max < offset[what(true)]){
                            max = offset[what(true)];
                        }
                        offset[what(false)] -= multiInfo[what(false)];
                    });
                    offset[what(true)] = max;

                    var rect_w = Math.abs(default_offset.width - offset.width);
                    var rect_h = Math.abs(default_offset.height - offset.height);

                    offset = { 'width' : x + w, 'height' : y };
                    lines.forEach(function(line, lnum) {
                        offset[what(true)] = default_offset[what(true)];
                        Array.prototype.forEach.call(line, function(ch, col){
                            var info = measureText(ch, context.font);
                            switch(mode_writing.value){
                                case 'vertical':
                                    offset.height += info.height;
                                    var d = (multiInfo.width - info.width) / 2 - multiInfo.width;
                                    context.fillText(ch,
                                        offset.width  - (w - rect_w) + (w - rect_w) / 2 + d,
                                        offset.height + (h - rect_h) - (h - rect_h) / 2);
                                    break;
                                case 'horizontal':
                                    context.fillText(ch,
                                        offset.width - w + (w - rect_w) / 2,
                                        offset.height + h - (h - rect_h) / 2);
                                    offset.width += info.width;
                                    break;
                            }
                        });
                        offset[what(false)] -= multiInfo[what(false)];
                    });
                })();

                canvas.addEventListener('mousedown', function(e){
                    var rect = e.target.getBoundingClientRect();
                    mouse_x = e.clientX - rect.left;
                    mouse_y = e.clientY - rect.top;
                    mouse_flag = true;
                });

                canvas.addEventListener('mousemove', function(e){
                    if(mouse_flag){
                        var rect = e.target.getBoundingClientRect();
                        var x = e.clientX - rect.left;
                        var y = e.clientY - rect.top;
                        mouse_w = x - mouse_x;
                        mouse_h = y - mouse_y;
                        // info_width.innerHTML =
                        //     'x: ' + mouse_x + '<br>' +
                        //     'y:' + mouse_y + '<br>' +
                        //     'w: ' + mouse_w + '<br>' +
                        //     'h:' + mouse_h;
                        draw( (0 < mouse_w ? mouse_x : x),
                            (0 < mouse_h ? mouse_y : y),
                            (0 < mouse_w ? mouse_w : -mouse_w),
                            (0 < mouse_h ? mouse_h : -mouse_h));
                    }
                });

                canvas.addEventListener('mouseup', function(e){
                    if(mouse_flag){
                        offset_x.value = (0 < mouse_w ? mouse_x : x);
                        offset_y.value = (0 < mouse_h ? mouse_y : y);
                        size_width.value = (0 < mouse_w ? mouse_w : -mouse_w);
                        size_height.value = (0 < mouse_h ? mouse_h : -mouse_h);
                        mouse_flag = false;
                    }
                });

                canvas.addEventListener('mouseout', function(e){
                    mouse_flag = false;
                });

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
    };

    var f = function(){
        if (!mouse_flag){
            var x = parseInt(offset_x.value);
            var y = parseInt(offset_y.value);
            var w = parseInt(size_width.value);
            var h = parseInt(size_height.value);
            draw(x, y, w, h);
            save_localstorage();
        }
        setTimeout(f, 1000);
    };

    load_localstorage();
    f();
}));
