<?php
$url="https://www.myspass.de/myspass/includes/apps/video/getvideometadataxml.php?id=".$_POST["v"];

$data=file_get_contents($url);

$p = xml_parser_create();
xml_parse_into_struct($p, $data, $vals, $index);
xml_parser_free($p);
foreach ($vals as $key=>$val) {
    if (is_array($val)) {
        foreach ($val as $key2=>$val2) {
            $findMich   = '.mp4';
            
            $pos = strpos($val2, $findMich);
            if ($pos !== false) {
                echo $val2;
                return $val2;
            }
        }
    }
}
die("Fehler, PJAJA fragen!");

//$xml = new SimpleXMLElement($data);
//print_r($xml);