//Definir pincel
var canvas =document.getElementById("canvas");
var ctx=canvas.getContext("2d");
//PRUEBA////ctx.fillRect(20,20,300,300)



//Variables Constantes

var instru=document.getElementById("titulo");
var interval;
var interval2;
var frames=0;
var frames2=0;
var images=
    {
        fondo1:"./imagenes/fondo1.png",
        fondo2:"./imagenes/fondo2.png",
        fondo3:"./imagenes/fondo3.png",
        fondo4:"./imagenes/fondo4.png",
        fondo5:"./imagenes/fondo5.png",
        nubesita:"./imagenes/nubesita1.png",
        nubesita2:"./imagenes/nubesita2.png",
        nubesita3:"./imagenes/nubesita3.png",
        nubesita4:"./imagenes/nubesita4.png",
        nubesita5:"./imagenes/nubesita5.png",
        arbolito_1:"./imagenes/Arbol_grande.png",
        arbolito_2:"./imagenes/pino.png",
        arbolito_3:"./imagenes/arbol2.png",
        avion:"./imagenes/avioncito.png",
        semilla1:"./imagenes/semilla.png",
        semilla2:"./imagenes/semilla2.png",
        semilla3:"./imagenes/semilla3.png"
    }
var num_sem=-1;
var num_sem2=-1;
var arboles=[]
var arboles2=[]
var posx=0;
var posx2=0
var posy=0;
var posy2=0;
var niv_conta=100;
var niv_conta2=100;
var tiempo=1;
var tiempo2=1;
//var comienzo=0;
//var tiempo_real=0;
var jugador1=0;
var nubder=[];
var nubizq=[];
var dificultad_jug1=10;
var dificultad_jug2=10;
var numRanAlto=0;
var numRanAncho=0;
var numRanPosX=0;
var numRanPosY=0;
var numRanVel=5;
var llendo_der=false;
var reductorTiempo=30;
var niv1=0;
var niv2=0;
var niv3=0;
var niv4=0;
var niv5=0;
var niv11=0;
var niv22=0;
var niv33=0;
var niv44=0;
var niv55=0;
var nubes=images.nubesita;
var cielo=images.fondo1;
var velYSem=5;
var tiposem=images.semilla;
var tipoarbol=images.arbolito_1;
var img=0;




var sound = new Audio();
var sonido_sem=new Audio();
var sonido_des_sem=new Audio();
var sonido_inicio=new Audio();
var sonido_juagador1_termino=new Audio("./sonidos/terminoJugador1.mp3");
//var sonido_juagador2_termino=new Audio("./sonidos/terminoJugador2.mp3");
var sonido_ganador1=new Audio("./sonidos/ganaJugador1.mp3");
var sonido_ganador2=new Audio("./sonidos/ganaJugador2.mp3");
var sonido_empate= new Audio("./sonidos/Empate.mp3")
var sonido_arbolito=new Audio("./sonidos/crece_arbol.mp3")
//var sonido_inicio= new Audio("./sonidos/inicio.mp3")

sound.src = "./sonidos/musica_fondo.mp3"
sonido_des_sem.src="./sonidos/bomba.mp3"
sonido_sem.src="./sonidos/musica_disparo.mp3"
sonido_inicio.src="./sonidos/inicio.mp3"

//sonido_juagador1_termino.src="./sonidos/terminoJugador1.mp3";
sound.loop = true;
sonido_sem.loop=true;
sonido_juagador1_termino.preload=true;
//sonido_juagador1_termino.autoplay=true;

// sonido_inicio.play();

sound.currentTime = 0
sonido_des_sem.currentTime=0
//sonido_sem.currentTime=0;





//Funciones

//ctx.fillText("PRIMER JUGADOR OPRIME A ENTER PARA COMENZAR",300,400)


class back
{
    constructor(cielo=images.fondo1)
    {
        this.x = 0;
        this.y = 0;
        this.width = canvas.width;
        this.height = canvas.height;
        this.image = new Image();
        this.image.src = cielo;
        this.image.onload = function(){
            this.draw();
        }.bind(this)
    }

    draw()
    {
        this.x--;
        if(this.x === -this.width) this.x = 0;
        ctx.drawImage(this.image, this.x,this.y,this.width,this.height);
        ctx.drawImage(this.image, this.x + this.width,this.y,this.width,this.height);
        //ctx.fillStyle = "white";
        //ctx.font = '50px Avenir';
        //ctx.fillText(Math.floor(frames / 60), this.width -100, 50 )
    }
}



class avion
{
    constructor()
    {
        this.width=100;
        this.height=75;
        this.x=768-this.width;
        this.y=70;
        
        this.der=+30;
        this.izq=-30;
        this.dispara=[]
        this.image=new Image();
        this.image.src=images.avion;
        this.image.onload=function()
        {
            this.draw();
        }.bind(this)
    }

    avionDer()
    {
        
        this.x+=this.der;
    }
    avionIzq()
    {
        //console.log("casi")
        this.x+=this.izq;
       
    }

    draw()
        {

            ctx.drawImage(this.image, this.x,this.y,this.width,this.height);
        }
    
}




class semilla
{
    constructor(as,vely=3,imgsem=images.semilla1)
    {
        
        this.width=35;
        this.height=50;
        this.x=as.x+as.width/2-this.width;
        this.y=as.y+this.height;
        this.der=+20;
        this.izq=-20
        this.image=new Image();
        this.vY=vely;
        this.image.src=imgsem;
        this.image.onload=function()
        {
            this.draw();
        }.bind(this);
    }
    
    semiDer()
    {
        
        this.x+=this.der;
    }
    semiIzq()
    {
        //console.log("casi")
        this.x+=this.izq;
       
    }
   

    draw()
    {
        if(this.y>=765)
        {
            //console.log("ja")
            num_sem=0;
            num_sem2=0;
            //console.log(num_sem);
            posx=this.x;
            posy=this.y;
            if(jugador1==true)
            {
                generar_arbolito();
            }
            else
            {
                generar_arbolito2();
            }
            
            avioncito.dispara.pop();
        }
        else
        {             
            this.y=this.y+this.vY;
            ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
            num_sem=+1;
            num_sem2=+1;
            //console.log(num_sem);
            //console.log(this.y);
        }
    }
}



class suelo
{
    constructor()
    {
        this.x=0;
        this.y=765;
        this.width=canvas.width;
        this.height=canvas.height;
    }
    
    draw()
    {
        ctx.fillRect(this.x,this.y,this.width,this.height)
    }
}

class arbolito_1
{
    constructor(arbol=images.arbolito_1)
    {
        this.width=150;
        this.height=175;
        //this.x=os.x+os.width/2-this.width;
        //this.y=os.y+this.height;
        this.x=posx-75;
        this.y=posy-150;
        this.image=new Image();
        this.image.src=arbol;
        this.image.onload=function()
        {
            this.draw();
        }.bind(this);
    }

    draw()
    {
        //console.log("tengo este"+tipoarbol)
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
    }
}



class Texto
{
    constructor()
    {
        this.x=900;
        this.y=50;
    }

    draw()
    {
        
        ctx.font="50px Arial";
        ctx.fillText("Contaminacion al "+niv_conta+" %",this.x,this.y)
    }
}

class Texto2
{
    constructor()
    {
        this.x=900;
        this.y=50;
    }

    draw()
    {
        
        ctx.font="50px Arial";
        ctx.fillText("Contaminacion al "+niv_conta2+" %",this.x,this.y)
    }
}

class Texto_tiempo
{
    constructor()
    {
        this.x=50;
        this.y=50;
    }
    
    
    draw()
    {
        tiempo=Math.floor(frames/60);
        //console.log(tiempo)
        //tiempo_real=tiempo_real-tiempo;
       // console.log(tiempo_real)
        ctx.font="50px Arial";
        ctx.fillText((reductorTiempo-tiempo)+" s",this.x,this.y)
        //console.log(tiempo)
    }

}

class Texto_tiempo2
{
    constructor()
    {
        this.x=50;
        this.y=50;
    }
    
    
    draw()
    {
        tiempo2=Math.floor(frames2/60);
        //console.log(tiempo)
        //tiempo_real=tiempo_real-tiempo;
       // console.log(tiempo_real)
        ctx.font="50px Arial";
        ctx.fillText((reductorTiempo-tiempo2)+" s",this.x,this.y)
    }

}

class nube_der_izq
{
    constructor(xnub=0,ynub=0,nubw=130,nubh=80,vel=5,nub=images.nubesita5)
    {
        this.x=xnub;
        this.y=ynub;
        this.width=nubw;
        this.height=nubh;
        this.image=new Image();
        this.vY=vel;
        this.image.src=nub;

    }

    estatocando(item)
    {
        return  (this.x < item.x + item.width) &&
                (this.x + this.width > item.x) &&
                (this.y < item.y + item.height) &&
                (this.y + this.height > item.y);
    }
    
    draw()
    {
        //console.log(this.x)
         
        
       /* if(llendo_der==true)
        {
            this.x-=this.vY
        }*/
        if(llendo_der==false)
        {
            this.x+=this.vY;
        }

        if(this.x>=canvas.width)
        {
            this.x=0;
        }
        //this.x-=this.vY;
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
       /* if(this.x<=0)
        {
            llendo_der=false;
        }
        if(this.x>=canvas.width)
        {
            llendo_der=true;
        }*/
    }
    
}


//instancias


var fondito=new back();
var avioncito=new avion();
//var semillita=new semilla();
var suelecito=new suelo();
var textito=new Texto();
var textito2=new Texto2();
var textito_tiempo=new Texto_tiempo();
var textito2_tiempo=new Texto_tiempo2();
//var nubesita1=new nube();
//var nubesita2=new nube(100,100,80,50);



//Mains


function update()
    {
        frames++;
        //console.log(frames);
        ctx.clearRect(0,0,canvas.width,canvas.height);
        defini_dif();
        fondito.draw();
        avioncito.draw();
       // niv_conta++;
        //semillita.draw();
        drawSemi();
        suelecito.draw();
        drawArbol();
        textito.draw();
        //console.log(tiempo);
        textito_tiempo.draw();
        checarTiempo();
        //console.log(niv_conta)
        //nubesita1.draw();
        //nubesita2.draw();
        defini_dif();
        //console.log(niv_conta)
       
        
        dibujarNube();
        //console.log(numRanAlto);
        //console.log("la dif es "+dificultad_jug1);
       // checarColision();
       //console.log(tipoarbol)
       colision();

    }

function start()
    {
        //crearNubeDeraIzq();
        nubder=[];
        //sonido_inicio.pause();
        sound.play();
        
        num_sem=0
        ctx.clearRect(0,0,canvas.width,canvas.height);
        if(interval) return;
        interval = setInterval(update, 1000/60);
       // ctx.arbolito_1;
      
      

    }

    function update2()
    {
        frames2++;
        ctx.clearRect(0,0,canvas.width,canvas.height);
        defini_dif2();
        fondito.draw();
        avioncito.draw();
        textito2_tiempo.draw();
        textito2.draw();
        suelecito.draw();
        drawSemi2();
        drawArbol2();
        checarTiempo2();
        //console.log(niv_conta2)
        //defini_dif2();
        //|console.log(dificultad_jug2)
        defini_dif2();  
        dibujarNube();
        //console.log("jaja"+niv_conta2)
       // console.log(velYSem)
        colision()
    }

function start2()
    {
        //nubes=images.nubecita;
       restaurarVar();
        num_sem2=0;
        sonido_sem.pause();
        sound.play();
       // console.log(nubes)
        ctx.clearRect(0,0,canvas.width,canvas.height);
        if(interval2) return;
        interval2 = setInterval(update2, 1000/60);
    }   




    //Funciones auxiliares



    function generarSemilla()
{
    //console.log("puto")
    Random_y();
    random_imgsem();
    //console.log(velYSem)
    var semi=new semilla(avioncito,velYSem,tiposem)
    avioncito.dispara.push(semi);
    sound.pause();
    sonido_sem.play();  
    
}

function drawSemi()
{
    avioncito.dispara.forEach(function(b) {
    b.draw();
    
});
    
}

function generarSemilla2()
{
    Random_y();
    random_imgsem();
    sonido_sem.play();
    var semi2=new semilla(avioncito,velYSem,tiposem)
    avioncito.dispara.push(semi2);
    
}

function drawSemi2()
{
    avioncito.dispara.forEach(function(b) {
    b.draw();
});
    
}

function generar_arbolito()
{
    definirArbolito();
    sonido_sem.pause();
    sonido_arbolito.play();
    var arbolito=new arbolito_1(tipoarbol);
    arboles.push(arbolito);
    descontar_score()
    
}

function drawArbol()
{
  
    arboles.forEach(function(b){
        b.draw();
    })
}

function generar_arbolito2()
{
    definirArbolito();
    sonido_sem.pause();
    sonido_arbolito.play();
    var arbolito2=new arbolito_1(tipoarbol);
    arboles2.push(arbolito2);
    descontarScore2();
}

function descontar_score()
{
    if(img==1)
    {
        niv_conta=niv_conta-7
        reductorTiempo=reductorTiempo+3
    }
    if(img==2)
    {
        niv_conta=niv_conta-3
        reductorTiempo=reductorTiempo+2
    }
    if(img==3)
    {
        niv_conta=niv_conta-4
        reductorTiempo=reductorTiempo+1
    }
}

function descontarScore2()
{
    if(img==1)
    {
        niv_conta2=niv_conta2-7
        reductorTiempo=reductorTiempo+3
    }
    if(img==2)
    {
        niv_conta2=niv_conta2-3
        reductorTiempo=reductorTiempo+2
    }
    if(img==3)
    {
        niv_conta2=niv_conta2-4
        reductorTiempo=reductorTiempo+1
    }
}

function drawArbol2()
{
    
    arboles2.forEach(function(b){
        b.draw();
    })
}
function restaurarVar()
{
    console.log("bu")
    niv1=0;
    niv2=0;
    niv3=0;
    niv4=0;
    niv5=0;
    nubder=[];
    //nubes=images.nubesita;
}

function defini_dif()
{
    
    if(niv_conta>=80)
    {
        //console.log("si entra wey")
        dificultad_jug1=3
        if(niv1==0)
        {
            nubder=[]
            crearNubeDeraIzq();
            niv1=1
            nubes=images.nubesita;
            cielo=images.fondo1

        }
        
    }
    else
    {
        if(niv_conta>=60)
        {
            dificultad_jug1=6
                    if(niv2==0)
                {
                    nubder=[]
                    crearNubeDeraIzq();
                    niv2=1
                    nubes=images.nubesita2;
                    cielo=images.fondo2

                       
                }
        }
        else
        {
            if(niv_conta>=40)
            {
                dificultad_jug1=9
                if(niv3==0)
                    {
                        nubder=[]
                        crearNubeDeraIzq();
                    
                        niv3=1
                        nubes=images.nubesita3;
                        cielo=images.fondo3

                
                    
                    }
            }
            else
            {
                if(niv_conta>=20)
                {
                    dificultad_jug1=12
                           
                    if(niv4==0)
                         {
                             nubder=[]
                            crearNubeDeraIzq();
                            niv4=1
                            nubes=images.nubesita4;
                            cielo=images.fondo4

                
                    
                        }
                }
                else
                {
                    if(niv_conta>=0)
                    {
                        dificultad_jug1=15
                        if(niv5==0)
                        {
                            nubder=[]
                            crearNubeDeraIzq();
                            niv5=1
                            nubes=images.nubesita5;
                            cielo=images.fondo5

        
                    
                        }
                     }
                }
            }
        }
    }
}

function definirArbolito()
{
    console.log(tiposem)
    if(img==1)
    {
        console.log("si entro")
        tipoarbol=images.arbolito_1;
    }
    if(img==2)
    {
        tipoarbol=images.arbolito_2;
    }
    if(img==3)
    {
        tipoarbol=images.arbolito_3;
    }
}

function defini_dif2()
{
    
    if(niv_conta2>=80)
    {
       // console.log("si entra wey")
        dificultad_jug2=3
        if(niv11==0)
        {
            //console.log("que si entra wey")
            nubder=[]
            crearNubeju2();
            niv11=1
            nubes=images.nubesita;
            console.log(nubes)
            cielo=images.fondo1


        }
        
    }
    else
    {
        if(niv_conta2>=60)
        {
            dificultad_jug2=6
                    if(niv22==0)
                {
                    nubder=[]
                    crearNubeju2();
                    niv22=1
                    nubes=images.nubesita2;
                    cielo=images.fondo2

                       
                }
        }
        else
        {
            if(niv_conta2>=40)
            {
                dificultad_jug2=9
                if(niv33==0)
                    {
                        nubder=[]
                        crearNubeju2();
                    
                        niv33=1
                        nubes=images.nubesita3;
                        cielo=images.fondo3

                
                    
                    }
            }
            else
            {
                if(niv_conta2>=20)
                {
                    dificultad_jug2=12
                           
                    if(niv44==0)
                         {
                             nubder=[]
                            crearNubeju2();
                            niv44=1
                            nubes=images.nubesita4;
                            cielo=images.fondo4

                
                    
                        }
                }
                else
                {
                    if(niv_conta2>=0)
                    {
                        dificultad_jug2=15
                        if(niv55==0)
                        {
                            nubder=[]
                            crearNubeju2();
                            niv55=1
                            nubes=images.nubesita5;
                            cielo=images.fondo5


        
                    
                        }
                     }
                }
            }
        }
    }
}

function random_imgsem()
{
    img=Math.floor(Math.random()*3);

    img=img+1;
    //console.log(img)
    if(img==1)
    {
        tiposem=images.semilla1;
    }
    if(img==2)
    {
        tiposem=images.semilla2;
    }
    if(img==3)
    {
        tiposem=images.semilla3;
    }

}
function Random_y()
{
    velYSem=Math.floor(Math.random()*6);
    if(velYSem<3)
    {
        velYSem=velYSem+3;
    }
}

function ran_posx()
{
     numRanPosX=Math.floor(Math.random()*canvas.width);
}

function ran_posy()
{
     numRanPosY=Math.floor(Math.random()*(canvas.height-250));
     
         numRanPosY=numRanPosY+150;
     
}

function ran_ancho()
{
     numRanAncho=Math.floor(Math.random()*130);
    if(numRanAncho<80)
    {
        numRanAncho=numRanAncho+50;
    }
}

function ran_Alto()
{
    numRanAlto=Math.floor(Math.random()*80);
    if(numRanAlto<50)
    {
        numRanAlto=numRanAlto+30
    }
}
function ran_Vel()
{
    numRanVel=Math.random()*10;
   
}


function crearNubeDeraIzq()
{
    
        //console.log(dificultad_jug1);
    for(var i=0;i<dificultad_jug1;i++)
    {
        ran_Alto();
        ran_ancho();
        ran_posx();
        ran_posy();
        ran_Vel();
        var nubecita=new nube_der_izq(numRanPosX,numRanPosY,numRanAncho,numRanAlto,numRanVel,nubes)
        nubder.push(nubecita);
    }
    
}

function crearNubeju2()
{
    
        //console.log(dificultad_jug1);
    for(var i=0;i<dificultad_jug2;i++)
    {
        ran_Alto();
        ran_ancho();
        ran_posx();
        ran_posy();
        ran_Vel();
        var nubecita=new nube_der_izq(numRanPosX,numRanPosY,numRanAncho,numRanAlto,numRanVel,nubes)
        nubder.push(nubecita);
    }
    
}

function dibujarNube()
{
    nubder.forEach(function(b){
        
       
        b.draw();
        
    })
}

function colision()
{
    nubder.forEach(function(b){
        avioncito.dispara.forEach(function(c){
            if(b.estatocando(c))
            {
                sonido_sem.pause();
                sonido_des_sem.play();
                num_sem=0;
                num_sem2=0
                avioncito.dispara=[]
                sonido_sem.pause();
                sound.play();
            }
        })
    })
}

/*
nubes.forEach((nube)=>{
    semillas.forEach((semilla)=>{
        if(nube.isTouching(semilla)){
            //hago algo 
        }
    })
})
*/


function checarTiempo()
{
    if(tiempo==reductorTiempo)
    {
        
        document.getElementById("titulo").innerHTML="Segundo Jugador presiona 2 para comenzar";
        
            //this.innerHTML = "presina"
            
            sonido_juagador1_termino.play();
            sonido_sem.pause();
            sound.pause();
            //console.log(instru.id)
            jugador1=2;
            reductorTiempo=30
            avioncito.dispara=[];
            nubes=images.nubesita;
            
       
        //start2();
        clearInterval(interval);        
    }
  // if((tiempo/90)==)
  //console.log(tiempo);
}


function checarTiempo2()
{
    if(tiempo2==reductorTiempo)
    {
        //sonido_juagador2_termino.play();
        sonido_sem.pause();
        sound.pause();
        checarGanador();
        clearInterval(interval2);
    }
}

function checarGanador()
{
    if(niv_conta<niv_conta2)
    {
        
        document.getElementById("titulo").innerHTML="GANO EL JUGADOR UNO";
        sonido_ganador1.play();
        //instru.id = "seTermino";
    }
    if(niv_conta2<niv_conta)
    {
        
        document.getElementById("titulo").innerHTML="GANO EL JUGADOR DOS";
        sonido_ganador2.play();
        //instru.id = "seTermino";
    }
    if(niv_conta==niv_conta2)
    {
        
        document.getElementById("titulo").innerHTML="HAN QUEDADO EMPATE";
        sonido_empate.play();
        //instru.id = "seTermino";
    }
}

/*function inicia()
{
    sonido_inicio.play();
}*/




//escuchadores







addEventListener("keydown",function(e)
{
    //console.log("jajajajaj")
    if(e.keyCode===37)
    {
        if(jugador1==1)
        {
            if(avioncito.x>0)
            {
                if(num_sem==0)
                {
                    //console.log("izq");
                    avioncito.avionIzq();
                }
                else
                {
                    //console.log("pu")
                    //semilla.semi.semiIzq();
                    avioncito.dispara.forEach(function(b) {
                        b.semiIzq();});

                }
            }    
        }
        else
        {
            if(avioncito.x>0)
            {
                if(num_sem2==0)
                {
                    //console.log("izq");
                    avioncito.avionIzq();
                }
                else
                {
                    //console.log("pu")
                    //semilla.semi.semiIzq();
                    avioncito.dispara.forEach(function(b) {
                        b.semiIzq();});

                } 
            } 
        }    
    }
    if(e.keyCode===39)
    {
        /*
        if(num_sem==-1)
        {
            num_sem=0;
        }
        if(num_sem2==-1)
        {
            num_sem2=0
        }
        */
        if(jugador1==1)
        {
            if(avioncito.x<canvas.width-100)
            {
                if(num_sem==0)
                {
                    //console.log("sider");
                    avioncito.avionDer();
                }
                else
                {
                    //avioncito.dispara.semiDer();
                    avioncito.dispara.forEach(function(b) {
                        if(b.x<canvas.width-35)
                        {
                            b.semiDer();
                        }
                    });
                }
            }
        }
        else
        {
            if(avioncito.x<canvas.width-100)
            {
                if(num_sem2==0)
                {
                    //console.log("sider");
                    avioncito.avionDer();
                }
                else
                {
                    //avioncito.dispara.semiDer();
                    avioncito.dispara.forEach(function(b) {
                        if(b.x<canvas.width-35)
                        {
                            b.semiDer();
                        }
                    });
                }
            }
        }
    }
    if(e.keyCode===32)
    {
        if(jugador1==1)
        {
            if(num_sem==0)
            {
                generarSemilla();
                //semillita.draw();
                //var semillita=new semilla(avioncito);
                
                
            }
            else
            {
                return;
            }
        }
        else
        {
            if(num_sem2==0)
            {
                generarSemilla2();
                //semillita.draw();
                //var semillita=new semilla(avioncito);
                
                
            }
            else
            {
                return;
            }
        }
    }

    if(e.keyCode===49 || e.keyCode===97)
    {
        if(jugador1==0)
        {
            console.log("ja")
            jugador1=1;
            
            
                document.getElementById("titulo").innerHTML = "ESTA JUGANDO EL JUGADOR 1"
                start();
                //instru.id = "yaNo";
                //console.log(instru.id)
            
        }
                
              
       
    }

    if(e.keyCode===50 || e.keyCode===98)
    {
        if(jugador1==2)
        {
            console.log("este no")
            document.getElementById("titulo").innerHTML = "ESTA JUGANDO EL JUGADOR 2"
            start2();
        }
        
    }

    if(e.keyCode===73)
    {
        sonido_inicio.play();
    }
});

//inicia();

/*document.getElementById('titulo').addEventListener('click', function(){
    this.innerHTML = "ESTA JUGANDO EL JUGADOR 1"
    //instru.id = "yaNo";
    //console.log(instru.id)
    start();
    });
//start();*/