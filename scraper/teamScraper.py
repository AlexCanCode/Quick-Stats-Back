import time
import csv
import requests
from bs4 import BeautifulSoup

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

standUrl = 'https://www.basketball-reference.com/leagues/NBA_2019_standings.html'
standResponse = requests.get(standUrl)
standHtml = standResponse.content

standSoup = BeautifulSoup(standHtml, 'html.parser')
standTable = standSoup.find('table', {'id': 'expanded_standings'})

print(standTable)

tbody = standTable.find('tbody')

list_of_rows = []
for row in tbody.findAll('tr'):
	list_of_cells = []
	for cell in row.findAll('td'):
		text = cell.text
		list_of_cells.append(text)
		print(text)
	list_of_rows.append(list_of_cells)

clean_list_of_rows = filter(None, list_of_rows)






