import os
from dotenv import load_dotenv

basedir = os.path.abspath(os.path.dirname(__file__))
load_dotenv(os.path.join(os.path.dirname(basedir), '.env'))

class Config:
    # Basic Flask config
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-key-change-in-production'
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'sqlite:///' + os.path.join(basedir, 'rules.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Rule engine specific config
    ALLOWED_ATTRIBUTES = {'age', 'department', 'salary', 'experience'}
    ALLOWED_COMPARATORS = {'>', '<', '==', '>=', '<=', '!='}
    ALLOWED_OPERATORS = {'AND', 'OR'}

    # API config
    MAX_RULE_LENGTH = 1000
    RATE_LIMIT = 100  # requests per minute