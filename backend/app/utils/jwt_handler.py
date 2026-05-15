from passlib.context import CryptContext
import hashlib

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


# ✅ STEP 1: Pre-hash using SHA256
def _pre_hash(password: str) -> str:
    return hashlib.sha256(password.encode("utf-8")).hexdigest()


# ✅ STEP 2: Hash with bcrypt
def hash_password(password: str) -> str:
    pre_hashed = _pre_hash(password)
    return pwd_context.hash(pre_hashed)


# ✅ STEP 3: Verify password
def verify_password(password: str, hashed_password: str) -> bool:
    pre_hashed = _pre_hash(password)
    return pwd_context.verify(pre_hashed, hashed_password)
