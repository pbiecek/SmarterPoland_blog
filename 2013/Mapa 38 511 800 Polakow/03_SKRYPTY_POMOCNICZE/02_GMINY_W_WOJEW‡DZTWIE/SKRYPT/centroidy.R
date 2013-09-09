###############################################################################
#	Skrypt mapujący obszary GIS gmin na nazwy województw, w których się 
#	zawierają
#
#	Paweł Wiechucki 2013
###############################################################################

gmina_w_wojewodztwie <- function(){
  require(maptools);
  require(gdata);
  # ścieżka do pliku .shp z danymi gmin
  gminy_shp <- readShapePoly("gminy.shp");
  # ścieżka do pliku .shp z danymi województw
  wojewodztwa_shp <- readShapePoly("wojewodztwa.shp");
    
  centroids <- coordinates(gminy_shp);
  woj <- wojewodztwa_shp$NAZWA[over(SpatialPoints(centroids), SpatialPolygons(wojewodztwa_shp@polygons))];
  # ścieżka do pliku wynikowego
  write.csv(woj, file ="gmina_w_wojewodztwie.csv", col.names=c("idx", "wojewodztwa"));
}
