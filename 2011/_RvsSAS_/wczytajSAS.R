# ANALIZUJE LOG Z SAS I WYSZUKUJE CZASOW PROCEDUR
#================================================
# pobieram log z czasami z SAS
czasy_sas=scan(
	file = "C:/regresje/log_SAS.txt", #nazwa pliku
	what = "character", sep = ":", comment.char = "", allowEscapes = FALSE) 

# funkcja czykajaca w zmiennej czasy_sas czasow wykonania "procedury <nazwa>"
#----------------------------------------------------------------------------
czasy_proc=function(nazwa){
	wyn=sapply(1:length(czasy_sas),
	function(i){
		# sprawdza czy rekord zawiera linie z nazwa/czasem
		czy_nazwa=(length(grep(paste("PROCEDURE",toupper(nazwa)),toupper(czasy_sas[i]),fixed=T))==1)
		if(czy_nazwa){
			j=1
			wart=F
			# dopuki nie znajdzie wartosci lub koniec
			while ((wart==F)&&(i+j<=length(czasy_sas))){
				if (length(grep("czasu rzeczywistego",tolower(czasy_sas[i+j]),fixed=T))==1){
					wart=T
					pom=unlist(strsplit(tolower(czasy_sas[i+j]),"rzeczywistego "))[2]
					pom=sub(" sek.","",pom)
					return(as.numeric(pom))
				}
				j=j+1
			} #-while
		} #-if
		return(NA)
	}) #-sapply
	#usuwam puste smieci i generuje ostateczny wynik
	wyn=as.data.frame(na.omit(wyn))
	names(wyn)=paste(toupper(nazwa),"SAS",sep="_")
	return(wyn)
}

# wykorzystuje powyzsza funkcje (czasy_proc) 
# 	do zbudowania danych o czasach procedur
#--------------------------------------------
c1=czasy_proc("REG")
c2=czasy_proc("GLM")
c3=czasy_proc("GENMOD")
c4=czasy_proc("MIXED")
IND=1:dim(c1)[1]
czasy_sas=data.frame(IND,c1,c2,c3,c4)
czasy_sas #wyswietlam
srednie_sas=sapply(2:ncol(czasy_sas), #funkcja liczaca srednie
	function(i){
		x=sum(czasy_sas[,i])/ncol(czasy_sas) #licze srednie czasy
		names(x)=names(czasy_sas)[i] #dolaczam nazwy
		return(x)}) 
srednie_sas #wyswietlam