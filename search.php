<!DOCTYPE html>
<html lang="en">
<head>
    <title>Search Results</title>
    <meta charset="utf-8">
    <meta name="format-detection" content="telephone=no"/>
    <link rel="icon" href="images/favicon.ico" type="image/x-icon">
    <link rel="stylesheet" href="css/grid.css">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/search.css"/>
    <link rel="stylesheet" href="css/subscribe.css"/>

    <script src="js/jquery.js"></script>
    <script src="js/jquery-migrate-1.2.1.js"></script>

    <!--[if lt IE 9]>
    <html class="lt-ie9">
    <div style=' clear: both; text-align:center; position: relative;'>
        <a href="http://windows.microsoft.com/en-US/internet-explorer/..">
            <img src="images/ie8-panel/warning_bar_0000_us.jpg" border="0" height="42" width="820"
                 alt="You are using an outdated browser. For a faster, safer browsing experience, upgrade for free today."/>
        </a>
    </div>
    <script src="js/html5shiv.js"></script>    
  	<script src='js/selectivizr-min.js'></script>
    <![endif]-->

    <script src='js/device.min.js'></script>
</head>

<body>
<div class="page">
    <!--========================================================
                              HEADER
    =========================================================-->
    <header class="subpage">
        <div id="stuck_container" class="stuck_container">
            <div class="container">
                <div class="brand">
                <h1 class="brand_name"><a href="index.html"><img src="images/LOGO-CE.png" alt=""/></a> </h1>
                </div>
                
                <?php include("includes/nav.html"); ?>

                <a class="search-form_toggle" href="#"></a>

                <form class="search-form" action="search.php" method="GET" accept-charset="utf-8">
                    <label class="search-form_label">
                        <input class="search-form_input" type="text" name="s" autocomplete="off"
                               placeholder="Search.."/>
                        <span class="search-form_liveout"></span>
                    </label>
                    <button class="search-form_submit fa-search" type="submit"></button>
                </form>

            </div>
        </div>
    </header>

    <!--========================================================
                              CONTENT
    =========================================================-->
    <main>
        <section id="content" class="content">
            <div class="container ">
                <h4>Search Results</h4>
                <div id="search-results"></div>
            </div>
        </section>
    </main>
    <!--========================================================
                              FOOTER
    =========================================================-->
    <?php include("includes/footer.html"); ?>
</div>

<script src="js/script.js"></script>
<?php include("includes/body-scripts.html"); ?>
</body>
</html>