GeomChristmasTree <- ggproto("GeomChristmasTree", Geom,
                           required_aes = c("x", "y"),
                           default_aes = aes(shape = 19, 
                                             colour = "black", 
                                             fill = "green4", 
                                             size = 3,
                                             linetype = 1, alpha = 1,
                                             fontsize = 1),
                           draw_key = draw_key_polygon,
                           
                           draw_panel = function(data, panel_scales, coord) {
                             coords <- coord$transform(data, panel_scales)
                             
                             r01x <- diff(range(coords$x))/100
                             r01y <- diff(range(coords$y))/100
                             
                             # each tree is 4*branch + 4
                             if (length(coords$size) == 1) {
                               tsize <- rep(pmax(1, round(coords$size)), length(coords$x))
                               theight <- rep(pmax(0, round(coords$size)), length(coords$x))
                             } else {
                               tsize <- pmax(1, round(coords$size))
                               theight <- pmax(0, coords$size)
                             }
    
                             # coords
                             longx <- unlist(lapply(seq_along(coords$x), function(i) {
                               if (tsize[i] == 1) {
                                 dx <- -c(0.5, 0.5, 1.5, 0, -1.5, -0.5, -0.5)
                               } else {
                                 dx <- -c(0.5, 0.5, rep(c(1.5,0.5), tsize[i]-1), 1.5, 0, -1.5, rep(c(-0.5,-1.5), tsize[i]-1), -0.5, -0.5)
                               }
                               r01x*dx + coords$x[i]
                             }))
                             longy <- unlist(lapply(seq_along(coords$y), function(i) {
                               if (tsize[i] == 1) {
                                 dy <- c(-0.5, 0, 0, theight[i], 0, 0, -0.5)
                               } else {
                                 dy <- c(-0.5, 0, 0, rep(1:(tsize[i]-1), each=2), theight[i], rep((tsize[i]-1):1, each=2), 0, 0, -0.5)
                               }
                               r01y*dy + coords$y[i]
                             }))
                             longid <- unlist(sapply(seq_along(coords$y), function(i) {
                               rep(i, each=4*tsize[i]+3)
                             }))
                             
                             grid::polygonGrob(
                               longx, 
                               longy,
                               id = longid,
                               gp = grid::gpar(col = coords[,"colour"],
                                               fill = coords[,"fill"],
                                               fontsize = 10)
                             )
                           }
)

geom_christmas_tree <- function(mapping = NULL, data = NULL, stat = "identity",
                              position = "identity", na.rm = FALSE, show.legend = NA, 
                              inherit.aes = TRUE, ...) {
  layer(
    geom = GeomChristmasTree, mapping = mapping,  data = data, stat = stat, 
    position = position, show.legend = show.legend, inherit.aes = inherit.aes,
    params = list(na.rm = na.rm, ...)
  )
}

ggplot(mpg, aes(displ, hwy, fill=manufacturer)) + 
  geom_christmas_tree(size=2)

ggplot(iris, aes(x=Sepal.Length, y=Petal.Length, size=Petal.Length, fill=Species, color=Species)) + 
  geom_christmas_tree() + theme_void() + theme(legend.position="none")


ggplot(iris, aes(Sepal.Length, Petal.Length)) + 
  geom_christmas_tree(aes(fill=Species, size=Petal.Length))

ggplot(iris, aes(Sepal.Length, Petal.Length)) + 
  geom_christmas_tree(aes(fill=Species, size=Petal.Width)) + theme_void() + theme(legend.position="none")

ggplot(iris, aes(Sepal.Length, Petal.Length)) + 
  geom_christmas_tree(aes(size=Petal.Length))

ggplot(iris, aes(Sepal.Length, Petal.Length)) + 
  geom_christmas_tree(fill="green4")
