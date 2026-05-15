import dns.resolver
from email_validator import validate_email, EmailNotValidError


def validate_email_address(email: str):

    # =====================================
    # CHECK EMAIL FORMAT
    # =====================================

    try:
        # valid = validate_email(email)
        valid = validate_email(email, check_deliverability=True)

        email = valid.email

        return True, "Valid email"

    except EmailNotValidError as e:
        return False, str(e)

    # =====================================
    # CHECK MX RECORDS
    # =====================================

    domain = email.split("@")[1]

    try:
        dns.resolver.resolve(domain, "MX")

    except Exception:
        return False, "Email domain does not exist"

    return True, "Valid email"
