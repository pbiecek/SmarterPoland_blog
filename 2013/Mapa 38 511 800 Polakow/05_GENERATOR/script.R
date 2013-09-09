###############################################################################
#	Skrypt generujący mapy (domyślnie jeden plik dla całej Polski, z opcją
#	generowania osobnych plików dla województw.
#
#	Paweł Wiechucki 2013
###############################################################################

generateMap <- function(single_file = F){
  require("maptools");
  require("spatstat");
  library("rgdal");
  require("gdata");
  
  spatstat.options(checkpolygons=FALSE) 
	  
  wojewodztwa_shp <- readOGR(dsn="dane", layer="wojewodztwa");
  gminy_shp <- readOGR(dsn="dane", layer="gminy");
  
  match <- read.csv("csv/match.csv", header=FALSE);
  woj <- read.csv("csv/gmina_w_wojewodztwie.csv");
  
  nazwy_gmin <- as(gminy_shp$NAZWA, "character");
  match <- match[order(match$V1),];

  counter = 0;
  # generuj osobny plik dla całego województwa
  if(!single_file){
    for(nazwa in wojewodztwa_shp$NAZWA){
    counter = counter + 1;
    pdf(file= paste("w.", nazwa, ".pdf", sep=""), width=93.6, height=66.2, pointsize=1/144);
    par(pch=".", cex =0.005,  col="#00000050" );
    plot(SpatialPolygons(wojewodztwa_shp@polygons[counter]), col="white");
    for(i in 1:length(nazwy_gmin)){
        p <- gminy_shp@polygons[i];
        sp <- SpatialPolygons(p);
        W <- as(sp, "owin");
        cond <- match$V1 == i;
        count <- match[cond,]$V2;
        cond2 <- woj$idx == i;
        wojewo <- woj[cond2, ]$wojewodztwo;
        if(!(is.integer(count) || length(count) == 0L) && wojewo == nazwa){

          while(count > 1000000){
            dran <- runifpoint(500000, win=W);
            points(dran);
            count <- count - 500000;
          }
          dran <- runifpoint(count, win=W);
          points(dran);
        }
      }
      dev.off();
    }
    } else {
    # generuj jeden plik dla całej Polski
#      pdf(file= paste("polska7a.pdf", sep=""), width=93.6*1.2, height=66.2*3, pointsize=1/144, paper="special");
      pdf(file= paste("polska7b.pdf", sep=""), width=42, height=74.3, pointsize=1/144, paper="special");
      par(pch=".", cex =0.001,  col="#00000030", xpd=NA);
#      plot(wojewodztwa_shp, col="white", xlim=c(14.12293,19.13434), ylim=c(49.50239,54.33579));
      plot(wojewodztwa_shp, col="white", xlim=c(19.13434,24.14574), ylim=c(49.50239,54.33579));
      
    for(i in 1:length(nazwy_gmin)){
      p <- gminy_shp@polygons[i];
      sp <- SpatialPolygons(p);
      W <- as(sp, "owin");
      count <- match[i,]$V2;
      if(!(is.integer(count) && length(count) == 0L)){
        while(count > 1000000){
          dran <- runifpoint(500000, win=W);
          plot(dran, add=T);
          count <- count - 500000;
        }
        dran <- runifpoint(count, win=W);
        plot(dran, add=T);
      }
    }
    dev.off();
  } 
}

