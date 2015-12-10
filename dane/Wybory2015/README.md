# Dane z sondaży przedwyborczych udostępnione przez IRCenter

Dane z trackingu CAWI, również uciąglone (tracking w pierwszej połowie kampanii szedł co tydzień, a w drugiej połowie – co dwa dni:
 
* zmienne z prefiksem "wiz" - wiarygodność, kompetencje, otwartość, uczciwość, nowoczesność, zaufanie - dane pochodzące z trackingu kwestionariuszowego (CAWI) realizowanego przez IRCenter w trakcie kampanii
* zmienne z prefiksem "akt" - aktywność internautów w związku z partiami politycznymi: czytanie / pisanie treści dostępnych w internecie - dane pochodzące z trackingu kwestionariuszowego (CAWI) realizowanego przez IRCenter w trakcie kampanii
 * dane sondażowe – to dane zebrane z serwisu ewybory – dla każdego dnia (jeśli było więcej niż jeden pomiar) wyciągnąłem średnią z obserwacji z poszczególnych sondaży. Dane uciągliłem prostym modelem z RapidMindera.

Więcej informacji znajduje się na stronie http://smarterpoland.pl/?p=6090

Należy wczytać plik `WyboryParlamentarne2015.rda`

```
> tail(dane)
         data wiz.PO.wiarygodnosc wiz.PO.kompetencje wiz.PO.otwartosc wiz.PO.uczciwosc wiz.PO.nowoczesnosc wiz.PO.zaufanie wiz.PIS.wiarygodnosc wiz.PIS.kompetencje wiz.PIS.otwartosc
81 2015-10-20                  NA                 NA               NA               NA                  NA              NA                   NA                  NA                NA
82 2015-10-21                  NA                 NA               NA               NA                  NA              NA                   NA                  NA                NA
83 2015-10-22                  NA                 NA               NA               NA                  NA              NA                   NA                  NA                NA
84 2015-10-23                  NA                 NA               NA               NA                  NA              NA                   NA                  NA                NA
85 2015-10-24                  NA                 NA               NA               NA                  NA              NA                   NA                  NA                NA
86 2015-10-25                  NA                 NA               NA               NA                  NA              NA                   NA                  NA                NA
   wiz.PIS.uczciwosc wiz.PIS.nowoczesnosc wiz.PIS.zaufanie widocznosc.kampanii.PO widocznosc.kampanii.PIS wybory.freq.przekonani wybory.freq.niepewni wybory.freq.niezamierzajacy
81                NA                   NA               NA                   0.48                    0.45                   0.47                 0.17                        0.36
82                NA                   NA               NA                   0.49                    0.47                   0.48                 0.16                        0.36
83                NA                   NA               NA                   0.51                    0.47                   0.49                 0.16                        0.36
84                NA                   NA               NA                   0.53                    0.47                   0.50                 0.15                        0.36
85                NA                   NA               NA                     NA                      NA                     NA                   NA                          NA
86                NA                   NA               NA                     NA                      NA                     NA                   NA                          NA
   pierwszywybor.PO pierwszywybor.PIS pierwszywybor.KUKIZ rozwazane.PO rozwazane.PIS rozwazane.Kukiz rozwazane.zlew rozwazane.psl rozwazane.korwin akt.czytanie.PO.Facebook
81             0.21              0.21                0.21         0.24          0.26            0.26           0.14          0.08             0.11                       NA
82             0.17              0.22                0.21         0.24          0.26            0.27           0.14          0.06             0.12                       NA
83             0.21              0.24                0.18         0.27          0.27            0.25           0.13          0.05             0.11                       NA
84             0.25              0.25                0.15         0.29          0.28            0.22           0.12          0.04             0.11                       NA
85               NA                NA                  NA           NA            NA              NA             NA            NA               NA                       NA
86               NA                NA                  NA           NA            NA              NA             NA            NA               NA                       NA
   akt.czytanie.PO.YouTube akt.czytanie.PO.email akt.czytanie.PO.serwisy akt.czytanie.PO.fora akt.czytanie.PO.video akt.czytanie.PO.wykop akt.czytanie.PO.blogi
81                      NA                    NA                      NA                   NA                    NA                    NA                    NA
82                      NA                    NA                      NA                   NA                    NA                    NA                    NA
83                      NA                    NA                      NA                   NA                    NA                    NA                    NA
84                      NA                    NA                      NA                   NA                    NA                    NA                    NA
85                      NA                    NA                      NA                   NA                    NA                    NA                    NA
86                      NA                    NA                      NA                   NA                    NA                    NA                    NA
   akt.czytanie.PO.Snapchat akt.pisanie.PO.Facebook akt.pisanie.PO.YouTube akt.pisanie.PO.email akt.pisanie.PO.serwisy akt.pisanie.PO.fora akt.pisanie.PO.video akt.pisanie.PO.wykop
81                       NA                      NA                     NA                   NA                     NA                  NA                   NA                   NA
82                       NA                      NA                     NA                   NA                     NA                  NA                   NA                   NA
83                       NA                      NA                     NA                   NA                     NA                  NA                   NA                   NA
84                       NA                      NA                     NA                   NA                     NA                  NA                   NA                   NA
85                       NA                      NA                     NA                   NA                     NA                  NA                   NA                   NA
86                       NA                      NA                     NA                   NA                     NA                  NA                   NA                   NA
   akt.pisanie.PO.blogi akt.pisanie.PO.Snapchat sondaz.PIS sondaz.PO sondaz.ZLEW sondaz.Kukiz sondaz.Korwin sondaz.PSL sondaz.Nowoczesna sondaz.Razem google.kopacz google.korwin
81                   NA                      NA       0.33      0.26        0.08         0.10          0.05       0.05              0.06           NA            59            42
82                   NA                      NA       0.37      0.24        0.08         0.07          0.04       0.05              0.06         0.03            17            49
83                   NA                      NA       0.36      0.22        0.08         0.09          0.05       0.06              0.07         0.03            13            41
84                   NA                      NA       0.37      0.22        0.09         0.10          0.04       0.06              0.08         0.03            14            53
85                   NA                      NA         NA        NA          NA           NA            NA         NA                NA           NA             7            46
86                   NA                      NA         NA        NA          NA           NA            NA         NA                NA           NA            14           100
   google.kukiz google.nowacka google.nowoczesna google.petru google.pis google.platforma google.psl google.razem google.szydlo google.zandberg google.zlew sm_pis sm_nowacka
81           31             65                24           60         27               68         19           53            56              49          31  82065      11940
82           35            100                25           49         25               63         17          100            20             100          24  70173      10947
83           31             78                25           35         26               74         16           40            17              49          30  63149       6615
84           41             44                40           47         35               82         28           40            26              28          47  83906       5803
85           38             16                38           31         29               59         19           22            10              10          33  18646        941
86          100             41               100          100        100              100         54           50            31              17         100  86856       2872
   sm_kopacz sm_nowoczesna_petru sm_nowoczesna_pl  sm_po sm_petru zm_zlew
81     60212               20767            26976 107176    20767   21341
82     35297               15595            22098 101240    15595   21863
83     20926                9748            16498  94304     9748   17500
84     25673               11861            23977 109141    11861   21311
85      5251                1712             4021  38154     1712    4216
86      9908                6915            20421  77091     6915   18922
```

Szczegółowe informacje uzyskać można od osoby, ktróra te dane przygotowała:

```
dr Albert Hupa, prezes IRCenter
hupa.albert na serwerze ircenter.com
```
