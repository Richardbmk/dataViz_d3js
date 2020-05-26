import requests
from bs4 import BeautifulSoup as beauty

response = requests.get('https://datosmacro.expansion.com/deuda')
html = response.text
soup = beauty(html, 'html.parser')

table_debt = soup.select('.table-responsive')
table_debt = table_debt[0].find_all('tr')

from csv import writer

with open("table_debt.csv", "w") as file:
    csv_writer = writer(file, lineterminator ="\n")
    csv_writer.writerow(["Country","year", "Debt"])
    for tr in table_debt[1:]:
        tds = tr.find_all('td')
        pais = tds[0].text[:-4]
        year = tds[1].text
        deuda = tds[2].text.replace('.', '')
        csv_writer.writerow([pais,year,deuda])