<?php
    //Include page initiator
    include("corePage/initPage.php");
?>
<!--
    Comunic web app client
    Main HTML file

    (c) Pierre HUBERT 2017
-->
<!DOCTYPE html>
<html>
    <head>
        <!-- Page title, should be automaticaly modified next -->
        <title>Comunic</title>

        <!--Stylesheet requirements -->
        <?php
            foreach($config['CSSfiles'] as $file){
                //Include CSS file
                $file = str_replace("%PATH_ASSETS%", $config['pathAssets'], $file);
                echo CSSFileInclusionCode($file);
            }
        ?>

        <!-- Javascript config -->
        <script>
            //Configuration definition
            var ComunicConfig = {
                //Production mode
                productionMode: <?php echo config['productionMode']; ?>,

                //apiURL
                apiURL: "<?php echo config['API_URL']; ?>",

                //Default language
                defaultLanguage: "en",

                //LanguagesPath
                languagesPath: "<?php echo str_replace("%PATH_ASSETS%", config['pathAssets'], config['languagesPath']); ?>",
            };
        </script>
        
    </head>
    <body>
        <!-- No javascript message, will be removed soon... -->
        <p>Please consider using a modern browser which support Javascript to be able to use this website. We recomend you to download & install Mozilla Firefox...</p>
    
        <!-- Javascript files inclusion -->
        <?php
            foreach($config['JSfiles'] as $file){
                //Include JS file
                $file = str_replace("%PATH_ASSETS%", $config['pathAssets'], $file);
                echo javascriptFileInclusionCode($file);
            }
        ?>

    </body>
</html>