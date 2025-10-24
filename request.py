import requests
import json

# 1) Test etmek istediğin URL'i seç:
url = "http://192.168.1.41:8000/predict"

payload = [
    {
        "year": 2024,
        "month": 12,
        "carrier": "MQ",
        "carrier_name": "Envoy Air",
        "airport": "EWR",
        "airport_name": "Newark, NJ: Newark Liberty International",
        "arr_flights": 107.0,
        "arr_del15": 42.0,
        "carrier_ct": 6.01,
        "weather_ct": 5.89,
        "nas_ct": 25.16,
        "security_ct": 0.0,
        "late_aircraft_ct": 4.94,
        "arr_cancelled": 0.0,
        "arr_diverted": 0.0,
        "arr_delay": 2531.0,
        "carrier_delay": 335.0,
        "weather_delay": 491.0,
        "nas_delay": 1251.0,
        "security_delay": 0.0,
        "late_aircraft_delay": 454.0
    }
]

resp = requests.post(url, json=payload)

print(f"→ Status: {resp.status_code} {resp.reason}")
print("→ Response headers:", resp.headers)
print("→ Raw body:")
print(resp.text or "<empty>")

# JSON parse etmeye çalışalım
try:
    data = resp.json()
    print("→ Parsed JSON:", json.dumps(data, indent=2))
except ValueError as e:
    print("‼ JSONDecodeError:", e)