
function getXCalc(x){
  return Math.floor(calcZoomX(x)+adjusts[0]);
}
function getYCalc(y) {
  return Math.floor(calcZoomY(y)+adjusts[1]);
}
var lastx=0;
function getDistance(x,y,x1,y1){
  return Math.pow(Math.pow(x-x1,2)+Math.pow(y-y1,2),0.5);
}

var effectsArray = [],effectsList=[], effectsHashL = 2000;
function hashEffects(x,y){
  return Math.abs( Math.floor(x+y) )%effectsHashL
}
function renewEffects(){
  effectsArray = [];
  for(var i = 0;i<effectsHashL;i++){
    effectsArray.push([]);
  }
}
function existEffect(x,y,hash){
  var e = effectsArray[hash]
  var l = e.length
  for(var i = 0;i<l;i++){
    if( Math.abs(e[i][0] - x) < 10 && Math.abs(e[i][1] - y) < 10 )
      return [i,true];
  }
  return [0,false];
}
function createEffects(arr) {
  for(var i = 0;i<arr.length;i++){
    a = arr[i];
    createEffect(a[0],a[1],a[2],a[3],a[4]);
  }
}
function createEffect(x,y,type,level,strength){
  if(effectsActive || type == 2){
    var hash = hashEffects(x,y)
    var e = effectsArray[hash];
    if(type == 1)
      var derivada = 0.03
    else if(type == 2)
      var derivada = 0.02

    exist=  existEffect(x,y,hash)
    if( exist[1] ){
      e[exist[0]] = [x,y,type,1*strength,derivada,level];
    }
    else{
      e.push([x,y,type,1*strength,derivada,level])
    }
  }
}
function drawEffects(delta) {
    var tamanhoFinal = 40,
    tamanhoInicial = 15;
    var tFI = tamanhoFinal-tamanhoInicial;

  for(var r = 0;r < effectsHashL;r++){
    var rHash = effectsArray[r];
    var l = rHash.length
    for (var i = 0; i < l; i++) {
        var e = rHash[i],
            act = e[3],
            xf = getXCalc(e[0]),
            yf = getYCalc(e[1]);
            if (e[2] == 1) {


            if (desenhavel() && effectsActive) {
                var tamanhoAtualEffect = tamanhoFinal - (Math.pow(act, 2) * tFI)
                var grd = ctx2.createRadialGradient(xf, yf, 0, xf, yf, tamanhoAtualEffect);
                grd.addColorStop(0, "hsla(0,100%,100%," + 0.15 * act + ")");
                grd.addColorStop(0.9, "hsla(0,100%,100%," + 0.15 * act + ")");
                grd.addColorStop(1, "hsla(0,100%,100%," + 0.0 * act + ")");

                ctx2.beginPath();
                ctx2.arc(xf, yf, tamanhoAtualEffect, 0, 2 * Math.PI, false);
                ctx2.fillStyle = grd;
                ctx2.fill();
                ctx2.closePath();
                /*
                tamanhoAtualEffect *= 3
                var grd = ctx2.createRadialGradient(xf, yf, 0, xf, yf, tamanhoAtualEffect);
                grd.addColorStop(0, "hsla(0,100%,100%," + 0.06 * act + ")");
                grd.addColorStop(0.5, "hsla(0,100%,100%," + 0.04 * act + ")");
                grd.addColorStop(1, "hsla(0,100%,100%," + 0.0 * act + ")");
                
                ctx2.beginPath();
                ctx2.arc(xf, yf, tamanhoAtualEffect*3, 0, 2 * Math.PI, false);
                ctx2.fillStyle = grd;
                ctx2.fill();
                ctx2.closePath();*/
                
              }

            var tamanho1 = tamanho1Func(act) ;
            ctx2.beginPath();
            ctx2.arc(xf, yf, tamanho1, 0, 2 * Math.PI, false);
            if(accMode)
            cor = fearColor;
            else
            cor = mainColor;
            if(!accMode && brain_color_switch){
                if (e[5] == undefined)
                    var dec = 0
                else
                    var dec = 2 * e[5];
                var cor = "hsla("+corAlterada(dec)+",100%,48%,1)";
            }
                ctx2.fillStyle = cor;
                ctx2.fill();
                ctx2.closePath();
            
        } else if (e[2] == 2) {
            var tamanho1 = tamanho1Func(act);
            ctx2.beginPath();
            ctx2.arc(xf, yf, tamanho1, 0, 2 * Math.PI, false);
            ctx2.fillStyle = "hsla(200,100%,48%,1)";
            ctx2.fill();
            ctx2.closePath();
        }
    else{
        e[3]=0
    }
        e[3] -= e[4] * delta;
        if (e[3] <= 0) {
            rHash.splice(i, 1);
            i--;
            l--;
        }
    }
  }
}

