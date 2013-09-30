setwd("c:/_Przemek_/GitHub/SmarterPoland_blog/2013/Wizytowki Polskiej Nauki")

dane <- readLines("dane.txt", encoding="UTF-8")
dane <- substr(dane, 11, 1000)

daneMat <- t(sapply(strsplit(gsub(dane, pattern="^[^0-9]*", replacement=""), split=" "), as.numeric))
ocena <- sapply(strsplit(dane, split = " "), tail, 1)
nazwa <- gsub(dane, pattern="[0-9 \\.ABCD\\+\\-]*$", replacement="")
  
rownames(daneMat) = nazwa
colnames(daneMat) = c("ID", "Osiagniecia naukowe i twórcze", "Potencjal naukowy",
                      "Materialne efekty dzialalnosci naukowej",
                      "Pozostale efekty dzialalnosci naukowej",
                      "Ocena ostateczna",
                      "Kategoria")

#Kryterium I - Osiagniecia naukowe i twórcze
#Kryterium II - Potencjal naukowy
#Kryterium III - Materialne efekty dzialalnosci naukowej
#Kryterium IV - Pozostale efekty dzialalnosci naukowej
daneMat <- as.data.frame(daneMat)
daneMat[,7] <- factor(ocena, ordered=TRUE, levels=c("A+", "A", "B", "C"))

i1 <- 2 
i2 <- 5
qplot(daneMat[,i1], daneMat[,i2], data=daneMat, 
      col=Kategoria,
      shape=Kategoria, size=I(3)) + theme_bw() +
      xlab(colnames(daneMat)[i1]) + ylab(colnames(daneMat)[i2])


library(SVGAnnotation)
library(devtools)
install_github("EasySVGAnnotation", "kevinushey")
library(EasySVGAnnotation)



library(lattice)
kPlot <- xyplot( daneMat[,i1] ~ daneMat[,i2], groups=daneMat[,"Kategoria"], daneMat,
                 grid = T,
                 xlab = colnames(daneMat)[i1],
                 ylab = colnames(daneMat)[i2],
                 auto.key=TRUE
)

## Annotate the residual plot.
makeSVG( kPlot, "outlier.svg", width=6, height=6 )


doc <- svgPlot({
  plot(qplot(daneMat[,i1], daneMat[,i2], data=daneMat, 
             col=Kategoria,
             shape=Kategoria, size=I(3)) + theme_bw() +
         xlab(colnames(daneMat)[i1]) + ylab(colnames(daneMat)[i2])
  )
}, "foo.svg")
addToolTips(doc, rownames(daneMat), addArea = TRUE,
            style = "fill: white; stroke: red;")
saveXML(doc, "quakes_tips.svg")


qplot(daneMat[,5], daneMat[,2], data=daneMat, 
      col=Kategoria,
      shape=Kategoria, size=I(3)) + theme_bw()




library(party)
library(Cairo)
CairoSVG("party.svg",12,8)
plot(ctree(Kategoria~., data=daneMat[,c(2,3,4,5,7)],
     controls = ctree_control(minsplit = 100, maxdepth=3)))
dev.off()





























#' EasySVGAnnotation-ready Lattice Boxplot
#' 
#' This function generates a lattice boxplot with suitable defaults for the
#' SVG annotation package to parse symbols plotted correctly.
#' 
#' The key is ensuring the color for \code{plot.symbol} is different from
#' \code{box.rectangle}, \code{box.umbrella}, and \code{box.dot}.
#' 
#' @param ... the call normally supplied to \code{bwplot}
#' @seealso \code{\link{bwplot}}
#' @export
SVG.bwplot <- function( ... ) {
  bwplot( ...,
         par.settings = list(
           box.rectangle = list(col="black"),
           box.dot = list(col="black"),
           box.umbrella = list(col="black"),
           plot.symbol=list(col="grey1")
         ),
         fill="lavender"
  )
}

## Function to check whether the current lattice plot
## is / contains boxplots. Works for single and multi-panel
## boxplots.

#' Check if Current Plot Object is a Boxplot
#' 
#' This function checks whether the current lattice plot is, or contains,
#' boxplots. Works for single and multi-panel boxplots.
#' 
#' @param plot the \code{lattice} plot object.
workingWithBoxPlots <- function( plot ) {
  if( !is.function( plot$panel ) ) {
    if( plot$panel == "panel.bwplot" ) {
      return(TRUE)
    } else {
      return(FALSE)
    }
  } else {
    tmp <- capture.output( plot$panel )
    if( length( grep( "panel\\.bwplot", tmp ) ) > 0 ) {
      return(TRUE)
    } else {
      return(FALSE)
    }
  }
}

#' Rearrange Points within Panel
#' 
#' The x and y points within a panel are re-arranged so that their order matches
#' the order \code{makeSVG} actually plots the points.
#' 
#' @param plot the \code{lattice} plot object.
rearrangePanelXYPoints <- function( plot ) {
  
  for( i in 1:length(plot$panel.args) ) {
    
    tmp <- as.data.frame( plot$panel.args[[i]] )
    tmp <- arrange( tmp, x, -y )
    plot$panel.args[[i]] <- as.list(tmp)
    
  }
  
  return( plot )
  
}

#' Get Names from Data Frame for SVG Annotation
#' 
#' This function parses a data frame into a format suitable for annotation
#' of the generated SVG plot.
#' @param dat the data frame used in generating the lattice plot.
#' @param x the x variable
#' @param y the y variable
#' @param cols the columns to keep
#' @param round number of decimal points to keep on x and y
SVG.getNames <- function(dat, x=NULL, y=NULL, cols=NULL, round=3) {
  
  if( is.null(x) | is.null(y) ) {
    stop("You must specify 'x', 'y' in the method call.")
  }
  
  dat <- dat[ !is.na(dat[x]) & !is.na(dat[y]), ]
  
  if( !is.null(cols) ) {
    dat <- dat[,cols]
  }
  
  ## round off the double / decimals
  dat <- as.data.frame( lapply( dat, function(x) {
    if( is.numeric(x) ) {
      round(x, round)
    } else {
      x
    }
  }) )
  
  apply( dat, 1, function(x) {
    if( is.numeric(x) ) {
      x <- round(x, 2)
    }
    paste( names( dat ), x, sep = " = ", collapse = "|||" )
  } )
}

#' Get Point Colors from Lattice Object
#' 
#' Returns the colors used for points in a lattice plot object.
#' 
#' @param plot the lattice plot object.
getPointColorsFromLatticeObject <- function( plot ) {
  
  panel.cols <- NULL
  
  kPanelArgs <- paste( capture.output( plot$call$panel ), collapse = " " )
  kPanelArgs <- paste( kPanelArgs, collapse = " " )
  
  ## if kPanelArgs is NULL, try getting it directly from plot$panel
  if( kPanelArgs == "NULL" ) {
    kPanelArgs <- plot$panel
  }
  
  kPanelArgs <- gsub( " ", "", kPanelArgs )
  
  ## is this either an xyplot / dotplot, or are the panel.xyplot
  ## or panel.dotplot panels used?
  
  pattern <- "panel\\.xyplot|panel\\.dotplot"
  reg <- regexpr( pattern, kPanelArgs )
  
  if( reg > 0 ) {
    tmp <- regmatches( kPanelArgs, reg )
    
    ## ugly parsing
    
    panel.cols <- regmatches( tmp, regexpr( "col.*", tmp) )
    panel.cols <- gsub( "col=", "", panel.cols )
    panel.cols <- gsub( 'c\\("', "", panel.cols )
    panel.cols <- gsub( '"', "", panel.cols )
    panel.cols <- gsub( ")", "", panel.cols )
    panel.cols <- unlist( strsplit( panel.cols, "," ) )
    
    common.cols <- plot$panel.args.common$col
    if( length( common.cols ) > 0 ) {
      panel.cols <- c( panel.cols, common.cols )
    }
    
    ## if any of the panel.cols are integers, they will be called from the
    ## current lattice theme.
    
    for( i in seq_along(panel.cols) ) {
      if( is.integer( panel.cols[i] ) ) {
        panel.cols[i] <- trellis.par.get("superpose.symbol")$col[i]
      }
    }
  }
  
  ## what if we have boxplots?
  
  pattern <- "panel\\.bwplot"
  reg <- regexpr( pattern, kPanelArgs )
  
  if( reg > 0 ) {
    
    panel.cols <- plot$call$par.settings$plot.symbol$col
    
    if( is.null( panel.cols ) ) {
      panel.cols <- trellis.par.get()$dot.symbol$col
    }
    
  }
  
  if( !is.null( plot$par.settings$plot.symbol$col ) ) {
    panel.cols <- c( panel.cols, plot$par.settings$plot.symbol$col )
  } else {
    panel.cols <- c( panel.cols, trellis.par.get()$dot.symbol$col )
  }
  
  if( !is.null( plot$panel.args.common$groups ) & is.null( plot$panel.args.common$col ) ) {
    panel.cols <- c( panel.cols, 
                     trellis.par.get()$superpose.symbol$col[
                       1:length( unique( plot$panel.args.common$groups ) )
                       ] )
  }
  kCall <- capture.output( plot$call )
  
  if( is.null( panel.cols ) ) {
    stop("ERROR: Could not detect plot colors for annotation!")
  }
  
  panel.cols <- unique( panel.cols )
  
  return( panel.cols )
  
}

## Gets the colors used for points, then converts them to the same
## format as expected in SVG attributes. Ie, converts from the
## hex representation to a percentage-based XML attribute with
## structure 'stroke:rgb(<color>)'.

## Intended for lattice plots.

#' Get and Convert Lattice Plot colors to RGB
#' 
#' Gets the colors used for points in a lattice plot object, then
#' converts them to the same format as expected in SVG attributes.
#' @param plot the \code{lattice} plot object.
SVG.getLatticePointColors <- function(plot) {
  
  kCols <- getPointColorsFromLatticeObject( plot )
  kCols <- col2rgb( kCols ) / 255 * 100
  strList <- c()
  
  for( i in 1:ncol(kCols) ) {
    
    cCol <- kCols[,i]
    cCol <- round( cCol, 6 )
    
    outString <- "stroke:rgb("
    outString <- paste0( outString,
                         paste( cCol, collapse = "%," )
    )
    outString <- paste0( outString, "%);" )
    
    strList <- c( strList, outString )
    
  }
  
  strList  
  
}


## For some reason, after using the addPlotPoints function, SVG adds in
## an unwanted fill style. Go back and remove it, and reset the original
## fill style.

#' Remove Fill Style
#' 
#' For some reason, after using the \code{addPlotPoints} function, SVG adds
#' in an unwanted fill style. We remove it and reset the original fill style.
#' @param plot the lattice plot object.
#' @param allPoints the R object produced from an \code{addPlotPoints} call.
SVG.removeFillStyle <- function( plot, allPoints ) {
  
  counter <- 1
  theCols <- SVG.getLatticePointColors(plot)
  
  for( i in 1:length(allPoints) ) {
    cPanel <- allPoints[[i]]
    for( j in 1:length(cPanel) ) {
      cNode <- cPanel[[j]]
      cAttr <- xmlGetAttr( cNode, "style" )
      cAttr <- gsub( " ", "", cAttr )
      
      theAttrs <- unlist( strsplit( cAttr, ";" ) )
      
      ## Remove the fill attribute from the attrs
      theAttrs <- theAttrs[ !(theAttrs %in% grep("fill:", theAttrs, value=T)) ]
      theAttrs <- paste( theAttrs, collapse = ";" )
      
      ## Check the colors to determine whether or not
      ## the point retrieved by getPlotPoints is actually a
      ## point we wish to add a tool-tip to.
      
      isPoint <- rep(0, length(theCols) )
      for( k in 1:length( theCols ) ) {
        isPoint[k] <- length( grep( theCols[k], cAttr, fixed=T ) )
      }
      
      (isPoint <- any( isPoint > 0 ))
      
      if( isPoint ) {
        
        removeAttributes( cNode, "style" )
        addAttributes( cNode, 
                       style = theAttrs
        )
        
      } 
    }
  }
  
  invisible(counter)
  
}

## The new implementation of SVG::getPlotPoints, which uses the
## plot points collected by that SVG function, and filters it down
## to the 'true' plot points as based on the colors of points used.

## Function is intended to be used with lattice plots.

#' Get Plot Points
#' 
#' This function returns the 'true' plot points in an SVGAnnotation-generated
#' \code{doc}; ie, it discards any points that are eg. lines, smooths, and so
#' forth.
#' 
#' @param doc generated XML doc from \code{svgPlot}.
#' @param plot the \code{lattice} plot object.
#' @param allPoints output returned from a \code{getPlotPoints} call.
kGetPlotPoints <- function( doc, plot, allPoints ) {
  
  counter <- 1
  theCols <- SVG.getLatticePointColors( plot )
  
  out <- c()
  
  for( i in 1:length(allPoints) ) {
    cPanel <- allPoints[[i]]
    for( j in 1:length(cPanel) ) {
      cNode <- cPanel[[j]]
      cAttr <- xmlGetAttr( cNode, "style" )
      cAttr <- gsub( " ", "", cAttr )
      
      theAttrs <- unlist( strsplit( cAttr, ";" ) )
      
      ## Get the original fill
      origFill <- grep( "fill:", theAttrs, value=T )
      
      ## Check the colors to determine whether or not
      ## the point retrieved by getPlotPoints is actually a
      ## point we wish to add a tool-tip to.
      
      isPoint <- rep(0, length(theCols) )
      for( k in 1:length( theCols ) ) {
        isPoint[k] <- length( grep( theCols[k], cAttr, fixed=T ) ) +
          length( grep( gsub( "stroke", "fill", theCols[k] ), cAttr, fixed=T ) )
      }
      
      (isPoint <- any( isPoint > 0 ))
      
      if( isPoint ) {
        
        xmlAttrs( cNode ) <- c(
          id = paste0("true-plot-point-", counter),
          onmouseover=paste0("color_point(evt, ", counter, ", 'red')"),
          onmouseout=paste0("reset_color(evt, ", counter, ")" ),
          fill=gsub("fill:", "", origFill),
          originalFill=gsub("fill:", "", origFill)
        )
        
        out <- c(out, cNode)   
        counter <- counter + 1
        
      } 
    }
  }
  
  return( unlist( out ) )
  
}

#' Make an SVG with Tool-Tip Annotations
#' 
#' This function takes a lattice plot, plus the data frame it was generated
#' from, and generates a tool-tip annotated lattice plot.
#' @param plot the \code{lattice} plot object.
#' @param dat the \code{data.frame} used in generating the lattice plot.
#' @param outFile location to output the generated SVG file.
#' @param cols the columns to use when generating the annotated SVG.
#' @param width width, in inches, of the generated SVG plot.
#' @param height, in inches, of the generated SVG plot.
#' @export
makeSVG <- function( plot, dat, outFile = NULL, cols=NULL, width=4, height=4 ) {
  
  require(SVGAnnotation)
  require(plyr)
  
  ## Get the variables from the plot formula
  kVars <- all.vars( plot$formula )
  if( !is.na( kVars[3] ) ) {
    kPanelFactor <- kVars[3]
  }
  kGroupFactor <- kVars[2]
  kY <- kVars[1]  
  
  ## Get the groups argument, if it exists.
  getArgs <- function(plot) {
    tmp <- capture.output( plot$call )
    tmp <- gsub( " ", "", tmp )
    plotArgs <- unlist( strsplit( tmp, "," ) )
    plotArgs <- gsub( ")", "", plotArgs )
    return( plotArgs )
  }
  
  ## Rerrange the data frame so that the points plotted match up with
  ## the generated tooltips
  
  if( !is.na( kVars[3] ) ) {
    dat <- arrange( dat, get(kPanelFactor), get(kGroupFactor), -get(kY) )
  } else {
    dat <- arrange( dat, get(kGroupFactor), -get(kY) )
  }  
  
  if( length( grep("groups=", getArgs(plot)) ) > 0 ) {
    tmp <- grep( "groups=", getArgs(plot), value=T )
    tmp <- gsub("groups=", "", tmp )
    kGroupColorFactor <- tmp
    if( !is.na( kVars[3] ) ) {
      dat <- arrange(dat, get(kPanelFactor), get(kGroupColorFactor), get(kGroupFactor), -get(kY) )
    } else {
      dat <- arrange(dat, get(kGroupColorFactor), get(kGroupFactor), -get(kY) )
    }    
  }
  
  plot <- rearrangePanelXYPoints( plot )
  
  kTips <- SVG.getNames( dat, x = kGroupFactor, y = kY, cols=cols )
  
  doc <- svgPlot( plot, width=width, height=height, addInfo = FALSE )
  
  ## Set up number of panels
  nPanels <- 1
  
  if( class( plot ) == "trellis" ) {
    nPanels <- length( plot$panel.args )
  }
  
  ## The Javascript functions are added 'as-is', embedded in the document,
  ## in order to improve portability. Hence, any generated SVG can be
  ## included in an HTML document with <embed ... />, and we do not need to
  ## make sure the script files are hosted somewhere.
  
  addECMAScripts( doc, 
                  I("function color_point(evt, which, color) { path = document.getElementById(\"true-plot-point-\" + which); path.setAttribute(\"fill\", color); } function reset_color(evt, which) { path = document.getElementById(\"true-plot-point-\" + which); path.setAttribute(\"fill\", path.getAttribute(\"originalFill\")); }"),
                  insertJS = TRUE )
  
  addECMAScripts( doc, 
                  I("var MAX_TEXT_ELEMENTS = 20;\nvar SVGDocument = null;\nvar SVGRoot = null;\nvar SVGViewBox = null;\nvar toolTip = null;\nvar TrueCoords = null;\nvar tipBox = null;\nvar tipText = null;\nfor( j=1; j<=MAX_TEXT_ELEMENTS; j++ ) {\n    eval( 'var text' + j + ' = null;');\n}\nvar kWidth = null;\nvar kHeight = null;\nvar lastElement = null;\nfunction Init(evt)\n{\n    SVGDocument = evt.target.ownerDocument;\n    SVGRoot = SVGDocument.documentElement;\n    TrueCoords = SVGRoot.createSVGPoint();\n    toolTip = SVGDocument.getElementById('ToolTip');\n    tipBox = SVGDocument.getElementById('tipbox');\n    tipText = SVGDocument.getElementById('tipText');\n    \n    for( j=1; j<=MAX_TEXT_ELEMENTS; j++ ) {\n        eval( \"text\" + j + \" = SVGDocument.getElementById('text\" + j + \"');\" );\n    }\n    \n    SVGRoot.addEventListener('mousemove', ShowTooltip, false);\n    SVGRoot.addEventListener('mouseout', HideTooltip, false);\n    \n    toolTip.setAttributeNS(null, 'visibility', 'hidden');\n    \n    kWidth = SVGRoot.getAttribute('kWidth');\n    kHeight = SVGRoot.getAttribute('kHeight');\n};\nfunction GetTrueCoords(evt)\n{\n    var newScale = SVGRoot.currentScale;\n    var translation = SVGRoot.currentTranslate;\n    TrueCoords.x = (evt.clientX - translation.x)/newScale;\n    TrueCoords.y = (evt.clientY - translation.y)/newScale;\n};\nfunction HideTooltip( evt )\n{\n    toolTip.setAttributeNS(null, 'visibility', 'hidden');\n};\nfunction ShowTooltip( evt )\n{\n    GetTrueCoords( evt );\n    var tipScale = 1/SVGRoot.currentScale;\n    var textWidth = 0;\n    var tspanWidth = 0;\n    var boxHeight = 20;\n    tipBox.setAttributeNS(null, 'transform', 'scale(' + tipScale + ',' + tipScale + ')' );\n    tipText.setAttributeNS(null, 'transform', 'scale(' + tipScale + ',' + tipScale + ')' );\n    \n    var titleValue = '';\n    var descValue = '';\n    var targetElement = evt.target;\n    if ( lastElement != targetElement )\n    {\n        \n        var allText = targetElement.getElementsByTagName('desc').item(0);\n        var textValue = allText.firstChild.nodeValue;\n        textValue = textValue.split(\"|||\");\n                      \n        for( j=1; j<=MAX_TEXT_ELEMENTS; j++ ) {\n             eval( \"text\" + j + \".setAttributeNS(null, 'display', 'none' )\" );\n        }\n        \n        var testWidth = 0;\n        \n        for( i=0; i < textValue.length; i++ ) {\n            tt = eval( 'text' + (i + 1) );\n            tt.firstChild.nodeValue = textValue[i];\n            tt.setAttributeNS(null, 'display', 'inline');\n        }\n        \n        \n    }\n    var xPos = TrueCoords.x + (10 * tipScale);\n    var yPos = TrueCoords.y + (10 * tipScale);\n        \n        \n    if ( '' != textValue[0] & xPos < kWidth & yPos < kHeight )\n    {   \n        var outline = tipText.getBBox();\n        tipBox.setAttributeNS(null, 'width', Number(outline.width) + 10 );\n        tipBox.setAttributeNS(null, 'height', Number(outline.height) + 10 );\n        \n        if( xPos > kWidth/2 ) {\n            xPos = xPos - Number(outline.width) - 25;\n        }\n        \n        if( yPos > kHeight/2 ) {\n            yPos = yPos - Number(outline.height) - 30;\n        }\n        toolTip.setAttributeNS(null, 'transform', 'translate(' + xPos + ',' + yPos + ')');\n        toolTip.setAttributeNS(null, 'visibility', 'visible');\n    }\n};"),
                  insertJS = TRUE )
  
  ## Get the 'true' plot points
  allPoints <- getPlotPoints( doc, FALSE )
  kPoints <- kGetPlotPoints( doc, plot=plot, allPoints=allPoints )
  
  ## Find the outliers from the boxplot
  
  outlierPoints <- c()
  if( !is.na( kVars[3] ) ) {
    kpGroup <- paste( kPanelFactor, kGroupFactor, sep = " : " )
    dat[[ kpGroup ]] <- 
      paste( dat[[kPanelFactor]], dat[[kGroupFactor]] )
  } else {
    kpGroup <- kGroupFactor
  }
  
  if( workingWithBoxPlots( plot ) ) {
    kCoef <- plot$panel.args.common$coef
    if( is.null( plot$panel.args.common$coef ) ) {
      kCoef <- 1.5
    }
    
    kFiveNums <- vector("list", length( unique( dat[[kpGroup]] ) ) )
    names( kFiveNums ) <- unique( dat[[kpGroup]] )
    for( i in 1:length( unique( dat[[kpGroup]] ) ) ) {
      
      tmp <- dat[ dat[[kpGroup]] == unique( dat[[kpGroup]] )[i], ]
      kFiveNums[[i]] <- fivenum( tmp[[kY]] )
      
    }
    
    lower_limits <- lapply( kFiveNums, function(x) {
      iqr = x[4] - x[2]
      x[2] - kCoef * iqr        
    } )
    
    upper_limits <- lapply( kFiveNums, function(x) {
      iqr = x[4] - x[2]
      x[4] + kCoef * iqr
    })
    
    dat$isOutlier <- F
    
    for( i in 1:nrow(dat) ) {
      cGroup <- dat[i,kpGroup]
      if( dat[[kY]][i] < lower_limits[[cGroup]] | 
            dat[[kY]][i] > upper_limits[[cGroup]] ) {
        dat$isOutlier[i] <- T
      }
    }
    
    kTips <- kTips[ dat$isOutlier ]
    
  }
  
  if( length( kTips ) > 0 ) {
    
    addToolTips(doc, 
                text = kTips,
                paths = kPoints,
                addArea = TRUE,
                elName = "desc",
                addTitleAttribute = FALSE,
                addCSS = F
    )
    
  }
  
  ## Remove the unwanted fill style that has been added
  SVG.removeFillStyle( plot, allPoints )
  
  ## post-processing of the XML document
  
  dd <- xmlRoot( doc )
  removeAttributes( dd, "originalSource" )
  
  ## Remove the original height+width attributes, and reset them
  kWidth <- gsub( "[a-z]", "", xmlGetAttr( dd, "width" ) )
  kHeight <- gsub( "[a-z]", "", xmlGetAttr( dd, "height" ) )
  
  dd <- removeAttributes( dd )
  dd <- addAttributes( dd,
                       "onload" = "Init(evt)",
                       "kWidth" = kWidth,
                       "kHeight" = kHeight
  )
  
  ddd <- xmlRoot( dd, skip=FALSE )
  removeAttributes( ddd, "originalSource" )
  tmp <- capture.output( print( ddd ) )
  
  ## Remove </svg> (final line)
  tmp <- tmp[1:(length(tmp)-1)]
  
  theNode <- c("<g id='ToolTip' opacity='1' visibility='hidden' pointer-events='none'>
               <rect id='tipbox' x='0' y='5' width='88' height='20' rx='2' ry='2' fill='white' stroke='black'/>
               <text id='tipText' x='5' y='20' font-family='Arial' font-size='12'>
               <tspan id='text1' x='5' font-weight='bold'><![CDATA[]]></tspan>
               <tspan id='text2' x='5' dy='15' font-weight='bold'><![CDATA[]]></tspan>
               <tspan id='text3' x='5' dy='15' font-weight='bold'><![CDATA[]]></tspan>
               <tspan id='text4' x='5' dy='15' font-weight='bold'><![CDATA[]]></tspan>
               <tspan id='text5' x='5' dy='15' font-weight='bold'><![CDATA[]]></tspan>
               <tspan id='text6' x='5' dy='15' font-weight='bold'><![CDATA[]]></tspan>
               <tspan id='text7' x='5' dy='15' font-weight='bold'><![CDATA[]]></tspan>
               <tspan id='text8' x='5' dy='15' font-weight='bold'><![CDATA[]]></tspan>
               <tspan id='text9' x='5' dy='15' font-weight='bold'><![CDATA[]]></tspan>
               <tspan id='text10' x='5' dy='15' font-weight='bold'><![CDATA[]]></tspan>
               <tspan id='text11' x='5' dy='15' font-weight='bold'><![CDATA[]]></tspan>
               <tspan id='text12' x='5' dy='15' font-weight='bold'><![CDATA[]]></tspan>
               <tspan id='text13' x='5' dy='15' font-weight='bold'><![CDATA[]]></tspan>
               <tspan id='text14' x='5' dy='15' font-weight='bold'><![CDATA[]]></tspan>
               <tspan id='text15' x='5' dy='15' font-weight='bold'><![CDATA[]]></tspan>
               <tspan id='text16' x='5' dy='15' font-weight='bold'><![CDATA[]]></tspan>
               <tspan id='text17' x='5' dy='15' font-weight='bold'><![CDATA[]]></tspan>
               <tspan id='text18' x='5' dy='15' font-weight='bold'><![CDATA[]]></tspan>
               <tspan id='text19' x='5' dy='15' font-weight='bold'><![CDATA[]]></tspan>
               <tspan id='text20' x='5' dy='15' font-weight='bold'><![CDATA[]]></tspan>
               </text>
               </g>")
  
  theNode <- unlist( strsplit( theNode, "\n" ) )
  tmp <- c( tmp, theNode )
  tmp <- c( tmp, "</svg>" )
  
  if( !is.null( outFile ) ) {
    cat( tmp, file = outFile, sep="\n" )
  } else {
    cat( "<div>", tmp, "</div>", sep="\n" )
  }
  
}

## Debugging
# library( ggplot2 )
# 
# dat <- data.frame(
#   x=1:10,
#   y=rnorm(10),
#   g=as.factor(rep(1:2,each=5)),
#   gg=as.factor(rep(1:2,times=5))
#   )
# 
# plot <- ggplot( dat, aes(x=x, y=y) ) +
#   geom_point( colour="#010101" )
# dat <- dat

# makeSVG.ggplot <- function( 
#   plot, 
#   dat = plot$data, 
#   outFile = NULL, 
#   cols=NULL, 
#   width=4, 
#   height=4 
#   ) {
#   
#   ## Rearrange the data depending on the function call
#   ## plot$data <- arrange( plot$data, <figure this out later> )
#   SVG.getNames( dat, "x", "y" )
#   
#   ## Future - can we avoid using a temporary file?
#   kTempFile <- tempfile( fileext = ".svg" )
#   
#   svg( kTempFile, width=width, height=height )
#   print( plot )
#   dev.off()
#   
#   dd <- xmlParse( kTempFile )
#   ddd <- xmlRoot( dd )
#   
#   allPoints <- getPlotPoints( dd, FALSE )
#   kPoints <- gg_GetPlotPoints( dd, plot, allPoints )
#   
# }
#   
# setMethod( "makeSVG", "ggplot", makeSVG.ggplot )