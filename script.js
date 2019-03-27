const ctx1 = document.getElementById('layer1').getContext('2d');
const ctx2 = document.getElementById('layer2').getContext('2d');
const c_h = parseFloat($("#layer1").css("height"));
const c_w = (parseFloat($("#layer1").css("width"))-parseFloat($("#menu").css("width")));
const c_w_real = parseFloat($("#layer1").css("width"));
const center_x = c_w/2;
const center_y = c_h/2;
const maxChilds = 3;
var buyType = "normal"
var maxPulses = 6;
var dna = 0;
var lowUpdate = 0, lowUpdateReset = 100;
var dnaever = 0,dnatotal = 0;
var radiation = 0;
var nextRadiation = 0;
var ascencions = 0;
var brain = new Tree([center_x,center_y],maxChilds);
var autopulsetime=5000,autopulsechecked = true;
var autoClickFear=1000;
var pulseSpeed = 1;
var restDna = 1;
var feedback = 0;
var doubleNeuron = 0;
var impulse = 1;
var percImpulse = 0; 
var zoom = 1;
const pulseSize = 3;
const neuronSize = 16;
const neuronSizeAnim = 15;
const connectionWidth = 8;
var maxConnections = 1;
var adjusts = [0,0];
var brainColor = "hsla(340, 100%, 100%, 0.3)";
var mainColor = "hsla(340, 100%, 100%, 1)";
var fearColor = "hsla(196, 100%, 46%, 1)";
var clicksToFear = 50;
const clicksToFearInitial = 50;
var mainHue = 340;
var varhue = -0.4;
var canClick = true;
var upgrades = [1,1,1,1,1];
var newNewronLevel = 1;
var effectsActive = true,sound = true,music=true;
var clicks = 0;
var clicksRelative = 0;
var accMode = false;
var accelerator = 0
var startDate = Date.now();
var updateLoadTextTime = Date.now();
var totalTimeOut = 0;
var achsSave = [];
var customizable = false;
var maxBrainSize = 0;
var mults = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
var adds = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var achievements = [
  //[nome,explicacao,eval para teste,eval perc bar,explicacao reward,eval reward,status]
  //"nivel1"
  ["Baby clicker","fa fa-baby","50 次点击 ","clicks>=50","clicks/50","1.05x brain strength","mults[0] = 1.05"],
  ["Rotifer brain","fa fa-circle","20 神经元","brain.size>=20","brain.size/20","10+ max pulses","adds[0] = 10"],
  ["Miescher discovery",
  "fas fa-dna","1000 <i class='fas fa-dna'></i> 总计","dnatotal>=1000","dnatotal/1000","5+ max pulses","adds[2] = 5"],
  //"nivel2"
  ["Kid clicker","fa fa-child","200 次点击 ","clicks>=200","clicks/200","1.05x pulse speed","mults[1] = 1.05"],
  ["Worm brain","fa fa-signature","50 神经元","brain.size>=50","brain.size/50","1.05x strength multiplier","mults[2] = 1.05"],
  ["F.Griffith discovery",
  "fas fa-dna","7500 <i class='fas fa-dna'></i> 总计","dnatotal>=7500","dnatotal/7500","5+ max pulses","adds[2] = 10"],
  //"nivel3"
  ["Teen clicker","fa fa-grin-tongue-wink","500 次点击 ","clicks>=500","clicks/500","Strength loss reduce by 10%","mults[3] = 1.10"],
  ["Fish brain","fa fa-fish","100 神经元","brain.size>=100","brain.size/100","Upgrade cost reduce by 5%","mults[4] = 0.95"],
  ["T.H.Morgan experiments",
  "fas fa-dna","85k <i class='fas fa-dna'></i> 总计","dnatotal>=85000","dnatotal/85000","10+ max pulses","adds[2] = 20"],
  //extra
  ["Picasso gift","fas fa-tint","125 神经元","brain.size>=125","brain.size/125","Customize environment","customizable = true"],
  //"nivel4"
  ["Student clicker","fa fa-graduation-cap","1k 次点击 ","clicks>=1000","clicks/1000","1.10x pulse speed","mults[5] = 1.10"],
  ["Kiwi brain","fas fa-kiwi-bird","200 神经元","brain.size>=200","brain.size/200","Upgrade cost reduce by 5%","mults[4]=(0.95*0.95)"],
  ["O.Avery discovery",
  "fas fa-dna","500k <i class='fas fa-dna'></i> 总计","dnatotal>=500000","dnatotal/500000","10+ max pulses","adds[2] = 30"],
  //"nivel5"
  ["Graduated clicker","fa fa-user-graduate","1.8k 次点击 ","clicks>=1800","clicks/1800","15+ max pulses","adds[1]=15"],
  ["Ghost brain","fa fa-ghost","300 神经元","brain.size>=300","brain.size/300","15+ max pulses","adds[2]=45"],
  ["J.Watson experiments",
  "fas fa-dna","5M <i class='fas fa-dna'></i> 总计","dnatotal>=5000000","dnatotal/5000000","1.05x brain strength","mults[6] = 1.05"],
  //"nivel6"
  ["Pro clicker","fa fa-crosshairs","3k 次点击 ","clicks>=3000","clicks/3000","1.10x pulse speed","mults[5] = (1.10*1.10)"],
  ["Frog brain","fa fa-frog","450 神经元","brain.size>=450","brain.size/450","1.05x strength multiplier","mults[2]=(1.05*1.05)"],
  ["F.Crick experiments","fas fa-dna",bigNumber(3e7)+" <i class='fas fa-dna'></i> 总计","dnatotal>=3e7","dnatotal/3e7",
  "1.05x strength multiplier","mults[11] = 1.05"],
  //"nivel7"
  ["NASA clicker","fa fa-user-astronaut","5k 次点击 ","clicks>=5000","clicks/5000","Upgrade cost reduce by 5%","mults[7]=0.95"],
  ["Devil's brain","fa fa-angry","666 神经元","brain.size>=666","brain.size/666","1.0666x brain strength","mults[8]=1.0666"],
  ["Delbrück experiments","fas fa-dna",bigNumber(1e8)+" <i class='fas fa-dna'></i> 总计","dnatotal>=1e8","dnatotal/1e8",
  "1.10x pulse speed","mults[14] = 1.10"],
  //"nivel8"
  ["Mouse Breaker","fa fa-house-damage","7.5k 次点击 ","clicks>=7500","clicks/7500","15+ max pulses","adds[1]=30"],
  ["Dog brain","fa fa-dog","900 神经元","brain.size>=900","brain.size/900","1.10x pulse speed","mults[9]=1.1"],
  ["S.Luria experiments","fas fa-dna",bigNumber(1e9)+" <i class='fas fa-dna'></i> 总计","dnatotal>=1e9","dnatotal/1e9",
  "Upgrade cost reduce by 5%","mults[13] = 0.95"],
  //"nivel9"
  ["Super clicker","fa fa-running","11k 次点击 ","clicks>=11000","clicks/11000","1.05x strength multiplier","mults[12]=1.05"],
  ["Crow brain","fa fa-crow","1200 神经元","brain.size>=1200","brain.size/1200","1.05x brain strength","mults[8]=(1.05*1.0666)"],
  ["Chargaff experiments","fas fa-dna",bigNumber(9e9)+" <i class='fas fa-dna'></i> 总计","dnatotal>=9e9","dnatotal/9e9",
  "1.05x strength multiplier","mults[11] = (1.05*1.05)"],
  //"nivel10"
  ["Ninja clicker","fa fa-ninja","15k 次点击 ","clicks>=15000","clicks/15000","1.10x pulse speed","mults[5] = (1.10*1.10*1.10)"],
  ["Gorilla brain","fa fa-paw","1650 神经元","brain.size>=1650","brain.size/1650","25+ max pulses","adds[2]=70"],
  ["M.Wilkins experiments","fas fa-dna",bigNumber(6e10)+" <i class='fas fa-dna'></i> 总计","dnatotal>=6e10","dnatotal/6e10",
  "1.05x brain strength","mults[6] = (1.05*1.05)"],
  //"nivel11"
  ["Jedi clicker","fa fa-jedi","20k 次点击 ","clicks>=20000","clicks/20000","1.05x brain strength","mults[12]=1.05"],
  ["Human brain","fa fa-grin","2000 神经元","brain.size>=2000","brain.size/2000","Upgrade cost reduce by 5%","mults[4]=(0.95*0.95*0.95)"],
  ["M.McCarty experiments","fas fa-dna",bigNumber(3e11)+" <i class='fas fa-dna'></i> 总计","dnatotal>=3e11","dnatotal/3e11",
  "Upgrade cost reduce by 5%","mults[13] = (0.95*0.95)"],
  //"nivel12"
  ["Ultimate clicker","fa fa-trophy","25k 次点击 ","clicks>=25000","clicks/25000","25+ max pulses","adds[1]=50"],
  ["Einstein brain","fa fa-grin-tongue-squint","2400 神经元","brain.size>=2400","brain.size/2400","Strength loss reduce by 20%","mults[10]=1.2"],
  ["C.MacLeod experiments","fas fa-dna",bigNumber(1e12)+" <i class='fas fa-dna'></i> 总计","dnatotal>=1e12","dnatotal/1e12",
  "1.10x pulse speed","mults[14] = (1.10*1.10)"],
  //"nivel13"
  ["Da Vinci brain","fa fa-universal-access","3000 神经元","brain.size>=3000","brain.size/3000","1.05x strength multiplier","mults[2]=(1.05*1.05*1.05)"],
  ["A.Hershey experiments","fas fa-dna",bigNumber(8e12)+" <i class='fas fa-dna'></i> 总计","dnatotal>=8e12","dnatotal/8e12",
  "1.05x strength multiplier","mults[11] = (1.05*1.05*1.05)"],
  //"nivel14"
  ["Alien brain","fa fa-hand-spock","3250 神经元","brain.size>=3250","brain.size/3250","1.05x brain strength","mults[8]=(1.05*1.0666*1.05)"],
  ["M.Chace experiments","fas fa-dna",bigNumber(5e13)+" <i class='fas fa-dna'></i> 总计","dnatotal>=5e13","dnatotal/5e13",
  "1.05x brain strength","mults[6] = (1.05*1.05*1.05)"],
  //"nivel17"
  ["Turing machine","fa fa-server","4000 神经元","brain.size>=4000","brain.size/4000","50+ max pulses","adds[2]=125"],
  ["H.Khorana experiments","fas fa-dna",bigNumber(3e14)+" <i class='fas fa-dna'></i> 总计","dnatotal>=3e14","dnatotal/3e14",
  "Upgrade cost reduce by 10%","mults[13] = (0.95*0.95*0.9)"],
  //"nivel15"
  ["Computer","fa fa-laptop","5250 神经元","brain.size>=5250","brain.size/5250","1.10x pulse speed","mults[9]=(1.1*1.1)"],
  ["R.Holley experiments","fas fa-dna",bigNumber(1e15)+" <i class='fas fa-dna'></i> 总计","dnatotal>=1e15","dnatotal/1e15",
  "1.10x brain strength","mults[6] = (1.05*1.05*1.05*1.10)"],
  //"nivel16"
  ["AI neural network","fa fa-code-branch","6500 神经元","brain.size>=6500","brain.size/6500","1.10x strength multiplier","mults[2]=(1.05*1.05*1.05*1.1)"],
  ["M.Nirenberg experiments","fas fa-dna",bigNumber(5e15)+" <i class='fas fa-dna'></i> 总计","dnatotal>=5e15","dnatotal/5e15",
  "1.10x strength multiplier","mults[11] = (1.05*1.05*1.05*1.10)"]
  //"nivel17"
];


function loadBrain(){
  brain = new Tree([center_x,center_y],maxChilds);
  brainAsArrHereXParent = brainAsArray[0];
  brainAsArrHereYParent = brainAsArray[1];
  brainAsArrHere = brainAsArray[2];
  
for(var i = 0; i<brainAsArrHere.length;i++){
    createByPos(brainAsArrHereXParent,brainAsArrHereYParent,brainAsArrHere[i]);
  }
  brain.asArray = brainAsArray;
  brain.asArrayUpdate(); 
}
function init() {
  
  load();
  testTutorial();
  criaAchiv();
  changedColors();
  updateLoadText();
  renewEffects();
  soundVerifier("ambiente",1,true)
  if(localStorage.getItem("saved")){
    loadBrain();
  }
  else{
    for (var i = 0; i <6; i++) {
      brain.createNeuron();
    }
  }
  autopulsetime = getValues(3,upgrades[3]);
  updateValues();
  updateAscUps();
  window.requestAnimationFrame(draw);
}
function createByPos(xPar,yPar,arr){
  var par = brain.getNode(xPar,yPar);
  brain.createInPos(par,arr[0],arr[1]);
  for(var i = 0; i<arr[2].length;i++){
    createByPos(arr[0],arr[1],arr[2][i]);
  }
}
function testNewNeuron() {
  while (dnaever>formulaNewNeuron(newNewronLevel)) {
    newNewronLevel++;
    for(var i = 0; i<ascStatus[2];i++)
      brain.createNeuron();
  }
  
}
function getValueByBuyType(){
  if(buyType == "5x"){
    return 5;
  }
  if(buyType == "10x"){
    return 10;
  }
  if($($(".tecla")[0]).hasClass("active")){
    return 5;
  }
  if($($(".tecla")[1]).hasClass("active")){
    return 10;
  }
  return 1;
}
function update(){
  $("#dna-value").text(bigNumber(dna));
  testNewNeuron();
  updateCostBar();
  $("#lastNeuronNeed").text(newNewronLevel-1);
  $("#neuronNeed").text(newNewronLevel);
  var toNext = bigNumber(formulaNewNeuron(newNewronLevel)-dnaever);
  $("#atualDna").text(toNext);
  var perc1 = ((dnaever - formulaNewNeuron(newNewronLevel-1))/(formulaNewNeuron(newNewronLevel) - formulaNewNeuron(newNewronLevel-1)))*100;
  $("#bar #insidebar").css("width","calc("+ perc1 +"% - 4px)");

  if(autopulsetime<=0 && autopulsechecked){
    brain.pulse();
    autopulsetime += getValues(3,upgrades[3]);
  }
  if(autoClickFear<=0){
    brain.pulse();
    autoClickFear = 1000;
  }
}
var someChanged1 = true;
var newToDraw = [];

function draw1(delta){
  if(someChanged1){
    ctx1.setTransform(1,0,0,1,0,0);
    ctx1.clearRect(0, 0, c_w_real,c_h);
    ctx1.setTransform(zoom,0,0,zoom,-(zoom-1)*0.5*c_w,-(zoom-1)*0.5*c_h)
    brain.drawNeurons(delta);
    someChanged1 = false;
    newToDraw = []
  }
  else if(newToDraw.length > 0){
    brain.drawNewNeurons(newToDraw);
  }
}
var height = 600,width=970;
function draw22(delta){

  if(autopulsetime>0)
    autopulsetime-=delta*20;
  if(autoClickFear>0 && accMode)
    autoClickFear-=delta*20;

  update();
  
  ctx2.setTransform(1,0,0,1,0,0);
  ctx2.clearRect(0, 0, c_w_real,c_h);
  if(true){//just if zoom changed
    ctx2.setTransform(zoom,0,0,zoom,-(zoom-1)*0.5*c_w,-(zoom-1)*0.5*c_h)
  }
  //var t0 = performance.now();
  
  brain.drawPulses(delta);


  //var t1 = performance.now();
  drawEffects(delta);
  //var t2 = performance.now();
  drawParticles(delta);
  //var t3 = performance.now();
  
  //if(t3-t0>10)
  //console.log((t1-t0)+"ms\n"+(t2-t1)+"ms\n"+(t3-t2)+"ms\n");
}
var d = 0, lastTime = Date.now();
function draw() {
  
  var dateNow = Date.now();
  var timeOut = dateNow-lastTime;
  
  //correct glitch
  var delta = Math.min(1.5,timeOut/20);
  if(timeOut>2000){
    totalTimeOut+=timeOut;
  }
  
  lastTime = dateNow;
      
  updateAcc(timeOut);
  //var t0 = performance.now();
  draw1(delta)
  //var t1 = performance.now();
  draw22(delta)
  //var t2 = performance.now();
  lowPriorityUpdate();
  //var t3 = performance.now();
  //if(t3-t0>20)
  //console.log((t1-t0)+"ms\n"+(t2-t1)+"ms\n"+(t3-t2)+"ms\n");
  
  if(dateNow-10000 > updateLoadTextTime && $("#settings.active").length){
    updateLoadText();
    updateLoadTextTime = dateNow;
  }
  
  window.requestAnimationFrame(draw);
}
window.requestAnimFrame = (function () {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
      window.setTimeout(callback, 1000 / 60);
  };
})();

function start(muted){
  $("#main-menu").css("display","none")
  init();
  if(muted){
    soundVerifier("ambiente",1,true)
    $("#sound-check").click();
    $("#music-check").click();
  }
}

function changedColors(){
  darkness_back = parseFloat($("#darkness").val()||100)
  mainHue = parseFloat($("#brain-hue").val()||100)
  darkness_back_color = "hsl(235, 21%, "+(darkness_back*0.21)+"%)";
  $(".zoom i").css("color",darkness_back_color)
  darkness_brain = parseFloat($("#brain-darkness").val()||30)
  brainColor = "hsla(340, 100%, 100%, "+(darkness_brain*0.01)+")";
  $(".content").css("background",darkness_back_color)
  $("#menu").css("background",darkness_back_color)
  someChanged1 = true;
}
function resetCustom(){
  $("#brain-hue").val(340)
  $("#darkness").val(100)
  $("#brain-darkness").val(30)
  if(!main_neuron_switch)
    $("#main-neuron-switch").click()
  if(brain_color_switch)
    $("#brain-color-switch").click()

  changedColors();
}
$("#customize-div input").change(function(){
  changedColors()
})
$("#canvasSupport").click(function(){
  if(canClick){
    clicksRelative++;
    clicks++;
    clicksToFear--;
    if(clicksToFear<=0){
      accelerator++;
      clicksToFear = clicksToFearInitial;
    }
    testTutorial();
    
    brain.pulse();
    canClick = false;
      setTimeout(function (){
        canClick = true;
      },50)
  }
})
function testTutorial(){
  if(clicks<10){
    $("#click-here").css("display","block")
  }
  else{
    $("#click-here").css("display","none")
  }
}
$("#autopulse").click(function(){
  autopulsechecked = $("#autopulse").is(":checked"); 
})
function criaAchiv(){
  var a = $("#achievs #content-a")
  begin=false;
  if(achsSave.length == 0){
    begin=true;
  }
  for(var i = 0; i<achievements.length;i++){
    if(begin)
      achsSave.push(false);
    var active = ""
    if(achsSave[i])
      active = " active"

    var title = "<h2>"+cnItem(achievements[i][0])+(active == "" ? "":" (已解锁)")+"</h2>"
    var goal = "<h3>"+cnItem(achievements[i][2])+"</h3>"
    var rew = "<h3>"+cnItem(achievements[i][5])+"</h3>"
    var icon = "<i class='"+achievements[i][1]+" icon'></i>"
    
    $(a).append("<div id='achievement"+i+"' class='achievement"+active+"'><div>"+icon+"</div><div>"+title+goal+rew+"</div><div class='bar-achiev'></div></div>")
  }
}
function testAchiv(){
  customizable = false;
  //["teste","Atinge 1000 clicks ","clicks>1000","20","explicacao reward","dna+=100,dnaever+=100",false]
  for(var i = 0;i<achievements.length;i++){
    
    if(!achsSave[i] && eval(achievements[i][3])){
      achsSave[i]=true;
      eval(achievements[i][6])
      $("#achievement-oncontent div i").attr("class",achievements[i][1]);
      $("#achievement-oncontent h2").html(cnItem(achievements[i][0]));
      $("#achievement-oncontent h5").html("奖励: "+cnItem(achievements[i][5]));
      $("#achievement-oncontent").css("display","block");
    }
    else if(achsSave[i]){
      eval(achievements[i][6])
      $("#achievement"+i).addClass("active");
      $("#achievement"+i+" h2").text(cnItem(achievements[i][0]) + " (已解锁)")
      $("#achievement"+i+" .bar-achiev").css("display","none");
    }
    else{
      var val = eval(achievements[i][4])*100
      if(val<100){
        $("#achievement"+i).removeClass("active");
        $("#achievement"+i+" h2").text(cnItem(achievements[i][0]))
        $("#achievement"+i+" .bar-achiev").css("width",val+"%");
      }
      else{
        $("#achievement"+i).addClass("active");
        $("#achievement"+i+" h2").text(cnItem(achievements[i][0]) + " (已解锁)")
        $("#achievement"+i+" .bar-achiev").css("display","none");
      }
    }
    updateValues();
  }
}
function lowPriorityUpdate(){
  if(lowUpdate==0){
    save();
    testAchiv()
    stats(false);
    lowUpdate=lowUpdateReset;
    var calc = funcRad(dnaever) 
    nextRadiation = Math.round(Math.max(0, calc));
    $("#radiationTable0").text(ascencions);
    $("#radiationTable1").text(bigNumber(radiation));
    $("#radiation-value").text(bigNumber(radiation));
    $("#radiationTable3").text(strengthMult(radiation).toFixed(2)+"x");
    $("#radiationTable5").text(clicks);
    $("#radiationTable6").text(brain.size);
    $("#radiationTable7").text("("+maxBrainSize+")");
    $("#radiationTable8").text(bigNumber(dnatotal));
    $("#radiationTable9").text("("+bigNumber(dnaever)+")");
    $("#radiationTable10").text("("+clicksRelative+")");
    if(nextRadiation>0){
      $("#alert").css("display","block");
      $("#ascendButton").attr("class","");
      $("#ascendButton").attr("onclick","confirmationBox('Ascend will restart your upgrades but you will receive <i class=\"fas fa-biohazard\"></i><br>Do you really want to ascend?','ascend()')");
      $("#radiationTable2").text(" (+"+(bigNumber(nextRadiation))+")");
      $("#radiationTable4").text(" ("+ strengthMult(radiation+nextRadiation).toFixed(2)+"x)");
    }
    else{
      $("#alert").css("display","none")
      $("#ascendButton").attr("class","blocked");
      $("#ascendButton").attr("onclick","");
      $("#radiationTable2").text("");
      $("#radiationTable4").text("");
    }
    
//    kongregate.stats.submit('Total DNA(Millions)', Math.round(dnatotal/1e4)/1e2);
//    kongregate.stats.submit('Max brain size', maxBrainSize);
//    kongregate.stats.submit('Clicks', clicks);
    
  }
  else{
    lowUpdate--;
  }
  if(lowUpdate%20==0){
    // tem de ser gravado com mais frequencia
    localStorage.setItem("lastTime",lastTime);
    $("#pulses-perc").css("width",600*(brain.pulses.length/getValues(2,upgrades[2]))+"px");  
  }
}
function ascend(){
  ascencions++;
  radiation+=nextRadiation;
  commonReset();
}

function reset(){
  ascencions = 0;
  radiation = 0;
  ascStatus = [1,1,1,1];
  accelerator = 0;
  clicks = 0;
  dnatotal = 0;
  maxBrainSize = 0;
  for(var i = 0; i<achsSave.length;i++){
    achsSave[i] = false;
  }
  testTutorial();
  updateAscUps();
  commonReset();
}

function commonReset(){
  dna = 0;
  dnaever = 0;
  newNewronLevel = 1;
  clicksRelative = 0;
  anims = [];
  for(var i = 0; i<5 ;i++){
    upgrades[i]=1;
  }
  brain = new Tree([center_x,center_y],maxChilds);
    for (var i = 0; i <6; i++) {
      brain.createNeuron();
    }
    for(var i = 0; i <mults.length; i++) {
      mults[i] = 1
    } 
    for(var i = 0; i <adds.length; i++) {
      adds[i] = 0
    } 
    
  brain.asArrayUpdate();
  updateValues();
  testAchiv();
  renewEffects();
  zoom = 1;
  startDate = Date.now();
  updateLoadText()
}

function zoomFunc(zoomIn){
    if (zoomIn && zoom <1.5)
      zoom*=1.2;// going down
    else if(zoom > 0.02)
      zoom/=1.2;//going up
    brain.changeCenter();
    someChanged1 = true
    return true;
}
function getRestDna(t){
  var toAdd = Math.round(10*(t/1000)*(restDna/60))/10
  if(toAdd>0){  
  divInfo("你休息了 "+miliToText(t)+" 并且你的大脑制造了 " + toAdd + " <i class='fas fa-dna'></i>")
  dna+=toAdd
  dnaever+=toAdd
  dnatotal+=toAdd
  }
}

function confirmationBox(text,func){
  $(".confirmation .true").attr("onclick",func);
  $(".confirmation h3").html(cnItem(text));
  var top = (c_h - (parseFloat( ( ( $(".confirmation").css("height") ))  )))/2;
  $(".confirmation").css("top",top+"px")
  $("#back-layer").css("z-index","19");
  $("#back-layer").css("display","block");
  $(".confirmation").css("display","block");
}

function divInfoAdjustsTop(){
  $(".div-info").each(function(i){
    var top = (c_h - (parseFloat( ( ( $(this).css("height") ))  )))/2;
    $(this).css("top",top+"px")
    })
  $(".div-info-2").each(function(i){
    var top = (c_h - (parseFloat( ( ( $(this).css("height") ))  )))/2;
    $(this).css("top",top+"px")
    })
  $("#back-layer").css("z-index","19");
  $("#back-layer").css("display","block");
}
function divInfo(str){
  $(".div-info h3").html(str);
  divInfoAdjustsTop()
  $(".div-info").css("display","block");
}
$(".confirmation button").click(function(){
  $("#back-layer").css("display","none");
  $(".confirmation").css("display","none");
});
$(".zoom .fa-minus").click(function(){
  zoomFunc(false);
})
$(".zoom .fa-plus").click(function(){
  zoomFunc(true);
})
$(".rearrange").click(function(){
  brain.rearrange();
})
$(".zoom .fa-star").click(function(){
  divInfoAdjustsTop()
  $("#achievs").css("display","block")
})
$(".zoom .fa-chart-line").click(function(){
  stats(true);
  $("#stats-div").css("display","block")
  divInfoAdjustsTop();
})

$(".zoom .fa-cog").click(function(){
  divInfoAdjustsTop()
  $("#config-div").css("display","block")
})

$("#top div").click(function(){
  updateLoadText();
})
$("#reset-custom").click(function(){
  resetCustom();
})
window.addEventListener("keydown", function (event) {
  if (event.defaultPrevented) {
    return; // Should do nothing if the default action has been cancelled
  }
  if(event.key == "f" || event.key == "F"){
    $("#accInput").click();
  }
  if(event.key == "Shift"){
    buyType = "5x"
    updateCostBar();
    updateUpgradeDivs();
  }
  if(event.key == "Control"){
    buyType = "10x"
    updateCostBar();
    updateUpgradeDivs();
  }
}, true);

window.addEventListener("keyup", function (event) {
  if (event.defaultPrevented) {
    return; // Should do nothing if the default action has been cancelled
  }
  if(event.key == "Shift" || event.key == "Control"){
    buyType = "normal"
    updateCostBar();updateUpgradeDivs();
  }
}, true);


function save(){
  localStorage.setItem("saved", true);
  localStorage.setItem("dna", dna);
  localStorage.setItem("dnaever", dnaever);
  localStorage.setItem("dnatotal", dnatotal);
  localStorage.setItem("zoom", zoom);
  localStorage.setItem("newNewronLevel", newNewronLevel);
  localStorage.setItem("ascencions", ascencions);
  localStorage.setItem("radiation", radiation);
  localStorage.setItem("clicksRelative", clicksRelative);
  localStorage.setItem("clicks", clicks);
  localStorage.setItem("clicksToFear", clicksToFear);
  localStorage.setItem("effects-atc", effectsActive);
  localStorage.setItem("accelerator", accelerator);
  localStorage.setItem("maxBrainSize", maxBrainSize);
  localStorage.setItem("adjusts", JSON.stringify(adjusts));
  localStorage.setItem("brainLims", JSON.stringify(brain.limites));
  localStorage.setItem("brainAsArray", JSON.stringify(brain.asArray));
  localStorage.setItem("upgrades", JSON.stringify(upgrades));
  localStorage.setItem("ascStatus", JSON.stringify(ascStatus));
  localStorage.setItem("achsSave", JSON.stringify(achsSave));
  //customize
  localStorage.setItem("cust1", $("#darkness").val());
  localStorage.setItem("cust2", $("#brain-darkness").val());
  localStorage.setItem("cust3", $("#main-neuron-switch").val());
  localStorage.setItem("cust4", $("#brain-color-switch").val());
  localStorage.setItem("cust5", $("#brain-hue").val());
  
  
}
function load(){
  if(localStorage.getItem("saved")){
    dna = parseFloat(localStorage.getItem("dna"))||0;
    dnaever = parseFloat(localStorage.getItem("dnaever"))||0;
    dnatotal = parseFloat(localStorage.getItem("dnatotal"))||0;
    zoom = parseFloat(localStorage.getItem("zoom"))||1;
    newNewronLevel = parseFloat(localStorage.getItem("newNewronLevel"))||0;
    ascencions = parseFloat(localStorage.getItem("ascencions"))||0;
    radiation = parseFloat(localStorage.getItem("radiation"))||0;
    clicksRelative = parseFloat(localStorage.getItem("clicksRelative"))||0;
    clicks = parseFloat(localStorage.getItem("clicks"))||0;
    clicksToFear = parseFloat(localStorage.getItem("clicksToFear"))||clicksToFearInitial;
    accelerator = parseFloat(localStorage.getItem("accelerator"))||0;
    maxBrainSize = parseFloat(localStorage.getItem("maxBrainSize"))||0;
    lastTime = parseFloat(localStorage.getItem("lastTime"))|| lastTime
    eval("adjusts =" + localStorage.getItem("adjusts"));
    eval("brain.limites =" + localStorage.getItem("brainLims"));
    eval("brainAsArray =" + localStorage.getItem("brainAsArray"));
    eval("upgrades =" + localStorage.getItem("upgrades"));
    eval("ascStatus =" + localStorage.getItem("ascStatus"));
    eval("achsSave =" + localStorage.getItem("achsSave") );
    
    if(localStorage.getItem("effects-atc")=="false"){
      $("#effects-check").click()
      effectsActive = false;
    }
    
    
    if(localStorage.getItem("cust3")!="on")
      $("#main-neuron-switch").click()
    if(localStorage.getItem("cust4")!="on")
      $("#brain-color-switch").click()
    $("#darkness").val(parseFloat(localStorage.getItem("cust1")))
    $("#brain-darkness").val(parseFloat(localStorage.getItem("cust2")))
    $("#brain-hue").val(parseFloat(localStorage.getItem("cust5")))
  }
}

var lastDelta = null;
$(".div-info,.close,#back-layer").click(function(){
  $("#back-layer").css("display","none");
  $(".div-info").css("display","none");
  $(".div-info-2").css("display","none");
  $(".confirmation").css("display","none");
})

$("#customize").click(function(){
  divInfoAdjustsTop()
  $("#customize-div").css("display","block")
})
function copyToClipboard(){
  var copyText = document.getElementById("loadtext");
  copyText.select();
  document.execCommand("copy");
  divInfo("游戏存档数据已复制到剪贴板。")
}
var timeout1, timeout2;
function infoMsg(msg){
  $("#infoDiv #msg").html(msg);
  $("#infoDiv").css("display","block");
  $("#infoDiv").css("opacity","1");
  $("#infoDiv").css("left",0.5*(parseFloat($(".content").css("width")) - parseFloat($("#infoDiv").css("width")))+"px");
  clearTimeout(timeout1);
  clearTimeout(timeout2);
  timeout1 = setTimeout(function(){
    $("#infoDiv").css("opacity","0");
    timeout2 = setTimeout(function(){
      $("#infoDiv").css("display","none");
    },400)
  },5000)
}
$("#canvasSupport").mousewheel(function(turn, delta) {

    if (delta>0 ){
      for (var i = 0; i < delta; i++)
      zoomFunc(true)
    }
    else{
      for (var i = 0; i < Math.abs(delta); i++)
      zoomFunc(false)
    }

});
$("#top div:not(#texts)").click(function(){
  $("#top div:not(#texts).active").removeClass("active");
  $(this).addClass("active");
  $(".bottomMenu").removeClass("active");
  var botdiv = $(this).attr("botDiv");
  $("#"+botdiv).addClass("active");
})
$("#effects-check").click(function(){
  effectsActive = effectsActive ? false:true;
})
$("#music-check").click(function(){
  music = music ? false:true;
  if(!music){
    document.getElementById("ambiente1").pause();
  }
  else{
    document.getElementById("ambiente1").play();
  } 
})
$("#sound-check").click(function(){
  sound = sound ? false:true;
})
$("#achievement-oncontent").click(function(){
  $(this).css("display","none")
})
main_neuron_switch = true,brain_color_switch=false;
$("#main-neuron-switch").click(function(){
  main_neuron_switch = main_neuron_switch ? false:true;
})
$("#brain-color-switch").click(function(){
  brain_color_switch = brain_color_switch ? false:true;
})
$("#accInput").click(function(){
  switchAcc()
  if(accMode){
    $($(".value")[0]).addClass("fear");
    $($(".value")[1]).addClass("fear");
    $(".fear-back").css("display","block");
  }
  else{
    $($(".value")[0]).removeClass("fear");
    $($(".value")[1]).removeClass("fear");
    $(".fear-back").css("display","none");
  }
  updateUpgradeDivs();
  //changeOnAutoPulse();
})
function switchAcc(){
  accMode = accMode ? false:true;
}

$(".upgrade").on('click mouseover',function(){

  var p = $(this).parent();
  $(p.find(".nextvalue")).css("display","-webkit-inline-box")
})
$(".upgrade").mouseout(function(){
  var p = $(this).parent();
  $(p.find(".nextvalue")).css("display","none")
})
$(".info-text-div").mouseover(function(){
  $("#info-moving-div").css("display","block")
  $("#info-moving-div").html($(this).attr("info-text"))
  
  ex = $(this).offset().left
  ey = $(this).offset().top
  padding = 0
  if(ex < $(window).width()/2){
    $("#info-moving-div").css("left",($(this).width()+ex+padding)+"px")
    $("#info-moving-div").css("right","")
  }
  else{
    $("#info-moving-div").css("right",(($(window).width()-ex)+padding)+"px")
    $("#info-moving-div").css("left","")
  }
  if(ey < $(window).height()/2){
    $("#info-moving-div").css("top",($(this).height()+20+ey+padding)+"px")
    $("#info-moving-div").css("bottom","")
  }
  else{
    $("#info-moving-div").css("bottom",(($(window).height()-ey)+padding)+"px")
    $("#info-moving-div").css("top","")
  }
})
$(".info-text-div").mouseout(function(){
  $("#info-moving-div").css("display","none")
})
$("#ascension-upgrades-div .fa-angle-up").click(function(){
  if($("#ascension-upgrades-div").hasClass("expanded"))
    $("#ascension-upgrades-div.expanded").removeClass("expanded");  
  else
    $("#ascension-upgrades-div").addClass("expanded");
})

