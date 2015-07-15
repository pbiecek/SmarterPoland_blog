/* TESTOWANIE CZASU REGRESJI
=============================
/* makro przeprowadzajace regresje "REG"
------------------------------------------------------*/
%macro reg10();
	ods listing select ParameterEstimates;
	proc reg data=dane;
		model y=zm1-zm10/ noint;
	run;
quit;
%mend reg10;
/* makro przeprowadzajace regresje "GLM"
------------------------------------------------------*/
%macro glm10();
	ods listing select ParameterEstimates;
	proc glm data=dane;
		model y=zm1-zm10/ noint;
	run;
	quit;
%mend glm10;
/* makro przeprowadzajace regresje "GENMOD"
------------------------------------------------------*/
%macro genmod10();
	ods listing select ParameterEstimates;
	proc genmod data=dane;
		model y=zm1-zm10/ noint;
	run;
	quit;
%mend genmod10;
/* makro przeprowadzajace regresje "MIXED"
------------------------------------------------------*/
%macro mixed10();
	ods listing select SolutionF;
	proc mixed data=dane;
		model y=zm1-zm10/ noint solution;
	run;
	quit;
%mend mixed10;
/* makro tworzace dane
------------------------------------------------------*/
%macro dane(l_obs);
data dane;
	array zm{10};
	do lw=1 to &l_obs;
	y=normal(-1);
	do i=1 to 10;
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
		%reg10()
		%glm10()
		%mixed10()
		%genmod10()
	%end;
%mend;
/* przeprowadzam regresje
------------------------------------------------------*/
%let n=100; /* liczba  powtorzen */
%let l_obs=1000; /* liczba  obserwacji (wierszy) */
proc printto log='c:/regresje/log_SAS.txt' new; /*przelaczam wyjscie logow na konkretny plik */
run;
%czasy(&l_obs,&n); /* wywoluje procedure */
proc printto log=log; /*przywracam wyjscie logow */
run;
