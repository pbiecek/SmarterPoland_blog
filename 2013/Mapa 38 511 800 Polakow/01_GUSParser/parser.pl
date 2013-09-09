    #	!/usr/bin/perl -w

    ###########################################################################	 
    #	Skrypt parsujący dane z pliku XLS z wynikami spisu powszechnego
    #	do formatu CSV
    #
    #	Paweł Wiechucki 2013
    ###########################################################################
    
    use strict;
    use Spreadsheet::ParseExcel;
    use Encode;
    binmode STDOUT, ":utf8";
    
    sub trim($)
	{
  		my $string = shift;
  		$string =~ s/^\s+//;
  		$string =~ s/\s+$//;
  		return $string;
	}

    my $parser = Spreadsheet::ParseExcel->new();
    # wczytaj plik z danymi o ludności
    my $workbook = $parser->parse('dane/LU_NSP2011_ludnosc_w_gminach_stan_31032011.xls');

	# jeśli wystąpił błąd przy wczytywaniu pliku, zakończ i wyświetl informację o błędzie
    if ( !defined $workbook ) {
        die $parser->error(), ".\n";
    }

	my $result = "";

	# dodaj wiersz nagłówka
	$result .= "Wojewodztwo,Powiat,Gminy,Symbol terytorialny,Ogolem,Miasto,Wies\n";
	
    for my $worksheet ( $workbook->worksheets() ) {

        my ( $row_min, $row_max ) = $worksheet->row_range();
        my ( $col_min, $col_max ) = $worksheet->col_range();
		# pomiń arkusz z danymi zbiorczymi na poziomie województw	
		next if ($worksheet->get_name() eq "Polska");
		
		$row_min = 10;
		$col_max = 4;
		
		my $current_powiat = "";
		
        for my $row ( $row_min .. $row_max ) {
        	my $skip = 0;
        	my $current_row .= ""; 
        	for my $col ( $col_min .. $col_max ) {
            	my $cell = $worksheet->get_cell( $row, $col );
            	next unless $cell;
            	
            	my $val = trim($cell->value());
            	if($val eq "-"){
            		$val = "0";
            	}
            	
            	# zapisz informację o nazwie powiatu i pomiń rząd 
            	if($val =~ /Powiat/){
            		$current_powiat = $val;
            		$skip = 1;
            	} 
            	
            	$current_row .=  $val .",";	
            }
            next if ($current_row =~ /^$/ || $current_row =~ /^,*$/ || $skip);
            chop($current_row);
            
            # dodaj rekord odpowiadający sczytanemu rzędowi do wyniku
            $result .= "Wojewodztwo " .  $worksheet->get_name() . "," . $current_powiat . "," .$current_row . "\n";
        }
    } 
    
    # zapisz wynik do pliku
    open (MYFILE, '>result/data.csv');
    binmode MYFILE, ":utf8";
 	print MYFILE $result;
 	close (MYFILE); 
 	
 	