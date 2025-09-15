#!/usr/bin/env python3
"""
Test script to demonstrate the farming question filtering functionality
"""

import requests
import json
import time

# Test questions
farming_questions = [
    "What is the best time to plant tomatoes?",
    "How do I control pests in my corn crop?",
    "What fertilizer should I use for wheat?",
    "How much water does rice need during growing season?"
]

polite_farming_interactions = [
    "Hello!",
    "Good morning",
    "Thank you for your help",
    "Thanks a lot!",
    "Hi there, can you help me with farming?",
    "Good evening, I need farming advice",
    "Appreciate your assistance"
]

followup_requests = [
    "More",
    "Tell me more",
    "I need more info",
    "More details please",
    "Elaborate",
    "Can you explain more?",
    "What else?",
    "Continue",
    "More about this"
]

non_farming_questions = [
    "What is the capital of France?",
    "How do I learn Python programming?",
    "What's the weather like today?",
    "Can you help me with my math homework?",
    "Tell me about the latest movies",
    "How to fix my computer?"
]

def test_api_filtering():
    """Test the filtering via API endpoint"""
    print("🧪 Testing API Filtering")
    print("=" * 50)
    
    api_url = "http://localhost:5000/query"
    
    print("\n📋 Testing FARMING questions (should get answers):")
    for i, question in enumerate(farming_questions, 1):
        print(f"\n{i}. Question: {question}")
        try:
            response = requests.post(api_url, json={"query": question}, timeout=30)
            if response.status_code == 200:
                result = response.json()
                print(f"   ✅ Response: {result['answer'][:100]}...")
            else:
                print(f"   ❌ Error: {response.status_code}")
        except requests.exceptions.RequestException as e:
            print(f"   ❌ Connection error: {e}")
        time.sleep(1)
    
    print("\n📋 Testing POLITE/GREETING interactions (should be allowed):")
    for i, question in enumerate(polite_farming_interactions, 1):
        print(f"\n{i}. Question: {question}")
        try:
            response = requests.post(api_url, json={"query": question}, timeout=30)
            if response.status_code == 200:
                result = response.json()
                print(f"   ✅ Response: {result['answer'][:100]}...")
            else:
                print(f"   ❌ Error: {response.status_code}")
        except requests.exceptions.RequestException as e:
            print(f"   ❌ Connection error: {e}")
        time.sleep(1)
    
    print("\n📋 Testing FOLLOW-UP requests (should be allowed):")
    for i, question in enumerate(followup_requests, 1):
        print(f"\n{i}. Question: {question}")
        try:
            response = requests.post(api_url, json={"query": question}, timeout=30)
            if response.status_code == 200:
                result = response.json()
                print(f"   ✅ Response: {result['answer'][:100]}...")
            else:
                print(f"   ❌ Error: {response.status_code}")
        except requests.exceptions.RequestException as e:
            print(f"   ❌ Connection error: {e}")
        time.sleep(1)
    
    print("\n📋 Testing NON-FARMING questions (should be rejected):")
    for i, question in enumerate(non_farming_questions, 1):
        print(f"\n{i}. Question: {question}")
        try:
            response = requests.post(api_url, json={"query": question}, timeout=30)
            if response.status_code == 200:
                result = response.json()
                if "friendly farming assistant" in result['answer']:
                    print(f"   ✅ Correctly rejected: {result['answer'][:80]}...")
                else:
                    print(f"   ❌ Should have been rejected but got: {result['answer'][:100]}...")
            else:
                print(f"   ❌ Error: {response.status_code}")
        except requests.exceptions.RequestException as e:
            print(f"   ❌ Connection error: {e}")
        time.sleep(1)

def manual_test_instructions():
    """Provide manual testing instructions"""
    print("\n🔧 Manual Testing Instructions")
    print("=" * 50)
    print("\n1. Start the app by running: python app.py")
    print("2. Choose option 2 for Interactive mode")
    print("3. Try these test questions:")
    print("\n   FARMING QUESTIONS (should work):")
    for q in farming_questions:
        print(f"   - {q}")
    print("\n   POLITE/GREETING INTERACTIONS (should be allowed):")
    for q in polite_farming_interactions:
        print(f"   - {q}")
    print("\n   FOLLOW-UP REQUESTS (should be allowed):")
    for q in followup_requests:
        print(f"   - {q}")
    print("\n   NON-FARMING QUESTIONS (should be rejected):")
    for q in non_farming_questions:
        print(f"   - {q}")
    print("\n4. For API testing, choose option 1 and run this script again")

if __name__ == "__main__":
    print("🌾 RAG-Farmers Filtering Test")
    print("=" * 50)
    
    choice = input("\nChoose test mode:\n1. Test API (requires app running on localhost:5000)\n2. Show manual test instructions\nChoice (1/2): ")
    
    if choice == "1":
        test_api_filtering()
    else:
        manual_test_instructions()