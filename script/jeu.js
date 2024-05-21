function setJeu(longueur) {
    idLigne=10;
    randNbs=[],combinaison=[];
    for(let i=0;i<longueur;i++) {
        var randNb;
        do {
            randNb=Math.floor(Math.random() * couleurs.length);
        }
        while (randNbs.indexOf(randNb) !== -1) {
            randNbs.push(randNb);
        }
    }

    randNbs.forEach((i)=>{
        combinaison.push(couleurs[i])
    });

    $("#tableau div").click(function() {
        let verifDoublon=0;
        if($(this).parents()[1].id==`row${idLigne}`) {
            $(this).parent().siblings().each((i,valHTML)=>{
                if(valHTML.childNodes[0].style.backgroundColor==idColor) {
                    alert("Couleur en doublon");
                    verifDoublon=1;
                }
            })
            if(!verifDoublon) {
                $(this).css("background",idColor);
            }
        }
    })
}

var idColor, combinaison, idLigne, cpt=0;
var couleurs = [
    "rgb(255, 0, 0)",   // rouge
    "rgb(0, 0, 255)",   // bleu
    "rgb(0, 255, 0)",   // vert
    "rgb(255, 255, 0)", // jaune
    "rgb(255, 165, 0)", // orange
    "rgb(255, 0, 255)", // rose
    "rgb(119, 17, 228)",// violet
    "rgb(128, 128, 128)"// gris
]

var randNbs=[],combinaison=[];

setJeu($("#tableau #row1 td").length);
$(`#row${idLigne}`).addClass("actuelle");

$(".parentC").click(function() {
    $(".parentC").css("background","none");
    $(this).css({background:"black"});
    idColor=$(this).children().css("background-color");
})

$("#btnVerif").click(function() {
    var bienP=0, malP=0,manquer;
    $(`#row${idLigne}`).find("div").map((i,val)=>{
        if(!val.style.backgroundColor) {
            manquer=true;
        }
        else {
            if(combinaison[i]==val.style.backgroundColor) {
                bienP++;
            }
            else if(combinaison.indexOf(val.style.backgroundColor)!==-1) {
                malP++;
            } 
        }
    })
    $(this).attr("disabled","disabled");
    if(!manquer) {
        

        $(`.mal-place tr:nth-child(${idLigne})`).animate({left:`+=${malP * ($("#tableau").width()/$("#tableau #row1 td").length)}px`});
        $(`.bien-place tr:nth-child(${idLigne})`).animate({right:`+=${bienP * ($("#tableau").width()/$("#tableau #row1 td").length)}px`});
        if((bienP==$("#tableau #row1 td").length || (idLigne<=1 && bienP<$("#tableau #row1 td").length))) {
            setTimeout(function() {
                cpt++;
                combinaison.forEach((val,i)=>{
                    $(`#answer${cpt} .rep${i+1}`).css("background-color",val)
                })

                switch(cpt) {
                    case 1:
                        $("body").animate({color:"hsl(224, 99%, 55%)"},1500);
                        break;
                    case 2:
                        $("body").animate({color:"hsl(224, 99%, 35%)"},1500);
                        break;
                }

                if(cpt<3) {
                    $("#tableau-jeu").animate({width:["toggle", "swing"]},"normal","linear",function() {
                        $(".mal-place tr").css({left:0});
                        $(".bien-place tr").css({right:0});
    
                        for(let i=1;i<=$("#tableau tr").length;i++) {
                            $(`#tableau #row${i}`).append("<td><div class='case"+($("#tableau #row1 td").length)+"'></div></td>");
                            $(".bien-place tr").eq(i-1).append(`<td>${$("#tableau #row1 td").length}</td>`);
                            $(".mal-place tr").eq(i-1).prepend(`<td>${$("#tableau #row1 td").length}</td>`);
                        }

                        $(`#row${idLigne}`).removeClass("actuelle");
                        setJeu($("#tableau #row1 td").length);
                        $(`#row${idLigne}`).addClass("actuelle");

                        $("#tableau td div").css({background:"black"});
    
                        $("#tableau-jeu").animate({width:["toggle", "swing"]});
                    });
                }
                else {
                    $("#tableau-jeu").animate({width:["toggle", "swing"]},"normal","linear",function() {
                        $("body").animate({color:"hsl(46, 65%, 52%)"});
                    });
                    $("#choix").animate({width:["toggle", "swing"]});
                    $("#btnVerif").animate({width:["toggle", "swing"]});
                }
                $("#btnVerif").removeAttr("disabled");
            },700)
        }
        else {
            setTimeout(function() {
                $(`#row${idLigne}`).removeClass("actuelle");
                idLigne--;
                $(`#row${idLigne}`).addClass("actuelle");
                $("#btnVerif").removeAttr("disabled");
            },700);
        }  
    }
    else {
        alert("complétez la ligne");
        $("#btnVerif").removeAttr("disabled");
    }
});