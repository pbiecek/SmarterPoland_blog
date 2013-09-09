###############################################################################
#	Skrypt pobieracjący mapowanie pomiędzy polygonem a nazwą i typem
#	gminy w postaci pliku CSV, potrzebnego dla dalszego przetwarzania 
#	danch.
#
#	Paweł Wiechucki 2013
###############################################################################

pobierz_dane_gmin <- function(){
  require(maptools);
  require(gdata);
  # ścieżka do pliku .shp z danymi gmin
  gminy_shp <- readShapePoly("gminy.shp");
  nazwy_gmin <- as(gminy_shp$NAZWA, "character");
  nazwa_gmin_parsed <- NULL;
  
  for(i in 1:length(nazwy_gmin)){
    record <- trim(unlist(strsplit(nazwy_gmin[i], " - ")));
    if(is.na(record[2])){
      x <- trim(unlist(strsplit(record[1], "\\(")));
      x <- gsub("\\)", "", x);
      if(!is.na(x[2])){
        if(x[2] == "gm. miejska"){
          record[1] <- x[1];
          record[2] <- x[2];
        } else {
          record[1] <- paste(x[1], x[2])
        }
      }else{
        record[2] <- "-";
      }
    } 
    record[1] <-  gsub("M\\. ", "", record[1]);
    nazwa_gmin_parsed <- rbind(nazwa_gmin_parsed, record, deparse.level=0);
  }
  
  # ścieżka do pliku 
  write.csv(nazwa_gmin_parsed, file="nazwy_gmin_shp.csv")
}
