import requests
from bs4 import BeautifulSoup

# Define the starting URL
start_url = 'https://cil.academy/'
visited_links = set()  # To keep track of visited links

# Function to fetch and parse a webpage
def fetch_and_parse(url):
    try:
        response = requests.get(url)
        if response.status_code == 200:
            soup = BeautifulSoup(response.text, 'html.parser')
            return soup
        else:
            print(f"Failed to fetch URL: {url}")
            return None
    except Exception as e:
        print(f"An error occurred: {e}")
        return None

# Function to extract links from a webpage
def extract_links(soup, base_url):
    links = set()
    for link in soup.find_all('a', href=True):
        href = link['href']
        if href.startswith('http') or href.startswith('www'):
            links.add(href)
        else:
            links.add(base_url + href)
    return links

# Crawl the web
def web_crawler(start_url, max_depth):
    to_crawl = [(start_url, 0)]

    while to_crawl:
        url, depth = to_crawl.pop(0)
        if depth <= max_depth and url not in visited_links:
            print(f"Crawling {url}")
            visited_links.add(url)

            soup = fetch_and_parse(url)
            if soup:
                links = extract_links(soup, start_url)

                # Process the links, e.g., save to a database, etc.

                # Add new links to the to_crawl list
                for link in links:
                    to_crawl.append((link, depth + 1))

# Start the web crawler with a maximum depth of 2
web_crawler(start_url, max_depth=2)