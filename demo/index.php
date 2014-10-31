<!DOCTYPE html>
<html lang="en">
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta charset="UTF-8">

    <title>LightShow</title>

    <link href='http://fonts.googleapis.com/css?family=Open+Sans:400,700&amp;subset=latin,latin-ext' rel='stylesheet' type='text/css'>

    <link rel="stylesheet" href="css/reset.css">
    <link rel="stylesheet" href="css/styly.css">

    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>

    <script src="../source/jquery.lightshow.js"></script>
    <link rel="stylesheet" href="../source/jquery.lightshow.css">

    <script src="js/scripts.js"></script>

  </head>
  <body>
    
      <div class="comics">
        <ul>
          <?php
            $i = 1; 
            while(file_exists("images/".($i).".jpg"))
            {
              echo "<li data-title=\"Example title $i\">
                      <img src=\"images/$i.jpg\" alt=\"\">
                    </li>";
              $i++;
            }
          ?>
        </ul>
      </div>

  </body>
</html>