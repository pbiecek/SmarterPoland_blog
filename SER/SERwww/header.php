<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" <?php language_attributes(); ?>>
<head profile="http://gmpg.org/xfn/11">
<meta http-equiv="Content-Type" content="<?php bloginfo('html_type'); ?>; charset=<?php bloginfo('charset'); ?>" />
<title><?php wp_title(); ?> <?php bloginfo('name'); ?></title>
<meta name="generator" content="WordPress.com" /> 
<link rel="stylesheet" href="<?php bloginfo('stylesheet_url'); ?>" type="text/css" media="screen" />
<link rel="alternate" type="application/rss+xml" title="<?php bloginfo('name'); ?> RSS Feed" href="<?php bloginfo('rss2_url'); ?>" />
<link rel="pingback" href="<?php bloginfo('pingback_url'); ?>" />
<link rel="shortcut icon" href="<?php bloginfo('template_url'); ?>/favicon.ico" type="image/x-icon" />
<?php if ( is_singular() ) wp_enqueue_script( 'comment-reply' ); wp_head(); ?>
<script type="text/javascript">
  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-5650686-5']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();
</script>
</head>
<body>
<div id="fb-root"></div>
<script>(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/pl_PL/all.js#xfbml=1&appId=353845091367641";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>
<div id="top"></div>

<!-- Start BG -->
<div id="bg">

<!-- Start Header -->
<div id="header">

<!-- Start Head -->
<div class="head">

<div class="logo">
<div class="img">
 <a href="<?php echo get_option('home'); ?>/"><img src="<?php bloginfo('template_url'); ?>/logo.png" alt="Smarter Poland - dane i analizy opisuj�ce Polsk�" /></a>
</div>
 <?php
	if ( get_option('evidens_header') == 'logo' ) 
	{ include (TEMPLATEPATH . "/logo-img.php");	
	 include (TEMPLATEPATH . "/logo-txt.php"); }
  ?>
</div>
 <div class="search"><br>
  <form method="get" action="<?php bloginfo('url'); ?>/">
   <fieldset>
   <input type="text" value="<?php the_search_query(); ?>" name="s" />
   <input type="submit" id="searchsubmit" value="Szukaj" />
   <!--<button type="submit">Search</button>-->
   </fieldset>
  </form>
 </div> 
</div>
<!-- End Head -->

<!-- Start Menu -->
<div class="menu">
 <div class="pages">
   <ul>
   <li><a href="http://smarterpoland.pl/SER/"><span>SER</span></a></li><li><a href="http://glimmer.rstudio.com/sondaze/demo1/"><span>Sondaże</span></a></li>
<?php $pages = wp_list_pages('sort_column=menu_order&title_li=&echo=0');
$pages = preg_replace('%<a ([^>]+)>%U','<a $1><span>', $pages);
$pages = str_replace('</a>','</span></a>', $pages);
echo $pages; ?>
   <li><a href="http://www.facebook.com/SmarterPoland"><span>Facebook</span></a></li>
  </ul>
<? unset($pages); ?> 
 </div>
 
<div class="feed" align="right">
 <ul>
  <li class="rss"><a href="<?php bloginfo('rss2_url'); ?>">Wpisy</a>&nbsp; / &nbsp;<a href="<?php bloginfo('comments_rss2_url'); ?>">Komentarze</a></li>
 </ul>
 </div>
</div> 
<!-- End Menu -->

</div>
<!-- End Header -->


<div class="border"></div>

<!-- Start Container-->
<div id="container">

<!-- Start Sidebar -->
<?php if(!is_attachment()) get_sidebar(); ?>
<!-- End Sidebar -->


<!-- Start Center -->
<div id="center<?php if(is_attachment()) echo ' center-attachment'; ?>"><div id="center-wap">