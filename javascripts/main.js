
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

// var make_canvas_from = function(n, imgbg, id, image_url){
//
//   // A4で印刷すると名札(名刺)とほぼ同じになるサイズ
//
//     redraw(canvas, context, n, id, image_url, imgbg);
//   return canvas;
// };
//
// var redraw = function(canvas, context, n, id, image_url, imgbg){
//   var alpha = context.globalAlpha;
//   context.globalAlpha = 0.1;
//   context.globalAlpha = alpha;
//
//   if (0 < image_url.length){
//     var imgicon = new Image();
//     imgicon.src = image_url;
//     imgicon.onload = function(){
//       var top = canvas.width / 3;
//       var left  = 10;
//
//       context.fillStyle = "rgb(40,40,40)";
//       context.fillRect(top, left, canvas.width / 3, canvas.width / 3);
//       context.stroke();
//
//       context.drawImage(imgicon, top + 5, left + 5, canvas.width / 3, canvas.width / 3);
//     };
//   }
//
//   context.fillStyle = "rgb(160,160,160)";
//   context.font = "5pt monospace";
//   context.fillText(n, canvas.width - 24, canvas.height - 10);
//
//   context.fillStyle = "rgb(0,0,0)";
//   context.font = "20pt Bungee Inline";
//   context.fillText(id, (canvas.width - context.measureText(id).width) / 2, canvas.height / 9 * 7);
//
//   context.fillStyle = "rgb(0,0,0)";
//   context.rect(0, 0, canvas.width, canvas.height);
//   context.stroke();
// };
//
// var fittingString = function(c, str, maxWidth){
//   var width = c.measureText(str).width;
//   var ellipsis = '...';
//   var ellipsisWidth = c.measureText(ellipsis).width;
//   if (width <= maxWidth || width <= ellipsisWidth){
//     return str;
//   }
//   else{
//     var len = str.length;
//     while(width >= maxWidth - ellipsisWidth && len-- > 0){
//       str = str.substring(0, len);
//       width = c.measureText(str).width;
//     }
//     return str + ellipsis;
//   }
// };
//
//
//   var n = 1;
//   output.appendChild(make_canvas_from(n++, imgbg, '@k-takata', 'https://avatars1.githubusercontent.com/u/840186?v=3&s=466'));
//   output.appendChild(make_canvas_from(n++, imgbg, '@rnitame', 'https://avatars2.githubusercontent.com/u/4950792?v=3&s=466'));
//   output.appendChild(make_canvas_from(n++, imgbg, '@Shougo', 'https://avatars2.githubusercontent.com/u/41495?v=3&s=466'));
//   output.appendChild(make_canvas_from(n++, imgbg, '@zchee', 'https://avatars2.githubusercontent.com/u/6366270?v=3&s=466'));
//   output.appendChild(make_canvas_from(n++, imgbg, '@tenntenn', 'https://avatars3.githubusercontent.com/u/796820?v=3&s=466'));
//   output.appendChild(make_canvas_from(n++, imgbg, '@t9md', 'https://avatars3.githubusercontent.com/u/155205?v=3&s=466'));
//   output.appendChild(make_canvas_from(n++, imgbg, '@koron', 'https://avatars1.githubusercontent.com/u/468368?v=3&s=466'));
//   output.appendChild(make_canvas_from(n++, imgbg, '@haya14busa', 'https://avatars3.githubusercontent.com/u/3797062?v=3&s=466'));
//   output.appendChild(make_canvas_from(n++, imgbg, '@aiya000', 'https://avatars0.githubusercontent.com/u/4897842?v=3&s=466'));
//   output.appendChild(make_canvas_from(n++, imgbg, '@thinca', 'https://avatars0.githubusercontent.com/u/20474?v=3&s=466'));
//   output.appendChild(make_canvas_from(n++, imgbg, '@konnyakmannan', 'https://avatars1.githubusercontent.com/u/2263845?v=3&s=466'));
//   output.appendChild(make_canvas_from(n++, imgbg, '@b4b4r07', 'https://avatars3.githubusercontent.com/u/4442708?v=3&s=466'));
//   output.appendChild(make_canvas_from(n++, imgbg, '@ryunix', 'https://avatars2.githubusercontent.com/u/7754313?v=3&s=466'));
//   output.appendChild(make_canvas_from(n++, imgbg, '@ujihisa', 'https://avatars1.githubusercontent.com/u/11504?v=3&s=466'));
//   output.appendChild(make_canvas_from(n++, imgbg, '@y0za', 'https://avatars2.githubusercontent.com/u/16757772?v=3&s=466'));
//   output.appendChild(make_canvas_from(n++, imgbg, '@Kuniwak', 'https://avatars1.githubusercontent.com/u/1124024?v=3&s=466'));
//   output.appendChild(make_canvas_from(n++, imgbg, '@rbtnn', 'https://avatars1.githubusercontent.com/u/1595779?v=3&s=466'));
//   for (var idx = 0; idx < 103; idx++){
//     output.appendChild(make_canvas_from(n + idx, imgbg, '', ''));
//   }
// };

