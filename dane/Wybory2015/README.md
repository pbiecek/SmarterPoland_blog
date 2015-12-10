# Dane z sondaży przedwyborczych udostępnione przez IRCenter

Dane z trackingu CAWI, również uciąglone (tracking w pierwszej połowie kampanii szedł co tydzień, a w drugiej połowie – co dwa dni:
 
* zmienne z prefiksem "wiz" - wiarygodność, kompetencje, otwartość, uczciwość, nowoczesność, zaufanie - dane pochodzące z trackingu kwestionariuszowego (CAWI) realizowanego przez IRCenter w trakcie kampanii
* zmienne z prefiksem "akt" - aktywność internautów w związku z partiami politycznymi: czytanie / pisanie treści dostępnych w internecie - dane pochodzące z trackingu kwestionariuszowego (CAWI) realizowanego przez IRCenter w trakcie kampanii
 * dane sondażowe – to dane zebrane z serwisu ewybory – dla każdego dnia (jeśli było więcej niż jeden pomiar) wyciągnąłem średnią z obserwacji z poszczególnych sondaży. Dane uciągliłem prostym modelem z RapidMindera.

Więcej informacji znajduje się na stronie http://smarterpoland.pl/?p=6090

Należy wczytać plik `WyboryParlamentarne2015.rda`

```
> head(dane)
        data wiz.PO.wiarygodnosc wiz.PO.kompetencje wiz.PO.otwartosc wiz.PO.uczciwosc wiz.PO.nowoczesnosc wiz.PO.zaufanie wiz.PIS.wiarygodnosc wiz.PIS.kompetencje wiz.PIS.otwartosc
1 2015-08-01                  NA                 NA               NA               NA                  NA              NA                   NA                  NA                NA
2 2015-08-02                  NA                 NA               NA               NA                  NA              NA                   NA                  NA                NA
3 2015-08-03                  NA                 NA               NA               NA                  NA              NA                   NA                  NA                NA
4 2015-08-04                  NA                 NA               NA               NA                  NA              NA                   NA                  NA                NA
5 2015-08-05                  NA                 NA               NA               NA                  NA              NA                   NA                  NA                NA
6 2015-08-06                  NA                 NA               NA               NA                  NA              NA                   NA                  NA                NA
  wiz.PIS.uczciwosc wiz.PIS.nowoczesnosc wiz.PIS.zaufanie widocznosc.kampanii.PO widocznosc.kampanii.PIS wybory.freq.przekonani wybory.freq.niepewni wybory.freq.niezamierzajacy
1                NA                   NA               NA                     NA                      NA                     NA                   NA                          NA
2                NA                   NA               NA                     NA                      NA                     NA                   NA                          NA
3                NA                   NA               NA                     NA                      NA                     NA                   NA                          NA
4                NA                   NA               NA                     NA                      NA                     NA                   NA                          NA
5                NA                   NA               NA                     NA                      NA                     NA                   NA                          NA
6                NA                   NA               NA                     NA                      NA                     NA                   NA                          NA
  pierwszywybor.PO pierwszywybor.PIS pierwszywybor.KUKIZ rozwazane.PO rozwazane.PIS rozwazane.Kukiz rozwazane.zlew rozwazane.psl rozwazane.korwin akt.czytanie.PO.Facebook
1               NA                NA                  NA           NA            NA              NA             NA            NA               NA                       NA
2               NA                NA                  NA           NA            NA              NA             NA            NA               NA                       NA
3               NA                NA                  NA           NA            NA              NA             NA            NA               NA                       NA
4               NA                NA                  NA           NA            NA              NA             NA            NA               NA                       NA
5               NA                NA                  NA           NA            NA              NA             NA            NA               NA                       NA
6               NA                NA                  NA           NA            NA              NA             NA            NA               NA                       NA
  akt.czytanie.PO.YouTube akt.czytanie.PO.email akt.czytanie.PO.serwisy akt.czytanie.PO.fora akt.czytanie.PO.video akt.czytanie.PO.wykop akt.czytanie.PO.blogi
1                      NA                    NA                      NA                   NA                    NA                    NA                    NA
2                      NA                    NA                      NA                   NA                    NA                    NA                    NA
3                      NA                    NA                      NA                   NA                    NA                    NA                    NA
4                      NA                    NA                      NA                   NA                    NA                    NA                    NA
5                      NA                    NA                      NA                   NA                    NA                    NA                    NA
6                      NA                    NA                      NA                   NA                    NA                    NA                    NA
  akt.czytanie.PO.Snapchat akt.pisanie.PO.Facebook akt.pisanie.PO.YouTube akt.pisanie.PO.email akt.pisanie.PO.serwisy akt.pisanie.PO.fora akt.pisanie.PO.video akt.pisanie.PO.wykop
1                       NA                      NA                     NA                   NA                     NA                  NA                   NA                   NA
2                       NA                      NA                     NA                   NA                     NA                  NA                   NA                   NA
3                       NA                      NA                     NA                   NA                     NA                  NA                   NA                   NA
4                       NA                      NA                     NA                   NA                     NA                  NA                   NA                   NA
5                       NA                      NA                     NA                   NA                     NA                  NA                   NA                   NA
6                       NA                      NA                     NA                   NA                     NA                  NA                   NA                   NA
  akt.pisanie.PO.blogi akt.pisanie.PO.Snapchat sondaz.PIS sondaz.PO sondaz.ZLEW sondaz.Kukiz sondaz.Korwin sondaz.PSL sondaz.Nowoczesna sondaz.Razem google.kopacz google.korwin
1                   NA                      NA         NA        NA          NA           NA            NA         NA                NA           NA             3             5
2                   NA                      NA         NA        NA          NA           NA            NA         NA                NA           NA             4             4
3                   NA                      NA         NA        NA          NA           NA            NA         NA                NA           NA             3             4
4                   NA                      NA       0.35      0.23        0.07         0.07            NA       0.06              0.05           NA             2             5
5                   NA                      NA       0.36      0.24        0.07         0.07          0.01       0.06              0.06           NA             2             4
6                   NA                      NA       0.37      0.25        0.08         0.07          0.01       0.05              0.06           NA             3             5
  google.kukiz google.nowacka google.nowoczesna google.petru google.pis google.platforma google.psl google.razem google.szydlo google.zandberg google.zlew sm_pis sm_nowacka
1            9              0                 3            0          2               24          0            0             3               0           0  18240        274
2            8              0                 3            4          3               17          6            0             2               0           0  23482        194
3            7              0                 3            4          3               27          6            0             3               0           0  29384        221
4            8              0                 4            3          4               27          5            0             3               0           0  26120        354
5            7              0                 3            3          3               31          4            0             3               0           0  42507        419
6            7              0                 3            4          4               26          4            0             3               0           0  93949        463
  sm_kopacz sm_nowoczesna_petru sm_nowoczesna_pl sm_po sm_petru zm_zlew
1      8026                 657             2436 42781      657    2856
2      7655                1585             3772 37879     1585    2558
3      7505                1217             4376 54838     1217    3349
4      7773                 784             2728 58899      784    3920
5      6548                 494             2420 77542      494    4389
6      6244                 521             2498 73910      521    7105
```

Szczegółowe informacje uzyskać można od osoby, ktróra te dane przygotowała:

```
dr Albert Hupa, prezes IRCenter
hupa.albert na serwerze ircenter.com
```
