<?php
    //Include page initiator
    include("corePage/initPage.php");

    //We check if it is a redirection
    if(isset($_SERVER["REDIRECT_URL"])){
        //We check if it is an asset request
        if(preg_match("<assets>", $_SERVER["REDIRECT_URL"])){
            //This is a 404 not found error...
            echo "<p>Error! 404 not found</p>";
            http_response_code(404);
            exit();
        }
    }
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

        <!-- Make the website responsive -->
        <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">

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

                //AppVersion
                appVersion: <?php echo config['appVersion']; ?>,

                //Assets URL
                assetsURL: "<?php echo config['pathAssets']; ?>",

                //Templates URL
                templatesURL : "<?php echo config['templatesURL']; ?>",

                //Site URL
                siteURL: "<?php echo config['siteURL']; ?>",

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