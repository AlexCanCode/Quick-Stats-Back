import time
import csv
import requests
from bs4 import BeautifulSoup
# For dealing with commented code
import re

# url = 'https://www.basketball-reference.com/contracts/'
# response = requests.get(url)
# html = response.content

# soup = BeautifulSoup(html, 'html.parser')
# table = soup.find('table', {'id': 'team_summary'})

# tbody = table.find('tbody')

# list_of_rows = []
# for row in tbody.findAll('tr'):
# 	list_of_cells = []
# 	for cell in row.findAll('td'):
# 		text = cell.text
# 		list_of_cells.append(text)
# 		print(text)
# 	list_of_rows.append(list_of_cells)

# clean_list_of_rows = filter(None, list_of_rows)

# outfile = open("../stats/teamSalary.csv", "w", newline='')
# writer = csv.writer(outfile)
# writer.writerow(["Rank", "2018-19", "2019-20", "2020-21", "2021-22", "2022-23", "2023-24"])

# writer.writerows(clean_list_of_rows)

# time.sleep(10);

# The standings table is commented out in the DOM before the actual HTML
# This is why it returns as None
# https://stackoverflow.com/questions/39602223/beautifulsoup-webscraper-issue-cant-find-certain-divs-tables

comm = re.compile("<!--|-->")
def make_soup(url):
	standResponse = requests.get(url)		
	standHtml = standResponse.content
	soupdata = BeautifulSoup(comm.sub("", standHtml.decode('utf-8'), 'html.parser'))
	return soupdata

def get_player_totals():
    soup = make_soup("https://www.basketball-reference.com/leagues/NBA_2019_standings.html")

    standTable = soup.find('table', {'id':'expanded_standings'})

    return standTable

x = get_player_totals()

print(x)

list_of_rows = []
for row in tbody.findAll('tr'):
	list_of_cells = []
	for cell in row.findAll('td'):
		text = cell.text
		list_of_cells.append(text)
		print(text)
	list_of_rows.append(list_of_cells)

clean_list_of_rows = filter(None, list_of_rows)






