var dist = 100;
var freeWay = true;
var geneticArr = null;
function Tree(){
    var root = new Node([center_x,center_y],null,[0,0]);
    this.size = 1;
    this.sizePossible = 1;
    this.root = root;
    this.maxLevel = 1
    this.pulses = [];
    this.list = [root];
    this.listPossible = [root];
    this.limites = [center_y,center_x,center_y,center_x];
    this.asArray = null;
}
Tree.prototype.asArrayUpdate = function(){
  this.asArray = this.root.asArray([]);
}
Tree.prototype.rearrange = function(){
  t = this
  if(t.size>750)
    loadPage("open")
  window.setTimeout(function(){
    var atualSize = t.size;
    var root = new Node([center_x,center_y],null,[0,0]);
    t.size = 1;
    t.sizePossible = 1;
    t.root = root;
    t.pulses = [];
    t.maxLevel = 1;
    t.list = [root];
    t.listPossible = [root];
    t.limites = [center_y,center_x,center_y,center_x];
    anims = [];
    renewEffects();
    for (var i = 0; i <atualSize-1; i++){
      p = (i/atualSize)*100
      loadPage(p)
      t.createNeuron(true);
    }
    stats(true)
    someChanged1 = true;
    loadPage("close",null)
  },10)
}
Tree.prototype.append = function(val){
  this.size++;
  var n = new Node(val)
  this.list.push(n)
  
  return this.root.append(val);
}
Tree.prototype.insert = function(val){
  if(this.list[this.toAdd].childs()<this.maxChilds){
    var no = new Node(val);
    this.size++;
    
    this.list.push(no)
    this.list[this.toAdd].child.push(no);
    if(no.level>this.maxLevel){
      this.maxLevel = no.level
      addNewTabelaStrengths(this.maxLevel)
    }
    
    brain.asArrayUpdate();
    someChanged2= true;
  }
  else{
    this.toAdd++;
    this.insert(val);
  }
}
Tree.prototype.existPos = function (x,y) {
  for(var i = 0; i < this.size; i++){
    if(this.list[i].val[0] == x && this.list[i].val[1] == y )
      return true;
  }
  return false;
};
Tree.prototype.getNode = function (x,y) {
  
  for(var i = 0; i < this.size; i++){
    if(this.list[i].val[0] == x && this.list[i].val[1] == y )
      return this.list[i];
  }
  return null;
};
Tree.prototype.adjustLimits = function (x,y) {
  this.limites[0] = Math.min(y,this.limites[0]);
  this.limites[1] = Math.min(x,this.limites[1]);
  this.limites[2] = Math.max(y,this.limites[2]);
  this.limites[3] = Math.max(x,this.limites[3]);
  this.changeCenter();
};

Tree.prototype.changeCenter = function () {
  var xFinal = -(((this.limites[2]+this.limites[0])/2)-center_y);
  var yFinal = -(((this.limites[3]+this.limites[1])/2)-center_x);
  var v1 = (xFinal-adjusts[1])/30
      ,v2 = (yFinal-adjusts[0])/30
  if(v1!=0){
    while(Math.abs(v1)<1){
      v1*=2
    }
  }
  if(v2!=0){
    while(Math.abs(v2)<1){
      v2*=2
    }
  }
  if(v1 != 0 || v2 != 0){
    lastCheck++;
    this.changeCenterAux(lastCheck,v1,v2,xFinal,yFinal);
  }
};
var lastCheck = 0;
Tree.prototype.changeCenterAux = function (id,xSpeed,ySpeed,xFinal,yFinal) {
  if(id==lastCheck){
  var test1x = adjusts[1] > xFinal;
  var test1y = adjusts[0] > yFinal;
  while(Math.abs(xSpeed)+Math.abs(ySpeed)<0.01){
    xSpeed*=2
    ySpeed*=2
  }
  adjusts[0] += ySpeed;
  adjusts[1] += xSpeed;
  var test2x = adjusts[1] > xFinal;
  var test2y = adjusts[0] > yFinal;
  if(test1x==test2x && test1y==test2y){
    setTimeout(function(){
      brain.changeCenterAux(id,xSpeed,ySpeed,xFinal,yFinal);
    },10)
  }
  else{
      adjusts[1] = Math.floor(xFinal);
      adjusts[0] = Math.floor(yFinal);
    }
  }
  someChanged1= true;
};
Tree.prototype.drawNewNeurons = function(novos){
  for(var i = 0; i<novos.length;i++){
    
    dim = diminuiConnects(novos[i][0],novos[i][1],novos[i][2],novos[i][3])
    ctx1.beginPath()
    ctx1.moveTo(getXCalc(dim[0]), getYCalc(dim[2]));
    ctx1.lineTo(getXCalc(dim[1]), getYCalc(dim[3]));
    ctx1.lineWidth = connectionWidth;
    ctx1.strokeStyle = brainColor;
    ctx1.stroke();
    ctx1.closePath();
    
   drawN(novos[i][2],novos[i][3] )
    
    novos.splice(i,1)
  }
  
}
Tree.prototype.drawNeurons = function (delta) {
  var atual = brain.asArray.slice(0);
  this.root.drawConnections(atual,delta);
  this.root.drawNeurons(atual,delta);
};
Tree.prototype.createInPos = function(parent,x,y){
  var novo = new Node([x,y],parent,[0,0]);
  this.list.push(novo);
  this.listPossible.push(novo);
  parent.child.push(novo);
  this.adjustLimits(x,y);
  this.size++;
  this.sizePossible++;
  if(this.size>maxBrainSize){
    maxBrainSize = this.size;
  }
  if(novo.level>this.maxLevel){
    this.maxLevel = novo.level
    addNewTabelaStrengths(this.maxLevel)
  }
}
function hDistF(){
  return dist/Math.pow(1.05,ascStatus[3]-1)
}
Tree.prototype.createNeuron = function(anim){

  
  if (this.sizePossible>0) {
    var n = 0;
  if (this.size > 6 ) {
    n = Math.floor(Math.random()*this.sizePossible);
  }
  var from = this.listPossible[n].val;
  var x=0,y=0;
  var x0 = from[0];
  var y0 = from[1];
  var valid = false;
  var angInitial=0//(Math.PI*Math.floor(1+Math.random()*6) )/(3);
  var ang=angInitial;
  Hdist = hDistF()
  
  do{
    x = Math.round(x0 + Hdist * Math.cos(ang));
    y = Math.round(y0 + Hdist * Math.sin(ang));
    ang+=Math.PI*(2/6);
  }while (ang<=angInitial+(Math.PI*2) && !(valid = this.validDistance(x,y)) )
  if (valid) {
    this.adjustLimits(x,y);
    this.size++;
    this.sizePossible++;
    if(this.size>maxBrainSize){
      maxBrainSize = this.size;
    }
    
    var novo = new Node([x,y],this.listPossible[n]);
    this.list.push(novo)
    this.listPossible.push(novo)
    this.listPossible[n].child.push(novo);
    
    if(novo.level>this.maxLevel){
      this.maxLevel = novo.level
      addNewTabelaStrengths(this.maxLevel)
    }
    brain.asArrayUpdate();
    if(!anim)
      createEffect(x,y,2,0,1);
    newToDraw.push([x0,y0,x,y]);
    freeWay = true;
  }
  else{
    this.sizePossible--;
    this.listPossible.splice(n,1);
    freeWay = true;
    this.createNeuron();
    stats();
    }
  }
  
}
Tree.prototype.validDistance = function(x,y){
  var valid = true;
  Hdist = hDistF()
  for (var i = 0; valid && i < this.list.length; i++) {
    if (getDistance(x,y,this.list[i].val[0],this.list[i].val[1])<=0.9*Hdist) {
      valid = false;
    }
  }
  return valid;
}
Tree.prototype.pulse = function(){
  var r = this.root;
  var listChilds = shuffle(r.child);
  this.asArray[3][0][0]=1;
  createEffect(r.val[0],r.val[1],1,0,1);
  var gae1 = accMode ? 4 : 1;
  dnaToAdd = tabelaStrength2[0]*gae1;
  dna += dnaToAdd;
  dnaever += dnaToAdd;
  dnatotal += dnaToAdd;
  if(this.pulses.length < maxPulses){
    for (var i = 0; this.pulses.length < maxPulses && i < r.child.length; i++) {
      //this.pulses1.set
      this.pulses.push(new Pulse(r,listChilds[i],0));
    }
  } 
}
function Pulse(atualN,gotoN,difference){
  this.distx = gotoN.val[0]-atualN.val[0]
  this.disty = gotoN.val[1]-atualN.val[1]
  this.gotox = gotoN.val[0];
  this.gotoy = gotoN.val[1];
  this.nodeGoto = gotoN;
  this.counter = 100+difference;
}
Tree.prototype.drawPulses = function(delta){
  
  var l = this.pulses.length;
  var desenhavelVar = desenhavel();
  var doSound = false;
  var gae1 = accMode ? 4 : 1;
  var diminuicao = delta*gae1*pulseSpeed;
  var dnaToAdd = 0;
  var arrEffects = [];
  for (var i = 0; i < l; i++) {
    var ativo = true;
    var p = this.pulses[i];
    p.counter -= diminuicao;
    if (p.counter <= 0) {
      ativo = false;
      doSound++;
      var arrAux = [];
      toGo = p.nodeGoto
      for (var f = 0; f < toGo.child.length; f++) 
            arrAux.push(f);
      //criar tabela para guardar strengths em vez de calcular sempre
      
      strength = tabelaStrength[toGo.level-1]
      if(strength>0.1){ 
            while(arrAux.length > 0 && this.pulses.length < maxPulses){
            var ord = Math.floor(Math.random()*arrAux.length);
            var f = arrAux[ord];
            arrAux.splice(ord,1);
            
            this.pulses.push(new Pulse(toGo,toGo.child[f],p.counter));
            l++;
           }
      }
      
      this.pulses.splice(i,1);
      i--;
      l--;
      
      arrEffects.push([toGo.val[0],toGo.val[1],1,toGo.level,tabelaStrength[toGo.level-2]])
      dnaToAdd += gae1*tabelaStrength2[toGo.level-2];
    }
    var counterPer = (p.counter/100);
    if (desenhavelVar && ativo){
      //desenha pulses
      px = p.gotox - counterPer * p.distx;
      py = p.gotoy - counterPer * p.disty;
      if (Math.random()<0.01 && effectsActive)
      particles.push(new Particle(calcZoomX(px)+adjusts[0] ,calcZoomY(py)+adjusts[1],2,1.2,mainColor))

      ctx2.beginPath();
      ctx2.arc(calcZoomX(px)+adjusts[0], calcZoomY(py)+adjusts[1], calcZoomSize(pulseSize), 0, 2 * Math.PI, false);
      if(accMode)
      ctx2.fillStyle = fearColor;
      else
      ctx2.fillStyle = mainColor;
      ctx2.fill();
      ctx2.closePath()
    } 
  } 
  createEffects(arrEffects)
  dna += dnaToAdd;
  dnaever += dnaToAdd;
  dnatotal += dnaToAdd;
  if(doSound>0)
    soundVerifier("sound4",Math.max(0.02,Math.min(0.008*doSound,0.2)),false)
  
}
var particles = [];
function Particle(x,y,speed,size,color){
  var ang = Math.random()*Math.PI*2;
  this.speedx = speed*Math.cos(ang);
  this.speedy = speed*Math.sin(ang);
  this.x = x;
  this.y = y;
  this.downSizing = 1.05 + Math.random()*0.05;
  this.size = size;
  this.color = color;
}
function drawParticles(delta){
  if(desenhavel()){
  var l = particles.length;
  
  for (var i = 0; i < l; i++) {
    var part = particles[i]

    ctx2.beginPath();
    ctx2.arc(part.x, part.y, part.size, 0, 2 * Math.PI, false);
    ctx2.fillStyle = part.color;
    ctx2.fill();
    ctx2.closePath()
    part.x += delta*part.speedx;
    part.y += delta*part.speedy;
    part.size /= part.downSizing;
    if(part.size<0.01){
      particles.splice(i,1);
      i--;
      l--;
      }
    }  
  }
}

function Node(val, parent, actives) {
  this.val = val;
  this.parent = parent;
  this.actives = actives;
  this.child = [];
  if(parent == null){
    this.level = 1
  }
  else{
    this.level = parent.level+1;
  }
}
Node.prototype.asArray = function(arr,generation,genArr){
  var childs = [];
  if(generation == undefined){
    generation = 0
    genArr = [1];
  }
  else{
    generation++;
    if (genArr[generation]==undefined)
      genArr[generation] = 1
    else 
      genArr[generation]++;
  }
    
  for(var i = 0;i<this.child.length;i++){
    childs.push(this.child[i].asArray([],generation,genArr));
  }
  
  arr.push(this.val[0],this.val[1],childs,[this.actives],generation);
  geneticArr = genArr;
  return arr;
}
Node.prototype.drawNeurons = function(atual){
  
  var i = 0;
  var lst = [];
  var test = true;
  
  
  drawN(atual[0],atual[1],true)
  while(test){
  if(lst.length > 0){
    atual = lst[0][0]; 
    i = lst[0][1];
    lst = lst.splice(1);
    }
  while(atual[2].length > 0){//verifica se o no atual tem ligacoes
    
    if(atual[2].length>(i+1)){
      lst.push([atual,(i+1)]);
    }
      
      atual = atual[2][i];
      drawN(atual[0],atual[1])
      i=0;
    }
    test = lst.length > 0;
    
  }

}

function drawN(x,y,first){
  var xf = getXCalc(x), yf = getYCalc(y); 
  ctx1.beginPath();
  ctx1.arc(Math.floor(xf),Math.floor(yf), calcZoomSize(neuronSize), 0, 2 * Math.PI, false);
  ctx1.fillStyle = brainColor;
  ctx1.fill();
  if(main_neuron_switch && first){
    ctx1.strokeStyle = "white"
    ctx1.lineWidth = 3
    ctx1.stroke();
  }
  ctx1.closePath()
}

function diminuiConnects(xi,yi,xf,yf){
  val = neuronSize+4
  distancia = hDistF()
  xd = (xf-xi)
  yd = (yf-yi)

  xd = val*(xd/distancia)
  yd = val*-(yd/distancia)
  xi += xd
  xf -= xd
  yi -= yd
  yf += yd
  return [Math.floor(xi),Math.floor(xf),Math.floor(yi),Math.floor(yf)]
}
Node.prototype.drawConnections = function(atual){
  var i = 0;
  var lst = [];
  var test = true;
  ctx1.beginPath()
  while(test){
  if(lst.length > 0){
    atual = lst[0][0]; 
    i = lst[0][1];
    lst = lst.splice(1);
    }
  while(atual[2].length > 0){
    //verifica se o no atual tem ligacoes
    
    dim = diminuiConnects(atual[0],atual[1],atual[2][i][0],atual[2][i][1])
    
    ctx1.moveTo(getXCalc(dim[0]), getYCalc(dim[2]) );
    ctx1.lineTo(getXCalc(dim[1]), getYCalc(dim[3]));
    if(atual[2].length>(i+1)){
      lst.push([atual,(i+1)]);
    }
      
      atual = atual[2][i];
      i=0;
    }
    test = lst.length > 0;
    
  }
  ctx1.lineWidth = connectionWidth;
  ctx1.strokeStyle = brainColor;
  ctx1.stroke();
  ctx1.closePath()
}

Node.prototype.isNeuron = function(){
  return this.val != null;
}
Node.prototype.childs = function(){
  return this.child.length;
}
