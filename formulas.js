function corAlterada(dec){
  var ret = mainHue-dec, max = 360
  while(ret<0)
    ret += max
  return ret
}

function calcZoomX(x){
    if (x<center_x) {
      return center_x + ((x-center_x));
    }
    else if (x>center_x) {
      return center_x - ((center_x-x));
    }
    return x;
}
function calcZoomY(y){
    if (y<center_y) {
      return center_y - ((center_y-y));
    }
    else if (y>center_y) {
      return center_y + ((y-center_y));
    }
    return y;
}
function calcZoomSize(size){
  return Math.max(size,2);
}

var animA = 1,animB = 0.386, animC = 1.1;
var anims = [];
function tamanho1Func(act){
  return Math.pow(Math.pow(act * animA, 2) - animB * (Math.pow(act * animA, 3)), animC) * neuronSize *2
}

function bigNumber(n){
  ncopy = n;
  while(ncopy>=1000){
    ncopy = Math.round(ncopy/100)/10
  }
  if (n<10) {
    return Math.round(n*100)/100;
  }
  else if(n<100){
    return Math.round(n*10)/10;
  }
  else if(n<10000){
    return Math.round(n);
  }
  else if(n<1e6){
    return ncopy+"k";
  }
  else if(n<1e9){
    return ncopy+"M";
  }
  else if(n<1e12){
    return ncopy+"B";
  }
  else if(n<1e15){
    return ncopy+"T";
  }
  else if(n<1e18){
    return ncopy+"Qd";
  }
  else if(n<1e21){
    return ncopy+"Qt";
  }
  else if(n<1e21){
    return ncopy+"Sex";
  }
  else if(n<1e24){
    return ncopy+"Sept";
  }
  else if(n<1e27){
    return ncopy+"Oct";
  }
  else if(n<1e30){
    return ncopy+"Nov";
  }
  else if(n<1e33){
    return ncopy+"Dec";
  }
  else if(n<1e36){
    return ncopy+"Und";
  }
  else if(n<1e39){
    return ncopy+"Duo";
  }
  else if(n<1e42){
    return ncopy+"Tre";
  }
  return n;
}

function strengthMult(radiation){
  return Math.pow((radiation+1),0.03)*mults[2]*mults[11]
  //return ((Math.log10(1+radiation)/(100))+1);
}
function funcRad(d){
  //Math.pow(dnaever,0.85)-1000;
  return (Math.pow(d,0.85)-2000)/50;
}

function formulaNewNeuron(x) {
  if (x == 0) {
    return 0;
  }
  form = 20*Math.pow(x,1+0.3*Math.log10(x) )+0.1*Math.pow(x,1+0.95*Math.log10(x))-10;
  return Math.round(form);
}

function desenhavel(){
  if(zoom>0.12)
    return true;
  else
    return false;  
}

function createSound(name,volume,loop) {
  insertSound = document.createElement("audio");
  insertSound.setAttribute("src", "style/sound/" + name + ".wav");
  insertSound.setAttribute("preload", "auto");
  insertSound.setAttribute("controls", "none");
  if(loop)
  insertSound.setAttribute("loop","true");
  insertSound.volume = volume;
  insertSound.style.display = "none";
  for (var a = 1; a != 0; a++) {
    var str = name + a;
      if (document.getElementById(str) == null)
          insertSound.setAttribute("id", name + a), a = -1;

  }
  document.body.appendChild(insertSound);
}
function soundVerifier(string,volume,loop){//verifica se existe o som e se está ligado


  for(var a = 1;a!=0;a++){
    var elem = document.getElementById(string+a);
    if(elem != null){
      if(elem.paused){
        if(sound){
          elem.volume = volume;
          elem.play()
        }
      }else{
        //createSound(string,volume,loop);
      }
          a=-1;
    }
  else{
      createSound(string,volume,loop);
      if(sound)
        document.getElementById(string+a).play();
      a=-1;
      }
    }
}
function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
  }
  return a;
}
function getValues(n, level){
  var ret = 0,add=0;
  var ascStatus0 = Math.pow(ascencionsUps[0][5],ascStatus[0]-1)
  if(n==0){//brain strength
    ret = ascStatus0*(1+0.2*(level-1))*strengthMult(radiation)*mults[0]*mults[6]*mults[8]*mults[12];}
  else if(n==1){//pulse speed
    ret = ascStatus0*(1+0.2*(level-1))*strengthMult(radiation)*mults[1]*mults[5]*mults[9];}
  else if(n==2){//max pulses
    	ret = Math.floor(ascStatus0*Math.round((6+2*(level-1)))+adds[0]+adds[1]+adds[2]);}
  else if(n==3){//self-stimulation
    if(level>=100)
        ret = 500 
    else
        ret = (14500/( ascStatus0*Math.pow(1.1,level-1)  ))+500
    ret = Math.max(500,ret);
    }
  else if(n==4){//loss
    if(level<11)
      ret = 0.8+0.01*(level-1)
    else if(level<21)
      ret = 0.9+0.005*(level-11)
    else if(level<42)
      ret = 0.95+0.002*(level-21)
    else
      ret = 0.99+0.001*(level-41)
    
    ret = 1-((1-ret)/(mults[3]*mults[10]))
    ret = Math.min(ret,0.999)
    add = 1
  }
  return Math.round(ret*(100*Math.pow(10,add) ))/(100*Math.pow(10,add));
}
function costFromTo(n,f,t){
  var total = 0;
  var max = Infinity;
  if(n==3){
    max = 100;
  }
  if(n==4){
    max = 50;
  }
  t = Math.min(t,max-1);
  while(f<=t){
    total += cost(n,f) 
    f++;
  }
  return total;
}
function cost(n,i){
  var ret = null;
  i--;
  if(n==0){
    ret = 10*Math.pow(1.5,i)+20*i;}
  else if(n==1){
    ret = 10*Math.pow(1.5,i)+20*i;}
  else if(n==2){
    ret = 10*Math.pow(1.5,i)+20*i;}
  else if(n==3){
    ret = 10*Math.pow(1.5,i)+20*i;}
  else if(n==4){
    ret = 10*Math.pow(2,i)+20*i;}
    /*
  else if(n==4 && i<=18){
    ret = 10*Math.pow(10,i)+20*i;}*/
    finalMult = 0
  while(ret>1000){
    finalMult+=1
    ret/=10
  }
  ret = Math.floor(ret*Math.pow(ascencionsUps[1][5],ascStatus[1]-1))
  return Math.floor( ret*(10**finalMult) * mults[4]*mults[7]*mults[13]);
}
function upgradeFunc(n,qtd){
  var max = Infinity;
  if(n==3){
    max = 100;
  }
  if(n==4){
    max = 50;
  }
  if(n<5){
    var v = Math.min(max-1,upgrades[n]-1+qtd)
    var qtd = 1+v-upgrades[n];
    
    var cost =costFromTo(n,upgrades[n],v);
    if(dna >= cost ){
      dna-=cost;
      upgrades[n]+=qtd;
    }
  }
  else{
    if(radiation>cost(n,upgrades[n])){
      radiation-=cost(n,upgrades[n]);
      upgrades[n]++;
    }
  }
  
}
function updateCostBar(){
  var qtd = getValueByBuyType();
  for(var i = 0;i<8;i++){
    
    var val = dna;
    if(i>=5)
      val = radiation;
    var bar = $(".bar")[i];
    var test = (100*val)/costFromTo(i,upgrades[i],upgrades[i]-1+qtd);
    if(test>=100){
      var up = $(".upgrade")[i];
      $(up).addClass("active")
    }
    else{
      var up = $(".upgrade")[i];
      $(up).removeClass("active")
    }
    $(bar).css("width",Math.min(100, test )+"%")
  }
}
function miliToText(mili,total,longText){
  if(total == undefined)
    total = mili;
  if(longText == undefined)
    longText = false
  if(mili>=3600000){
    return Math.floor(mili/3600000) +(longText ? " hours and ":"h ") + miliToText(mili%3600000,mili,longText);
  }
  else if(mili>=60000){
    return Math.floor(mili/60000) + (longText ? " minutes and ":"m ") + miliToText(mili%60000,mili,longText);
  }
  else if(mili>=1000){
    return Math.round(mili/10)/100 + (longText ? " seconds":"s ") + miliToText(mili%1000,mili,longText);
  }
  else if( total<1000 && mili>0){
    return Math.round(mili) +"ms";
  }
  else{
    return "";
  }
}
tabelaStrength = [],tabelaStrength2 = []
function atualizaTabelaStrengths(){
  tabelaStrength = [];
  tabelaStrength2 = [];
  var exp = getValues(4,upgrades[4])
  for(var i = 0; i<brain.maxLevel; i++){
    //baseado na area
    var exp = getValues(4,upgrades[4])
    d = Math.pow( Math.pow(exp,i),0.5)
    tabelaStrength.push(d)
    //baseado no dna
    tabelaStrength2.push( getValues(0,upgrades[0]) * Math.pow(exp,i))
  }
}
function addNewTabelaStrengths(level) {
  if(tabelaStrength.length<=level){
    var exp = getValues(4,upgrades[4])
    d = Math.pow( Math.pow(exp,level),0.5)
    tabelaStrength.push(d)
    tabelaStrength2.push( getValues(0,upgrades[0]) * Math.pow(exp,(level)))
  }
}
function updateUpgradeDivs(){
  var qtd = getValueByBuyType(); 
  for (var i = 0; i < upgrades.length; i++) {
    var valor = $(".value")[i];
    var nextValue = $(".nextvalue")[i];
    if(i==3){
      $(nextValue).text(("("+miliToText(getValues(3,upgrades[3]+qtd))+")").replace(" ",""));      
      $(valor).text(miliToText(getValues(3,upgrades[3])));
    }
    else if(i==4){
      $(nextValue).text("("+Math.round( 10 *((1-getValues(4,upgrades[4]+qtd))*100))/10+"%)");
      $(valor).text( Math.round( 10 *((1-getValues(4,upgrades[4]))*100))/10 );
    }
    else{
      $(nextValue).text("("+getValues(i,upgrades[i]+qtd)+")");
      $(valor).text(getValues(i,upgrades[i]))
    }
    if((i == 0 || i == 1) && accMode){
      $(nextValue).text("("+4*getValues(i,upgrades[i]+qtd)+")");
      $(valor).text(4*getValues(i,upgrades[i]))
    }
      
    var costvar = $(".costspan")[i];
    $(costvar).text(bigNumber(costFromTo(i,Math.max(0,upgrades[i]),Math.max(0,upgrades[i]-1+qtd))));
  }
}
function updateValues(){
  updateUpgradeDivs();
  pulseSpeed = getValues(1,upgrades[1]);
  maxPulses = getValues(2,upgrades[2]);
  restDna = getValues(4,upgrades[4]);

  atualizaTabelaStrengths();
  $(".nivel").each(function(i){
    $(this).text(upgrades[i]);
  });
  if(customizable){
		$("#customize").css("display","block")
  }
  else{
		$("#customize").css("display","none")
	}

  upgradeLimit = 100
	if(upgrades[3]>=upgradeLimit){
		$($(".upgrade")[3]).css("display","none")
		$($(".cost")[3]).css("display","none")
		$($(".finished")[0]).css("display","block")
	  }else{
		$($(".upgrade")[3]).css("display","block")
		$($(".cost")[3]).css("display","block")
		$($(".finished")[0]).css("display","none")
    }	
  upgradeLimit = 50
	if(upgrades[4]>=upgradeLimit){
		$($(".upgrade")[4]).css("display","none")
		$($(".cost")[4]).css("display","none")
		$($(".finished")[1]).css("display","block")
	  }else{
		$($(".upgrade")[4]).css("display","block")
		$($(".cost")[4]).css("display","block")
		$($(".finished")[1]).css("display","none")
	  }
}


function loadPage(msg,minsecs){
  if(msg == "open"){
    dateOpen = Date.now()
    //console.log("Rearranging brain.");
    divInfoAdjustsTop()
    $($("#back-layer")[0]).css("z-index","999");
    $("#load-page #click-somewhere").css("display","none")
    $("#load-page #fact").html("\""+facts[Math.floor(Math.random()*facts.length)]+"\"");
    $("#load-page").css("display","block");
  }
  else if( msg == "close" && $("#load-page").css("display")=="block" ){
    if(minsecs != null && (Date.now()-minsecs*1000)>dateOpen){
      $("#load-page").css("display","none");
      $("#back-layer").css("display","none");
      $("#back-layer").css("z-index","19");
    }
    else if(minsecs!=null){
      setTimeout(function(){loadPage("close",minsecs)},500)
    }
    else{
      $("#load-page #click-somewhere").css("display","block")
    }
  }
  else if(!isNaN(Number(msg))){
    $("#load-page #perc").text(msg+"%")
  }
}
$("#load-page").click(function(){
  loadPage("close",0)
})
function updateAcc(delta){
  timeToWin = 60000;
  totalTimeOutInit = totalTimeOut
  acceleratorToAdd = 0
  while(totalTimeOut>=timeToWin ){
    totalTimeOut -=timeToWin
    acceleratorToAdd++;
  }
  acceleratorToAdd = Math.min(acceleratorToAdd,2000) 
  if(acceleratorToAdd>0){
    accelerator+=acceleratorToAdd
    divInfo("You slept for "+miliToText(totalTimeOutInit,undefined,true)+" and had nightmares so your brain generate "+acceleratorToAdd+" fear point"+(acceleratorToAdd>1 ? "s": "") +".")
  }
  if(accMode && accelerator>0){
    accelerator-=0.002*delta;
  }
  else if(accMode && accelerator<=0){
    $("#accInput").click();
    accelerator = 0;
  }
  $("#accelerator").text(Math.ceil(accelerator*10)/10)
}
$(".upgrade").click(function(){
  var i = $(this).attr("upgrade");
  upgradeFunc(i,getValueByBuyType());
  updateValues();
  lowPriorityUpdate();
});

$(".tecla").click(function(){
  $(this).hasClass("active") ? $(this).removeClass("active") : $(this).addClass("active");
  if( $($(".tecla")[0]).hasClass("active") && $($(".tecla")[1]).hasClass("active") ){
    $($(".tecla")[0]).removeClass("active")
    $($(".tecla")[1]).removeClass("active")
    $(this).addClass("active")
  }
  updateCostBar();
  updateUpgradeDivs();
})

function getImpulse(){
  return 1+impulse*percImpulse;
}
function toRoman(num) {
  if (isNaN(num))
      return NaN;
  var digits = String(+num).split(""),
      key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
             "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
             "","I","II","III","IV","V","VI","VII","VIII","IX"],
      roman = "",
      i = 3;
  while (i--)
      roman = (key[+digits.pop() + (i * 10)] || "") + roman;
  return Array(+digits.join("") + 1).join("M") + roman;
}

var ascencionsUps = [
  //["name","upgrade",qtd,initialprice,exponencialGrow,baseValue]
  ["Math skills","1.20x upgrades",10,100,5,1.2],
  ["Mutation rate","upgrade costs reduce by 25%",5,100,5,0.75],
  ["Neuron proximity","Neurons distance reduce by 5%",3,500,25],
  ["Cell grow","+1 neuron per level",1,25000,10]
]
//[descpt,descpt2,]
var ascStatus = [1,1,1,1];
function ascUpFunc(a){
  var cost = ascCost(a)
  if(radiation>=cost){
    radiation-=cost;
    ascStatus[a]++;
    if(a==2){
      brain.rearrange()
    }
    updateAscUps();
    updateValues();
  }
}
function updateAscUps(){
  
  var status = ["locked","unlocked","bought"];
  var unl = "";
  var loc = "";
  var bou = ""
  for(var i = 0; i<ascencionsUps.length;i++){
    for(var u = ascencionsUps[i][2]; u>0;u--){
	
	if(u < ascStatus[i])
      var statusHere = status[2];
    else if(u == ascStatus[i])
      var statusHere = status[1];
    else if(u > ascStatus[i])
      var statusHere = status[0];
            var a = "<div class='ascension-up "+statusHere+"'>"
            roman = ""
            if(ascencionsUps[i][2]>1){
              roman = " " + toRoman(u)
            }
                if(statusHere != "locked"){
                  a += "<h3 class='description'>"+ cnItem(ascencionsUps[i][0]) + roman +"<br>"
                  a += "<span class='description2'>"+ ascencionsUps[i][1] +"</span></h3>"
                  a += "<h3 class='price'>成本:"+ bigNumber( ascCost(i,u) )+" <i class='fas fa-biohazard'></i></h3>"
                }
                else
                  a += "<h2 class='locked-text'>未解锁</h2></div>"


                if(statusHere == "unlocked")
                a += "<h3 asc-upgrade='0' class='upgrade' onclick='ascUpFunc("+i+")'>升级</h3></div>"
                else if(statusHere == "bought")
                a += "<h3 asc-upgrade='0' class='upgrade'>购买</h3></div>"
        
                if(statusHere == "locked")
                loc +=a;
                else if(statusHere == "unlocked")
                unl +=a;
                else
                bou +=a;
        
      }
    }
    $("#ascension-upgrades").html("");
    $("#ascension-upgrades").append(unl);
    $("#ascension-upgrades").append(loc);
    $("#ascension-upgrades").append(bou);
  }
function ascCost(i,a){
  var ord = ascStatus[i]-1;
  if(a)
    ord = a-1;
  return ascencionsUps[i][3]*Math.pow(ascencionsUps[i][4],ord);
}

function stats(force){
  if(force || $("stats-div").css("display") == "block"){
  var levels =[{y:NaN},{y:1}]
  sum = 0
  for( var i = 1; i<brain.size;i++){
    lvl = brain.list[i].level
    sum += lvl
    if(levels[lvl] != undefined)
      levels[lvl] = {y:++levels[lvl].y}
    else
      levels[lvl] = {y:1}
    }
    
    var chart = new CanvasJS.Chart("stats", {
      theme: "light2",
      title:{
        text: "Neurons per level"
      },
      width:670,
      height:375,
      axisX:{
        minimum: 0.5,
        steps: 1
      },
      axisY:{
        includeZero: true
      },
      data: [{
        color:"#f50052",        
        type: "line",       
        dataPoints: levels
      }]
    });
    chart.render();
    var s = brain.size
    var average = Math.floor(((sum*100)/s))/100
    $("#neurons-num").text(s);
    $("#average-neuron-lvl").text(average)

  }
}
function loadFunc(def){
  if(def == 'stop'){
    return 0
  }
  return 0
}
function saveTextAsFile()
{
	var textToWrite = document.getElementById("loadtext").value;
	var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
	var fileNameToSaveAs = "brain-creator-save";

	var downloadLink = document.createElement("a");
	downloadLink.download = fileNameToSaveAs;
	downloadLink.innerHTML = "Download File";
	if (window.webkitURL != null)
	{
		// Chrome allows the link to be clicked
		// without actually adding it to the DOM.
		downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
	}
	else
	{
		// Firefox requires the link to be added to the DOM
		// before it can be clicked.
		downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
		downloadLink.onclick = destroyClickedElement;
		downloadLink.style.display = "none";
		document.body.appendChild(downloadLink);
	}

	downloadLink.click();
}

function destroyClickedElement(event)
{
	document.body.removeChild(event.target);
}

function loadFileAsText()
{
	var fileToLoad = document.getElementById("fileToLoad").files[0];

	var fileReader = new FileReader();
	fileReader.onload = function(fileLoadedEvent) 
	{
		var textFromFileLoaded = fileLoadedEvent.target.result;
		document.getElementById("inputTextToSave").value = textFromFileLoaded;
	};
	fileReader.readAsText(fileToLoad, "UTF-8");
}
facts = ["I'm not your dad","Banging your head against a wall for one hour burns 150 calories.", "In Switzerland it is illegal to own just one guinea pig.", "Pteronophobia is the fear of being tickled by feathers.", "Snakes can help predict earthquakes.", "A flock of crows is known as a murder.", "The oldest \"your mom\" joke was discovered on a 3,500 year old Babylonian tablet.", "So far, two diseases have successfully been eradicated: smallpox and rinderpest.", "29<sup>th</sup> May is officially \"Put a Pillow on Your Fridge Day\".", "Cherophobia is an irrational fear of fun or happiness.", "7% of American adults believe that chocolate milk comes from brown cows.", "If you lift a kangaroo’s tail off the ground it can’t hop.", "Bananas are curved because they grow towards the sun.", "Billy goats urinate on their own heads to smell more attractive to females.", "The inventor of the Frisbee was cremated and made into a Frisbee after he died.", "During your lifetime, you will produce enough saliva to fill two swimming pools.", "If Pinocchio says \"My Nose Will Grow Now\", it would cause a paradox.", "Polar bears <u>could</u> eat as many as 86 penguins in a single sitting…", "King Henry VIII slept with a gigantic axe beside him.", "Movie trailers were originally shown after the movie, which is why they were called \"trailers\".", "An eagle can kill a young deer and fly away with it.", "Heart attacks are more likely to happen on a Monday.", "Tennis players are not allowed to swear when they are playing in Wimbledon.", "In 2017 more people were killed from injuries caused by taking a selfie than by shark attacks.", "The top six foods that make your fart are beans, corn, bell peppers, cauliflower, cabbage and milk.", "There is a species of spider called the Hobo Spider.", "A lion’s roar can be heard from 5 miles away.", "Saint Lucia is the only country in the world named after a woman.", "A baby spider is called a spiderling.", "The United States Navy has started using Xbox controllers for their periscopes.", "The following can be read forward and backwards: Do geese see God?", "A baby octopus is about the size of a flea when it is born.", "A sheep, a duck and a rooster were the first passengers in a hot air balloon.", "In Uganda, around 48% of the population is under 15 years of age.", "The average male gets bored of a shopping trip after 26 minutes.", "In the 16<sup>th</sup> Century, Arab women could i…ce if their husbands didn’t pour coffee for them.", "Recycling one glass jar saves enough energy to watch television for 3 hours.", "After the premiere of \"<em>16 and Pregnant</em>,\" teen pregnancy rates dropped.", "Approximately 10-20% of U.S. power outages are caused by squirrels.", "Facebook, Instagram and Twitter are all banned in China.", "95% of people text things they could never say in person.", "Honeybees can recognize human faces.", "The Battle of Hastings didn’t take place in Hastings.", "While trying to find a cure for AIDS, the Mayo Clinic made glow in the dark cats.", "A swarm of 20,000 bees followed a car for two days because their queen was stuck inside.", "Nearly 3% of the ice in Antarctic glaciers is penguin urine.", "Bob Dylan’s real name is Robert Zimmerman.", "A crocodile can’t poke its tongue out.", "Sea otters hold hands when they sleep so they don’t drift away from each other.", "A small child could swim through the veins of a blue whale.", "Bin Laden’s death was announced on 1<sup>st</sup> …s death was announced on 1<sup>st</sup> May 1945.", "J.K. Rowling chose the unusual name ‘Hermione’ so young girls wouldn’t be teased for being nerdy.", "Hewlett-Packard’s (also known as HP) name was decided in a coin toss in 1939.", "There is a total of 1,665 steps in the Eiffel Tower.", "The Pokémon Hitmonlee and Hitmonchan are based off of Bruce Lee and Jackie Chan.", "A woman once tried to commit suicide by jumping of…onto the 85<sup>th</sup> floor by a gust of wind.", "Pirates wore earrings because they believed it improved their eyesight.", "Los Angeles’s full name is \"El Pueblo de Nuestra Senora la Reina de los Angeles de Porciuncula.\"", "The Twitter bird actually has a name – Larry.", "Octopuses have four pairs of arms.", "In the popular sitcom, <em>Parks and Recreation</e…player when they wrote the Duke Silver plot line.", "It snowed in the Sahara desert for 30 minutes on the 18<sup>th</sup> February 1979.", "Mike Tyson once offered a zoo attendant 10,000 dollars to let him fight a gorilla.", "ABBA turned down 1 billion dollars to do a reunion tour.", "There has never been a verified snow leopard attack on a human being.", "The first alarm clock could only ring at 4 a.m.", "Birds don’t urinate.", "Dying is illegal in the Houses of Parliaments.", "The most venomous jellyfish in the world is the Irukandji.", "The 20<sup>th</sup> of March is Snowman Burning Day.", "Queen Elizabeth can’t sit on the Iron Throne from <em>Game of Thrones</em>.", "There is official Wizard of New Zealand.", "An apple, potato, and onion all taste the same if you eat them with your nose plugged.", "Vincent van Gogh only sold one painting in his lifetime.", "A company in Taiwan makes dinnerware out of wheat, so you can eat your plate!", "The average person walks the equivalent of five times around the world in their lifetime.", "Michael Jackson offered to make a Harry Potter musical, but J.K. Rowling rejected the idea.", "The world record for stuffing drinking&nbsp;straws into your mouth at once is 459.", "Nutella was invented during WWII, when hazelnuts w…mixed into chocolate to extend chocolate rations.", "In 2011, more than 1 in 3 divorce filings in the U.S. contained the word \"Facebook.\"", "According to Genesis 1:20-22 the chicken came before the egg.", "Honeybees can get drunk on fermented tree sap.", "Tears contain a natural pain killer which reduces pain and improves your mood.", "Squirrels forget where they hide about half of their nuts.", "Millions of birds a year die from smashing into windows in the U.S. alone.", "Dolly Parton lost in a Dolly Parton look-alike contest.", "George W. Bush was once a cheerleader.", "In total, there are 205 bones in the skeleton of a horse.", "Coca-Cola owns all website URLs that can be read as ahh, all the way up to 62 h’s.", "Each year there are more than 40,000 toilet related injuries in the United States.", "Strawberries can be red, yellow, green or white.", "Mewtwo is a clone of the Pokémon Mew, yet it comes before Mew in the Pokédex.", "Four people lived in a home for 6 months infested …wn recluse spiders, but none of them were harmed.", "Madonna suffers from brontophobia, which is the fear of thunder.", "In June 2017, the Facebook community reached 2 billion active users.", "Samuel L. Jackson requested to have a purple light…n order for him to accept the part as Mace Windu.", "Paraskavedekatriaphobia is the fear of Friday the 13<sup>th</sup>.", "Kleenex tissues were originally used as filters in gas masks.", "In 1998, Sony accidentally sold 700,000 camcorders…d the technology to see through people’s clothes.", "During your lifetime, you will spend around thirty-eight days brushing your teeth.", "Ronald McDonald is \"Donald McDonald\" in Japan because it makes pronunciation easier for the Japanese.",
"Signs of successful brain surgeries go as far back as the Stone Age.",
"An adult brain weighs about 3 pounds(1.4kg).",
"About 75 percent of the brain is made up of water. This means that dehydration, even in small amounts, can have a negative effect on the brain functions.",
"The largest brain of any animal is that of the sperm whale. It weighs about 20 pounds(9kg).",
"The human brain will grow three times its size in the first year of life. It continues to grow until you’re about 18 years old.",
"Headaches are caused by a chemical reaction in your brain combined with the muscles and nerves of your neck and head.",
"The brain of a human contains approximately one hundred billion neurons",
"It is a myth that humans only use 10 percent of our brain. We actually use all of it. We’re even using more than 10 percent when we sleep.",
"Cholesterol is key to learning and memory. However, high cholesterol has different effects depending on your age and other factors.",
"Information runs between neurons in your brain for everything we see, think, or do. These neurons move information at different speeds. The fastest speed for information to pass between neurons is about 250 mph.",
"Dreams are believed to be a combination of imagination, phycological factors, and neurological factors. They prove that your brain is working even when you are sleeping.",
"Phantom limb pain syndrome is when the central nervous system, which includes your brain, continues to feel the pain of a limb that has been amputated.",
"The brain can’t feel pain. It interprets pain signals sent to it, but it does not feel pain.",
"The human brain begins to lose some memory abilities as well as some cognitive skills by your late 20s.",
"The human brain gets smaller as we get older. This usually happens sometime after middle age.",
"During the mummification process, Egyptians would usually remove the brains through the nose.",
"Computer or video games may help improve cognitive abilities. However, more studies must be conducted to learn how much they help or what types of games help.",
"Your brain uses 20 percent of the oxygen and blood in your body.","Crocodiles can't stick out their tongue"]