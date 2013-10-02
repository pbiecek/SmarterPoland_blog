dz <- c("Nauki o Zyciu (NZ)", "Nauki Scisle (SI)", "Nauki Humanistyczne (HS)")
kr <-  c("Osiagniecia_naukowe_i_tworcze", "Potencjal_naukowy",  "Materialne_efekty_dzialalnosci_naukowej", 
         "Pozostale_efekty_dzialalnosci_naukowej", "Ocena_ostateczna")
for (dziedzina in dz) {
  input$dziedzina = dziedzina
  for (kryterium1 in kr) {
    input$kryterium1 <- kryterium1
    for (kryterium2 in kr) {
      input$kryterium2 <- kryterium2
      
      dziedzina <- strsplit(input$dziedzina, split="[\\(\\)]")[[1]][2]
      dat <- dane[dane[,"grupa"] == dziedzina, c(1, 2, 3, 4, 5, 6, 7)]
      
      tmp <- dat[,c(input$kryterium1, input$kryterium2, "Kategoria")]
      rownames(tmp) = NULL
      tmp <- data.frame(tmp, nazwy = gsub(rownames(dat), pattern='[^a-zA-Z ;]', replacement=""))
      
      pre <- paste0(" <!doctype HTML>
<meta charset = 'utf-8'>
<html>
<head>
<script src='http://smarterpoland.pl/materialy/parametryzacja/polychart2.standalone.js' type='text/javascript'></script>
<style>
.rChart {
display: block;
margin-left: auto; 
margin-right: auto;
width: 700px;
height: 540px;
}  
</style>
</head>
<body>
<div id='chart1b4449fa6558' class='rChart polycharts'></div>  
<script type='text/javascript'>
var chartParams = {
'dom': 'chart1b4449fa6558',
'width':    680,
'height':    520,
'layers': [{
'x': '", input$kryterium1 ,"',
'y': '", input$kryterium2 ,"',
'data': 
", toJSON(tmp), ",
'tooltip': function(item){return item.nazwy}, 
'facet': null,
'type': 'point',
'color': 'Kategoria' 
} 
],
'facet': [],
'guides': { 'x': { 'min':  ", min(dat[,input$kryterium1]) - .02*diff(range(dat[,input$kryterium1])),", 'max':  ",max(dat[,input$kryterium1]) + .02*diff(range(dat[,input$kryterium1])),", 'numticks': 10  } ,
'y': { 'min': ",  min(dat[,input$kryterium2]) - .02*diff(range(dat[,input$kryterium2])), ", 'max':  ",max(dat[,input$kryterium2]) + .02*diff(range(dat[,input$kryterium2])),", 'numticks': 10  } },
'coord': [],
'id': 'chart1b4449fa6558' 
}
_.each(chartParams.layers, function(el){
el.data = polyjs.data(el.data)
})
var graph_chart1b4449fa6558 = polyjs.chart(chartParams);
</script>
</body>
</html>
")

cat(pre, file=paste0("chart_",dziedzina, "_", input$kryterium1, input$kryterium2,".html"))
    }
  }
}
