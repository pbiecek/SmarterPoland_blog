from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException
import time
import sys



driver = webdriver.Firefox()
driver.get("http://edzienniki.duw.pl/duw/ActByMonthYear.aspx?year=2014")
driver.implicitly_wait(10)
f = open("lista2014.csv","w")
while(True):
	
	current_page = driver.find_element_by_xpath('//td[contains(@class,"dxpCurrentPageNumber_Office2003Silver")]').get_attribute("innerHTML")
	print current_page
				
				
	table = driver.find_element_by_xpath('//table[@id="ctl00_Content_gridLegalActs_DXMainTable"]')
	rows = table.find_elements_by_xpath('.//tr[@class="dxgvDataRow_Office2003Silver"]')
	
	items = []

	
	
	for row in rows:
		print "*"
		print row.get_attribute("id")
		print row.get_attribute("class")
			
		
		data_cells = row.find_elements_by_xpath('.//td')
		item = {}
		for n,cell in enumerate(data_cells):
			if n==0:
				item['pozycja'] = cell.get_attribute("innerHTML")
			elif n==1:
				#TODO - delete newlines!
				item['tytul'] =  cell.find_element_by_xpath(".//a").get_attribute("innerHTML").replace("\n", "")
			elif n==2:
				#nie takie oczywiste
				#item['pdf'] = "http://edzienniki.duw.pl/duw/"+\
				#	cell.find_element_by_xpath(".//a").get_attribute("href")
				item['pdf'] = cell.find_element_by_xpath(".//a").get_attribute("href")
			elif n==3:
				item['miesiac'] = cell.get_attribute("innerHTML")
			elif n==4:
				item['rok'] = cell.get_attribute("innerHTML")
			elif n==5:
				item['data_ogloszenia'] = ' '.join( cell.get_attribute("innerHTML").split() )
			elif n==6:
				item['data_aktu'] = ' '.join( cell.get_attribute("innerHTML").split() ) 
		print item
		f.write(u"{0}\t{1}\t{2}\t{3}\t{4}\t{6}\n".format(
			item['pozycja'],item['tytul'],item['pdf'],
			item['miesiac'],item['rok'],item['data_ogloszenia'],
			item['data_aktu']).encode("utf-8"))
		print "*\n"
	
	#bit ugly way
	try:
		td_next = driver.find_element_by_xpath('//img[@class="dxWeb_pNext_Office2003Silver"]/..')
	except NoSuchElementException:    
		break
	td_next.click()
	
	time.sleep(5)

time.sleep(10)
driver.close()
f.close()