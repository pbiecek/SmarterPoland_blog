# REGRESJA LINIOWA - CZAS
#========================

# funkcja produkujaca identyczna regresje jak w SAS metoda lm
#-------------------------------------------------------------
reg_lm=function(y,x){
	lm(formula = y ~ x -1)
}
# funkcja produkujaca identyczna regresje jak w SAS za pomoca lm.fit
#-------------------------------------------------------------------
reg_lmfit=function(y,x){
	lm.fit(x,y)$coefficients
}

# funkcja produkujaca identyczna regresje jak w SAS metoda glm
#-------------------------------------------------------------
reg_glm=function(y,x){
	glm(formula = y~x-1)
}

# funkcja produkujaca identyczna regresje jak w SAS za pomoca glm.fit
#--------------------------------------------------------------------
reg_glmfit=function(y,x){
	glm.fit(x,y)$coefficients
}

# funkcja liczaca czasy
#-----------------------
czasy=function(zm,obs){
	X=matrix(rnorm(obs*zm),obs)
	y=rnorm(obs)
	LM=system.time(reg_lm(y,X))[3]
	LMFIT=system.time(reg_lmfit(y,X))[3]
	GLM=system.time(reg_glm(y,X))[3]
	GLMFIT=system.time(reg_glmfit(y,X))[3]
	return(cbind(obs,LM,LMFIT,GLM,GLMFIT))
}

#powtarzam n razy obie metody regresji - obliczam czas
#-----------------------------------------------------
obs=1000 #liczba obserwacji (wierszy)
n=100 #liczba powtorzen
zm=10 #liczba zmiennych
x=c(0,0,0,0,0) #wynik (czasy srednie)
for (i in 1:n)
	x=x+czasy(zm,obs)
x=x/n	#biore srednia
x #wyswietlam

#-----------------
# Michal Marciniak