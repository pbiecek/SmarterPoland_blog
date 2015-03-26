library(shiny)
library(ggvis)

seriale <- c("'Allo 'Allo!", "24", "Adventure Time", "Agatha Christie's Poirot", 
             "All in the Family", "Almost Human", "American Horror Story", 
             "Archer", "Arrow", "Are You Afraid of the Dark?", "Arrested Development", 
             "Attack on Titan", "Avatar: The Last Airbender", "Avrupa yakasi", 
             "Batman: The Animated Series", "Battlestar Galactica", "Behzat Ç.: Bir Ankara Polisiyesi", 
             "Berserk", "Black Adder the Third", "Black Books", "Black Mirror", 
             "Black-Adder II", "Blackadder Goes Forth", "Blue Mountain State", 
             "Boardwalk Empire", "Borgen", "Boston Legal", "Breaking Bad", 
             "Broadchurch", "Californication", "Call the Midwife", "Carnivàle", 
             "Castle", "Chappelle's Show", "Code Geass: Lelouch of the Rebellion", 
             "Community", "Cosmos", "Cosmos: A Space-Time Odyssey", "Coupling", 
             "Courage the Cowardly Dog", "Cowboy Bebop", "Curb Your Enthusiasm", 
             "Deadwood", "Death Note", "Dexter", "Doctor Who", "Downton Abbey", 
             "Dragon Ball", "Dragon Ball Z", "Dragon Ball Z Kai", "Dragonball", 
             "Entourage", "Extras", "Family Guy", "Farscape", "Father Ted", 
             "Fawlty Towers", "Firefly", "FLCL", "Flight of the Conchords", 
             "Foyle's War", "Freaks and Geeks", "Friday Night Lights", "Friends", 
             "Fringe", "Fullmetal Alchemist", "Fullmetal Alchemist Brotherhood", 
             "Futurama", "Game of Thrones", "Garth Marenghi's Darkplace", 
             "Get Smart", "Ghost in the Shell: Stand Alone Complex", "Green Wing", 
             "Hannibal", "Hellsing Ultimate", "Homeland", "Homicide: Life on the Street", 
             "House M.D.", "House of Cards", "How I Met Your Mother", "I Love Lucy", 
             "I, Claudius", "I'm Alan Partridge", "Invader ZIM", "Isler Güçler", 
             "It's Always Sunny in Philadelphia", "Jeeves and Wooster", "Justice League", 
             "Justified", "Late Night with Conan O'Brien", "Leyla ile Mecnun", 
             "Life", "Life on Mars", "Lost", "Louie", "Luther", "M*A*S*H", 
             "Mad Men", "Metalocalypse", "Misfits", "Modern Family", "Monty Python's Flying Circus", 
             "Mr. Bean", "My So-Called Life", "Mystery Science Theater 3000", 
             "MythBusters", "Naruto: Shippûden", "Neon Genesis Evangelion", "Ninjago: Masters of Spinjitzu",
             "One Piece", "Only Fools and Horses....", "Orange Is the New Black", 
             "Orphan Black", "Oz", "Parks and Recreation", "Party Down", "Peep Show", 
             "Person of Interest", "Planet Earth", "Police Squad!", "Prison Break", 
             "Psych", "Pushing Daisies", "QI", "Red Dwarf", "Red vs. Blue: The Blood Gulch Chronicles", 
             "Regular Show", "Rescue Me", "Robin of Sherwood", "Rome", "Rurouni Kenshin", "Samurai Champloo", 
             "Scrubs", "Seinfeld", "Shameless", "Sherlock", "Six Feet Under", 
             "Sons of Anarchy", "South Park", "Southland", "Spaced", "Spartacus: War of the Damned", 
             "Star Trek", "Star Trek: The Next Generation", "Stargate SG-1", 
             "Suits", "Summer Heights High", "Supernatural", "Terriers", "The Adventures of Pete & Pete", 
             "The Adventures of Sherlock Holmes", "The Adventures of Tintin", 
             "The Andy Griffith Show", "The Angry Video Game Nerd", "The Avengers: Earth's Mightiest Heroes", 
             "The Big Bang Theory", "The Black Adder", "The Boondocks", "The Bridge", 
             "The Bugs Bunny Show", "The Colbert Report", "The Daily Show with Jon Stewart", "The Good Wife" ,
             "The Guild", "The Inbetweeners", "The IT Crowd", "The League", 
             "The Legend of Korra", "The Mighty Boosh", "The Muppet Show", 
             "The Newsroom", "The Office", "The Originals", "The Prisoner", 
             "The Shield", "The Simpsons", "The Sopranos", "The Thick of It", 
             "The Venture Bros.", "The Walking Dead", "The West Wing", "The Wire", 
             "The Wonder Years", "The X-Files", "Top Gear", "Trailer Park Boys", 
             "Trigun", "True Detective", "Twilight Zone", "Twin Peaks", "Undercover", 
             "Utopia", "Veronica Mars", "Vikings", "White Collar", "Whose Line Is It Anyway?", 
             "X-Men", "Young Justice")

shinyUI(fluidPage(
  tags$head(tags$script("(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
                  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
                  ga('create', 'UA-5650686-6', 'icm.edu.pl');
                  ga('send', 'pageview');"),
                tags$style(HTML("
                            .ggvis-output-container {
                            margin-left: auto ;
                            margin-right: auto ;
                            width: 500px;
                            }
                            .shiny-html-output {
                            margin-left: auto ;
                            margin-right: auto ;
                            width: 500px;
                            }
                            .selectize-control {
                            margin-left: auto ;
                            margin-right: auto ;
                            width: 500px;
                            }
                            .control-label {
                            margin-left: auto ;
                            margin-right: auto ;
                            width: 500px;
                            }
                            .shiny-input-container {
                            margin-left: auto ;
                            margin-right: auto ;
                            width: 500px!important;
                            }
                            "))),
  fluidRow(selectInput("serial", "Jak wygląda popularność ulubionego serialu?", 
                       choices = seriale, 
                       selected = "Friends")),
  fluidRow(ggvisOutput("serialPlot")),
  fluidRow(htmlOutput("opis"))
  )
)
