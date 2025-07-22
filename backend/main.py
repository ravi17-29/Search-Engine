# # Import required packages
# from selenium import webdriver
# from selenium.webdriver.common.by import By
# from selenium.webdriver.chrome.service import Service
# from selenium.webdriver.support.ui import WebDriverWait
# from selenium.webdriver.support import expected_conditions as EC
# # from webdriver_manager.chrome import ChromeDriverManager
# import time
# from bs4 import BeautifulSoup
# from webdriver_manager.chrome import ChromeDriverManager
#
# # Define the chromedriver service
# # s = Service('chromedriver.exe')
#
# # Instantiate the webdriver
# # driver = webdriver.Chrome(service=s)
# driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
#
#
# # The base URL for the pages to scrape
# # page_URL = "https://leetcode.com/problemset/all/?page="
# page_URL = "https://leetcode.com/problemset/"
#
# # Function to get all the 'a' tags from a given URL
#
#
# def get_a_tags(url):
#     # Load the URL in the browser
#     driver.get(url)
#     # Wait for 7 seconds to ensure the page is fully loaded
#     time.sleep(7)
#     # Find all the 'a' elements on the page
#     links = driver.find_elements(By.TAG_NAME, "a")
#     ans = []
#     # Iterate over each 'a' element
#     for i in links:
#         try:
#             # Check if '/problems/' is in the href of the 'a' element
#             if "/problems/" in i.get_attribute("href"):
#                 # If it is, append it to the list of links
#                 ans.append(i.get_attribute("href"))
#         except:
#             pass
#     # Remove duplicate links using set
#     ans = list(set(ans))
#     return ans
#
#
# # List to store the final list of links
# my_ans = []
# # Loop through the pages you're interested in (in this case, pages 1-54)
# # for i in range(1, 55):
# #     # Call the function to get the 'a' tags from each page and append the results to your list
# #     my_ans += (get_a_tags(page_URL))
# my_ans += (get_a_tags(page_URL))
#
# # Remove any duplicates that might have been introduced in the process
# my_ans = list(set(my_ans))
#
# # Open a file to write the results to
# with open('lcd.txt', 'a') as f:
#     # Iterate over each link in your final list
#     for j in my_ans:
#         # Write each link to the file, followed by a newline
#         f.write(j+'\n')
#
# # Print the total number of unique links found
# print(len(my_ans))
#
# # Close the browser
# driver.quit()
# # //C:\Users\91878\PycharmProjects\pythonProject\helloWorld\main.py


import requests, json, time
import os
all_qs = []
step = 500

for skip in range(0, 2500, step):
    payload = {
      "operationName": "problemsetQuestionList",
      "variables": {"categorySlug": "", "skip": skip, "limit": step, "filters": {}},
      "query": """
      query problemsetQuestionList($categorySlug: String, $limit: Int, $skip: Int, $filters: QuestionListFilterInput) {
        problemsetQuestionList: questionList(
          categorySlug: $categorySlug
          limit: $limit
          skip: $skip
          filters: $filters
        ) {
          total: totalNum
          questions: data {
            title
            titleSlug
            difficulty
            isPaidOnly
            topicTags {
              name
              slug
            }
          }
        }
      }
      """
    }

    r = requests.post("https://leetcode.com/graphql", json=payload,
                      headers={'Content-Type':'application/json',
                               'Referer':'https://leetcode.com/problemset/all/',
                               'User-Agent':'Mozilla/5.0'})
    data = r.json()
    node = data["data"]["problemsetQuestionList"]
    qs = node["questions"]
    if not qs:
        break

    all_qs.extend(qs)
    print(f" Total questions fetched so far: {len(all_qs)}")
    time.sleep(1)

QDATA_FOLDER = "Qdata"

for x in all_qs:
    tail = x["titleSlug"]
    #same as problems_explore.py i am doing in this only it is fater
    #problems_explore.py is scrapping method

    title = x["title"]
    index_file_path = os.path.join(QDATA_FOLDER, "index.txt")
    with open(index_file_path, 'a') as f:
        # j = "https://leetcode.com/problems/"
        f.write(title+'\n')

    index_file_path_i = os.path.join(QDATA_FOLDER, "Qindex.txt")
    with open(index_file_path_i, 'a') as f:
        j = "https://leetcode.com/problems/"
        # f.write(j + tail + '\n')
        f.write(j + tail + '\n')
        # with open(index_file_path, "a", encoding="utf-8", errors="ignore") as Qindex_file:

    #till here
    with open('lx_problems.txt', 'a') as f:
        j = "https://leetcode.com/problems/"
        f.write(j+tail+'\n')


# Save results
# with open("leetcode_all_questions.json","w") as f:
#     json.dump(all_qs, f, indent=2)

print(f" Done. Fetched {len(all_qs)} questions.")


cd ..
