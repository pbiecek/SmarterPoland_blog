/* TESTOWANIE CZASU REGRESJI
=============================
/* makro przeprowadzajace regresje "REG"
------------------------------------------------------*/
%macro reg1000();
	ods listing select ParameterEstimates;
	proc reg data=dane;
		model y=zm1-zm1000/ noint;
	run;
quit;
%mend reg1000;
/* makro przeprowadzajace regresje "GLM"
------------------------------------------------------*/
%macro glm1000();
	ods listing select ParameterEstimates;
	proc glm data=dane;
		model y=zm1-zm1000/ noint;
	run;
	quit;
%mend glm1000;
/* makro przeprowadzajace regresje "GENMOD"
------------------------------------------------------*/
%macro genmod1000();
	ods listing select ParameterEstimates;
	proc genmod data=dane;
		model y=zm1-zm1000/ noint;
	run;
	quit;
%mend genmod1000;
/* makro przeprowadzajace regresje "MIXED"
------------------------------------------------------*/
%macro mixed1000();
	ods listing select SolutionF;
	proc mixed data=dane;
		model y=zm1-zm1000/ noint solution;
	run;
	quit;
%mend mixed1000;
/* makro tworzace dane
------------------------------------------------------*/
%macro dane(l_obs);
data dane;
	array zm{1000};
	do lw=1 to &l_obs;
	y=normal(-1);
	do i=1 to 1000;
		zm{i}=normal(-1);
	end;
	output;
	end;
	drop i lw;
run;
%mend dane;
/* makro wywolujace regresje
------------------------------------------------------*/
%macro czasy(l_obs, n);
	%do i=1 %to &n; /*petla powtarzajaca regresje*/
		%dane(&l_obs)
		%reg1000()
		%glm1000()
		%mixed1000()
		%genmod1000()
	%end;
%mend;
/* przeprowadzam regresje
------------------------------------------------------*/
%let n=10; /* liczba  powtorzen */
%let l_obs=1000; /* liczba  obserwacji (wierszy) */
proc printto log='c:/regresje/log_SAS.txt' new; /*przelaczam wyjscie logow na konkretny plik */
run;
%czasy(&l_obs,&n); /* wywoluje procedure */
proc printto log=log; /*przywracam wyjscie logow */
run;
