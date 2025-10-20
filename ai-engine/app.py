import os
import sys
import logging
from dotenv import load_dotenv
from flask import Flask, request, jsonify

# LangChain / Groq imports
from langchain_community.document_loaders import TextLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
try:
    from langchain_chroma import Chroma
except ImportError:
    print("Warning: langchain-chroma not installed. Falling back to langchain_community.vectorstores.Chroma")
    from langchain_community.vectorstores import Chroma
from langchain_huggingface import HuggingFaceEmbeddings
from langchain.chains import RetrievalQA
from langchain_groq import ChatGroq

# -------------------
# 0️⃣ Setup logging
# -------------------
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('farming_assistant.log', encoding='utf-8'),
        logging.StreamHandler(sys.stdout)
    ]
)
logger = logging.getLogger(__name__)

# Set console handler encoding for Windows compatibility
for handler in logger.handlers:
    if isinstance(handler, logging.StreamHandler) and handler.stream == sys.stdout:
        if hasattr(handler.stream, 'reconfigure'):
            try:
                handler.stream.reconfigure(encoding='utf-8')
            except:
                pass

# -------------------
# 1️⃣ Load environment variables and validate
# -------------------
def validate_environment():
    """Validate all required environment variables and dependencies"""
    try:
        load_dotenv()
        logger.info("Loading environment variables...")
        
        GROQ_API_KEY = os.getenv("GROQ_API_KEY")
        if not GROQ_API_KEY:
            logger.error("GROQ_API_KEY not found in environment variables")
            print("Error: GROQ_API_KEY not set in your .env file")
            print("Please create a .env file with your Groq API key:")
            print("GROQ_API_KEY=your_api_key_here")
            sys.exit(1)
        
        logger.info("Environment variables validated successfully")
        return GROQ_API_KEY
    except Exception as e:
        logger.error(f"Environment validation failed: {e}")
        print(f"❌ Environment setup error: {e}")
        sys.exit(1)

GROQ_API_KEY = validate_environment()

# -------------------
# 2️⃣ Paths & configs
# -------------------
DATA_FILE = "crop_guide.txt"
PERSIST_DIR = "Chroma_db"
CHUNK_SIZE = 500
CHUNK_OVERLAP = 50

# -------------------
# 3️⃣ Initialize RAG system with better error handling
# -------------------
def initialize_rag_system():
    """Initialize the RAG system with proper error handling"""
    try:
        logger.info("Initializing RAG system...")
        
        # Check if data file exists
        if not os.path.exists(DATA_FILE):
            logger.error(f"Data file {DATA_FILE} not found")
            print(f"Error: {DATA_FILE} not found. Please place it in the same folder.")
            sys.exit(1)

        # Load & split documents
        logger.info(f"Loading documents from {DATA_FILE}")
        loader = TextLoader(DATA_FILE, encoding='utf-8')
        docs = loader.load()
        logger.info(f"Loaded {len(docs)} documents")

        splitter = RecursiveCharacterTextSplitter(chunk_size=CHUNK_SIZE, chunk_overlap=CHUNK_OVERLAP)
        chunks = splitter.split_documents(docs)
        logger.info(f"Split into {len(chunks)} chunks")

        # Initialize embeddings
        logger.info("Initializing embeddings...")
        embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
        
        # Load or create Chroma DB
        if os.path.exists(PERSIST_DIR) and os.listdir(PERSIST_DIR):
            logger.info(f"Loading existing Chroma DB from {PERSIST_DIR}")
            db = Chroma(persist_directory=PERSIST_DIR, embedding_function=embeddings)
        else:
            logger.info(f"Creating new Chroma DB at {PERSIST_DIR}")
            db = Chroma.from_documents(chunks, embeddings, collection_name="farming_knowledge", persist_directory=PERSIST_DIR)
            db.persist()
            logger.info("Chroma DB created and persisted")

        # Initialize LLM
        logger.info("Initializing Groq LLM...")
        llm = ChatGroq(
            groq_api_key=GROQ_API_KEY,
            model_name="llama-3.1-8b-instant",
            temperature=0
        )

        # Setup retriever and QA chain
        retriever = db.as_retriever(search_kwargs={"k": 3})
        qa = RetrievalQA.from_chain_type(
            llm=llm,
            retriever=retriever,
            return_source_documents=True
        )
        
        logger.info("RAG system initialized successfully")
        return llm, qa
        
    except Exception as e:
        logger.error(f"Failed to initialize RAG system: {e}")
        print(f"RAG system initialization error: {e}")
        sys.exit(1)

# Initialize the system
llm, qa = initialize_rag_system()

# -------------------
# 4.5️⃣ Topic classification function
# -------------------
def is_farming_related(query):
    """
    Check if the user query is related to farming, agriculture, or related topics.
    Also allows greetings, thanks, follow-ups, and general polite interactions.
    Returns True if farming-related or polite interaction, False otherwise.
    """
    # First check for common greetings, thanks, and polite expressions
    polite_expressions = [
        'hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening',
        'thank you', 'thanks', 'thank u', 'thanku', 'appreciate', 'grateful',
        'bye', 'goodbye', 'see you', 'take care', 'have a good day',
        'please', 'help', 'assist', 'support', 'guidance',
        'namaste', 'greetings', 'welcome', 'nice to meet'
    ]
    
    # Follow-up and continuation expressions
    followup_expressions = [
        'more', 'tell me more', 'i need more', 'more info', 'more information',
        'elaborate', 'explain more', 'details', 'more details', 'continue',
        'what else', 'anything else', 'further', 'expand', 'go on',
        'can you tell me more', 'i want to know more', 'more about this',
        'additional', 'extra', 'deeper', 'in depth'
    ]
    
    query_lower = query.lower().strip()
    
    # Allow short polite expressions (usually greetings/thanks)
    if len(query_lower) <= 50 and any(expr in query_lower for expr in polite_expressions):
        return True
    
    # Allow follow-up requests (usually farmers asking for more details)
    if len(query_lower) <= 30 and any(expr in query_lower for expr in followup_expressions):
        return True
    
    classification_prompt = f"""
    You are a topic classifier for a farming assistant. Determine if the following message should be handled by a farming/agriculture assistant.

    ALLOW if the message is about:
    - Farming, agriculture, crops, livestock, soil, irrigation, pest control, fertilizers, harvesting, farm equipment
    - Rural life, farming communities, agricultural economics
    - Weather related to farming, seasonal farming activities
    - Greetings (hello, hi, good morning, etc.)
    - Polite expressions (thank you, please help, etc.)
    - Follow-up requests (more info, tell me more, elaborate, etc.)
    - General farming terminologies and discussions
    - Questions about being a farmer or farm life

    REJECT if the message is clearly about:
    - Programming, technology (unless farm-related)
    - General knowledge unrelated to farming
    - Entertainment, sports, politics (unless farm-related)
    - Medical advice (unless for livestock/animal care)
    - Mathematics, science (unless applied to farming)

    Message: "{query}"

    Respond with only "YES" if it should be handled by the farming assistant, or "NO" if it should be rejected.
    """
    
    try:
        response = llm.invoke(classification_prompt)
        # Extract the content from the response
        result = response.content.strip().upper()
        logger.debug(f"Classification result for '{query}': {result}")
        return result == "YES"
    except Exception as e:
        logger.warning(f"Error in topic classification: {e}")
        # In case of error, allow the question (fail open)
        return True

# -------------------
# 5️⃣ Flask API setup
# -------------------
app = Flask(__name__)

@app.route("/query", methods=["POST"])
def query_rag():
    """Handle farming questions via API"""
    try:
        # Validate request
        if not request.is_json:
            return jsonify({"error": "Content-Type must be application/json"}), 400
            
        data = request.get_json()
        if not data:
            return jsonify({"error": "Invalid JSON data"}), 400
            
        user_query = data.get("query", "").strip()
        if not user_query:
            return jsonify({"error": "Please provide a non-empty query"}), 400

        logger.info(f"Received query: {user_query}")

        # Check if the query is farming-related
        if not is_farming_related(user_query):
            logger.info(f"Non-farming query rejected: {user_query}")
            return jsonify({
                "answer": "Hello! I'm your friendly farming assistant. I'm here to help with farming, agriculture, crops, livestock, soil management, pest control, irrigation, fertilizers, and all things related to farm life. Feel free to greet me anytime! Please ask me a farming-related question and I'll be happy to help.",
                "type": "rejection"
            })

        # Process farming question
        logger.info(f"Processing farming query: {user_query}")
        result = qa.invoke({"query": user_query})
        
        response_data = {
            "answer": result["result"],
            "type": "farming_response"
        }
        
        logger.info("Query processed successfully")
        return jsonify(response_data)

    except Exception as e:
        logger.error(f"API error: {e}")
        return jsonify({
            "error": "An internal error occurred. Please try again later.",
            "type": "error"
        }), 500

@app.route("/health", methods=["GET"])
def health_check():
    """Health check endpoint"""
    return jsonify({
        "status": "healthy",
        "service": "RAG Farming Assistant",
        "timestamp": logger.handlers[0].formatter.formatTime(logger.makeRecord(
            "", 0, "", 0, "", (), None
        ), None)
    })

# -------------------
# 6️⃣ Enhanced interactive mode
# -------------------
def interactive_mode():
    """Interactive mode with improved error handling and conversation flow"""
    print("\nWelcome to the Farming Assistant!")
    print("=" * 50)
    print("I'm here to help with all your farming and agriculture questions.")
    print("You can ask about crops, livestock, soil, pest control, irrigation, and more!")
    print("Type 'exit', 'quit', or 'bye' to end our conversation.")
    print("=" * 50)
    
    conversation_count = 0
    
    while True:
        try:
            query = input("\nYou: ").strip()
            
            # Handle exit commands
            exit_commands = ['exit', 'quit', 'bye', 'goodbye']
            if query.lower() in exit_commands:
                print("\nAssistant: Thank you for using the Farming Assistant! Happy farming!")
                logger.info("Interactive session ended by user")
                break
            
            # Handle empty input
            if not query:
                print("Assistant: Please ask me a question about farming or agriculture!")
                continue
            
            conversation_count += 1
            logger.info(f"Interactive query #{conversation_count}: {query}")
            
            # Check if the query is farming-related
            if not is_farming_related(query):
                print("Assistant: Hello! I'm your friendly farming assistant. I'm here to help with farming, agriculture, crops, livestock, soil management, pest control, irrigation, fertilizers, and all things related to farm life. Feel free to greet me anytime! Please ask me a farming-related question and I'll be happy to help.\n")
                continue
            
            # Process farming question
            print("Assistant: Let me help you with that farming question...")
            result = qa.invoke({"query": query})
            print(f"Assistant: {result['result']}\n")
            
            # Offer follow-up after every few questions
            if conversation_count % 3 == 0:
                print("Tip: You can ask for 'more details' or 'more info' to get additional information!")
                
        except KeyboardInterrupt:
            print("\n\nAssistant: Goodbye! Thanks for using the Farming Assistant!")
            logger.info("Interactive session interrupted by user")
            break
        except EOFError:
            print("\n\nAssistant: Session ended. Happy farming!")
            logger.info("Interactive session ended (EOF)")
            break
        except Exception as e:
            logger.error(f"Interactive mode error: {e}")
            print("Assistant: I encountered an error. Please try asking your question again.")
            continue

# -------------------
# 7️⃣ Enhanced startup and execution
# -------------------
def main():
    """Main function - automatically starts Flask API server"""
    try:
        print("\nRAG-Farmers Assistant - Flask API Server")
        print("=" * 50)
        logger.info("Starting Flask API server")
        print("\nStarting API server...")
        print("Server will be available at: http://localhost:5000")
        print("Health check: http://localhost:5000/health")
        print("Query endpoint: POST http://localhost:5000/query")
        print("\nPress Ctrl+C to stop the server")
        print("=" * 50)
        app.run(host='127.0.0.1', port=5000, debug=False)
                
    except KeyboardInterrupt:
        print("\n\nServer stopped. Goodbye! Happy farming!")
        logger.info("Flask server stopped by user")
    except Exception as e:
        logger.error(f"Application error: {e}")
        print(f"Application error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
