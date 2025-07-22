import requests

query = {
  "query": """
    {
      __schema {
        types {
          name
        }
      }
    }
  """
}

res = requests.post("https://leetcode.com/graphql", json=query)
print(res.json())