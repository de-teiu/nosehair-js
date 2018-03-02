var LEFT = 1;
var RIGHT = 0;
var HAIR_COUNT = 10;
var HAIR_FINENESS = 10;

/* class属性に'noseHair'が指定された要素に対して、鼻毛を生やす。 */
function setNoseHair(){
  $('.noseHair').each(function(index, element){
    addNoseHair(element);
  });
}


/* 指定したオブジェクトに鼻毛を追加 */
function addNoseHair(obj){
  var $target = $(obj);
  var wid = $target.width();
  var hei = $target.height();
  var top = $target.offset().top;
  var left = $target.offset().left;
  //alert(wid + ',' + ',' + hei + ',' + top + ',' + left  );

  var qua = wid/4;
  var noseLeft = left + qua;
  var noseRight = left + qua*3;
  var noseTop = top + (hei * 0.9);

  var len = ((wid+hei)/4) / HAIR_FINENESS;
  for(var i=0;i<HAIR_COUNT;i++){
    //左の鼻毛
    drawNoseHair(noseLeft,noseTop,len,LEFT);

    //右の鼻毛
    drawNoseHair(noseRight,noseTop,len,RIGHT);
  }

}

/* 鼻毛を1本引く */
function drawNoseHair(x,y,len,direction){
  var stx = x;
  var sty = y;
  for(var i=0;i<HAIR_FINENESS;i++){
    var enx = Math.floor( Math.random() * len );
    if(direction==LEFT){
      enx = stx - enx;
    }else{
      enx = stx+enx;
    }
    var eny = sty + Math.floor( Math.random() * len ) + len ;

    //始点のx座標は終点のy座標より小さいものとする。
    if(stx > enx){
      //そうなってなければ始点と終点を入れ替える。
      enx = [stx, stx = enx][0];
      eny = [sty, sty = eny][0];
    }

    //線を描画
    drawLine({
      x1: stx,
      y1: sty,
      x2: enx,
      y2: eny,
    });

    //現在の終点を次の始点とする。
    stx = (direction==LEFT)?stx:enx;
    sty = (direction==LEFT)?sty:eny;
  }
}

/* 直線を描画する。
 * [引用元]
 * http://king-of-nowhere.hatenablog.com/entry/2013/11/28/084116
 */
function drawLine(params) {

  var param = jQuery.extend({
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0,
    line_style: "solid",
    line_color: "#000",
    line_width: "1px",
    parent: $("body"),
    callback: function(){},
  }, params);

  var w = Math.sqrt(Math.pow((param.x1 - param.x2) ,2) + Math.pow((param.y1 - param.y2) ,2));	// 線の長さを算出する(2点間の距離を算出する)
  var base = Math.max(param.x1, param.x2) - Math.min(param.x1, param.x2); // 底辺長を算出する(aTanの算出のため)
  var tall = Math.max(param.y1, param.y2) - Math.min(param.y1, param.y2); // 高さを算出する(aTanの算出のため)
  var aTan = Math.atan(tall / base); // 逆三角関数で tanのθを算出する
  var deg = aTan * 180 / Math.PI; // rad => degrees
  deg = params.y1 > param.y2 ? 0 - deg: deg; // 回転方向

  var line = $("<div></div>")
  .addClass("line")
  .css({
    "left": param.x1,
    "top": params.y1,
    "width": w,
    "transform": "rotate(" + deg + "deg)",
    "-webkit-transform": "rotate(" + deg + "deg)",
    "border-top-style": param.line_style,
    "border-top-color": param.line_color,
    "border-top-width": param.line_width,
  });
  $(param.parent).append(line);
}

function clearLine(){
  $(".line").remove();
}
