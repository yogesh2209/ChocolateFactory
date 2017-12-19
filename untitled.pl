#!/usr/bin/perl 
#	Sample perl cgi script.  This script prints a list of the 
#	products in the opatija proj4.products table.
#       For use with AJAX
#	Code by Alan Riggins, Fall 2017
#
#	For use with ajax only
#
   
use DBI;


my $host = "opatija.sdsu.edu";
my $port = "3306";
my $database = "jadrn028";
my $username = "jadrn028";
my $password = "storm";
my $database_source = "dbi:mysql:$database:$host:$port";

	
my $dbh = DBI->connect($database_source, $username, $password) 
or die 'Cannot connect to db';

#my @temp = ('8I96H86E4','8Y39K86V4','9U39J36R3');


my $sth = $dbh->prepare("SELECT sku, SUM(quantity) as quantity FROM sales group by sku order by sku");
$sth->execute();

my @rows;
$str1 = "";
while(my @row=$sth->fetchrow_array()) {
    foreach $item (@row) { 
        $str1 .= $item."|";
        push @rows, $item;
        }       
    $str1 .= ";";    
    }

print "Content-type:  text/html\n\n";
$sth->finish();
$dbh->disconnect();

my @skuArray;
my @quantityArray;
for($i=0;$i<@rows;++$i) {
  if (my $result1 = $i % 2 eq '0') {
  	# print "Element at index $i is ",$rows[$i],"\n";
  	 push @skuArray, $rows[$i];
  }
else {
push @quantityArray, $rows[$i];
}
}



my $host = "opatija.sdsu.edu";
my $port = "3306";
my $database = "proj4";
my $username = "jadrn000";
my $password = "apple";
my $database_source = "dbi:mysql:$database:$host:$port";

	
my $dbh = DBI->connect($database_source, $username, $password) 
or die 'Cannot connect to db';

@finalskuArray = join(' , ', @skuArray);

print @finalskuArray;

#$_dblist = "testdb1 testdb2 testdb3";
@selected = split(' ', @skuArray);



my $sth = $dbh->prepare("SELECT sku, cost, retail FROM products where sku IN (".@selected.")");
$sth->execute();

$str = "";
while(my @row=$sth->fetchrow_array()) {
    foreach $item (@row) { 
        $str .= $item."|";
        }       
    $str .= ";";    
    }
 
print "Content-type:  text/html\n\n";
$sth->finish();
$dbh->disconnect();

    	
print $str;


