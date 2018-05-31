//Constructor del nou objecte creat per les dades del curs.
function NouCurs() {
    this.nom = $('#nom').val().toString().replace(/\b\w/g, l => l.toUpperCase());
    this.tipus = $('#tipus').val().toString().replace(/\b\w/g, l => l.toUpperCase());
    this.professor = $('#professor').val().toString().replace(/\b\w/g, l => l.toUpperCase());
    this.inici = $('#inici').val();
    this.fi = $('#fi').val();
    this.hores = $('#hores').val();
    this.dies = calcularDias(this.inici, this.fi);
    // this.net = this.salari - (this.salari*this.irpf/100)
}
// https://www.lawebdelprogramador.com/codigo/JavaScript/2718-Obtener-la-diferencia-en-dias-entre-dos-fechas.html
function calcularDias(inici, fi) {
    var fechaInicial=inici;
    var fechaFinal=fi
    var resultado="";
    
    inicial=fechaInicial.split("/");
    final=fechaFinal.split("/");
    // obtenemos las fechas en milisegundos
    var dateStart=new Date(inicial[2],(inicial[1]-1),inicial[0]);
    console.log(dateStart);
    var dateEnd=new Date(final[0],(final[1]-1),final[2]);
    console.log(dateEnd);
    if(dateStart<dateEnd)
    {
        // la diferencia entre las dos fechas, la dividimos entre 86400 segundos
        // que tiene un dia, y posteriormente entre 1000 ya que estamos
        // trabajando con milisegundos.
        resultado="La diferencia es de "+(((dateEnd-dateStart)/86400)/1000)+" días";
    }else{
        resultado="La fecha inicial es posterior a la fecha final";
    }
    console.log(resultado);
}

// Funció per calcular l'edat actual de l'empleat.
function calcularEdat(val){
    var any = parseInt(val.substr(0, 4));
    var mes = parseInt(val.substr(5,2));
    var dia = parseInt(val.substr(8));
    
    avui = new Date();
    any_ac = avui.getYear();
    mes_ac = avui.getMonth();
    dia_ac = avui.getDate();
    edat = (any_ac + 1900) - any;
    
    if ( mes_ac < (mes - 1)) edat--;
    if (((mes - 1) == mes_ac) && (dia_ac < dia)) edat--;
    if (edat > 1900) edat -= 1900;
    
    return edat;
}

//Funció per retornar la data actual.
function dataActual(){
    var data = new Date();
    var dd = data.getDate();
    var mm = data.getMonth()+1; //Gener es 0!
    var yyyy = data.getFullYear();
    var hh = data.getHours();
    var mn = data.getMinutes();
    var ss = data.getSeconds();
    
    //Per unificar el format afegim 0 a totls els menors de 10.
    if(dd<10) dd = '0'+dd;
    if(mm<10) mm = '0'+mm;
    if(hh<10) hh = '0'+hh;
    if(mn<10) mn = '0'+mn;
    if(ss<10) ss = '0'+ss;
    
    return (dd+'/'+mm+'/'+yyyy+" "+hh+":"+mn+":"+ss);
}

$(document).ready(function() {
    $("form").submit(function(event){
        // Cream un objecte 'empleat' amb totes les dades necessaries.
        curs = new NouCurs();
        console.log(curs);
        
        // Nom del curs i tipus
        $("#curs").text(curs.nom+" ["+curs.tipus+"]");
        // Nom del professor
        $("#docent").text("Sr/Sra "+curs.professor);
        // Data inicial i dies fins a la data final (data final - data inicial)
        $("#dates").text(curs.inici+" durant "+curs.dies+" dies.");
        // Data inicial i dies fins a la data final (data final - data inicial)
        $("#durada").text(curs.hores+" hores.");
        //Per finalitzar es mostra la data quan es va afegir el curs.
        $("#afegit").text("Curs afegit: "+dataActual());
        
        // El formulari ha de ser netejat, quedant en blanc.
        $("form")[0].reset();
    });
});
