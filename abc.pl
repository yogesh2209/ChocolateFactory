#$sql = "SELECT * FROM galleries WHERE id IN ('$names')";
my $sth = $dbh->prepare("SELECT sku cost, retail FROM products where sku IN ($names) ");
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