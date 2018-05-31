//Constructor del nou objecte creat per les dades del curs.
function NouCurs() {
    this.nom = $('#nom').val().toString().replace(/\b\w/g, l => l.toUpperCase());
    this.tipus = $('#tipus').val().toString().replace(/\b\w/g, l => l.toUpperCase());
    this.professor = $('#professor').val().toString().replace(/\b\w/g, l => l.toUpperCase());
    this.inici = $('#inici').val();
    this.fi = $('#fi').val();
    this.hores = $('#hores').val();
    this.dies = "";
}

//Funció per retornar la data actual.
function dataActual(srt){
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
    
    // Afegida l'opció de tenir dos formats de dates per diferents necessitats.
    if (srt='default') return (yyyy+'-'+mm+'-'+dd);
    else return (dd+'/'+mm+'/'+yyyy+" "+hh+":"+mn+":"+ss);
}

$(document).ready(function() {
    // Per seguretat s'actualitza l'atribut "min" dels elements "input" de dates amb la data d'avui.
    $("#inici").attr("min",dataActual('default'));
    $("#fi").attr("min",dataActual('default'));

    $("form").submit(function(event){

        // Cream un objecte 'empleat' amb totes les dades necessaries.
        curs = new NouCurs();
        curs.dies = (new Date(curs.fi)-new Date(curs.inici))/(1000*60*60*24);
        console.log(curs);
        
        // Nom del curs i tipus
        $("#curs").text(curs.nom+" ["+curs.tipus+"]");
        // Nom del professor
        $("#docent").text("Sr/Sra "+curs.professor);
        // Data inicial i dies fins a la data final (data final - data inicial)
        $("#dates").text(curs.inici.replace(/^(\d{4})-(\d{2})-(\d{2})$/g,'$3/$2/$1')+" fins "+curs.dies+" després.");
        // Data inicial i dies fins a la data final (data final - data inicial)
        $("#durada").text(curs.hores+" hores.");
        //Per finalitzar es mostra la data quan es va afegir el curs.
        $("#afegit").text("Curs afegit: "+dataActual());
        
        // El formulari ha de ser netejat, quedant en blanc.
        $("form")[0].reset();

        // Transició entre "cards" per mostrar el resultat.
        $('#resposta').show(3000);
		$('#form').hide(3000);
    });

    // Transició entre "cards" per tornar al formulari.
    $("#btn2").click(function(){
        $('#form').show(3000);
        $('#resposta').hide(3000);
    });
});
