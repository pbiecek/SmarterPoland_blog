

Dane:
Informacje o kolejkach zapisane s¹ w plikach xls (excel).
Na ka¿de wojwództwo przypada ich kilka. Nas teraz bêdzie interesowa³ tylko ten zawieraj¹cy AOS.
Jest wiêc 16 plików, które wygl¹daj¹ mniej-wiêcej w ten sposób.
01_AOS_31072013.xls
02_AOS_31072013.xls
...
16_AOS_31072013.xls

Województwa s¹ u³o¿one alfabetycznie -
najmniejszy numer odpowiada województwu dolnoœl¹skiemu, a najwiêkszy zachodniopomorskiemu.
Aby powi¹zaæ numer z nazw¹ województwa przygotowa³em plik województwa.csv, w którym s¹ one wypisane w nale¿ytej kolejnoœci.

wojwództwa.csv
WOJ. DOLNOŒL¥SKIE
WOJ. KUJAWSKO-POMORSKIE
WOJ. LUBELSKIE
WOJ. LUBUSKIE
WOJ. £ÓDZKIE
WOJ. MA£OPOLSKIE
WOJ. MAZOWIECKIE
WOJ. OPOLSKIE
WOJ. PODKARPACKIE
WOJ. PODLASKIE
WOJ. POMORSKIE
WOJ. ŒL¥SKIE
WOJ. ŒWIÊTOKRZYSKIE
WOJ. WARMIÑSKO-MAZURSKIE
WOJ. WIELKOPOLSKIE
WOJ. ZACHODNIOPOMORSKIE

Dane o granicach administracyjnych Polski pobra³em z Geoportalu. Ze wzglêdów licencyjnych pocz¹tkowo chcia³em wykorzystaæ OpenStreetMap.
Gotowe pliki shapefile oferuje m.in. geofabrik/cloudmade. Niestety, je¿eli chodzi o Polskê nie mia³em czego szukaæ - wszystkie mapy by³y zdeformowane.
Mapy z Geoportalu nie s¹ dostêpne w formacie shapefile. Na szczêœcie dziêki instrukcjom we wpisie Pawe³a Wiechuckiego
(http://smarterpoland.pl/index.php/2013/05/poniewaz-mozemy-czyli-o-mapie-na-ktorej-widac-38-511-800-polakow/)
 ich w³asnorêczne stworzenie nie by³o trudne. 


Biblioteki:
maptools - funkcja readShapePoly - wczytanie pliku ShapeFile.
sp - manipulacje i wyœwietlanie danych kartograficznych.
rgeos,rgdal - potrzebujemy za³adowaæ je, by skorzystaæ z funkcji spTransform, która pozwala zmieniæ uk³ad wspó³rzêdnych
FNN - funkcja get.knnx - regresja
SmarterPoland - dziêki temu, zawiera funkcjê getGoogleMapsAddress u³atwi pobranie wspó³rzêdnych punktu o okreœlonym adresie
Cairo - wyjœcie wykresu [TODO]
XLConnect - obs³uga plików excela

library(maptools)
library(sp)
library(rgeos)
library(SmarterPoland)
library(FNN)
library(rgdal)
library(Cairo)
library(XLConnect)


Zmiana katalogu roboczego. Wczytanie listy województw.

Z ka¿dego pliku "aos" odczytujemy dane, które zaczynaj¹ siê w 3 wierszu(razem z nag³ówkiem)  i maj¹ 9 kolumn. 
Postawnowi³em zmieniæ nazwy kolumn, gdy¿ oryginalne by³y nies³ychanie d³ugie.
Dodatkowo tworzymy dodatkowe kolumny - ID i nazwê województwa.

#
setwd("C:\\Users\\mic\\Documents\\eurostat\\nfzqueue\\new")
wojewodztwa = read.csv("wojewodztwa.csv", header=FALSE)
wojewodztwa$V1 = as.character(wojewodztwa$V1)


poradnie = data.frame()
for( i in 1:16 )
{
	filename = sprintf("%02d_AOS_31072013.xls", i)
	print(filename)
	wb = loadWorkbook( filename, create = FALSE)
	dane = readWorksheet(wb,sheet="Zestawienie", startRow = 3, startCol=0, endCol=8)
	dane$IDWojewodztwa = i
	dane$Wojewodztwo = wojewodztwa$V1[i]
	
	poradnie = rbind(poradnie, dane)
}

#zmiana nazwy kolumn
names(poradnie) = c(
"Nazwa.komorki.realizujacej",
"Kategoria",
"Nazwa",
"Nazwa.komorki",
"Adres",
"Liczba.oczekujacych",
"Liczba.skreslonych",
"Sredni.czas",
"ID.wojewodztwa",
"Wojewodztwo")
#

Pacjenci s¹ podzieleni przez NFZ na dwie grupy - "przypadek stabilny" i "przypadek ostry".
Wizualizowaæ bêdziemy wy³¹cznie dane o przypadkach stabilnych.

Dalej dzielimy adres na czêœci sk³adowe - nazwa miejscowoœci i ulica razem z numerem numer lokalu.

#
poradnie = poradnie[which(poradnie$Kategoria == "przypadek stabilny"), ]
poradnie$Miejscowosc = sapply(strsplit(poradnie$Adres, "\n"), function(x) x[1] )
poradnie$Ulica = sapply(strsplit(poradnie$Adres, "\n"), function(x) x[2] )

poradnie$Sredni.czas = as.numeric(poradnie$Sredni.czas)
#


Pobieramy wspó³rzêdne wy³¹cznie miejscowoœci w której znajduje siê poradnia.
Jest to znacznie szybsze, a z pewnoœci¹ nie potrzebujemy wiêkszej dok³adnoœci.
Po za tym Google ogranicza darmowy dostêp do us³ugi do 2500 zapytañ dziennie.

Konstruujemy wiêc tabelê zawieraj¹c¹ nazwê miejscowoœci w jednej kolumnie, a w drugiej województwo w którym siê ona znajduje.
Dodanie województwa pomaga uœciœliæ zapytanie - istniej¹ przecie¿ miejscowoœci, które nosz¹ t¹ sam¹ nazwê.

Funkcja unique eliminuje zduplikowane wiersze.
W pêtli tworzymy now¹ zmienn¹ region, w której zapisujemy jedynie nazwê województwa bez skrótu "Woj." na pocz¹tku.
Google Geocoding raczej nie trawi tego przedrostka.

Województwo ³¹czymy z nazw¹ miejscowoœci i przekazujemy do argumentu city funkcji getGoogleMapAddress.
Mo¿e wygl¹daæ to dziwnie, ale zapytanie i tak zostanie skonstruowane poprawnie.
#
places_unique = data.frame( poradnie$Miejscowosc, poradnie$Wojewodztwo, check.names=FALSE)
places_unique = unique( places_unique )
names(places_unique) = c("Miejscowosc", "Wojewodztwo")
places_unique$Wojewodztwo = as.character(places_unique$Wojewodztwo)
places_unique$Miejscowosc = as.character(places_unique$Miejscowosc)

for( i in 1:nrow(places_unique) )
{
	region = strsplit( places_unique$Wojewodztwo[i], " " )[[1]][2]
	temp_coords = getGoogleMapsAddress(street="",city=paste(places_unique$Miejscowosc[i],",",region))

	places_unique$lat_wgs84[i] = temp_coords[1]
	places_unique$lng_wgs84[i] = temp_coords[2]
}
#

Zawczasu warto przygotowaæ sobie wspó³rzêdne w uk³adzie, który jest bardziej przyjazny do zadania:
Tworzymy zmienn¹ typu SpatialPoints i okreœlamy ich uk³ad wspó³rzêdnych.
Wspó³rzêdne, które pobraliœmy s¹ w uk³adzie odniesienia WGS 84, znanym tak¿e jako EPSG:4326

Nastêpnie zmieniamy uk³ad wspó³rzêdnych przy pomocy funkcji spTransform.

Ostatecznie ³¹czymy dwie tabele przy pomocy funkcji merge.
Wreszcie mamy wszystkie interesuj¹ce nas wartoœci.

#
places_sp = SpatialPoints( cbind(places_unique$lng_wgs84, places_unique$lat_wgs84) )
proj4string(places_sp) = CRS("+init=epsg:4326")
places_sp = spTransform( places_sp, CRS("+init=epsg:2180"))


places_unique$lng = coordinates(places_sp)[,1]
places_unique$lat = coordinates(places_sp)[,2]

poradnie = merge(poradnie, places_unique)
#

Wczytanie pliku shapefile, który zawiera granice administracyjne województw.
Jest ju¿ w prawid³owym uk³adzie wspó³rzêdnych - wystarczy tylko go okreœliæ.

#
wojewodztwa.shp = readShapePoly("geoportal\\woj.shp")
proj4string(wojewodztwa.shp)=CRS("+init=epsg:2180")
#

Funkcja generate_grid pos³u¿y do wygenerowania kraty, która bêdzie pokrywaæ powierzchniê okreœlonego pola.
Na obrazku widaæ punkty kraty. W istocie s¹ to punkty, które bêd¹ s³u¿y³y jako punkty startowe linii.

Pierwszy argument funkcji to iloœæ komórek kraty w osi X.
Komórka kraty ma byæ kwadratem, wiêc ich iloœæ w osi Y nie bêdzie przekazywana do funkcji.

Nastêpnie wyliczamy topologiê kraty. Przekazujemy:
-wspó³rzêdne dolnego, lewego rogu
-wymiary komórek
-iloœæ komórek
I na koniec zwracamy obiekt klasy SpatialGrid.

[krata.png]
#
generate_grid = function( cell_n_x=1000, sp_polygons)
{
	bbox_min = bbox(sp_polygons)[,1]
	bbox_max = bbox(sp_polygons)[,2]
	cell_width=((bbox_max-bbox_min)/cell_n_x)[1]
	cell_height=cell_width
	cell_n_y = ceiling(((bbox_max-bbox_min)/cell_height)[2])


	gt = GridTopology( bbox_min, c(cell_width,cell_height), c(cell_n_x,cell_n_y)  )
	sg = SpatialGrid(gt, CRS("+init=epsg:2180"))
	return(sg)
}


Jak by³o widaæ na obrazku, czêœæ punktów kraty znajduje siê poza granicami kraju.
Funkcja which_cells_inside zwaraca indeksy komórek kraty, które znajduj¹ siê wewn¹trz obiektu SpatialPolygons.

Wykorzystamy do tego funkcjê over. Dla argumentów SpatialPoints i SpatialPolygons funkcja zwraca wektor o d³ugoœci równej iloœci punktów.
Wartoœci wektora mówi¹ o tym, wewn¹trz którego wielok¹ta znajduje siê punkt.
Tych mamy 16 - odpowiadaj¹ województwom.

Je¿eli jest poza jakimkolwiek wielok¹tem sk³adowym to danemu punktowi odpowiadaæ bêdzie wartoœæ NA.

Szczegó³owo wielok¹t sk³adowy to obiekt klasy Polygons:
#
> class(wojewodztwa.shp)
[1] "SpatialPolygonsDataFrame"
attr(,"package")
[1] "sp"
> class(wojewodztwa.shp@polygons)
[1] "list"
> class(wojewodztwa.shp@polygons[[1]])
[1] "Polygons"
attr(,"package")
[1] "sp"
> length(wojewodztwa.shp@polygons)
[1] 16
#


#
which_cells_inside = function( sp_grid, sp_polygons)
{
	grid_coords = coordinates(sp_grid)
	grid_points = SpatialPoints(grid_coords, CRS( proj4string(sp_grid)) )
	inside = over( grid_points, sp_polygons)
	proj4string(grid_points) = proj4string(wojewodztwa.shp)
	inside = which( inside$ID1 > 0 )
	return(inside)
}
#

Generowanie linii. W argumentach znajduje siê zmienna cell_distance, która mówi co ile komórek kraty bêdzie znajdowaæ siê pocz¹tek linii.
Gdy pisa³em kod uzna³em, ¿e byæ mo¿e takie rozwi¹zanie siê przyda. Teraz jestem pewien, ¿e bardziej elegancko by³oby genenerowaæ mniejsz¹ kratê.
Co z reszt¹ ka¿dy zauwa¿y.

Zwracamy obiekt typu SpatialLines. Strunkura obiektów (Spatial)Line(s) jest podobna do Polygons.

Przypominam, ¿e linie rysujemy od punktu kraty do najbli¿szej przychodni.
Musimy wiêc wiedzieæ, która jest najbli¿sza.
Przekazujemy wiêc macierz knn_indices w której bêdzie to zapisane.

sp_points to obiekt typu SpatialPoints, zawieraj¹cy listê przychodni.

cell_subset ogranicza kratê, tak by linie by³y prowadzone tylko z wewn¹trz kraju. 


generate_lines = function( knn_indices, sp_grid, sp_points, cell_distance=1, cell_subset=NULL )
{
	cell_n_x = sg@grid@cells.dim[1]
	cell_n_y = sg@grid@cells.dim[2]
	#macierz ktora zawiera indeksy komorek w ktorych zaczynaja sie linie
	line_anchors = matrix(nrow=floor(cell_n_y/cell_distance), ncol=floor(cell_n_x/cell_distance))
	for( i in 1:nrow(line_anchors))
	{
		line_anchors[i,] = seq(cell_distance, cell_n_x, by= cell_distance) +
						  rep(cell_n_x*cell_distance*i,floor(cell_n_x/cell_distance))
	}
	#tylko te linie ktorych poczatek jest w wybranych komorkach
	#na przyklad wewnatrz kraju
	line_anchors = intersect(line_anchors, cell_subset)
	
	#konstrukcja obiektow biblioteki sp
	line_starts = coordinates(sp_grid)[line_anchors,]
	closest_medic_idx = knn_indices[line_anchors,1]
	
	line_stops = coordinates(sp_points)[closest_medic_idx,]
	line_list = sapply( 1:nrow(line_starts), function(x) Line( rbind( line_starts[x,], line_stops[x,])) )
	line_obj = Lines(line_list, ID="a")
	sp_lines_obj = SpatialLines( list(line_obj) )

	return(sp_lines_obj)
}


Odpalamy funkcje.
W pêtli przejdziemy po kolei po ka¿dym typie poradni.
Wewn¹trz niej wybierzemy interesuj¹ce nas wiersze w tabeli poradnie.
Dziêki bibliotece Cairo ³atwo zapiszemy wykres w wysokiej rozdzielczoœci.
get.knnx jest funkcj¹ obliczaj¹c¹ regresjê k-s¹siadów.
W pierwszym arguemenie jest zbiór danych, w drugim zbiór zapytañ.
W tej sytuacji interesuje nas wy³¹cznie najbli¿szy s¹siad, wiêc k wynosi 1.
Zwraca dwie macierze - w pierwszej zapisuje indeksy najbli¿szych s¹siadów, a w drugiej odleg³oœci.


#wczytanie danych, etc..
#kod
sg = generate_grid( cell_n_x=100, wojewodztwa.shp)
inside_poland = which_cells_inside( sg, wojewodztwa.shp)


for( specialist_type in unique( (poradnie$Nazwa.komorki.realizujacej) ) )
{
	print(specialist_type)
	flush.console()
	specialist = poradnie[which(poradnie$Nazwa.komorki.realizujacej == specialist_type),]
	specialist_sp = SpatialPoints( cbind( specialist$lng, specialist$lat) ,CRS("+init=epsg:2180") )

	knn_res = get.knnx( specialist_sp@coords, coordinates(sg), k = 1 )
	
	sp_lines_obj = generate_lines( knn_res[[1]], sg, specialist_sp, cell_distance=1, cell_subset=inside_poland )
	
	Cairo(900, 700, file=paste(specialist_type,".png",sep=""), type="png", bg="white")
	plot(wojewodztwa.shp)
	plot(sp_lines_obj,add=T)
	#plot(specialist_sp,col="blue",lwd=2, add=T)
	title(main=specialist_type)
	dev.off()
}


Hidden track. Tworzenie map "kolorowych". Tworzymy trochê bardziej gêst¹ kratê.
Nastêpnie uzyskujemy punkty kraty i zmieniamy ich uk³ad wspó³rzêdnych do WGS 84.

Jest to niezbêdne - dla uk³adu wspó³rzêdnych epsg:2180 funkcja spDistsN1 nie zwraca³¹ odleg³oœci w kilometrach. 


sg = generate_grid( cell_n_x=500, wojewodztwa.shp)
inside_poland = which_cells_inside( sg, wojewodztwa.shp)

grid_points_wgs84 = SpatialPoints( coordinates(sg), CRS(proj4string(sg)))
grid_points_wgs84 = spTransform(grid_points_wgs84, CRS("+init=epsg:4326"))
gp_coords = coordinates(grid_points_wgs84)

for( specialist_type in unique( (poradnie$Nazwa.komorki.realizujacej) ) )
{
	print(specialist_type)
	flush.console()
	specialist = poradnie[which(poradnie$Nazwa.komorki.realizujacej == specialist_type),]
	specialist_sp = SpatialPoints( cbind( specialist$lng, specialist$lat) ,CRS("+init=epsg:2180") )
	specialist_coords_wgs84 = cbind( specialist$lng_wgs84, specialist$lat_wgs84)

	#knn_res = get.knnx( specialist_sp@coords, coordinates(sg), k = ifelse(nrow(specialist)>10, 10, nrow(specialist) ))
	knn_res = get.knnx( specialist_sp@coords, coordinates(sg), k = 1)
	
	knn_indices = knn_res[[1]]
	km_distances =  matrix( nrow=nrow( knn_indices ), ncol=ncol(knn_indices))
	closest_coords = apply( knn_indices, c(1,2), function(x) specialist_coords_wgs84[x,])
	closest_coords = matrix( closest_coords, ncol = 2, byrow=TRUE ) #2*ncol(knn_indices)
	
	for (rowID in 1:nrow( knn_indices ) )
	{
		pts = matrix(closest_coords[rowID,],ncol=2)

		p = gp_coords[rowID,]
		km_distances[rowID,] = spDistsN1(pts, p, TRUE)
	}
	closest_distance = km_distances[,1]
	sg_df = SpatialGridDataFrame( sg, data.frame(closest_distance))
	
	#obszar po³o¿ony poza granicami kraju ma mieæ kolor bia³y
	sg_df@data$closest_distance[-inside_poland]=0
	#80 jest górn¹ granic¹ wartoœci na wykresie
	sg_df@data$closest_distance[ sg_df@data$closest_distance>80] = 80
	
	Cairo(900, 700, file=paste(specialist_type,"_c",".png",sep=""), type="png", bg="white")
	print(spplot( sg_df, panel = function(x,y,...){
	panel.gridplot(x,y,...,  )
	sp.polygons( wojewodztwa.shp )
	sp.points( specialist_sp, pch=".", col="black" )
	}, at=c(1:80), col.regions = rev(heat.colors(100)), main=specialist_type))
	dev.off()
	
}
[Poradnia Pulmonologiczna.png]
#

By³o to mój pierwszy "wiêkszy" projekt w R. Z pewnoœci¹ wiele rozwi¹zañ nie jest najlepszych, ale mimo wszystko mam nadziejê, ¿e ten wpis bêdzie pomocny.




