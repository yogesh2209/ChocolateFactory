#!/usr/bin/perl  

use CGI;
use CGI::Cookie

$q = new CGI;

   
#send a blank cookie.  You must insert this into the header before
#printing anything.  Also, using the CGI module makes printing
#content-type: text/html redundant.



my $cookie = $q->cookie(-name=>'jadrn028',-path=>'/');
print $q->header(-cookie=>$cookie);

@fields = split(/\|\|/, $cookie);

$cookie = $q->cookie(-name=>'jadrn028',-value=>'',-path=>'/');
print $q->header(-cookie=>$cookie);



use DBI;


my $host = "opatija.sdsu.edu";
my $port = "3306";
my $database = "jadrn028";
my $username = "jadrn028";
my $password = "storm";
my $database_source = "dbi:mysql:$database:$host:$port";

my $dbh = DBI->connect($database_source, $username, $password) 
or die 'Cannot connect to db';

my $arrayCount = scalar @fields;

use Time::Piece;

my $date = localtime->strftime('%m/%d/%Y');

for( $row = 0; $row < $arrayCount; $row = $row + 1 ) {
   my $cookieString = $fields[$row]; # You could use $$var shorthand
   @cookieDetail = split(/\|/, $cookieString);
   my $sth = $dbh->prepare("INSERT into sales (date, sku, quantity) values ('$date','$cookieDetail[0]','$cookieDetail[1]')");
    $sth->execute();
}

$dbh->disconnect();


print <<END_CONTENT;
<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
        "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
 
<head>
	<title>Order Confirmation</title>
        	<meta http-equiv="content-type"
                		content="text/html;charset=utf-8" />
            	<meta http-equiv="Content-Style-Type" content="text/css" />
                <link rel='stylesheet' type='text/css' href='http://jadran.sdsu.edu/~jadrn028/proj4/mycss.css' />
</head>

<body>
<br />
    <div class='confirmation_div'>
            <h1>Your order has been confirmed!</h1>
END_CONTENT
my %cookies = $ENV{COOKIE};


print "<h1>Its on the way!</h1>";
print "<br />";
print "<h2>Shipping Information</h2>";
my $v = $q->cookie('jadrn028');
    
my ($key, $value);

foreach $key ($q->param) {
    print "<table id = 'confirmation_div_table'>";
    print "<tr>";
    if ($key eq 'fname_s') {
        print "<td>First Name</td>";
}
elsif ($key eq 'lname_s'){
 print "<td>Last Name</td>";
}
elsif ($key eq 'address1_s') {
 print "<td>Address 1</td>";
}
elsif ($key eq 'address2_s'){
 print "<td>Address 2 (if any)</td>";
}
elsif ($key eq 'city_s'){
 print "<td>City</td>";
}
elsif ($key eq 'state_s'){
 print "<td>State</td>";
}
elsif ($key eq 'zip_s'){
 print "<td>Zip</td>";
}
    
    foreach $value ($q->param($key)) {
 if ($key eq 'fname_s') {
         print "<td>$value</td>"; 
}
elsif ($key eq 'lname_s'){
  print "<td>$value</td>"; 
}
elsif ($key eq 'address1_s') {
  print "<td>$value</td>"; 
}
elsif ($key eq 'address2_s'){
  print "<td>$value</td>"; 
}
elsif ($key eq 'city_s'){
 print "<td>$value</td>"; 
}
elsif ($key eq 'state_s'){
 print "<td>$value</td>"; 
}
elsif ($key eq 'zip_s'){
  print "<td>$value</td>"; 
}
   
        }
    print "</tr>";
}
print "</table>";
print "</div>\n";
print "</body>\n";
print "</html>\n";
