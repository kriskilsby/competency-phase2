import pandas as pd
import re
from collections import Counter
import nltk
from nltk.corpus import stopwords
from nltk.util import ngrams
import os

# ---------------------------
# CONFIG
# ---------------------------
EXCEL_PATH = "inputs/employee_projects.xlsx"  # your Excel file
OUTPUT_DIR = "outputs"
TEXT_COLUMNS = [
    # "Client",
    "Project Title",
    "Service Provided",
    "Sector",
    "Project Description"
]

# Add any recurring boilerplate phrases to ignore (This must of common words remove like 'and' and 'of')
PHRASE_STOPWORDS = [
    "brief project description",
    "role responsibilities",
    "challenges notes interest",
    "education brief description",
    "key challenges included",
    "sector brief description",
    "housing brief description",
    "brief description involved",
    "specific challenges notes",
    "notes interest",
    "challenges notes",
    "brief description",
    "education brief",
    "existing school",
    "detailed design",
    "design education",
    "key challenges",
    "build education",
    "teaching block",
    "design contract",
    "designer education",
    "specific challenges",
    "design construction",
    "design riba",
    "provide new",
    "challenges included",
    "description new",
    "leisure wellbeing",
    "extension existing",
    "school new",
    "engineer new",
    "employer agent",
    "engineer education",
    "final account",
    "stage onwards",
    "surveyor new",
    "end user",
    "education involved",
    "local community",
    "months defects",
    "within budget",
    "inspection issuing",
    "defects inspection",
    "full design",
    "requirements set",
    "mechanical electrical",
    "technical advisor",
    "ground floor",
    "first floor",
    "second floor",
    "mechanical design",
    "electrical design",
    "educational needs",
    "west oaks",
    "construction phase",
    "engineering design",
    "lead mechanical",
    "architect lead",
    "leeds lead",
    "lead design",
    "school lead",
    "lead consultant",
    "issuing defects",
    "technical design",
    "defects certificate",
    "advisor new",
    "inspections build",
    "handover months",
    "high quality",
    "process completion",
    "lead structural",
    "manager new",
    "lead technical",
    "responsible delivering",
    "comprised construction",
    "engineer responsible",
    "high academy",
    "end users",
    "post contract",  
    # ROLE_NAMES
    "quantity surveyor",
    "electrical engineer",
    "structural engineer",
    "building surveyor",
    "contract administrator",
    "lead designer",
    "mechanical engineer",
    "lead architect",
    "architectural assistant",
    # WORK_TYPE_TERMS
    "quantity surveying",
    "civil engineering"
    "interior design",
    "structural engineering",
    "contract administration",
    "site supervision"

]

# ROLE_NAMES = {
#     "quantity surveyor",
#     "electrical engineer",
#     "structural engineer",
#     "building surveyor",
#     "contract administrator",
#     "lead designer",
#     "mechanical engineer",
#     "lead architect",
#     "architectural assistant"
# }

# WORK_TYPE_TERMS = {
#     "quantity surveying",
#     "civil engineering"
#     "interior design",
#     "structural engineering",
#     "contract administration",
#     "site supervision"
# }

TOP_N = 100  # number of top results to keep
NGRAM_SIZES = sorted(
    {len(phrase.split()) for phrase in PHRASE_STOPWORDS}
)  # Derive n-gram sizes automatically from the phrase stopwords list
MIN_FREQUENCY = 2  # ignore words/phrases occurring less than this



# ---------------------------
# SETUP OUTPUT
# ---------------------------
os.makedirs(OUTPUT_DIR, exist_ok=True)

# ---------------------------
# LOAD DATA
# ---------------------------
df = pd.read_excel(EXCEL_PATH)
df = df[TEXT_COLUMNS].fillna("")

# Combine all text into a single string column
all_text = df.astype(str).agg(" ".join, axis=1).str.lower()

# ---------------------------
# CLEAN TEXT
# ---------------------------
def clean_text(text: str) -> str:
    text = re.sub(r"[£$€]", " ", text)
    text = re.sub(r"[^a-z0-9\s]", " ", text)
    text = re.sub(r"\s+", " ", text)
    return text.strip()

all_text = all_text.apply(clean_text)

# ---------------------------
# TOKENISE & REMOVE STOPWORDS
# ---------------------------
nltk.download("stopwords", quiet=True)
stop_words = set(stopwords.words("english"))
custom_stopwords = {
    "project", "works", "work", "client", "role", "roles", "team",
    "provided", "services", "including", "responsibilities", "riba", "stage", "stages",
    "additional",
    "brief",
    "challenges",
    "completed",
    "delivered",
    "description",
    "ensure",
    "include",
    "included",
    "interest",
    "involved",
    "notes",
    "provide",
    "required",
    "throughout",
    "various",
    "specification",
    "accommodation",
    "lighting",
    "residents",
    "staff",
    "across",
    "also",
    "due",
    "high",
    "large",
    "main",
    "part",
    "several",
    "three",
    "two",
    "well",
    "within",
    "application",
    "budget",
    "challenge",
    "completion",
    "construction",
    "contract",
    "control",
    "cost",
    "development",
    "end",
    "ensuring",
    "existing",
    "full",
    "issues",
    "key",
    "process",
    "programme",
    "providing",
    "quality",
    "repairs",
    "requirements",
    "responsible",
    "scheme",
    "significant",
    "support",
    "time",
    "working",
    "car",
    "close",
    "council",
    "leeds",
    "local",
    "major",
    "norfolk",
    "west",
    # Domain-specific stopwords
    "administrator",
    "advisor",
    "also",
    "architect",
    "architectural",
    "brief",
    "challenges",
    "completed",
    "consultant",
    "contractor",
    "delivered",
    "description",
    "designer",
    "due",
    "electrical",
    "engineer",
    "engineering",
    "ensure",
    "high",
    "include",
    "included",
    "interest",
    "involved",
    "large",
    "main",
    "mechanical",
    "notes",
    "part",
    "provide",
    "required",
    "several",
    "structural",
    "surveyor",
    # competency_role_stopwords
    "administration",
    "assistant",
    "coordination",
    "delivery",
    "design",
    "designed",
    "detailed",
    "drawings",
    "lead",
    "led",
    "management",
    "manager",
    "quantity",
    "technical",
    "tender",
    "traditional"
    # minimal usefulness
    "access",
    "areas",
    "external",
    "floor",
    "frame",
    "phase",
    "roof",
    "rooms",
    "site",
    "space",
    "spaces",
    "system",
    "systems",
    "units",
    "area",
    "associated",
    "block",
    "build",
    "built",
    "centre",
    "complex",
    "concrete",
    "dining",
    "educational",
    "facilities",
    "facility",
    "form",
    "heating",
    "installation",
    "market",
    "multi",
    "needs",
    "provision",
    "room",
    "sites",
    "storey",
    "use"
}

tokens = all_text.str.split().explode()
tokens = tokens[
    (~tokens.isin(stop_words)) &
    (~tokens.isin(custom_stopwords)) &
    (tokens.str.len() > 2)
]

# ---------------------------
# WORD FREQUENCY
# ---------------------------
word_counts = Counter(tokens)
top_terms = pd.DataFrame(word_counts.items(), columns=["term", "count"])
top_terms = top_terms[top_terms["count"] >= MIN_FREQUENCY].sort_values(
    by="count", ascending=False
)
top_terms.to_csv(os.path.join(OUTPUT_DIR, "top_terms.csv"), index=False)

print(f"Saved top terms to {OUTPUT_DIR}/top_terms.csv")

# ---------------------------
# PHRASE (N-GRAM) ANALYSIS
# ---------------------------
# token_list = tokens.tolist()

# for n in NGRAM_SIZES:
#     phrase_counts = Counter(
#         [" ".join(gram) for gram in ngrams(token_list, n)]
#     )
    
#     # Remove boilerplate phrases
#     for phrase in PHRASE_STOPWORDS:
#         phrase_counts.pop(phrase, None)
    
#     phrase_df = pd.DataFrame(phrase_counts.items(), columns=["phrase", "count"])
#     phrase_df = phrase_df[phrase_df["count"] >= MIN_FREQUENCY].sort_values(
#         by="count", ascending=False
#     )
#     phrase_df.to_csv(os.path.join(OUTPUT_DIR, f"{n}_gram_phrases.csv"), index=False)
#     print(f"Saved {n}-gram phrases to {OUTPUT_DIR}/{n}_gram_phrases.csv")


# ---------------------------
# PHRASE (N-GRAM) ANALYSIS (ROW-SAFE)
# ---------------------------
all_phrases_by_n = {n: [] for n in NGRAM_SIZES}

for row_text in all_text:
    row_tokens = [
        t for t in row_text.split()
        if t not in stop_words
        and t not in custom_stopwords
        and len(t) > 2
    ]

    for n in NGRAM_SIZES:
        all_phrases_by_n[n].extend(
            [" ".join(g) for g in ngrams(row_tokens, n)]
        )

for n, phrases in all_phrases_by_n.items():
    phrase_counts = Counter(phrases)

    # Remove boilerplate phrases
    for phrase in PHRASE_STOPWORDS:
        phrase_counts.pop(phrase, None)

    phrase_df = pd.DataFrame(
        phrase_counts.items(),
        columns=["phrase", "count"]
    )

    phrase_df = phrase_df[
        phrase_df["count"] >= MIN_FREQUENCY
    ].sort_values(by="count", ascending=False)

    phrase_df.to_csv(
        os.path.join(OUTPUT_DIR, f"{n}_gram_phrases.csv"),
        index=False
    )

    print(f"Saved {n}-gram phrases to {OUTPUT_DIR}/{n}_gram_phrases.csv")



    # Print Stoplist details
    # print(f"Print Stoplist {sorted(stopwords.words("english"))}")