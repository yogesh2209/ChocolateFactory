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

my $sth = $dbh->prepare("SELECT sku, SUM(quantity) as quantity FROM sales group by sku");
$sth->execute();

my @rows;
while(my @row=$sth->fetchrow_array()) {
    foreach $item (@row) { 
        push @rows, $item;
        }         
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

$temp = "(";
for($i=0;$i<@skuArray;++$i) {
  	
  	if ($i + 1 ==  scalar(@skuArray)){
$temp .= "sku = "."'".$skuArray[$i]."'".")";
  	}
  else{
  	$temp .= "sku = "."'".$skuArray[$i]."'"." "."OR"." ";
  }

}

my $sth = $dbh->prepare("SELECT sku, cost, retail FROM products where $temp order by sku ");
$sth->execute();

$str = "";
while(my @row=$sth->fetchrow_array()) {
    foreach $item (@row) { 
        $str .= $item."|";
        }       
    $str .= ";";    
    }
 
$sth->finish();
$dbh->disconnect();

my @productsArray = split(';',$str);

    	
print <<END_CONTENT;
<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
        "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
 
<head>
	<title>Report</title>
        	<meta http-equiv="content-type"
                		content="text/html;charset=utf-8" />
            	<meta http-equiv="Content-Style-Type" content="text/css" />
                <link rel='stylesheet' type='text/css' href='http://jadran.sdsu.edu/~jadrn028/proj4/mycss.css' />
</head>

<body>
<br />
    <div class="confirmation_sales">
            <h1>Sales Report!</h1>
END_CONTENT

	print "<div>\n";
    print "<table id='sales_table'>";
    print "<tr>";
    print "<th>SKU</th>";
    print "<th>Quantity</th>";
    print "<th>Cost Price per qty</th>";
    print "<th>Retail price per qty</th>";
    print "<th>Total Cost</th>";
    print "<th>Total Retail</th>";
    print "<th>Profit per qty</th>";
    print "<th>Total Profit</th>";
	print "</tr>";

	$totalSaleCostPrice = 0;
	$totalProfitPrice = 0;
 	for($i=0;$i<@skuArray;++$i) {
  		print "<tr>";
  		print "<td>@skuArray[$i]</td>";
  		print "<td>@quantityArray[$i]</td>";
		my @tempArray = split(/\|/, @productsArray[$i]);
		print "<td>@tempArray[1]</td>";
		print "<td>@tempArray[2]</td>";
		$totalCost = @tempArray[1]*@quantityArray[$i];
		print "<td>$totalCost</td>";
		$totalRetail = @tempArray[2]*@quantityArray[$i];
		print "<td>$totalRetail</td>";
		$totalSaleCostPrice += $totalRetail;
		$profitPerQty = @tempArray[2]-@tempArray[1];
		print "<td>$profitPerQty</td>";
		$profitTotal = (@tempArray[2]-@tempArray[1])*@quantityArray[$i];
		print "<td>$profitTotal</td>";
		$totalProfitPrice += $profitTotal;
		print "</tr>";

}

	print "</table>";
	print "<br />";
	print "</div>\n";
	print "<div>\n";
	print "<br>";
	print "<table id = 'profit_sales_table'>";
	print "<tr>";
	print "<td class='sale_tag'>Net Sale (USD)</td>";
	print "<td class='price_tag'>$totalSaleCostPrice</td>";
	print "</tr>";
	print "<tr>";
	print "<td class='sale_tag'>Net Profit (USD)</td>";
	print "<td class='price_tag'>$totalProfitPrice</td>";
	print "</tr>";
	print "</table>";
 	print "</div>\n";

print "</body>\n";
print "</html>\n";


