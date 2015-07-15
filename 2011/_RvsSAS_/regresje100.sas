/* TESTOWANIE CZASU REGRESJI
======================================================*/
/* makro przeprowadzajace regresje "REG"
------------------------------------------------------*/
%macro reg100();
	ods listing select ParameterEstimates;
	proc reg data=dane;
		model y=zm1-zm100/ noint;
	run;
quit;
%mend reg100;
/* makro przeprowadzajace regresje "GLM"
------------------------------------------------------*/
%macro glm100();
	ods listing select ParameterEstimates;
	proc glm data=dane;
		model y=zm1-zm100/ noint;
	run;
	quit;
%mend glm100;
/* makro przeprowadzajace regresje "GENMOD"
------------------------------------------------------*/
%macro genmod100();
	ods listing select ParameterEstimates;
	proc genmod data=dane;
		model y=zm1-zm100/ noint;
	run;
	quit;
%mend genmod100;
/* makro przeprowadzajace regresje "MIXED"
------------------------------------------------------*/
%macro mixed100();
	ods listing select SolutionF;
	proc mixed data=dane;
		model y=zm1-zm100/ noint solution;
	run;
	quit;
%mend mixed100;
/* makro tworzace dane
------------------------------------------------------*/
%macro dane(l_obs);
data dane;
	array zm{100};
	do lw=1 to &l_obs;
	y=normal(-1);
	do i=1 to 100;
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
		%reg100()
		%glm100()
		%mixed100()
		%genmod100()
	%end;
%mend;
/* przeprowadzam regresje
------------------------------------------------------*/
%let n=50; /* liczba  powtorzen */
%let l_obs=1000; /* liczba  obserwacji (wierszy) */
proc printto log='c:/regresje/log_SAS.txt' new; /*przelaczam wyjscie logow na konkretny plik */
run;
%czasy(&l_obs,&n); /* wywoluje procedure */
proc printto log=log; /*przywracam wyjscie logow */
run;

