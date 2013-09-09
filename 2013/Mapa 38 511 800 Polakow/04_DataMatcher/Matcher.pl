#!/usr/bin/perl -w

use strict;
use Spreadsheet::ParseExcel;
use Encode;
use Text::CSV;
binmode STDOUT, ":utf8";

sub pobierz_dane_gmin {
	my $areas    = {};
	my $data_csv = "data/nazwy_gmin_shp.csv";
	my $csv      = Text::CSV->new( { sep_char => ',' } );
	open( my $data, '<', $data_csv ) or die "Could not open '$data_csv' $!\n";
	binmode $data, ":utf8";
	my $header = <$data>;
	while ( my $line = <$data> ) {
		chomp $line;
		if ( $csv->parse($line) ) {
			my @fields = $csv->fields();
			$areas->{ $fields[0] } =
			  { nazwa => $fields[1], typ => $fields[2], gus => [] };
		}
		else {
			warn "Line could not be parsed: $line\n";
		}
	}
	return $areas;
}

sub pobierz_dane_gus {
	my $gus_data     = {};
	my $csv          = Text::CSV->new( { sep_char => ',' } );
	my $gus_data_csv = "data/data.csv";
	open( my $data, '<', $gus_data_csv )
	  or die "Could not open '$gus_data_csv' $!\n";
	binmode $data, ":utf8";
	my $header = <$data>;
	while ( my $line = <$data> ) {
		chomp $line;

		if ( $csv->parse($line) ) {

			my @fields = $csv->fields();
			$gus_data->{ $fields[0] . ":" . $fields[1] . ":" . $fields[2] } = {
				wojewodztwo => $fields[0],
				powiat      => $fields[1],
				gmina       => $fields[2],
				symbol      => $fields[3],
				ogolem      => $fields[4],
				miasto      => $fields[5],
				wies        => $fields[6]
			};
		}
		else {
			warn "Line could not be parsed: $line\n";
		}
	}
	return $gus_data;
}

sub uzupelnij_dane_gmin($) {
	my ($areas) = @_;
	my $woj_csv = "data/gmina_w_wojewodztwie.csv";
	my $csv = Text::CSV->new( { sep_char => ',' } );
	open( my $data, '<', $woj_csv ) or die "Could not open '$woj_csv' $!\n";
	binmode $data, ":utf8";
	my $header = <$data>;
	while ( my $line = <$data> ) {
		chomp $line;

		if ( $csv->parse($line) ) {

			my @fields = $csv->fields();
			$areas->{ $fields[0] }{"woj"} = $fields[1];
		}
		else {
			warn "Line could not be parsed: $line\n";
		}
	}
}

sub znajdz_pasujace_gminy($$) {
	my ( $areas, $gus_data ) = @_;
	foreach my $area_key ( keys $areas ) {
		my $nazwa        = $areas->{$area_key}{nazwa};
		my $nazwa_parsed = "";

		# pozbądź się prefiksów
		if ( $nazwa =~ m/(M\.\s)?(.+)/ ) {
			if ( $2 =~ m/(m\.\sSt\.\s)?(.+)/ ) {
				$nazwa_parsed = $2;
			}
		}

	  # znajdź wszystkie rekordy z gus, które pasują do danego rekordu z mapy
		foreach my $gus_key ( keys $gus_data ) {
			my $gmina       = $gus_data->{$gus_key}{gmina};
			my $wojewodztwo = $areas->{$area_key}{woj};
			if (   $gmina =~ m/(\.\s*$nazwa_parsed)$/
				&& $gus_key =~ m/\s$wojewodztwo/i )
			{
				push( $areas->{$area_key}{gus}, $gus_key );
			}
		}
	}
}

sub jest_watpliwy($$) {
	my ( $area_key, $areas ) = @_;
	my $wojewodztwo = $areas->{$area_key}{woj};
	my $nazwa       = $areas->{$area_key}{nazwa};
	my $typ         = $areas->{$area_key}{typ};
	foreach my $a_k ( keys $areas ) {
		if ( $a_k != $area_key ) {
			if (   $areas->{$a_k}{woj} eq $wojewodztwo
				&& $areas->{$a_k}{nazwa} eq $nazwa
				&& $areas->{$a_k}{typ}   eq $typ )
			{
				return 1;
			}
		}
	}
	return 0;
}

my $areas    = pobierz_dane_gmin();
my $gus_data = pobierz_dane_gus();

uzupelnij_dane_gmin($areas);
znajdz_pasujace_gminy( $areas, $gus_data );

#################################################################################

open( MYFILE, '>result/match.csv' );
binmode MYFILE, ":utf8";

open( UNMYFILE, '>result/unmatch.csv' );
binmode UNMYFILE, ":utf8";

foreach my $area_key ( sort { $a <=> $b } keys $areas ) {
	if ( scalar @{ $areas->{$area_key}{gus} } < 3 ) {
		if ( scalar @{ $areas->{$area_key}{gus} } == 1 ) {
			foreach ( @{ $areas->{$area_key}{gus} } ) {
				my $choice = "";
				if ( $areas->{$area_key}{typ} eq "-" ) {
					$choice = $gus_data->{$_}{ogolem};
				}
				elsif ( $areas->{$area_key}{typ} eq "miasto" ) {
					$choice = $gus_data->{$_}{miasto};
				}
				elsif ( $areas->{$area_key}{typ} eq "obszar wiejski" ) {
					$choice = $gus_data->{$_}{wies};
				}
				print MYFILE $area_key . "," . $choice . "\n";
			}
		}
		elsif ( scalar @{ $areas->{$area_key}{gus} } == 2 ) {
			my $choice = "";
			#pasują dwie wsie albo dwa miasta - nierozróżnialne
			if (
				(
					   $gus_data->{ $areas->{$area_key}{gus}[0] }{wies} eq "0"
					&& $gus_data->{ $areas->{$area_key}{gus}[1] }{wies} eq "0"
				)
				|| (   $gus_data->{ $areas->{$area_key}{gus}[0] }{miasto} eq "0"
					&& $gus_data->{ $areas->{$area_key}{gus}[1] }{miasto} eq
					"0" )
			  )

			{
				print UNMYFILE $area_key . ":"
				  . $areas->{$area_key}{nazwa} . " - "
				  . $areas->{$area_key}{woj} . " - "
				  . $areas->{$area_key}{typ} . "\n";
			}
			else {
				my $print_flag = 1;	
				foreach ( @{ $areas->{$area_key}{gus} } ) {
					$print_flag = 1;
					if ( $areas->{$area_key}{typ} eq "gm. miejska"
						&& ( $choice eq "" || $choice eq "0" ) )
					{
						$choice = $gus_data->{$_}{wies};
					}
					elsif ( $areas->{$area_key}{typ} eq "-"
						&& ( $choice eq "" || $choice eq "0" ) )
					{
						if ( jest_watpliwy( $area_key, $areas ) )
						{
							print UNMYFILE $area_key . ":"
							  . $areas->{$area_key}{nazwa} . " - "
							  . $areas->{$area_key}{woj} . " - "
							  . $areas->{$area_key}{typ} . "\n";
							$print_flag = 0;	
							last;
						}else{
							$choice = $gus_data->{$_}{miasto};
						}
					}
					elsif ( $areas->{$area_key}{typ} eq "miasto"
						&& ( $choice eq "" || $choice eq "0" ) )
					{
						$choice = $gus_data->{$_}{miasto};
					}
					elsif ( $areas->{$area_key}{typ} eq "obszar wiejski"
						&& ( $choice eq "" || $choice eq "0" ) )
					{
						$choice = $gus_data->{$_}{wies};
					}
				}
				if($print_flag){
					print MYFILE $area_key . "," . $choice . "\n";
				}
			}
		}
	}
	else {
		print UNMYFILE $area_key . ":"
		  . $areas->{$area_key}{nazwa} . " - "
		  . $areas->{$area_key}{woj} . " - "
		  . $areas->{$area_key}{typ} . "\n";
	}
}

close(MYFILE);
close(UNMYFILE);

